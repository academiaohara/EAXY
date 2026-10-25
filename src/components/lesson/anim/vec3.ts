/** Vectores del espacio con enteros: producto escalar, vectorial, mixto, módulo y ángulos. */

export type V3 = [number, number, number];

export const sumaV = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const restaV = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const porV = (k: number, a: V3): V3 => [k * a[0], k * a[1], k * a[2]];
export const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const mixto = (a: V3, b: V3, c: V3) => dot(a, cross(b, c));
export const norma2 = (a: V3) => dot(a, a);
export const norma = (a: V3) => Math.sqrt(norma2(a));

/** Escribe √n simplificada en texto: `√8` → `2√2`, `√16` → `4`. */
export function raizTxt(n: number): string {
  if (n < 0 || !Number.isFinite(n)) return "—";
  let k = 1;
  let r = n;
  for (let f = Math.floor(Math.sqrt(n)); f > 1; f--) {
    if (r % (f * f) === 0) {
      k *= f;
      r /= f * f;
      break;
    }
  }
  if (r === 1) return String(k);
  return `${k === 1 ? "" : k}√${r}`;
}

/** Módulo escrito exactamente, p. ej. `√14` o `3`. */
export const normaTxt = (a: V3) => raizTxt(norma2(a));

/** Coseno del ángulo entre dos vectores no nulos, o `null` si alguno es nulo. */
export function cosAngulo(a: V3, b: V3): number | null {
  const d = norma(a) * norma(b);
  return d === 0 ? null : Math.max(-1, Math.min(1, dot(a, b) / d));
}

/** Ángulo en grados entre dos vectores no nulos. */
export const anguloGrados = (a: V3, b: V3): number | null => {
  const c = cosAngulo(a, b);
  return c === null ? null : (Math.acos(c) * 180) / Math.PI;
};

export const vecTxt = (a: V3) => `(${a.map((x) => String(x).replace("-", "−")).join(", ")})`;
