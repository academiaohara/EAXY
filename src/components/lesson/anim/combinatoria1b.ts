/** Combinatoria de CCSS I: números combinatorios, triángulo de Pascal y binomio de Newton. */

/** Número combinatorio C(m, n) = m!/(n!(m−n)!) con enteros pequeños (exacto hasta m ≈ 50). */
export function comb(m: number, n: number): number {
  if (!Number.isInteger(m) || !Number.isInteger(n) || n < 0 || m < 0 || n > m) return 0;
  const k = Math.min(n, m - n);
  let r = 1;
  for (let i = 1; i <= k; i += 1) r = (r * (m - k + i)) / i;
  return Math.round(r);
}

export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

/** Fila n del triángulo de Pascal. */
export const filaPascal = (n: number): number[] => Array.from({ length: n + 1 }, (_, k) => comb(n, k));

/** Términos de (a·x + b)ⁿ: coeficiente de x^(n−k) para k = 0…n. */
export function desarrolloBinomio(n: number, a: number, b: number): { k: number; grado: number; coef: number }[] {
  return Array.from({ length: n + 1 }, (_, k) => ({ k, grado: n - k, coef: comb(n, k) * a ** (n - k) * b ** k }));
}

/** Probabilidad (Laplace) de extraer `casos` favorables entre `total` con combinaciones. */
export const laplaceComb = (favorables: number, posibles: number) => (posibles === 0 ? 0 : favorables / posibles);

/** Probabilidad hipergeométrica: x elementos «buenos» al extraer `n` de `N`, con `K` buenos en total. */
export const hipergeometrica = (N: number, K: number, n: number, x: number) => laplaceComb(comb(K, x) * comb(N - K, n - x), comb(N, n));
