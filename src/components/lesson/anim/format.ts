/** Agrupa siempre en miles con espacio fino, como en los libros (1 435, no 1435). */
export function fmt(n: number): string {
  const digits = String(Math.trunc(Math.abs(n)));
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}
