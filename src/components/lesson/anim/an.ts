import { frac, fracTex, type Frac } from "@/components/lesson/anim/eq";
import { lineTex, pointSlopeToSlopeIntercept } from "@/components/lesson/anim/lin";

/** Geometría analítica: vectores, punto medio, distancia y rectas con fracciones exactas. */

export type V = readonly [number, number];

export const vec = (a: V, b: V): V => [b[0] - a[0], b[1] - a[1]];
export const add = (u: V, v: V): V => [u[0] + v[0], u[1] + v[1]];
export const sub = (u: V, v: V): V => [u[0] - v[0], u[1] - v[1]];
export const scale = (k: number, v: V): V => [k * v[0], k * v[1]];
export const modSq = (v: V): number => v[0] * v[0] + v[1] * v[1];
export const mod = (v: V): number => Math.sqrt(modSq(v));

/** Raíz de un entero simplificada: `√n = a√b`. */
export function simplifySqrt(n: number): { a: number; b: number } {
  let a = 1;
  let b = n;
  for (let f = 2; f * f <= b; f++) {
    while (b % (f * f) === 0) {
      b /= f * f;
      a *= f;
    }
  }
  return { a, b };
}

/** LaTeX de `√n` simplificada (entero si es exacta). */
export function sqrtTex(n: number): string {
  const { a, b } = simplifySqrt(n);
  if (b === 1) return String(a);
  return `${a === 1 ? "" : a}\\sqrt{${b}}`;
}

/** Punto medio como fracciones exactas. */
export const midpoint = (a: V, b: V): [Frac, Frac] => [frac(a[0] + b[0], 2), frac(a[1] + b[1], 2)];

/** Distancia al cuadrado entre dos puntos. */
export const dist2 = (a: V, b: V): number => modSq(vec(a, b));

/** Vector perpendicular `(a, b) → (−b, a)`. */
export const perp = (v: V): V => [-v[1], v[0]];

export type Line = { kind: "vertical"; x: Frac } | { kind: "oblicua"; m: Frac; n: Frac };

/** Recta que pasa por `p` con vector dirección `d` (no nulo). */
export function lineFromPointDir(p: V, d: V): Line {
  if (d[0] === 0) return { kind: "vertical", x: frac(p[0], 1) };
  const m = frac(d[1], d[0]);
  return { kind: "oblicua", m, n: pointSlopeToSlopeIntercept(p, m).n };
}

/** Recta por dos puntos distintos. */
export const lineThrough = (a: V, b: V): Line => lineFromPointDir(a, vec(a, b));

export function lineText(l: Line): string {
  return l.kind === "vertical" ? `x = ${fracTex(l.x)}` : lineTex(l.m, l.n);
}

/** Pendiente de `Ax + By + C = 0` (`null` si es vertical). */
export const slopeOfGeneral = (A: number, B: number): Frac | null => (B === 0 ? null : frac(-A, B));

/** Dirección de `Ax + By + C = 0`. */
export const directionOfGeneral = (A: number, B: number): V => [B, -A];

/** ¿Paralelas? Direcciones proporcionales. */
export const parallel = (d1: V, d2: V): boolean => d1[0] * d2[1] - d1[1] * d2[0] === 0;

/** ¿Perpendiculares? Producto escalar nulo. */
export const perpendicular = (d1: V, d2: V): boolean => d1[0] * d2[0] + d1[1] * d2[1] === 0;
