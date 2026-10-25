/** Derivadas (1.º de Bachillerato): catálogos con derivada analítica y utilidades numéricas. */

import { limitOneSided, type Lim } from "@/components/lesson/anim/lim";

export type Fn = (x: number) => number;

export type DFun = {
  id: string;
  label: string;
  tex: string;
  dtex: string;
  f: Fn;
  df: Fn;
  ddf?: Fn;
  /** `true` donde la función existe (y es derivable). */
  ok?: (x: number) => boolean;
  xr: [number, number];
  yr: [number, number];
  /** Punto inicial por defecto. */
  a0: number;
  /** Puntos críticos (f′ = 0) dentro de la ventana. */
  crit?: number[];
};

export const CAT: DFun[] = [
  { id: "x2", label: "x²", tex: "x^2", dtex: "2x", f: (x) => x * x, df: (x) => 2 * x, ddf: () => 2, xr: [-4, 4], yr: [-4, 12], a0: 1, crit: [0] },
  { id: "x3m3x", label: "x³ − 3x", tex: "x^3 - 3x", dtex: "3x^2 - 3", f: (x) => x ** 3 - 3 * x, df: (x) => 3 * x * x - 3, ddf: (x) => 6 * x, xr: [-3, 3], yr: [-6, 8], a0: 2, crit: [-1, 1] },
  { id: "x3", label: "x³", tex: "x^3", dtex: "3x^2", f: (x) => x ** 3, df: (x) => 3 * x * x, ddf: (x) => 6 * x, xr: [-3, 3], yr: [-10, 10], a0: 1, crit: [0] },
  { id: "sqrt", label: "√x", tex: "\\sqrt{x}", dtex: "\\dfrac{1}{2\\sqrt{x}}", f: Math.sqrt, df: (x) => 1 / (2 * Math.sqrt(x)), ddf: (x) => -1 / (4 * x ** 1.5), ok: (x) => x > 0, xr: [-1, 9], yr: [-2, 5], a0: 4 },
  { id: "inv", label: "1/x", tex: "\\dfrac{1}{x}", dtex: "-\\dfrac{1}{x^2}", f: (x) => 1 / x, df: (x) => -1 / (x * x), ddf: (x) => 2 / x ** 3, ok: (x) => Math.abs(x) > 1e-9, xr: [-5, 5], yr: [-6, 6], a0: 2 },
  { id: "exp", label: "eˣ", tex: "e^x", dtex: "e^x", f: Math.exp, df: Math.exp, ddf: Math.exp, xr: [-3, 3], yr: [-2, 10], a0: 1 },
  { id: "ln", label: "ln x", tex: "\\ln x", dtex: "\\dfrac{1}{x}", f: Math.log, df: (x) => 1 / x, ddf: (x) => -1 / (x * x), ok: (x) => x > 0, xr: [-1, 8], yr: [-4, 4], a0: 2 },
  { id: "sin", label: "sen x", tex: "\\sin x", dtex: "\\cos x", f: Math.sin, df: Math.cos, ddf: (x) => -Math.sin(x), xr: [-7, 7], yr: [-2, 2], a0: 0, crit: [-Math.PI / 2, Math.PI / 2] },
  { id: "x4", label: "x⁴ − 2x²", tex: "x^4 - 2x^2", dtex: "4x^3 - 4x", f: (x) => x ** 4 - 2 * x * x, df: (x) => 4 * x ** 3 - 4 * x, ddf: (x) => 12 * x * x - 4, xr: [-2, 2], yr: [-3, 6], a0: 1.5, crit: [-1, 0, 1] },
  { id: "x3c", label: "x³ − 9x² + 24x", tex: "x^3 - 9x^2 + 24x", dtex: "3x^2 - 18x + 24", f: (x) => x ** 3 - 9 * x * x + 24 * x, df: (x) => 3 * x * x - 18 * x + 24, ddf: (x) => 6 * x - 18, xr: [-1, 7], yr: [-10, 80], a0: 1, crit: [2, 4] },
  { id: "x2m4x", label: "x² − 4x + 3", tex: "x^2 - 4x + 3", dtex: "2x - 4", f: (x) => x * x - 4 * x + 3, df: (x) => 2 * x - 4, ddf: () => 2, xr: [-1, 5], yr: [-3, 8], a0: 0, crit: [2] },
];

