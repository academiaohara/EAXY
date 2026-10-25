/** Interpolación polinómica y parte entera (CCSS I). */

export type Punto = readonly [number, number];

/** Datos del libro: % de curaciones según la dosis (mg). Ajustan exactamente y = −0,45x² + 9,35x + 23,1. */
export const DOSIS: readonly Punto[] = [
  [1, 32], [2, 40], [3, 47.1], [4, 53.3], [5, 58.6], [6, 63], [7, 66.5], [8, 69.1], [9, 70.8], [10, 71.6],
];

/** Recta y = m·x + n por dos puntos con abscisas distintas. */
export function rectaPor(p: Punto, q: Punto): { m: number; n: number } {
  const m = (q[1] - p[1]) / (q[0] - p[0]);
  return { m, n: p[1] - m * p[0] };
}

/** Parábola y = a·x² + b·x + c por tres puntos con abscisas distintas. */
export function parabolaPor(p: Punto, q: Punto, r: Punto): { a: number; b: number; c: number } {
  const d1 = (q[1] - p[1]) / (q[0] - p[0]);
  const d2 = (r[1] - q[1]) / (r[0] - q[0]);
  const a = (d2 - d1) / (r[0] - p[0]);
  const b = d1 - a * (p[0] + q[0]);
  const c = p[1] - a * p[0] * p[0] - b * p[0];
  return { a, b, c };
}

/** Diferencias sucesivas de una lista de ordenadas (abscisas en progresión aritmética). */
export function diferencias(ys: readonly number[], orden: number): number[] {
  let cur = [...ys];
  for (let k = 0; k < orden; k += 1) cur = cur.slice(1).map((v, i) => v - cur[i]!);
  return cur;
}

/** Orden de las primeras diferencias que son (casi) constantes, o null si no lo son hasta `max`. */
export function gradoPorDiferencias(ys: readonly number[], max = 3, tol = 1e-9): number | null {
  for (let k = 1; k <= max; k += 1) {
    const d = diferencias(ys, k);
    if (d.length >= 2 && d.every((v) => Math.abs(v - d[0]!) < tol)) return k;
  }
  return null;
}

/** Parte entera: mayor entero que no supera a x. */
export const parteEntera = (x: number) => Math.floor(x + 1e-12);
/** Techo: menor entero que no es menor que x. */
export const techo = (x: number) => Math.ceil(x - 1e-12);
