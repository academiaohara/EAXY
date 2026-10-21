/**
 * Curva TTT (esquema) de un acero eutectoide. Eje X: log10(t / s); eje Y: temperatura (°C).
 * Los puntos reproducen la forma de la figura 4.6 del libro (no son datos de ensayo).
 */
export type Pt2 = readonly [number, number];

export const TTT_A1 = 723;
export const TTT_MS = 230;
export const TTT_MF = 100;
export const TTT_X_MIN = -1;
export const TTT_X_MAX = 6;
export const TTT_T_MAX = 800;

/** Inicio de la transformación a perlita (nariz hacia 540 °C). */
export const TTT_PS: readonly Pt2[] = [
  [5.4, 718],
  [4.4, 705],
  [3.2, 680],
  [2.2, 640],
  [1.4, 590],
  [0.8, 548],
  [0.55, 520],
];
/** Fin de la transformación a perlita. */
export const TTT_PF: readonly Pt2[] = [
  [5.9, 712],
  [5.0, 696],
  [4.0, 664],
  [3.0, 612],
  [2.1, 556],
  [1.6, 520],
];
/** Inicio de la transformación a bainita. */
export const TTT_BS: readonly Pt2[] = [
  [0.55, 520],
  [0.9, 460],
  [1.5, 390],
  [2.2, 320],
  [2.9, 260],
  [3.2, TTT_MS],
];
/** Fin de la transformación a bainita. */
export const TTT_BF: readonly Pt2[] = [
  [1.6, 520],
  [2.3, 450],
  [3.1, 370],
  [4.0, 300],
  [4.9, 250],
  [5.4, TTT_MS],
];

/** Enfriamiento: T(x) = 800 - (x + 1)·m, con `m` °C por década de tiempo; llega a 20 °C. */
export function coolingT(m: number, x: number): number {
  return TTT_T_MAX - (x + 1) * m;
}

export function coolingEndX(m: number): number {
  return Math.min(TTT_X_MAX, (TTT_T_MAX - 20) / m - 1);
}

function segCross(a: Pt2, b: Pt2, c: Pt2, d: Pt2): boolean {
  const o = (p: Pt2, q: Pt2, r: Pt2) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const d1 = o(a, b, c);
  const d2 = o(a, b, d);
  const d3 = o(c, d, a);
  const d4 = o(c, d, b);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

/** Temperatura a la que el enfriamiento corta una curva (o `null` si no la corta). */
export function crossingT(m: number, curve: readonly Pt2[]): number | null {
  const x1 = coolingEndX(m);
  const p0: Pt2 = [TTT_X_MIN, TTT_T_MAX];
  const p1: Pt2 = [x1, coolingT(m, x1)];
  for (let i = 1; i < curve.length; i += 1) {
    if (segCross(p0, p1, curve[i - 1]!, curve[i]!)) {
      const [xa, ya] = curve[i - 1]!;
      const [xb, yb] = curve[i]!;
      // Intersección entre la recta de enfriamiento y el tramo.
      const dx = xb - xa;
      const dy = yb - ya;
      const k = -m;
      const denom = dy - k * dx;
      const t = Math.abs(denom) < 1e-9 ? 0 : (coolingT(m, xa) - ya) / denom;
      return ya + dy * t;
    }
  }
  return null;
}

export type TttResult = {
  perlitaIni: number | null;
  perlitaFin: number | null;
  bainitaIni: number | null;
  bainitaFin: number | null;
  ms: boolean;
  mf: boolean;
  name: string;
  detail: string;
};

export function tttResult(m: number): TttResult {
  const perlitaIni = crossingT(m, TTT_PS);
  const perlitaFin = crossingT(m, TTT_PF);
  const bainitaIni = crossingT(m, TTT_BS);
  const bainitaFin = crossingT(m, TTT_BF);
  const x1 = coolingEndX(m);
  const endT = coolingT(m, x1);
  const ms = endT <= TTT_MS;
  const mf = endT <= TTT_MF;
  let name: string;
  let detail: string;
  if (perlitaIni !== null && perlitaFin !== null) {
    name = perlitaIni > 650 ? "Perlita gruesa" : "Perlita fina";
    detail = perlitaIni > 650 ? "Enfriamiento muy lento (recocido): transformación completa a perlita, blanda y dúctil." : "Transformación completa a perlita de láminas finas: más dura que la gruesa.";
  } else if (perlitaIni !== null) {
    name = "Perlita fina + bainita";
    detail = "El enfriamiento corta el inicio de la perlita y la transformación sigue hacia bainita antes de terminar.";
  } else if (bainitaIni !== null && bainitaFin !== null) {
    name = "Bainita";
    detail = "Se evita la perlita pero no la zona de bainita: estructura de agujas finas de ferrita y carburo.";
  } else if (bainitaIni !== null) {
    name = "Bainita + martensita";
    detail = "Empieza la transformación a bainita y, al pasar de $M_s$, el resto se hace martensita.";
  } else if (ms) {
    name = mf ? "Martensita (100 %)" : "Martensita + austenita retenida";
    detail = mf ? "El enfriamiento esquiva todas las curvas «S» y corta $M_s$ y $M_f$: toda la austenita pasa a martensita." : "Llega a $M_s$ pero no a $M_f$: queda austenita sin transformar.";
  } else {
    name = "Austenita";
    detail = "No se llega a enfriar lo suficiente: toda la estructura sigue siendo austenita.";
  }
  return { perlitaIni, perlitaFin, bainitaIni, bainitaFin, ms, mf, name, detail };
}