export const byId = (id: string) => CAT.find((c) => c.id === id)!;

/** Cociente incremental (f(a+h) − f(a))/h. */
export const quotient = (f: Fn, a: number, h: number) => (f(a + h) - f(a)) / h;

/** Derivada numérica centrada (para verificar las analíticas). */
export const numDeriv = (f: Fn, x: number, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);

/** Recta tangente y = f(a) + f′(a)(x − a) en la forma y = m x + n. */
export function tangent(c: DFun, a: number): { m: number; n: number; fa: number } {
  const fa = c.f(a);
  const m = c.df(a);
  return { m, n: fa - m * a, fa };
}

/** Pendiente de la secante entre a y b. */
export const secantSlope = (f: Fn, a: number, b: number): number | null => (a === b ? null : (f(b) - f(a)) / (b - a));

/** Crecimiento según el signo de f′. */
export const growth = (d: number): "creciente" | "decreciente" | "horizontal" => (Math.abs(d) < 1e-9 ? "horizontal" : d > 0 ? "creciente" : "decreciente");

export type ExtremeKind = "maximo" | "minimo" | "inflexion";

/** Clasifica un punto crítico con el criterio de la segunda derivada y, si f″ = 0, con el signo de f′. */
export function classifyCritical(c: DFun, x: number): ExtremeKind {
  const s = c.ddf ? c.ddf(x) : 0;
  if (Math.abs(s) > 1e-9) return s > 0 ? "minimo" : "maximo";
  const l = c.df(x - 0.01);
  const r = c.df(x + 0.01);
  if (l < 0 && r > 0) return "minimo";
  if (l > 0 && r < 0) return "maximo";
  return "inflexion";
}

/* ───────────── Producto, cociente y cadena ───────────── */

export type Elem = { label: string; f: Fn; df: Fn; dtex: string; ok?: (x: number) => boolean };

export const ELEMS: Elem[] = [
  { label: "x²", f: (x) => x * x, df: (x) => 2 * x, dtex: "2x" },
  { label: "x³", f: (x) => x ** 3, df: (x) => 3 * x * x, dtex: "3x²" },
  { label: "x + 1", f: (x) => x + 1, df: () => 1, dtex: "1" },
  { label: "2x − 3", f: (x) => 2 * x - 3, df: () => 2, dtex: "2" },
  { label: "√x", f: Math.sqrt, df: (x) => 1 / (2 * Math.sqrt(x)), dtex: "1/(2√x)", ok: (x) => x > 0 },
  { label: "sen x", f: Math.sin, df: Math.cos, dtex: "cos x" },
  { label: "eˣ", f: Math.exp, df: Math.exp, dtex: "eˣ" },
  { label: "ln x", f: Math.log, df: (x) => 1 / x, dtex: "1/x", ok: (x) => x > 0 },
];

/** (f·g)′ o (f/g)′ en x: derivada por la regla y por cociente incremental. */
export function productQuotient(op: "*" | "/", F: Elem, G: Elem, x: number) {
  const f = F.f(x);
  const g = G.f(x);
  const df = F.df(x);
  const dg = G.df(x);
  const rule = op === "*" ? df * g + f * dg : (df * g - f * dg) / (g * g);
  const h = op === "*" ? (t: number) => F.f(t) * G.f(t) : (t: number) => F.f(t) / G.f(t);
  return { rule, numeric: numDeriv(h, x), value: h(x) };
}

export type Outer = { label: string; name: (u: string) => string; dname: (u: string) => string; f: Fn; df: Fn };
export type Inner = { label: string; text: string; dtext: string; g: Fn; dg: Fn };

