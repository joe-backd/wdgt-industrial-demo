import { useEffect, useRef } from 'react';

// BackdPayments application modal. Iframes the sandbox BNPL flow at the
// pre-issued token URL the team gave us, listens for the same postMessage
// protocol the widget bundle uses (`{ action: 'success' | 'close' | 'fail' }`),
// and reports outcome back via callbacks.
const BNPL_URL =
  'https://sandbox.bnpl.backd.com/?token=9cffaa62-886a-4653-a753-ed3944e5677f';
const BNPL_ORIGIN = 'https://sandbox.bnpl.backd.com';

export default function BackdPaymentsModal({ open, onClose, onSuccess, onFail }) {
  const dialogRef = useRef(null);

  // ESC key closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Listen for postMessage from the BNPL iframe
  useEffect(() => {
    if (!open) return;
    const onMsg = (e) => {
      if (e.origin !== BNPL_ORIGIN) return;
      const action = e.data?.action;
      if (action === 'success') onSuccess?.(e.data?.payload);
      else if (action === 'close') onClose?.();
      else if (action === 'fail') onFail?.(e.data?.payload);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [open, onSuccess, onClose, onFail]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pay later with BackdPayments"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        // Click outside the iframe wrapper closes
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative h-full max-h-[760px] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close BackdPayments"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <iframe
          src={BNPL_URL}
          title="BackdPayments application"
          className="h-full w-full border-0"
          allow="payment *; publickey-credentials-get *"
        />
      </div>
    </div>
  );
}
