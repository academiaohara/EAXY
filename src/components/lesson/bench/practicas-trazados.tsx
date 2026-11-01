"use client";

import { angDe, clamp, dist, enCirculo, interseccionCirculos, type Pt } from "./geometry";
import { AMBAR, AZUL, INK, VERDE, type BenchBlock } from "./scenes";
import { MSHEET, MV, Practica, type Def, type Est } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { Punto } from "./scenes-trazados";

const vista = { ...MV, sheet: MSHEET };
const grados = (rad: number) => (rad * 180) / Math.PI;
const Marca = ({ p, color = INK, r = 3 }: { p: Pt; color?: string; r?: number }) => <circle cx={p[0]} cy={p[1]} r={r} fill={color} />;

function Tira({ y, x0, len, nombre, extremos, color }: { y: number; x0: number; len: number; nombre: string; extremos: [string, string]; color: string }) {
  return (
    <g>
      <Seg a={[x0, y]} b={[x0 + len, y]} color={color} w={3} />
      <Marca p={[x0, y]} />
      <Marca p={[x0 + len, y]} />
      <Txt p={[x0 - 16, y + 4]}>{extremos[0]}</Txt>
      <Txt p={[x0 + len + 6, y + 4]}>{extremos[1]}</Txt>
      <Txt p={[x0 + len / 2 - 4, y - 8]} color={color}>{nombre}</Txt>
    </g>
  );
}

const ROJO = "#e5484d";

const arcoCorta = (base = 0, lim = 45, req = 8) => ({ base, signo: 1 as const, rhoMin: -lim, rhoMax: lim, req: [-req, req] as [number, number] });

/* ───────────── Transportar un segmento ───────────── */

const TS_A: Pt = [90, 90];
const TS_B: Pt = [250, 90];
const TS_C: Pt = [250, 250];
const TS_LEN = dist(TS_A, TS_B);
const TS_D: Pt = [TS_C[0] + TS_LEN, TS_C[1]];

const defTransporte: Def = {
  scene: "transporte-segmento-practica",
  fases: ["medida", "centro", "arco", "punto", "auto"],
  autoLados: () => [[TS_C, TS_D]],
  papel: (est: Est) => (
    <g>
      <Tira y={TS_A[1]} x0={TS_A[0]} len={TS_LEN} nombre="AB" extremos={["A", "B"]} color={AMBAR} />
      <Seg a={[150, TS_C[1]]} b={[560, TS_C[1]]} w={1.6} />
      <Punto p={TS_C} nombre="C" dx={-6} dy={20} />
      {est.fase >= 4 ? <Punto p={TS_D} nombre="D" dx={-4} dy={20} color={VERDE} /> : null}
      {est.fase >= 5 ? <Seg a={TS_C} b={TS_D} color={AMBAR} w={4.5} /> : null}
    </g>
  ),
  medibles: () => [TS_A, TS_B],
  candidatos: () => [TS_C],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni: () => -25,
  arco: (_est, _n, _r, c) => ({ centro: c, ...arcoCorta() }),
  cortes: () => [TS_D],
  evaluar: () => ({ ok: true, mensaje: "Correcto: CD = AB. El compás conserva la abertura, así que el segmento se transporta sin medirlo." }),
};

export function TransporteSegmentoPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defTransporte} vista={vista} />;
}

/* ───────────── Suma de segmentos ───────────── */

const SUMA_N: Pt = [60, 290];
const SUMA_TIRAS: { y: number; len: number; nombre: string; ext: [string, string]; color: string }[] = [
  { y: 60, len: 90, nombre: "a", ext: ["A", "B"], color: AMBAR },
  { y: 105, len: 60, nombre: "b", ext: ["C", "D"], color: AZUL },
  { y: 150, len: 110, nombre: "c", ext: ["E", "F"], color: VERDE },
];
const SUMA_PUNTOS: Pt[] = SUMA_TIRAS.reduce<Pt[]>((acc, t) => [...acc, [acc[acc.length - 1][0] + t.len, SUMA_N[1]]], [SUMA_N]);
const bloque = (fase: number) => Math.min(2, Math.floor(fase / 4));

