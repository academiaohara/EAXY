/** Estadística (1.º de Bachillerato): tablas, parámetros, tablas de doble entrada y regresión. */

const r9 = (x: number) => Math.round(x * 1e9) / 1e9;

export const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
export const mean = (a: number[]) => sum(a) / a.length;
export const variance = (a: number[]) => {
  const m = mean(a);
  return sum(a.map((x) => (x - m) ** 2)) / a.length;
};
export const sd = (a: number[]) => Math.sqrt(variance(a));
/** Coeficiente de variación en %. */
export const cv = (a: number[]) => (mean(a) === 0 ? null : (sd(a) / Math.abs(mean(a))) * 100);

export const sorted = (a: number[]) => [...a].sort((x, y) => x - y);

/** Mediana: dato central, o media de los dos centrales si n es par. */
export function median(a: number[]): number {
  const s = sorted(a);
  const n = s.length;
  return n % 2 === 1 ? s[(n - 1) / 2]! : (s[n / 2 - 1]! + s[n / 2]!) / 2;
}

/** Percentil como en el libro: posición n·p/100; si no es entera, se toma la siguiente. */
export function percentile(a: number[], p: number): number {
  const s = sorted(a);
  const k = r9((s.length * p) / 100);
  return s[Math.max(1, Math.ceil(k)) - 1]!;
}

export const quartiles = (a: number[]) => ({ q1: percentile(a, 25), q2: median(a), q3: percentile(a, 75) });

export function modes(a: number[]): number[] {
  const c = new Map<number, number>();
  for (const x of a) c.set(x, (c.get(x) ?? 0) + 1);
  const mx = Math.max(...c.values());
  return [...c.entries()].filter(([, n]) => n === mx).map(([x]) => x).sort((p, q) => p - q);
}

/* ───────────── Tablas de frecuencias ───────────── */

export type FreqRow = { x: number; n: number; f: number; N: number; F: number };

export function freqTable(data: number[]): FreqRow[] {
  const xs = [...new Set(data)].sort((p, q) => p - q);
  let acc = 0;
  return xs.map((x) => {
    const n = data.filter((d) => d === x).length;
    acc += n;
    return { x, n, f: r9(n / data.length), N: acc, F: r9(acc / data.length) };
  });
}

export type ClassRow = { lo: number; hi: number; c: number; n: number; f: number; N: number; F: number };

/** Intervalos [lo, hi[ (el último cerrado) por sus fronteras. */
export function groupedTable(data: number[], edges: number[]): ClassRow[] {
  let acc = 0;
  return edges.slice(0, -1).map((lo, i) => {
    const hi = edges[i + 1]!;
    const last = i === edges.length - 2;
    const n = data.filter((d) => d >= lo && (last ? d <= hi : d < hi)).length;
    acc += n;
    return { lo, hi, c: (lo + hi) / 2, n, f: r9(n / data.length), N: acc, F: r9(acc / data.length) };
  });
}

/** Media a partir de una tabla (valores o marcas de clase con sus frecuencias). */
export const meanFromTable = (xs: number[], ns: number[]) => sum(xs.map((x, i) => x * ns[i]!)) / sum(ns);

/** Número de clases recomendado: √n si n < 50; Sturges para muestras mayores. */
export const numClasses = (n: number) => (n < 50 ? Math.round(Math.sqrt(n)) : Math.ceil(Math.log2(n) + 1));

export const sectorAngle = (n: number, total: number) => (n / total) * 360;

/* ───────────── Datos del libro ───────────── */

export const HIJOS = [2, 2, 2, 4, 1, 2, 4, 2, 3, 0, 2, 2, 2, 3, 2, 6, 2, 3, 2, 2, 3, 2, 3, 3, 4, 3, 3, 4, 5, 2, 1, 3, 2, 0, 3, 2, 1, 2, 3, 2, 2, 3, 1, 4, 2, 3, 2, 4, 3, 3];
export const HOTELES = [53, 39, 43, 50, 60, 47, 51, 50, 44, 57, 33, 39, 43, 50, 60, 47, 51, 42, 44, 58, 33, 43, 41, 58, 44, 38, 61, 43, 53, 45, 40, 54, 39, 47, 33, 45, 47, 42, 45, 48];
export const PESOS = [26.14, 28.6, 45.41, 48.95, 52.35, 52.44, 56.0, 56.74, 57.29, 57.79, 58.34, 59.44, 65.1, 65.85, 68.26, 68.34, 68.47, 69.24, 71.48, 74.82, 78.37, 81.43, 81.72, 81.84, 83.62, 86.62, 87.82, 91.93, 92.78, 96.97];
export const NOTAS_A = [4, 3, 5, 6, 4, 5, 5, 7, 5, 6];
export const NOTAS_B = [1, 4, 3, 5, 6, 8, 2, 7, 5, 9];

