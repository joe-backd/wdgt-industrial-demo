const SIZE_HEIGHT = {
  sm: 14,
  md: 20,
  lg: 28,
};

export default function BrandMark({ size = 'md', variant = 'dark', className = '' }) {
  const h = SIZE_HEIGHT[size] ?? SIZE_HEIGHT.md;
  const src = variant === 'white' ? '/bp-logo-white.png' : '/bp-logo-dark.png';

  return (
    <img
      src={src}
      alt="BackdPayments"
      height={h}
      style={{ height: h, width: 'auto', display: 'inline-block', verticalAlign: 'middle' }}
      className={className}
    />
  );
}
