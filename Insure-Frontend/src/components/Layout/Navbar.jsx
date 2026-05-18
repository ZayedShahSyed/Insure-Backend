import { Link } from 'react-router-dom';

export default function Navbar() {
  const isAuthenticated = false; // Placeholder for auth state

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-main">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-semibold text-secondary-900 hidden sm:inline">Insure</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-secondary-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/policies" className="text-secondary-700 hover:text-primary-600 transition-colors">Policies</Link>
            <Link to="/" className="text-secondary-700 hover:text-primary-600 transition-colors">About</Link>
            <Link to="/" className="text-secondary-700 hover:text-primary-600 transition-colors">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button className="text-secondary-700 hover:text-primary-600 transition-colors">Profile</button>
                <button className="btn-secondary text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
