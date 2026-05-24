# Tests.md — Insurance Platform Test Documentation

## Overview
Unit tests for core service-layer business logic using **JUnit 5** and **Mockito**. Tests are pure unit tests (no database or Spring context required) that validate authorization, validation rules, state transitions, and data scoping.

## Running Tests

```powershell
# Run all tests
.\mvnw.cmd test

# Run only the service-layer functional tests
.\mvnw.cmd test -Dtest="AuthServiceTest,PolicyServiceTest,ClaimServiceTest,PolicyEnrollmentServiceTest"

# Run a single test class
.\mvnw.cmd test -Dtest="ClaimServiceTest"

# Run a specific test method
.\mvnw.cmd test -Dtest="ClaimServiceTest#reviewClaim_approve_success"
```

## Test Structure

```
src/test/java/com/cognizant/insurance/
├── InsuranceApplicationTests.java          # Spring Boot context load test
└── service/
    ├── AuthServiceTest.java                # Authentication & registration
    ├── PolicyServiceTest.java              # Policy CRUD & lifecycle
    ├── PolicyEnrollmentServiceTest.java    # Enrollment workflow
    └── ClaimServiceTest.java              # Claim submission & review
```

## Test Dependencies
- `spring-boot-starter-webmvc-test` — MockMvc, test utilities
- `spring-boot-starter-data-jpa-test` — JPA test support
- `spring-boot-starter-security-test` — Security test utilities
- **Mockito** (bundled via Spring Boot test starters) — mocking framework
- **JUnit 5** (bundled via Spring Boot test starters) — test framework

## Test Classes

### `AuthServiceTest` (6 tests)
Tests `AuthService` — user registration and UserDetailsService implementation.

| Test | Validates |
|------|-----------|
| `loadUserByUsername_existingUser_returnsUserDetails` | Successful user lookup returns `CustomUserDetails` |
| `loadUserByUsername_nonExistingUser_throwsException` | Unknown email throws `UsernameNotFoundException` |
| `register_newUser_success` | Successful registration returns token, userId, email, role, fullName |
| `register_duplicateEmail_throwsException` | Duplicate email rejected with `IllegalArgumentException` |
| `register_duplicatePhone_throwsException` | Duplicate phone rejected with `IllegalArgumentException` |
| `register_nullRole_defaultsToCustomer` | Null role defaults to `CUSTOMER` |

### `PolicyServiceTest` (9 tests)
Tests `PolicyService` — policy CRUD, soft-delete, ownership validation.

| Test | Validates |
|------|-----------|
| `createPolicy_success` | Policy created with generated `POL-` code, correct category and creator |
| `createPolicy_duplicateName_throwsException` | Duplicate policy name rejected |
| `createPolicy_invalidCategory_throwsException` | Non-existent category ID rejected |
| `getPolicyById_found` | Returns policy when found |
| `getPolicyById_notFound_throwsException` | Throws exception for unknown ID |
| `updatePolicy_partialUpdate_success` | Null fields in request are skipped (partial update) |
| `updatePolicy_differentAdmin_throwsException` | Non-owner admin cannot update policy |
| `deletePolicy_softDeletesAndCancelsEnrollments` | Sets `isActive=false` and cancels active/pending enrollments |
| `reactivatePolicy_success` | Sets `isActive=true` |

### `PolicyEnrollmentServiceTest` (10 tests)
Tests `PolicyEnrollmentService` — enrollment, approval, and cancellation workflows.

| Test | Validates |
|------|-----------|
| `enroll_success` | Enrollment created with generated `ENR-` number, correct premium calculation |
| `enroll_invalidTenure_throwsException` | Tenure not in plan's `tenureOptions` rejected |
| `enroll_planNotFound_throwsException` | Non-existent/inactive plan rejected |
| `approveEnrollment_success` | Status → ACTIVE, payment → PAID, approvedBy/approvedAt set |
| `approveEnrollment_notPending_throwsException` | Only PENDING enrollments can be approved |
| `approveEnrollment_wrongAdmin_throwsException` | Admin must be the policy creator |
| `cancelEnrollment_byCustomer_success` | Customer can cancel their own enrollment |
| `cancelEnrollment_byPolicyAdmin_success` | Policy-creator admin can cancel enrollment |
| `cancelEnrollment_unauthorizedUser_throwsException` | Unrelated user cannot cancel |
| `cancelEnrollment_alreadyCancelled_throwsException` | Already-cancelled enrollment throws error |

### `ClaimServiceTest` (9 tests)
Tests `ClaimService` — claim submission, review (approve/reject), and state machine validation.

| Test | Validates |
|------|-----------|
| `submitClaim_success` | Claim created with generated `CLM-` number against active enrollment |
| `submitClaim_enrollmentNotBelongingToCustomer_throwsException` | Customer can only claim their own enrollments |
| `submitClaim_enrollmentNotActive_throwsException` | Claims only allowed on ACTIVE enrollments |
| `submitClaim_amountExceedsCoverage_throwsException` | Claimed amount cannot exceed plan coverage |
| `reviewClaim_approve_success` | Status → APPROVED, approvedAmount set, reviewedBy/reviewedAt set |
| `reviewClaim_rejectWithoutRemarks_throwsException` | Rejection requires `adminRemarks` |
| `reviewClaim_approveWithoutAmount_throwsException` | Approval requires `approvedAmount` |
| `reviewClaim_invalidStatusTransition_throwsException` | Terminal states (APPROVED/REJECTED) cannot change |
| `reviewClaim_wrongAdmin_throwsException` | Only the policy creator can review claims |

## Patterns Used

### Mockito with `@ExtendWith(MockitoExtension.class)`
All service tests use constructor injection mocking — no Spring context loaded:
```java
@ExtendWith(MockitoExtension.class)
class SomeServiceTest {
    @Mock private SomeRepository someRepository;
    @InjectMocks private SomeService someService;
}
```

### Test Naming Convention
`methodName_scenario_expectedResult` — e.g., `approveEnrollment_notPending_throwsException`

### Common Assertions
- `assertThrows(ExceptionClass.class, () -> ...)` for error cases
- Direct entity state checks after service method calls (e.g., `assertEquals(EnrollmentStatus.CANCELLED, ...)`)
- `verify(repository).save(any(...))` to confirm persistence calls

## Total Test Count
**34 unit tests** across 4 service test classes + 1 Spring Boot context test.

