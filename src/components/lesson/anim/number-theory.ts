/** Aritmética mínima que comparten las animaciones del tema de divisibilidad. */

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

export function divisors(n: number): number[] {
  const out: number[] = [];
  for (let d = 1; d <= n; d += 1) {
    if (n % d === 0) {
      out.push(d);
    }
  }
  return out;
}

/** Primos con su exponente, de menor a mayor: 360 → [[2,3],[3,2],[5,1]]. */
export function factorize(n: number): [number, number][] {
  const out: [number, number][] = [];
  let rest = n;
  for (let p = 2; p * p <= rest; p += 1) {
    let e = 0;
    while (rest % p === 0) {
      rest /= p;
      e += 1;
    }
    if (e > 0) {
      out.push([p, e]);
    }
  }
  if (rest > 1) {
    out.push([rest, 1]);
  }
  return out;
}

export function smallestPrimeFactor(n: number): number {
  return factorize(n)[0]?.[0] ?? n;
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** Exponente en caracteres voladitos (SVG no admite <sup>). */
export function sup(e: number): string {
  return String(e)
    .split("")
    .map((c) => SUP[Number(c)] ?? c)
    .join("");
}

/** `2³`, o solo `3` si el exponente es 1. */
export function power(p: number, e: number): string {
  return e === 1 ? String(p) : `${p}${sup(e)}`;
}

export function factorsToString(f: [number, number][], sep = " · "): string {
  return f.map(([p, e]) => power(p, e)).join(sep);
}
