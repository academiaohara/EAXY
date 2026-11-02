"use client";

import { angDe, clamp, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { INK, VERDE, type BenchBlock } from "./scenes";
import { MSHEET, MV, Practica, type Def, type Est } from "./scenes-compas";
import { PN_A, PN_B, PN_C, baricentro, circuncentro, incentro, ortocentro, pie } from "./scenes-poligonos";
import { Dot } from "./scenes-teoria";
import { Punto } from "./scenes-trazados";
import { poligono } from "./scenes-transformaciones";

/**
 * Prácticas de las rectas notables del triángulo (mediatrices, bisectrices, medianas y alturas), una por cada recta.
 * En todas se sigue el mismo orden: se traza la primera recta con sus arcos, se **retiran las líneas auxiliares** y
 * queda solo la recta; se traza la segunda del mismo modo y, por último, se marca el punto donde se cortan.
 * Las rectas auxiliares van finas (como un lápiz 2H); el triángulo, más grueso.
 */
const vista = { ...MV, sheet: MSHEET };
const A = PN_A;
const B = PN_B;
const C = PN_C;
const grados = (rad: number) => (rad * 180) / Math.PI;
const norm180 = (a: number) => {
  const d = ((((a + 180) % 360) + 360) % 360) - 180;
  return d === -180 ? 180 : d;
};

/** Ángulo (°) que abarca el arco de radio `radio` desde un extremo hasta cortar la mediatriz de un segmento de `largo`. */
const thArco = (largo: number, radio: number) => (radio > largo / 2 ? grados(Math.acos(clamp(largo / (2 * radio), 0, 1))) : 0);

/** Arco con centro en un extremo de `P`–`Q`: tiene que pasar por los dos cortes con el arco del otro extremo. */
export function arcoPar(c: Pt, P: Pt, Q: Pt, radio: number) {
  const otro = dist(c, P) < 1 ? Q : P;
  const t = Math.max(thArco(dist(P, Q), radio), 20) + 6;
  return { centro: c, base: angDe(c, otro), signo: 1 as const, rhoMin: -100, rhoMax: 100, req: [-t, t] as [number, number] };
}

/** Puntos donde se cortan los arcos de radio `r` con centros en `P` y en `Q` (ninguno si no llegan a cortarse). */
export function cortesPar(P: Pt, Q: Pt, r: number | undefined): Pt[] {
  return r !== undefined && r > dist(P, Q) / 2 + 0.5 ? (interseccionCirculos(P, r, Q, r) as [Pt, Pt]) : [];
}

/**
 * Mayor radio con el que los arcos desde los extremos de `P`–`Q` siguen cortándose dentro de la hoja (así los cortes se
 * pueden tocar) y que cabe en el compás.
 */
export function rMaxCortes(P: Pt, Q: Pt): number {
  const M = puntoMedio(P, Q);
  const d = dist(P, Q);
  const n: Pt = [-(Q[1] - P[1]) / d, (Q[0] - P[0]) / d];
  const lim: [number, number][] = [[40, 580], [30, 345]];
  let h = Infinity;
  for (const sg of [1, -1]) {
    for (let i = 0; i < 2; i += 1) {
      const c = n[i] * sg;
      if (c > 1e-6) h = Math.min(h, (lim[i][1] - M[i]) / c);
      else if (c < -1e-6) h = Math.min(h, (lim[i][0] - M[i]) / c);
    }
  }
  return Math.min(190, Math.sqrt(Math.max(0, h) ** 2 + (d / 2) ** 2));
}

const mensajeMitad = "Con esa abertura los arcos no llegarían a cortarse: debe ser mayor que la mitad del segmento. Ábrela más y vuelve a fijarla.";

function Triangulo({ nombres = true }: { nombres?: boolean }) {
  return (
    <g>
      <path d={poligono([A, B, C])} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {nombres ? (
        <>
          <Punto p={A} nombre="A" dx={-16} dy={18} />
          <Punto p={B} nombre="B" dx={8} dy={18} />
          <Punto p={C} nombre="C" dx={8} dy={-8} />
        </>
      ) : null}
    </g>
  );
}

const Marca = ({ p, nombre, color = VERDE, dx = 8, dy = -8 }: { p: Pt; nombre: string; color?: string; dx?: number; dy?: number }) => (
  <g>
    <Dot p={p} color={color} r={4.2} />
    <Punto p={p} nombre={nombre} dx={dx} dy={dy} color={color} />
  </g>
);

/* ───────────── Mediatrices → circuncentro ───────────── */

const CC_LADOS: [Pt, Pt][] = [[A, B], [A, C]];
const CC_O = circuncentro(A, B, C);
const defCircuncentro: Def = {
  scene: "circuncentro-practica",
  fases: ["centro", "abertura", "arco", "centro", "arco", "trazo", "centro", "abertura", "arco", "centro", "arco", "trazo", "punto", "medida", "centro", "arco"],
  trazoFino: true,
  extTrazo: 70,
  principales: [4],
  papel: (est: Est) => (
    <g>
      <Triangulo />
      {est.fase >= 13 ? <Marca p={CC_O} nombre="O" /> : null}
      {est.fase >= 16 ? (
        <g data-testid="bench-circuncentro">
          <circle cx={CC_O[0]} cy={CC_O[1]} r={dist(CC_O, A)} fill="none" stroke={VERDE} strokeWidth="2.4" />
        </g>
      ) : null}
    </g>
  ),
  candidatos: (est, idx) => {
    if (idx >= 4) return [CC_O];
    const [P, Q] = CC_LADOS[Math.floor(idx / 2)];
    return idx % 2 === 0 ? [P, Q] : [dist(est.centros[idx - 1], P) < 1 ? Q : P];
  },
  medibles: () => [CC_O, A],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: (a) => (a < 2 ? [dist(...CC_LADOS[a]) / 2 + 12, rMaxCortes(...CC_LADOS[a])] : [40, 190]),
  radioIni: (a) => (a < 2 ? dist(...CC_LADOS[a]) / 2 + 20 : 80),
  rhoIni: (n) => (n === 4 ? -175 : 35),
  arco: (_est, n, radio, c) => (n === 4 ? { centro: c, base: 0, signo: 1, rhoMin: -180, rhoMax: 180, req: [-170, 170] } : arcoPar(c, ...CC_LADOS[Math.floor(n / 2)], radio)),
  validarAbertura: (_est, a, r) => (r <= dist(...CC_LADOS[a]) / 2 + 4 ? mensajeMitad : null),
  cortes: (est) => (est.fase === 5 ? cortesPar(...CC_LADOS[0], est.radios[0]) : est.fase === 11 ? cortesPar(...CC_LADOS[1], est.radios[1]) : [CC_O]),
  ocultarArcos: (est) => [...(est.fase >= 6 ? [0, 1] : []), ...(est.fase >= 12 ? [2, 3] : [])],
  evaluar: () => ({ ok: true, mensaje: "Correcto: las mediatrices se cortan en el circuncentro O, que equidista de A, B y C. Es el centro de la circunferencia circunscrita." }),
};
export function CircuncentroPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defCircuncentro} vista={vista} />;
}

