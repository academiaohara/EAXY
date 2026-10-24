/** Geometría analítica en el plano para las herramientas de 1.º de Bachillerato. */

const r9 = (x: number) => Math.round(x * 1e9) / 1e9;
const DEG = 180 / Math.PI;

export type V2 = { x: number; y: number };

export const dot = (u: V2, v: V2) => r9(u.x * v.x + u.y * v.y);
export const norm = (u: V2) => Math.hypot(u.x, u.y);

/** Ángulo entre dos vectores no nulos en grados [0, 180]; `null` si alguno es nulo. */
export function angleBetween(u: V2, v: V2): number | null {
  const n = norm(u) * norm(v);
  if (n < 1e-12) return null;
  const c = Math.max(-1, Math.min(1, Math.round((dot(u, v) / n) * 1e12) / 1e12));
  return r9(Math.acos(c) * DEG);
}

/** Proyección escalar de u sobre v (con signo). */
export const projScalar = (u: V2, v: V2): number | null => (norm(v) < 1e-12 ? null : r9(dot(u, v) / norm(v)));

/** Recta A·x + B·y + C = 0. */
export type Line = { A: number; B: number; C: number };

/** Recta por un punto con vector director d. */
export const lineFromPointDir = (p: V2, d: V2): Line => ({ A: d.y, B: -d.x, C: d.x * p.y - d.y * p.x });

/** Recta por dos puntos distintos (o `null` si coinciden). */
export function lineFromPoints(p: V2, q: V2): Line | null {
  const d = { x: q.x - p.x, y: q.y - p.y };
  return d.x === 0 && d.y === 0 ? null : lineFromPointDir(p, d);
}

/** Vector director de la recta. */
export const dirOf = (l: Line): V2 => ({ x: l.B, y: -l.A });

export type Position = "secantes" | "paralelas" | "coincidentes";

export function position(a: Line, b: Line): Position {
  const det = a.A * b.B - a.B * b.A;
  if (Math.abs(det) > 1e-9) return "secantes";
  const sameAB = Math.abs(a.A * b.C - a.C * b.A) < 1e-9 && Math.abs(a.B * b.C - a.C * b.B) < 1e-9;
  return sameAB ? "coincidentes" : "paralelas";
}

/** Punto de corte; `null` si no son secantes. */
export function intersect(a: Line, b: Line): V2 | null {
  const det = a.A * b.B - a.B * b.A;
  if (Math.abs(det) < 1e-9) return null;
  return { x: r9((a.B * b.C - b.B * a.C) / det), y: r9((b.A * a.C - a.A * b.C) / det) };
}

/** Ángulo agudo (o recto) entre dos rectas, en grados [0, 90]. */
export function angleLines(a: Line, b: Line): number {
  const t = angleBetween(dirOf(a), dirOf(b)) ?? 0;
  return r9(t > 90 ? 180 - t : t);
}

/** Distancia de un punto a una recta. */
export const distPointLine = (p: V2, l: Line) => r9(Math.abs(l.A * p.x + l.B * p.y + l.C) / Math.hypot(l.A, l.B));

/** Distancia entre dos rectas paralelas (la de un punto cualquiera de la primera a la segunda). */
export function distParallel(a: Line, b: Line): number {
  const p: V2 = Math.abs(a.B) > 1e-12 ? { x: 0, y: -a.C / a.B } : { x: -a.C / a.A, y: 0 };
  return distPointLine(p, b);
}

/** Mediatriz del segmento PQ. */
export function mediatriz(p: V2, q: V2): Line | null {
  if (p.x === q.x && p.y === q.y) return null;
  const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
  const n = { x: q.x - p.x, y: q.y - p.y };
  return { A: n.x, B: n.y, C: -(n.x * m.x + n.y * m.y) };
}

/** Escribe `Ax + By + C = 0` con signos tipográficos, sin coeficientes 1 y con enteros si lo son. */
export function lineText(l: Line, fmt: (n: number) => string = (n) => String(r9(n))): string {
  const coef = (n: number) => (Math.abs(n) === 1 ? "" : fmt(Math.abs(n)));
  const parts: string[] = [];
  if (l.A !== 0) parts.push(`${l.A < 0 ? "−" : ""}${coef(l.A)}x`);
  if (l.B !== 0) parts.push(`${parts.length ? (l.B < 0 ? " − " : " + ") : l.B < 0 ? "−" : ""}${coef(l.B)}y`);
  if (l.C !== 0) parts.push(`${parts.length ? (l.C < 0 ? " − " : " + ") : l.C < 0 ? "−" : ""}${fmt(Math.abs(l.C))}`);
  return `${parts.length ? parts.join("") : "0"} = 0`;
}

/** Simplifica A, B, C enteros dividiendo por su m.c.d. y poniendo A > 0 (o B > 0 si A = 0). */
export function normalizeLine(l: Line): Line {
  const g = (a: number, b: number): number => (b === 0 ? Math.abs(a) : g(b, a % b));
  const d = g(g(Math.round(l.A), Math.round(l.B)), Math.round(l.C)) || 1;
  let A = l.A / d;
  let B = l.B / d;
  let C = l.C / d;
  if (A < 0 || (A === 0 && B < 0)) {
    A = -A;
    B = -B;
    C = -C;
  }
  return { A: r9(A) + 0, B: r9(B) + 0, C: r9(C) + 0 };
}

export type ConicKind = "circunferencia" | "elipse" | "hipérbola" | "parábola";

/** Datos de una cónica con centro (h, k): focos, excentricidad y semiejes. */
export type Conic = {
  kind: ConicKind;
  focus: V2[];
  c: number;
  e: number | null;
  /** Asíntotas (hipérbola) o directriz (parábola), como texto. */
  extra: string;
};

/**
 * Elementos de la cónica reducida con centro (vértice, en la parábola) en (h, k):
 * circunferencia (a = r), elipse (a, b), hipérbola (a, b) y parábola (a = p, y² = 2p·x).
 */
export function conic(kind: ConicKind, a: number, b: number, h: number, k: number): Conic {
  if (kind === "circunferencia") return { kind, focus: [{ x: h, y: k }], c: 0, e: 0, extra: "" };
  if (kind === "elipse") {
    const horizontal = a >= b;
    const c = Math.sqrt(Math.abs(a * a - b * b));
    const big = Math.max(a, b);
    return { kind, focus: horizontal ? [{ x: h - c, y: k }, { x: h + c, y: k }] : [{ x: h, y: k - c }, { x: h, y: k + c }], c: r9(c), e: r9(c / big), extra: "" };
  }
  if (kind === "hipérbola") {
    const c = Math.sqrt(a * a + b * b);
    return { kind, focus: [{ x: h - c, y: k }, { x: h + c, y: k }], c: r9(c), e: r9(c / a), extra: `y − ${k} = ±(${r9(b / a)})(x − ${h})` };
  }
  return { kind, focus: [{ x: h + a / 2, y: k }], c: r9(a / 2), e: 1, extra: `x = ${r9(h - a / 2)}` };
}
