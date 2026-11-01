"use client";

import { useState } from "react";
import { angDe, clamp, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, Arco, BenchShell, INK, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, ReglaTrazando, animParaleloEscuadra, animParalelaCompas, animPuntoMedio, lerp, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { Punto } from "./scenes-trazados";

const vista = { ...MV, sheet: MSHEET };
const grados = (rad: number) => (rad * 180) / Math.PI;
const AUX = "#6b7480";

/** Pie de la perpendicular desde `p` a la recta `a`–`b`. */
const pie = (p: Pt, a: Pt, b: Pt): Pt => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [a[0] + t * dx, a[1] + t * dy];
};

/** Marca de ángulo recto en `v`, entre las direcciones hacia `a` y hacia `b`. */
function Recto({ v, a, b, color = INK, s = 11 }: { v: Pt; a: Pt; b: Pt; color?: string; s?: number }) {
  const u = (p: Pt): Pt => {
    const d = dist(v, p);
    return [(p[0] - v[0]) / d, (p[1] - v[1]) / d];
  };
  const ua = u(a);
  const ub = u(b);
  const p1: Pt = [v[0] + ua[0] * s, v[1] + ua[1] * s];
  const p2: Pt = [v[0] + (ua[0] + ub[0]) * s, v[1] + (ua[1] + ub[1]) * s];
  const p3: Pt = [v[0] + ub[0] * s, v[1] + ub[1] * s];
  return <path d={`M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} L${p3[0]} ${p3[1]}`} fill="none" stroke={color} strokeWidth="1.5" />;
}

function Circulo({ c, r, color = INK, w = 1.6, dash }: { c: Pt; r: number; color?: string; w?: number; dash?: string }) {
  return <circle cx={c[0]} cy={c[1]} r={r} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} />;
}

/* ───────────── 1. Tangentes desde un punto exterior ───────────── */

const TO: Pt = [200, 190];
const TR = 70;
const TP: Pt = [470, 190];
const TM = puntoMedio(TO, TP);
const TMO = dist(TM, TO);
const [T_ARRIBA, T_ABAJO] = (() => {
  const [p, q] = interseccionCirculos(TO, TR, TM, TMO) as [Pt, Pt];
  return p[1] < q[1] ? [p, q] : [q, p];
})();

function PapelTangentes({ tangentes = false, m = false, t = 0 }: { tangentes?: boolean; m?: boolean; t?: number }) {
  return (
    <g>
      <Circulo c={TO} r={TR} />
      <circle cx={TO[0]} cy={TO[1]} r="2.6" fill={INK} />
      <Txt p={[TO[0] - 16, TO[1] + 18]} color={INK}>O</Txt>
      <Punto p={TP} nombre="P" dx={8} dy={18} />
      <Txt p={[TO[0] - TR - 22, TO[1] - 4]} color={INK}>R</Txt>
      {m ? <Punto p={TM} nombre="M" dx={-4} dy={18} color={AZUL} /> : null}
      {t >= 1 ? <Punto p={T_ARRIBA} nombre="T₁" dx={-6} dy={-10} color={VERDE} /> : null}
      {t >= 2 ? <Punto p={T_ABAJO} nombre="T₂" dx={-6} dy={22} color={VERDE} /> : null}
      {tangentes ? (
        <g>
          <Seg a={TP} b={T_ARRIBA} color={VERDE} w={2} />
          <Seg a={TP} b={T_ABAJO} color={VERDE} w={2} />
        </g>
      ) : null}
    </g>
  );
}

