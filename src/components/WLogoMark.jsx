export default function WLogoMark({ size = 44, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="WDGT Industrial"
    >
      <rect width="32" height="32" rx="4.5" fill="#A8533A" />
      <polyline
        points="4.5,8 9.5,24 16,13.5 22.5,24 27.5,8"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
