import Image from "next/image";

// Exact computed style from the live site (reference/computed/home-1440.json):
// Inter 14px/400, line-height 18.2px, color rgb(133,133,133) = #858585.
// Figma additionally prefixes every eyebrow with a small filled dot icon
// inside a pill outline — not a plain CSS-drawn circle.
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Image src="/assets/icons/eyebrow-dot.svg" alt="" width={8} height={8} />
      <p className="font-body-fallback text-sm leading-[1.3] text-text-gray-muted">{children}</p>
    </div>
  );
}
