"use client";

import { useState } from "react";
import { dist, enCirculo, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, Arco, BenchShell, INK, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, ReglaTrazando, SNAP, animParaleloEscuadra, animPuntoMedio, lerp, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { ArcoPlano, Punto } from "./scenes-trazados";
import { poligono } from "./scenes-transformaciones";

/* ───────────── Triángulos equivalentes (misma base, misma altura) ───────────── */

const QA: Pt = [160, 300];
const QB: Pt = [400, 300];
const ALT = 130;

export function EquivalenciaTriangulos({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 7500 : step === 2 ? 4200 : step === 3 ? 9000 : 1);
  const cx = step === 2 ? (p < 0.65 ? lerp(220, 470, p / 0.65) : lerp(470, 340, (p - 0.65) / 0.35)) : step > 2 ? 340 : 220;
  const C1: Pt = [220, 300 - ALT];
  const C: Pt = [cx, 300 - ALT];
  const par = animParaleloEscuadra(QA, QB, C1, [[110, 300 - ALT], [560, 300 - ALT]], step === 1 ? p : 1);
  // paso 3: el punto medio de la altura se halla con su mediatriz; sobre ella se apoya el lado superior del rectángulo
  const Hf: Pt = [340, 300];
  const pm = animPuntoMedio(Hf, [340, 300 - ALT], step === 3 ? tramo(p, 0, 0.6) : 1);
  const nivel = step === 3 ? tramo(p, 0.6, 0.78) : 1;
  const rect = step === 3 ? tramo(p, 0.78, 1) : 1;
  return (
    <BenchShell scene="equivalencia-triangulos" notes={block.notes} step={step} setStep={setStep} label="Hoja con triángulos de la misma base y la misma altura">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con triángulos de la misma base y la misma altura" data-testid="bench-equivalencia">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <Seg a={QA} b={QB} w={1.8} />
        {step >= 1 ? par.nodos : null}
        {step >= 2 || (step === 1 && par.listo) ? <Txt p={[520, 300 - ALT - 8]} color={AZUL}>r ∥ AB</Txt> : null}
        {step >= 2 || (step === 1 && par.listo) ? (
          <g data-testid="bench-altura-eq">
            <Seg a={[step >= 3 ? 340 : C1[0], 300]} b={step >= 3 ? [340, 300 - ALT] : C1} color={AMBAR} w={1.4} dash="4 4" />
            <Txt p={[(step >= 3 ? 340 : C1[0]) + 8, 300 - ALT / 2 + (step >= 3 ? 40 : 0)]} color={AMBAR}>h</Txt>
          </g>
        ) : null}
        <path d={poligono([QA, QB, step >= 2 ? C : C1])} fill="rgba(31,120,180,0.14)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" data-testid="bench-triangulo-eq" />
        <Punto p={QA} nombre="A" dx={-16} dy={18} />
        <Punto p={QB} nombre="B" dx={8} dy={18} />
        <Punto p={step >= 2 ? C : C1} nombre="C" dx={8} dy={-8} />
        {step >= 2 ? (
          <Txt p={[200, 345]} color={VERDE} size={14}>
            Área = b · h / 2 (siempre la misma)
          </Txt>
        ) : null}
        {step >= 3 ? pm.nodos : null}
        {step >= 3 && nivel > 0 ? <Seg a={[QA[0], 300 - ALT / 2]} b={[lerp(QA[0], QB[0], nivel), 300 - ALT / 2]} color={VERDE} w={1.4} dash="4 4" /> : null}
        {step >= 3 && pm.listo ? <circle cx={340} cy={300 - ALT / 2} r="3.2" fill={AMBAR} /> : null}
        {step >= 3 && rect > 0 ? (
          <g data-testid="bench-rectangulo-eq" opacity={rect}>
            <path d={poligono([[QA[0], 300], [QB[0], 300], [QB[0], 300 - ALT / 2], [QA[0], 300 - ALT / 2]])} fill="rgba(31,157,85,0.10)" stroke={VERDE} strokeWidth="2" strokeDasharray="6 4" />
            <Txt p={[QA[0] + 8, 300 - ALT / 2 - 6]} color={VERDE} size={12}>
              rectángulo: base b y altura h/2
            </Txt>
          </g>
        ) : null}
        {step === 3 && pm.pose ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={pm.pose.pose} open={pm.pose.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Cuadratura de un rectángulo ───────────── */

const RA: Pt = [120, 300];
const RB: Pt = [300, 300];
const RC: Pt = [300, 210];
const RD: Pt = [120, 210];
const RH = dist(RB, RC);
const RHp: Pt = [RB[0] + RH, 300];
const RO: Pt = [(RA[0] + RHp[0]) / 2, 300];
const RR = dist(RO, RHp);
const RCs: Pt = [RB[0], 300 - Math.sqrt(RR * RR - (RB[0] - RO[0]) ** 2)];
const LADO = dist(RB, RCs);

function PapelCuadratura({ hp = false, centro = false, semi = 0, perp = 0 }: { hp?: boolean; centro?: boolean; semi?: number; perp?: number }) {
  return (
    <g>
      <path d={poligono([RA, RB, RC, RD])} fill="rgba(31,120,180,0.10)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <Punto p={RA} nombre="A" dx={-16} dy={18} />
      <Punto p={RB} nombre="B" dx={-5} dy={20} />
      <Punto p={RC} nombre="C" dx={6} dy={-6} />
      <Punto p={RD} nombre="D" dx={-16} dy={-6} />
      <Seg a={RB} b={[RHp[0] + 30, 300]} color={INK} w={1} dash="6 4" />
      {hp ? <Punto p={RHp} nombre="H" dx={-4} dy={20} color={AZUL} /> : null}
      {centro ? <Punto p={RO} nombre="O" dx={-5} dy={20} color={AZUL} /> : null}
      {semi > 0 ? <ArcoPlano c={RO} r={RR} a1={0} a2={180 * semi} /> : null}
      {perp > 0 ? (
        <g data-testid="bench-lado-cuadrado">
          <Seg a={RB} b={lerpP(RB, RCs, perp)} color={VERDE} w={2.2} />
          <g opacity={tramo(perp, 0.85, 1)}>
            <Punto p={RCs} nombre="E" dx={8} dy={-6} color={VERDE} />
            <Txt p={[RB[0] + 10, (RB[1] + RCs[1]) / 2]} color={VERDE}>x</Txt>
          </g>
        </g>
      ) : null}
    </g>
  );
}

export function CuadraturaCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 2400 : step === 2 ? 9000 : step === 3 ? 2400 : 2000);
  // paso 2: primero se halla el punto medio O de AH con la mediatriz y después se traza la semicircunferencia
  const pm = animPuntoMedio(RA, RHp, step === 2 ? tramo(p, 0, 0.55) : 1);
  const semi = step === 2 ? tramo(p, 0.55, 1) : step > 2 ? 1 : 0;
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 1) comp = poseCompas(RB, enCirculo(RB, RH, lerp(-24, 24, p)));
  else if (step === 2) comp = pm.listo ? poseCompas(RO, enCirculo(RO, RR, 180 * semi)) : pm.pose;
  const lado = LADO;
  const cuadrado: Pt[] = [[450, 300], [450 + lado, 300], [450 + lado, 300 - lado], [450, 300 - lado]];
  return (
    <BenchShell scene="cuadratura-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un rectángulo y la construcción del cuadrado de igual área">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un rectángulo y la construcción del cuadrado de igual área" data-testid="bench-cuadratura">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelCuadratura hp={step >= 2 || (step === 1 && p > 0.9)} centro={step >= 3 || (step === 2 && pm.listo)} semi={semi} perp={step === 3 ? p : step > 3 ? 1 : 0} />
        {step >= 1 ? (
          <g data-testid="bench-arco-h">
            <ArcoAnim c={RB} r={RH} a1={-24} a2={24} t={step === 1 ? p : 1} />
          </g>
        ) : null}
        {step >= 2 ? pm.nodos : null}
        {step === 3 ? <ReglaTrazando a={RB} b={RCs} p={p} ext={0} color={VERDE} /> : null}
        {step === 4 ? (
          <g data-testid="bench-cuadrado-final">
            <path d={poligono(cuadrado)} fill="rgba(31,157,85,0.14)" stroke={VERDE} strokeWidth="2" strokeLinejoin="round" />
            <Txt p={[452, 300 - lado - 8]} color={VERDE}>lado x = BE</Txt>
            <Txt p={[452, 322]} color={VERDE} size={12}>= misma área que ABCD</Txt>
          </g>
        ) : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

const defCuadratura: Def = {
  scene: "cuadratura-practica",
  fases: ["medida", "centro", "arco", "medida", "centro", "arco", "regla"],
  nClics: 2,
  extRegla: 8,
  papel: (est: Est) => <PapelCuadratura hp={est.fase >= 3} centro={est.fase >= 3} />,
  medibles: (est) => (est.fase === 0 ? [RB, RC] : [RO, RHp]),
  candidatos: (_e, idx) => (idx === 0 ? [RB] : [RO]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni: (n) => (n === 0 ? -25 : 12),
  arco: (_e, n, _r, c) => (n === 0 ? { centro: c, base: 0, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] } : { centro: c, base: 0, signo: 1, rhoMin: 0, rhoMax: 180, req: [14, 166] }),
  cortes: () => [RB, RCs],
  evaluar: (est) => {
    const [p1, p2] = est.clics;
    if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos por los que pasa la regla." };
    const bien = (dist(p1, RB) <= SNAP + 2 && dist(p2, RCs) <= SNAP + 2) || (dist(p1, RCs) <= SNAP + 2 && dist(p2, RB) <= SNAP + 2);
    return bien
      ? { ok: true, mensaje: "Correcto: BE² = AB · BH = b · h, así que el cuadrado de lado BE tiene la misma área que el rectángulo. BE es la media proporcional de la base y la altura." }
      : { ok: false, mensaje: "La perpendicular debe pasar por B y cortar a la semicircunferencia: toca B y el punto del arco que está justo encima. Pulsa «Reintentar»." };
  },
};

export function CuadraturaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defCuadratura} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Semejanza: razón de lados y de áreas ───────────── */

const U = 22;
const S1: Pt[] = [[90, 330], [90 + 3 * U, 330], [90, 330 - 4 * U]];
const S2: Pt[] = [[260, 330], [260 + 6 * U, 330], [260, 330 - 8 * U]];

function Rejilla({ x0, y0, cols, filas }: { x0: number; y0: number; cols: number; filas: number }) {
  return (
    <g stroke="#7aa7c7" strokeOpacity="0.45" strokeWidth="0.7">
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * U} y1={y0 - filas * U} x2={x0 + i * U} y2={y0} />
      ))}
      {Array.from({ length: filas + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 - i * U} x2={x0 + cols * U} y2={y0 - i * U} />
      ))}
    </g>
  );
}