const defSumaSegmentos: Def = {
  scene: "suma-segmentos-practica",
  fases: [...Array.from({ length: 3 }, () => ["medida", "centro", "arco", "punto"] as const).flat(), "auto"],
  autoLados: () => [[SUMA_N, SUMA_PUNTOS[3]]],
  papel: (est: Est) => {
    const hechos = Math.min(3, Math.floor(est.fase / 4));
    return (
      <g>
        {SUMA_TIRAS.map((t) => (
          <Tira key={t.nombre} y={t.y} x0={60} len={t.len} nombre={t.nombre} extremos={t.ext} color={t.color} />
        ))}
        <Seg a={[40, SUMA_N[1]]} b={[560, SUMA_N[1]]} w={1} dash="5 4" />
        <Punto p={SUMA_N} nombre="N" dx={-14} dy={22} />
        {SUMA_PUNTOS.slice(1, hechos + 1).map((q, i) => (
          <Marca key={i} p={q} color={SUMA_TIRAS[i].color} r={3.6} />
        ))}
        {est.fase >= 13 ? <Punto p={SUMA_PUNTOS[3]} nombre="M" dx={-4} dy={22} color={VERDE} /> : null}
        {est.fase >= 13 ? <Seg a={SUMA_N} b={SUMA_PUNTOS[3]} color={ROJO} w={5} /> : null}
      </g>
    );
  },
  medibles: (est) => {
    const t = SUMA_TIRAS[bloque(est.fase)];
    return [[60, t.y], [60 + t.len, t.y]];
  },
  candidatos: (_est, idx) => [SUMA_PUNTOS[idx]],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 80,
  rhoIni: () => -25,
  arco: (_est, _n, _r, c) => ({ centro: c, ...arcoCorta() }),
  cortes: (est) => [SUMA_PUNTOS[bloque(est.fase) + 1]],
  evaluar: () => ({ ok: true, mensaje: "Correcto: NM = a + b + c. Los tres segmentos están colocados sobre una recta, uno a continuación de otro." }),
};

export function SumaSegmentosPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defSumaSegmentos} vista={vista} />;
}

/* ───────────── Diferencia de segmentos ───────────── */

const DS_A: Pt = [90, 240];
const DS_M = 190;
const DS_N = 100;
const DS_B: Pt = [DS_A[0] + DS_M, 240];
const DS_E: Pt = [DS_B[0] - DS_N, 240];

const defDiferenciaSegmentos: Def = {
  scene: "diferencia-segmentos-practica",
  fases: ["medida", "centro", "arco", "punto", "auto"],
  autoLados: () => [[DS_A, DS_E]],
  papel: (est: Est) => (
    <g>
      <Tira y={70} x0={90} len={DS_M} nombre="m" extremos={["A", "B"]} color={AMBAR} />
      <Tira y={125} x0={90} len={DS_N} nombre="n" extremos={["C", "D"]} color={AZUL} />
      <Seg a={DS_A} b={DS_B} w={2.2} color={AMBAR} />
      <Punto p={DS_A} nombre="A" dx={-6} dy={22} />
      <Punto p={DS_B} nombre="B" dx={-4} dy={22} />
      {est.fase >= 4 ? <Punto p={DS_E} nombre="E" dx={-4} dy={22} color={AZUL} /> : null}
      {est.fase >= 5 ? <Seg a={DS_A} b={DS_E} color={ROJO} w={5} /> : null}
    </g>
  ),
  medibles: () => [[90, 125], [90 + DS_N, 125]],
  candidatos: () => [DS_B],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 80,
  rhoIni: () => -25,
  arco: (_est, _n, _r, c) => ({ centro: c, ...arcoCorta(180) }),
  cortes: () => [DS_E],
  evaluar: () => ({ ok: true, mensaje: "Correcto: AE = m − n. Se lleva n desde B hacia A y lo que queda desde A hasta el corte es la diferencia." }),
};

