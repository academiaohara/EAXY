"use client";

import { useState } from "react";
import { angDe, clamp, dist, enCirculo, rotarPunto, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, Transportador, poseCompas } from "./instruments";
import { AMBAR, AZUL, Arco, BenchShell, INK, SANS, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, SNAP, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { Punto } from "./scenes-trazados";

export const O: Pt = [180, 290];
export const GA: Pt = [330, 290];
const GB: Pt = [380, 225];
const GC: Pt = [300, 235];
const RA = dist(O, GA);

const poligono = (pts: Pt[]) => `M${pts.map((p) => `${p[0]} ${p[1]}`).join(" L")} Z`;
const etiqueta = { stroke: "#fffefa", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

/** Triángulo original con el centro del giro. */
export function PapelGiro() {
  return (
    <g>
      <path d={poligono([GA, GB, GC])} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <Punto p={O} nombre="O" dx={-18} dy={18} color={AZUL} />
      <Punto p={GA} nombre="A" dx={6} dy={18} />
      <Punto p={GB} nombre="B" dx={8} dy={-6} />
      <Punto p={GC} nombre="C" dx={-18} dy={-6} />
    </g>
  );
}

/* ───────────── Giro: explicación animada ───────────── */

export function GiroCompas({ block }: { block: BenchBlock }) {
  const th = clamp(Math.round(block.params?.a ?? 60), 30, 120);
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 3000 : step === 2 ? 3200 : step === 3 ? 3600 : step === 4 ? 3600 : 1);
  const A2 = rotarPunto(GA, O, th);
  const B2 = rotarPunto(GB, O, th);
  const C2 = rotarPunto(GC, O, th);
  const aB = angDe(O, GB);
  const aC = angDe(O, GC);
  const rB = dist(O, GB);
  const rC = dist(O, GC);
  const largo = 235;

  const rayo = step === 1 ? tramo(p, 0.35, 0.9) : step > 1 ? 1 : 0;
  const tA = step === 2 ? p : step > 2 ? 1 : 0;
  const tBC = step === 3 ? p : step > 3 ? 1 : 0;
  const pf = step === 4 ? p : 1;
  const comp = step === 2 ? poseCompas(O, enCirculo(O, RA, th * tA)) : null;
  const marca = enCirculo(O, 126, th);

  return (
    <BenchShell scene="giro-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un triángulo y el giro de la figura con compás y transportador">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un triángulo y el giro de la figura con compás y transportador" data-testid="bench-giro">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelGiro />
        <line x1={O[0]} y1={O[1]} x2={GA[0]} y2={GA[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" />
        {step === 0 ? (
          <g data-testid="bench-sentido" opacity={tramo(p, 0, 1)}>
            <Arco v={O} a1={0} a2={-th} r={70} color={AMBAR} text={`${th}° ↺`} textSize={15} dr={20} />
          </g>
        ) : null}
        {step === 1 ? (
          <g data-testid="bench-transportador-giro" opacity={tramo(p, 0, 0.35)}>
            <g transform={`translate(${O[0]} ${O[1]}) scale(1.8)`}>
              <Transportador pose={{ x: 0, y: 0, rot: 0 }} r={70} />
            </g>
            <circle cx={marca[0]} cy={marca[1]} r="4.5" fill={AMBAR} stroke="#fff" strokeWidth="1.4" />
          </g>
        ) : null}
        {step >= 1 ? (
          <line x1={O[0]} y1={O[1]} x2={lerpP(O, enCirculo(O, largo, th), rayo)[0]} y2={lerpP(O, enCirculo(O, largo, th), rayo)[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" />
        ) : null}
        {step >= 2 ? (
          <g data-testid="bench-arco-giro-a">
            <ArcoAnim c={O} r={RA} a1={0} a2={th} t={tA} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-arcos-giro-bc">
            <line x1={O[0]} y1={O[1]} x2={GB[0]} y2={GB[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" />
            <line x1={O[0]} y1={O[1]} x2={GC[0]} y2={GC[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" />
            <ArcoAnim c={O} r={rB} a1={aB} a2={aB + th} t={tBC} />
            <ArcoAnim c={O} r={rC} a1={aC} a2={aC + th} t={tBC} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g opacity={step === 2 ? tramo(p, 0.9, 1) : 1}>
            <Punto p={A2} nombre="A′" dx={-20} dy={-6} color={VERDE} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g opacity={step === 3 ? tramo(p, 0.9, 1) : 1}>
            <Punto p={B2} nombre="B′" dx={-20} dy={-6} color={VERDE} />
            <Punto p={C2} nombre="C′" dx={-22} dy={4} color={VERDE} />
          </g>
        ) : null}
        {step >= 4 ? (
          <g data-testid="bench-girada">
            {[A2, B2, C2].map((q, i) => {
              const r = [A2, B2, C2][(i + 1) % 3];
              const f = tramo(pf, i * 0.3, i * 0.3 + 0.4);
              const fin = lerpP(q, r, f);
              return f > 0 ? <line key={i} x1={q[0]} y1={q[1]} x2={fin[0]} y2={fin[1]} stroke={VERDE} strokeWidth="2" strokeLinecap="round" /> : null;
            })}
            <g opacity={tramo(pf, 0.8, 1)}>
              <Arco v={O} a1={0} a2={-th} r={60} color={AMBAR} text={`${th}°`} textSize={14} dr={18} />
              <text x={O[0] + 8} y={O[1] + 38} fontSize="13" fontWeight="700" fill={INK} fontFamily={SANS} {...etiqueta}>
                OA = OA′
              </text>
            </g>
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

/* ───────────── Giro: práctica paso a paso ───────────── */

export const GIRO_ORIG: Pt[] = [GA, GB, GC];
export const GIRO_CENTRO = O;
const NOMBRES = ["A", "B", "C"];

/** Práctica de girar el vértice `v` (0 = A, 1 = B, 2 = C); los anteriores se muestran ya girados. */
export function defGiro(th: number, v: number): Def {
  const P = GIRO_ORIG[v];
  const P2 = rotarPunto(P, O, th);
  const n = NOMBRES[v];
  const rayoLargo = 235;
  const dados = GIRO_ORIG.slice(0, v).map((q, i) => ({ p: rotarPunto(q, O, th), n: `${NOMBRES[i]}′` }));
  return {
    scene: "giro-practica",
    fases: ["angulo", "medida", "centro", "arco", "regla"],
    nClics: 1,
    papel: (est: Est) => (
      <g>
        <PapelGiro />
        <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" />
        {est.fase >= 1 ? <line x1={O[0]} y1={O[1]} x2={enCirculo(O, rayoLargo, angDe(O, P) + th)[0]} y2={enCirculo(O, rayoLargo, angDe(O, P) + th)[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" /> : null}
        {dados.map((d) => (
          <Punto key={d.n} p={d.p} nombre={d.n} dx={-22} dy={-6} color={VERDE} />
        ))}
        {est.fase >= 5 ? <Punto p={P2} nombre={`${n}′`} dx={-22} dy={-6} color={VERDE} /> : null}
      </g>
    ),
    angulo: () => ({ centro: O, base: angDe(O, P), objetivo: th, largo: rayoLargo }),
    medibles: () => [O, P],
    candidatos: () => [O],
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 215],
    radioIni: () => dist(O, P),
    rhoIni: () => -th,
    arco: (_est, _n, _radio, c) => ({ centro: c, base: angDe(c, P2), signo: 1, rhoMin: -(th + 25), rhoMax: 40, req: [-8, 8] }),
    cortes: () => [P2],
    evaluar: (est) => {
      const [p1] = est.clics;
      if (!p1) return { ok: false, mensaje: `Falta marcar el punto ${n}′.` };
      return dist(p1, P2) <= SNAP + 2
        ? { ok: true, mensaje: `Correcto: ${n}′ está a la misma distancia de O que ${n} (O${n} = O${n}′) y el ángulo ${n}O${n}′ mide ${th}°.` }
        : { ok: false, mensaje: `Ese punto no es ${n}′: ${n}′ es donde el arco de radio O${n} corta al segundo lado del ángulo. Pulsa «Reintentar».` };
    },
  };
}