export const OUTERS: Outer[] = [
  { label: "u²", name: (u) => `(${u})²`, dname: (u) => `2(${u})`, f: (u) => u * u, df: (u) => 2 * u },
  { label: "√u", name: (u) => `√(${u})`, dname: (u) => `1/(2√(${u}))`, f: Math.sqrt, df: (u) => 1 / (2 * Math.sqrt(u)) },
  { label: "sen u", name: (u) => `sen(${u})`, dname: (u) => `cos(${u})`, f: Math.sin, df: Math.cos },
  { label: "eᵘ", name: (u) => `e^(${u})`, dname: (u) => `e^(${u})`, f: Math.exp, df: Math.exp },
  { label: "ln u", name: (u) => `ln(${u})`, dname: (u) => `1/(${u})`, f: Math.log, df: (u) => 1 / u },
  { label: "1/u", name: (u) => `1/(${u})`, dname: (u) => `−1/(${u})²`, f: (u) => 1 / u, df: (u) => -1 / (u * u) },
];

export const INNERS: Inner[] = [
  { label: "x² + 1", text: "x² + 1", dtext: "2x", g: (x) => x * x + 1, dg: (x) => 2 * x },
  { label: "2x + 3", text: "2x + 3", dtext: "2", g: (x) => 2 * x + 3, dg: () => 2 },
  { label: "x³", text: "x³", dtext: "3x²", g: (x) => x ** 3, dg: (x) => 3 * x * x },
  { label: "3x", text: "3x", dtext: "3", g: (x) => 3 * x, dg: () => 3 },
];

export function chain(o: Outer, i: Inner, x: number) {
  const u = i.g(x);
  const rule = o.df(u) * i.dg(x);
  const value = o.f(u);
  const numeric = numDeriv((t) => o.f(i.g(t)), x);
  return { u, rule: Number.isFinite(rule) ? rule : null, numeric: Number.isFinite(numeric) ? numeric : null, value: Number.isFinite(value) ? value : null };
}

/* ───────────── Función inversa ───────────── */

export type InvPair = {
  label: string;
  f: Fn;
  df: Fn;
  inv: Fn;
  /** Derivada analítica de la inversa en b (para comprobar). */
  dinv: Fn;
  /** Valores de b admitidos. */
  brange: [number, number];
  b0: number;
  /** Dominio de f para que sea inyectiva. */
  dom?: [number, number];
  invLabel: string;
  dinvTex: string;
  view: { xr: [number, number]; yr: [number, number] };
};

export const INV_PAIRS: InvPair[] = [
  { label: "f(x) = eˣ", f: Math.exp, df: Math.exp, inv: Math.log, dinv: (b) => 1 / b, brange: [0.5, 6], b0: 2, invLabel: "ln x", dinvTex: "1/x", view: { xr: [-3, 6], yr: [-3, 6] } },
  { label: "f(x) = x³", f: (x) => x ** 3, df: (x) => 3 * x * x, inv: Math.cbrt, dinv: (b) => 1 / (3 * Math.cbrt(b) ** 2), brange: [0.5, 8], b0: 8, invLabel: "∛x", dinvTex: "1/(3∛x²)", view: { xr: [-3, 6], yr: [-3, 6] } },
  { label: "f(x) = 2x + 3", f: (x) => 2 * x + 3, df: () => 2, inv: (y) => (y - 3) / 2, dinv: () => 0.5, brange: [-2, 8], b0: 7, invLabel: "(x − 3)/2", dinvTex: "1/2", view: { xr: [-4, 8], yr: [-4, 8] } },
  { label: "f(x) = x², x ≥ 0", f: (x) => x * x, df: (x) => 2 * x, inv: Math.sqrt, dinv: (b) => 1 / (2 * Math.sqrt(b)), brange: [0.5, 9], b0: 4, dom: [0, 10], invLabel: "√x", dinvTex: "1/(2√x)", view: { xr: [-1, 9], yr: [-1, 9] } },
  { label: "f(x) = sen x, |x| < π/2", f: Math.sin, df: Math.cos, inv: Math.asin, dinv: (b) => 1 / Math.sqrt(1 - b * b), brange: [-0.9, 0.9], b0: 0.5, dom: [-Math.PI / 2, Math.PI / 2], invLabel: "arcsen x", dinvTex: "1/√(1 − x²)", view: { xr: [-2, 2], yr: [-2, 2] } },
  { label: "f(x) = tg x, |x| < π/2", f: Math.tan, df: (x) => 1 + Math.tan(x) ** 2, inv: Math.atan, dinv: (b) => 1 / (1 + b * b), brange: [-3, 3], b0: 1, dom: [-Math.PI / 2 + 0.01, Math.PI / 2 - 0.01], invLabel: "arctg x", dinvTex: "1/(1 + x²)", view: { xr: [-3, 3], yr: [-3, 3] } },
];

