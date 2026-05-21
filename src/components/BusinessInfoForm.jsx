import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBusinessInfo, setStep, selectBusinessInfo } from '../store/applicationSlice';

export default function BusinessInfoForm() {
  const dispatch = useDispatch();
  const businessInfo = useSelector(selectBusinessInfo);
  const [formData, setFormData] = useState(businessInfo);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBusinessInfo(formData));
    dispatch(setStep('financial-info'));
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
            <h1 className="text-center text-2xl font-bold text-navy-900">Business Information</h1>
            <p className="mt-2 text-center text-sm text-navy-500">
              Tell us about your business to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-navy-900">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                required
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="Your Business LLC"
              />
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-navy-900">
                Business Type
              </label>
              <select
                id="businessType"
                required
                value={formData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
              >
                <option value="">Select type</option>
                <option value="retail">Retail</option>
                <option value="ecommerce">E-commerce</option>
                <option value="wholesale">Wholesale</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="yearsOperating" className="block text-sm font-medium text-navy-900">
                Years Operating
              </label>
              <input
                type="number"
                id="yearsOperating"
                required
                min="0"
                value={formData.yearsOperating}
                onChange={(e) => handleChange('yearsOperating', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="2"
              />
            </div>

            <div>
              <label htmlFor="annualRevenue" className="block text-sm font-medium text-navy-900">
                Annual Revenue
              </label>
              <select
                id="annualRevenue"
                required
                value={formData.annualRevenue}
                onChange={(e) => handleChange('annualRevenue', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
              >
                <option value="">Select range</option>
                <option value="under-100k">Under $100K</option>
                <option value="100k-500k">$100K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="over-5m">Over $5M</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-navy-900">
                Business Address
              </label>
              <input
                type="text"
                id="address"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="123 Main St, City, State 12345"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-900">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-900">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
                placeholder="contact@yourbusiness.com"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => dispatch(setStep('landing'))}
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