export function TangentesCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 6200 : step === 2 ? 5200 : step === 3 ? 3600 : 1);
  const pm = animPuntoMedio(TO, TP, step === 1 ? p : 1);
  const comp = step === 1 ? pm.pose : step === 2 ? poseCompas(TM, enCirculo(TM, TMO, 360 * p)) : null;
  return (
    <BenchShell scene="tangentes-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con una circunferencia, un punto exterior y la construcción de sus tangentes">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con una circunferencia, un punto exterior y la construcción de sus tangentes" data-testid="bench-tangentes">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelTangentes m={step >= 2 || (step === 1 && pm.listo)} t={step >= 3 ? 2 : step === 2 && p > 0.9 ? 2 : 0} />
        {step >= 1 ? <Seg a={TO} b={TP} color={AUX} w={1} dash="5 4" /> : null}
        {step >= 1 ? pm.nodos : null}
        {step >= 2 ? (
          <g data-testid="bench-circ-diametro">
            <ArcoAnim c={TM} r={TMO} a1={0} a2={360} t={step === 2 ? p : 1} />
          </g>
        ) : null}
        {step === 3 ? (
          <>
            <ReglaTrazando a={TP} b={T_ARRIBA} p={tramo(p, 0, 0.5)} ext={0} color={VERDE} />
            <ReglaTrazando a={TP} b={T_ABAJO} p={tramo(p, 0.5, 1)} ext={0} color={VERDE} />
          </>
        ) : null}
        {step >= 4 ? (
          <g data-testid="bench-tangentes-rectas">
            <Seg a={TP} b={T_ARRIBA} color={VERDE} w={2} />
            <Seg a={TP} b={T_ABAJO} color={VERDE} w={2} />
            <Seg a={TO} b={T_ARRIBA} color={AMBAR} w={1.6} dash="5 4" />
            <Seg a={TO} b={T_ABAJO} color={AMBAR} w={1.6} dash="5 4" />
            <Recto v={T_ARRIBA} a={TO} b={TP} color={AMBAR} />
            <Recto v={T_ABAJO} a={TO} b={TP} color={AMBAR} />
            <Txt p={[300, 345]} color={AMBAR} size={14}>OT ⟂ TP en cada punto de tangencia</Txt>
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

const defTangentes: Def = {
  scene: "tangentes-practica",
  fases: ["centro", "abertura", "arco", "centro", "arco", "trazo", "medida", "centro", "arco", "punto", "punto", "auto"],
  autoLados: () => [[TP, T_ARRIBA], [TP, T_ABAJO]],
  extTrazo: 30,
  papel: (est: Est) => <PapelTangentes m={est.fase >= 6} t={est.fase >= 11 ? 2 : est.fase >= 10 ? 1 : 0} />,
  candidatos: (est, idx) => (idx === 0 ? [TO, TP] : idx === 1 ? [dist(est.centros[0], TO) < 1 ? TP : TO] : [TM]),
  medibles: () => [TM, TO],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: (a) => (a === 0 ? [60, 235] : [40, 200]),
  radioIni: () => 150,
  rhoIni: (n) => (n < 2 ? 35 : 0),
  arco: (est, n, radio, c) => {
    if (n < 2) {
      const otro = dist(c, TO) < 1 ? TP : TO;
      const th = radio > dist(TO, TP) / 2 ? grados(Math.acos(clamp(dist(TO, TP) / (2 * radio), 0, 1))) : 0;
      return { centro: c, base: angDe(c, otro), signo: 1, rhoMin: -100, rhoMax: 100, req: [-(Math.max(th, 20) + 6), Math.max(th, 20) + 6] };
    }
    const fi = Math.abs(angDe(TM, T_ARRIBA) - 180);
    return { centro: c, base: 180, signo: 1, rhoMin: -180, rhoMax: 180, req: [-(fi + 10), fi + 10] };
  },
  validarAbertura: (_est, _a, r) => (r <= dist(TO, TP) / 2 + 4 ? "Con esa abertura los arcos no llegarían a cortarse: debe ser mayor que la mitad de OP. Ábrela más y vuelve a fijarla." : null),
  cortes: (est) => {
    if (est.fase === 5) {
      const r = est.radios[0];
      return r !== undefined && r > dist(TO, TP) / 2 + 0.5 ? (interseccionCirculos(TO, r, TP, r) as [Pt, Pt]) : [];
    }
    return est.fase === 9 ? [T_ARRIBA] : [T_ABAJO];
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: T₁ y T₂ están en la circunferencia de diámetro OP, así que los ángulos OT₁P y OT₂P son rectos: PT₁ y PT₂ son perpendiculares a los radios, es decir, tangentes." }),
};

export function TangentesPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defTangentes} vista={vista} />;
}

/* ───────────── 2. Circunferencias: posiciones relativas y tangente en un punto ───────────── */

const PC1: Pt = [215, 190];
const PR1 = 80;
const PR2 = 45;
const POSICIONES: { d: number; txt: string; n: string; tang?: boolean }[] = [
  { d: 150, txt: "d > R + r", n: "Exteriores: 4 tangentes comunes" },
  { d: 125, txt: "d = R + r", n: "Tangentes exteriores: 3 tangentes comunes", tang: true },
  { d: 95, txt: "R − r < d < R + r", n: "Secantes: 2 tangentes comunes" },
  { d: 35, txt: "d = R − r", n: "Tangentes interiores: 1 tangente común", tang: true },
  { d: 15, txt: "d < R − r", n: "Interiores: ninguna tangente común" },
];

export function CircunferenciasPosiciones({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const { d, txt, n, tang } = POSICIONES[step];
  const C2: Pt = [PC1[0] + d, PC1[1]];
  return (
    <BenchShell scene="circunferencias-posiciones" notes={block.notes} step={step} setStep={setStep} label="Hoja con dos circunferencias en distintas posiciones">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con dos circunferencias en distintas posiciones" data-testid="bench-posiciones">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <Circulo c={PC1} r={PR1} />
        <Circulo c={C2} r={PR2} color={VERDE} />
        <Seg a={PC1} b={C2} color={AMBAR} w={1.4} dash="5 4" />
        <circle cx={PC1[0]} cy={PC1[1]} r="2.4" fill={INK} />
        <circle cx={C2[0]} cy={C2[1]} r="2.4" fill={VERDE} />
        <Txt p={[PC1[0] - 18, PC1[1] + 16]} color={INK}>O₁</Txt>
        <Txt p={[C2[0] - 4, C2[1] + 16]} color={VERDE}>O₂</Txt>
        {tang ? (
          <g data-testid="bench-tangencia">
            <circle cx={PC1[0] + PR1} cy={PC1[1]} r="4" fill={AZUL} />
            <Txt p={[PC1[0] + PR1 - 6, PC1[1] - 12]} color={AZUL}>T</Txt>
          </g>
        ) : null}
        <Txt p={[330, 100]} color={AMBAR} size={16}>{txt}</Txt>
        <Txt p={[330, 126]} color={INK} size={14}>{n}</Txt>
        <Txt p={[60, 335]} color={INK} size={13}>El punto de tangencia está en la recta de los centros</Txt>
      </svg>
    </BenchShell>
  );
}

const CT_O: Pt = [230, 200];
const CT_R = 70;
const CT_T: Pt = enCirculo(CT_O, CT_R, 40);
const CT_RAD = 45;
const CT_SEG: [Pt, Pt] = [[430, 80], [430 + CT_RAD, 80]];
const CT_C: Pt = enCirculo(CT_T, CT_RAD, 40);

function PapelCircTangente({ c = false }: { c?: boolean }) {
  return (
    <g>
      <Circulo c={CT_O} r={CT_R} />
      <circle cx={CT_O[0]} cy={CT_O[1]} r="2.6" fill={INK} />
      <Txt p={[CT_O[0] - 16, CT_O[1] + 18]} color={INK}>O</Txt>
      <Punto p={CT_T} nombre="T" dx={8} dy={-8} color={AZUL} />
      <Seg a={CT_SEG[0]} b={CT_SEG[1]} color={AMBAR} w={3} />
      <Seg a={[CT_SEG[0][0], 74]} b={[CT_SEG[0][0], 86]} color={INK} w={1.4} />
      <Seg a={[CT_SEG[1][0], 74]} b={[CT_SEG[1][0], 86]} color={INK} w={1.4} />
      <Txt p={[CT_SEG[0][0], 66]} color={INK}>{`radio r = ${CT_RAD / 10} cm`}</Txt>
      {c ? <Punto p={CT_C} nombre="C" dx={8} dy={-8} color={VERDE} /> : null}
    </g>
  );
}

const defCircTangente: Def = {
  scene: "circ-tangente-practica",
  fases: ["trazo", "medida", "centro", "arco", "punto", "centro", "arco"],
  principales: [1],
  extTrazo: 130,
  papel: (est: Est) => <PapelCircTangente c={est.fase >= 5} />,
  candidatos: (_est, idx) => (idx === 0 ? [CT_T] : [CT_C]),
  medibles: () => CT_SEG,
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [20, 120],
  radioIni: () => 50,
  rhoIni: () => -25,
  arco: (_est, n, _r, c) => (n === 0 ? { centro: c, base: 40, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] } : { centro: c, base: angDe(c, CT_T), signo: 1, rhoMin: -90, rhoMax: 90, req: [-40, 40] }),
  cortes: (est) => (est.fase === 0 ? [CT_O, CT_T] : [CT_C]),
  evaluar: () => ({ ok: true, mensaje: "Correcto: el centro C está en la recta OT, a distancia r de T. Las dos circunferencias se tocan solo en T y ese punto está en la recta de los centros: son tangentes exteriores." }),
};

export function CircTangentePractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defCircTangente} vista={vista} />;
}

