# AGENTS.md — Insurance Platform Codebase Guide

## Project Overview
Spring Boot 4.0.6 REST API (Java 21) for an insurance management platform. Uses Spring Security, Spring Data JPA with MySQL, and Lombok. The web layer uses `spring-boot-starter-webmvc` (not the standard `web` starter).


**Base package:** `com.cognizant.insurance`

## Architecture & Data Model

### Core Entity Hierarchy
```
PolicyCategory → Policy → PolicyPlan → PolicyEnrollment → Claim
                                              ↓
                                      EnrollmentPerson
User (ADMIN | CUSTOMER) owns/acts on all of the above
```

- **`PolicyCategory`** groups policies (e.g., Health, Life)
- **`Policy`** defines a product; stores `benefits`, `exclusions`, `documents` as MySQL JSON columns (`@JdbcTypeCode(SqlTypes.JSON)` + `Map<String, Object>`)
- **`PolicyPlan`** is a tier/variant of a Policy (e.g., Silver/Gold)
- **`PolicyEnrollment`** is a customer's purchase of a plan; tracks `PaymentStatus` and `EnrollmentStatus` independently; has `approvedBy` (admin `User`) and `approvedAt` fields
- **`EnrollmentPerson`** lists people covered (self + family members via `PersonType` / `Relationship` enums); table name is `enrollment_people`
- **`Claim`** is filed against a `PolicyEnrollment` and reviewed by an ADMIN `User`; has `reviewedBy`, `reviewedAt`, and `adminRemarks` fields; also holds a direct `customer` FK (redundant with enrollment but present in entity)

### User Roles
`Role` enum: `ADMIN`, `CUSTOMER`. Spring Security is included but not yet configured — security config must be added.

`User` entity (table: `users`) includes: `fullName`, `email`, `passwordHash`, `phone`, `role`, `dateOfBirth`, `gender`, `address`, `city`, `state`, `pincode`, `occupation`, `profilePhotoUrl`, `isActive`, `lastLoginAt`. The `User.policies` collection maps to `Policy.createdBy` (i.e., policies an ADMIN created, not a customer's purchased policies — that's `User.policyEnrollments`).

### Enum Pattern
All enums live in `entity/enums/`. Stored as strings in DB using `@Enumerated(EnumType.STRING)` with explicit `columnDefinition` (e.g., `"ENUM('PENDING','ACTIVE','EXPIRED','CANCELLED') DEFAULT 'PENDING'"`).

### Timestamps
Every entity uses `@CreationTimestamp` / `@UpdateTimestamp` from Hibernate — do **not** set `createdAt`/`updatedAt` manually.

## Structural Conventions
- Entities use Lombok: `@Getter @Setter @NoArgsConstructor @AllArgsConstructor` — no manual getters/setters.
- Lazy fetch (`FetchType.LAZY`) on all `@ManyToOne` associations — avoid N+1 by using JPQL joins or `@EntityGraph` in repositories.
- `is_active` soft-delete pattern (`TINYINT(1) DEFAULT 1`) on `User`, `Policy`, `PolicyPlan`, and `PolicyCategory` — filter by `isActive = true` in queries.
- `policy_code`, `enrollment_number`, `claim_number` are business keys (unique, not the PK) — generate these in service layer.
- `PolicyPlan.tenureOptions` is a `List<Integer>` stored as a JSON column (e.g., `[1, 2, 3]` for selectable tenure years) using `@JdbcTypeCode(SqlTypes.JSON)`.
- `PolicyPlan` also has `renewalAllowed` (`TINYINT(1) DEFAULT 1`) in addition to `isActive`.

## Layer Conventions (to be implemented)
Scaffold follows standard Spring layering:
- `controller/` → `@RestController` REST endpoints  
- `service/` → business logic interfaces + implementations  
- `repository/` → `JpaRepository` extensions  

All three directories exist but are **currently empty** — no controllers, services, or repositories have been implemented yet.

No DTOs directory exists yet — add a `dto/` package alongside `entity/` when creating request/response objects.

## Database
- **MySQL** at `localhost:3306/insurance` (user: `root`, password: `root`)
- `spring.jpa.hibernate.ddl-auto=update` — schema auto-updates on startup; no migration tool (Flyway/Liquibase) configured
- `spring.jpa.show-sql=true` — SQL logged to console in dev

## Build & Run
```powershell
# Build (skip tests)
.\mvnw.cmd clean package -DskipTests

# Run
.\mvnw.cmd spring-boot:run

# Run tests
.\mvnw.cmd test
```

## Key Files
| File | Purpose |
|------|---------|
| `entity/User.java` | Central actor; owns policies, enrollments, claims |
| `entity/Policy.java` | JSON columns for benefits/exclusions/documents |
| `entity/PolicyEnrollment.java` | Core transactional entity linking customer→plan |
| `entity/enums/` | All domain state machines (ClaimStatus, EnrollmentStatus, etc.) |
| `application.properties` | DB config; no profiles defined yet |

