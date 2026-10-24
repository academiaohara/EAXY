/** Límites y continuidad de funciones (1.º de Bachillerato): estimación numérica y clasificación. */

export type Fn = (x: number) => number;

export type Lim =
  | { kind: "finite"; value: number }
  | { kind: "inf"; sign: 1 | -1 }
  | { kind: "none" }
  | { kind: "undef" };

export type Pt = number | "+inf" | "-inf";
export type Side = "-" | "+";

const HS_FINITE = [2, 4, 5];
const HS_INF = [3, 5, 7];
const BIG = 1e300;

const pts = (at: Pt, side: Side): number[] =>
  (typeof at === "number" ? HS_FINITE : HS_INF).map((h) => (at === "+inf" ? 10 ** h : at === "-inf" ? -(10 ** h) : at + (side === "-" ? -1 : 1) * 10 ** -h));

/** Puntos de aproximación para la tabla (sin evaluar nunca en `at`). */
export const approachPoints = pts;

const clean = (v: number) => {
  const r = Math.round(v * 1e4) / 1e4;
  return Math.abs(v - Math.round(v)) < 1e-4 ? Math.round(v) : r;
};

/** Estima el límite lateral (o en el infinito) mirando la función en tres puntos cada vez más cercanos. */
export function limitOneSided(f: Fn, at: Pt, side: Side): Lim {
  const raw = pts(at, side).map((x) => f(x));
  if (raw.every((v) => Number.isNaN(v))) return { kind: "undef" };
  if (raw.some((v) => Number.isNaN(v))) return { kind: "none" };
  const v = raw.map((y) => (y === Infinity ? BIG : y === -Infinity ? -BIG : y));
  const [v1, v2, v3] = v as [number, number, number];
  if (Math.abs(v3) >= BIG) return { kind: "inf", sign: v3 > 0 ? 1 : -1 };
  if (Math.abs(v3 - v2) <= 1e-3 * (1 + Math.abs(v3)) && Math.abs(v2 - v1) >= Math.abs(v3 - v2)) {
    return { kind: "finite", value: clean(v3) };
  }
  const grows = Math.abs(v1) <= Math.abs(v2) && Math.abs(v2) <= Math.abs(v3) && Math.abs(v3) > Math.abs(v1) && Math.abs(v3) >= 10;
  if (grows && Math.sign(v1) === Math.sign(v2) && Math.sign(v2) === Math.sign(v3)) return { kind: "inf", sign: v3 > 0 ? 1 : -1 };
  return { kind: "none" };
}

const same = (a: Lim, b: Lim) =>
  (a.kind === "finite" && b.kind === "finite" && Math.abs(a.value - b.value) < 1e-3) || (a.kind === "inf" && b.kind === "inf" && a.sign === b.sign);

/** Límite en un punto finito (o en ±∞): existe si coinciden los laterales. */
export function limitAt(f: Fn, at: Pt): Lim {
  if (typeof at !== "number") return limitOneSided(f, at, "+");
  const l = limitOneSided(f, at, "-");
  const r = limitOneSided(f, at, "+");
  if (l.kind === "undef") return r;
  if (r.kind === "undef") return l;
  return same(l, r) ? l : { kind: "none" };
}

export function limText(l: Lim): string {
  if (l.kind === "finite") return String(l.value).replace(".", ",").replace("-", "−");
  if (l.kind === "inf") return l.sign > 0 ? "+∞" : "−∞";
  if (l.kind === "undef") return "no definida";
  return "no existe";
}

export type Discontinuity = "continua" | "evitable" | "salto-finito" | "salto-infinito" | "segunda-especie";

/** Clasifica el comportamiento de f en x = a a partir de los laterales y de la imagen. */
export function classify(left: Lim, right: Lim, fa: number | null): Discontinuity {
  if (left.kind === "none" || right.kind === "none") return "segunda-especie";
  if (left.kind === "inf" || right.kind === "inf") return "salto-infinito";
  if (left.kind === "finite" && right.kind === "finite") {
    if (Math.abs(left.value - right.value) > 1e-3) return "salto-finito";
    return fa !== null && Math.abs(fa - left.value) < 1e-3 ? "continua" : "evitable";
  }
  return "segunda-especie";
}

