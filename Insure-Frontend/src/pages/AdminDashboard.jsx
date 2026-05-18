import { useMemo } from 'react';

const stats = [
  { label: 'Total Policies', value: '160', note: 'Published policy records' },
  { label: 'Active Policies', value: '124', note: 'Visible to customers' },
  { label: 'Total Customers', value: '18.2K', note: 'Registered accounts' },
  { label: 'Total Enrollments', value: '9.8K', note: 'Completed policy enrollments' },
  { label: 'Pending Claims', value: '42', note: 'Awaiting review' },
];

const activityFeed = [
  { title: 'New enrollment completed', detail: 'Family Wellness Floater plan enrolled by Rahul Sharma.', time: '15 minutes ago' },
  { title: 'Claim submitted', detail: 'Hospitalization claim submitted for policy HPC-0012.', time: '1 hour ago' },
  { title: 'Policy published', detail: 'Executive Shield plan added to the public catalog.', time: '3 hours ago' },
  { title: 'Customer onboarded', detail: 'New customer account created for Pooja Verma.', time: 'Yesterday' },
];

function StatCard({ label, value, note }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-slate-900">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{note}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const chartData = useMemo(
    () => [
      { label: 'Jan', value: 52 },
      { label: 'Feb', value: 68 },
      { label: 'Mar', value: 75 },
      { label: 'Apr', value: 82 },
      { label: 'May', value: 90 },
      { label: 'Jun', value: 85 },
    ],
    []
  );

  return (
    <section className="container-main py-10">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Admin Console</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Operations Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">Monitor policy performance, customer adoption, and claim workflow health in one place.</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} note={stat.note} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Claim Approval Rate</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">78%</span>
            </div>
            <div className="mt-6 space-y-3">
              {chartData.map((point) => (
                <div key={point.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{point.label}</span>
                    <span>{point.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${point.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Enrollment Trends</p>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">6 months</span>
            </div>
            <div className="mt-6 space-y-3">
              {chartData.map((point, index) => (
                <div key={point.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{point.label}</span>
                    <span>{point.value * 120}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(point.value + 10, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Recent System Activity Feed</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Latest operational events</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Real time</span>
            </div>
            <div className="mt-6 space-y-4">
              {activityFeed.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <span className="text-sm text-slate-500">{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Operations Summary</p>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-600">Policy catalog updates are on schedule.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-600">Claim review workload is balanced across adjudication teams.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-600">Customer growth remains steady this month.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
