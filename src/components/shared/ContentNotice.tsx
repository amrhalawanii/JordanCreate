type ContentNoticeProps = {
  message?: string;
  degraded?: boolean;
  empty?: boolean;
  className?: string;
};

/**
 * Soft production feedback for programme sections.
 * - degraded: live source failed, static fallback is shown
 * - empty: live source succeeded but returned no rows
 */
export function ContentNotice({
  message,
  degraded = false,
  empty = false,
  className = "",
}: ContentNoticeProps) {
  if (!message) return null;

  const tone = degraded
    ? "border-brand-orange/35 bg-brand-orange/10 text-text-primary"
    : empty
      ? "border-border-card bg-surface text-text-gray-light"
      : "border-border-subtle bg-surface/60 text-text-gray-light";

  return (
    <div
      role="status"
      className={`rounded-(--radius-media) border px-4 py-3 font-body text-sm leading-[1.45] ${tone} ${className}`}
    >
      {message}
    </div>
  );
}
