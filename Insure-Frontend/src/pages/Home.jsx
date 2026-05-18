import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="container-main">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Health, Our Priority</h1>
            <p className="text-lg text-primary-100 mb-8">
              Comprehensive and affordable health insurance plans designed for individuals, families, and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/policies" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
                Browse Plans
              </Link>
              <Link to="/register" className="btn-outline border-white text-white hover:bg-primary-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-secondary-900 mb-12 text-center">Why Choose Insure?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Comprehensive Coverage</h3>
              <p className="text-secondary-600">Extensive health coverage including hospital stays, doctor visits, and preventive care.</p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Affordable Pricing</h3>
              <p className="text-secondary-600">Competitive premiums with flexible payment options to fit your budget.</p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">24/7 Support</h3>
              <p className="text-secondary-600">Round-the-clock customer support to help you with claims and inquiries anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16 px-4">
        <div className="container-main text-center">
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Insure for their health insurance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary">
              Create an Account
            </Link>
            <Link to="/policies" className="btn-outline">
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary-900 text-white py-16 px-4">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-primary-400 mb-2">50K+</p>
              <p className="text-secondary-300">Active Members</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-primary-400 mb-2">98%</p>
              <p className="text-secondary-300">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-primary-400 mb-2">100+</p>
              <p className="text-secondary-300">Partner Hospitals</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
