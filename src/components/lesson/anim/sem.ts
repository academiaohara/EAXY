/** Semejanza: escalas, razones, Tales y troncos. */

/** Longitud real (cm) para una longitud en el plano con escala 1:N. */
export const realFromPlan = (cm: number, n: number): number => cm * n;

/** Longitud en el plano para una distancia real, escala 1:N. */
export const planFromReal = (cm: number, n: number): number => cm / n;

/** `k`, `k²` y `k³`: razón entre longitudes, áreas y volúmenes. */
export const ratios = (k: number): { length: number; area: number; volume: number } => ({ length: k, area: k * k, volume: k * k * k });

/** Lado desconocido por proporcionalidad: `a / b = c / x` → `x = b·c / a`. */
export const fourth = (a: number, b: number, c: number): number => (b * c) / a;

/** Triángulos semejantes: ¿lados proporcionales? Devuelve la razón (ordenando los lados) o `null`. */
export function sideRatio(t1: [number, number, number], t2: [number, number, number]): number | null {
  const a = [...t1].sort((x, y) => x - y);
  const b = [...t2].sort((x, y) => x - y);
  const k = b[0]! / a[0]!;
  return a.every((v, i) => Math.abs(b[i]! / v - k) < 1e-9) ? k : null;
}

/** Tercer ángulo y comprobación del criterio de dos ángulos iguales. */
export function anglesSimilar(t1: [number, number], t2: [number, number]): boolean {
  const s1 = [t1[0], t1[1], 180 - t1[0] - t1[1]].sort((a, b) => a - b);
  const s2 = [t2[0], t2[1], 180 - t2[0] - t2[1]].sort((a, b) => a - b);
  return s1.every((v, i) => Math.abs(v - s2[i]!) < 1e-9);
}

/** Incremento de altura `x` para completar un tronco de cono/pirámide: `x = r·h / (R − r)`. */
export const frustumExtra = (R: number, r: number, h: number): number => (r * h) / (R - r);

/** Volumen de un tronco de cono por diferencia de conos semejantes. */
export function coneFrustumVolume(R: number, r: number, h: number): number {
  const x = frustumExtra(R, r, h);
  return (Math.PI / 3) * (R * R * (h + x) - r * r * x);
}

/** Volumen de un tronco de pirámide de bases cuadradas de lados `L` y `l`. */
export function pyramidFrustumVolume(L: number, l: number, h: number): number {
  const x = frustumExtra(L, l, h);
  return (L * L * (h + x) - l * l * x) / 3;
}
