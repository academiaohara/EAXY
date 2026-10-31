"use client";

import { useState } from "react";
import { angDe, clamp, dist, enCirculo, rotarPunto, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, Transportador, poseCompas } from "./instruments";
import { AMBAR, AZUL, Arco, BenchShell, INK, SANS, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, SNAP, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { CELDA, CuadriculaEjercicio, gp } from "./scenes-transformaciones";
import { ArcoPlano, Punto } from "./scenes-trazados";

const O: Pt = [180, 290];
const GA: Pt = [330, 290];
const GB: Pt = [380, 225];
const GC: Pt = [300, 235];
const RA = dist(O, GA);

const poligono = (pts: Pt[]) => `M${pts.map((p) => `${p[0]} ${p[1]}`).join(" L")} Z`;
const etiqueta = { stroke: "#fffefa", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

/** Triángulo original con el centro del giro. */
function PapelGiro() {
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

function defGiro(th: number): Def {
  const A2 = rotarPunto(GA, O, th);
  const rayoLargo = 235;
  return {
    scene: "giro-practica",
    fases: ["angulo", "medida", "centro", "arco", "regla"],
    nClics: 1,
    papel: (est: Est) => (
      <g>
        <PapelGiro />
        <line x1={O[0]} y1={O[1]} x2={GA[0]} y2={GA[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" />
        {est.fase >= 1 ? <line x1={O[0]} y1={O[1]} x2={enCirculo(O, rayoLargo, th)[0]} y2={enCirculo(O, rayoLargo, th)[1]} stroke={INK} strokeWidth="1" strokeDasharray="5 4" /> : null}
        {est.fase >= 5 ? <Punto p={A2} nombre="A′" dx={-20} dy={-6} color={VERDE} /> : null}
      </g>
    ),
    angulo: () => ({ centro: O, base: angDe(O, GA), objetivo: th, largo: rayoLargo }),
    medibles: () => [O, GA],
    candidatos: () => [O],
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 200],
    radioIni: () => RA,
    rhoIni: () => -th,
    arco: (_est, _n, _radio, c) => ({ centro: c, base: angDe(c, A2), signo: 1, rhoMin: -(th + 25), rhoMax: 40, req: [-8, 8] }),
    cortes: () => [A2],
    evaluar: (est) => {
      const [p1] = est.clics;
      if (!p1) return { ok: false, mensaje: "Falta marcar el punto A′." };
      return dist(p1, A2) <= SNAP + 2
        ? { ok: true, mensaje: `Correcto: A′ está a la misma distancia de O que A (OA = OA′) y el ángulo AOA′ mide ${th}°.` }
        : { ok: false, mensaje: "Ese punto no es A′: A′ es donde el arco de radio OA corta al segundo lado del ángulo. Pulsa «Reintentar»." };
    },
  };
}

export function GiroPractica({ block }: { block: BenchBlock }) {
  const th = clamp(Math.round(block.params?.a ?? 60), 30, 120);
  const [def] = useState(() => defGiro(th));
  return <Practica block={block} def={def} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Giro en papel cuadriculado ───────────── */

const CENTRO: [number, number] = [8, 7];
const FIG_GIRO: [number, number][] = [[12, 7], [12, 4], [9, 5]];

/** Gira un punto de la cuadrícula `deg` (múltiplo de 90) grados en sentido antihorario alrededor del centro. */
function girarCuadro(g: [number, number], deg: number): [number, number] {
  const dx = g[0] - CENTRO[0];
  const dy = g[1] - CENTRO[1];
  const [x, y] = deg === 90 ? [dy, -dx] : deg === 180 ? [-dx, -dy] : [-dy, dx];
  return [CENTRO[0] + x, CENTRO[1] + y];
}

export function GiroCuadricula({ block }: { block: BenchBlock }) {
  const raw = Math.round((block.params?.a ?? 90) / 90) * 90;
  const deg = raw === 180 ? 180 : raw === 270 ? 270 : 90;
  const esperado = FIG_GIRO.map((g) => girarCuadro(g, deg));
  const o = gp(CENTRO);
  return (
    <CuadriculaEjercicio
      block={block}
      scene="giro-cuadricula"
      figura={FIG_GIRO}
      esperado={esperado}
      mensajeOk={`Correcto: cada vértice conserva su distancia a O y gira ${deg}° en sentido antihorario. La figura girada es igual que la original.`}
      decoracion={
        <g>
          <ArcoPlano c={o} r={CELDA * 1.6} a1={0} a2={deg === 270 ? 269 : deg} grosor={2.4} color={AMBAR} />
          <text x={o[0] + CELDA * 2.1} y={o[1] - CELDA * 0.6} fontSize="14" fontWeight="800" fill={AMBAR} fontFamily={SANS} {...etiqueta}>
            {deg}° ↺
          </text>
          <Punto p={o} nombre="O" dx={-18} dy={18} color={AZUL} />
        </g>
      }
    />
  );
}
