"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Parámetro `a` de la catenaria que, con luz L, tiene flecha f: f = a·(cosh(L/2a) − 1). Se resuelve por bisección (NaN si L o f no son positivos). */
export function parametroCatenaria(L: number, f: number) {
  if (!(L > 0) || !(f > 0)) return NaN;
  const g = (a: number) => a * (Math.cosh(L / (2 * a)) - 1) - f;
  let lo = L * 1e-3;
  let hi = L * 1e4;
  for (let i = 0; i < 200; i++) {
    const mid = Math.sqrt(lo * hi);
    if (g(mid) > 0) lo = mid;
    else hi = mid;
  }
  return Math.sqrt(lo * hi);
}
/** Altura sobre los apoyos del arco catenario invertido en x (con vértice en x = 0, flecha f y luz L). */
export const alturaArcoCatenario = (x: number, a: number, f: number) => f - (a * Math.cosh(x / a) - a);
/** Altura del arco parabólico de igual luz y flecha. */
export const alturaArcoParabola = (x: number, L: number, f: number) => f * (1 - (4 * x * x) / (L * L));
/** Longitud de la catenaria de parámetro a y luz L. */
export const longitudCatenaria = (a: number, L: number) => 2 * a * Math.sinh(L / (2 * a));
/** Longitud de la parábola de luz L y flecha f. */
export function longitudParabola(L: number, f: number) {
  const b = L / 2;
  const k = f / (b * b);
  return 2 * ((b / 2) * Math.sqrt(1 + 4 * k * k * b * b) + Math.asinh(2 * k * b) / (4 * k));
}

/** Hiperboloide de una hoja generado por la recta que une (R, 0, −h/2) con (R·cosθ, R·senθ, h/2). */
export function hiperboloide(R: number, h: number, thetaDeg: number) {
  const th = thetaDeg * RAD;
  return { garganta: R * Math.abs(Math.cos(th / 2)), generatriz: Math.sqrt(h * h + 4 * R * R * Math.sin(th / 2) ** 2) };
}
/** Radio a la altura relativa t ∈ [0, 1] (0 abajo, 1 arriba) del hiperboloide. */
export function radioHiperboloide(R: number, thetaDeg: number, t: number) {
  const th = thetaDeg * RAD;
  return R * Math.sqrt((1 - t) ** 2 + t * t + 2 * t * (1 - t) * Math.cos(th));
}

/** Radio del orificio de un panel de fachada paramétrica según su distancia a un atractor (0 = cerca → rmin; ≥ dmax → rmax). */
export const radioPanel = (d: number, dmax: number, rmin: number, rmax: number) => rmin + (rmax - rmin) * Math.max(0, Math.min(1, dmax > 0 ? d / dmax : 1));
/** Fracción media de superficie abierta de una fachada de n × n paneles de lado 1 con orificios circulares. */
export function aperturaMedia(n: number, ax: number, ay: number, rmin: number, rmax: number) {
  let suma = 0;
  const dmax = Math.hypot(n, n) / 2;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const d = Math.hypot(i + 0.5 - ax * n, j + 0.5 - ay * n);
      const r = Math.min(0.5, radioPanel(d, dmax, rmin, rmax));
      suma += Math.PI * r * r;
    }
  return suma / (n * n);
}

/* ───────────── 1. Catenaria y arco ───────────── */