export function DiferenciaSegmentosPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defDiferenciaSegmentos} vista={vista} />;
}

/* ───────────── Paralela por un punto con el compás ───────────── */

const PP: Pt = [300, 150];
const PY = 300;
const geomPar = (r: number) => {
  const dx = Math.sqrt(Math.max(0, r * r - (PY - PP[1]) ** 2));
  const N: Pt = [PP[0] + dx, PY];
  const M: Pt = [N[0] - r, PY];
  const R: Pt = [PP[0] + r, PP[1]];
  return { N, M, R, tN: grados(Math.atan2(PY - PP[1], dx)) };
};

const defParalelo: Def = {
  scene: "paralelo-compas-practica",
  fases: ["centro", "abertura", "arco", "punto", "centro", "arco", "punto", "medida", "centro", "arco", "punto", "auto"],
  autoLados: (est) => [[PP, geomPar(est.radios[0] ?? 170).R]],
  papel: (est: Est) => {
    const g = geomPar(est.radios[0] ?? 170);
    return (
      <g>
        <Seg a={[60, PY]} b={[580, PY]} w={1.8} />
        <Txt p={[560, PY - 8]}>t</Txt>
        <Punto p={PP} nombre="P" dx={-18} dy={-8} />
        {est.fase >= 4 ? <Punto p={g.N} nombre="N" dx={-4} dy={20} color={AMBAR} /> : null}
        {est.fase >= 7 ? <Punto p={g.M} nombre="M" dx={-16} dy={20} color={AMBAR} /> : null}
        {est.fase >= 11 ? <Punto p={g.R} nombre="R" dx={6} dy={-6} color={VERDE} /> : null}
      </g>
    );
  },
  candidatos: (est, idx) => (idx === 0 ? [PP] : [geomPar(est.radios[0] ?? 170).N]),
  medibles: (est) => [geomPar(est.radios[0] ?? 170).M, PP],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [100, 200],
  radioIni: () => 175,
  rhoIni: () => 0,
  validarAbertura: (_est, _a, r) => (r <= PY - PP[1] + 4 ? "Con esa abertura el arco no llega a cortar a t: debe ser mayor que la distancia de P a la recta. Ábrela más y vuelve a fijarla." : null),
  arco: (est, n, radio, c) => {
    const g = geomPar(radio);
    if (n === 0) return { centro: c, base: -g.tN / 2, signo: 1, rhoMin: -70, rhoMax: 70, req: [-(g.tN / 2 + 4), g.tN / 2 + 4] };
    if (n === 1) return { centro: c, base: 180 - g.tN / 2, signo: 1, rhoMin: -70, rhoMax: 70, req: [-(g.tN / 2 + 4), g.tN / 2 + 4] };
    return { centro: c, base: angDe(g.N, g.R), signo: 1, rhoMin: -30, rhoMax: 30, req: [-8, 8] };
  },
  cortes: (est) => {
    const g = geomPar(est.radios[0] ?? 170);
    return est.fase === 3 ? [g.N] : est.fase === 6 ? [g.M] : [g.R];
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: PR = NM y PM = NR forman un paralelogramo, así que la recta PR es paralela a t por P." }),
};

export function ParaleloCompasPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defParalelo} vista={vista} />;
}

/* ───────────── Perpendicular a una recta por un punto (de ella o exterior) ───────────── */

const QP: Pt = [320, 200];
const QE: Pt = [330, 60];
const QE_Y = 210;

/**
 * Perpendicular a una recta por un punto `P`: arco con centro en `P` que corta a la recta en A y B y mediatriz de AB.
 * Si `P` está sobre la recta (`h = 0`) A y B quedan a la distancia del radio; si es exterior, a `sqrt(r² − h²)`.
 */