/* ───────────── Movimiento ───────────── */

export type Motion = { label: string; tex: string; e: Fn; v: Fn; a: Fn; vtex: string; atex: string; tmax: number; vmax: number; emax: number; unit: string };

export const MOTIONS: Motion[] = [
  { label: "e = 1,2t + 0,08t²", tex: "e = 1{,}2t + 0{,}08t^2", e: (t) => 1.2 * t + 0.08 * t * t, v: (t) => 1.2 + 0.16 * t, a: () => 0.16, vtex: "v = 1,2 + 0,16t", atex: "a = 0,16", tmax: 20, vmax: 6, emax: 50, unit: "m" },
  { label: "h = 40t − 5t² (lanzamiento)", tex: "h = 40t - 5t^2", e: (t) => 40 * t - 5 * t * t, v: (t) => 40 - 10 * t, a: () => -10, vtex: "v = 40 − 10t", atex: "a = −10", tmax: 8, vmax: 40, emax: 80, unit: "m" },
  { label: "d = 5t² (caída libre)", tex: "d = 5t^2", e: (t) => 5 * t * t, v: (t) => 10 * t, a: () => 10, vtex: "v = 10t", atex: "a = 10", tmax: 5, vmax: 50, emax: 130, unit: "m" },
  { label: "e = 20t + 0,5t² (coche, km)", tex: "e = 20t + 0{,}5t^2", e: (t) => 20 * t + 0.5 * t * t, v: (t) => 20 + t, a: () => 1, vtex: "v = 20 + t", atex: "a = 1", tmax: 10, vmax: 35, emax: 260, unit: "km" },
];

/* ───────────── Optimización ───────────── */

export type OptProblem = {
  label: string;
  fn: Fn;
  dfn: Fn;
  dom: [number, number];
  /** Variable y magnitud para el texto. */
  x: string;
  y: string;
  goal: "min" | "max";
  /** Punto óptimo y valor. */
  best: number;
  crit: number | null;
  tex: string;
  xr: [number, number];
  yr: [number, number];
  note: string;
};

const cylR = Math.cbrt(2 / Math.PI);

export const OPT: OptProblem[] = [
  { label: "Ventana de 1 m² con perfil mínimo", fn: (x) => 2 * x + 2 / x, dfn: (x) => 2 - 2 / (x * x), dom: [0.25, 4], x: "x (m)", y: "perímetro P", goal: "min", best: 1, crit: 1, tex: "P(x) = 2x + \\dfrac{2}{x}", xr: [0, 4.5], yr: [0, 12], note: "base x y altura 1/x" },
  { label: "Ventana con 14 m de perfil: luz máxima", fn: (x) => 7 * x - x * x, dfn: (x) => 7 - 2 * x, dom: [0, 7], x: "x (m)", y: "luz A", goal: "max", best: 3.5, crit: 3.5, tex: "A(x) = 7x - x^2", xr: [0, 7.5], yr: [-2, 14], note: "base x y altura 7 − x" },
  { label: "La misma ventana en una pared de 2,5 × 5 m", fn: (x) => 7 * x - x * x, dfn: (x) => 7 - 2 * x, dom: [4.5, 5], x: "x (m)", y: "luz A", goal: "max", best: 4.5, crit: 3.5, tex: "A(x) = 7x - x^2,\\ 4{,}5 \\le x \\le 5", xr: [2, 6.5], yr: [4, 13], note: "altura 7 − x ≤ 2,5 y base ≤ 5" },
  { label: "Depósito cilíndrico de 4 m³ con chapa mínima", fn: (r) => 8 / r + 2 * Math.PI * r * r, dfn: (r) => -8 / (r * r) + 4 * Math.PI * r, dom: [0.3, 2], x: "r (m)", y: "superficie S", goal: "min", best: cylR, crit: cylR, tex: "S(r) = \\dfrac{8}{r} + 2\\pi r^2", xr: [0, 2.2], yr: [0, 30], note: "altura h = 4/(πr²)" },
];

