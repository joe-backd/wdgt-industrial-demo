// BackdPayments lockup. The B-mark path is identical to the SVG the
// widget bundle ships, but recolored to the official BackdPayments
// green (#269374) — the widget bundle ships it in blue (#4D65FF),
// which is wrong per the brand spec. "BackdPayments" is one word,
// no space between Backd and Payments.

// Icon size targets the cap-height of the wordmark "B" so the brand-mark
// glyph reads at roughly the same scale as the typographic B beside it.
// Montserrat cap-height is ~0.7 of font-size; SVG bbox ~ icon-height.
const SIZE_VARIANTS = {
  sm: { icon: 11, gap: 'gap-1', text: 'text-sm' },     // text-sm 14px → cap ~10
  md: { icon: 14, gap: 'gap-1.5', text: 'text-lg' },   // text-lg 18px → cap ~13
  lg: { icon: 18, gap: 'gap-2', text: 'text-2xl' },    // text-2xl 24px → cap ~17
};

export default function BrandMark({ size = 'md', className = '' }) {
  const v = SIZE_VARIANTS[size] ?? SIZE_VARIANTS.md;
  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight ${v.gap} ${v.text} ${className}`}
      aria-label="BackdPayments"
    >
      <svg
        width={v.icon}
        height={v.icon}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-mint-500"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M30.4095 16.3579C31.9931 14.5691 32.8565 12.2559 32.8326 9.86648C32.8434 8.56783 32.5957 7.28002 32.1039 6.07813C31.6122 4.87624 30.8862 3.7843 29.9683 2.86599C29.0504 1.94767 27.959 1.22135 26.7576 0.729351C25.5563 0.237356 24.2691 -0.0104637 22.9711 0.000338523H8.8158C8.39031 0.0184088 7.98533 0.188311 7.67423 0.479278L0.478774 7.62652C0.169299 7.94645 -0.00255089 8.37497 6.24337e-05 8.82018V33.5187C-0.00190111 33.7515 0.0424685 33.9823 0.130602 34.1977C0.218735 34.4132 0.34886 34.6089 0.513386 34.7735C0.677912 34.9381 0.87354 35.0683 1.08888 35.1565C1.30422 35.2446 1.53496 35.289 1.76762 35.2871H25.0479C27.2716 35.2851 29.434 34.5578 31.2072 33.2154C32.9804 31.8729 34.2677 29.9887 34.874 27.8483C35.4803 25.7078 35.3724 23.428 34.5667 21.3545C33.7611 19.2809 32.3016 17.5268 30.4095 16.3579ZM11.4819 31.7429H3.72668C3.69959 31.742 3.67296 31.7357 3.6483 31.7244C3.62365 31.7132 3.60144 31.6972 3.58297 31.6773C3.5645 31.6575 3.55013 31.6342 3.54067 31.6088C3.53121 31.5834 3.52683 31.5563 3.52781 31.5292V10.7949C3.52683 10.7678 3.53121 10.7408 3.54067 10.7154C3.55013 10.6899 3.5645 10.6666 3.58297 10.6468C3.60144 10.627 3.62365 10.611 3.6483 10.5997C3.67296 10.5884 3.69959 10.5822 3.72668 10.5812L10.2298 10.5444C11.3667 10.5453 12.4793 10.8732 13.4351 11.489C14.3909 12.1048 15.1495 12.9826 15.6207 14.0177C16.0918 15.0528 16.2555 16.2016 16.0924 17.3272C15.9292 18.4528 15.446 19.5077 14.7003 20.3663C15.8492 21.0611 16.7383 22.1142 17.2308 23.3637C17.7233 24.6131 17.792 25.9899 17.4264 27.2822C17.0608 28.5746 16.2811 29.7111 15.2071 30.517C14.1331 31.3229 12.8243 31.7536 11.4819 31.7429Z"
          fill="currentColor"
        />
      </svg>
      <span>
        <span className="text-navy-900">Backd</span><span className="text-mint-500">Payments</span>
      </span>
    </span>
  );
}
