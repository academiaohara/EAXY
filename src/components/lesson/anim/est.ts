/** Estadística: parámetros con tablas de frecuencias, agrupación en intervalos y cuartiles. */

export type Row = { x: number; f: number };

export type TableStats = { n: number; sumFx: number; sumFx2: number; mean: number; variance: number; sd: number; cv: number };

/** Parámetros de una tabla `xi, fi` (o marcas de clase): media, varianza como `Σfx²/N − x̄²`, desviación típica y C.V. */
export function tableStats(rows: Row[]): TableStats {
  const n = rows.reduce((a, r) => a + r.f, 0);
  const sumFx = rows.reduce((a, r) => a + r.f * r.x, 0);
  const sumFx2 = rows.reduce((a, r) => a + r.f * r.x * r.x, 0);
  if (n === 0) return { n, sumFx, sumFx2, mean: 0, variance: 0, sd: 0, cv: 0 };
  const mean = sumFx / n;
  const variance = Math.max(0, sumFx2 / n - mean * mean);
  const sd = Math.sqrt(variance);
  return { n, sumFx, sumFx2, mean, variance, sd, cv: mean === 0 ? 0 : sd / mean };
}

export type Interval = { from: number; to: number; mark: number; count: number };

/** Reparte datos en `k` intervalos de longitud `len` empezando en `start` (cada intervalo es `[from, to)`). */
export function groupData(data: number[], start: number, len: number, k: number): Interval[] {
  return Array.from({ length: k }, (_, i) => {
    const from = start + i * len;
    const to = from + len;
    return { from, to, mark: (from + to) / 2, count: data.filter((d) => d >= from && d < to).length };
  });
}

/** Longitud de intervalo: `r' / k`, con `r'` el menor múltiplo de `k` mayor que el recorrido. */
export function intervalLength(min: number, max: number, k: number): { range: number; rPrime: number; len: number } {
  const range = max - min;
  const rPrime = (Math.floor(range / k) + 1) * k;
  return { range, rPrime, len: rPrime / k };
}

/** Valor del cuantil `p` (0–1) de datos ordenados según el criterio del libro: posición `n·p`; entera → media de esa y la siguiente; si no, la siguiente entera. */
export function quantile(sorted: number[], p: number): number {
  const n = sorted.length;
  const pos = n * p;
  if (Number.isInteger(pos) || Math.abs(pos - Math.round(pos)) < 1e-9) {
    const k = Math.round(pos);
    return (sorted[k - 1]! + sorted[k]!) / 2;
  }
  return sorted[Math.ceil(pos) - 1]!;
}

export type BoxStats = { n: number; q1: number; me: number; q3: number; iqr: number; low: number; high: number; lowOut: number[]; highOut: number[]; whiskerLow: number; whiskerHigh: number };

/** Diagrama de caja: cuartiles y bigotes sin pasar de 1,5 veces la caja; el resto son atípicos (asterisco). */
export function boxStats(data: number[]): BoxStats {
  const sorted = [...data].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const me = quantile(sorted, 0.5);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const low = q1 - 1.5 * iqr;
  const high = q3 + 1.5 * iqr;
  const inside = sorted.filter((d) => d >= low && d <= high);
  return {
    n: sorted.length,
    q1,
    me,
    q3,
    iqr,
    low,
    high,
    lowOut: sorted.filter((d) => d < low),
    highOut: sorted.filter((d) => d > high),
    whiskerLow: inside[0]!,
    whiskerHigh: inside[inside.length - 1]!,
  };
}

/** Las 40 estaturas (cm) del ejercicio resuelto del libro. */
export const ESTATURAS_40 = [
  168, 160, 167, 175, 175, 167, 168, 158, 149, 160, 178, 166, 158, 163, 171, 162, 165, 163, 156, 174, 160, 165, 154, 163, 165, 161, 162, 166, 163, 159, 170, 165, 150, 167, 164, 165, 173, 164, 169, 170,
];

/** Las 40 estaturas ordenadas de la clase del problema resuelto 2 (con el 189). */
export const ESTATURAS_CAJA = [
  149, 150, 154, 156, 157, 158, 159, 160, 160, 160, 161, 162, 162, 163, 163, 163, 163, 164, 165, 166, 166, 166, 167, 167, 167, 168, 168, 168, 169, 169, 170, 170, 170, 171, 172, 173, 174, 175, 175, 189,
];