/* ───────────── Bisectrices → incentro ───────────── */

const BIS = [{ V: A, S: [B, C] as [Pt, Pt] }, { V: B, S: [A, C] as [Pt, Pt] }];
const bisCortes = (k: number, r1: number | undefined): [Pt, Pt] | null => {
  if (r1 === undefined) return null;
  const { V, S } = BIS[k];
  return [enCirculo(V, r1, angDe(V, S[0])), enCirculo(V, r1, angDe(V, S[1]))];
};
/** Cortes de los arcos con centros en P y Q: los dos están en la bisectriz. */
const bisT = (k: number, est: Est): Pt[] => {
  const pq = bisCortes(k, est.radios[2 * k]);
  return pq ? cortesPar(pq[0], pq[1], est.radios[2 * k + 1]) : [];
};
const IN = incentro(A, B, C);
/** Punto de tangencia de la circunferencia inscrita con el lado AB: pie de la perpendicular desde I. */
const IN_T = pie(IN.p, A, B);
const defIncentro: Def = {
  scene: "incentro-practica",
  fases: [...Array.from({ length: 2 }, () => ["centro", "abertura", "arco", "centro", "abertura", "arco", "centro", "arco", "trazo"] as const).flat(), "punto", "perpendicular", "medida", "centro", "arco"],
  trazoFino: true,
  extTrazo: 90,
  principales: [6],
  perpendicular: () => ({ recta: [A, B], punto: IN.p, traza: [IN.p, IN_T] }),
  papel: (est: Est) => (
    <g>
      <Triangulo />
      {est.fase >= 19 ? <Marca p={IN.p} nombre="I" /> : null}
      {est.fase >= 20 ? <Marca p={IN_T} nombre="T" color="#1f78b4" dx={6} dy={18} /> : null}
      {est.fase >= 23 ? (
        <g data-testid="bench-incentro">
          <circle cx={IN.p[0]} cy={IN.p[1]} r={IN.r} fill="none" stroke={VERDE} strokeWidth="2.4" />
        </g>
      ) : null}
    </g>
  ),
  medibles: () => [IN.p, IN_T],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  candidatos: (est, i) => {
    if (i >= 6) return [IN.p];
    const k = Math.floor(i / 3);
    const j = i % 3;
    if (j === 0) return [BIS[k].V];
    const pq = bisCortes(k, est.radios[2 * k]);
    if (!pq) return [];
    return j === 1 ? pq : [dist(est.centros[i - 1], pq[0]) < 1 ? pq[1] : pq[0]];
  },
  radioLim: (a) => (a % 2 === 0 ? [40, 150] : [30, 170]),
  radioIni: () => 80,
  rhoIni: (n) => (n === 6 ? -175 : n % 3 === 0 ? -8 : 35),
  arco: (est, n, radio, c) => {
    if (n === 6) return { centro: c, base: 0, signo: 1, rhoMin: -180, rhoMax: 180, req: [-170, 170] };
    const k = Math.floor(n / 3);
    const { V, S } = BIS[k];
    if (n % 3 === 0) {
      const base = angDe(V, S[0]);
      const alfa = norm180(angDe(V, S[1]) - base);
      return { centro: c, base, signo: alfa >= 0 ? 1 : -1, rhoMin: -12, rhoMax: Math.abs(alfa) + 12, req: [-3, Math.abs(alfa) + 3] };
    }
    const pq = bisCortes(k, est.radios[2 * k]) ?? [c, c];
    return arcoPar(c, pq[0], pq[1], radio);
  },
  validarAbertura: (est, a, r) => {
    if (a % 2 === 0) return null;
    const pq = bisCortes((a - 1) / 2, est.radios[a - 1]);
    return pq && r <= dist(pq[0], pq[1]) / 2 + 4 ? mensajeMitad : null;
  },
  cortes: (est) => (est.fase === 8 ? [BIS[0].V, ...bisT(0, est)] : est.fase === 17 ? [BIS[1].V, ...bisT(1, est)] : [IN.p]),
  ocultarArcos: (est) => [...(est.fase >= 9 ? [0, 1, 2] : []), ...(est.fase >= 18 ? [3, 4, 5] : [])],
  evaluar: () => ({ ok: true, mensaje: "Correcto: las bisectrices se cortan en el incentro I, que equidista de los tres lados. Es el centro de la circunferencia inscrita." }),
};
export function IncentroPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defIncentro} vista={vista} />;
}