export const DISC_LABEL: Record<Discontinuity, string> = {
  continua: "Continua en este punto",
  evitable: "Discontinuidad evitable",
  "salto-finito": "Discontinuidad de salto finito (1.ª especie)",
  "salto-infinito": "Discontinuidad de salto infinito (1.ª especie)",
  "segunda-especie": "Discontinuidad de 2.ª especie",
};

/* ───────────── Catálogos ───────────── */

export type Piece = {
  label: string;
  a: number;
  f: Fn;
  /** Imagen en x = a (`null` si no está definida). */
  fa: number | null;
  /** Dominio de dibujo (huecos). */
  ok?: (x: number) => boolean;
  tex: string;
  xr: [number, number];
  yr: [number, number];
};

export const PIECES: Piece[] = [
  { label: "Función 1", a: 1, f: (x) => (x < 1 ? x ** 3 : 3 * x - 2), fa: 1, tex: "f(x)=\\begin{cases} x^3 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}", xr: [-1, 3], yr: [-2, 6] },
  { label: "Función 2", a: 1, f: (x) => (x < 1 ? x ** 3 : x + 2), fa: 3, tex: "f(x)=\\begin{cases} x^3 & x<1\\\\ x+2 & x\\ge 1\\end{cases}", xr: [-1, 3], yr: [-2, 6] },
  { label: "Función 3", a: 1, f: (x) => (x === 1 ? NaN : (x * x - 1) / (x - 1)), fa: null, ok: (x) => Math.abs(x - 1) > 1e-9, tex: "f(x)=\\dfrac{x^2-1}{x-1}", xr: [-2, 4], yr: [-2, 6] },
  { label: "Función 4", a: 2, f: (x) => (x === 2 ? 1 : x * x), fa: 1, ok: (x) => Math.abs(x - 2) > 1e-9, tex: "f(x)=\\begin{cases} x^2 & x\\neq 2\\\\ 1 & x=2\\end{cases}", xr: [-1, 4], yr: [-1, 8] },
  { label: "Función 5", a: 0, f: (x) => (x <= 0 ? x ** 3 : 1 / x), fa: 0, tex: "f(x)=\\begin{cases} x^3 & x\\le 0\\\\ 1/x & x>0\\end{cases}", xr: [-2, 3], yr: [-4, 6] },
  { label: "Función 6", a: 0, f: (x) => (x === 0 ? 0 : Math.sin(1 / x)), fa: 0, ok: (x) => Math.abs(x) > 1e-9, tex: "f(x)=\\begin{cases} 0 & x=0\\\\ \\sin(1/x) & x\\neq 0\\end{cases}", xr: [-1, 1], yr: [-2, 2] },
];

export function pieceLimits(p: Piece) {
  const left = limitOneSided(p.f, p.a, "-");
  const right = limitOneSided(p.f, p.a, "+");
  return { left, right, kind: classify(left, right, p.fa) };
}

export type TableFn = { label: string; f: Fn; a: number; fa: number | null };

export const TABLE_FNS: TableFn[] = [
  { label: "x² − 3, x → 2", f: (x) => x * x - 3, a: 2, fa: 1 },
  { label: "(x² − 1)/(x − 1), x → 1", f: (x) => (x * x - 1) / (x - 1), a: 1, fa: null },
  { label: "sen x / x, x → 0", f: (x) => Math.sin(x) / x, a: 0, fa: null },
  { label: "(√(x + 1) − 1)/x, x → 0", f: (x) => (Math.sqrt(x + 1) - 1) / x, a: 0, fa: null },
];

export type InfFn = { label: string; tex: string; f: Fn; xr: [number, number]; yr: [number, number] };