/* ───────────── Tablas de doble entrada ───────────── */

export type DoubleTable = { label: string; rows: string; cols: string; rowLabels: string[]; colLabels: string[]; counts: number[][] };

export const DOUBLES: DoubleTable[] = [
  {
    label: "Impresoras 3D",
    rows: "Modelo A vendidas",
    cols: "Modelo B vendidas",
    rowLabels: ["0", "1", "2", "3", "4"],
    colLabels: ["0", "1", "2", "3"],
    counts: [[0, 0, 1, 0], [0, 0, 0, 1], [0, 3, 5, 0], [0, 8, 4, 0], [1, 2, 0, 0]],
  },
  {
    label: "Tres fármacos",
    rows: "Evolución",
    cols: "Tratamiento",
    rowLabels: ["Mejora", "No mejora"],
    colLabels: ["A", "B", "C"],
    counts: [[23, 33, 35], [12, 7, 12]],
  },
  {
    label: "Terapia cognitiva",
    rows: "Enfermedad",
    cols: "Resultado",
    rowLabels: ["Parkinson senil", "Alzheimer", "Demencia vascular"],
    colLabels: ["Empeora", "Estable", "Mejora"],
    counts: [[34, 25, 17], [47, 18, 6], [50, 23, 2]],
  },
  {
    label: "Cabras y ovejas",
    rows: "Cabras (miles)",
    cols: "Ovejas (miles)",
    rowLabels: ["0", "1", "2", "3", "4"],
    colLabels: ["0", "1", "2", "3", "4"],
    counts: [[4, 6, 9, 4, 1], [5, 10, 7, 4, 2], [7, 8, 5, 3, 1], [5, 5, 3, 2, 1], [2, 3, 2, 1, 0]],
  },
];

export type JointStats = {
  n: number;
  rowTotals: number[];
  colTotals: number[];
  joint: number[][];
  fRow: number[];
  fCol: number[];
  /** Máxima diferencia |f_ij − f_i·f_j|. */
  maxDeviation: number;
  independent: boolean;
};

export function jointStats(counts: number[][]): JointStats | null {
  const n = sum(counts.map(sum));
  if (n <= 0) return null;
  const rowTotals = counts.map(sum);
  const colTotals = counts[0]!.map((_, j) => sum(counts.map((r) => r[j]!)));
  const joint = counts.map((r) => r.map((c) => c / n));
  const fRow = rowTotals.map((t) => t / n);
  const fCol = colTotals.map((t) => t / n);
  let maxDeviation = 0;
  for (let i = 0; i < counts.length; i += 1) for (let j = 0; j < colTotals.length; j += 1) maxDeviation = Math.max(maxDeviation, Math.abs(joint[i]![j]! - fRow[i]! * fCol[j]!));
  return { n, rowTotals, colTotals, joint, fRow, fCol, maxDeviation, independent: maxDeviation < 1e-9 };
}

/** Frecuencias relativas de la fila i (distribución de las columnas condicionada a esa fila). */
export const conditionalRow = (counts: number[][], i: number) => {
  const t = sum(counts[i]!);
  return t > 0 ? counts[i]!.map((c) => c / t) : null;
};

/** Frecuencias relativas de la columna j (distribución de las filas condicionada a esa columna). */
export const conditionalCol = (counts: number[][], j: number) => {
  const t = sum(counts.map((r) => r[j]!));
  return t > 0 ? counts.map((r) => r[j]! / t) : null;
};

/* ───────────── Covarianza, correlación y regresión ───────────── */

export const covariance = (x: number[], y: number[]) => {
  const mx = mean(x);
  const my = mean(y);
  return sum(x.map((v, i) => (v - mx) * (y[i]! - my))) / x.length;
};

