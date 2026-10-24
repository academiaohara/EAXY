/** Trigonometría para las animaciones y herramientas de 1.º de Bachillerato. */

const DEG = Math.PI / 180;
const r9 = (x: number) => Math.round(x * 1e9) / 1e9;

export const toRad = (d: number) => d * DEG;
export const toDeg = (r: number) => r / DEG;

export const sinD = (d: number) => r9(Math.sin(toRad(d)));
export const cosD = (d: number) => r9(Math.cos(toRad(d)));
/** Tangente en grados; `null` donde no existe (90° + k·180°). */
export const tanD = (d: number): number | null => {
  const m = ((d % 180) + 180) % 180;
  return Math.abs(m - 90) < 1e-9 ? null : r9(Math.tan(toRad(d)));
};

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Ángulo en grados (entero) como fracción de π: 150° → «5π/6». */
export function piFrac(deg: number): string {
  if (deg === 0) return "0";
  const g = gcd(Math.round(deg), 180);
  const n = Math.round(deg) / g;
  const d = 180 / g;
  const sign = n < 0 ? "−" : "";
  const num = Math.abs(n) === 1 ? "" : String(Math.abs(n));
  return d === 1 ? `${sign}${num}π` : `${sign}${num}π/${d}`;
}

/** Ángulo reducido a [0, 360). */
export const norm360 = (d: number) => ((d % 360) + 360) % 360;

/** Cuadrante (1–4) de un ángulo; 0 si está sobre un eje. */
export function quadrant(d: number): 0 | 1 | 2 | 3 | 4 {
  const m = norm360(d);
  if (m % 90 === 0) return 0;
  return (Math.floor(m / 90) + 1) as 1 | 2 | 3 | 4;
}

/** Ángulo de referencia: el agudo que forma con el eje horizontal. */
export function reference(d: number): number {
  const m = norm360(d);
  if (m <= 90) return m;
  if (m <= 180) return 180 - m;
  if (m <= 270) return m - 180;
  return 360 - m;
}

const SIN_EXACT: Record<number, string> = { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1" };
const COS_EXACT: Record<number, string> = { 0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0" };
const TAN_EXACT: Record<number, string> = { 0: "0", 30: "√3/3", 45: "1", 60: "√3" };

/** Valor exacto de sen, cos o tg para múltiplos de 30° y 45°; `null` en otro caso. */
export function exactTrig(fn: "sen" | "cos" | "tg", d: number): string | null {
  if (!Number.isInteger(d)) return null;
  const ref = reference(d);
  if (!(ref in SIN_EXACT)) return null;
  const v = fn === "sen" ? sinD(d) : fn === "cos" ? cosD(d) : tanD(d);
  if (v === null) return null;
  const table = fn === "sen" ? SIN_EXACT : fn === "cos" ? COS_EXACT : TAN_EXACT;
  const base = table[ref];
  if (base === undefined) return null;
  if (base === "0") return "0";
  return v < 0 ? `−${base}` : base;
}

/** Soluciones en [0°, 360°) de sen x = a, cos x = a o tg x = a. */
export function solveTrigEq(fn: "sen" | "cos" | "tg", a: number): number[] {
  const out: number[] = [];
  const add = (d: number) => {
    const v = Math.round(norm360(d) * 1e6) / 1e6;
    if (!out.some((x) => Math.abs(x - v) < 1e-6)) out.push(v);
  };
  if (fn === "tg") {
    const x = toDeg(Math.atan(a));
    add(x);
    add(x + 180);
  } else {
    if (Math.abs(a) > 1 + 1e-12) return [];
    const c = Math.max(-1, Math.min(1, a));
    if (fn === "sen") {
      const x = toDeg(Math.asin(c));
      add(x);
      add(180 - x);
    } else {
      const x = toDeg(Math.acos(c));
      add(x);
      add(360 - x);
    }
  }
  return out.sort((p, q) => p - q);
}

export type Tri = { a: number; b: number; c: number; A: number; B: number; C: number; area: number };

const mk = (a: number, b: number, c: number, A: number, B: number, C: number): Tri => ({
  a, b, c, A, B, C, area: 0.5 * b * c * sinD(A),
});

/** Lado a conocidos b, c y el ángulo A que forman (teorema del coseno). */
export function solveSAS(b: number, c: number, A: number): Tri {
  const a = Math.sqrt(b * b + c * c - 2 * b * c * cosD(A));
  const B = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  return mk(a, b, c, A, B, 180 - A - B);
}

/** Tres lados; `null` si no cumplen la desigualdad triangular. */
export function solveSSS(a: number, b: number, c: number): Tri | null {
  if (a + b <= c || a + c <= b || b + c <= a) return null;
  const A = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
  const B = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  return mk(a, b, c, A, B, 180 - A - B);
}

/** Dos ángulos A y B y el lado a opuesto a A (teorema del seno); `null` si A + B ≥ 180°. */
export function solveAAS(A: number, B: number, a: number): Tri | null {
  if (A + B >= 180) return null;
  const C = 180 - A - B;
  const k = a / sinD(A);
  return mk(a, k * sinD(B), k * sinD(C), A, B, C);
}

/** Lados a y b y el ángulo A opuesto a a: 0, 1 o 2 soluciones (caso ambiguo). */
export function solveSSA(a: number, b: number, A: number): Tri[] {
  const s = (b * sinD(A)) / a;
  if (s > 1 + 1e-9) return [];
  const Bs = Math.abs(s - 1) < 1e-9 ? [90] : [toDeg(Math.asin(s)), 180 - toDeg(Math.asin(s))];
  const out: Tri[] = [];
  for (const B of Bs) {
    if (A + B >= 180 - 1e-9) continue;
    const C = 180 - A - B;
    out.push(mk(a, b, (a * sinD(C)) / sinD(A), A, B, C));
  }
  return out;
}
