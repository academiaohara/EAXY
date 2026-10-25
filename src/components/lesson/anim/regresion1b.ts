/** Regresión lineal y cuadrática por mínimos cuadrados, y coeficiente de determinación. */

export type Ajuste = { coef: number[]; r2: number };

/** Resuelve un sistema lineal pequeño por eliminación gaussiana con pivote parcial. */
function resolver(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((f, i) => [...f, b[i]!]);
  for (let c = 0; c < n; c += 1) {
    let p = c;
    for (let r = c + 1; r < n; r += 1) if (Math.abs(M[r]![c]!) > Math.abs(M[p]![c]!)) p = r;
    [M[c], M[p]] = [M[p]!, M[c]!];
    for (let r = c + 1; r < n; r += 1) {
      const f = M[r]![c]! / M[c]![c]!;
      for (let k = c; k <= n; k += 1) M[r]![k]! -= f * M[c]![k]!;
    }
  }
  const x = new Array<number>(n).fill(0);
  for (let r = n - 1; r >= 0; r -= 1) {
    let s = M[r]![n]!;
    for (let k = r + 1; k < n; k += 1) s -= M[r]![k]! * x[k]!;
    x[r] = s / M[r]![r]!;
  }
  return x;
}

/** Valor del polinomio `coef` (término independiente primero) en x. */
export const evalPoli = (coef: readonly number[], x: number) => coef.reduce((acc, c, i) => acc + c * x ** i, 0);

/** Ajuste por mínimos cuadrados de grado `grado` (1 o 2); r² = 1 − SCres/SCtot. Null si no hay datos suficientes. */
export function ajustePolinomico(xs: readonly number[], ys: readonly number[], grado: 1 | 2): Ajuste | null {
  const n = xs.length;
  if (n !== ys.length || n < grado + 1) return null;
  const k = grado + 1;
  const A: number[][] = Array.from({ length: k }, (_, i) => Array.from({ length: k }, (_, j) => xs.reduce((s, x) => s + x ** (i + j), 0)));
  const b = Array.from({ length: k }, (_, i) => xs.reduce((s, x, t) => s + x ** i * ys[t]!, 0));
  const coef = resolver(A, b);
  if (coef.some((c) => !Number.isFinite(c))) return null;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  const tot = ys.reduce((s, y) => s + (y - my) ** 2, 0);
  const res = ys.reduce((s, y, t) => s + (y - evalPoli(coef, xs[t]!)) ** 2, 0);
  return { coef, r2: tot === 0 ? 1 : 1 - res / tot };
}

export const REG_DATOS = [
  { label: "Calificación en Matemáticas → estatura (cm)", x: "Matemáticas", y: "Estatura", xs: [10, 3, 8, 8, 5, 10, 10, 8, 5, 8], ys: [175, 166, 155, 161, 161, 177, 182, 177, 167, 172], rango: [150, 195] as const },
  { label: "Calificación en Matemáticas → Física", x: "Matemáticas", y: "Física", xs: [10, 3, 8, 8, 5, 10, 10, 8, 5, 8], ys: [9, 5, 6, 4, 3, 10, 9, 6, 3, 5], rango: [0, 16] as const },
] as const;
