import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const defaultPolicy = {
  name: 'Health Plus Comprehensive',
  code: 'HPC-2026-XL',
  description:
    'A robust health insurance plan designed to protect individuals and families against hospitalization, outpatient treatment, and dental expenses.',
  benefits: [
    'Hospitalization coverage up to 100%',
    'OPD consultations and diagnostics',
    'Dental treatment coverage',
  ],
  exclusions: [
    'Pre-existing conditions waiting period applies',
    'Cosmetic procedures and elective treatments',
    'Injuries due to hazardous sports or self-harm',
  ],
};

const sumInsuredOptions = ['₹5,00,000', '₹10,00,000', '₹15,00,000', '₹25,00,000'];
const tenureOptions = [1, 2, 3];

export default function PolicyDetail({ policy = defaultPolicy }) {
  const [age, setAge] = useState(35);
  const [sumInsured, setSumInsured] = useState(sumInsuredOptions[1]);
  const [tenure, setTenure] = useState(1);
  const [familyMembers, setFamilyMembers] = useState(1);
  const [estimatedPremium, setEstimatedPremium] = useState(0);

  const sumValue = useMemo(() => {
    return Number(sumInsured.replace(/[^0-9]/g, '')) || 500000;
  }, [sumInsured]);

  useEffect(() => {
    const ageFactor = age > 30 ? 1 + (age - 30) * 0.02 : 1;
    const familyFactor = familyMembers > 1 ? 1 + (familyMembers - 1) * 0.18 : 1;
    const tenureDiscount = tenure === 2 ? 0.96 : tenure === 3 ? 0.91 : 1;
    const baseRate = 0.0012;

    const annualEstimate = sumValue * baseRate * ageFactor * familyFactor * tenureDiscount;
    const monthlyEstimate = annualEstimate / 12;

    setEstimatedPremium(Math.max(monthlyEstimate, 250));
  }, [age, sumValue, tenure, familyMembers]);

  return (
    <section className="container-main py-10">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Policy Detail</p>
            <h1 className="text-4xl font-semibold text-slate-900">{policy.name}</h1>
            <p className="text-sm text-slate-500">Policy Code: <span className="font-semibold text-slate-900">{policy.code}</span></p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
            <p className="text-sm leading-7 text-slate-600">{policy.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Coverage Benefits</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {policy.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Exclusions</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {policy.exclusions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Premium Calculator</h2>
            <p className="text-sm text-slate-600">Adjust the details below to estimate your monthly premium.</p>
          </div>

          <div className="space-y-5 pt-4">
            <label className="block text-sm font-semibold text-slate-900">Age</label>
            <input
              type="number"
              value={age}
              onChange={(event) => setAge(Math.max(18, Number(event.target.value) || 18))}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              min={18}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-900">Sum Insured Preference</label>
                <select
                  value={sumInsured}
                  onChange={(event) => setSumInsured(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {sumInsuredOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Tenure (Years)</label>
                <select
                  value={tenure}
                  onChange={(event) => setTenure(Number(event.target.value))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {tenureOptions.map((option) => (
                    <option key={option} value={option}>{option} year{option > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="block text-sm font-semibold text-slate-900">Number of Family Members</label>
            <input
              type="number"
              value={familyMembers}
              onChange={(event) => setFamilyMembers(Math.max(1, Number(event.target.value) || 1))}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              min={1}
            />
          </div>

          <div className="mt-8 rounded-[2rem] bg-emerald-50 p-6 text-center text-emerald-900 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Estimated Premium</p>
            <p className="mt-4 text-5xl font-semibold">₹{estimatedPremium.toFixed(0)}</p>
            <p className="mt-2 text-sm text-emerald-700">per month</p>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Proceed to Enrollment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
