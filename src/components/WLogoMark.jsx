export default function WLogoMark({ size = 44, className = '' }) {
  return (
    <img
      src="/wlogo.png"
      width={size}
      height={size}
      alt="WDGT Supply"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
