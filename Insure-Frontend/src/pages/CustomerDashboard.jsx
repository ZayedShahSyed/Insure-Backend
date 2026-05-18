import { useMemo } from 'react';

const stats = [
  { label: 'Active Policies', value: '155', note: 'Currently active policies' },
  { label: 'Total Coverage', value: '$1.2M', note: 'Sum insured across policies' },
  { label: 'Pending Claims', value: '155', note: 'Claims awaiting review' },
  { label: 'Approved Payouts', value: '$155K', note: 'Paid claim amounts' },
];

const quickActions = [
  { label: 'Browse Policies', description: 'Explore available plans', style: 'bg-blue-600 hover:bg-blue-700 text-white' },
  { label: 'File a Claim', description: 'Start a new claim', style: 'bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200' },
  { label: 'View My Policies', description: 'See your current coverage', style: 'bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200' },
];

const recentActivity = [
  { label: 'Premium updated', detail: 'Quarterly rate adjustment applied to Health Plus', time: '2 days ago' },
  { label: 'Claim submitted', detail: 'Hospitalization claim submitted for review', time: '4 days ago' },
  { label: 'Policy renewed', detail: 'Family Wellness renewal completed', time: '1 week ago' },
];

const recommendedPolicies = [
  { title: 'Health Plus Advantage', subtitle: 'Family Plan', benefit: 'Includes maternity and dental benefits', premium: '$299/mo' },
  { title: 'Senior Care Select', subtitle: 'Senior Citizen Plan', benefit: 'Enhanced chronic condition support', premium: '$219/mo' },
  { title: 'Executive Shield', subtitle: 'Premium Individual Plan', benefit: 'Fast-track claims and telemedicine', premium: '$399/mo' },
];

function StatCard({ label, value, note }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{note}</p>
    </div>
  );
}

export default function CustomerDashboard() {
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  return (
    <section className="container-main py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Welcome back, Customer!</h1>
          <p className="mt-2 text-sm text-slate-600">Today is {currentDate}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 shadow-sm">
          <p className="font-medium text-slate-900">Status</p>
          <p className="mt-1">All systems are running smoothly</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} note={item.note} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={`${action.style} rounded-3xl px-6 py-6 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <p className="text-lg font-semibold">{action.label}</p>
            <p className="mt-2 text-sm text-slate-600">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Latest changes to your account and policies.</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase text-blue-700">Updated</span>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <span className="text-sm text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recommended For You</h2>
            <p className="mt-1 text-sm text-slate-500">Tailored coverage options based on your profile.</p>
          </div>

          <div className="mt-6 space-y-4">
            {recommendedPolicies.map((policy) => (
              <div key={policy.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{policy.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{policy.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{policy.premium}</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">{policy.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
