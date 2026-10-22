/** Aritmética de radicales con enteros: factorización, extracción de factores y raíces aproximadas. */

export function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

/** Factores primos de `n` ≥ 2 en orden creciente, con repetición: 720 → [2,2,2,2,3,3,5]. */
export function primeFactors(n: number): number[] {
  const out: number[] = [];
  let x = Math.abs(Math.trunc(n));
  for (let p = 2; p * p <= x; p += 1) {
    while (x % p === 0) {
      out.push(p);
      x /= p;
    }
  }
  if (x > 1) out.push(x);
  return out;
}

/** Exponentes por primo: 720 → [[2,4],[3,2],[5,1]]. */
export function factorPowers(n: number): [number, number][] {
  const map = new Map<number, number>();
  for (const p of primeFactors(n)) map.set(p, (map.get(p) ?? 0) + 1);
  return [...map.entries()];
}

/** √ⁿ(radicando) = k · √ⁿ(m) con m sin factores de exponente ≥ n. */
export function simplifyRadical(radicand: number, index: number): { k: number; m: number } {
  let k = 1;
  let m = 1;
  for (const [p, e] of factorPowers(radicand)) {
    k *= p ** Math.floor(e / index);
    m *= p ** (e % index);
  }
  return { k, m };
}

/** Raíz entera exacta de `a` (a ≥ 0) o `null`. */
export function exactRoot(a: number, index: number): number | null {
  if (a < 0) return null;
  const r = Math.round(a ** (1 / index));
  for (const c of [r - 1, r, r + 1]) {
    if (c >= 0 && c ** index === a) return c;
  }
  return null;
}

/** Raíz real de índice `index`; `NaN` si el índice es par y el radicando negativo. */
export function realRoot(a: number, index: number): number {
  if (a >= 0) return a ** (1 / index);
  return index % 2 === 1 ? -((-a) ** (1 / index)) : Number.NaN;
}

/** Cotas decimales con `digits` cifras de la raíz cuadrada de `n` (enteros, sin coma flotante). */
export function sqrtBounds(n: number, digits: number): { lower: string; upper: string; exact: boolean } {
  const scale = 10 ** digits;
  const target = n * scale * scale;
  let lo = 0;
  let hi = Math.ceil(Math.sqrt(n) * scale) + 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (mid * mid <= target) lo = mid;
    else hi = mid - 1;
  }
  const exact = lo * lo === target;
  const fmtScaled = (v: number) => {
    const s = String(v).padStart(digits + 1, "0");
    return digits === 0 ? s : `${s.slice(0, -digits)},${s.slice(-digits)}`;
  };
  return { lower: fmtScaled(lo), upper: fmtScaled(exact ? lo : lo + 1), exact };
}

/** Escribe `k·ⁿ√m` en LaTeX (omite k=1 y el índice 2). */
export function radicalTex(k: number, m: number, index = 2): string {
  const root = m === 1 ? "" : `\\sqrt${index === 2 ? "" : `[${index}]`}{${m}}`;
  if (m === 1) return String(k);
  return `${k === 1 ? "" : k}${root}`;
}

/** Racionaliza `a/√b`: `a/√b = (coef·√radicand)/den`, con el radical simplificado y la fracción irreducible. */
export function rationalizeSqrt(a: number, b: number): { coef: number; radicand: number; den: number } {
  const { k, m } = simplifyRadical(b, 2);
  // a/(k·√m) = a·√m / (k·m)
  const den = k * m;
  const d = gcd(a, den) || 1;
  return { coef: a / d, radicand: m, den: den / d };
}
