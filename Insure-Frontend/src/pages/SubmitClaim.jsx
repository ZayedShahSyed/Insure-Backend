import { useMemo, useState } from 'react';

const activePolicies = [
  { id: 'HPC-0012', name: 'Health Plus Comprehensive' },
  { id: 'FAM-2045', name: 'Family Wellness Floater' },
];

const claimTypes = ['Hospitalization', 'OPD', 'Accidental', 'Critical Illness'];

export default function SubmitClaim() {
  const [formData, setFormData] = useState({
    policyId: activePolicies[0].id,
    claimType: claimTypes[0],
    incidentDate: '',
    medicalCenter: '',
    medicalAddress: '',
    incidentDescription: '',
    claimAmount: '',
    files: [],
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFiles = (e) => {
    setFormData((prev) => ({ ...prev, files: Array.from(e.target.files) }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.policyId) nextErrors.policyId = 'Select a policy';
    if (!formData.claimType) nextErrors.claimType = 'Choose a claim type';
    if (!formData.incidentDate) nextErrors.incidentDate = 'Incident date is required';
    else if (formData.incidentDate > today) nextErrors.incidentDate = 'Incident date cannot be in the future';
    if (!formData.medicalCenter.trim()) nextErrors.medicalCenter = 'Medical center name is required';
    if (!formData.medicalAddress.trim()) nextErrors.medicalAddress = 'Medical center address is required';
    if (!formData.incidentDescription.trim()) nextErrors.incidentDescription = 'Provide details about the incident';
    if (!formData.claimAmount.trim() || Number(formData.claimAmount) <= 0) nextErrors.claimAmount = 'Enter the requested claim amount';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const dummyClaimId = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmation({ claimId: dummyClaimId, policy: activePolicies.find((policy) => policy.id === formData.policyId)?.name });
    setFormData({
      policyId: activePolicies[0].id,
      claimType: claimTypes[0],
      incidentDate: '',
      medicalCenter: '',
      medicalAddress: '',
      incidentDescription: '',
      claimAmount: '',
      files: [],
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      policyId: activePolicies[0].id,
      claimType: claimTypes[0],
      incidentDate: '',
      medicalCenter: '',
      medicalAddress: '',
      incidentDescription: '',
      claimAmount: '',
      files: [],
    });
    setErrors({});
    setConfirmation(null);
  };

  return (
    <section className="container-main py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Submit a Claim</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">File your claim securely</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Choose the policy, describe the incident, and upload supporting documents for quick processing.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="policyId" className="block text-sm font-medium text-slate-700">Select Policy</label>
                <select
                  id="policyId"
                  name="policyId"
                  value={formData.policyId}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.policyId ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                >
                  {activePolicies.map((policy) => (
                    <option key={policy.id} value={policy.id}>{policy.name} ({policy.id})</option>
                  ))}
                </select>
                {errors.policyId && <p className="mt-2 text-sm text-red-600">{errors.policyId}</p>}
              </div>

              <div>
                <label htmlFor="claimType" className="block text-sm font-medium text-slate-700">Claim Type</label>
                <select
                  id="claimType"
                  name="claimType"
                  value={formData.claimType}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.claimType ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                >
                  {claimTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.claimType && <p className="mt-2 text-sm text-red-600">{errors.claimType}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="incidentDate" className="block text-sm font-medium text-slate-700">Date of Incident</label>
                <input
                  id="incidentDate"
                  name="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  max={today}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.incidentDate ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                />
                {errors.incidentDate && <p className="mt-2 text-sm text-red-600">{errors.incidentDate}</p>}
              </div>

              <div>
                <label htmlFor="claimAmount" className="block text-sm font-medium text-slate-700">Requested Claim Amount</label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-slate-500">₹</span>
                  <input
                    id="claimAmount"
                    name="claimAmount"
                    type="number"
                    value={formData.claimAmount}
                    onChange={handleChange}
                    min={0}
                    className={`w-full rounded-3xl border px-4 py-3 pl-10 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.claimAmount ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.claimAmount && <p className="mt-2 text-sm text-red-600">{errors.claimAmount}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="medicalCenter" className="block text-sm font-medium text-slate-700">Medical Center Name</label>
                <input
                  id="medicalCenter"
                  name="medicalCenter"
                  value={formData.medicalCenter}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.medicalCenter ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="Hospital or clinic name"
                />
                {errors.medicalCenter && <p className="mt-2 text-sm text-red-600">{errors.medicalCenter}</p>}
              </div>

              <div>
                <label htmlFor="medicalAddress" className="block text-sm font-medium text-slate-700">Medical Center Address</label>
                <input
                  id="medicalAddress"
                  name="medicalAddress"
                  value={formData.medicalAddress}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.medicalAddress ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  placeholder="Full address or clinic location"
                />
                {errors.medicalAddress && <p className="mt-2 text-sm text-red-600">{errors.medicalAddress}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="incidentDescription" className="block text-sm font-medium text-slate-700">Medical Incident Description</label>
              <textarea
                id="incidentDescription"
                name="incidentDescription"
                rows={5}
                value={formData.incidentDescription}
                onChange={handleChange}
                className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.incidentDescription ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                placeholder="Describe what happened and how it affects your claim"
              />
              {errors.incidentDescription && <p className="mt-2 text-sm text-red-600">{errors.incidentDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Upload Supporting Documents</label>
              <div className="mt-2 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-slate-600">
                <p className="text-sm font-semibold text-slate-900">Drop files here or click to upload</p>
                <p className="mt-2 text-sm">Upload medical bills, invoices, discharge summaries, or treatment reports.</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFiles}
                  className="mt-6 w-full cursor-pointer rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none"
                />
                {formData.files.length > 0 && (
                  <p className="mt-3 text-sm text-slate-600">{formData.files.length} file(s) selected</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Submit Claim
              </button>
            </div>
          </form>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Claim Guidelines</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Select the correct active policy before submission.</li>
                <li>• Attach all relevant documentation to reduce review time.</li>
                <li>• Incident date must not be in the future.</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Quick Facts</p>
              <p className="mt-3 text-sm text-slate-600">Claims are typically reviewed within 2–3 business days after complete documentation is received.</p>
            </div>
          </aside>
        </div>

        {confirmation && (
          <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Claim Submitted</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Claim filed successfully</h2>
                <p className="mt-1 text-sm text-slate-700">Your claim has been logged against <span className="font-semibold">{confirmation.policy}</span>.</p>
              </div>
              <div className="rounded-3xl bg-white px-5 py-4 text-sm font-semibold text-emerald-900 shadow-sm">
                Claim ID: <span className="text-lg">{confirmation.claimId}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
