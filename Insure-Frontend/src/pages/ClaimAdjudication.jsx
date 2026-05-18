import { useMemo, useState } from 'react';

const claimsQueue = [
  {
    id: 'CLM-892021',
    customer: 'Rahul Sharma',
    policy: 'Health Plus Comprehensive',
    policyId: 'HPC-0012',
    status: 'PENDING',
    submittedOn: '2026-04-28',
    requestedAmount: '₹45,000',
    incidentDate: '2026-04-20',
    medicalCenter: 'Apollo Hospital, Delhi',
    medicalAddress: 'Indraprastha Marg, New Delhi',
    incidentDescription: 'Emergency hospitalization after abdominal pain and dehydration.',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 98765 43210',
    files: ['DischargeSummary.pdf', 'HospitalBill.pdf', 'DoctorReport.pdf'],
  },
  {
    id: 'CLM-892022',
    customer: 'Sana Iyer',
    policy: 'Family Wellness Floater',
    policyId: 'FWF-2045',
    status: 'UNDER REVIEW',
    submittedOn: '2026-04-20',
    requestedAmount: '₹78,500',
    incidentDate: '2026-04-18',
    medicalCenter: 'Fortis Hospital, Mumbai',
    medicalAddress: 'Mulund West, Mumbai',
    incidentDescription: 'OPD treatment and diagnostic tests for pneumonia and follow-up care.',
    customerEmail: 'sana.iyer@example.com',
    customerPhone: '+91 91234 56789',
    files: ['OPDInvoice.pdf', 'XRayScan.pdf'],
  },
  {
    id: 'CLM-892023',
    customer: 'Anil Mehta',
    policy: 'Senior Care Select',
    policyId: 'SCS-3309',
    status: 'APPROVED',
    submittedOn: '2026-03-30',
    requestedAmount: '₹18,200',
    incidentDate: '2026-03-24',
    medicalCenter: 'Cloudnine Hospital, Pune',
    medicalAddress: 'Aundh, Pune',
    incidentDescription: 'Minor surgery and post-operative care after hernia repair.',
    customerEmail: 'anil.mehta@example.com',
    customerPhone: '+91 99876 54321',
    files: ['SurgeryReport.pdf', 'PharmacyReceipt.pdf'],
  },
  {
    id: 'CLM-892024',
    customer: 'Priya Das',
    policy: 'Executive Shield',
    policyId: 'EXS-1100',
    status: 'REJECTED',
    submittedOn: '2026-03-12',
    requestedAmount: '₹34,100',
    incidentDate: '2026-03-08',
    medicalCenter: 'Medanta Hospital, Gurgaon',
    medicalAddress: 'Sector 38, Gurgaon',
    incidentDescription: 'Accidental injury with outpatient treatment and follow-up imaging.',
    customerEmail: 'priya.das@example.com',
    customerPhone: '+91 92345 67890',
    files: ['ClaimForm.pdf', 'AccidentReport.pdf'],
  },
];