/** Mejor valor sobre el dominio: candidatos = puntos críticos del dominio + extremos. */
export function optimum(p: OptProblem): { x: number; y: number } {
  const cands = [p.dom[0], p.dom[1], ...(p.crit !== null && p.crit >= p.dom[0] && p.crit <= p.dom[1] ? [p.crit] : [])];
  const ys = cands.map((x) => ({ x, y: p.fn(x) }));
  return ys.reduce((a, b) => (p.goal === "min" ? (b.y < a.y ? b : a) : b.y > a.y ? b : a));
}

/* ───────────── Derivabilidad ───────────── */

export type Case = { label: string; tex: string; f: Fn; a: number; xr: [number, number]; yr: [number, number] };

export const CASES: Case[] = [
  { label: "|x| en 0", tex: "f(x) = |x|", f: Math.abs, a: 0, xr: [-3, 3], yr: [-1, 4] },
  { label: "Empalme suave en 1", tex: "f(x)=\\begin{cases} x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}", f: (x) => (x < 1 ? x * x : 2 * x - 1), a: 1, xr: [-1, 3], yr: [-1, 6] },
  { label: "Esquina en 1", tex: "f(x)=\\begin{cases} x^2 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}", f: (x) => (x < 1 ? x * x : 3 * x - 2), a: 1, xr: [-1, 3], yr: [-1, 6] },
  { label: "Salto en 1", tex: "f(x)=\\begin{cases} x^2 & x<1\\\\ x^2+1 & x\\ge 1\\end{cases}", f: (x) => (x < 1 ? x * x : x * x + 1), a: 1, xr: [-1, 3], yr: [-1, 8] },
  { label: "∛x en 0", tex: "f(x) = \\sqrt[3]{x}", f: Math.cbrt, a: 0, xr: [-3, 3], yr: [-2, 2] },
  { label: "x·|x| en 0", tex: "f(x) = x\\,|x|", f: (x) => x * Math.abs(x), a: 0, xr: [-3, 3], yr: [-6, 6] },
];

export type DerivStatus = "derivable" | "esquina" | "no-continua" | "tangente-vertical";

export function sideDerivatives(c: Case): { left: Lim; right: Lim; continuous: boolean; status: DerivStatus } {
  const fa = c.f(c.a);
  const q: Fn = (x) => (c.f(x) - fa) / (x - c.a);
  const left = limitOneSided(q, c.a, "-");
  const right = limitOneSided(q, c.a, "+");
  const continuous = [-1e-9, 1e-9].every((h) => Math.abs(c.f(c.a + h) - fa) < 1e-2);
  const finite = left.kind === "finite" && right.kind === "finite";
  if (finite && Math.abs((left as { value: number }).value - (right as { value: number }).value) < 1e-3) return { left, right, continuous, status: "derivable" };
  if (!continuous) return { left, right, continuous, status: "no-continua" };
  if (left.kind === "inf" || right.kind === "inf") return { left, right, continuous, status: "tangente-vertical" };
  return { left, right, continuous, status: "esquina" };
}
