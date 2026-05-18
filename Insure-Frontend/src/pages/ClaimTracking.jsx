import { useState } from 'react';

const claims = [
  {
    id: 'CLM-892021',
    policyName: 'Health Plus Comprehensive',
    submittedOn: '2026-04-28',
    claimedAmount: '₹45,000',
    status: 'PENDING',
    remarks: 'Awaiting supporting documents from the policyholder.',
    approvedAmount: null,
  },
  {
    id: 'CLM-892022',
    policyName: 'Family Wellness Floater',
    submittedOn: '2026-04-20',
    claimedAmount: '₹78,500',
    status: 'UNDER REVIEW',
    remarks: 'Medical report under review by claims adjudication team.',
    approvedAmount: null,
  },
  {
    id: 'CLM-892023',
    policyName: 'Senior Care Select',
    submittedOn: '2026-03-30',
    claimedAmount: '₹18,200',
    status: 'APPROVED',
    remarks: 'Claim approved after verification of documents.',
    approvedAmount: '₹16,500',
  },
  {
    id: 'CLM-892024',
    policyName: 'Executive Shield',
    submittedOn: '2026-03-12',
    claimedAmount: '₹34,100',
    status: 'REJECTED',
    remarks: 'Claim rejected due to non-covered expense category.',
    approvedAmount: null,
  },
];

const statusPalette = {
  PENDING: { label: 'Pending', style: 'bg-slate-100 text-slate-700', border: 'border-slate-200' },
  'UNDER REVIEW': { label: 'Under Review', style: 'bg-amber-100 text-amber-700', border: 'border-amber-200' },
  APPROVED: { label: 'Approved', style: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200' },
  REJECTED: { label: 'Rejected', style: 'bg-red-100 text-red-700', border: 'border-red-200' },
};

const timelineSteps = ['PENDING', 'UNDER REVIEW', 'APPROVED', 'REJECTED'];

export default function ClaimTracking() {
  const [selectedClaim, setSelectedClaim] = useState(claims[0]);

  const activeIndex = timelineSteps.indexOf(selectedClaim.status);

  return (
    <section className="container-main py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Claim Tracking</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Monitor all submitted claims</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Select a claim to review its lifecycle and current status updates.</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Claim ID</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Policy Name</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Submission Date</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Claimed Amount</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className={`cursor-pointer transition hover:bg-slate-50 ${selectedClaim.id === claim.id ? 'bg-slate-50' : ''}`}
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <td className="px-6 py-4 text-slate-900 font-medium">{claim.id}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.policyName}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.submittedOn}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.claimedAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusPalette[claim.status].style}`}>
                        {statusPalette[claim.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Selected Claim</p>
            <h2 className="text-3xl font-semibold text-slate-900">{selectedClaim.id}</h2>
            <p className="text-sm text-slate-600">Policy: <span className="font-medium text-slate-900">{selectedClaim.policyName}</span></p>
            <p className="text-sm text-slate-600">Submitted: <span className="font-medium text-slate-900">{selectedClaim.submittedOn}</span></p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {timelineSteps.map((step, index) => {
                const isActive = index === activeIndex;
                const isComplete = index < activeIndex;
                const stepPalette = statusPalette[step] || statusPalette.PENDING;
                return (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                          isActive ? `${stepPalette.style} ${stepPalette.border}` : isComplete ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-slate-200'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index !== timelineSteps.length - 1 && <div className="mt-1 h-full w-px bg-slate-200"></div>}
                    </div>
                    <div className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{step}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {isActive
                          ? 'Current stage for this claim.'
                          : isComplete
                          ? 'This stage has been completed.'
                          : 'This stage is upcoming.'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Admin Remarks</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{selectedClaim.remarks}</p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Approved Payout Amount</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {selectedClaim.status === 'APPROVED' ? selectedClaim.approvedAmount : 'Pending review'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
