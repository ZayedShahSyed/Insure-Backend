import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Password reset</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Forgot your password?</h1>
          <p className="mt-3 text-sm text-slate-600">Enter the email address on your account and we&apos;ll send a reset link.</p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-slate-700">
            <p className="text-lg font-semibold text-slate-900">Check your inbox</p>
            <p className="mt-3 text-sm">
              If that email exists, a time-limited reset link has been sent. Please check your email and follow the instructions.
            </p>
            <div className="mt-6 text-center">
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Registered email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={`mt-2 w-full rounded-2xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                placeholder="you@example.com"
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Send reset link
            </button>

            <p className="text-center text-sm text-slate-600">
              Remembered it?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Back to Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
