/** Distribuciones de probabilidad de CCSS I: variable discreta, binomial, normal e intervalos de confianza. */
import { comb } from "@/components/lesson/anim/combinatoria1b";

export type Cuantia = { x: number; p: number }[];

/** Esperanza matemática E(X) = Σ x·p(x). */
export const esperanza = (d: Cuantia) => d.reduce((s, t) => s + t.x * t.p, 0);
/** Varianza σ² = E(X²) − E(X)². */
export const varianza = (d: Cuantia) => d.reduce((s, t) => s + t.x * t.x * t.p, 0) - esperanza(d) ** 2;
export const desviacion = (d: Cuantia) => Math.sqrt(Math.max(0, varianza(d)));
/** Función de distribución F(x) = P(X ≤ x). */
export const distribucion = (d: Cuantia, x: number) => d.filter((t) => t.x <= x + 1e-12).reduce((s, t) => s + t.p, 0);

/** Probabilidad binomial P(X = k) en B(n, p). */
export function binomPmf(n: number, p: number, k: number): number {
  if (!Number.isInteger(k) || k < 0 || k > n) return 0;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  return comb(n, k) * p ** k * (1 - p) ** (n - k);
}
/** P(X ≤ k) en B(n, p). */
export const binomCdf = (n: number, p: number, k: number) =>
  Array.from({ length: Math.max(0, Math.min(n, Math.floor(k)) + 1) }, (_, i) => binomPmf(n, p, i)).reduce((s, v) => s + v, 0);
export const binomCuantia = (n: number, p: number): Cuantia => Array.from({ length: n + 1 }, (_, x) => ({ x, p: binomPmf(n, p, x) }));
export const binomMedia = (n: number, p: number) => n * p;
export const binomDesv = (n: number, p: number) => Math.sqrt(n * p * (1 - p));

/** Función de distribución de la normal estándar Φ(z) (serie de Taylor; error < 1e-12 hasta |z| = 6). */
export function phi(z: number): number {
  if (!Number.isFinite(z)) return z > 0 ? 1 : 0;
  if (z > 8) return 1;
  if (z < -8) return 0;
  let term = z;
  let sum = z;
  for (let k = 1; k < 200; k += 1) {
    term *= (z * z) / (2 * k + 1);
    sum += term;
    if (Math.abs(term) < 1e-17) break;
  }
  return 0.5 + (sum * Math.exp(-(z * z) / 2)) / Math.sqrt(2 * Math.PI);
}
/** Densidad de N(0, 1). */
export const densidadZ = (z: number) => Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI);
/** Densidad de N(μ, σ). */
export const densidadN = (x: number, mu: number, sigma: number) => densidadZ((x - mu) / sigma) / sigma;
/** P(X ≤ x) en N(μ, σ). */
export const normalCdf = (x: number, mu: number, sigma: number) => phi((x - mu) / sigma);
/** P(a < X < b) en N(μ, σ). */
export const normalEntre = (a: number, b: number, mu: number, sigma: number) => normalCdf(b, mu, sigma) - normalCdf(a, mu, sigma);
/** Tipificación z = (x − μ)/σ. */
export const tipificar = (x: number, mu: number, sigma: number) => (x - mu) / sigma;
/** Valor z con Φ(z) = p (bisección). */
export function phiInversa(p: number): number {
  if (!(p > 0 && p < 1)) return p <= 0 ? -Infinity : Infinity;
  let lo = -8;
  let hi = 8;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    if (phi(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
/** Valor crítico z_{α/2} para un nivel de confianza (0–1) bilateral. */
export const valorCritico = (confianza: number) => phiInversa(1 - (1 - confianza) / 2);

/** Valor de la tabla de la normal: Φ con z redondeado a dos decimales y el resultado a cuatro. */
export const tablaZ = (z: number) => Math.round(phi(Math.round(z * 100) / 100) * 1e4) / 1e4;

/** ¿Se puede aproximar B(n, p) por una normal? (criterio del libro: npq ≥ 9). */
export const aproximable = (n: number, p: number) => n * p * (1 - p) >= 9;

/** P(a ≤ X ≤ b) en B(n, p) aproximada por N(np, √npq) con corrección de continuidad. */
export function binomialANormal(n: number, p: number, a: number, b: number, correccion = true): number {
  const mu = n * p;
  const s = binomDesv(n, p);
  if (s === 0) return a <= mu && mu <= b ? 1 : 0;
  const h = correccion ? 0.5 : 0;
  return normalEntre(a - h, b + h, mu, s);
}

/** Intervalo de confianza para una proporción: p̂ ± z·√(p̂(1−p̂)/n). */
export function intervaloProporcion(pHat: number, n: number, confianza: number) {
  const z = valorCritico(confianza);
  const e = z * Math.sqrt((pHat * (1 - pHat)) / n);
  return { z, error: e, inf: pHat - e, sup: pHat + e };
}

/** Intervalo simétrico en torno a la media que contiene el número de éxitos con probabilidad `confianza` (aprox. normal con corrección). */
export function intervaloExitos(n: number, p: number, confianza: number) {
  const mu = n * p;
  const s = binomDesv(n, p);
  const z = valorCritico(confianza);
  const k = Math.ceil(z * s - 0.5);
  return { mu, s, z, k, inf: mu - k, sup: mu + k };
}

/** Generador pseudoaleatorio determinista (mulberry32) para simulaciones reproducibles. */
export function crearAzar(semilla: number) {
  let a = (semilla >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