export function CatenariaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { L: Math.round(num(block.params?.a, 20, 6, 30)), f: Math.round(num(block.params?.b, 8, 2, 15)) };
  const [s, setS] = useState(init);
  const a = parametroCatenaria(s.L, s.f);
  const U = Math.min(380 / s.L, 150 / s.f);
  const O: Pt = [260 - (s.L * U) / 2, 215];
  const pt = (x: number, y: number): Pt => [O[0] + (x + s.L / 2) * U, O[1] - y * U];
  const N = 60;
  const cat: Pt[] = [];
  const par: Pt[] = [];
  let maxDif = 0;
  for (let i = 0; i <= N; i++) {
    const x = -s.L / 2 + (s.L * i) / N;
    const yc = alturaArcoCatenario(x, a, s.f);
    const yp = alturaArcoParabola(x, s.L, s.f);
    cat.push(pt(x, yc));
    par.push(pt(x, yp));
    maxDif = Math.max(maxDif, Math.abs(yc - yp));
  }
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una cadena colgada adopta la forma de una catenaria; invertida, es el arco que trabaja solo a compresión."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Luz (distancia entre apoyos)" value={s.L} min={6} max={30} step={1} unit=" m" color={MANIM.blue} onChange={(L) => setS((v) => ({ ...v, L }))} />
          <Slider label="Flecha (altura del arco)" value={s.f} min={2} max={15} step={1} unit=" m" color={MANIM.orange} onChange={(f) => setS((v) => ({ ...v, f }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="catenaria" maxH={270}>
        <Seg a={pt(-s.L / 2 - 1, 0)} b={pt(s.L / 2 + 1, 0)} color={MANIM.muted} width={1.5} />
        <polyline points={par.map((q) => q.join(",")).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray="7 5" />
        <polyline points={cat.map((q) => q.join(",")).join(" ")} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
        <Dot p={pt(-s.L / 2, 0)} r={5} />
        <Dot p={pt(s.L / 2, 0)} r={5} />
        <text x={O[0] + 6} y={28} fill={MANIM.green} fontSize={13} fontWeight={700}>catenaria</text>
        <text x={O[0] + 6} y={46} fill={MANIM.orange} fontSize={13} fontWeight={700}>parábola</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Parámetro a de la catenaria">{Number.isFinite(a) ? `${f2(a)} m` : "—"}</Stat>
        <Stat color={MANIM.green} label="Longitud de la catenaria">{f2(longitudCatenaria(a, s.L))} m</Stat>
        <Stat color={MANIM.orange} label="Longitud de la parábola">{f2(longitudParabola(s.L, s.f))} m</Stat>
        <Stat color={MANIM.muted} label="Máxima separación entre curvas">{f2(maxDif)} m</Stat>
      </Readout>
      <Note>Una <b>cadena</b> que cuelga de dos puntos sólo soporta <b>tracción</b> y adopta la forma de la <b>catenaria</b> y = a·cosh(x/a). Si se invierte, se obtiene el <b>arco catenario</b>, en el que las <b>fuerzas siguen la propia curva</b> y no hay flexión: la idea que usó <b>Gaudí</b> con sus maquetas de cuerdas y pesos. Una <b>parábola</b> es muy parecida (la verde y la naranja casi se superponen) y es la forma ideal para una carga <b>repartida uniformemente</b> en horizontal, como en un <b>puente colgante</b>. La diferencia crece cuando el arco es muy alto frente a su luz.</Note>
    </Frame>
  );
}

/* ───────────── 2. Hiperboloide de una hoja ───────────── */

export function HiperboloideDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { R: Math.round(num(block.params?.a, 4, 2, 8)), h: Math.round(num(block.params?.b, 10, 4, 14)), th: 60, n: 16, fam: "una" };
  const [s, setS] = useState(init);
  const hy = hiperboloide(s.R, s.h, s.th);
  const U = Math.min(18, 220 / s.h, 190 / s.R);
  const C: Pt = [260, 120];
  const lineas: { a: Pt; b: Pt; c: string }[] = [];
  const th = s.th * RAD;
  const fams = s.fam === "dos" ? [1, -1] : [1];
  for (const sg of fams) {
    for (let j = 0; j < s.n; j++) {
      const al = (2 * Math.PI * j) / s.n;
      // extremos: (R, 0) abajo y (R cosθ, ±R senθ) arriba, girados α
      const p0: Pt = [s.R, 0];
      const p1: Pt = [s.R * Math.cos(th), sg * s.R * Math.sin(th)];
      const rot = (p: Pt): number => p[0] * Math.cos(al) - p[1] * Math.sin(al);
      lineas.push({ a: [C[0] + rot(p0) * U, C[1] + (s.h / 2) * U], b: [C[0] + rot(p1) * U, C[1] - (s.h / 2) * U], c: sg === 1 ? MANIM.green : MANIM.blue });
    }
  }
  const gw = hy.garganta * U;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un hiperboloide de una hoja se construye solo con rectas: cada una cruza las demás y forman una curva en el alzado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Rectas generatrices" items={[{ value: "una", label: "Una familia" }, { value: "dos", label: "Las dos familias" }]} value={s.fam} onChange={(fam) => setS((v) => ({ ...v, fam }))} />
          <Slider label="Radio de las bases R" value={s.R} min={2} max={8} step={1} unit=" m" color={MANIM.orange} onChange={(R) => setS((v) => ({ ...v, R }))} />
          <Slider label="Altura h" value={s.h} min={4} max={14} step={1} unit=" m" color={MANIM.blue} onChange={(h) => setS((v) => ({ ...v, h }))} />
          <Slider label="Torsión entre la base y la cima" value={s.th} min={20} max={120} step={10} unit="°" color={MANIM.purple} onChange={(t) => setS((v) => ({ ...v, th: t }))} />
          <Slider label="Número de rectas" value={s.n} min={8} max={32} step={4} color={MANIM.yellow} onChange={(n) => setS((v) => ({ ...v, n }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="hiperboloide" maxH={280}>
        {lineas.map((l, i) => (
          <Seg key={i} a={l.a} b={l.b} color={l.c} width={1.2} />
        ))}
        <Seg a={[C[0] - s.R * U, C[1] + (s.h / 2) * U]} b={[C[0] + s.R * U, C[1] + (s.h / 2) * U]} color={MANIM.ink} width={2.5} />
        <Seg a={[C[0] - s.R * U, C[1] - (s.h / 2) * U]} b={[C[0] + s.R * U, C[1] - (s.h / 2) * U]} color={MANIM.ink} width={2.5} />
        <line x1={C[0] - gw} y1={C[1]} x2={C[0] + gw} y2={C[1]} stroke={MANIM.yellow} strokeWidth={2.5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Radio de la garganta R·cos(θ/2)">{f2(hy.garganta)} m</Stat>
        <Stat color={MANIM.green} label="Longitud de cada recta">{f2(hy.generatriz)} m</Stat>
        <Stat color={MANIM.muted} label="Radio a media altura / base">{f2(hy.garganta)} / {f2(s.R)} m</Stat>
      </Readout>
      <Note>El <b>hiperboloide de revolución de una hoja</b> es una <b>superficie reglada</b>: se genera con una <b>recta</b> que gira alrededor de un eje sin cortarlo. Aunque parece curvo, se construye con <b>barras rectas</b> cruzadas, por eso lo usaron el ingeniero <b>Shukhov</b> en sus torres de agua y radio y muchas <b>torres de refrigeración</b>: es <b>resistente</b>, <b>ligero</b> y fácil de fabricar. La <b>garganta</b> es la sección más estrecha. Prueba con las dos familias: la superficie contiene <b>dos haces de rectas</b>.</Note>
    </Frame>
  );
}

/* ───────────── 3. Fachada paramétrica ───────────── */

export function FachadaParametricaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 10, 5, 14)), ax: 25, ay: 60, rmin: 10, rmax: 45 };
  const [s, setS] = useState(init);
  const U = Math.min(240 / s.n, 24);
  const O: Pt = [260 - (s.n * U) / 2, 125 - (s.n * U) / 2];
  const dmax = Math.hypot(s.n, s.n) / 2;
  const ap = aperturaMedia(s.n, s.ax / 100, s.ay / 100, s.rmin / 100, s.rmax / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El tamaño de cada hueco depende de su distancia al punto atractor: una regla simple genera un diseño que se adapta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Paneles por lado" value={s.n} min={5} max={14} step={1} color={MANIM.blue} onChange={(n) => setS((v) => ({ ...v, n }))} />
          <Slider label="Atractor: posición horizontal" value={s.ax} min={0} max={100} step={5} unit=" %" color={MANIM.orange} onChange={(ax) => setS((v) => ({ ...v, ax }))} />
          <Slider label="Atractor: posición vertical" value={s.ay} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(ay) => setS((v) => ({ ...v, ay }))} />
          <Slider label="Hueco mínimo (junto al atractor)" value={s.rmin} min={0} max={40} step={5} unit=" % del panel" color={MANIM.purple} onChange={(rmin) => setS((v) => ({ ...v, rmin: Math.min(rmin, v.rmax) }))} />
          <Slider label="Hueco máximo (lejos)" value={s.rmax} min={10} max={50} step={5} unit=" % del panel" color={MANIM.yellow} onChange={(rmax) => setS((v) => ({ ...v, rmax: Math.max(rmax, v.rmin) }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="fachada-parametrica" maxH={280}>
        <rect x={O[0]} y={O[1]} width={s.n * U} height={s.n * U} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2} />
        {Array.from({ length: s.n * s.n }, (_, k) => {
          const i = k % s.n;
          const j = Math.floor(k / s.n);
          const d = Math.hypot(i + 0.5 - (s.ax / 100) * s.n, j + 0.5 - (s.ay / 100) * s.n);
          const r = Math.min(0.5, radioPanel(d, dmax, s.rmin / 100, s.rmax / 100));
          return <circle key={k} cx={O[0] + (i + 0.5) * U} cy={O[1] + (s.n - j - 0.5) * U} r={r * U} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={0.6} />;
        })}
        <Dot p={[O[0] + (s.ax / 100) * s.n * U, O[1] + (s.n - (s.ay / 100) * s.n) * U]} color={MANIM.red} r={5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Superficie abierta media">{f1(ap * 100)} %</Stat>
        <Stat color={MANIM.muted} label="Número de paneles">{s.n * s.n}</Stat>
        <Stat color={MANIM.green} label="Luz que deja pasar (aprox.)">{f1(ap * 100)} % de la fachada</Stat>
      </Readout>
      <Note>El <b>diseño paramétrico</b> define la forma mediante <b>reglas y parámetros</b> en lugar de dibujarla pieza a pieza: aquí, el tamaño de cada hueco depende de su <b>distancia a un atractor</b> (por ejemplo, la zona más soleada o un punto de interés). Al mover un parámetro, <b>todo el diseño se recalcula</b>. Con programas <b>CAD y BIM</b> (modelo de información de la construcción), <b>simulación</b> y <b>fabricación digital</b> (corte CNC, impresión 3D) se producen así fachadas y estructuras que antes eran imposibles de calcular o construir. La <b>fracción abierta</b> informa de la luz y la ventilación.</Note>
    </Frame>
  );
}
