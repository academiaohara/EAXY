"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { angDe, clamp, dist, enCirculo, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { useBenchCheck } from "./practice";
import { AMBAR, AZUL, BenchShell, INK, Resultado, SANS, SVG_CLASS, VERDE, type BenchBlock, type BenchSceneName } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, SNAP, lerp, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { Punto, puntero } from "./scenes-trazados";

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

function PapelTraslacion({ imagen, etiquetas }: { imagen?: number; etiquetas: { a2: boolean; b2: boolean; c2: boolean } }) {
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

const defTraslacion: Def = {
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
      {est.fase >= 7 ? <Punto p={TB2} nombre="B′" dx={8} dy={-6} color={VERDE} /> : null}
    </g>
  ),
  candidatos: (_est, idx) => (idx === 0 ? [TB] : [TA2]),
  medibles: (est) => (est.fase === 0 ? [TA, TA2] : [TA, TB]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 200],
  radioIni: () => 100,
  rhoIni: () => -25,
  arco: (_est, _n, _radio, c) => ({ centro: c, base: angDe(c, TB2), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [TB2],
  evaluar: (est) => {
    const [p1] = est.clics;
    if (!p1) return { ok: false, mensaje: "Falta marcar el punto B′." };
    return dist(p1, TB2) <= SNAP + 2
      ? { ok: true, mensaje: "Correcto: B′ es el cuarto vértice del paralelogramo AA′B′B, así que BB′ es igual y paralelo a AA′: B se ha trasladado según el vector v." }
      : { ok: false, mensaje: "Ese punto no es B′: B′ es donde se cortan los dos arcos. Pulsa «Reintentar»." };
  },
};

export function TraslacionPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defTraslacion} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Ejercicio en papel cuadriculado (traslación, giro…) ───────────── */

export const CELDA = 24;
export const GX0 = 22;
export const GY0 = 22;
const COLS = 24;
const FILAS = 14;
export const gp = (g: [number, number]): Pt => [GX0 + g[0] * CELDA, GY0 + g[1] * CELDA];
const FIG: [number, number][] = [[2, 11], [4, 6], [7, 10]];

/**
 * Papel cuadriculado con una figura de tres vértices: el alumno marca A′, B′ y C′ en las intersecciones.
 * `decoracion` dibuja lo que define la transformación (vector, centro y ángulo…).
 */
export function CuadriculaEjercicio({
  block,
  scene,
  figura,
  esperado,
  decoracion,
  mensajeOk,
  flechas = false,
}: {
  block: BenchBlock;
  scene: BenchSceneName;
  figura: [number, number][];
  esperado: [number, number][];
  decoracion: ReactNode;
  mensajeOk: string;
  /** Al comprobar, dibuja una flecha discontinua de cada vértice a su imagen. */
  flechas?: boolean;
}) {
  const [clics, setClics] = useState<[number, number][]>([]);
  const [aviso, setAviso] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const evaluar = () => {
    const mal = clics.map((c, i) => (c[0] === esperado[i][0] && c[1] === esperado[i][1] ? null : ["A′", "B′", "C′"][i])).filter(Boolean) as string[];
    return mal.length === 0
      ? { ok: true, mensaje: mensajeOk }
      : { ok: false, mensaje: `${mal.join(", ")} no ${mal.length > 1 ? "están" : "está"} donde debe${mal.length > 1 ? "n" : ""}: cada vértice se transforma igual. Pulsa «Reintentar».` };
  };
  const { resultado } = useBenchCheck({ ready: clics.length === 3, evaluate: () => evaluar().ok });
  const bloqueada = resultado !== null;
  const step = Math.min(clics.length, 2);

  const onDown = (ev: ReactPointerEvent) => {
    if (bloqueada || clics.length >= 3) return;
    const q = puntero(svgRef.current, ev);
    const g: [number, number] = [Math.round((q[0] - GX0) / CELDA), Math.round((q[1] - GY0) / CELDA)];
    if (g[0] < 0 || g[1] < 0 || g[0] > COLS || g[1] > FILAS || dist(gp(g), q) > 14) {
      setAviso("Toca una intersección de la cuadrícula.");
      return;
    }
    if (clics.some((c) => c[0] === g[0] && c[1] === g[1])) {
      setAviso("Ya has marcado ese punto.");
      return;
    }
    setClics([...clics, g]);
    setAviso(null);
  };

  const nav = (
    <button
      type="button"
      onClick={() => {
        setClics((c) => c.slice(0, -1));
        setAviso(null);
      }}
      disabled={clics.length === 0 || bloqueada}
      data-testid="bench-deshacer"
      className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
    >
      Deshacer
    </button>
  );
  const extra = (
    <div className="flex flex-col gap-2">
      {aviso && !bloqueada ? (
        <p className="text-sm text-amber-200" data-testid="bench-aviso">
          {aviso}
        </p>
      ) : null}
      {bloqueada ? <Resultado ok={resultado === true}>{evaluar().mensaje}</Resultado> : null}
    </div>
  );

  return (
    <BenchShell scene={scene} notes={block.notes} step={step} setStep={() => undefined} extra={extra} nav={nav} label="Papel cuadriculado con una figura y una transformación">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${MV.w} ${MV.h}`}
        className={`${SVG_CLASS} touch-none select-none`}
        role="group"
        aria-label="Papel cuadriculado con una figura y una transformación"
        onPointerDown={onDown}
        style={{ cursor: bloqueada ? "default" : "crosshair" }}
        data-testid="bench-cuadricula"
        data-puntos={clics.length}
      >
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <g stroke="#7aa7c7" strokeOpacity="0.45" strokeWidth="0.7">
          {Array.from({ length: COLS + 1 }, (_, i) => (
            <line key={`v${i}`} x1={GX0 + i * CELDA} y1={GY0} x2={GX0 + i * CELDA} y2={GY0 + FILAS * CELDA} />
          ))}
          {Array.from({ length: FILAS + 1 }, (_, i) => (
            <line key={`h${i}`} x1={GX0} y1={GY0 + i * CELDA} x2={GX0 + COLS * CELDA} y2={GY0 + i * CELDA} />
          ))}
        </g>
        <path d={poligono(figura.map(gp))} fill="rgba(31,120,180,0.12)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        {["A", "B", "C"].map((n, i) => (
          <Punto key={n} p={gp(figura[i])} nombre={n} dx={-16} dy={i === 0 ? 16 : -6} />
        ))}
        {decoracion}
        {resultado !== null ? (
          <g data-testid="bench-imagen">
            <path d={poligono(esperado.map(gp))} fill="rgba(31,157,85,0.14)" stroke={VERDE} strokeWidth="2" strokeLinejoin="round" strokeDasharray={resultado ? undefined : "6 4"} />
            {flechas ? figura.map((g, i) => <Flecha key={i} a={gp(g)} b={gp(esperado[i])} color={AMBAR} grosor={1.3} discontinua opacidad={0.8} />) : null}
          </g>
        ) : null}
        {clics.map((c, i) => (
          <Punto key={i} p={gp(c)} nombre={["A′", "B′", "C′"][i]} dx={8} dy={-6} color={resultado === null ? AZUL : c[0] === esperado[i][0] && c[1] === esperado[i][1] ? VERDE : "#c0392b"} />
        ))}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Traslación en papel cuadriculado ───────────── */

export function TraslacionCuadricula({ block }: { block: BenchBlock }) {
  const dx = clamp(Math.round(block.params?.a ?? 9), 3, 14);
  const dy = clamp(Math.round(block.params?.b ?? 3), -3, 5); // positivo = hacia arriba
  const esperado = FIG.map(([x, y]) => [x + dx, y - dy] as [number, number]);
  const [ox, oy] = gp(FIG[0]);
  const fin: Pt = [ox + dx * CELDA, oy - dy * CELDA];
  return (
    <CuadriculaEjercicio
      block={block}
      scene="traslacion-cuadricula"
      figura={FIG}
      esperado={esperado}
      flechas
      mensajeOk={`Correcto: los tres vértices se han movido lo mismo, ${dx} ${dx === 1 ? "cuadro" : "cuadros"} a la derecha y ${Math.abs(dy)} ${dy >= 0 ? "hacia arriba" : "hacia abajo"}. La figura trasladada es igual que la original.`}
      decoracion={
        <g>
          <Flecha a={[ox, oy + 16]} b={[fin[0], fin[1] + 16]} color={AMBAR} grosor={2.6} />
          <text x={(ox + fin[0]) / 2} y={(oy + fin[1]) / 2 + 40} fontSize="14" fontWeight="800" fill={AMBAR} textAnchor="middle" fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
            {dx} →, {Math.abs(dy)} {dy >= 0 ? "↑" : "↓"}
          </text>
        </g>
      }
    />
  );
}
