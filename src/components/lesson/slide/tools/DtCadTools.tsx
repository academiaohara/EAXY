"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { CajaAxo, ejesPantalla, proy } from "@/components/lesson/slide/tools/DtAxonometricoTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Conversión entre coordenadas cartesianas relativas (dx, dy) y polares (distancia, ángulo en grados). */
export const aPolar = (dx: number, dy: number) => ({ d: Math.hypot(dx, dy), ang: ((Math.atan2(dy, dx) / RAD) + 360) % 360 });
export const aCartesiana = (d: number, angDeg: number): Pt => [d * Math.cos(angDeg * RAD), d * Math.sin(angDeg * RAD)];
export type ModoCoord = "absolutas" | "relativas" | "polares";
/** Punto que resulta de introducir (a, b) en el modo indicado a partir del punto anterior P0. */
export function puntoDesde(modo: ModoCoord, p0: Pt, a: number, b: number): Pt {
  if (modo === "absolutas") return [a, b];
  if (modo === "relativas") return [p0[0] + a, p0[1] + b];
  const c = aCartesiana(a, b);
  return [p0[0] + c[0], p0[1] + c[1]];
}

/** Punto de una curva de Bézier cúbica con puntos de control P (4 puntos) para t ∈ [0, 1]. */
export function bezier(P: readonly Pt[], t: number): Pt {
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((i) => w[0]! * P[0]![i]! + w[1]! * P[1]![i]! + w[2]! * P[2]![i]! + w[3]! * P[3]![i]!) as unknown as Pt;
}
/** Longitud aproximada de la curva (suma de cuerdas). */
export function longitudBezier(P: readonly Pt[], n = 200) {
  let L = 0;
  let prev = bezier(P, 0);
  for (let i = 1; i <= n; i++) {
    const q = bezier(P, i / n);
    L += Math.hypot(q[0] - prev[0], q[1] - prev[1]);
    prev = q;
  }
  return L;
}

export type Transformacion = { k: number; angDeg: number; dx: number; dy: number; simetria: "ninguna" | "eje-x" | "eje-y" };
/** Transformación 2D de un punto: simetría, escala, giro respecto del origen y traslación, en este orden. */
export function transformar(p: Pt, t: Transformacion): Pt {
  let [x, y] = p;
  if (t.simetria === "eje-x") y = -y;
  if (t.simetria === "eje-y") x = -x;
  x *= t.k;
  y *= t.k;
  const c = Math.cos(t.angDeg * RAD);
  const s = Math.sin(t.angDeg * RAD);
  return [x * c - y * s + t.dx, x * s + y * c + t.dy];
}
export const areaPoligono = (pts: readonly Pt[]) => Math.abs(pts.reduce((acc, p, i) => acc + (p[0] * pts[(i + 1) % pts.length]![1] - pts[(i + 1) % pts.length]![0] * p[1]), 0)) / 2;

/** Área de la intersección de un círculo de radio r centrado con un rectángulo a × b centrado (integración numérica). */
export function areaCirculoRect(r: number, a: number, b: number, n = 2000) {
  const hx = Math.min(r, a / 2);
  if (!(hx > 0) || !(b > 0)) return 0;
  const dx = (2 * hx) / n;
  let A = 0;
  for (let i = 0; i < n; i++) {
    const x = -hx + (i + 0.5) * dx;
    A += 2 * Math.min(Math.sqrt(Math.max(0, r * r - x * x)), b / 2) * dx;
  }
  return A;
}
export type OpBooleana = "union" | "diferencia" | "interseccion";
/** Volumen de la operación booleana entre una caja [0,c] en z y un cilindro vertical centrado, de radio r, con base en z0 y altura hc. */
export function volumenBooleano(op: OpBooleana, a: number, b: number, c: number, r: number, z0: number, hc: number) {
  const vCaja = a * b * c;
  const vCil = Math.PI * r * r * hc;
  const solape = Math.max(0, Math.min(c, z0 + hc) - Math.max(0, z0));
  const vInt = areaCirculoRect(r, a, b) * solape;
  const todos = { union: vCaja + vCil - vInt, diferencia: vCaja - vInt, interseccion: vInt };
  return { ...todos, vCaja, vCil, vInt, resultado: todos[op] };
}