export function SemejanzaRazon({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const [a1, b1, c1] = S1;
  const [a2, b2, c2] = S2;
  return (
    <BenchShell scene="semejanza-razon" notes={block.notes} step={step} setStep={setStep} label="Hoja con dos triángulos semejantes de razón 2">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con dos triángulos semejantes de razón 2" data-testid="bench-semejanza">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {step >= 2 ? (
          <g data-testid="bench-rejilla-areas">
            <Rejilla x0={a1[0]} y0={330} cols={3} filas={4} />
            <Rejilla x0={a2[0]} y0={330} cols={6} filas={8} />
          </g>
        ) : null}
        <path d={poligono(S1)} fill="rgba(31,120,180,0.14)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
        <path d={poligono(S2)} fill="rgba(31,157,85,0.12)" stroke={VERDE} strokeWidth="1.8" strokeLinejoin="round" />
        <Punto p={a1} nombre="A" dx={-16} dy={18} />
        <Punto p={b1} nombre="B" dx={6} dy={18} />
        <Punto p={c1} nombre="C" dx={-18} dy={-4} />
        <Punto p={a2} nombre="A′" dx={-20} dy={18} color={VERDE} />
        <Punto p={b2} nombre="B′" dx={6} dy={18} color={VERDE} />
        <Punto p={c2} nombre="C′" dx={-22} dy={-4} color={VERDE} />
        {step === 0 ? (
          <g data-testid="bench-angulos-iguales">
            <Arco v={a1} a1={0} a2={-90} r={16} color={AMBAR} text="" />
            <Arco v={a2} a1={0} a2={-90} r={22} color={AMBAR} text="" />
            <Arco v={b1} a1={180} a2={233.13} r={26} color={AZUL} text="β" textSize={13} dr={10} />
            <Arco v={b2} a1={180} a2={233.13} r={34} color={AZUL} text="β" textSize={13} dr={10} />
            <Arco v={c1} a1={90} a2={53.13} r={26} color={VERDE} text="γ" textSize={13} dr={10} />
            <Arco v={c2} a1={90} a2={53.13} r={34} color={VERDE} text="γ" textSize={13} dr={10} />
            <Txt p={[130, 120]} color={INK} size={14}>Mismos ángulos: α = 90°, β, γ</Txt>
          </g>
        ) : null}
        {step === 1 ? (
          <g data-testid="bench-lados-razon">
            <Txt p={[a1[0] + 18, 350]} color={AMBAR} size={14}>AB = 3</Txt>
            <Txt p={[a2[0] + 44, 350]} color={AMBAR} size={14}>A′B′ = 6</Txt>
            <Txt p={[a1[0] + 8, 330 - 2 * U]} color={AZUL} size={14}>4</Txt>
            <Txt p={[a2[0] + 8, 330 - 4 * U]} color={AZUL} size={14}>8</Txt>
            <Txt p={[300, 100]} color={VERDE} size={16}>razón de semejanza k = A′B′ / AB = 2</Txt>
          </g>
        ) : null}
        {step === 2 ? (
          <g data-testid="bench-areas-razon">
            <Txt p={[a1[0] + 6, 90]} color={INK} size={15}>área = 6 cuadros</Txt>
            <Txt p={[a2[0] + 8, 90]} color={VERDE} size={15}>área = 24 cuadros</Txt>
            <Txt p={[300, 125]} color={AMBAR} size={16}>24 = 4 · 6 = k² · 6</Txt>
          </g>
        ) : null}
        {step === 3 ? (
          <g data-testid="bench-escala">
            <Txt p={[110, 100]} color={INK} size={15}>Plano a escala 1:50 → k = 1/50</Txt>
            <Txt p={[110, 124]} color={AMBAR} size={14}>4 cm en el plano ↔ 200 cm = 2 m reales</Txt>
            <Txt p={[110, 148]} color={VERDE} size={14}>16 cm² en el plano ↔ 40 000 cm² = 4 m²</Txt>
            <Txt p={[110, 172]} color={INK} size={12}>Las superficies guardan la razón k² = 1/2 500</Txt>
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}
