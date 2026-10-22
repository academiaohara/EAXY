/** Aritmética de problemas: proporcionalidad, repartos, mezclas, móviles, porcentajes e interés. */

const r6 = (x: number) => Math.round(x * 1e6) / 1e6;

/** Número con coma, hasta `maxDec` decimales y sin ceros sobrantes; con miles agrupados si tiene 5+ cifras enteras. */
export function fmtEs(x: number, maxDec = 2): string {
  const v = Math.abs(x) < 1e-9 ? 0 : x;
  const [i = "0", f = ""] = r6(v).toFixed(maxDec).split(".");
  const sign = i.startsWith("-") ? "−" : "";
  const digits = i.replace("-", "");
  const grouped = digits.length >= 5 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : digits;
  const frac = f.replace(/0+$/, "");
  return `${sign}${grouped}${frac ? `,${frac}` : ""}`;
}

/** Regla de tres directa: `a → b` y `c → x`. */
export const directRule = (a: number, b: number, c: number) => r6((b * c) / a);
/** Regla de tres inversa: `a → b` y `c → x` con `a·b = c·x`. */
export const inverseRule = (a: number, b: number, c: number) => r6((a * b) / c);

export type Rel = "d" | "i";

/**
 * Proporcionalidad compuesta: de `known` (valores de las magnitudes dadas) y `result` se pasa a los
 * valores `next`; cada magnitud es directa (`d`) o inversa (`i`) respecto de la incógnita.
 */
export function compound(known: number[], result: number, next: number[], rels: Rel[]): number {
  let x = result;
  known.forEach((k, i) => {
    const ratio = next[i]! / k;
    x *= rels[i] === "d" ? ratio : 1 / ratio;
  });
  return r6(x);
}

/** Reparto proporcional de `total` según `values`: cantidades y fracciones. */
export function share(values: number[], total: number): { amounts: number[]; fractions: [number, number][] } {
  const s = values.reduce((a, b) => a + b, 0);
  const g = (a: number, b: number): number => (b === 0 ? Math.abs(a) : g(b, a % b));
  return {
    amounts: values.map((v) => r6((total * v) / s)),
    fractions: values.map((v) => {
      const d = g(v, s) || 1;
      return [v / d, s / d] as [number, number];
    }),
  };
}

/** Media ponderada: precio (o ley) de una mezcla. */
export function mixture(items: { qty: number; price: number }[]): { totalQty: number; totalCost: number; price: number } {
  const totalQty = items.reduce((a, b) => a + b.qty, 0);
  const totalCost = items.reduce((a, b) => a + b.qty * b.price, 0);
  return { totalQty, totalCost: r6(totalCost), price: r6(totalCost / totalQty) };
}

export type MoverMode = "opuesto" | "alcance";

/** Tiempo (h) y posición de encuentro o alcance. `d` es la distancia inicial; el segundo sale `delay` h más tarde (alcance). */
export function movers(mode: MoverMode, v1: number, v2: number, d: number, delay = 0): { t: number; x: number; ok: boolean } {
  if (mode === "opuesto") {
    const t = d / (v1 + v2);
    return { t: r6(t), x: r6(v1 * t), ok: true };
  }
  // alcance: el más lento (v1) sale primero; el rápido (v2) sale `delay` h después de la misma posición (d = ventaja inicial)
  if (v2 <= v1) return { t: Number.NaN, x: Number.NaN, ok: false };
  const lead = d + v1 * delay;
  const t = lead / (v2 - v1);
  return { t: r6(t), x: r6(v2 * t), ok: true };
}

/** Índice de variación de una sucesión de variaciones porcentuales (+/−). */
export function variationIndex(pcts: number[]): number {
  return r6(pcts.reduce((acc, p) => acc * (1 + p / 100), 1));
}

/** Interés simple `C·r·t/100`. */
export const simpleInterest = (c: number, rate: number, years: number) => r6((c * rate * years) / 100);

/** Horas → «h min». */
export function hm(hours: number): string {
  const total = Math.round(hours * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
}