/** Pieza compuesta: base a × b × c, saliente cilíndrico (radio rb, altura hb) centrado encima y agujero pasante central de radio rh. Volumen en las unidades³ de entrada. */
export function piezaCompuesta(a: number, b: number, c: number, rb: number, hb: number, rh: number) {
  const rBoss = Math.min(rb, Math.min(a, b) / 2);
  const rHole = Math.min(rh, rBoss);
  const vBase = a * b * c;
  const vBoss = Math.PI * rBoss * rBoss * hb;
  const vHole = Math.PI * rHole * rHole * (c + hb);
  return { vBase, vBoss, vHole, volumen: vBase + vBoss - vHole, rBoss, rHole };
}
/** Masa en gramos de un volumen en cm³ y una densidad en g/cm³. */
export const masaGramos = (volCm3: number, densidad: number) => volCm3 * densidad;

/* ───────────── 1. Coordenadas en un programa CAD ───────────── */

const MODOS = [
  { value: "absolutas" as ModoCoord, label: "Absolutas (x, y)" },
  { value: "relativas" as ModoCoord, label: "Relativas (Δx, Δy)" },
  { value: "polares" as ModoCoord, label: "Polares (distancia < ángulo)" },
];

export function CoordenadasCadDt1Explorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 1, 0, 2));
  const init = { m: MODOS[idx]!.value, a: Math.round(num(block.params?.a, 4, 0, 12)), b: Math.round(num(block.params?.b, 3, 0, 8)) };
  const [s, setS] = useState(init);
  const P0: Pt = [2, 1];
  const [A, B] = s.m === "absolutas" ? [Math.min(s.a, 12), Math.min(s.b, 8)] : s.m === "relativas" ? [Math.max(-6, Math.min(6, s.a)), Math.max(-6, Math.min(6, s.b))] : [Math.min(s.a, 8), Math.min(s.b * 5, 360)];
  const P1 = puntoDesde(s.m, P0, A, B);
  const U = 28;
  const O: Pt = [60, 242];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const rel = [P1[0] - P0[0], P1[1] - P0[1]];
  const pol = aPolar(rel[0]!, rel[1]!);
  const cambia = (m: ModoCoord) => setS({ m, a: m === "absolutas" ? 6 : m === "relativas" ? 4 : 5, b: m === "absolutas" ? 4 : m === "relativas" ? 3 : 8 });
  const etiqA = s.m === "absolutas" ? "x" : s.m === "relativas" ? "Δx" : "Distancia";
  const etiqB = s.m === "absolutas" ? "y" : s.m === "relativas" ? "Δy" : "Ángulo";
  return (
    <Frame
      stacked
      hint={block.hint ?? "En CAD un punto se puede indicar de tres formas. El mismo punto puede escribirse en cualquiera de ellas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Introducción de coordenadas" items={MODOS} value={s.m} onChange={cambia} />
          <Slider label={`${etiqA} (cm)`} value={A} min={s.m === "relativas" ? -6 : 0} max={s.m === "absolutas" ? 12 : s.m === "relativas" ? 6 : 8} step={1} color={MANIM.orange} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label={s.m === "polares" ? "Ángulo (grados)" : `${etiqB} (cm)`} value={s.m === "polares" ? B : s.b} min={s.m === "relativas" ? -6 : 0} max={s.m === "absolutas" ? 8 : s.m === "relativas" ? 6 : 360} step={s.m === "polares" ? 5 : 1} color={MANIM.blue} onChange={(b) => setS((v) => ({ ...v, b: s.m === "polares" ? b / 5 : b }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="coordenadas-cad" maxH={290}>
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`x${i}`} x1={sc([i, 0])[0]} y1={sc([i, 0])[1]} x2={sc([i, 8])[0]} y2={sc([i, 8])[1]} stroke={MANIM.muted} strokeOpacity={0.25} strokeWidth={1} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`y${i}`} x1={sc([0, i])[0]} y1={sc([0, i])[1]} x2={sc([13, i])[0]} y2={sc([13, i])[1]} stroke={MANIM.muted} strokeOpacity={0.25} strokeWidth={1} />
        ))}
        <Seg a={sc([0, 0])} b={sc([13, 0])} color={MANIM.ink} width={1.8} />
        <Seg a={sc([0, 0])} b={sc([0, 8])} color={MANIM.ink} width={1.8} />
        <Seg a={sc(P0)} b={sc(P1)} color={MANIM.green} width={3} />
        <Dot p={sc(P0)} color={MANIM.blue} r={6} />
        <Dot p={sc(P1)} color={MANIM.orange} r={6} />
        <text x={sc(P0)[0] - 18} y={sc(P0)[1] + 18} fill={MANIM.blue} fontSize={13} fontWeight={700}>P₀</text>
        <text x={sc(P1)[0] + 8} y={sc(P1)[1] - 8} fill={MANIM.orange} fontSize={13} fontWeight={700}>P₁</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="P₁ absolutas">({f2(P1[0])}, {f2(P1[1])})</Stat>
        <Stat color={MANIM.green} label="Relativas a P₀ (2, 1)">@{f2(rel[0]!)}, {f2(rel[1]!)}</Stat>
        <Stat color={MANIM.blue} label="Polares a P₀">@{f2(pol.d)} &lt; {f1(pol.ang)}°</Stat>
      </Readout>
      <Note>Los programas de <b>CAD vectorial</b> guardan cada elemento con <b>sus coordenadas</b>, no como píxeles. Un punto se introduce en <b>absolutas</b> (respecto del origen), <b>relativas</b> (respecto del punto anterior, con @) o <b>polares</b> (distancia y ángulo medido desde el eje X en sentido antihorario). Son <b>equivalentes</b>: x = P₀x + d·cos α, y = P₀y + d·sen α. Se complementan con las <b>ayudas de dibujo</b>: rejilla, <b>referencia a objetos</b> (extremo, punto medio, centro, intersección), ortogonal y <b>capas</b> para organizar el dibujo.</Note>
    </Frame>
  );
}

