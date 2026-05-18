import { useMemo, useState } from 'react';

const initialCategories = [
  { id: 'cat-1', name: 'Individual Plans', description: 'Single-person coverage options for medical emergencies.', active: true },
  { id: 'cat-2', name: 'Family Floater', description: 'Plans covering family members under one policy.', active: true },
  { id: 'cat-3', name: 'Senior Care', description: 'Policies designed for customers above 60 years.', active: false },
];

const initialPolicies = [
  { id: 'pol-1', name: 'Health Plus Comprehensive', code: 'HPC-2026-XL', coverage: '₹10,00,000', premiumBasis: 'Monthly', active: true },
  { id: 'pol-2', name: 'Family Wellness Floater', code: 'FWF-2026', coverage: '₹15,00,000', premiumBasis: 'Quarterly', active: true },
  { id: 'pol-3', name: 'Senior Care Select', code: 'SCS-2026', coverage: '₹5,00,000', premiumBasis: 'Annual', active: false },
];

const statusBadge = (active) =>
  active ? 'inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700' : 'inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600';

export default function CatalogManagement() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories] = useState(initialCategories);
  const [policies, setPolicies] = useState(initialPolicies);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', active: true });

  const tabClasses = (tab) =>
    `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
      activeTab === tab ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`;

  const policyToggle = (id) => {
    setPolicies((prev) => prev.map((policy) => (policy.id === id ? { ...policy, active: !policy.active } : policy)));
  };

  const handleCategoryChange = (name, value) => {
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    setShowModal(false);
    setNewCategory({ name: '', description: '', active: true });
  };

  const activeCount = useMemo(() => policies.filter((policy) => policy.active).length, [policies]);

  return (
    <section className="container-main py-10">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Catalog Management</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Policy Catalog Administration</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">Manage categories and policy visibility for the public customer catalog.</p>
          </div>
          <div className="rounded-full bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Active policies: <span className="font-semibold text-slate-900">{activeCount}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm">
          <button type="button" className={tabClasses('categories')} onClick={() => setActiveTab('categories')}>
            Policy Categories
          </button>
          <button type="button" className={tabClasses('policies')} onClick={() => setActiveTab('policies')}>
            Insurance Policies
          </button>
        </div>

        {activeTab === 'categories' && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Policy Categories</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Category inventory</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Create New Category
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Category Name</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Description</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Status</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{category.name}</td>
                      <td className="px-6 py-4 text-slate-600">{category.description}</td>
                      <td className="px-6 py-4">{statusBadge(category.active)}</td>
                      <td className="px-6 py-4">
                        <button type="button" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Insurance Policies</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Policy visibility controls</h2>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Policy Name</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Unique Code</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Coverage Amount</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Premium Basis</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Visibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {policies.map((policy) => (
                    <tr key={policy.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{policy.name}</td>
                      <td className="px-6 py-4 text-slate-600">{policy.code}</td>
                      <td className="px-6 py-4 text-slate-600">{policy.coverage}</td>
                      <td className="px-6 py-4 text-slate-600">{policy.premiumBasis}</td>
                      <td className="px-6 py-4">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={policy.active}
                            onChange={() => policyToggle(policy.id)}
                            className="peer sr-only"
                          />
                          <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-600"></div>
                          <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5"></div>
                        </label>
                        <span className="ml-3 text-sm font-semibold text-slate-700">{policy.active ? 'Active' : 'Inactive'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Create New Category</h2>
                <p className="mt-2 text-sm text-slate-600">Add a new policy category for the public catalog.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => handleCategoryChange('name', e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => handleCategoryChange('description', e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Describe the category purpose"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={newCategory.active}
                    onChange={(e) => handleCategoryChange('active', e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-600"></div>
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5"></div>
                </label>
                <span className="text-sm text-slate-600">{newCategory.active ? 'Active' : 'Inactive'}</span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
