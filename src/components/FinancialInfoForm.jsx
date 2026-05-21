import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFinancialInfo, setStep, selectFinancialInfo } from '../store/applicationSlice';

export default function FinancialInfoForm() {
  const dispatch = useDispatch();
  const financialInfo = useSelector(selectFinancialInfo);
  const [formData, setFormData] = useState(financialInfo);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFinancialInfo(formData));
    dispatch(setStep('terms-selection'));
  };

  return (
    <div className="relative h-full w-full overflow-y-auto bg-forest-900">
      {/* Hex pattern background - same as landing */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="bnpl-hex-a" width="48" height="56" patternUnits="userSpaceOnUse">
            <polygon
              points="12,1 36,1 47,28 36,55 12,55 1,28"
              fill="none"
              stroke="#234638"
              strokeWidth="1"
              opacity="0.7"
            />
          </pattern>
          <pattern id="bnpl-hex-b" width="48" height="56" patternUnits="userSpaceOnUse" x="24" y="28">
            <polygon
              points="12,1 36,1 47,28 36,55 12,55 1,28"
              fill="none"
              stroke="#234638"
              strokeWidth="1"
              opacity="0.7"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bnpl-hex-a)" />
        <rect width="100%" height="100%" fill="url(#bnpl-hex-b)" />
      </svg>

      <div className="relative flex min-h-full items-center justify-center p-5 sm:p-6">
        <div className="w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-2xl sm:px-10 sm:py-12">
          <div className="mb-8">
            <h1 className="text-center text-2xl font-bold text-navy-900">Financial Information</h1>
            <p className="mt-2 text-center text-sm text-navy-500">
              We need some banking details to process your application
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-navy-900">
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                required
                value={formData.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="Chase Bank"
              />
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-navy-900">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                required
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="123456789"
              />
            </div>

            <div>
              <label htmlFor="routingNumber" className="block text-sm font-medium text-navy-900">
                Routing Number
              </label>
              <input
                type="text"
                id="routingNumber"
                required
                pattern="[0-9]{9}"
                value={formData.routingNumber}
                onChange={(e) => handleChange('routingNumber', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="021000021"
              />
            </div>

            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-navy-900">
                Tax ID (EIN or SSN)
              </label>
              <input
                type="text"
                id="taxId"
                required
                pattern="[0-9]{9}"
                value={formData.taxId}
                onChange={(e) => handleChange('taxId', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="123456789"
              />
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Secure Information</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>Your financial information is encrypted and secure. We use bank-level security to protect your data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => dispatch(setStep('business-info'))}
                className="flex-1 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-mint-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}