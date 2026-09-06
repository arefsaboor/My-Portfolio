/* The standard "opens in a new tab" mark — a box with an arrow leaving it.
 * Replaces the bare ↗ glyph the site used everywhere: an arrow is a direction,
 * not a convention for external links, and as a text character it sits on the
 * baseline and never aligns with its label. */
export default function ExternalIcon({ className = 'ext-i' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}
