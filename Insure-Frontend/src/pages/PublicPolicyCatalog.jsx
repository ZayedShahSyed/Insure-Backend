import { useState } from 'react';
import PolicyCard from '../components/PolicyCard';

const MOCK_POLICIES = [
  {
    id: 1,
    name: 'Basic Coverage',
    category: 'Individual',
    type: 'Standard',
    premium: 199,
    coverage: 'Up to $100,000',
    features: ['Hospital stays', 'Doctor visits', '24/7 support'],
    description: 'Comprehensive coverage for essential healthcare needs'
  },
  {
    id: 2,
    name: 'Premium Care',
    category: 'Individual',
    type: 'Premium',
    premium: 349,
    coverage: 'Up to $500,000',
    features: ['Hospital stays', 'Doctor visits', 'Specialist visits', 'Prescription drugs', '24/7 support'],
    description: 'Enhanced coverage with specialist and prescription support'
  },
  {
    id: 3,
    name: 'Family Protection',
    category: 'Family',
    type: 'Standard',
    premium: 499,
    coverage: 'Up to $300,000',
    features: ['Dental coverage', 'Vision coverage', 'Hospital stays', 'Doctor visits', 'Maternity coverage'],
    description: 'Complete family health insurance with dental and vision'
  },
  {
    id: 4,
    name: 'Elite Family Plan',
    category: 'Family',
    type: 'Premium',
    premium: 699,
    coverage: 'Up to $1,000,000',
    features: ['Dental coverage', 'Vision coverage', 'Hospital stays', 'Specialist visits', 'Prescription drugs', 'Maternity coverage', 'Mental health support'],
    description: 'Premium family coverage with comprehensive benefits'
  },
  {
    id: 5,
    name: 'Senior Health Plus',
    category: 'Senior',
    type: 'Standard',
    premium: 279,
    coverage: 'Up to $250,000',
    features: ['Hospital stays', 'Doctor visits', 'Prescription drugs', 'Preventive care'],
    description: 'Specialized coverage tailored for senior citizens'
  },
  {
    id: 6,
    name: 'Business Group Plan',
    category: 'Corporate',
    type: 'Premium',
    premium: 1299,
    coverage: 'Up to $2,000,000',
    features: ['Employee coverage', 'Dependent coverage', 'Hospital stays', 'Specialist visits', 'Wellness programs'],
    description: 'Comprehensive business group health insurance'
  },
];

export default function PublicPolicyCatalog() {
  const [filters, setFilters] = useState({
    category: 'All',
    type: 'All',
    maxPremium: 1000,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPolicies = MOCK_POLICIES.filter(policy => {
    const matchesCategory = filters.category === 'All' || policy.category === filters.category;
    const matchesType = filters.type === 'All' || policy.type === filters.type;
    const matchesPremium = policy.premium <= filters.maxPremium;
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesType && matchesPremium && matchesSearch;
  });

  const categories = ['All', 'Individual', 'Family', 'Senior', 'Corporate'];
  const types = ['All', 'Standard', 'Premium'];

  return (
    <div className="container-main py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Our Insurance Plans</h1>
        <p className="text-lg text-secondary-600">Choose the perfect health insurance plan for your needs</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold text-secondary-900 mb-6">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div>
            <label htmlFor="search" className="form-label">Search Plans</label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="form-input"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="form-input"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="type" className="form-label">Plan Type</label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="form-input"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Premium Filter */}
          <div>
            <label htmlFor="premium" className="form-label">Max Premium: ${filters.maxPremium}</label>
            <input
              id="premium"
              type="range"
              min="100"
              max="1000"
              step="50"
              value={filters.maxPremium}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPremium: parseInt(e.target.value) }))}
              className="w-full h-2 bg-secondary-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-secondary-500 mt-1">
              <span>$100</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-secondary-600">
          Showing <span className="font-semibold text-secondary-900">{filteredPolicies.length}</span> plan{filteredPolicies.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Policies Grid */}
      {filteredPolicies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">No plans found</h3>
          <p className="text-secondary-600">Try adjusting your filters to find available plans</p>
        </div>
      )}
    </div>
  );
}
