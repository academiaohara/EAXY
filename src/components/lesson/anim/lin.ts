import { frac, fracTex, type Frac } from "@/components/lesson/anim/eq";

/** Rectas y funciones definidas a trozos con fracciones exactas. */

export type Pt = readonly [x: number, y: number];

/** Pendiente por dos puntos; `null` si la recta es vertical. */
export function slope(p: Pt, q: Pt): Frac | null {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  return dx === 0 ? null : frac(dy, dx);
}

const add = (a: Frac, b: Frac): Frac => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const mul = (a: Frac, b: Frac): Frac => frac(a.n * b.n, a.d * b.d);

/** `y = m·x + n` a partir de un punto y la pendiente. */
export function pointSlopeToSlopeIntercept(p: Pt, m: Frac): { m: Frac; n: Frac } {
  const n = add(frac(p[1], 1), mul(frac(-p[0], 1), m));
  return { m, n };
}

/** `y = mx + n` en LaTeX. */
export function lineTex(m: Frac, n: Frac): string {
  const mt = m.n === 0 ? "" : m.d === 1 ? (m.n === 1 ? "x" : m.n === -1 ? "-x" : `${m.n}x`) : `${m.n < 0 ? "-" : ""}\\dfrac{${Math.abs(m.n)}}{${m.d}}x`;
  if (m.n === 0) return `y = ${fracTex(n)}`;
  if (n.n === 0) return `y = ${mt}`;
  return `y = ${mt} ${n.n < 0 ? "-" : "+"} ${fracTex(frac(Math.abs(n.n), n.d))}`;
}

/** `y = y0 + m(x − x0)` en LaTeX. */
export function pointSlopeTex(p: Pt, m: Frac): string {
  const dx = p[0] === 0 ? "x" : `(x ${p[0] < 0 ? "+" : "-"} ${Math.abs(p[0])})`;
  const mt = m.d === 1 ? (m.n === 1 ? "" : m.n === -1 ? "-" : String(m.n)) : fracTex(m);
  const sign = m.n < 0 && m.d === 1 ? "" : "+";
  return `y = ${p[1]} ${sign} ${mt}${dx}`.replace(/\+ -/g, "- ");
}

export type Piece = { from: number; to: number; fromIncl: boolean; toIncl: boolean; f: (x: number) => number; tex: string };
export type PiecewiseDef = { id: string; pieces: Piece[]; tex: string };

const P = (from: number, fromIncl: boolean, to: number, toIncl: boolean, f: (x: number) => number, tex: string): Piece => ({ from, to, fromIncl, toIncl, f, tex });

export const PIECEWISE: PiecewiseDef[] = [
  {
    id: "libro",
    tex: "f(x) = \\begin{cases} x + 4 & x \\le 3 \\\\ -2x + 13 & 3 < x < 6 \\\\ 1 & x \\ge 6 \\end{cases}",
    pieces: [P(-Infinity, false, 3, true, (x) => x + 4, "x + 4"), P(3, false, 6, false, (x) => -2 * x + 13, "-2x + 13"), P(6, true, Infinity, false, () => 1, "1")],
  },
  {
    id: "empalme",
    tex: "f(x) = \\begin{cases} 0{,}5x + 1 & x < 4 \\\\ 3 & x \\ge 4 \\end{cases}",
    pieces: [P(-Infinity, false, 4, false, (x) => 0.5 * x + 1, "0{,}5x + 1"), P(4, true, Infinity, false, () => 3, "3")],
  },
  {
    id: "tres",
    tex: "f(x) = \\begin{cases} -2 & x < -1 \\\\ 2x & -1 \\le x < 1 \\\\ 2 & x \\ge 1 \\end{cases}",
    pieces: [P(-Infinity, false, -1, false, () => -2, "-2"), P(-1, true, 1, false, (x) => 2 * x, "2x"), P(1, true, Infinity, false, () => 2, "2")],
  },
  {
    id: "salto",
    tex: "f(x) = \\begin{cases} -3 & x < 0 \\\\ 2x + 1 & x \\ge 0 \\end{cases}",
    pieces: [P(-Infinity, false, 0, false, () => -3, "-3"), P(0, true, Infinity, false, (x) => 2 * x + 1, "2x + 1")],
  },
];

/** Valor y tramo (índice) de una función a trozos en `x`. */
export function evalPiecewise(def: PiecewiseDef, x: number): { y: number; piece: number } {
  const i = def.pieces.findIndex((p) => (p.from === -Infinity || x > p.from || (p.fromIncl && x === p.from)) && (p.to === Infinity || x < p.to || (p.toIncl && x === p.to)));
  const k = i < 0 ? 0 : i;
  return { y: def.pieces[k]!.f(x), piece: k };
}

/** ¿Hay salto en cada punto de corte? Devuelve, por corte, la diferencia entre el valor por la derecha y por la izquierda. */
export function jumps(def: PiecewiseDef): { x: number; gap: number }[] {
  const out: { x: number; gap: number }[] = [];
  for (let k = 0; k + 1 < def.pieces.length; k++) {
    const x = def.pieces[k]!.to;
    out.push({ x, gap: Math.round((def.pieces[k + 1]!.f(x) - def.pieces[k]!.f(x)) * 1e9) / 1e9 });
  }
  return out;
}