/* ───────────── Medianas → baricentro ───────────── */

const MED = [{ V: A, L: [B, C] as [Pt, Pt] }, { V: B, L: [A, C] as [Pt, Pt] }];
const MEDIOS: Pt[] = MED.map((m) => puntoMedio(m.L[0], m.L[1]));
const G = baricentro(A, B, C);
const defBaricentro: Def = {
  scene: "baricentro-practica",
  fases: [...Array.from({ length: 2 }, () => ["centro", "abertura", "arco", "centro", "arco", "trazo", "punto", "trazo"] as const).flat(), "punto"],
  trazoFino: true,
  extTrazo: 0,
  papel: (est: Est) => (
    <g>
      <Triangulo />
      {est.fase >= 7 ? <Marca p={MEDIOS[0]} nombre="M" color="#1f78b4" dx={8} dy={4} /> : null}
      {est.fase >= 15 ? <Marca p={MEDIOS[1]} nombre="N" color="#1f78b4" dx={-18} dy={-4} /> : null}
      {est.fase >= 17 ? <Marca p={G} nombre="G" dx={8} dy={16} /> : null}
    </g>
  ),
  candidatos: (est, i) => {
    const [P, Q] = MED[Math.floor(i / 2)].L;
    return i % 2 === 0 ? [P, Q] : [dist(est.centros[i - 1], P) < 1 ? Q : P];
  },
  radioLim: (a) => [dist(...MED[a].L) / 2 + 12, rMaxCortes(...MED[a].L)],
  radioIni: (a) => dist(...MED[a].L) / 2 + 20,
  rhoIni: () => 35,
  arco: (_est, n, radio, c) => arcoPar(c, ...MED[Math.floor(n / 2)].L, radio),
  validarAbertura: (_est, a, r) => (r <= dist(...MED[a].L) / 2 + 4 ? mensajeMitad : null),
  cortes: (est) => {
    switch (est.fase) {
      case 5: return cortesPar(...MED[0].L, est.radios[0]);
      case 6: return [MEDIOS[0]];
      case 7: return [MED[0].V, MEDIOS[0]];
      case 13: return cortesPar(...MED[1].L, est.radios[1]);
      case 14: return [MEDIOS[1]];
      case 15: return [MED[1].V, MEDIOS[1]];
      default: return [G];
    }
  },
  ocultarArcos: (est) => [...(est.fase >= 7 ? [0, 1] : []), ...(est.fase >= 15 ? [2, 3] : [])],
  ocultarTrazos: (est) => [...(est.fase >= 7 ? [0] : []), ...(est.fase >= 15 ? [2] : [])],
  evaluar: () => ({ ok: true, mensaje: "Correcto: las medianas se cortan en el baricentro G, el centro de gravedad del triángulo, que divide cada mediana en razón 2 : 1." }),
};
export function BaricentroPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defBaricentro} vista={vista} />;
}

