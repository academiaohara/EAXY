/** Funciones de ejemplo y análisis numérico (dominio, recorrido, crecimiento, extremos). */

export type FnDef = { id: string; tex: string; name: string; xVar: string; f: (x: number) => number; a: number; b: number };

export const FUNCS: FnDef[] = [
  { id: "cubica", tex: "y = x^3 - 3x + 2", name: "y = x³ − 3x + 2", xVar: "x", f: (x) => x ** 3 - 3 * x + 2, a: -2, b: 3 },
  { id: "parabola", tex: "y = x^2 - 4x", name: "y = x² − 4x", xVar: "x", f: (x) => x * x - 4 * x, a: -2, b: 6 },
  { id: "cubica2", tex: "y = x^3 - 12x", name: "y = x³ − 12x", xVar: "x", f: (x) => x ** 3 - 12 * x, a: -4, b: 4 },
  { id: "sueldo", tex: "S = (2100 + 25x)\\cdot 0{,}85", name: "S = (2100 + 25x)·0,85", xVar: "x", f: (x) => (2100 + 25 * x) * 0.85, a: 0, b: 10 },
  { id: "bola", tex: "e = 0{,}1\\,t^2", name: "e = 0,1·t²", xVar: "t", f: (t) => 0.1 * t * t, a: 0, b: 10 },
  { id: "muelle", tex: "y = 30 + 15x", name: "y = 30 + 15x", xVar: "x", f: (x) => 30 + 15 * x, a: 0, b: 6 },
  { id: "fontanero", tex: "y = 18 + 15t", name: "y = 18 + 15t", xVar: "t", f: (t) => 18 + 15 * t, a: 0, b: 6 },
];

export type Extremo = { x: number; y: number; tipo: "max" | "min" };
export type Tramo = { from: number; to: number; dir: "crece" | "decrece" | "constante" };
export type Analisis = { ymin: number; ymax: number; extremos: Extremo[]; tramos: Tramo[] };

const r2 = (v: number) => Math.round(v * 100) / 100;

/** Análisis por muestreo fino en [a, b]. Los extremos relativos son los cambios de crecimiento interiores. */
export function analyze(f: (x: number) => number, a: number, b: number, n = 20000): Analisis {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    xs.push(x);
    ys.push(f(x));
  }
  const dir = (i: number) => {
    const d = ys[i + 1] - ys[i];
    return Math.abs(d) < 1e-12 ? 0 : d > 0 ? 1 : -1;
  };
  const extremos: Extremo[] = [];
  const cuts: number[] = [a];
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const d = dir(i);
    if (d === 0) continue;
    if (prev !== 0 && d !== prev) {
      extremos.push({ x: r2(xs[i]), y: r2(ys[i]), tipo: prev > 0 ? "max" : "min" });
      cuts.push(xs[i]);
    }
    prev = d;
  }
  cuts.push(b);
  const tramos: Tramo[] = [];
  for (let k = 0; k + 1 < cuts.length; k++) {
    const mid = Math.min(n - 1, Math.max(0, Math.round(((cuts[k] + cuts[k + 1]) / 2 - a) / (b - a) * n)));
    const d = dir(Math.min(n - 1, mid));
    tramos.push({ from: r2(cuts[k]), to: r2(cuts[k + 1]), dir: d > 0 ? "crece" : d < 0 ? "decrece" : "constante" });
  }
  return { ymin: r2(Math.min(...ys)), ymax: r2(Math.max(...ys)), extremos, tramos };
}

/** Altura de un cestillo de noria (m) a los t segundos: mínimo 0, máximo 40 y periodo T. */
export const noria = (t: number, T: number): number => 20 - 20 * Math.cos((2 * Math.PI * t) / T);

/** Tres tarifas de aparcamiento a 2 €/h: por horas empezadas, exacta, y con entrada de 2 € + 1,6 €/h. */
export const tarifa = (modelo: 1 | 2 | 3, horas: number): number =>
  modelo === 1 ? 2 * Math.ceil(horas - 1e-9) : modelo === 2 ? 2 * horas : horas === 0 ? 0 : 2 + 1.6 * horas;
