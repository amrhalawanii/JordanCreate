/** Pure helper — safe to call from Server Components. */
export function staggerDelay(index: number, step = 0.08) {
  return index * step;
}