export const INF_FNS: InfFn[] = [
  { label: "1/x", tex: "1/x", f: (x) => 1 / x, xr: [-6, 6], yr: [-6, 6] },
  { label: "1/x²", tex: "1/x^2", f: (x) => 1 / (x * x), xr: [-6, 6], yr: [-2, 8] },
  { label: "x²", tex: "x^2", f: (x) => x * x, xr: [-4, 4], yr: [-2, 10] },
  { label: "−x²", tex: "-x^2", f: (x) => -x * x, xr: [-4, 4], yr: [-10, 2] },
  { label: "x³", tex: "x^3", f: (x) => x ** 3, xr: [-3, 3], yr: [-10, 10] },
  { label: "eˣ", tex: "e^x", f: Math.exp, xr: [-4, 3], yr: [-2, 10] },
  { label: "ln x", tex: "\\ln x", f: Math.log, xr: [-1, 8], yr: [-6, 4] },
];

/** Cociente (a·xᵖ + 3)/(c·xᵠ + 5), con p, q ≥ 1, en ±∞ por comparación de grados. */
export function degreeLimit(p: number, a: number, q: number, c: number, sign: 1 | -1): Lim {
  if (p > q) {
    const s = Math.sign(a / c) * (sign < 0 && (p - q) % 2 === 1 ? -1 : 1);
    return { kind: "inf", sign: s > 0 ? 1 : -1 };
  }
  if (p === q) return { kind: "finite", value: a / c };
  return { kind: "finite", value: 0 };
}

export const ratFn = (p: number, a: number, q: number, c: number): Fn => (x) => (a * x ** p + 3) / (c * x ** q + 5);

/** f(x) = (a x² + b x + c)/(x − r): asíntotas. */
export type Asym = { vertical: number | null; hole: boolean; horizontal: number | null; oblique: { m: number; n: number } | null; parabolic: boolean };
export function asymptotes(a: number, b: number, c: number, r: number): Asym {
  const nr = a * r * r + b * r + c;
  const hole = nr === 0;
  return {
    vertical: hole ? null : r,
    hole,
    horizontal: a === 0 ? b : null,
    oblique: a !== 0 ? { m: a, n: b + a * r } : null,
    parabolic: false,
  };
}
export const asymFn = (a: number, b: number, c: number, r: number): Fn => (x) => (a * x * x + b * x + c) / (x - r);

/* ───────────── Operaciones entre límites ───────────── */

export type Cat = "K" | "0" | "inf";
export type Op = "+" | "-" | "*" | "/";

export const catOf = (l: Lim): Cat | null => (l.kind === "finite" ? (l.value === 0 ? "0" : "K") : l.kind === "inf" ? "inf" : null);

/** Forma que resulta al operar dos límites y si es una indeterminación. */
export function formOf(op: Op, a: Lim, b: Lim): { text: string; indeterminate: boolean } | null {
  const ca = catOf(a);
  const cb = catOf(b);
  if (!ca || !cb) return null;
  const sym = (c: Cat) => (c === "inf" ? "∞" : c);
  const opSym = op === "-" ? "−" : op === "*" ? "·" : op;
  const sa = a.kind === "inf" ? a.sign : 0;
  const sb = b.kind === "inf" ? b.sign : 0;
  const indeterminate =
    (op === "+" && ca === "inf" && cb === "inf" && sa !== sb) ||
    (op === "-" && ca === "inf" && cb === "inf" && sa === sb) ||
    (op === "*" && ((ca === "0" && cb === "inf") || (ca === "inf" && cb === "0"))) ||
    (op === "/" && ((ca === "0" && cb === "0") || (ca === "inf" && cb === "inf")));
  return { text: `${sym(ca)} ${opSym} ${sym(cb)}`, indeterminate };
}

export const applyOp = (op: Op, f: Fn, g: Fn): Fn =>
  op === "+" ? (x) => f(x) + g(x) : op === "-" ? (x) => f(x) - g(x) : op === "*" ? (x) => f(x) * g(x) : (x) => f(x) / g(x);

export const OP_FNS: { label: string; f: Fn }[] = [
  { label: "x", f: (x) => x },
  { label: "x²", f: (x) => x * x },
  { label: "2x", f: (x) => 2 * x },
  { label: "1/x", f: (x) => 1 / x },
  { label: "3", f: () => 3 },
  { label: "−x", f: (x) => -x },
];

/** f(x) = 1/(x − r) − k/(x² − r²): la resta ∞ − ∞ en x → r. */
export const restaFn = (k: number, r: number): Fn => (x) => 1 / (x - r) - k / (x * x - r * r);