const statusOrder = ['PENDING', 'UNDER REVIEW', 'APPROVED', 'REJECTED'];
const statusClasses = {
  PENDING: 'bg-slate-100 text-slate-700',
  'UNDER REVIEW': 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default function ClaimAdjudication() {
  const [selectedStatus, setSelectedStatus] = useState('PENDING');
  const [selectedClaim, setSelectedClaim] = useState(claimsQueue[0]);
  const [approvedAmount, setApprovedAmount] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showApproveInput, setShowApproveInput] = useState(false);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [errors, setErrors] = useState({});

  const filteredClaims = useMemo(
    () => claimsQueue.filter((claim) => claim.status === selectedStatus),
    [selectedStatus]
  );

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    const nextClaim = claimsQueue.find((claim) => claim.status === status) || claimsQueue[0];
    setSelectedClaim(nextClaim);
    setShowApproveInput(false);
    setShowRejectInput(false);
    setApprovedAmount('');
    setRejectionReason('');
    setErrors({});
  };

  const handleApprove = () => {
    if (!approvedAmount || Number(approvedAmount) <= 0) {
      setErrors({ approvedAmount: 'Enter a valid approved payout amount' });
      return;
    }
    setErrors({});
    setShowApproveInput(false);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      setErrors({ rejectionReason: 'Provide a rejection reason before submitting' });
      return;
    }
    setErrors({});
    setShowRejectInput(false);
  };

  return (
    <section className="container-main py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Claims Adjudication</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Operator Workspace</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">Review incoming claims, evaluate customer evidence, and update case status from the adjudication queue.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Master Queue</p>
              <p className="mt-1 text-sm text-slate-600">Filter and select claims for review.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOrder.map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedStatus === status
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Claim ID</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Policy</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Customer</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Submitted</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em] text-slate-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className={`cursor-pointer transition hover:bg-slate-50 ${selectedClaim.id === claim.id ? 'bg-slate-50' : ''}`}
                    onClick={() => {
                      setSelectedClaim(claim);
                      setShowApproveInput(false);
                      setShowRejectInput(false);
                      setApprovedAmount('');
                      setRejectionReason('');
                      setErrors({});
                    }}
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">{claim.id}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.policy}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.customer}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.submittedOn}</td>
                    <td className="px-6 py-4 text-slate-600">{claim.requestedAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Claim Evaluation</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">{selectedClaim.id}</h2>
            </div>
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${statusClasses[selectedClaim.status]}`}>
              {selectedClaim.status}
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Customer</p>
              <p className="mt-3 text-sm text-slate-600">{selectedClaim.customer}</p>
              <p className="mt-1 text-sm text-slate-600">{selectedClaim.customerEmail}</p>
              <p className="mt-1 text-sm text-slate-600">{selectedClaim.customerPhone}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Policy Details</p>
              <p className="mt-3 text-sm text-slate-600">{selectedClaim.policy}</p>
              <p className="mt-1 text-sm text-slate-600">Policy ID: {selectedClaim.policyId}</p>
              <p className="mt-1 text-sm text-slate-600">Incident: {selectedClaim.incidentDate}</p>
            </div>
          </div>

          <div className="mt-6 space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Incident Description</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{selectedClaim.incidentDescription}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Medical Center</p>
              <p className="mt-3 text-sm text-slate-600">{selectedClaim.medicalCenter}</p>
              <p className="mt-1 text-sm text-slate-600">{selectedClaim.medicalAddress}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Requested Payout</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{selectedClaim.requestedAmount}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-[1.75rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Uploaded Documents</p>
            <div className="grid gap-3">
              {selectedClaim.files.map((file) => (
                <button
                  key={file}
                  type="button"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  {file}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Mark Under Review
            </button>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setShowApproveInput((prev) => !prev);
                  setShowRejectInput(false);
                  setErrors({});
                }}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Approve Claim
              </button>
              {showApproveInput && (
                <div className="space-y-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
                  <label className="block text-sm font-medium text-slate-900">Approved Payout Amount</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-slate-500">₹</span>
                    <input
                      type="number"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(e.target.value)}
                      className={`w-full rounded-3xl border px-4 py-3 pl-10 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
                        errors.approvedAmount ? 'border-red-300 ring-red-200' : 'border-slate-200'
                      }`}
                      placeholder="Enter amount"
                    />
                  </div>
                  {errors.approvedAmount && <p className="text-sm text-red-600">{errors.approvedAmount}</p>}
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    Submit Approval
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setShowRejectInput((prev) => !prev);
                  setShowApproveInput(false);
                  setErrors({});
                }}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Reject Claim
              </button>
              {showRejectInput && (
                <div className="space-y-3 rounded-3xl border border-red-200 bg-red-50 p-4">
                  <label className="block text-sm font-medium text-slate-900">Rejection Reason</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 ${
                      errors.rejectionReason ? 'border-red-300 ring-red-200' : 'border-slate-200'
                    }`}
                    placeholder="Enter the reason this claim cannot be approved"
                  />
                  {errors.rejectionReason && <p className="text-sm text-red-600">{errors.rejectionReason}</p>}
                  <button
                    type="button"
                    onClick={handleReject}
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
                  >
                    Submit Rejection
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