/* ───────────── 3. Enlace entre dos rectas ───────────── */

const EV0: Pt = [180, 300];
const ER_ = 70;
const E_SEG: [Pt, Pt] = [[420, 70], [420 + ER_, 70]];
const E_T1: Pt = [EV0[0] + ER_, EV0[1]];
const E_T2: Pt = [EV0[0], EV0[1] - ER_];
const E_C: Pt = [EV0[0] + ER_, EV0[1] - ER_];

function PapelEnlace({ t1 = false, t2 = false, c = false }: { t1?: boolean; t2?: boolean; c?: boolean }) {
  return (
    <g>
      <Seg a={EV0} b={[560, 300]} w={1.8} />
      <Seg a={EV0} b={[180, 40]} w={1.8} />
      <Punto p={EV0} nombre="V" dx={-18} dy={18} />
      <Seg a={E_SEG[0]} b={E_SEG[1]} color={AMBAR} w={3} />
      <Seg a={[E_SEG[0][0], 64]} b={[E_SEG[0][0], 76]} color={INK} w={1.4} />
      <Seg a={[E_SEG[1][0], 64]} b={[E_SEG[1][0], 76]} color={INK} w={1.4} />
      <Txt p={[E_SEG[0][0], 56]} color={INK}>{`radio r = ${ER_ / 10} cm`}</Txt>
      {t1 ? <Punto p={E_T1} nombre="T₁" dx={-6} dy={18} color={AZUL} /> : null}
      {t2 ? <Punto p={E_T2} nombre="T₂" dx={8} dy={4} color={AZUL} /> : null}
      {c ? <Punto p={E_C} nombre="C" dx={8} dy={-8} color={VERDE} /> : null}
    </g>
  );
}

