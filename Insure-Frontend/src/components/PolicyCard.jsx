import { Link } from 'react-router-dom';

export default function PolicyCard({ policy }) {
  const getPremiumBadgeColor = (type) => {
    return type === 'Premium' ? 'bg-primary-100 text-primary-800' : 'bg-secondary-100 text-secondary-800';
  };

  return (
    <div className="card p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-secondary-900">{policy.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPremiumBadgeColor(policy.type)}`}>
            {policy.type}
          </span>
        </div>
        <p className="text-sm text-secondary-600">{policy.category}</p>
      </div>

      {/* Description */}
      <p className="text-secondary-700 text-sm mb-4">{policy.description}</p>

      {/* Price */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-sm text-secondary-600">Monthly Premium</p>
        <p className="text-3xl font-bold text-primary-600">${policy.premium}</p>
      </div>

      {/* Coverage */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-sm text-secondary-600 mb-1">Coverage Limit</p>
        <p className="text-lg font-semibold text-secondary-900">{policy.coverage}</p>
      </div>

      {/* Features */}
      <div className="mb-6 flex-grow">
        <p className="text-sm text-secondary-600 mb-3">Key Features:</p>
        <ul className="space-y-2">
          {policy.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-secondary-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Link
        to="/register"
        className="btn-primary w-full text-center"
      >
        Learn More
      </Link>
    </div>
  );
}
