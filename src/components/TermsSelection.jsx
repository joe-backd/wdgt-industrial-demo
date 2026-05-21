import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTerms, setStep, selectSelectedTerms } from '../store/applicationSlice';

const termsOptions = [
  {
    id: 'net-30',
    name: 'Net 30',
    description: 'Pay in full within 30 days',
    fee: 'No fees',
    limit: 'Up to $50K',
  },
  {
    id: 'installments-6',
    name: '6 Month Installments',
    description: 'Spread payments over 6 months',
    fee: '2.9% fee',
    limit: 'Up to $25K',
  },
  {
    id: 'installments-12',
    name: '12 Month Installments',
    description: 'Spread payments over 12 months',
    fee: '5.9% fee',
    limit: 'Up to $50K',
  },
  {
    id: 'installments-24',
    name: '24 Month Installments',
    description: 'Spread payments over 24 months',
    fee: '11.9% fee',
    limit: 'Up to $100K',
  },
];

export default function TermsSelection() {
  const dispatch = useDispatch();
  const selectedTerms = useSelector(selectSelectedTerms);

  const handleSelectTerms = (termsId) => {
    dispatch(setSelectedTerms(termsId));
    dispatch(setStep('review'));
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
        <div className="w-full max-w-2xl rounded-3xl bg-white px-8 py-10 shadow-2xl sm:px-10 sm:py-12">
          <div className="mb-8">
            <h1 className="text-center text-2xl font-bold text-navy-900">Select Your Terms</h1>
            <p className="mt-2 text-center text-sm text-navy-500">
              Choose the payment plan that works best for your business
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {termsOptions.map((terms) => (
              <div
                key={terms.id}
                className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  selectedTerms === terms.id
                    ? 'border-mint-500 bg-mint-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                onClick={() => handleSelectTerms(terms.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy-900">{terms.name}</h3>
                    <p className="mt-1 text-sm text-navy-600">{terms.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-navy-900">Fee:</span>
                        <span className="ml-2 text-navy-600">{terms.fee}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-navy-900">Limit:</span>
                        <span className="ml-2 text-navy-600">{terms.limit}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`ml-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    selectedTerms === terms.id
                      ? 'border-mint-500 bg-mint-500'
                      : 'border-neutral-300'
                  }`}>
                    {selectedTerms === terms.id && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => dispatch(setStep('financial-info'))}
              className="flex-1 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!selectedTerms}
              onClick={() => selectedTerms && dispatch(setStep('review'))}
              className="flex-1 rounded-xl bg-mint-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}