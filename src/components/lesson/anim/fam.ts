import { frac, solveQuadratic, type Frac } from "@/components/lesson/anim/eq";

/** Familias de funciones: parábolas, hipérbolas, radicales y exponenciales. */

export type Vertex = { x: Frac; y: Frac };

/** Vértice de `y = ax² + bx + c` con fracciones exactas: x = −b/(2a), y = c − b²/(4a). */
export function vertex(a: number, b: number, c: number): Vertex {
  const x = frac(-b, 2 * a);
  const y = frac(4 * a * c - b * b, 4 * a);
  return { x, y };
}

/** Cortes con los ejes de la parábola: abscisas (si hay) y ordenada en el origen. */
export function parabolaCuts(a: number, b: number, c: number): { xs: number[]; y0: number } {
  const q = solveQuadratic(a, b, c);
  return { xs: q.roots.map((r) => r.value), y0: c };
}

export type RadicalDef = { a: number; h: number; k: number; mirror: boolean };

/** Dominio de `y = a·√(s·(x − h)) + k` (s = −1 si está reflejada): `[h, ∞)` o `(−∞, h]`. */
export const radicalDomain = (d: RadicalDef): { from: number; to: number } => (d.mirror ? { from: -Infinity, to: d.h } : { from: d.h, to: Infinity });

export const radicalValue = (d: RadicalDef, x: number): number | null => {
  const inner = (d.mirror ? -1 : 1) * (x - d.h);
  return inner < 0 ? null : d.a * Math.sqrt(inner) + d.k;
};

/** Recorrido de `a·√(…) + k`: [k, ∞) si a > 0, (−∞, k] si a < 0. */
export const radicalRange = (d: RadicalDef): { from: number; to: number } => (d.a > 0 ? { from: d.k, to: Infinity } : { from: -Infinity, to: d.k });

/** Valor final tras `t` periodos con variación porcentual `rate` (en %): `C·(1 + rate/100)^t`. */
export const compound = (c0: number, rate: number, t: number): number => c0 * (1 + rate / 100) ** t;

/** Primer entero `t ≥ 0` en que `C·(1 + rate/100)^t` alcanza `target` (creciente o decreciente), o `null` si nunca. */
export function periodsTo(c0: number, rate: number, target: number, max = 1000): number | null {
  const g = 1 + rate / 100;
  if (g <= 0 || g === 1) return null;
  for (let t = 0; t <= max; t++) {
    const v = c0 * g ** t;
    if (g > 1 ? v >= target : v <= target) return t;
  }
  return null;
}
