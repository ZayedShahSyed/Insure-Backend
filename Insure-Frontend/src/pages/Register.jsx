import { Link } from 'react-router-dom';
import { useState } from 'react';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  address: '',
};

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!formData.email) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email';
    if (!formData.password) nextErrors.password = 'Password is required';
    else if (!passwordRegex.test(formData.password)) nextErrors.password = 'Password must be 8+ chars with an uppercase, number, and special symbol';
    if (!formData.dateOfBirth) nextErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) nextErrors.gender = 'Please choose a gender';
    if (!formData.phone.trim()) nextErrors.phone = 'Phone Number is required';
    else if (!/^\+?[0-9\s()-]{7,15}$/.test(formData.phone.trim())) nextErrors.phone = 'Enter a valid phone number';
    if (!formData.address.trim()) nextErrors.address = 'Address is required';

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData(initialValues);
      setErrors({});
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-10 text-white md:px-12 md:py-14">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Register</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Start your health insurance journey</h1>
          </div>
          <p className="max-w-lg text-slate-300">
            Secure your coverage with a modern registration experience. Complete the form to compare plans and manage benefits in one place.
          </p>
          <div className="space-y-4 rounded-[1.5rem] bg-slate-900/80 px-5 py-5 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-white">Fast onboarding</p>
              <p>Submit your details and get plan access quickly.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Privacy focused</p>
              <p>Data is handled securely and with care.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Clear process</p>
              <p>All required fields are visible in one clean form.</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 md:px-10 md:py-12">
          <div className="mx-auto max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="Create a secure password"
                />
                <p className="mt-2 text-sm text-slate-500">Minimum 8 characters, including uppercase, number, and special character.</p>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  />
                  {errors.dateOfBirth && <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.gender ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="123 Main St, City, State"
                />
                {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