function defPerpendicular(scene: Def["scene"], P: Pt, y: number, rLim: [number, number], rIni: number, r1Lim: [number, number], r1Ini: number): Def {
  const h = y - P[1];
  const dx = (r0: number) => Math.sqrt(Math.max(0, r0 * r0 - h * h));
  const AB = (r0: number): [Pt, Pt] => [[P[0] - dx(r0), y], [P[0] + dx(r0), y]];
  const abajo = h > 0;
  return {
    scene,
    fases: ["centro", "abertura", "arco", "punto", "punto", "centro", "abertura", "arco", "centro", "arco", "regla"],
    nClics: 2,
    extRegla: 24,
    papel: (est: Est) => {
      const r0 = est.radios[0] ?? rIni;
      const [A, B] = AB(r0);
      return (
        <g>
          <Seg a={[60, y]} b={[580, y]} w={1.8} />
          <Txt p={[560, y - 8]}>{abajo ? "t" : "r"}</Txt>
          <Punto p={P} nombre="P" dx={abajo ? 10 : -4} dy={abajo ? 4 : -8} />
          {est.fase >= 4 ? <Punto p={A} nombre="A" dx={-14} dy={20} color={AMBAR} /> : null}
          {est.fase >= 5 ? <Punto p={B} nombre="B" dx={6} dy={20} color={AMBAR} /> : null}
        </g>
      );
    },
    candidatos: (est, idx) => {
      const [A, B] = AB(est.radios[0] ?? rIni);
      return idx === 0 ? [P] : idx === 1 ? [A, B] : [dist(est.centros[1], A) < 1 ? B : A];
    },
    radioLim: (a) => (a === 0 ? rLim : r1Lim),
    radioIni: (a) => (a === 0 ? rIni : r1Ini),
    rhoIni: (n) => (n === 0 ? (abajo ? -40 : -80) : 35),
    validarAbertura: (est, a, r) => {
      if (a === 0 && abajo && r <= h + 4) return "Con esa abertura el arco no llega a cortar a la recta: debe ser mayor que la distancia de P a ella. Ábrela más y vuelve a fijarla.";
      return a === 1 && r <= dx(est.radios[0] ?? rIni) + 4 ? "Para que los arcos se corten, la abertura debe ser mayor que la mitad de AB. Ábrela más y vuelve a fijarla." : null;
    },
    arco: (est, n, radio, c) => {
      if (n === 0) {
        const th = abajo ? grados(Math.acos(clamp(h / radio, 0, 1))) : 90;
        return { centro: c, base: abajo ? -90 : 90, signo: 1, rhoMin: -(th + 8), rhoMax: th + 8, req: [-(th - 3), th - 3] };
      }
      const [A, B] = AB(est.radios[0] ?? rIni);
      const th = grados(Math.acos(clamp(dx(est.radios[0] ?? rIni) / radio, 0, 1)));
      const otro = dist(c, A) < 1 ? B : A;
      return { centro: c, base: angDe(c, otro), signo: 1, rhoMin: -100, rhoMax: 100, req: [-(Math.max(th, 20) + 6), Math.max(th, 20) + 6] };
    },
    cortes: (est) => {
      const r0 = est.radios[0] ?? rIni;
      const [A, B] = AB(r0);
      if (est.fase === 3) return [A];
      if (est.fase === 4) return [B];
      const r1 = est.radios[1];
      return r1 !== undefined && r1 > dx(r0) + 0.5 ? (interseccionCirculos(A, r1, B, r1) as [Pt, Pt]) : [];
    },
    evaluar: () => ({
      ok: true,
      mensaje: abajo
        ? "Correcto: P equidista de A y B, así que está en la mediatriz de AB, que es la perpendicular a t por P."
        : "Correcto: P es el punto medio de AB (PA = PB), así que la mediatriz de AB es la perpendicular a r por P.",
    }),
  };
}

