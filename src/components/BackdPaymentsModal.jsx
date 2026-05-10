import { useEffect } from 'react';
import BackdPaymentsApp from './BackdPaymentsApp';

// Modal wrapper around our local BackdPaymentsApp clone. Replaces the
// previous iframe to sandbox.bnpl.backd.com — we now own the page
// rendering so the team can iterate on branding/copy without touching
// the production BNPL repo.
export default function BackdPaymentsModal({ open, onClose, onSuccess, onFail }) {
  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

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

  const complete = () => onSuccess?.();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pay later with BackdPayments"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative h-full max-h-[860px] w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close BackdPayments"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <BackdPaymentsApp
          vendorName="SNKR hub"
          vendorLogoSrc="/official-store.png"
          onSelectTerms={complete}
          onApply={complete}
        />
      </div>
    </div>
  );
}
