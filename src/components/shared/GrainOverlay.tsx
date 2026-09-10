// Subtle repeating grain/noise texture the live site layers over every
// speaker portrait (confirmed via the saveweb2zip archive — a detail the
// earlier Playwright-based extraction missed entirely, since it's a plain
// CSS background-image, not something getComputedStyle's tracked
// properties surface as a distinct "asset"). 256x256 tile, opacity 0.05,
// oversized and centered so it covers the card at any aspect ratio.
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute -inset-[200%] h-[400%] w-[400%] opacity-5"
        style={{
          backgroundImage: "url('/assets/texture/grain.png')",
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