const defPerpendicularPunto = defPerpendicular("perpendicular-punto-practica", QP, QP[1], [60, 130], 90, [100, 175], 130);
const defPerpendicularExterior = defPerpendicular("perpendicular-exterior-practica", QE, QE_Y, [168, 185], 175, [112, 165], 140);

export function PerpendicularPuntoPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defPerpendicularPunto} vista={vista} />;
}

export function PerpendicularExteriorPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defPerpendicularExterior} vista={vista} />;
}

/* ───────────── Perpendicular a una semirrecta en su extremo ───────────── */

const EO: Pt = [400, 280];
const eoGeom = (R: number) => {
  const N: Pt = [EO[0] - R, EO[1]];
  const M = enCirculo(EO, R, 120);
  const L = enCirculo(EO, R, 60);
  return { N, M, L };
};
const eoCortes = (R: number, r1: number): [Pt, Pt] => {
  const { M, L } = eoGeom(R);
  return interseccionCirculos(M, r1, L, r1) as [Pt, Pt];
};

const defPerpendicularExtremo: Def = {
  scene: "perpendicular-extremo-practica",
  fases: ["centro", "abertura", "arco", "punto", "centro", "arco", "punto", "centro", "arco", "punto", "centro", "abertura", "arco", "centro", "arco", "regla"],
  nClics: 2,
  extRegla: 24,
  papel: (est: Est) => {
    const R = est.radios[0] ?? 120;
    const g = eoGeom(R);
    return (
      <g>
        <Seg a={[60, EO[1]]} b={EO} w={1.8} />
        <Txt p={[84, EO[1] - 8]}>t</Txt>
        <Punto p={EO} nombre="O" dx={8} dy={20} />
        {est.fase >= 4 ? <Punto p={g.N} nombre="N" dx={-8} dy={20} color={AMBAR} /> : null}
        {est.fase >= 7 ? <Punto p={g.M} nombre="M" dx={-18} dy={-6} color={AMBAR} /> : null}
        {est.fase >= 10 ? <Punto p={g.L} nombre="L" dx={8} dy={-6} color={AMBAR} /> : null}
      </g>
    );
  },
  candidatos: (est, idx) => {
    const g = eoGeom(est.radios[0] ?? 120);
    if (idx === 0) return [EO];
    if (idx === 1) return [g.N];
    if (idx === 2) return [g.M];
    return idx === 3 ? [g.M, g.L] : [dist(est.centros[3], g.M) < 1 ? g.L : g.M];
  },
  radioLim: (a) => (a === 0 ? [90, 150] : [80, 180]),
  radioIni: (a) => (a === 0 ? 120 : 110),
  rhoIni: (n) => (n === 0 ? -50 : n === 1 || n === 2 ? -20 : 35),
  validarAbertura: (est, a, r) => (a === 1 && r <= (est.radios[0] ?? 120) / 2 + 4 ? "Para que los arcos se corten, la abertura debe ser mayor que la mitad de ML. Ábrela más y vuelve a fijarla." : null),
  arco: (est, n, radio, c) => {
    const R = est.radios[0] ?? 120;
    const g = eoGeom(R);
    if (n === 0) return { centro: c, base: 120, signo: 1, rhoMin: -70, rhoMax: 70, req: [-58, 58] };
    if (n === 1) return { centro: c, base: angDe(g.N, g.M), signo: 1, rhoMin: -30, rhoMax: 30, req: [-8, 8] };
    if (n === 2) return { centro: c, base: angDe(g.M, g.L), signo: 1, rhoMin: -30, rhoMax: 30, req: [-8, 8] };
    const th = grados(Math.acos(clamp(R / 2 / radio, 0, 1)));
    const otro = dist(c, g.M) < 1 ? g.L : g.M;
    return { centro: c, base: angDe(c, otro), signo: 1, rhoMin: -100, rhoMax: 100, req: [-(Math.max(th, 20) + 6), Math.max(th, 20) + 6] };
  },
  cortes: (est) => {
    const R = est.radios[0] ?? 120;
    const g = eoGeom(R);
    if (est.fase === 3) return [g.N];
    if (est.fase === 6) return [g.M];
    if (est.fase === 9) return [g.L];
    const r1 = est.radios[1];
    return r1 !== undefined && r1 > R / 2 + 0.5 ? eoCortes(R, r1) : [];
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: ON = NM = ML, así que M y L están a 60° y 120° de la semirrecta; la mediatriz de ML pasa por O y es perpendicular a la semirrecta." }),
};

export function PerpendicularExtremoPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defPerpendicularExtremo} vista={vista} />;
}

