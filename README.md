# Insurance Management Platform

A full-featured REST API for insurance policy management built with **Spring Boot 4.0.6** and **Java 21**. The platform supports two user roles — **Admin** and **Customer** — enabling end-to-end workflows from policy creation to claim settlement.

## Features

- **Authentication & Authorization** — JWT-based stateless auth with role-based access control (ADMIN / CUSTOMER)
- **Policy Management** — Admins create and manage insurance policies with categories, plans, and tiers
- **Enrollment Workflow** — Customers enroll in policy plans; admins approve/reject enrollments
- **Claims Processing** — Customers file claims against active enrollments; admins review with state-machine transitions (PENDING → UNDER_REVIEW → APPROVED/REJECTED)
- **Dashboard Analytics** — Separate admin and customer dashboards with aggregated statistics
- **Soft-Delete Pattern** — Entities are deactivated rather than deleted, preserving data integrity

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Spring Boot 4.0.6 |
| Language | Java 21 |
| Security | Spring Security + JWT (JJWT 0.12.6) |
| Database | MySQL 8 |
| ORM | Spring Data JPA / Hibernate |
| Build | Maven (with Maven Wrapper) |
| Utilities | Lombok |
| Testing | JUnit 5 + Mockito |

## Project Structure

```
src/main/java/com/cognizant/insurance/
├── controller/          # REST controllers
├── service/             # Business logic
├── repository/          # Spring Data JPA repositories
├── dto/                 # Request/Response DTOs
├── entity/              # JPA entities
│   └── enums/           # Domain enums (Role, ClaimStatus, etc.)
├── security/            # JWT filter, token service, security config
└── InsuranceApplication.java
```

## Prerequisites

- **Java 21** (JDK)
- **MySQL 8** running on `localhost:3306`
- Database named `insurance` (auto-created tables via `ddl-auto=update`)

## Setup & Run

```powershell
# 1. Clone the repository
git clone <repo-url>
cd insurance

# 2. Create the MySQL database
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS insurance;"

# 3. Build the project (skip tests)
.\mvnw.cmd clean package -DskipTests

# 4. Run the application
.\mvnw.cmd spring-boot:run
```

The API starts on **http://localhost:8081**.

Seed data (`src/main/resources/data.sql`) auto-loads on startup with sample users, policies, plans, enrollments, and claims. Default password for all seed users: `Password@123`.

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT token |
| GET | `/api/auth/me` | Authenticated | Get current user profile |

### Policy Categories (`/api/policy-categories`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/policy-categories` | Admin | Create category |
| GET | `/api/policy-categories` | Public | List all categories |
| GET | `/api/policy-categories/{id}` | Public | Get category by ID |
| PUT | `/api/policy-categories/{id}` | Admin | Update category |
| DELETE | `/api/policy-categories/{id}` | Admin | Soft-delete category |
| PUT | `/api/policy-categories/{id}/reactivate` | Admin | Reactivate category |

### Policies (`/api/policies`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/policies` | Admin | Create policy |
| GET | `/api/policies` | Public | List all active policies |
| GET | `/api/policies/{id}` | Public | Get policy by ID |
| PUT | `/api/policies/{id}` | Admin | Update policy (partial) |
| DELETE | `/api/policies/{id}` | Admin | Soft-delete policy |
| PUT | `/api/policies/{id}/reactivate` | Admin | Reactivate policy |

### Policy Plans (`/api/policy-plans`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/policy-plans?policyId={id}` | Admin | Create plan for a policy |
| GET | `/api/policy-plans/{id}` | Public | Get plan by ID |
| GET | `/api/policy-plans/policy/{policyId}` | Public | List plans for a policy |
| PUT | `/api/policy-plans/{id}` | Admin | Update plan |
| DELETE | `/api/policy-plans/{id}` | Admin | Deactivate plan |

### Enrollments (`/api/enrollments`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/enrollments` | Customer | Enroll in a policy plan |
| GET | `/api/enrollments/my` | Authenticated | Get current user's enrollments |
| GET | `/api/enrollments/{id}` | Authenticated | Get enrollment by ID |
| GET | `/api/enrollments/policy/{policyId}` | Admin | Enrollments for a policy |
| GET | `/api/enrollments/all` | Admin | All enrollments (scoped to admin's policies) |
| PUT | `/api/enrollments/{id}/approve` | Admin | Approve enrollment |
| PUT | `/api/enrollments/{id}/cancel` | Authenticated | Cancel enrollment |

### Claims (`/api/claims`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/claims` | Customer | Submit a claim |
| GET | `/api/claims/my` | Customer | Get customer's claims |
| GET | `/api/claims/{id}` | Authenticated | Get claim by ID |
| GET | `/api/claims/all` | Admin | All claims (scoped to admin's policies) |
| GET | `/api/claims/status/{status}` | Admin | Filter claims by status |
| PUT | `/api/claims/{id}/review` | Admin | Review/approve/reject claim |

### Dashboards
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/dashboard` | Admin | Admin statistics |
| GET | `/api/admin/users` | Admin | List all customers |
| GET | `/api/customer/dashboard` | Customer | Customer statistics |

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt-token>
```

Obtain a token via `/api/auth/login`:


## Testing

```powershell
# Run all tests
.\mvnw.cmd test

# Run service-layer tests only
.\mvnw.cmd test -Dtest="AuthServiceTest,PolicyServiceTest,ClaimServiceTest,PolicyEnrollmentServiceTest"
```

**34 unit tests** covering authentication, policy CRUD, enrollment workflows, and claims processing. See [Tests.md](Tests.md) for detailed test documentation.

## Configuration

Key properties in `src/main/resources/application.properties`:

| Property | Value | Description |
|----------|-------|-------------|
| `server.port` | 8081 | Application port |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/insurance` | Database URL |
| `spring.jpa.hibernate.ddl-auto` | update | Auto-create/update schema |
| `com.jwt.secret` | (configured) | HMAC signing key for JWT |

## Key Design Decisions

- **Admin Data Scoping** — Admin endpoints for enrollments/claims only show data for policies that admin created, not all records globally
- **Business Keys** — `policy_code` (POL-xxx), `enrollment_number` (ENR-xxx), `claim_number` (CLM-xxx) are unique identifiers separate from database PKs
- **Claim State Machine** — PENDING → UNDER_REVIEW → APPROVED/REJECTED (no backward transitions)
- **Soft Delete** — `isActive` flag on User, Policy, PolicyPlan, PolicyCategory; deleting a policy also cancels its active enrollments

