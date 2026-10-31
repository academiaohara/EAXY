"use client";

import { useState } from "react";
import { angDe, dist, enCirculo, reflejarPunto, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SANS, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, SNAP, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { poligono } from "./scenes-transformaciones";
import { Punto } from "./scenes-trazados";

/* ───────────── Simetría axial con compás ───────────── */

const E1: Pt = [260, 40];
const E2: Pt = [320, 350];
const eje = (t: number): Pt => lerpP(E1, E2, t);
const SP = eje(0.3);
const SQ = eje(0.75);
const SA: Pt = [130, 240];
const SB: Pt = [190, 130];
const SC: Pt = [205, 300];
const refl = (p: Pt) => reflejarPunto(p, E1, E2);
const SA2 = refl(SA);
const SB2 = refl(SB);
const SC2 = refl(SC);
const norm180 = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;
const etiqueta = { stroke: "#fffefa", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

/** Arco centrado en `c` que pasa por `a` y por su simétrico: de uno a otro, algo más largo por los dos lados. */
function arcoPorSimetrico(c: Pt, a: Pt, a2: Pt, margen = 12) {
  const aA = angDe(c, a);
  const delta = norm180(angDe(c, a2) - aA);
  const s = delta >= 0 ? 1 : -1;
  return { a1: aA - s * margen, a2: aA + delta + s * margen };
}

export function PapelSimetria({ imagen = 0, puntos = 1 }: { imagen?: number; puntos?: number }) {
  const t = imagen;
  const orig: Pt[] = [SA, SB, SC];
  const sim: Pt[] = [SA2, SB2, SC2];
  return (
    <g>
      <line x1={E1[0] - 2} y1={E1[1] - 15} x2={E2[0] + 2} y2={E2[1] + 15} stroke={AZUL} strokeWidth="1.6" strokeDasharray="10 5" />
      <text x={E1[0] + 10} y={E1[1] - 2} fontSize="15" fontWeight="800" fill={AZUL} fontFamily={SANS} {...etiqueta}>
        e
      </text>
      <path d={poligono(orig)} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <Punto p={SA} nombre="A" dx={-16} dy={16} />
      <Punto p={SB} nombre="B" dx={-16} dy={-6} />
      <Punto p={SC} nombre="C" dx={-16} dy={16} />
      <g opacity={puntos}>
        <Punto p={SP} nombre="P" dx={8} dy={-6} color={AZUL} />
        <Punto p={SQ} nombre="Q" dx={8} dy={16} color={AZUL} />
      </g>
      {t > 0 ? (
        <g data-testid="bench-imagen">
          {orig.map((o, i) => (
            <line key={i} x1={o[0]} y1={o[1]} x2={lerpP(o, sim[i], tramo(t, 0, 0.35))[0]} y2={lerpP(o, sim[i], tramo(t, 0, 0.35))[1]} stroke={AMBAR} strokeWidth="1.3" strokeDasharray="6 5" />
          ))}
          {sim.map((p, i) => {
            const q = sim[(i + 1) % 3];
            const f = tramo(t, 0.35 + i * 0.2, 0.55 + i * 0.2);
            const fin = lerpP(p, q, f);
            return f > 0 ? <line key={`t${i}`} x1={p[0]} y1={p[1]} x2={fin[0]} y2={fin[1]} stroke={VERDE} strokeWidth="2" strokeLinecap="round" /> : null;
          })}
          <g opacity={tramo(t, 0.9, 1)}>
            <Punto p={SB2} nombre="B′" dx={8} dy={-6} color={VERDE} />
            <Punto p={SC2} nombre="C′" dx={8} dy={16} color={VERDE} />
            <Punto p={SA2} nombre="A′" dx={8} dy={16} color={VERDE} />
          </g>
        </g>
      ) : null}
    </g>
  );
}

export function SimetriaCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 1500 : step === 2 || step === 3 ? 3400 : step === 4 ? 4200 : 1);
  const aP = arcoPorSimetrico(SP, SA, SA2);
  const aQ = arcoPorSimetrico(SQ, SA, SA2);
  const rP = dist(SP, SA);
  const rQ = dist(SQ, SA);
  const tP = step === 2 ? p : step > 2 ? 1 : 0;
  const tQ = step === 3 ? p : step > 3 ? 1 : 0;
  const puntos = step === 1 ? tramo(p, 0, 0.6) : step > 1 ? 1 : 0;

  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 2) comp = poseCompas(SP, enCirculo(SP, rP, aP.a1 + (aP.a2 - aP.a1) * tP));
  else if (step === 3) comp = poseCompas(SQ, enCirculo(SQ, rQ, aQ.a1 + (aQ.a2 - aQ.a1) * tQ));

  return (
    <BenchShell scene="simetria-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un eje, un triángulo y la construcción de su simétrico con compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un eje, un triángulo y la construcción de su simétrico con compás" data-testid="bench-simetria">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelSimetria imagen={step === 4 ? p : step > 4 ? 1 : 0} puntos={puntos} />
        {step >= 2 ? (
          <g data-testid="bench-arco-p">
            <ArcoAnim c={SP} r={rP} a1={aP.a1} a2={aP.a2} t={tP} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-arco-q">
            <ArcoAnim c={SQ} r={rQ} a1={aQ.a1} a2={aQ.a2} t={tQ} />
          </g>
        ) : null}
        {step === 3 && tQ > 0.9 ? <Punto p={SA2} nombre="A′" dx={8} dy={16} color={VERDE} /> : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Simetría axial: práctica paso a paso ───────────── */

export const SIM_ORIG: Pt[] = [SA, SB, SC];
export const SIM_IMG: Pt[] = [SA2, SB2, SC2];
const NOMBRES = ["A", "B", "C"];

/** Práctica de hallar el simétrico del vértice `v` (0 = A, 1 = B, 2 = C); los anteriores se muestran ya hallados. */
export function defSimetria(v: number): Def {
  const P0 = SIM_ORIG[v];
  const P2 = SIM_IMG[v];
  const n = NOMBRES[v];
  return {
    scene: "simetria-practica",
    fases: ["medida", "centro", "arco", "medida", "centro", "arco", "regla"],
    nClics: 1,
    papel: (est: Est) => (
      <g>
        <PapelSimetria puntos={1} />
        {SIM_IMG.slice(0, v).map((q, i) => (
          <Punto key={i} p={q} nombre={`${NOMBRES[i]}′`} dx={8} dy={i === 1 ? -6 : 16} color={VERDE} />
        ))}
        {est.fase >= 7 ? <Punto p={P2} nombre={`${n}′`} dx={8} dy={v === 1 ? -6 : 16} color={VERDE} /> : null}
      </g>
    ),
    candidatos: (_est, idx) => (idx === 0 ? [SP] : [SQ]),
    medibles: (est) => (est.fase === 0 ? [SP, P0] : [SQ, P0]),
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 215],
    radioIni: () => 100,
    rhoIni: () => -25,
    arco: (_est, _n, _radio, c) => ({ centro: c, base: angDe(c, P2), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
    cortes: () => [P2],
    evaluar: (est) => {
      const [p1] = est.clics;
      if (!p1) return { ok: false, mensaje: `Falta marcar el punto ${n}′.` };
      return dist(p1, P2) <= SNAP + 2
        ? { ok: true, mensaje: `Correcto: ${n}′ es simétrico de ${n} respecto de e: está a la misma distancia de P y de Q que ${n}, así que el eje e es la mediatriz de ${n}${n}′.` }
        : { ok: false, mensaje: `Ese punto no es ${n}′: ${n}′ es donde se cortan los dos arcos (el otro punto de corte es ${n}). Pulsa «Reintentar».` };
    },
  };
}
