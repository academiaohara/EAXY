/** Catálogos de funciones para las herramientas del tema de Funciones (1.º de Bachillerato). */

const r9 = (x: number) => Math.round(x * 1e9) / 1e9;
export type Fn = (x: number) => number;

/** Valor numérico real o `null` si no está definido (NaN o infinito). */
export const val = (f: Fn, x: number): number | null => {
  const y = f(x);
  return Number.isFinite(y) ? r9(y) : null;
};

/* ───────────── Simetría ───────────── */

export type Parity = "par" | "impar" | "ninguna";

export type SymFn = { label: string; f: Fn; parity: Parity; domainOk?: (x: number) => boolean };

export const SYM: SymFn[] = [
  { label: "f(x) = x²", f: (x) => x * x, parity: "par" },
  { label: "f(x) = x³", f: (x) => x ** 3, parity: "impar" },
  { label: "f(x) = |x|", f: Math.abs, parity: "par" },
  { label: "f(x) = x³ − x", f: (x) => x ** 3 - x, parity: "impar" },
  { label: "f(x) = x² + x", f: (x) => x * x + x, parity: "ninguna" },
  { label: "f(x) = cos x", f: Math.cos, parity: "par" },
  { label: "f(x) = sen x", f: Math.sin, parity: "impar" },
  { label: "f(x) = 1/x", f: (x) => 1 / x, parity: "impar", domainOk: (x) => x !== 0 },
  { label: "f(x) = eˣ", f: Math.exp, parity: "ninguna" },
  { label: "f(x) = x⁴ − 2x² + 3", f: (x) => x ** 4 - 2 * x * x + 3, parity: "par" },
];

/** Paridad por comprobación numérica en varios puntos (para verificar el catálogo). */
export function parityOf(f: Fn): Parity {
  let even = true;
  let odd = true;
  for (const x of [0.5, 1, 1.5, 2, 2.7, 3.1]) {
    const a = f(x);
    const b = f(-x);
    if (Math.abs(a - b) > 1e-9) even = false;
    if (Math.abs(a + b) > 1e-9) odd = false;
  }
  return even ? "par" : odd ? "impar" : "ninguna";
}

/* ───────────── Composición ───────────── */

export type CompFn = { label: string; tpl: (u: string) => string; f: Fn };

export const COMP: CompFn[] = [
  { label: "x + 2", tpl: (u) => `${u} + 2`, f: (x) => x + 2 },
  { label: "2x", tpl: (u) => `2·${u.includes(" ") ? `(${u})` : u}`, f: (x) => 2 * x },
  { label: "x²", tpl: (u) => `(${u})²`, f: (x) => x * x },
  { label: "√x", tpl: (u) => `√(${u})`, f: (x) => Math.sqrt(x) },
  { label: "1/x", tpl: (u) => `1/(${u})`, f: (x) => 1 / x },
  { label: "|x|", tpl: (u) => `|${u}|`, f: Math.abs },
];

/** Expresión de f(g(x)) por sustitución simbólica de plantillas. */
export const composeText = (f: CompFn, g: CompFn) => f.tpl(g.tpl("x"));

/** f(g(x)): `null` si g(x) o f(g(x)) no están definidos. */
export function compose(f: CompFn, g: CompFn, x: number): number | null {
  const u = val(g.f, x);
  return u === null ? null : val(f.f, u);
}

/* ───────────── Inversa ───────────── */

export type InvFn = {
  label: string;
  f: Fn;
  inv: Fn;
  invLabel: string;
  /** Dominio en el que se considera la función (si no es todo ℝ). */
  restr?: string;
  /** Si f no es inyectiva en todo su dominio (no tiene inversa sin restringir). */
  injective: boolean;
  domainOk?: (x: number) => boolean;
};

