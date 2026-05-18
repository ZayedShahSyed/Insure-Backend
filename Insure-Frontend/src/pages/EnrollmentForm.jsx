import { useMemo, useState } from 'react';

const sumInsuredOptions = ['₹5,00,000', '₹10,00,000', '₹15,00,000', '₹25,00,000'];
const tenureOptions = [1, 2, 3];
const relationshipOptions = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'];

const initialMember = { name: '', relation: '', dateOfBirth: '' };
const initialValues = {
  nomineeName: '',
  nomineeRelation: '',
  nomineeDob: '',
  preExistingConditions: '',
  sumInsured: sumInsuredOptions[1],
  tenure: 1,
  coverageStartDate: '',
  familyMembersCount: 1,
  familyMembers: [initialMember],
};

export default function EnrollmentForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const today = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const familyMembers = [...prev.familyMembers];
      familyMembers[index] = { ...familyMembers[index], [field]: value };
      return { ...prev, familyMembers };
    });
  };

  const handleFamilyCountChange = (value) => {
    const count = Math.max(1, Number(value) || 1);
    setFormData((prev) => {
      const familyMembers = [...prev.familyMembers];
      while (familyMembers.length < count) familyMembers.push({ ...initialMember });
      while (familyMembers.length > count) familyMembers.pop();
      return { ...prev, familyMembersCount: count, familyMembers };
    });
    if (errors.familyMembersCount) setErrors((prev) => ({ ...prev, familyMembersCount: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.nomineeName.trim()) nextErrors.nomineeName = 'Nominee name is required';
    if (!formData.nomineeRelation) nextErrors.nomineeRelation = 'Relationship is required';
    if (!formData.nomineeDob) nextErrors.nomineeDob = 'Nominee date of birth is required';
    if (!formData.coverageStartDate) nextErrors.coverageStartDate = 'Coverage start date is required';
    else if (formData.coverageStartDate < today) nextErrors.coverageStartDate = 'Start date cannot be in the past';
    if (!formData.sumInsured) nextErrors.sumInsured = 'Please choose a sum insured option';
    if (!formData.tenure) nextErrors.tenure = 'Choose policy tenure';
    if (!formData.familyMembersCount || formData.familyMembersCount < 1) nextErrors.familyMembersCount = 'Family members count must be at least 1';

    formData.familyMembers.forEach((member, index) => {
      if (!member.name.trim()) nextErrors[`memberName-${index}`] = 'Member name is required';
      if (!member.relation) nextErrors[`memberRelation-${index}`] = 'Relationship is required';
      if (!member.dateOfBirth) nextErrors[`memberDob-${index}`] = 'Date of birth is required';
    });

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSuccessModalOpen(true);
  };

  const handleCancel = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="mb-10 flex flex-col gap-3 rounded-[1.5rem] bg-slate-950 px-8 py-8 text-white sm:px-12">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Policy Enrollment</p>
          <h1 className="text-4xl font-semibold tracking-tight">Complete your enrollment details</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Provide nominee, coverage, and plan customization details clearly so we can process your application faster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <fieldset className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <legend className="px-3 text-sm font-semibold text-slate-900">Nominee Info</legend>
              <div className="space-y-5 pt-3">
                <div>
                  <label htmlFor="nomineeName" className="block text-sm font-medium text-slate-700">Nominee Name</label>
                  <input
                    id="nomineeName"
                    name="nomineeName"
                    value={formData.nomineeName}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.nomineeName ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                    placeholder="Enter nominee full name"
                  />
                  {errors.nomineeName && <p className="mt-2 text-sm text-red-600">{errors.nomineeName}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeRelation" className="block text-sm font-medium text-slate-700">Relationship to User</label>
                  <select
                    id="nomineeRelation"
                    name="nomineeRelation"
                    value={formData.nomineeRelation}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.nomineeRelation ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((relation) => (
                      <option key={relation} value={relation}>{relation}</option>
                    ))}
                  </select>
                  {errors.nomineeRelation && <p className="mt-2 text-sm text-red-600">{errors.nomineeRelation}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeDob" className="block text-sm font-medium text-slate-700">Date of Birth</label>
                  <input
                    id="nomineeDob"
                    name="nomineeDob"
                    type="date"
                    value={formData.nomineeDob}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.nomineeDob ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  />
                  {errors.nomineeDob && <p className="mt-2 text-sm text-red-600">{errors.nomineeDob}</p>}
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <legend className="px-3 text-sm font-semibold text-slate-900">Medical Disclosures</legend>
              <div className="space-y-5 pt-3">
                <label htmlFor="preExistingConditions" className="block text-sm font-medium text-slate-700">Health Declaration</label>
                <textarea
                  id="preExistingConditions"
                  name="preExistingConditions"
                  value={formData.preExistingConditions}
                  onChange={handleChange}
                  rows={6}
                  className="mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 border-slate-200"
                  placeholder="Describe any pre-existing conditions or lifestyle disclosures here"
                />
              </div>
            </fieldset>
          </div>

          <div className="space-y-6">
            <fieldset className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <legend className="px-3 text-sm font-semibold text-slate-900">Plan Customization</legend>
              <div className="space-y-5 pt-3">
                <div>
                  <label htmlFor="sumInsured" className="block text-sm font-medium text-slate-700">Sum Insured</label>
                  <select
                    id="sumInsured"
                    name="sumInsured"
                    value={formData.sumInsured}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.sumInsured ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  >
                    {sumInsuredOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.sumInsured && <p className="mt-2 text-sm text-red-600">{errors.sumInsured}</p>}
                </div>

                <div>
                  <label htmlFor="tenure" className="block text-sm font-medium text-slate-700">Policy Tenure</label>
                  <select
                    id="tenure"
                    name="tenure"
                    value={formData.tenure}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tenure: Number(e.target.value) }))}
                    className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.tenure ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  >
                    {tenureOptions.map((option) => (
                      <option key={option} value={option}>{option} year{option > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {errors.tenure && <p className="mt-2 text-sm text-red-600">{errors.tenure}</p>}
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <legend className="px-3 text-sm font-semibold text-slate-900">Coverage Details</legend>
              <div className="space-y-5 pt-3">
                <div>
                  <label htmlFor="familyMembersCount" className="block text-sm font-medium text-slate-700">Family Members</label>
                  <input
                    id="familyMembersCount"
                    name="familyMembersCount"
                    type="number"
                    value={formData.familyMembersCount}
                    min={1}
                    onChange={(e) => handleFamilyCountChange(e.target.value)}
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.familyMembersCount ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                    placeholder="Number of insured members"
                  />
                  {errors.familyMembersCount && <p className="mt-2 text-sm text-red-600">{errors.familyMembersCount}</p>}
                </div>

                <div className="grid gap-4">
                  {formData.familyMembers.map((member, index) => (
                    <div key={`member-${index}`} className="rounded-3xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">Member {index + 1}</p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700">Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                            className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors[`memberName-${index}`] ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                            placeholder="Enter name"
                          />
                          {errors[`memberName-${index}`] && <p className="mt-2 text-sm text-red-600">{errors[`memberName-${index}`]}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700">Relationship</label>
                          <select
                            value={member.relation}
                            onChange={(e) => handleFamilyMemberChange(index, 'relation', e.target.value)}
                            className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors[`memberRelation-${index}`] ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                          >
                            <option value="">Select relationship</option>
                            {relationshipOptions.map((relation) => (
                              <option key={relation} value={relation}>{relation}</option>
                            ))}
                          </select>
                          {errors[`memberRelation-${index}`] && <p className="mt-2 text-sm text-red-600">{errors[`memberRelation-${index}`]}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
                          <input
                            type="date"
                            value={member.dateOfBirth}
                            onChange={(e) => handleFamilyMemberChange(index, 'dateOfBirth', e.target.value)}
                            className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors[`memberDob-${index}`] ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                          />
                          {errors[`memberDob-${index}`] && <p className="mt-2 text-sm text-red-600">{errors[`memberDob-${index}`]}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="coverageStartDate" className="block text-sm font-medium text-slate-700">Coverage Start Date</label>
                  <input
                    id="coverageStartDate"
                    name="coverageStartDate"
                    type="date"
                    value={formData.coverageStartDate}
                    min={today}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${errors.coverageStartDate ? 'border-red-300 ring-red-200' : 'border-slate-200'}`}
                  />
                  {errors.coverageStartDate && <p className="mt-2 text-sm text-red-600">{errors.coverageStartDate}</p>}
                </div>
              </div>
            </fieldset>
          </div>

          <div className="xl:col-span-2">
            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Ready to submit?</p>
                <p className="mt-1 text-sm text-slate-600">Review your details and submit your application for activation.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
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
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">Success</p>
              <h2 className="text-3xl font-semibold text-slate-900">Application Created</h2>
              <p className="text-sm leading-7 text-slate-600">Your policy enrollment application has been submitted and is pending activation.</p>
              <button
                type="button"
                onClick={() => setSuccessModalOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
