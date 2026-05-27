import { useSelector } from 'react-redux';
import { selectApplicationId } from '../store/applicationSlice';

export default function ApplicationSuccess({ onComplete }) {
  const applicationId = useSelector(selectApplicationId);

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
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-navy-900">Application Submitted!</h1>
            <p className="mt-2 text-sm text-navy-500">
              Your application has been received and is being reviewed. You'll receive an email update within 24 hours.
            </p>

            <div className="mt-6 rounded-lg bg-neutral-50 p-4">
              <div className="text-sm text-navy-500">Application ID</div>
              <div className="mt-1 font-mono text-lg font-bold text-navy-900">{applicationId}</div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="text-sm text-navy-600">
                <strong>What happens next?</strong>
              </div>
              <ul className="text-left text-sm text-navy-600 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-mint-500">•</span>
                  We'll review your application within 24 hours
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-mint-500">•</span>
                  If approved, you'll get instant access to your credit line
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-mint-500">•</span>
                  Your account is ready to use immediately
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="mt-8 w-full rounded-xl bg-mint-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2"
            >
              Continue to Checkout
            </button>

            <p className="mt-4 text-xs text-navy-500">
              Questions? Contact us at{' '}
              <a href="mailto:support@backd.com" className="text-mint-600 underline">
                support@backd.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}