/* ───────────── Alturas → ortocentro (con escuadra y cartabón) ───────────── */

const ALT = [{ V: C, L: [A, B] as [Pt, Pt] }, { V: B, L: [A, C] as [Pt, Pt] }];
const ORTO = ortocentro(A, B, C);
/** Recta de la altura: del vértice al pie, un poco más allá para que se vea cortar al lado. */
const altTraza = (k: number): [Pt, Pt] => {
  const { V, L } = ALT[k];
  const F = pie(V, ...L);
  return [V, [F[0] + (F[0] - V[0]) * 0.12, F[1] + (F[1] - V[1]) * 0.12]];
};
const defOrtocentro: Def = {
  scene: "ortocentro-practica",
  fases: ["perpendicular", "perpendicular", "punto"],
  trazoFino: true,
  extTrazo: 0,
  perpendicular: (est) => {
    const k = est.fase === 0 ? 0 : 1;
    return { recta: ALT[k].L, punto: ALT[k].V, traza: altTraza(k) };
  },
  papel: (est: Est) => (
    <g>
      <Triangulo />
      {est.fase >= 3 ? <Marca p={ORTO} nombre="H" /> : null}
    </g>
  ),
  candidatos: () => [],
  radioLim: () => [40, 190],
  radioIni: () => 80,
  rhoIni: () => 0,
  arco: (_est, _n, _r, c) => ({ centro: c, base: 0, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [ORTO],
  evaluar: () => ({ ok: true, mensaje: "Correcto: las alturas se cortan en el ortocentro H. En un triángulo acutángulo queda dentro del triángulo." }),
};
export function OrtocentroPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defOrtocentro} vista={vista} />;
}
