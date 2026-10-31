"use client";

import { useState } from "react";
import { angDe, dist, enCirculo, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SANS, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, SNAP, lerp, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { CELDA, CuadriculaEjercicio, gp, poligono } from "./scenes-transformaciones";
import { Punto } from "./scenes-trazados";

const etiqueta = { stroke: "#fffefa", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

/* ───────────── Homotecia de razón 2 con compás: explicación animada ───────────── */

const HO: Pt = [120, 300];
const HA: Pt = [220, 300];
const HB: Pt = [250, 220];
const HC: Pt = [190, 240];
const K = 2;
const homot = (p: Pt, k = K): Pt => [HO[0] + k * (p[0] - HO[0]), HO[1] + k * (p[1] - HO[1])];
const HA2 = homot(HA);
const HB2 = homot(HB);
const HC2 = homot(HC);

function PapelHomotecia({ rayos = 0, imagen = 0 }: { rayos?: number; imagen?: number }) {
  const orig: Pt[] = [HA, HB, HC];
  const img: Pt[] = [HA2, HB2, HC2];
  return (
    <g>
      {rayos > 0 ? (
        <g data-testid="bench-rayos-homotecia">
          {orig.map((o, i) => {
            const fin = lerpP(HO, homot(o, 2.35), tramo(rayos, i * 0.25, i * 0.25 + 0.5));
            return <line key={i} x1={HO[0]} y1={HO[1]} x2={fin[0]} y2={fin[1]} stroke={INK} strokeWidth="1" strokeDasharray="6 4" />;
          })}
        </g>
      ) : null}
      <path d={poligono(orig)} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <Punto p={HO} nombre="O" dx={-18} dy={18} color={AZUL} />
      <Punto p={HA} nombre="A" dx={-6} dy={18} />
      <Punto p={HB} nombre="B" dx={-18} dy={-6} />
      <Punto p={HC} nombre="C" dx={-18} dy={-4} />
      {imagen > 0 ? (
        <g data-testid="bench-homotetica">
          {img.map((p, i) => {
            const q = img[(i + 1) % 3];
            const f = tramo(imagen, i * 0.28, i * 0.28 + 0.4);
            const fin = lerpP(p, q, f);
            return f > 0 ? <line key={i} x1={p[0]} y1={p[1]} x2={fin[0]} y2={fin[1]} stroke={VERDE} strokeWidth="2" strokeLinecap="round" /> : null;
          })}
          <g opacity={tramo(imagen, 0.85, 1)}>
            <Punto p={HA2} nombre="A′" dx={6} dy={18} color={VERDE} />
            <Punto p={HB2} nombre="B′" dx={8} dy={-6} color={VERDE} />
            <Punto p={HC2} nombre="C′" dx={-22} dy={-6} color={VERDE} />
            <text x={HB2[0] + 16} y={HB2[1] + 34} fontSize="13" fontWeight="700" fill={VERDE} fontFamily={SANS} {...etiqueta}>
              B′C′ ∥ BC · B′C′ = 2·BC
            </text>
          </g>
        </g>
      ) : null}
    </g>
  );
}

export function HomoteciaCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 2400 : step === 3 ? 3200 : step === 4 ? 4200 : 1);
  const r = dist(HO, HA);
  const S = 26;
  const tArco = step === 3 ? p : step > 3 ? 1 : 0;
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 2) comp = poseCompas(HO, HA);
  else if (step === 3) comp = poseCompas(HA, enCirculo(HA, r, lerp(-S, S, tArco)));

  return (
    <BenchShell scene="homotecia-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un triángulo, un centro de homotecia y la construcción de su imagen con compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un triángulo, un centro de homotecia y la construcción de su imagen con compás" data-testid="bench-homotecia">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelHomotecia rayos={step === 1 ? p : step > 1 ? 1 : 0} imagen={step === 4 ? p : step > 4 ? 1 : 0} />
        {step === 2 ? <line x1={HO[0]} y1={HO[1]} x2={HA[0]} y2={HA[1]} stroke={AMBAR} strokeWidth="3" strokeDasharray="7 5" data-testid="bench-medida-oa" /> : null}
        {step >= 3 ? (
          <g data-testid="bench-arco-homotecia">
            <ArcoAnim c={HA} r={r} a1={-S} a2={S} t={tArco} />
          </g>
        ) : null}
        {step === 3 && tArco > 0.9 ? <Punto p={HA2} nombre="A′" dx={6} dy={18} color={VERDE} /> : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Homotecia: práctica paso a paso ───────────── */

const defHomotecia: Def = {
  scene: "homotecia-practica",
  fases: ["medida", "centro", "arco", "regla"],
  nClics: 1,
  papel: (est: Est) => (
    <g>
      <PapelHomotecia />
      <line x1={HO[0]} y1={HO[1]} x2={HO[0] + 2.4 * (HA[0] - HO[0])} y2={HO[1]} stroke={INK} strokeWidth="1" strokeDasharray="6 4" />
      {est.fase >= 4 ? <Punto p={HA2} nombre="A′" dx={6} dy={18} color={VERDE} /> : null}
    </g>
  ),
  medibles: () => [HO, HA],
  candidatos: () => [HA],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 200],
  radioIni: () => 100,
  rhoIni: () => -25,
  arco: (_est, _n, _radio, c) => ({ centro: c, base: angDe(c, HA2), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [HA2],
  evaluar: (est) => {
    const [p1] = est.clics;
    if (!p1) return { ok: false, mensaje: "Falta marcar el punto A′." };
    return dist(p1, HA2) <= SNAP + 2
      ? { ok: true, mensaje: "Correcto: A′ está en la semirrecta OA, a doble distancia de O que A (OA′ = 2·OA), porque el compás ha llevado la longitud OA a continuación de A." }
      : { ok: false, mensaje: "Ese punto no es A′: el arco corta a la recta OA en dos puntos, O y A′, y A′ es el que está más lejos de O. Pulsa «Reintentar»." };
  },
};

export function HomoteciaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defHomotecia} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Homotecia en papel cuadriculado ───────────── */

const CENTRO: [number, number] = [8, 7];
const FIG_H: [number, number][] = [[10, 7], [10, 5], [9, 6]];

export function HomoteciaCuadricula({ block }: { block: BenchBlock }) {
  const raw = Math.round(block.params?.a ?? 2);
  const k = raw === 3 ? 3 : raw === -1 ? -1 : raw === -2 ? -2 : 2;
  const esperado = FIG_H.map(([x, y]) => [CENTRO[0] + k * (x - CENTRO[0]), CENTRO[1] + k * (y - CENTRO[1])] as [number, number]);
  const o = gp(CENTRO);
  return (
    <CuadriculaEjercicio
      block={block}
      scene="homotecia-cuadricula"
      figura={FIG_H}
      esperado={esperado}
      flechas
      mensajeOk={`Correcto: cada vértice queda en la recta que lo une con O, a ${Math.abs(k)} ${Math.abs(k) === 1 ? "vez" : "veces"} su distancia a O${k < 0 ? " y al otro lado de O" : ""}. La figura obtenida es semejante a la original, con razón ${k}.`}
      decoracion={
        <g>
          <clipPath id="homotecia-rejilla">
            <rect x={22} y={22} width={24 * CELDA} height={14 * CELDA} />
          </clipPath>
          <g clipPath="url(#homotecia-rejilla)">
          {FIG_H.map((g, i) => {
            const v = gp(g);
            const dx = v[0] - o[0];
            const dy = v[1] - o[1];
            const largo = 14;
            return <line key={i} x1={o[0] - dx * (k < 0 ? largo : 0)} y1={o[1] - dy * (k < 0 ? largo : 0)} x2={o[0] + dx * largo} y2={o[1] + dy * largo} stroke={INK} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="6 4" />;
          })}
          </g>
          <Punto p={o} nombre="O" dx={-18} dy={18} color={AZUL} />
          <text x={34} y={48} fontSize="17" fontWeight="800" fill={AMBAR} fontFamily={SANS} {...etiqueta}>
            k = {k}
          </text>
        </g>
      }
    />
  );
}

