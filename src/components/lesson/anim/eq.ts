/** Resolución de ecuaciones e inecuaciones sencillas con enteros y fracciones exactas. */

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export type Frac = { n: number; d: number };

export function frac(n: number, d: number): Frac {
  if (d < 0) return frac(-n, -d);
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}

export const fracValue = (f: Frac): number => f.n / f.d;

/** LaTeX de una fracción reducida (entero si d = 1). */
export function fracTex(f: Frac): string {
  if (f.d === 1) return String(f.n);
  return `${f.n < 0 ? "-" : ""}\\dfrac{${Math.abs(f.n)}}{${f.d}}`;
}

export type LinearSolution =
  | { kind: "unica"; x: Frac }
  | { kind: "sin" }
  | { kind: "identidad" };

/** Resuelve `a·x + b = c·x + d`. */
export function solveLinear(a: number, b: number, c: number, d: number): LinearSolution {
  const A = a - c;
  const B = d - b;
  if (A === 0) return B === 0 ? { kind: "identidad" } : { kind: "sin" };
  return { kind: "unica", x: frac(B, A) };
}

export type QuadraticSolution = {
  disc: number;
  kind: "dos" | "una" | "ninguna";
  roots: { value: number; tex: string }[];
  vertex: { x: number; y: number };
};

/** Resuelve `a·x² + b·x + c = 0` (a ≠ 0). Raíces exactas si el discriminante es cuadrado perfecto. */
export function solveQuadratic(a: number, b: number, c: number): QuadraticSolution {
  const disc = b * b - 4 * a * c;
  const vertex = { x: -b / (2 * a), y: c - (b * b) / (4 * a) };
  if (disc < 0) return { disc, kind: "ninguna", roots: [], vertex };
  const s = Math.sqrt(disc);
  const r = Math.round(s);
  const exact = r * r === disc;
  const mk = (sign: 1 | -1) => {
    const value = (-b + sign * s) / (2 * a);
    if (exact) return { value, tex: fracTex(frac(-b + sign * r, 2 * a)) };
    return { value, tex: `\\dfrac{${-b} ${sign === 1 ? "+" : "-"} \\sqrt{${disc}}}{${2 * a}}` };
  };
  if (disc === 0) return { disc, kind: "una", roots: [mk(1)], vertex };
  const roots = [mk(-1), mk(1)].sort((p, q) => p.value - q.value);
  return { disc, kind: "dos", roots, vertex };
}

export type Rel = "<" | "<=" | ">" | ">=";

const flipRel = (r: Rel): Rel => ({ "<": ">", "<=": ">=", ">": "<", ">=": "<=" })[r] as Rel;

/** Resuelve `a·x + b  rel  c` (a ≠ 0): la desigualdad se invierte si a < 0. */
export function solveLinearInequality(a: number, b: number, rel: Rel, c: number): { bound: Frac; rel: Rel; flipped: boolean } {
  const bound = frac(c - b, a);
  const flipped = a < 0;
  return { bound, rel: flipped ? flipRel(rel) : rel, flipped };
}

export const relTex = (r: Rel): string => ({ "<": "<", "<=": "\\le", ">": ">", ">=": "\\ge" })[r];

/** Reparto con renuncias: `n` personas pagan `T/n`; si fallan `q`, cada una paga `δ` más → n² − q·n − T·q/δ = 0. */
export function shareEquation(total: number, q: number, delta: number): { n: number; other: number; ok: boolean; disc: number } {
  const c = (total * q) / delta;
  const disc = q * q + 4 * c;
  const s = Math.sqrt(disc);
  const n = (q + s) / 2;
  const other = (q - s) / 2;
  return { n, other, ok: Number.isInteger(Math.round(n * 1e6) / 1e6), disc };
}

export type Tanteo = { id: string; tex: string; f: (x: number) => number; target: number; answer: number };

export const TANTEOS: Tanteo[] = [
  { id: "cubo", tex: "x^3 + 5 = 69", f: (x) => x ** 3 + 5, target: 69, answer: 4 },
  { id: "xx", tex: "x^x = 3\\,125", f: (x) => x ** x, target: 3125, answer: 5 },
  { id: "cuarta", tex: "x^4 = 1\\,000", f: (x) => x ** 4, target: 1000, answer: Math.pow(1000, 1 / 4) },
  { id: "exp", tex: "3^x = 81", f: (x) => 3 ** x, target: 81, answer: 4 },
  { id: "cuad", tex: "(x - 5)^2 = 4", f: (x) => (x - 5) ** 2, target: 4, answer: 7 },
  { id: "cuarta5000", tex: "x^4 = 5\\,000", f: (x) => x ** 4, target: 5000, answer: Math.pow(5000, 1 / 4) },
  { id: "exp200", tex: "4^x = 200", f: (x) => 4 ** x, target: 200, answer: Math.log(200) / Math.log(4) },
];
