"use client";

import { useState } from "react";
import { angDe, dist, enCirculo, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, BenchShell, INK, SANS, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, SNAP, lerp, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { Punto } from "./scenes-trazados";

/** Flecha de `a` a `b`, con punta. */
export function Flecha({ a, b, color = INK, grosor = 2, discontinua = false, opacidad = 1 }: { a: Pt; b: Pt; color?: string; grosor?: number; discontinua?: boolean; opacidad?: number }) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const l = 11;
  const p1: Pt = [b[0] - l * Math.cos(ang - 0.4), b[1] - l * Math.sin(ang - 0.4)];
  const p2: Pt = [b[0] - l * Math.cos(ang + 0.4), b[1] - l * Math.sin(ang + 0.4)];
  return (
    <g opacity={opacidad}>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={grosor} strokeDasharray={discontinua ? "6 5" : undefined} strokeLinecap="round" />
      <path d={`M${b[0]} ${b[1]} L${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} Z`} fill={color} />
    </g>
  );
}

export const poligono = (pts: Pt[]) => `M${pts.map((p) => `${p[0]} ${p[1]}`).join(" L")} Z`;

/* ───────────── Traslación con compás (método del paralelogramo) ───────────── */

const TA: Pt = [100, 270];
const TB: Pt = [200, 170];
const TC: Pt = [250, 290];
const VEC: Pt = [170, -40];
const mas = (p: Pt, v: Pt): Pt => [p[0] + v[0], p[1] + v[1]];
const TA2 = mas(TA, VEC);
const TB2 = mas(TB, VEC);
const TC2 = mas(TC, VEC);

export function PapelTraslacion({ imagen, etiquetas }: { imagen?: number; etiquetas: { a2: boolean; b2: boolean; c2: boolean } }) {
  const t = imagen ?? 0;
  const tri2: Pt[] = [TA2, TB2, TC2];
  return (
    <g>
      <path d={poligono([TA, TB, TC])} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <Punto p={TA} nombre="A" dx={-16} dy={16} />
      <Punto p={TB} nombre="B" dx={-16} dy={-6} />
      <Punto p={TC} nombre="C" dx={6} dy={16} />
      <Flecha a={TA} b={TA2} color={AMBAR} grosor={2.4} />
      <text x={(TA[0] + TA2[0]) / 2 - 4} y={(TA[1] + TA2[1]) / 2 + 20} fontSize="14" fontWeight="800" fill={AMBAR} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
        v
      </text>
      {etiquetas.a2 ? <Punto p={TA2} nombre="A′" dx={6} dy={16} /> : null}
      {t > 0 ? (
        <g data-testid="bench-imagen">
          <Flecha a={TB} b={TB2} color={AMBAR} grosor={1.6} discontinua opacidad={tramo(t, 0, 0.3)} />
          <Flecha a={TC} b={TC2} color={AMBAR} grosor={1.6} discontinua opacidad={tramo(t, 0, 0.3)} />
          {tri2.map((p, i) => {
            const q = tri2[(i + 1) % 3];
            const f = tramo(t, 0.3 + i * 0.23, 0.53 + i * 0.23);
            const fin = lerpP(p, q, f);
            return f > 0 ? <line key={i} x1={p[0]} y1={p[1]} x2={fin[0]} y2={fin[1]} stroke={VERDE} strokeWidth="2" strokeLinecap="round" /> : null;
          })}
          <g opacity={tramo(t, 0.85, 1)}>
            <Punto p={TB2} nombre="B′" dx={8} dy={-6} color={VERDE} />
            <Punto p={TC2} nombre="C′" dx={6} dy={16} color={VERDE} />
          </g>
        </g>
      ) : null}
    </g>
  );
}

