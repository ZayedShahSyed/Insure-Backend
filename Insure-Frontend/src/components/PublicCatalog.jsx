import { Link } from 'react-router-dom';

const POLICIES = [
  {
    id: 1,
    name: 'Essential Health Plan',
    category: 'Individual',
    coverage: '$100,000',
    premium: '$199 / mo',
    benefits: ['Hospital coverage', 'Doctor visits', 'Telehealth access'],
  },
  {
    id: 2,
    name: 'Family Wellcare',
    category: 'Family',
    coverage: '$250,000',
    premium: '$349 / mo',
    benefits: ['Family dental support', 'Pediatric care', 'Maternity benefits'],
  },
  {
    id: 3,
    name: 'Senior Secure Plan',
    category: 'Senior Citizen',
    coverage: '$150,000',
    premium: '$279 / mo',
    benefits: ['Preventive screenings', 'Chronic care support', 'Prescription coverage'],
  },
  {
    id: 4,
    name: 'Corporate Guard',
    category: 'Corporate',
    coverage: '$500,000',
    premium: '$699 / mo',
    benefits: ['Employee wellness program', 'Group coverage', 'Emergency care'],
  },
];

export default function PublicCatalog() {
  return (
    <section className="container-main py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Public Policy Catalog</h2>
          <p className="text-slate-600 mt-2">Browse available plans and compare benefits before signing in.</p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 md:w-auto md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Category</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
              <option>All</option>
              <option>Individual</option>
              <option>Family</option>
              <option>Senior Citizen</option>
            </select>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Premium Range</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
              <option>Any</option>
              <option>Under $250</option>
              <option>$250 - $500</option>
              <option>Above $500</option>
            </select>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Coverage</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
              <option>Any</option>
              <option>Up to $100k</option>
              <option>Up to $250k</option>
              <option>Above $250k</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {POLICIES.map((policy) => (
          <article key={policy.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{policy.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{policy.name}</h3>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{policy.premium}</div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Coverage Amount</p>
                <p className="mt-1">{policy.coverage}</p>
              </div>

              <ul className="space-y-2 text-sm text-slate-600">
                {policy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Link to="/login" className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