/* ───────────── Construir 60° y 30° con el compás ───────────── */

const AO: Pt = [110, 300];
const geomAng = (r: number) => {
  const A: Pt = [AO[0] + r, AO[1]];
  const B: Pt = [AO[0] + r / 2, AO[1] - (r * Math.sqrt(3)) / 2];
  const C: Pt = [A[0] + B[0] - AO[0], A[1] + B[1] - AO[1]];
  return { A, B, C };
};

const defAngulos: Def = {
  scene: "construye-angulos-practica",
  fases: ["centro", "abertura", "arco", "punto", "centro", "arco", "punto", "trazo", "centro", "arco", "centro", "arco", "punto", "auto"],
  extTrazo: 40,
  autoLados: (est) => [[AO, geomAng(est.radios[0] ?? 150).C]],
  papel: (est: Est) => {
    const g = geomAng(est.radios[0] ?? 150);
    return (
      <g>
        <Seg a={[40, AO[1]]} b={[580, AO[1]]} w={1.6} />
        <Punto p={AO} nombre="O" dx={-18} dy={18} />
        {est.fase >= 4 ? <Punto p={g.A} nombre="A" dx={-4} dy={18} color={AMBAR} /> : null}
        {est.fase >= 7 ? <Punto p={g.B} nombre="B" dx={-18} dy={-4} color={AMBAR} /> : null}
        {est.fase >= 13 ? <Punto p={g.C} nombre="C" dx={6} dy={-6} color={VERDE} /> : null}
      </g>
    );
  },
  candidatos: (est, idx) => {
    const g = geomAng(est.radios[0] ?? 150);
    return [[AO], [g.A], [g.A], [g.B]][idx] ?? [];
  },
  radioLim: () => [90, 200],
  radioIni: () => 150,
  rhoIni: () => -30,
  arco: (est, n, radio, c) => {
    const g = geomAng(radio);
    if (n === 0) return { centro: c, base: 30, signo: 1, rhoMin: -45, rhoMax: 45, req: [-32, 32] };
    if (n === 1) return { centro: c, base: 120, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] };
    return { centro: c, base: angDe(c, g.C), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] };
  },
  cortes: (est) => {
    const g = geomAng(est.radios[0] ?? 150);
    return est.fase === 3 ? [g.A] : est.fase === 6 ? [g.B] : est.fase === 7 ? [AO, g.B] : [g.C];
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: OAB es un triángulo equilátero, así que el ángulo en O mide 60°; su bisectriz OC lo divide en dos de 30°." }),
};

export function ConstruyeAngulosPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defAngulos} vista={vista} />;
}

/** Geometría de las prácticas, para los tests. */
export const TRAZADOS_GEOM = {
  TS_A, TS_B, TS_C, TS_D,
  SUMA_N, SUMA_PUNTOS, SUMA_TIRAS,
  DS_A, DS_B, DS_E, DS_N,
  PP, PY, geomPar,
  QP, QE, QE_Y, EO, eoGeom, eoCortes,
  AO, geomAng,
};
