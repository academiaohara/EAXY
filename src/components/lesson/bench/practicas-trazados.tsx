"use client";

import { angDe, clamp, dist, interseccionCirculos, type Pt } from "./geometry";
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

const DS_A: Pt = [90, 280];
const DS_M = 190;
const DS_N = 100;
const DS_B: Pt = [DS_A[0] + DS_M, 280];
const DS_E: Pt = [DS_A[0] + DS_N, 280];

const defDiferenciaSegmentos: Def = {
  scene: "diferencia-segmentos-practica",
  fases: ["medida", "centro", "arco", "punto", "auto"],
  autoLados: () => [[DS_E, DS_B]],
  papel: (est: Est) => (
    <g>
      <Tira y={70} x0={90} len={DS_M} nombre="m" extremos={["A", "B"]} color={AMBAR} />
      <Tira y={125} x0={90} len={DS_N} nombre="n" extremos={["C", "D"]} color={AZUL} />
      <Seg a={DS_A} b={DS_B} w={2.2} color={AMBAR} />
      <Punto p={DS_A} nombre="A" dx={-6} dy={22} />
      <Punto p={DS_B} nombre="B" dx={-4} dy={22} />
      {est.fase >= 4 ? <Punto p={DS_E} nombre="E" dx={-4} dy={22} color={VERDE} /> : null}
    </g>
  ),
  medibles: () => [[90, 125], [90 + DS_N, 125]],
  candidatos: () => [DS_A],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 80,
  rhoIni: () => -25,
  arco: (_est, _n, _r, c) => ({ centro: c, ...arcoCorta() }),
  cortes: () => [DS_E],
  evaluar: () => ({ ok: true, mensaje: "Correcto: EB = m − n. Se coloca n sobre m desde A y lo que queda hasta B es la diferencia." }),
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

/* ───────────── Perpendicular a una recta por un punto de ella ───────────── */

const QP: Pt = [320, 200];

const defPerpendicularPunto: Def = {
  scene: "perpendicular-punto-practica",
  fases: ["centro", "abertura", "arco", "punto", "punto", "centro", "abertura", "arco", "centro", "arco", "regla"],
  nClics: 2,
  extRegla: 24,
  papel: (est: Est) => {
    const r0 = est.radios[0] ?? 90;
    return (
      <g>
        <Seg a={[60, QP[1]]} b={[580, QP[1]]} w={1.8} />
        <Txt p={[560, QP[1] - 8]}>r</Txt>
        <Punto p={QP} nombre="P" dx={-4} dy={-8} />
        {est.fase >= 4 ? <Punto p={[QP[0] - r0, QP[1]]} nombre="A" dx={-14} dy={20} color={AMBAR} /> : null}
        {est.fase >= 5 ? <Punto p={[QP[0] + r0, QP[1]]} nombre="B" dx={6} dy={20} color={AMBAR} /> : null}
      </g>
    );
  },
  candidatos: (est, idx) => {
    const r0 = est.radios[0] ?? 90;
    return idx === 0 ? [QP] : idx === 1 ? [[QP[0] - r0, QP[1]], [QP[0] + r0, QP[1]]] : [[QP[0] + (dist(est.centros[1], [QP[0] - r0, QP[1]]) < 1 ? r0 : -r0), QP[1]]];
  },
  radioLim: (a) => (a === 0 ? [60, 130] : [100, 175]),
  radioIni: (a) => (a === 0 ? 90 : 130),
  rhoIni: (n) => (n === 0 ? -80 : 35),
  validarAbertura: (est, a, r) => (a === 1 && r <= (est.radios[0] ?? 90) + 4 ? "Para que los arcos se corten, la abertura debe ser mayor que la anterior (la mitad de AB). Ábrela más y vuelve a fijarla." : null),
  arco: (est, n, radio, c) => {
    if (n === 0) return { centro: c, base: 90, signo: 1, rhoMin: -90, rhoMax: 90, req: [-80, 80] };
    const r0 = est.radios[0] ?? 90;
    const th = grados(Math.acos(clamp(r0 / radio, 0, 1)));
    const otro: Pt = dist(c, [QP[0] - r0, QP[1]]) < 1 ? [QP[0] + r0, QP[1]] : [QP[0] - r0, QP[1]];
    return { centro: c, base: angDe(c, otro), signo: 1, rhoMin: -100, rhoMax: 100, req: [-(Math.max(th, 20) + 6), Math.max(th, 20) + 6] };
  },
  cortes: (est) => {
    const r0 = est.radios[0] ?? 90;
    if (est.fase === 3) return [[QP[0] - r0, QP[1]]];
    if (est.fase === 4) return [[QP[0] + r0, QP[1]]];
    const r1 = est.radios[1];
    return r1 !== undefined && r1 > r0 + 0.5 ? (interseccionCirculos([QP[0] - r0, QP[1]], r1, [QP[0] + r0, QP[1]], r1) as [Pt, Pt]) : [];
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: P es el punto medio de AB (PA = PB), así que la mediatriz de AB es la perpendicular a r por P." }),
};

export function PerpendicularPuntoPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defPerpendicularPunto} vista={vista} />;
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
  QP,
  AO, geomAng,
};
