/** Visually hidden but available to screen readers (and skip-link targets). */
export function VisuallyHidden({
  children,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  as?: "span" | "em" | "strong";
}) {
  return <Tag className="sr-only">{children}</Tag>;
}