/* ───────────── 2. Curvas de Bézier ───────────── */

export function BezierDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { x1: Math.round(num(block.params?.a, 2, 0, 8)), y1: Math.round(num(block.params?.b, 3, -3, 4)), x2: 6, y2: -2 };
  const [s, setS] = useState(init);
  const P: Pt[] = [[0, 0], [s.x1, s.y1], [s.x2, s.y2], [8, 0]];
  const U = 34;
  const O: Pt = [60, 130];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const m = bezier(P, 0.5);
  const L = longitudBezier(P);
  const pts = Array.from({ length: 61 }, (_, i) => sc(bezier(P, i / 60)));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los puntos de control atraen la curva sin tocarla (salvo los extremos). La tangente en cada extremo apunta al punto de control."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Control P₁: x" value={s.x1} min={0} max={8} step={1} color={MANIM.orange} onChange={(x1) => setS((v) => ({ ...v, x1 }))} />
          <Slider label="Control P₁: y" value={s.y1} min={-3} max={4} step={1} color={MANIM.orange} onChange={(y1) => setS((v) => ({ ...v, y1 }))} />
          <Slider label="Control P₂: x" value={s.x2} min={0} max={8} step={1} color={MANIM.blue} onChange={(x2) => setS((v) => ({ ...v, x2 }))} />
          <Slider label="Control P₂: y" value={s.y2} min={-3} max={4} step={1} color={MANIM.blue} onChange={(y2) => setS((v) => ({ ...v, y2 }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="bezier" maxH={290}>
        <polyline points={P.map((p) => sc(p).join(",")).join(" ")} fill="none" stroke={MANIM.muted} strokeWidth={1.2} strokeDasharray="5 4" />
        <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.green} strokeWidth={3.5} strokeLinejoin="round" />
        {P.map((p, i) => (
          <Dot key={i} p={sc(p)} color={i === 0 || i === 3 ? MANIM.ink : i === 1 ? MANIM.orange : MANIM.blue} r={i === 0 || i === 3 ? 6 : 5} />
        ))}
        <Dot p={sc(m)} color={MANIM.yellow} r={5} />
        {P.map((p, i) => (
          <text key={`t${i}`} x={sc(p)[0] + 8} y={sc(p)[1] - 8} fill={MANIM.muted} fontSize={12} fontWeight={700}>
            P{["₀", "₁", "₂", "₃"][i]}
          </text>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Punto medio de la curva B(0,5)">({f2(m[0])}, {f2(m[1])})</Stat>
        <Stat color={MANIM.green} label="Longitud de la curva">{f2(L)} cm</Stat>
        <Stat color={MANIM.muted} label="Cuerda P₀P₃">8 cm</Stat>
      </Readout>
      <Note>Las <b>curvas de Bézier</b> (y las <b>splines</b>) describen formas libres con pocos datos: dos <b>nodos</b> (P₀, P₃) y dos <b>manejadores</b> (P₁, P₂). La curva pasa por los nodos, sale de P₀ en la dirección de P₁ y llega a P₃ desde la dirección de P₂, y está siempre dentro de la <b>envolvente convexa</b> de los cuatro puntos. B(t) = (1−t)³P₀ + 3(1−t)²t P₁ + 3(1−t)t² P₂ + t³P₃; en t = 0,5 vale (P₀ + 3P₁ + 3P₂ + P₃)/8. Es la base de las <b>curvas vectoriales</b> de CAD, tipografías y logotipos.</Note>
    </Frame>
  );
}

/* ───────────── 3. Transformaciones 2D ───────────── */

export function TransformacionesDt1Explorador({ block }: { block: ToolBlock }) {
  const init: { k: number; ang: number; dx: number; dy: number; sim: Transformacion["simetria"] } = { k: Math.max(0.5, Math.min(2, num(block.params?.a, 1, 0.5, 2))), ang: Math.round(num(block.params?.b, 30, -180, 180) / 15) * 15, dx: 3, dy: 1, sim: "ninguna" };
  const [s, setS] = useState(init);
  const tri: Pt[] = [[1, 1], [3, 1], [2, 3]];
  const t: Transformacion = { k: s.k, angDeg: s.ang, dx: s.dx, dy: s.dy, simetria: s.sim };
  const img = tri.map((p) => transformar(p, t));
  const U = 22;
  const O: Pt = [200, 135];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const poly = (pts: Pt[]) => pts.map((p) => sc(p).join(",")).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las órdenes de edición de CAD aplican transformaciones: simetría, escala, giro y traslación. Observa cómo cambia el área."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Simetría" items={[{ value: "ninguna", label: "Ninguna" }, { value: "eje-x", label: "Respecto del eje X" }, { value: "eje-y", label: "Respecto del eje Y" }]} value={s.sim} onChange={(sim) => setS((v) => ({ ...v, sim }))} />
          <Slider label="Factor de escala k" value={s.k} min={0.5} max={2} step={0.25} color={MANIM.purple} format={f2} onChange={(k) => setS((v) => ({ ...v, k }))} />
          <Slider label="Giro respecto del origen" value={s.ang} min={-180} max={180} step={15} unit="°" color={MANIM.orange} onChange={(ang) => setS((v) => ({ ...v, ang }))} />
          <Slider label="Traslación Δx" value={s.dx} min={-4} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(dx) => setS((v) => ({ ...v, dx }))} />
          <Slider label="Traslación Δy" value={s.dy} min={-4} max={4} step={1} unit=" cm" color={MANIM.green} onChange={(dy) => setS((v) => ({ ...v, dy }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="transformaciones" maxH={300}>
        <Seg a={sc([-8, 0])} b={sc([14, 0])} color={MANIM.muted} width={1.2} />
        <Seg a={sc([0, -5])} b={sc([0, 5])} color={MANIM.muted} width={1.2} />
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2.5} />
        <polygon points={poly(img)} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={2.5} />
        <text x={sc(tri[2]!)[0] + 6} y={sc(tri[2]!)[1] - 6} fill={MANIM.blue} fontSize={13} fontWeight={700}>A</text>
        <text x={sc(img[2]!)[0] + 6} y={sc(img[2]!)[1] - 6} fill={MANIM.orange} fontSize={13} fontWeight={700}>A′</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="A (2, 3) → A′">({f2(img[2]![0])}, {f2(img[2]![1])})</Stat>
        <Stat color={MANIM.muted} label="Área: original → imagen">{f2(areaPoligono(tri))} → {f2(areaPoligono(img))} cm²</Stat>
        <Stat color={MANIM.purple} label="Razón de áreas k²">{f2(s.k * s.k)}</Stat>
      </Readout>
      <Note>Las órdenes <b>simetría</b>, <b>escala</b>, <b>girar</b> y <b>desplazar</b> son transformaciones del plano. Un <b>giro</b> de α alrededor del origen lleva (x, y) a (x·cos α − y·sen α, x·sen α + y·cos α). La <b>escala</b> k multiplica las <b>longitudes</b> por k y las <b>áreas</b> por k². La <b>simetría</b> y el giro conservan las medidas; la traslación solo mueve. Se pueden combinar, y el resultado depende del <b>orden</b>. Además existen <b>matrices de transformación</b> que las agrupan en una sola operación.</Note>
    </Frame>
  );
}

/* ───────────── 4. Operaciones booleanas con primitivas ───────────── */

export function BooleanasDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { op: "diferencia" as OpBooleana, a: Math.round(num(block.params?.a, 6, 3, 8)), b: Math.round(num(block.params?.b, 4, 3, 8)), c: 3, r: 1, z0: -1, hc: 6 };
  const [s, setS] = useState(init);
  const r = Math.min(s.r, Math.min(s.a, s.b) / 2);
  const v = volumenBooleano(s.op, s.a, s.b, s.c, r, s.z0, s.hc);
  const e = ejesPantalla(1, 1, 1, 120, 120);
  const zmin = Math.min(0, s.z0);
  const zmax = Math.max(s.c, s.z0 + s.hc);
  const w = Math.min(28, 440 / (0.866 * (s.a + s.b)), 230 / (zmax - zmin + 0.5 * (s.a + s.b)));
  const o: Pt = [260 - 0.433 * (s.b - s.a) * w, 135 + ((zmax + zmin) * w) / 2 - ((s.a + s.b) * w) / 4];
  const P = (x: number, y: number, z: number) => proy(e, o, w, x, y, z);
  const ell = (z: number) => {
    const out: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const th = (2 * Math.PI * i) / 48;
      const q = P(s.a / 2 + r * Math.cos(th), s.b / 2 + r * Math.sin(th), z);
      out.push(q.map((n) => n.toFixed(1)).join(","));
    }
    return out.join(" ");
  };
  const zt = s.z0 + s.hc;
  const lado = (ang: number): [Pt, Pt] => [P(s.a / 2 + r * Math.cos(ang), s.b / 2 + r * Math.sin(ang), s.z0), P(s.a / 2 + r * Math.cos(ang), s.b / 2 + r * Math.sin(ang), zt)];
  const [l1a, l1b] = lado(Math.PI * 0.75);
  const [l2a, l2b] = lado(-Math.PI * 0.25);
  const nombre = { union: "Unión (A ∪ B)", diferencia: "Diferencia (A − B)", interseccion: "Intersección (A ∩ B)" }[s.op];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con primitivas se forman piezas: la unión suma, la diferencia resta (agujeros) y la intersección deja solo lo común."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Operación booleana" items={[{ value: "union", label: "Unión" }, { value: "diferencia", label: "Diferencia (caja − cilindro)" }, { value: "interseccion", label: "Intersección" }]} value={s.op} onChange={(op) => setS((x) => ({ ...x, op }))} />
          <Slider label="Caja: largo" value={s.a} min={3} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Caja: ancho" value={s.b} min={3} max={8} step={1} unit=" cm" color={MANIM.green} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Caja: alto" value={s.c} min={1} max={6} step={1} unit=" cm" color={MANIM.blue} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Cilindro: radio" value={r} min={0.5} max={3} step={0.5} unit=" cm" color={MANIM.purple} onChange={(rr) => setS((x) => ({ ...x, r: rr }))} />
          <Slider label="Cilindro: cota de la base" value={s.z0} min={-3} max={6} step={1} unit=" cm" color={MANIM.yellow} onChange={(z0) => setS((x) => ({ ...x, z0 }))} />
          <Slider label="Cilindro: altura" value={s.hc} min={1} max={10} step={1} unit=" cm" color={MANIM.red} onChange={(hc) => setS((x) => ({ ...x, hc }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="booleanas" maxH={300}>
        <CajaAxo e={e} o={o} u={w} a={s.a} b={s.b} c={s.c} hueco={s.op === "diferencia" ? 2 * r : 0} />
        <polygon points={ell(s.z0)} fill="none" stroke={MANIM.purple} strokeWidth={1.5} strokeDasharray="4 3" />
        <polygon points={ell(zt)} fill={MANIM.purple} fillOpacity={0.15} stroke={MANIM.purple} strokeWidth={2} />
        <Seg a={l1a} b={l1b} color={MANIM.purple} width={1.5} />
        <Seg a={l2a} b={l2b} color={MANIM.purple} width={1.5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Volumen de la caja A">{f2(v.vCaja)} cm³</Stat>
        <Stat color={MANIM.purple} label="Volumen del cilindro B">{f2(v.vCil)} cm³</Stat>
        <Stat color={MANIM.yellow} label="Volumen común A ∩ B">{f2(v.vInt)} cm³</Stat>
        <Stat color={MANIM.green} label={nombre}>{f2(v.resultado)} cm³</Stat>
      </Readout>
      <Note>Con las <b>primitivas</b> (caja, cilindro, esfera, cono, prisma) y las <b>operaciones booleanas</b> se construyen piezas complejas. <b>Unión</b>: V(A ∪ B) = V(A) + V(B) − V(A ∩ B). <b>Diferencia</b>: V(A − B) = V(A) − V(A ∩ B), la forma típica de hacer un <b>agujero</b> o un vaciado. <b>Intersección</b>: solo lo común. Se llama <b>modelado sólido (CSG)</b>: la pieza es un <b>árbol</b> de operaciones sobre primitivas y se puede editar cambiando un parámetro. La caja gris punteada es la base del cilindro.</Note>
    </Frame>
  );
}

/* ───────────── 5. Pieza compuesta y propiedades físicas ───────────── */

const MATERIALES = [
  { value: "acero", label: "Acero (7,85 g/cm³)", dens: 7.85 },
  { value: "aluminio", label: "Aluminio (2,70 g/cm³)", dens: 2.7 },
  { value: "pla", label: "PLA impreso (1,24 g/cm³)", dens: 1.24 },
];

export function PiezaCompuestaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { mat: "acero", a: Math.round(num(block.params?.a, 100, 40, 160) / 10) * 10, b: 60, c: 20, rb: 15, hb: 30, rh: 5 };
  const [s, setS] = useState(init);
  const p = piezaCompuesta(s.a, s.b, s.c, s.rb, s.hb, s.rh);
  const dens = MATERIALES.find((m) => m.value === s.mat)!.dens;
  const volCm3 = p.volumen / 1000;
  const masa = masaGramos(volCm3, dens);
  const e = ejesPantalla(1, 1, 1, 120, 120);
  const zmax = s.c + s.hb;
  const w = Math.min(1.6, 440 / (0.866 * (s.a + s.b)), 230 / (zmax + 0.5 * (s.a + s.b)));
  const o: Pt = [260 - 0.433 * (s.b - s.a) * w, 135 + (zmax * w) / 2 - ((s.a + s.b) * w) / 4];
  const P = (x: number, y: number, z: number) => proy(e, o, w, x, y, z);
  const ell = (rad: number, z: number) => {
    const out: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const th = (2 * Math.PI * i) / 48;
      out.push(P(s.a / 2 + rad * Math.cos(th), s.b / 2 + rad * Math.sin(th), z).map((n) => n.toFixed(1)).join(","));
    }
    return out.join(" ");
  };
  const [bl, br] = [P(s.a / 2 - p.rBoss, s.b / 2, s.c), P(s.a / 2 - p.rBoss, s.b / 2, s.c + s.hb)];
  const [cl, cr] = [P(s.a / 2 + p.rBoss, s.b / 2, s.c), P(s.a / 2 + p.rBoss, s.b / 2, s.c + s.hb)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un programa CAD calcula el volumen y la masa de la pieza a partir de las operaciones que la forman."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATERIALES.map((m) => ({ value: m.value, label: m.label }))} value={s.mat} onChange={(mat) => setS((v) => ({ ...v, mat }))} />
          <Slider label="Base: largo" value={s.a} min={40} max={160} step={10} unit=" mm" color={MANIM.orange} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Base: ancho" value={s.b} min={40} max={100} step={10} unit=" mm" color={MANIM.green} onChange={(b) => setS((v) => ({ ...v, b }))} />
          <Slider label="Base: espesor" value={s.c} min={10} max={40} step={5} unit=" mm" color={MANIM.blue} onChange={(c) => setS((v) => ({ ...v, c }))} />
          <Slider label="Saliente: radio" value={s.rb} min={10} max={30} step={5} unit=" mm" color={MANIM.purple} onChange={(rb) => setS((v) => ({ ...v, rb }))} />
          <Slider label="Saliente: altura" value={s.hb} min={10} max={60} step={5} unit=" mm" color={MANIM.yellow} onChange={(hb) => setS((v) => ({ ...v, hb }))} />
          <Slider label="Agujero pasante: radio" value={s.rh} min={0} max={20} step={1} unit=" mm" color={MANIM.red} onChange={(rh) => setS((v) => ({ ...v, rh }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="pieza-compuesta" maxH={300}>
        <CajaAxo e={e} o={o} u={w} a={s.a} b={s.b} c={s.c} />
        <polygon points={ell(p.rBoss, s.c + s.hb)} fill={MANIM.purple} fillOpacity={0.25} stroke={MANIM.ink} strokeWidth={2} />
        <Seg a={bl} b={br} color={MANIM.ink} width={2} />
        <Seg a={cl} b={cr} color={MANIM.ink} width={2} />
        {p.rHole > 0 ? <polygon points={ell(p.rHole, s.c + s.hb)} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={1.8} /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Base">{f1(p.vBase / 1000)} cm³</Stat>
        <Stat color={MANIM.purple} label="Saliente (unión)">+ {f1(p.vBoss / 1000)} cm³</Stat>
        <Stat color={MANIM.red} label="Agujero (diferencia)">− {f1(p.vHole / 1000)} cm³</Stat>
        <Stat color={MANIM.green} label="Volumen de la pieza">{f1(volCm3)} cm³</Stat>
        <Stat color={MANIM.blue} label="Masa">{f1(masa)} g</Stat>
      </Readout>
      <Note>Las piezas complejas se obtienen a partir de otras <b>más sencillas</b>: aquí una <b>base</b>, un <b>saliente</b> cilíndrico unido y un <b>agujero pasante</b> restado. El programa recuerda cada operación (el <b>historial</b> o árbol de diseño), y cambiar un <b>parámetro</b> (radio, espesor) actualiza toda la pieza. Del modelo se obtienen <b>propiedades físicas</b>: volumen, <b>masa</b> (volumen × densidad), centro de gravedad y momentos de inercia, útiles para elegir material y comprobar que la pieza no pesa más de lo previsto.</Note>
    </Frame>
  );
}
