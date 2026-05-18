import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateEmail();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // TODO: Call password reset API
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md card p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Reset Password</h1>
          <p className="text-secondary-600">Enter your email address and we'll send you a link to reset your password</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({});
                  }
                }}
                className={`form-input ${errors.email ? 'ring-2 ring-danger-500' : ''}`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-danger-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <p className="text-success-800 font-medium">Check your email</p>
              <p className="text-success-700 text-sm mt-1">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-secondary-900">What's next?</h3>
              <ol className="text-secondary-700 text-sm space-y-2 list-decimal list-inside">
                <li>Check your email (including spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>Create a new password</li>
                <li>Sign in with your new password</li>
              </ol>
            </div>

            {/* Back to Login */}
            <div className="pt-4">
              <Link
                to="/login"
                className="btn-primary w-full text-center"
              >
                Back to Sign In
              </Link>
            </div>

            {/* Resend */}
            <div className="text-center">
              <p className="text-secondary-600 text-sm">
                Didn't receive the email? <button className="text-primary-600 hover:text-primary-700 font-medium">Resend</button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