const defEnlace: Def = {
  scene: "enlace-practica",
  fases: ["medida", "centro", "arco", "punto", "punto", "centro", "arco", "centro", "arco", "punto", "centro", "arco"],
  principales: [3],
  papel: (est: Est) => <PapelEnlace t1={est.fase >= 4} t2={est.fase >= 5} c={est.fase >= 10} />,
  candidatos: (_est, idx) => [[EV0], [E_T1], [E_T2], [E_C]][idx] ?? [],
  medibles: () => E_SEG,
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [30, 110],
  radioIni: () => 50,
  rhoIni: (n) => (n === 0 ? -40 : n === 3 ? -35 : -25),
  arco: (_est, n, _r, c) => {
    if (n === 0) return { centro: c, base: 45, signo: 1, rhoMin: -45, rhoMax: 45, req: [-38, 38] };
    if (n === 1) return { centro: c, base: angDe(c, E_C), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] };
    if (n === 2) return { centro: c, base: angDe(c, E_C), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] };
    return { centro: c, base: 225, signo: 1, rhoMin: -50, rhoMax: 50, req: [-40, 40] };
  },
  cortes: (est) => (est.fase === 3 ? [E_T1] : est.fase === 4 ? [E_T2] : [E_C]),
  evaluar: () => ({ ok: true, mensaje: "Correcto: C está a distancia r de las dos rectas, así que el arco de centro C y radio r las toca en T₁ y T₂ sin cambio brusco de dirección: es el enlace." }),
};

export function EnlacePractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defEnlace} vista={vista} />;
}

/* Explicación: enlace de dos rectas que forman 60° */

const NV: Pt = [140, 300];
const NR = 50;
const U1: Pt = [1, 0];
const U2: Pt = [0.5, -Math.sqrt(3) / 2];
const N2: Pt = [Math.sqrt(3) / 2, 0.5];
const NC: Pt = [NV[0] + 2 * NR * Math.cos(Math.PI / 6), NV[1] - 2 * NR * Math.sin(Math.PI / 6)];
const NT1: Pt = [NC[0], NV[1]];
const NT2 = pie(NC, NV, [NV[0] + U2[0], NV[1] + U2[1]]);
const en = (v: Pt, u: Pt, t: number): Pt => [v[0] + u[0] * t, v[1] + u[1] * t];