export function TraslacionCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 2 || step === 3 ? 3000 : step === 4 ? 4200 : 1);
  const lv = dist(TA, TA2);
  const lab = dist(TA, TB);
  const aB2 = angDe(TB, TB2);
  const aB2desdeA2 = angDe(TA2, TB2);
  const S = 24;
  const tB = step === 2 ? p : step > 2 ? 1 : 0;
  const tA2 = step === 3 ? p : step > 3 ? 1 : 0;

  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 1) comp = poseCompas(TA, TA2);
  else if (step === 2) comp = poseCompas(TB, enCirculo(TB, lv, lerp(aB2 - S, aB2 + S, tB)));
  else if (step === 3) comp = poseCompas(TA2, enCirculo(TA2, lab, lerp(aB2desdeA2 + S, aB2desdeA2 - S, tA2)));

  return (
    <BenchShell scene="traslacion-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un triángulo, un vector y la construcción de su traslación con compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un triángulo, un vector y la construcción de su traslación con compás" data-testid="bench-traslacion">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelTraslacion imagen={step === 4 ? p : step > 4 ? 1 : 0} etiquetas={{ a2: true, b2: false, c2: false }} />
        {step >= 2 ? (
          <g data-testid="bench-arco-b">
            <ArcoAnim c={TB} r={lv} a1={aB2 - S} a2={aB2 + S} t={tB} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-arco-a2">
            <ArcoAnim c={TA2} r={lab} a1={aB2desdeA2 + S} a2={aB2desdeA2 - S} t={tA2} />
          </g>
        ) : null}
        {step === 1 ? <line x1={TA[0]} y1={TA[1]} x2={TA2[0]} y2={TA2[1]} stroke={AMBAR} strokeWidth="3" strokeDasharray="7 5" data-testid="bench-medida-v" /> : null}
        {step === 3 && tA2 > 0.9 ? <Punto p={TB2} nombre="B′" dx={8} dy={-6} color={VERDE} /> : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

export const TRAS_ORIG: Pt[] = [TA, TB, TC];
export const TRAS_IMG: Pt[] = [TA2, TB2, TC2];
const NOMBRES = ["A", "B", "C"];

/** Práctica de trasladar el vértice `v` (1 = B, 2 = C) con el método del paralelogramo; lo anterior se muestra ya hecho. */
export function defTraslacion(v: number): Def {
  const P = TRAS_ORIG[v];
  const P2 = TRAS_IMG[v];
  const n = NOMBRES[v];
  return {
    scene: "traslacion-practica",
    fases: ["medida", "centro", "arco", "medida", "centro", "arco", "regla"],
    nClics: 1,
    papel: (est: Est) => (
      <g>
        <path d={poligono([TA, TB, TC])} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
        <Punto p={TA} nombre="A" dx={-16} dy={16} />
        <Punto p={TB} nombre="B" dx={-16} dy={-6} />
        <Punto p={TC} nombre="C" dx={6} dy={16} />
        <Flecha a={TA} b={TA2} color={AMBAR} grosor={2.4} />
        <Punto p={TA2} nombre="A′" dx={6} dy={16} />
        {v > 1 ? <Punto p={TB2} nombre="B′" dx={8} dy={-6} color={VERDE} /> : null}
        {est.fase >= 7 ? <Punto p={P2} nombre={`${n}′`} dx={8} dy={v === 1 ? -6 : 16} color={VERDE} /> : null}
      </g>
    ),
    candidatos: (_est, idx) => (idx === 0 ? [P] : [TA2]),
    medibles: (est) => (est.fase === 0 ? [TA, TA2] : [TA, P]),
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 200],
    radioIni: () => 100,
    rhoIni: () => -25,
    arco: (_est, _n, _radio, c) => ({ centro: c, base: angDe(c, P2), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
    cortes: () => [P2],
    evaluar: (est) => {
      const [p1] = est.clics;
      if (!p1) return { ok: false, mensaje: `Falta marcar el punto ${n}′.` };
      return dist(p1, P2) <= SNAP + 2
        ? { ok: true, mensaje: `Correcto: ${n}′ es el cuarto vértice del paralelogramo AA′${n}′${n}, así que ${n}${n}′ es igual y paralelo a AA′: ${n} se ha trasladado según el vector v.` }
        : { ok: false, mensaje: `Ese punto no es ${n}′: ${n}′ es donde se cortan los dos arcos. Pulsa «Reintentar».` };
    },
  };
}
