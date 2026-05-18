import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PublicPolicyCatalog from './pages/PublicPolicyCatalog';
import Home from './pages/Home';
import ClaimTracking from './pages/ClaimTracking';
import CustomerDashboard from './pages/CustomerDashboard';
import Enrollment from './pages/EnrollmentForm';
import MyPolicies from './pages/MyPolicies';
import PolicyDetails from './pages/PolicyDetail';
import Admin from './pages/AdminDashboard';
import ClaimAdjudication from './pages/ClaimAdjudication';
import ClaimSubmission from './pages/SubmitClaim';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/policies" element={<PublicPolicyCatalog />} />
        <Route path="/claims" element={<ClaimTracking />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/enroll" element={<Enrollment />} />
        <Route path="/mypolicies" element={<MyPolicies />} />
        <Route path="/policy/:id" element={<PolicyDetails />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/claim-adjudication" element={<ClaimAdjudication />} />
        <Route path="/submit" element={<ClaimSubmission />} />
      </Routes>
    </Layout>
  );
}

export default App;
