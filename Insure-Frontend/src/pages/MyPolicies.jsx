import { Link } from 'react-router-dom';

const policyData = [
  {
    id: 'HPC-0012',
    name: 'Health Plus Comprehensive',
    enrollmentDate: '2025-08-14',
    status: 'Active',
    sumInsured: '₹10,00,000',
    nextRenewal: '2026-08-14',
    premium: '₹2,999/mo',
  },
  {
    id: 'FAM-2045',
    name: 'Family Wellness Floater',
    enrollmentDate: '2024-11-05',
    status: 'Pending',
    sumInsured: '₹15,00,000',
    nextRenewal: '2025-11-05',
    premium: '₹4,250/mo',
  },
  {
    id: 'SEN-3309',
    name: 'Senior Care Select',
    enrollmentDate: '2023-05-23',
    status: 'Expired',
    sumInsured: '₹5,00,000',
    nextRenewal: '—',
    premium: '₹1,799/mo',
  },
];

const statusClasses = {
  Active: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Expired: 'bg-slate-100 text-slate-600',
};

const claimTimeline = [
  { label: 'Claim Created', time: '3 days ago', detail: 'Your claim request is under initial review.' },
  { label: 'Documents Submitted', time: '2 days ago', detail: 'Supporting bills and discharge summary uploaded.' },
  { label: 'Adjudication in progress', time: 'Today', detail: 'Our team is assessing coverage and payout.' },
];

export default function MyPolicies() {
  return (
    <section className="container-main py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">My Policies</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Your enrolled coverage</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Review current policy details, download certificates, and raise claims for active coverage.</p>
        </div>
        <Link
          to="/submit-claim"
          className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Raise a Claim
        </Link>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Policy Name</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Policy ID</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Enrollment Date</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Sum Insured</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Renewal</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Premium</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {policyData.map((policy) => (
              <tr key={policy.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 align-top">
                  <p className="font-semibold text-slate-900">{policy.name}</p>
                </td>
                <td className="px-6 py-4 align-top text-sm text-slate-600">{policy.id}</td>
                <td className="px-6 py-4 align-top text-sm text-slate-600">{policy.enrollmentDate}</td>
                <td className="px-6 py-4 align-top">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[policy.status]}`}> {policy.status} </span>
                </td>
                <td className="px-6 py-4 align-top text-sm text-slate-600">{policy.sumInsured}</td>
                <td className="px-6 py-4 align-top text-sm text-slate-600">{policy.nextRenewal}</td>
                <td className="px-6 py-4 align-top text-sm font-semibold text-slate-900">{policy.premium}</td>
                <td className="px-6 py-4 align-top space-x-2">
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100"
                  >
                    Download Certificate
                  </button>
                  <Link
                    to="/submit-claim"
                    className="rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    Raise a Claim
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Claim Status Timeline</p>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Live feed</span>
          </div>
          <div className="mt-6 space-y-5">
            {claimTimeline.map((entry) => (
              <div key={entry.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{entry.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{entry.detail}</p>
                  </div>
                  <span className="text-sm text-slate-500">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Need help with a claim?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">If you have an active policy and supporting documents ready, file your claim immediately to start the review process.</p>
          <div className="mt-6 space-y-3 rounded-3xl bg-white p-5 text-sm text-slate-700 shadow-sm">
            <p className="font-semibold text-slate-900">What to prepare</p>
            <ul className="mt-3 space-y-2 leading-6">
              <li>• Incident details and medical center information</li>
              <li>• Discharge summaries and bills</li>
              <li>• Policy certificate number</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
