/** Catálogo de sucesiones de ejemplo para las herramientas de 1.º de Bachillerato. */

export type SeqKind = "convergente" | "divergente" | "oscilante";
export type SeqMono = "estrictamente creciente" | "estrictamente decreciente" | "no monótona";

export type SeqItem = {
  /** Término general en texto plano. */
  label: string;
  f: (n: number) => number;
  kind: SeqKind;
  /** Límite si es convergente. */
  limit?: number;
  mono: SeqMono;
  bounded: boolean;
};

export const SEQS: SeqItem[] = [
  { label: "aₙ = 2n", f: (n) => 2 * n, kind: "divergente", mono: "estrictamente creciente", bounded: false },
  { label: "aₙ = 1/n", f: (n) => 1 / n, kind: "convergente", limit: 0, mono: "estrictamente decreciente", bounded: true },
  { label: "aₙ = (−1)ⁿ", f: (n) => (n % 2 === 0 ? 1 : -1), kind: "oscilante", mono: "no monótona", bounded: true },
  { label: "aₙ = (2n + 1)/(n + 1)", f: (n) => (2 * n + 1) / (n + 1), kind: "convergente", limit: 2, mono: "estrictamente creciente", bounded: true },
  { label: "aₙ = (1/2)ⁿ⁻¹", f: (n) => Math.pow(0.5, n - 1), kind: "convergente", limit: 0, mono: "estrictamente decreciente", bounded: true },
  { label: "aₙ = n²", f: (n) => n * n, kind: "divergente", mono: "estrictamente creciente", bounded: false },
  { label: "aₙ = (−2)ⁿ", f: (n) => Math.pow(-2, n), kind: "oscilante", mono: "no monótona", bounded: false },
  { label: "aₙ = 3 + (−1)ⁿ/n", f: (n) => 3 + (n % 2 === 0 ? 1 : -1) / n, kind: "convergente", limit: 3, mono: "no monótona", bounded: true },
  { label: "aₙ = 1 − (1/2)ⁿ", f: (n) => 1 - Math.pow(0.5, n), kind: "convergente", limit: 1, mono: "estrictamente creciente", bounded: true },
];

/** Primeros `k` términos de una sucesión (a₁, a₂, …). */
export const seqTerms = (s: SeqItem, k: number) => Array.from({ length: k }, (_, i) => s.f(i + 1));

/** Clasificación de monotonía por comprobación numérica (para tests y coherencia). */
export function monoOf(f: (n: number) => number, upto = 40): SeqMono {
  let inc = true;
  let dec = true;
  for (let n = 1; n < upto; n += 1) {
    if (!(f(n + 1) > f(n))) inc = false;
    if (!(f(n + 1) < f(n))) dec = false;
  }
  return inc ? "estrictamente creciente" : dec ? "estrictamente decreciente" : "no monótona";
}

/** Menor `n0` tal que |aₙ − L| < ε para todo n ≥ n0 (búsqueda del último incumplimiento). */
export function nZero(f: (n: number) => number, limit: number, eps: number, max = 2_000_000): number | null {
  let last = 0;
  for (let n = 1; n <= max; n += 1) {
    if (Math.abs(f(n) - limit) >= eps) last = n;
  }
  return last >= max ? null : last + 1;
}

/** Progresión aritmética: término general y suma de los n primeros. */
export const arithTerm = (a1: number, d: number, n: number) => a1 + (n - 1) * d;
export const arithSum = (a1: number, d: number, n: number) => (n * (a1 + arithTerm(a1, d, n))) / 2;
/** Progresión geométrica: término general, suma de los n primeros y suma infinita (si |r| < 1). */
export const geomTerm = (a1: number, r: number, n: number) => a1 * Math.pow(r, n - 1);
export const geomSum = (a1: number, r: number, n: number) => (r === 1 ? a1 * n : (a1 * (Math.pow(r, n) - 1)) / (r - 1));
export const geomInf = (a1: number, r: number): number | null => (Math.abs(r) < 1 ? a1 / (1 - r) : null);
