/** Números complejos para las animaciones y herramientas de 1.º de Bachillerato. */

import { fmtEs } from "@/components/lesson/anim/arith";

const r6 = (x: number) => Math.round(x * 1e6) / 1e6;

export type Cx = { x: number; y: number };

export const modulus = (z: Cx) => Math.hypot(z.x, z.y);

/** Argumento principal en grados, en el intervalo (−180, 180]. El argumento de 0 se toma 0. */
export function argDeg(z: Cx): number {
  if (Math.abs(z.x) < 1e-9 && Math.abs(z.y) < 1e-9) return 0;
  const d = (Math.atan2(z.y, z.x) * 180) / Math.PI;
  return r6(d <= -180 + 1e-9 ? 180 : d);
}

export const fromPolar = (r: number, deg: number): Cx => ({
  x: r6(r * Math.cos((deg * Math.PI) / 180)),
  y: r6(r * Math.sin((deg * Math.PI) / 180)),
});

export const add = (a: Cx, b: Cx): Cx => ({ x: r6(a.x + b.x), y: r6(a.y + b.y) });
export const sub = (a: Cx, b: Cx): Cx => ({ x: r6(a.x - b.x), y: r6(a.y - b.y) });
export const mul = (a: Cx, b: Cx): Cx => ({ x: r6(a.x * b.x - a.y * b.y), y: r6(a.x * b.y + a.y * b.x) });
export const conj = (a: Cx): Cx => ({ x: a.x, y: r6(-a.y) });

/** Cociente; `null` si el divisor es 0. */
export function div(a: Cx, b: Cx): Cx | null {
  const d = b.x * b.x + b.y * b.y;
  if (d < 1e-12) return null;
  return { x: r6((a.x * b.x + a.y * b.y) / d), y: r6((a.y * b.x - a.x * b.y) / d) };
}

/** Normaliza un ángulo en grados al intervalo (−180, 180]. */
export function wrapDeg(d: number): number {
  let v = ((d % 360) + 360) % 360;
  if (v > 180) v -= 360;
  return r6(v);
}

/** `a + bi` en texto plano (signo menos tipográfico, sin 1 delante de i). */
export function binomText(z: Cx, dec = 2): string {
  const x = fmtEs(z.x, dec);
  const yAbs = Math.abs(z.y);
  const iCoef = Math.abs(yAbs - 1) < 1e-9 ? "" : fmtEs(yAbs, dec);
  const xZero = Math.abs(z.x) < 1e-9;
  const yZero = yAbs < 1e-9;
  if (yZero) return x;
  const imag = `${iCoef}i`;
  if (xZero) return `${z.y < 0 ? "−" : ""}${imag}`;
  return `${x} ${z.y < 0 ? "−" : "+"} ${imag}`;
}

/** `a + bi` en LaTeX. */
export function binomTex(z: Cx, dec = 2): string {
  return binomText(z, dec).replace(/−/g, "-").replace(/,/g, "{,}");
}

/** Grados con coma decimal y símbolo. */
export const degText = (d: number) => `${fmtEs(d, 1)}°`;