export const INV: InvFn[] = [
  { label: "f(x) = 2x + 3", f: (x) => 2 * x + 3, inv: (x) => (x - 3) / 2, invLabel: "f⁻¹(x) = (x − 3)/2", injective: true },
  { label: "f(x) = x³", f: (x) => x ** 3, inv: Math.cbrt, invLabel: "f⁻¹(x) = ∛x", injective: true },
  { label: "f(x) = x², x ≥ 0", f: (x) => x * x, inv: Math.sqrt, invLabel: "f⁻¹(x) = √x", restr: "x ≥ 0", injective: true, domainOk: (x) => x >= 0 },
  { label: "f(x) = eˣ", f: Math.exp, inv: Math.log, invLabel: "f⁻¹(x) = ln x", injective: true },
  { label: "f(x) = 1/x", f: (x) => 1 / x, inv: (x) => 1 / x, invLabel: "f⁻¹(x) = 1/x (ella misma)", injective: true, domainOk: (x) => x !== 0 },
  { label: "f(x) = x² (en todo ℝ)", f: (x) => x * x, inv: Math.sqrt, invLabel: "no es inyectiva: no tiene inversa", injective: false },
];

/** Comprueba numéricamente que inv deshace a f en puntos del dominio. */
export function inverseHolds(it: InvFn): boolean {
  if (!it.injective) return false;
  return [0.5, 1, 1.5, 2, 3].every((x) => (it.domainOk && !it.domainOk(x) ? true : Math.abs(it.inv(it.f(x)) - x) < 1e-9));
}

/* ───────────── Dominio ───────────── */

export type DomKind = "polinomica" | "racional" | "radical" | "logaritmica" | "raiz-cuadrado";

export type DomResult = { text: string; ok: (x: number) => boolean; f: Fn; formula: string };

const sg = (n: number) => (n < 0 ? `− ${-n}` : `+ ${n}`);
const num = (v: number) => String(v).replace("-", "−");

/**
 * Función de cada familia con parámetros p, q y su dominio:
 * polinómica `x² − p`, racional `(x + 1)/((x − p)(x − q))`, radical `√(x − p)` o `√(p − x)`,
 * logarítmica `ln(x − p)` y `√(x² − q)`.
 */
export function domainOf(kind: DomKind, p: number, q: number): DomResult {
  if (kind === "polinomica") return { text: "ℝ (todos los números reales)", ok: () => true, f: (x) => x * x - p, formula: `f(x) = x² ${sg(-p)}` };
  if (kind === "racional") {
    const pts = Array.from(new Set([p, q])).sort((a, b) => a - b);
    return {
      text: `ℝ − {${pts.map(num).join(", ")}}`,
      ok: (x) => !pts.includes(x),
      f: (x) => (x + 1) / ((x - p) * (x - q)),
      formula: `f(x) = (x + 1)/((x ${sg(-p)})(x ${sg(-q)}))`,
    };
  }
  if (kind === "radical") {
    const dir = q >= 0 ? 1 : -1;
    return dir === 1
      ? { text: `[${num(p)}, +∞)`, ok: (x) => x >= p, f: (x) => Math.sqrt(x - p), formula: `f(x) = √(x ${sg(-p)})` }
      : { text: `(−∞, ${num(p)}]`, ok: (x) => x <= p, f: (x) => Math.sqrt(p - x), formula: `f(x) = √(${num(p)} − x)` };
  }
  if (kind === "logaritmica") return { text: `(${num(p)}, +∞)`, ok: (x) => x > p, f: (x) => Math.log(x - p), formula: `f(x) = ln(x ${sg(-p)})` };
  const k = q;
  if (k <= 0) return { text: "ℝ (el radicando nunca es negativo)", ok: () => true, f: (x) => Math.sqrt(x * x - k), formula: `f(x) = √(x² ${sg(-k)})` };
  const r = Math.sqrt(k);
  const rt = Number.isInteger(r) ? String(r) : `√${k}`;
  return { text: `(−∞, −${rt}] ∪ [${rt}, +∞)`, ok: (x) => x * x >= k, f: (x) => Math.sqrt(x * x - k), formula: `f(x) = √(x² − ${k})` };
}
