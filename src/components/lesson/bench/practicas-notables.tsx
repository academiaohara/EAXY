"use client";

import { angDe, clamp, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { INK, VERDE, type BenchBlock } from "./scenes";
import { MSHEET, MV, Practica, type Def, type Est } from "./scenes-compas";
import { PN_A, PN_B, PN_C, baricentro, circuncentro, incentro, ortocentro, pie } from "./scenes-poligonos";
import { Seg } from "./scenes-proporcion";
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
  fases: ["centro", "abertura", "arco", "centro", "arco", "trazo", "centro", "abertura", "arco", "centro", "arco", "trazo", "punto"],
  trazoFino: true,
  extTrazo: 70,
  papel: (est: Est) => (
    <g>
      <Triangulo />
      {est.fase >= 13 ? (
        <g data-testid="bench-circuncentro">
          <circle cx={CC_O[0]} cy={CC_O[1]} r={dist(CC_O, A)} fill="none" stroke={VERDE} strokeWidth="2.2" />
          <Marca p={CC_O} nombre="O" />
        </g>
      ) : null}
    </g>
  ),
  candidatos: (est, idx) => {
    const [P, Q] = CC_LADOS[Math.floor(idx / 2)];
    return idx % 2 === 0 ? [P, Q] : [dist(est.centros[idx - 1], P) < 1 ? Q : P];
  },
  radioLim: () => [40, 235],
  radioIni: () => 80,
  rhoIni: () => 35,
  arco: (_est, n, radio, c) => arcoPar(c, ...CC_LADOS[Math.floor(n / 2)], radio),
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
const defIncentro: Def = {
  scene: "incentro-practica",
  fases: [...Array.from({ length: 2 }, () => ["centro", "abertura", "arco", "centro", "abertura", "arco", "centro", "arco", "trazo"] as const).flat(), "punto"],
  trazoFino: true,
  extTrazo: 90,
  papel: (est: Est) => (
    <g>
      <Triangulo />
      {est.fase >= 19 ? (
        <g data-testid="bench-incentro">
          <circle cx={IN.p[0]} cy={IN.p[1]} r={IN.r} fill="none" stroke={VERDE} strokeWidth="2.2" />
          <Marca p={IN.p} nombre="I" />
        </g>
      ) : null}
    </g>
  ),
  candidatos: (est, i) => {
    const k = Math.floor(i / 3);
    const j = i % 3;
    if (j === 0) return [BIS[k].V];
    const pq = bisCortes(k, est.radios[2 * k]);
    if (!pq) return [];
    return j === 1 ? pq : [dist(est.centros[i - 1], pq[0]) < 1 ? pq[1] : pq[0]];
  },
  radioLim: (a) => (a % 2 === 0 ? [40, 150] : [30, 235]),
  radioIni: () => 80,
  rhoIni: (n) => (n % 3 === 0 ? -8 : 35),
  arco: (est, n, radio, c) => {
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
  radioLim: () => [40, 235],
  radioIni: () => 80,
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

/* ───────────── Alturas → ortocentro ───────────── */

const ALT = [{ V: C, L: [A, B] as [Pt, Pt] }, { V: B, L: [A, C] as [Pt, Pt] }];
const altPie = (k: number) => pie(ALT[k].V, ...ALT[k].L);
const altH = (k: number) => dist(ALT[k].V, altPie(k));
const altCortes = (k: number, r1: number | undefined): [Pt, Pt] | null => {
  if (r1 === undefined || r1 <= altH(k)) return null;
  const F = altPie(k);
  const [P0, Q0] = ALT[k].L;
  const u: Pt = [(Q0[0] - P0[0]) / dist(P0, Q0), (Q0[1] - P0[1]) / dist(P0, Q0)];
  const d = Math.sqrt(r1 * r1 - altH(k) ** 2);
  return [[F[0] - u[0] * d, F[1] - u[1] * d], [F[0] + u[0] * d, F[1] + u[1] * d]];
};
const altT = (k: number, est: Est): Pt[] => {
  const pq = altCortes(k, est.radios[2 * k]);
  return pq ? cortesPar(pq[0], pq[1], est.radios[2 * k + 1]) : [];
};
const ORTO = ortocentro(A, B, C);
/** Prolongación de un lado (trazo fino) para que los cortes del arco caigan siempre sobre una recta visible. */
const Prolongacion = ({ lado }: { lado: [Pt, Pt] }) => {
  const d = dist(lado[0], lado[1]);
  const u: Pt = [(lado[1][0] - lado[0][0]) / d, (lado[1][1] - lado[0][1]) / d];
  return <Seg a={[lado[0][0] - u[0] * 70, lado[0][1] - u[1] * 70]} b={[lado[1][0] + u[0] * 70, lado[1][1] + u[1] * 70]} color="#6b7480" w={1} dash="2 5" />;
};
const defOrtocentro: Def = {
  scene: "ortocentro-practica",
  fases: [...Array.from({ length: 2 }, () => ["centro", "abertura", "arco", "centro", "abertura", "arco", "centro", "arco", "trazo"] as const).flat(), "punto"],
  trazoFino: true,
  extTrazo: 90,
  papel: (est: Est) => (
    <g>
      <Prolongacion lado={ALT[0].L} />
      <Prolongacion lado={ALT[1].L} />
      <Triangulo />
      {est.fase >= 19 ? <Marca p={ORTO} nombre="H" /> : null}
    </g>
  ),
  candidatos: (est, i) => {
    const k = Math.floor(i / 3);
    const j = i % 3;
    if (j === 0) return [ALT[k].V];
    const pq = altCortes(k, est.radios[2 * k]);
    if (!pq) return [];
    return j === 1 ? pq : [dist(est.centros[i - 1], pq[0]) < 1 ? pq[1] : pq[0]];
  },
  radioLim: (a) => (a % 2 === 0 ? [altH(Math.floor(a / 2)) + 14, 215] : [30, 235]),
  radioIni: (a) => (a % 2 === 0 ? altH(Math.floor(a / 2)) + 30 : 80),
  rhoIni: (n) => (n % 3 === 0 ? -50 : 35),
  arco: (est, n, radio, c) => {
    const k = Math.floor(n / 3);
    if (n % 3 === 0) {
      const th = grados(Math.acos(clamp(altH(k) / radio, 0, 1)));
      return { centro: c, base: angDe(ALT[k].V, altPie(k)), signo: 1, rhoMin: -70, rhoMax: 70, req: [-(th + 3), th + 3] };
    }
    const pq = altCortes(k, est.radios[2 * k]) ?? [c, c];
    return arcoPar(c, pq[0], pq[1], radio);
  },
  validarAbertura: (est, a, r) => {
    if (a % 2 === 0) return r <= altH(Math.floor(a / 2)) + 4 ? "Con esa abertura el arco no llegaría a cortar al lado opuesto: debe ser mayor que la distancia del vértice a ese lado." : null;
    const pq = altCortes((a - 1) / 2, est.radios[a - 1]);
    return pq && r <= dist(pq[0], pq[1]) / 2 + 4 ? mensajeMitad : null;
  },
  cortes: (est) => (est.fase === 8 ? [ALT[0].V, ...altT(0, est)] : est.fase === 17 ? [ALT[1].V, ...altT(1, est)] : [ORTO]),
  ocultarArcos: (est) => [...(est.fase >= 9 ? [0, 1, 2] : []), ...(est.fase >= 18 ? [3, 4, 5] : [])],
  evaluar: () => ({ ok: true, mensaje: "Correcto: las alturas se cortan en el ortocentro H. En un triángulo acutángulo queda dentro del triángulo." }),
};
export function OrtocentroPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defOrtocentro} vista={vista} />;
}

