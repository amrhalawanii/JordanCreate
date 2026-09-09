// Exact computed style from the live site (reference/computed/home-1440.json):
// Inter 14px/400, line-height 18.2px, color rgb(133,133,133) = #858585.
// Not DM Sans, not brand orange, and no CSS text-transform — the source
// text is already typed in caps where it appears that way.
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body-fallback text-sm leading-[1.3] text-text-gray-muted">{children}</p>
  );
}
