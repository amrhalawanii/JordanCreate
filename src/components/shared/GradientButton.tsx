// The primary CTA pill everywhere on the site (Count Me In / Join Us /
// Contact us) — a diagonal gradient fill with a 2px translucent white
// border, not a flat orange background. Exact values from the Figma
// source (see design-tokens.json's --gradient-brand-orange).
export function GradientButton({
  href,
  children,
  className = "",
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      // Tailwind's bg-(--var) shorthand assumes background-color, which
      // silently no-ops for a linear-gradient() value — inline style avoids
      // that trap and sets background-image directly.
      style={{ backgroundImage: "var(--gradient-brand-orange)" }}
      className={`inline-flex items-center justify-center rounded-(--radius-pill-lg) border-2 border-white/20 px-6 py-3 font-body text-base font-medium leading-[1.2] text-on-orange transition-transform duration-150 hover:scale-[1.02] ${className}`}
    >
      {children}
    </a>
  );
}