export function EnlaceCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 9000 : 2400);
  const par1 = animParalelaCompas([NV[0] + 160, NV[1]], [NV[0] + 300, NV[1]], [0, -1], NR, step === 1 ? tramo(p, 0, 0.5) : 1);
  const q = (t: number): Pt => en(NV, U2, t);
  const par2 = animParalelaCompas(q(110), q(220), N2, NR, step === 1 ? tramo(p, 0.5, 1) : 1);
  const a1 = angDe(NC, NT2);
  const a2 = angDe(NC, NT1);
  return (
    <BenchShell scene="enlace-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con dos rectas que forman 60° y el enlace entre ellas">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con dos rectas que forman 60° y el enlace entre ellas" data-testid="bench-enlace">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <Seg a={NV} b={en(NV, U1, 400)} w={1.8} />
        <Seg a={NV} b={en(NV, U2, 280)} w={1.8} />
        <Punto p={NV} nombre="V" dx={-18} dy={18} />
        <Arco v={NV} a1={-60} a2={0} r={40} color={AMBAR} />
        <Txt p={[NV[0] - 62, NV[1] - 24]} color={AMBAR} size={14}>α = 60°</Txt>
        <Txt p={[420, 70]} color={AMBAR}>{`radio del enlace r = ${NR / 10} cm`}</Txt>
        {step >= 1 ? (
          <g data-testid="bench-enlace-paralelas">
            {par1.nodos}
            {par2.nodos}
          </g>
        ) : null}
        {step === 1 ? (par1.pose ?? par2.pose) ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={(par1.pose ?? par2.pose)!.pose} open={(par1.pose ?? par2.pose)!.open} />
          </g>
        ) : null : null}
        {step >= 2 || (step === 1 && p > 0.97) ? <Punto p={NC} nombre="C" dx={8} dy={-8} color={VERDE} /> : null}
        {step >= 2 ? (
          <g data-testid="bench-enlace-pies">
            <Seg a={NC} b={NT1} color={AUX} w={1.2} dash="4 4" />
            <Seg a={NC} b={NT2} color={AUX} w={1.2} dash="4 4" />
            <Recto v={NT1} a={NC} b={en(NV, U1, 300)} color={AUX} s={9} />
            <Recto v={NT2} a={NC} b={en(NV, U2, 200)} color={AUX} s={9} />
            <Punto p={NT1} nombre="T₁" dx={-6} dy={18} color={AZUL} />
            <Punto p={NT2} nombre="T₂" dx={-26} dy={-4} color={AZUL} />
          </g>
        ) : null}
        {step >= 3 ? <ArcoAnim c={NC} r={NR} a1={a1} a2={a2 < a1 ? a2 + 360 : a2} t={step === 3 ? p : 1} /> : null}
        {step >= 4 ? (
          <g data-testid="bench-enlace-final">
            <ArcoPlano2 c={NC} r={NR} a1={a1} a2={a2 < a1 ? a2 + 360 : a2} />
            <Txt p={[200, 345]} color={VERDE} size={14}>t = r / tan(α/2): distancia de V a T₁ y a T₂</Txt>
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

function ArcoPlano2({ c, r, a1, a2 }: { c: Pt; r: number; a1: number; a2: number }) {
  const s = enCirculo(c, r, a1);
  const e = enCirculo(c, r, a2);
  return <path d={`M${s[0]} ${s[1]} A${r} ${r} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} 0 ${e[0]} ${e[1]}`} fill="none" stroke={VERDE} strokeWidth="3" strokeLinecap="round" />;
}

/* ───────────── 4. Óvalo dado el eje mayor ───────────── */

const OD = 60;
const OA: Pt = [220, 190];
const OB: Pt = [400, 190];
const O1: Pt = [280, 190];
const O2: Pt = [340, 190];
const [O3, O4] = (() => {
  const [p, q] = interseccionCirculos(O1, OD, O2, OD) as [Pt, Pt];
  return p[1] < q[1] ? [p, q] : [q, p];
})();
const ext = (a: Pt, b: Pt, k: number): Pt => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
const E1 = ext(O3, O1, 2);
const E2 = ext(O3, O2, 2);
const E3 = ext(O4, O1, 2);
const E4 = ext(O4, O2, 2);
const O_STRIP: [Pt, Pt] = [[440, 60], [440 + 2 * OD, 60]];

function arcoPath(c: Pt, r: number, desde: Pt, hasta: Pt, color: string, w = 3) {
  const a1 = angDe(c, desde);
  let a2 = angDe(c, hasta);
  while (a2 < a1) a2 += 360;
  const s = enCirculo(c, r, a1);
  const e = enCirculo(c, r, a2);
  return <path d={`M${s[0]} ${s[1]} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${e[0]} ${e[1]}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />;
}

function PapelOvalo({ centros = 0, strip = false, o1 = true, o2 = true }: { centros?: 0 | 1 | 2; strip?: boolean; o1?: boolean; o2?: boolean }) {
  return (
    <g>
      <Seg a={OA} b={OB} w={1.8} />
      <Punto p={OA} nombre="A" dx={-16} dy={18} />
      <Punto p={OB} nombre="B" dx={8} dy={18} />
      {o1 ? <Punto p={O1} nombre="O₁" dx={-8} dy={20} color={AZUL} /> : null}
      {o2 ? <Punto p={O2} nombre="O₂" dx={-8} dy={20} color={AZUL} /> : null}
      {centros >= 1 ? <Punto p={O3} nombre="O₃" dx={-9} dy={22} color={VERDE} /> : null}
      {centros >= 2 ? <Punto p={O4} nombre="O₄" dx={-9} dy={-10} color={VERDE} /> : null}
      {strip ? (
        <g>
          <Seg a={O_STRIP[0]} b={O_STRIP[1]} color={AMBAR} w={3} />
          <Seg a={[O_STRIP[0][0], 54]} b={[O_STRIP[0][0], 66]} color={INK} w={1.4} />
          <Seg a={[O_STRIP[1][0], 54]} b={[O_STRIP[1][0], 66]} color={INK} w={1.4} />
          <Txt p={[O_STRIP[0][0], 46]} color={INK}>radio grande 2d = 12 cm</Txt>
        </g>
      ) : null}
    </g>
  );
}

export function OvaloCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 0 ? 15000 : step === 1 ? 4600 : step === 3 ? 4200 : 1);
  // paso 0: el eje mayor se divide en tres partes iguales con el teorema de Thales (compás, regla, escuadra y cartabón)
  const dirR: Pt = [Math.cos((35 * Math.PI) / 180), -Math.sin((35 * Math.PI) / 180)];
  const marcaT = (k: number): Pt => [OA[0] + dirR[0] * k * OD, OA[1] + dirR[1] * k * OD];
  const pt = (a: number, b: number) => (step === 0 ? tramo(p, a, b) : 1);
  const par2 = animParaleloEscuadra(marcaT(3), OB, marcaT(2), [marcaT(2), O2], pt(0.4, 0.7));
  const par1 = animParaleloEscuadra(marcaT(3), OB, marcaT(1), [marcaT(1), O1], pt(0.7, 1));
  const ventana = (k: number) => pt(0.05 + 0.08 * (k - 1), 0.05 + 0.08 * k);
  const poseT = step === 0 ? ([1, 2, 3] as const).map((k) => (ventana(k) > 0 && ventana(k) < 1 ? poseCompas(marcaT(k - 1), enCirculo(marcaT(k - 1), OD, lerp(13, 57, ventana(k)))) : null)).find(Boolean) ?? null : null;
  const a3 = angDe(O3, E1);
  const a4 = angDe(O4, E3);
  return (
    <BenchShell scene="ovalo-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con el eje mayor de un óvalo y su construcción con cuatro arcos">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con el eje mayor de un óvalo y su construcción con cuatro arcos" data-testid="bench-ovalo">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelOvalo centros={step >= 1 && (step > 1 || p > 0.95) ? 2 : 0} o1={step > 0 || par1.listo} o2={step > 0 || par2.listo} />
        {step === 0 ? (
          <g data-testid="bench-ovalo-thales">
            <Seg a={OA} b={[OA[0] + dirR[0] * 4.4 * OD * pt(0, 0.05), OA[1] + dirR[1] * 4.4 * OD * pt(0, 0.05)]} w={1.4} />
            {[1, 2, 3].map((k) => (
              <g key={k}>
                <ArcoAnim c={marcaT(k - 1)} r={OD} a1={13} a2={57} t={ventana(k)} />
                {ventana(k) >= 1 ? <circle cx={marcaT(k)[0]} cy={marcaT(k)[1]} r="3" fill={INK} /> : null}
                {ventana(k) >= 1 ? <Txt p={[marcaT(k)[0] - 16, marcaT(k)[1] - 6]}>{String(k)}</Txt> : null}
              </g>
            ))}
            {p >= 0.3 ? <ReglaTrazando a={marcaT(3)} b={OB} p={pt(0.3, 0.38)} ext={0} color={VERDE} /> : null}
            {par2.nodos}
            {par1.nodos}
          </g>
        ) : null}
        {poseT ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={poseT.pose} open={poseT.open} />
          </g>
        ) : null}
        {step >= 1 ? (
          <g data-testid="bench-ovalo-circulos">
            <ArcoAnim c={O1} r={OD} a1={0} a2={360} t={step === 1 ? tramo(p, 0, 0.5) : 1} />
            <ArcoAnim c={O2} r={OD} a1={180} a2={540} t={step === 1 ? tramo(p, 0.5, 1) : 1} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-testid="bench-ovalo-rectas">
            {[[O3, E1], [O3, E2], [O4, E3], [O4, E4]].map(([a, b], i) => (
              <Seg key={i} a={a} b={b} color={AUX} w={1.1} dash="6 4" />
            ))}
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-ovalo-grandes">
            <ArcoAnim c={O3} r={2 * OD} a1={a3} a2={a3 + 60} t={step === 3 ? tramo(p, 0, 0.5) : 1} />
            <ArcoAnim c={O4} r={2 * OD} a1={a4 - 60} a2={a4} t={step === 3 ? tramo(p, 0.5, 1) : 1} />
          </g>
        ) : null}
        {step >= 4 ? (
          <g data-testid="bench-ovalo-pequenos">
            {arcoPath(O1, OD, E3, E1, INK, 2.4)}
            {arcoPath(O2, OD, E2, E4, INK, 2.4)}
            {arcoPath(O3, 2 * OD, E1, E2, INK, 2.4)}
            {arcoPath(O4, 2 * OD, E4, E3, INK, 2.4)}
          </g>
        ) : null}
        {step >= 5 ? <Txt p={[190, 345]} color={VERDE} size={14}>cuatro arcos tangentes; dos ejes de simetría (no es una elipse)</Txt> : null}
        {[E1, E2, E3, E4].map((e, i) => (step >= 3 ? <circle key={i} cx={e[0]} cy={e[1]} r="3" fill={AMBAR} /> : null))}
      </svg>
    </BenchShell>
  );
}

const defOvalo: Def = {
  scene: "ovalo-practica",
  fases: ["medida", "centro", "arco", "centro", "arco", "punto", "punto", "trazo", "trazo", "trazo", "trazo", "medida", "centro", "arco", "centro", "arco", "medida", "centro", "arco", "centro", "arco"],
  principales: [2, 3, 4, 5],
  extTrazo: 90,
  papel: (est: Est) => <PapelOvalo centros={est.fase >= 7 ? 2 : est.fase >= 6 ? 1 : 0} strip />,
  candidatos: (_est, idx) => [[O1], [O2], [O3], [O4], [O1], [O2]][idx] ?? [],
  medibles: (est) => (est.fase === 11 ? O_STRIP : [O1, O2]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [30, 160],
  radioIni: () => 80,
  rhoIni: (n) => (n < 2 ? 35 : 0),
  arco: (_est, n, _r, c) => {
    if (n === 0) return { centro: c, base: angDe(O1, O2), signo: 1, rhoMin: -100, rhoMax: 100, req: [-68, 68] };
    if (n === 1) return { centro: c, base: angDe(O2, O1), signo: 1, rhoMin: -100, rhoMax: 100, req: [-68, 68] };
    if (n === 2) return { centro: c, base: -90, signo: 1, rhoMin: -45, rhoMax: 45, req: [-26, 26] };
    if (n === 3) return { centro: c, base: 90, signo: 1, rhoMin: -45, rhoMax: 45, req: [-26, 26] };
    return { centro: c, base: n === 4 ? 180 : 0, signo: 1, rhoMin: -75, rhoMax: 75, req: [-50, 50] };
  },
  cortes: (est) => {
    if (est.fase === 5) return [O3];
    if (est.fase === 6) return [O4];
    if (est.fase === 7) return [O3, O1];
    if (est.fase === 8) return [O3, O2];
    if (est.fase === 9) return [O4, O1];
    return [O4, O2];
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: los arcos enlazan sobre las rectas que unen los centros, así que son tangentes entre sí. Tienes un óvalo de cuatro arcos con dos ejes de simetría." }),
};

export function OvaloPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defOvalo} vista={vista} />;
}

/* ───────────── 5. Espiral de dos centros y evolvente ───────────── */

const SD = 36;
const SA: Pt = [270, 190];
const SB: Pt = [SA[0] + SD, 190];
/** Extremo k de cada semicircunferencia sobre el eje (E0 = B). */
const SE: Pt[] = [SB, [SA[0] - SD, 190], [SB[0] + 2 * SD, 190], [SA[0] - 3 * SD, 190], [SB[0] + 4 * SD, 190]];
const sCentro = (k: number): Pt => (k % 2 === 1 ? SA : SB);

function semi(k: number, color = INK, w = 2.2) {
  const c = sCentro(k);
  const r = k * SD;
  return arcoPath(c, r, SE[k - 1], SE[k], color, w);
}

function PapelEspiral({ hasta = 0 }: { hasta?: number }) {
  return (
    <g>
      <Seg a={[SE[3][0] - 40, 190]} b={[SE[4][0] + 40, 190]} color={AUX} w={0.9} dash="4 4" />
      <Punto p={SA} nombre="A" dx={-6} dy={20} color={AZUL} />
      <Punto p={SB} nombre="B" dx={-2} dy={20} color={AZUL} />
      {SE.slice(1, hasta + 1).map((e, i) => (
        <circle key={i} cx={e[0]} cy={e[1]} r="2.6" fill={AMBAR} />
      ))}
      {Array.from({ length: hasta }, (_, i) => (
        <g key={i}>{semi(i + 1)}</g>
      ))}
    </g>
  );
}

export function EspiralCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, 3600);
  const k = step;
  const c = k >= 1 ? sCentro(k) : SA;
  const a1 = k % 2 === 1 ? 0 : 180;
  const comp = k >= 1 && k <= 4 && p < 1 ? poseCompas(c, enCirculo(c, k * SD, a1 + 180 * p)) : null;
  return (
    <BenchShell scene="espiral-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con dos centros y una espiral de semicircunferencias">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con dos centros y una espiral de semicircunferencias" data-testid="bench-espiral">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelEspiral hasta={step >= 1 ? step - 1 : 0} />
        {k >= 1 ? (p < 1 ? <ArcoAnim c={c} r={k * SD} a1={a1} a2={a1 + 180} t={p} /> : <g>{semi(k)}</g>) : null}
        {k >= 1 ? <Txt p={[400, 80]} color={AMBAR} size={15}>{`radio ${k}d = ${(k * SD) / 10} cm`}</Txt> : <Txt p={[400, 80]} color={AMBAR} size={15}>{`d = AB = ${SD / 10} cm`}</Txt>}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

const defEspiral: Def = {
  scene: "espiral-practica",
  fases: Array.from({ length: 4 }, () => ["medida", "centro", "arco"] as const).flat(),
  principales: [0, 1, 2, 3],
  papel: (est: Est) => <PapelEspiralFija hasta={Math.min(4, Math.floor(est.fase / 3))} />,
  candidatos: (_est, idx) => [sCentro(idx + 1)],
  medibles: (est) => {
    const k = Math.floor(est.fase / 3) + 1;
    return [sCentro(k), SE[k - 1]];
  },
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [30, 170],
  radioIni: () => 80,
  rhoIni: () => -90,
  arco: (_est, n, _r, c) => ({ centro: c, base: n % 2 === 0 ? 90 : 270, signo: 1, rhoMin: -90, rhoMax: 90, req: [-80, 80] }),
  cortes: () => [],
  evaluar: () => ({ ok: true, mensaje: "Correcto: cada semicircunferencia empieza donde acaba la anterior y su radio crece una vez d. Los centros A y B se alternan y los arcos son tangentes entre sí." }),
};

/** Papel de la espiral: los arcos ya dibujados por el motor no se repiten aquí; solo los centros y los extremos. */
function PapelEspiralFija({ hasta }: { hasta: number }) {
  return (
    <g>
      <Seg a={[SE[3][0] - 40, 190]} b={[SE[4][0] + 40, 190]} color={AUX} w={0.9} dash="4 4" />
      <Punto p={SA} nombre="A" dx={-6} dy={20} color={AZUL} />
      <Punto p={SB} nombre="B" dx={-2} dy={20} color={AZUL} />
      {SE.slice(1, hasta + 1).map((e, i) => (
        <circle key={i} cx={e[0]} cy={e[1]} r="2.6" fill={AMBAR} />
      ))}
    </g>
  );
}

export function EspiralPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defEspiral} vista={vista} />;
}

const VC: Pt = [290, 200];
const VR = 22;
const evolvente = (t: number): Pt => [VC[0] + VR * (Math.cos(t) + t * Math.sin(t)), VC[1] - VR * (Math.sin(t) - t * Math.cos(t))];
const tangencia = (t: number): Pt => [VC[0] + VR * Math.cos(t), VC[1] - VR * Math.sin(t)];

export function EvolventeHilo({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 2600 : step === 2 ? 4600 : 1);
  const tMax = step === 0 ? 0 : step === 1 ? lerp(0, Math.PI / 2, p) : step === 2 ? lerp(Math.PI / 2, 2 * Math.PI, p) : 2 * Math.PI;
  const puntos = Array.from({ length: 81 }, (_, i) => evolvente((tMax * i) / 80));
  const tHilo = step === 3 ? Math.PI * 1.25 : tMax;
  const Q = tangencia(tHilo);
  const P = evolvente(tHilo);
  return (
    <BenchShell scene="evolvente-hilo" notes={block.notes} step={step} setStep={setStep} label="Hoja con una circunferencia y la evolvente que traza el extremo de un hilo">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con una circunferencia y la evolvente que traza el extremo de un hilo" data-testid="bench-evolvente">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <Circulo c={VC} r={VR} />
        <circle cx={VC[0]} cy={VC[1]} r="2.4" fill={INK} />
        {step >= 1 ? <polyline points={puntos.map((q) => q.join(",")).join(" ")} fill="none" stroke={VERDE} strokeWidth="2" data-testid="bench-evolvente-curva" /> : null}
        {step >= 1 ? (
          <g>
            <Seg a={Q} b={P} color={AMBAR} w={1.8} />
            <circle cx={P[0]} cy={P[1]} r="3.4" fill={AMBAR} />
          </g>
        ) : (
          <circle cx={VC[0] + VR} cy={VC[1]} r="3.4" fill={AMBAR} />
        )}
        {step === 3 ? (
          <g data-testid="bench-evolvente-normal">
            <Seg a={VC} b={Q} color={AZUL} w={1.2} dash="4 4" />
            <Recto v={Q} a={VC} b={P} color={AZUL} s={9} />
            <Txt p={[330, 70]} color={AMBAR} size={14}>El hilo: tangente a la circunferencia</Txt>
            <Txt p={[330, 92]} color={VERDE} size={14}>y normal a la evolvente</Txt>
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/** Geometría de las escenas, para los tests. */
export const TANGENCIAS_GEOM = { TO, TP, TM, T_ARRIBA, T_ABAJO, CT_O, CT_T, CT_C, CT_SEG, EV0, E_T1, E_T2, E_C, E_SEG, O1, O2, O3, O4, O_STRIP, SA, SB, SE, SD };