export const correlation = (x: number[], y: number[]): number | null => {
  const d = sd(x) * sd(y);
  return d < 1e-12 ? null : covariance(x, y) / d;
};

export type Regression = { b: number; a: number; bPrime: number; aPrime: number };

export function regression(x: number[], y: number[]): Regression | null {
  const vx = variance(x);
  const vy = variance(y);
  if (vx < 1e-12 || vy < 1e-12) return null;
  const sxy = covariance(x, y);
  const b = sxy / vx;
  const bPrime = sxy / vy;
  return { b, a: mean(y) - b * mean(x), bPrime, aPrime: mean(x) - bPrime * mean(y) };
}

export type Dataset = { label: string; xName: string; yName: string; x: number[]; y: number[]; x0: number; note: string };

export const DATASETS: Dataset[] = [
  { label: "Renta y ahorro", xName: "Renta", yName: "Ahorro", x: [20.5, 20.8, 21.2, 21.7, 22.1, 22.3, 22.2, 22.6, 23.1, 23.5], y: [1.9, 1.8, 2.0, 2.1, 1.9, 2.0, 2.2, 2.3, 2.7, 3.0], x0: 24.1, note: "Diez años de renta y ahorro de las familias (millones de euros)." },
  { label: "Muelle", xName: "Peso (g)", yName: "Alargamiento (cm)", x: [0, 10, 30, 60, 90, 120, 150, 200, 250], y: [0, 0.5, 1, 3, 5, 6.5, 8, 10.2, 12.5], x0: 100, note: "Alargamientos de un muelle al colgar pesos." },
  { label: "Teoría y práctica", xName: "Teoría", yName: "Práctica", x: [5, 7, 6, 9, 3, 1, 2, 4, 6], y: [6, 5, 8, 6, 4, 2, 1, 3, 7], x0: 8, note: "Notas de nueve alumnos en la parte teórica y práctica." },
  { label: "Gérmenes", xName: "Horas", yName: "Gérmenes por cm³", x: [0, 1, 2, 3, 4, 5], y: [20, 26, 33, 41, 47, 53], x0: 6, note: "Gérmenes patógenos por cm³ según el tiempo (el último dato del libro está truncado: se toma 53)." },
  { label: "Depósito", xName: "Tiempo (h)", yName: "Altura (m)", x: [8, 22, 27, 33, 50], y: [17, 14, 12, 11, 6], x0: 40, note: "Altura del agua de un depósito que se vacía." },
  { label: "IPC e inflación", xName: "IPC", yName: "Tasa de inflación", x: [0.7, 1.1, 1.7, 2, 1.9, 1.9], y: [6, 6, 6.3, 6.2, 5.8, 4.9], x0: 1.5, note: "Seis meses de IPC y tasa de inflación: casi sin relación lineal." },
];

/** Secuencia pseudoaleatoria reproducible (LCG) en [−1, 1]. */
function lcg(seed: number, n: number): number[] {
  let s = seed;
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    out.push((s / 4294967296) * 2 - 1);
  }
  return out;
}

const standardize = (a: number[]) => {
  const m = mean(a);
  const s = sd(a);
  return a.map((v) => (v - m) / s);
};

/** Nube de n puntos con coeficiente de correlación exactamente r (|r| ≤ 1). */
export function syntheticCloud(r: number, n = 30): { x: number[]; y: number[] } {
  const z1 = standardize(lcg(7, n));
  const raw = lcg(23, n);
  const c = covariance(z1, raw);
  const z2 = standardize(raw.map((v, i) => v - c * z1[i]!));
  const k = Math.sqrt(Math.max(0, 1 - r * r));
  return { x: z1.map((v) => 5 + 2 * v), y: z1.map((v, i) => 5 + 2 * (r * v + k * z2[i]!)) };
}

export function correlationText(r: number | null): string {
  if (r === null) return "No se puede calcular (una variable no varía)";
  const a = Math.abs(r);
  const dir = r > 0 ? "positiva" : "negativa";
  if (a >= 0.9) return `Correlación ${dir} muy fuerte`;
  if (a >= 0.7) return `Correlación ${dir} fuerte`;
  if (a >= 0.4) return `Correlación ${dir} moderada`;
  if (a >= 0.1) return `Correlación ${dir} débil`;
  return "Prácticamente sin correlación lineal";
}
