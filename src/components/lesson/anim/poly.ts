/** Polinomios de una variable con coeficientes enteros: `c[k]` es el coeficiente de x^k. */

export type Poly = number[];

export function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

/** Quita los ceros finales (de mayor grado). */
export function trim(p: Poly): Poly {
  const out = [...p];
  while (out.length > 1 && out[out.length - 1] === 0) out.pop();
  return out.length === 0 ? [0] : out;
}

export const degree = (p: Poly): number => trim(p).length - 1;

export function add(a: Poly, b: Poly): Poly {
  const n = Math.max(a.length, b.length);
  return trim(Array.from({ length: n }, (_, i) => (a[i] ?? 0) + (b[i] ?? 0)));
}

export const neg = (p: Poly): Poly => p.map((c) => (c === 0 ? 0 : -c));

export const sub = (a: Poly, b: Poly): Poly => add(a, neg(b));

export function mul(a: Poly, b: Poly): Poly {
  const out = Array.from({ length: a.length + b.length - 1 }, () => 0);
  a.forEach((x, i) => b.forEach((y, j) => {
    out[i + j]! += x * y;
  }));
  return trim(out);
}

export const evaluate = (p: Poly, x: number): number => p.reduceRight((acc, c) => acc * x + c, 0);

const sup = (n: number) => (n === 1 ? "x" : `x^{${n}}`);

/** LaTeX del polinomio ordenado de mayor a menor grado. */
export function polyTex(p: Poly, variable = "x"): string {
  const t = trim(p);
  const parts: string[] = [];
  for (let k = t.length - 1; k >= 0; k -= 1) {
    const c = t[k]!;
    if (c === 0) continue;
    const abs = Math.abs(c);
    const body = k === 0 ? String(abs) : `${abs === 1 ? "" : abs}${sup(k).replace("x", variable)}`;
    parts.push(parts.length === 0 ? `${c < 0 ? "-" : ""}${body}` : ` ${c < 0 ? "-" : "+"} ${body}`);
  }
  return parts.length === 0 ? "0" : parts.join("");
}

/** Factor común: máximo común divisor de los coeficientes y menor exponente (con signo del término principal positivo). */
export function commonFactor(p: Poly): { k: number; m: number; rest: Poly } {
  const t = trim(p);
  const nonzero = t.map((c, i) => [c, i] as const).filter(([c]) => c !== 0);
  if (nonzero.length === 0) return { k: 1, m: 0, rest: [0] };
  const k = nonzero.map(([c]) => Math.abs(c)).reduce((a, b) => gcd(a, b));
  const m = Math.min(...nonzero.map(([, i]) => i));
  const rest = t.slice(m).map((c) => c / k);
  return { k, m, rest };
}

/** m.c.m. de enteros positivos. */
export function lcm(nums: number[]): number {
  return nums.reduce((a, b) => (a / gcd(a, b)) * b, 1);
}

/** Monomio `c·x^p·y^q`. */
export type Mono = { c: number; p: number; q: number };

export function monoTex(m: Mono): string {
  if (m.c === 0) return "0";
  const lit = `${m.p === 0 ? "" : m.p === 1 ? "x" : `x^{${m.p}}`}${m.q === 0 ? "" : m.q === 1 ? "y" : `y^{${m.q}}`}`;
  if (lit === "") return String(m.c);
  const coef = m.c === 1 ? "" : m.c === -1 ? "-" : String(m.c);
  return `${coef}${lit}`;
}

export const monoDegree = (m: Mono): number => (m.c === 0 ? 0 : m.p + m.q);
export const monoSimilar = (a: Mono, b: Mono): boolean => a.p === b.p && a.q === b.q;
export const monoValue = (m: Mono, x: number, y: number): number => m.c * x ** m.p * y ** m.q;
