/**
 * First focusable control in the document — jumps past sticky chrome.
 * Styled to appear only on keyboard focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-(--radius-default) focus:bg-brand-orange focus:px-4 focus:py-2.5 focus:font-body focus:text-base focus:font-medium focus:text-on-orange focus:outline-none focus:shadow-lg"
    >
      Skip to content
    </a>
  );
}
