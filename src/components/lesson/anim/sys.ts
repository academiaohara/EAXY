import { frac, gcd, solveQuadratic, type Frac } from "@/components/lesson/anim/eq";

/** Sistemas 2×2 con enteros y fracciones exactas. */

export type Eq2 = readonly [a: number, b: number, c: number];

export type SystemSolution =
  | { kind: "unica"; x: Frac; y: Frac; det: number }
  | { kind: "incompatible" }
  | { kind: "indeterminado" };

/** Resuelve `a1·x + b1·y = c1`, `a2·x + b2·y = c2` por Cramer. */
export function solveSystem(e1: Eq2, e2: Eq2): SystemSolution {
  const [a1, b1, c1] = e1;
  const [a2, b2, c2] = e2;
  const det = a1 * b2 - a2 * b1;
  if (det !== 0) return { kind: "unica", x: frac(c1 * b2 - c2 * b1, det), y: frac(a1 * c2 - a2 * c1, det), det };
  const proporcional = (u: number[], v: number[]) => u[0] * v[1] === u[1] * v[0] && u[0] * v[2] === u[2] * v[0] && u[1] * v[2] === u[2] * v[1];
  const z1 = a1 === 0 && b1 === 0;
  const z2 = a2 === 0 && b2 === 0;
  if (z1 || z2) {
    if ((z1 && c1 !== 0) || (z2 && c2 !== 0)) return { kind: "incompatible" };
    return { kind: "indeterminado" };
  }
  return proporcional([a1, b1, c1], [a2, b2, c2]) ? { kind: "indeterminado" } : { kind: "incompatible" };
}

const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

export type ReductionPlan = { eliminate: "x" | "y"; m1: number; m2: number; sum: Eq2; scaled1: Eq2; scaled2: Eq2 };

/** Multiplicadores mínimos para que `eliminate` tenga coeficientes opuestos. Requiere coeficientes ≠ 0. */
export function reductionPlan(e1: Eq2, e2: Eq2, eliminate: "x" | "y"): ReductionPlan | null {
  const k = eliminate === "x" ? 0 : 1;
  const p = e1[k];
  const q = e2[k];
  if (p === 0 || q === 0) return null;
  const l = lcm(p, q);
  const m1 = l / p;
  const m2 = -l / q;
  const s1: Eq2 = [e1[0] * m1, e1[1] * m1, e1[2] * m1];
  const s2: Eq2 = [e2[0] * m2, e2[1] * m2, e2[2] * m2];
  return { eliminate, m1, m2, sum: [s1[0] + s2[0], s1[1] + s2[1], s1[2] + s2[2]], scaled1: s1, scaled2: s2 };
}

/** Elige la incógnita que menos esfuerzo pide eliminar. */
export function bestElimination(e1: Eq2, e2: Eq2): ReductionPlan | null {
  const px = reductionPlan(e1, e2, "x");
  const py = reductionPlan(e1, e2, "y");
  if (!px) return py;
  if (!py) return px;
  const cost = (p: ReductionPlan) => Math.abs(p.m1) + Math.abs(p.m2);
  return cost(px) <= cost(py) ? px : py;
}

const sg = (n: number) => String(n).replace("-", "−");

/** `3x − 5y = 1` en texto plano (para animaciones SVG). */
export function eqText(e: Eq2): string {
  const [a, b, c] = e;
  const term = (k: number, v: string, first: boolean) => {
    if (k === 0) return "";
    const abs = Math.abs(k);
    const mag = abs === 1 ? "" : String(abs);
    if (first) return `${k < 0 ? "−" : ""}${mag}${v}`;
    return ` ${k < 0 ? "−" : "+"} ${mag}${v}`;
  };
  const left = term(a, "x", true) + term(b, "y", a === 0) || "0";
  return `${left} = ${sg(c)}`;
}

/** Igual que `eqText` pero en LaTeX. */
export const eqTex = (e: Eq2): string => eqText(e).replace(/−/g, "-");

export type Curve = "circulo" | "parabola" | "hiperbola";

export type LineCurve = { points: { x: number; y: number }[]; quad: { a: number; b: number; c: number } | null; linear: boolean };

/**
 * Intersección de `y = m·x + n` con una curva. El círculo es `x² + y² = 25`, la parábola `y = x²` y la
 * hipérbola `x·y = 6`. Devuelve los puntos reales y la ecuación de segundo grado en x que sale al sustituir.
 */
export function lineCurve(curve: Curve, m: number, n: number): LineCurve {
  let a: number;
  let b: number;
  let c: number;
  if (curve === "circulo") {
    a = 1 + m * m;
    b = 2 * m * n;
    c = n * n - 25;
  } else if (curve === "parabola") {
    a = 1;
    b = -m;
    c = -n;
  } else {
    a = m;
    b = n;
    c = -6;
  }
  let xs: number[];
  let linear = false;
  if (a === 0) {
    linear = true;
    xs = b === 0 ? [] : [-c / b];
  } else {
    const q = solveQuadratic(a, b, c);
    xs = q.roots.map((r) => r.value);
  }
  return { points: xs.map((x) => ({ x, y: m * x + n })), quad: a === 0 ? null : { a, b, c }, linear };
}

/** Capital total `T` repartido en `x` (al r1 %) e `y` (al r2 %) que da `G` de ganancia (G en las mismas unidades que T). */
export function capitales(total: number, r1: number, r2: number, ganancia: number): { x: number; y: number; ok: boolean } | null {
  if (r1 === r2) return null;
  const x = (ganancia * 100 - r2 * total) / (r1 - r2);
  const y = total - x;
  return { x, y, ok: x >= 0 && y >= 0 };
}
