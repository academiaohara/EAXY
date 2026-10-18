/** Número con coma decimal española (hasta 2 decimales, sin ceros sobrantes). */
export function numEs(n: number): string {
  const r = Math.round(n * 100) / 100;
  const [int = "0", frac] = String(r).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return frac ? `${grouped},${frac}` : grouped;
}

/** Mismo número en LaTeX (coma sin espacio posterior). */
export function numTex(n: number): string {
  return numEs(n).replace(",", "{,}").replace(" ", "\\,");
}
