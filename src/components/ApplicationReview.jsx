import { useDispatch, useSelector } from 'react-redux';
import {
  setStep,
  selectBusinessInfo,
  selectFinancialInfo,
  selectSelectedTerms,
  setSubmitting,
  setApplicationId,
} from '../store/applicationSlice';

const termsDetails = {
  'net-30': { name: 'Net 30', fee: 'No fees', limit: 'Up to $50K' },
  'installments-6': { name: '6 Month Installments', fee: '2.9% fee', limit: 'Up to $25K' },
  'installments-12': { name: '12 Month Installments', fee: '5.9% fee', limit: 'Up to $50K' },
  'installments-24': { name: '24 Month Installments', fee: '11.9% fee', limit: 'Up to $100K' },
};

export default function ApplicationReview() {
  const dispatch = useDispatch();
  const businessInfo = useSelector(selectBusinessInfo);
  const financialInfo = useSelector(selectFinancialInfo);
  const selectedTerms = useSelector(selectSelectedTerms);

  const handleSubmit = async () => {
    dispatch(setSubmitting(true));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate fake application ID
    const applicationId = 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    dispatch(setApplicationId(applicationId));
    dispatch(setStep('success'));
  };

  const selectedTermsInfo = termsDetails[selectedTerms];

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
        <div className="w-full max-w-2xl rounded-3xl bg-white px-8 py-10 shadow-2xl sm:px-10 sm:py-12">
          <div className="mb-8">
            <h1 className="text-center text-2xl font-bold text-navy-900">Review Your Application</h1>
            <p className="mt-2 text-center text-sm text-navy-500">
              Please review all information before submitting
            </p>
          </div>

          <div className="space-y-8">
            {/* Business Information */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-4">Business Information</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-sm font-medium text-navy-500">Business Name</span>
                  <p className="text-sm text-navy-900">{businessInfo.businessName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Business Type</span>
                  <p className="text-sm text-navy-900 capitalize">{businessInfo.businessType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Years Operating</span>
                  <p className="text-sm text-navy-900">{businessInfo.yearsOperating}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Annual Revenue</span>
                  <p className="text-sm text-navy-900">{businessInfo.annualRevenue.replace('-', ' - ').replace('k', 'K').replace('m', 'M')}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-sm font-medium text-navy-500">Address</span>
                  <p className="text-sm text-navy-900">{businessInfo.address}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Phone</span>
                  <p className="text-sm text-navy-900">{businessInfo.phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Email</span>
                  <p className="text-sm text-navy-900">{businessInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-4">Financial Information</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-sm font-medium text-navy-500">Bank Name</span>
                  <p className="text-sm text-navy-900">{financialInfo.bankName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Account Number</span>
                  <p className="text-sm text-navy-900">****{financialInfo.accountNumber.slice(-4)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Routing Number</span>
                  <p className="text-sm text-navy-900">{financialInfo.routingNumber}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-navy-500">Tax ID</span>
                  <p className="text-sm text-navy-900">***-**-{financialInfo.taxId.slice(-4)}</p>
                </div>
              </div>
            </div>

            {/* Selected Terms */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-4">Selected Terms</h2>
              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-navy-900">{selectedTermsInfo.name}</h3>
                    <p className="text-sm text-navy-600 mt-1">
                      {selectedTermsInfo.fee} • {selectedTermsInfo.limit}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-navy-500">Approval up to</div>
                    <div className="text-lg font-bold text-mint-600">{selectedTermsInfo.limit}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => dispatch(setStep('terms-selection'))}
              className="flex-1 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-mint-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}