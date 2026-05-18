# Health Insurance Platform - Frontend

This project is the frontend for the Health Insurance Platform, a single-page application built with React and styled with Tailwind CSS. It provides a complete user journey from browsing policies to filing claims, along with a comprehensive admin console for managing the platform.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **React Router:** For declarative routing in the React application.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Axios:** For making HTTP requests to the backend API.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  Clone the repository.
2.  Navigate to the `Insure-Frontend` directory.
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

The project follows a standard Create React App structure with components and pages clearly separated.

### `src/components`

This directory contains reusable UI components used across multiple pages.

-   **`Layout/`**: Contains `Navbar.jsx` and `Footer.jsx` which provide the consistent layout for the application.
-   **`PolicyCard.jsx`**: A reusable card component to display individual policy information.
-   **`PublicCatalog.jsx`**: A component that displays the public catalog of policies.

### `src/pages`

This directory contains the main page components, each corresponding to a specific route.

-   **`Home.jsx`**: The main landing page of the application.
-   **`Login.jsx`**: User login page.
-   **`Register.jsx`**: User registration page.
-   **`ForgotPassword.jsx`**: Page for users to reset their password.
-   **`PublicPolicyCatalog.jsx`**: A public page displaying all available insurance policies for browsing.
-   **`CustomerDashboard.jsx`**: The main dashboard for logged-in customers, showing key metrics and quick actions.
-   **`PolicyDetail.jsx`**: A page displaying detailed information about a specific policy and includes a premium calculator.
-   **`EnrollmentForm.jsx`**: A form for customers to enroll in a new insurance policy.
-   **`MyPolicies.jsx`**: A view for customers to see all their enrolled policies and their statuses.
-   **`SubmitClaim.jsx`**: A form for customers to submit a new insurance claim against an active policy.
-   **`ClaimTracking.jsx`**: A page for customers to track the status and lifecycle of their submitted claims.
-   **`AdminDashboard.jsx`**: The main dashboard for platform administrators, showing system-wide metrics and activity.
-   **`CatalogManagement.jsx`**: An admin page for managing policy categories and the visibility of insurance policies.
-   **`ClaimAdjudication.jsx`**: A workspace for administrators to review, approve, or reject customer claims.

## Available Routes

The application uses `react-router-dom` to handle navigation. Here are the main routes:

| Path                  | Component               | Description                                                 |
| --------------------- | ----------------------- | ----------------------------------------------------------- |
| `/`                   | `Home`                  | The main landing page.                                      |
| `/login`              | `Login`                 | User login page.                                            |
| `/register`           | `Register`              | User registration page.                                     |
| `/forgot-password`    | `ForgotPassword`        | Page for password reset.                                    |
| `/policies`           | `PublicPolicyCatalog`   | Displays the public catalog of insurance policies.          |
| `/policy/:id`         | `PolicyDetails`         | Shows details for a specific policy.                        |
| `/enroll`             | `Enrollment`            | The form to enroll in a policy.                             |
| `/customer`           | `CustomerDashboard`     | The dashboard for logged-in customers.                      |
| `/mypolicies`         | `MyPolicies`            | Displays a customer's enrolled policies.                    |
| `/submit`             | `ClaimSubmission`       | The form to submit a new claim.                             |
| `/claims`             | `ClaimTracking`         | Page for customers to track their claims.                   |
| `/admin`              | `Admin`                 | The main dashboard for administrators.                      |
| `/claim-adjudication` | `ClaimAdjudication`     | The workspace for admins to manage claims.                  |
| `/catalog-management` | `CatalogManagement`     | The workspace for admins to manage policies and categories. |

- **Primary**: Blues (Corporate authority)
- **Secondary**: Slates (Neutral foundation)
- **Success**: Green (Positive actions)
- **Danger**: Red (Errors and warnings)

## API Integration (TODO)

The following endpoints need to be implemented:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/password-reset` - Request password reset
- `GET /policies` - Get all policies with filtering

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

## Next Steps

- Part 2: Dashboard & User Management
- Part 3: Policy Management
- Part 4: Claims & Enrollment
