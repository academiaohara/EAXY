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

/** Teorema de Pitágoras: hipotenusa de los catetos a y b. */
export const hipotenusa = (a: number, b: number) => Math.hypot(a, b);
/** Cateto que falta conocida la hipotenusa y el otro cateto (NaN si la hipotenusa no es mayor). */
export const catetoFaltante = (c: number, a: number) => (c > a ? Math.sqrt(c * c - a * a) : NaN);
/** ¿Los tres lados enteros forman una terna pitagórica? */
export const esTerna = (a: number, b: number, c: number) => Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c) && a > 0 && b > 0 && a * a + b * b === c * c;

export type Lugar = "circunferencia" | "mediatriz" | "bisectriz" | "paralelas";
export const LUGARES: { value: Lugar; label: string; def: string }[] = [
  { value: "circunferencia", label: "Circunferencia", def: "Puntos que están a la misma distancia r de un punto fijo O." },
  { value: "mediatriz", label: "Mediatriz", def: "Puntos que equidistan de dos puntos fijos A y B." },
  { value: "bisectriz", label: "Bisectriz", def: "Puntos que equidistan de los lados de un ángulo." },
  { value: "paralelas", label: "Paralelas a una recta", def: "Puntos que están a una distancia d de una recta dada." },
];
/** Geometría fija de cada lugar (unidades de 1 cm): A(−3,0), B(3,0); circunferencia de centro O(0,0) y radio 3; recta y = 0; ángulo de 60° con vértice en O. */
export const ANGULO_BISECTRIZ = 60;
/** Distancia de un punto a la recta que pasa por O con dirección `deg` (con signo). */
const distARecta = (p: Pt, deg: number) => -p[0] * Math.sin(deg * RAD) + p[1] * Math.cos(deg * RAD);
/** Las dos magnitudes que se comparan y si el punto cumple la propiedad del lugar. */
export function cumpleLugar(lugar: Lugar, p: Pt, tol = 0.01) {
  let a: number;
  let b: number;
  let na: string;
  let nb: string;
  if (lugar === "circunferencia") {
    a = Math.hypot(p[0], p[1]);
    b = 3;
    na = "OP";
    nb = "r";
  } else if (lugar === "mediatriz") {
    a = Math.hypot(p[0] + 3, p[1]);
    b = Math.hypot(p[0] - 3, p[1]);
    na = "PA";
    nb = "PB";
  } else if (lugar === "bisectriz") {
    a = Math.abs(distARecta(p, 0));
    b = Math.abs(distARecta(p, ANGULO_BISECTRIZ));
    na = "d al lado 1";
    nb = "d al lado 2";
  } else {
    a = Math.abs(p[1]);
    b = 2;
    na = "d a la recta";
    nb = "d";
  }
  return { a, b, na, nb, cumple: Math.abs(a - b) <= tol };
}

/** Arco capaz del ángulo α sobre un segmento AB: radio y distancia (con signo) del centro al punto medio de AB. */
export function arcoCapaz(ab: number, alphaDeg: number) {
  const s = Math.sin(alphaDeg * RAD);
  if (!(ab > 0) || !(s > 0)) return { R: NaN, d: NaN };
  const R = ab / (2 * s);
  return { R, d: R * Math.cos(alphaDeg * RAD) };
}
/** Ángulo (grados) con que se ve el segmento AB desde P. */
export function anguloEn(p: Pt, a: Pt, b: Pt) {
  const v1: Pt = [a[0] - p[0], a[1] - p[1]];
  const v2: Pt = [b[0] - p[0], b[1] - p[1]];
  const m = Math.hypot(...v1) * Math.hypot(...v2);
  if (m === 0) return 0;
  return Math.acos(Math.max(-1, Math.min(1, (v1[0] * v2[0] + v1[1] * v2[1]) / m))) / RAD;
}

/* ───────────── 1. Teorema de Pitágoras ───────────── */

export function PitagorasExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 3, 1, 12)), b: Math.round(num(block.params?.b, 4, 1, 12)) };
  const [s, setS] = useState(init);
  const c = hipotenusa(s.a, s.b);
  const terna = esTerna(s.a, s.b, c);
  const U = Math.min(22, 270 / (2 * s.a + s.b));
  const O: Pt = [200, 10 + (s.a + s.b) * U];
  const sq = (p: Pt, q: Pt, color: string) => {
    // cuadrado construido hacia fuera sobre el segmento pq (y crece hacia abajo; el triángulo queda arriba-izquierda)
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const r: Pt = [p[0] - dy, p[1] + dx];
    const t: Pt = [q[0] - dy, q[1] + dx];
    return <polygon points={`${p[0]},${p[1]} ${q[0]},${q[1]} ${t[0]},${t[1]} ${r[0]},${r[1]}`} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={2} />;
  };
  // vértice del ángulo recto en O; cateto a hacia la derecha, cateto b hacia arriba
  const A: Pt = [O[0] + s.a * U, O[1]];
  const B: Pt = [O[0], O[1] - s.b * U];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El área del cuadrado de la hipotenusa es la suma de las áreas de los cuadrados de los catetos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Cateto a" value={s.a} min={1} max={12} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Cateto b" value={s.b} min={1} max={12} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="pitagoras" maxH={330}>
        <polygon points={`${O[0]},${O[1]} ${A[0]},${A[1]} ${B[0]},${B[1]}`} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2.5} />
        {sq(O, A, MANIM.blue)}
        {sq(B, O, MANIM.orange)}
        {sq(A, B, MANIM.green)}
        <text x={O[0] + (s.a * U) / 2} y={O[1] + (s.a * U) / 2 + 5} textAnchor="middle" fill={MANIM.blue} fontSize={13} fontWeight={700}>
          a² = {f1(s.a * s.a)}
        </text>
        <text x={O[0] - (s.b * U) / 2} y={O[1] - (s.b * U) / 2 + 5} textAnchor="middle" fill={MANIM.orange} fontSize={13} fontWeight={700}>
          b² = {f1(s.b * s.b)}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Área sobre el cateto a">{f1(s.a * s.a)} cm²</Stat>
        <Stat color={MANIM.orange} label="Área sobre el cateto b">{f1(s.b * s.b)} cm²</Stat>
        <Stat color={MANIM.green} label="Hipotenusa c = √(a² + b²)">{f2(c)} cm</Stat>
        <Stat color={terna ? MANIM.green : MANIM.muted} label="¿Terna pitagórica?">{terna ? "sí: los tres lados son enteros" : "no"}</Stat>
      </Readout>
      <Note>Pitágoras: <b>a² + b² = c²</b> en todo triángulo rectángulo. Con él se obtiene cualquier lado que falte y se comprueba si un ángulo es recto (el <b>3-4-5</b> de los carpinteros y de los antiguos agrimensores). Se usa constantemente en el dibujo técnico para calcular <b>diagonales, verdaderas magnitudes y alturas</b>.</Note>
    </Frame>
  );
}

/* ───────────── 2. Lugares geométricos ───────────── */

export function LugarGeometricoExplorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, LUGARES.length - 1));
  const init = { l: LUGARES[idx]!.value, x: 0, y: 3 };
  const [s, setS] = useState<{ l: Lugar; x: number; y: number }>(init);
  const U = 36;
  const O: Pt = [260, 150];
  const P: Pt = [s.x, s.y];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const r = cumpleLugar(s.l, P);
  const info = LUGARES.find((x) => x.value === s.l)!;
  const color = r.cumple ? MANIM.green : MANIM.red;
  const dirB = ANGULO_BISECTRIZ * RAD;
  const long = 6;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Coloca el punto P y comprueba si cumple la propiedad que define el lugar geométrico."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Lugar geométrico" items={LUGARES.map((x) => ({ value: x.value, label: x.label }))} value={s.l} onChange={(l) => setS((x) => ({ ...x, l }))} />
          <Slider label="Posición horizontal de P" value={s.x} min={-4} max={4} step={0.5} unit=" cm" color={MANIM.blue} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label="Posición vertical de P" value={s.y} min={-3} max={3} step={0.5} unit=" cm" color={MANIM.orange} onChange={(y) => setS((v) => ({ ...v, y }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="lugar-geometrico" maxH={320}>
        {s.l === "circunferencia" ? (
          <>
            <circle cx={O[0]} cy={O[1]} r={3 * U} fill="none" stroke={MANIM.purple} strokeWidth={3} />
            <Dot p={O} color={MANIM.ink} r={5} />
            <text x={O[0] + 8} y={O[1] + 18} fill={MANIM.ink} fontSize={14} fontWeight={700}>O</text>
          </>
        ) : null}
        {s.l === "mediatriz" ? (
          <>
            <Seg a={sc([-3, 0])} b={sc([3, 0])} color={MANIM.ink} width={3} />
            <Seg a={sc([0, -4])} b={sc([0, 4])} color={MANIM.purple} width={3} />
            <Dot p={sc([-3, 0])} r={5} />
            <Dot p={sc([3, 0])} r={5} />
            <text x={sc([-3, 0])[0] - 6} y={sc([-3, 0])[1] + 20} fill={MANIM.ink} fontSize={14} fontWeight={700}>A</text>
            <text x={sc([3, 0])[0] - 6} y={sc([3, 0])[1] + 20} fill={MANIM.ink} fontSize={14} fontWeight={700}>B</text>
            <Seg a={sc(P)} b={sc([-3, 0])} color={MANIM.blue} width={2} />
            <Seg a={sc(P)} b={sc([3, 0])} color={MANIM.orange} width={2} />
          </>
        ) : null}
        {s.l === "bisectriz" ? (
          <>
            <Seg a={O} b={sc([long, 0])} color={MANIM.ink} width={3} />
            <Seg a={O} b={sc([long * Math.cos(dirB), long * Math.sin(dirB)])} color={MANIM.ink} width={3} />
            <Seg a={O} b={sc([long * Math.cos(dirB / 2), long * Math.sin(dirB / 2)])} color={MANIM.purple} width={3} />
            <Seg a={O} b={sc([-long * Math.cos(dirB / 2), -long * Math.sin(dirB / 2)])} color={MANIM.purple} width={2} />
          </>
        ) : null}
        {s.l === "paralelas" ? (
          <>
            <Seg a={sc([-4.5, 0])} b={sc([4.5, 0])} color={MANIM.ink} width={3} />
            <Seg a={sc([-4.5, 2])} b={sc([4.5, 2])} color={MANIM.purple} width={3} />
            <Seg a={sc([-4.5, -2])} b={sc([4.5, -2])} color={MANIM.purple} width={3} />
          </>
        ) : null}
        <Dot p={sc(P)} color={color} r={8} />
        <text x={sc(P)[0] + 12} y={sc(P)[1] - 10} fill={color} fontSize={18} fontWeight={700}>P</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label={r.na}>{f2(r.a)} cm</Stat>
        <Stat color={MANIM.orange} label={r.nb}>{f2(r.b)} cm</Stat>
        <Stat color={color} label="¿P pertenece al lugar?">{r.cumple ? "sí" : "no"}</Stat>
      </Readout>
      <Note><b>{info.label}.</b> {info.def} Un <b>lugar geométrico</b> es el conjunto de <i>todos</i> los puntos que cumplen una propiedad, y <i>solo</i> ellos. Casi todas las construcciones del dibujo técnico son una intersección de lugares geométricos.</Note>
    </Frame>
  );
}

/* ───────────── 3. Arco capaz ───────────── */

export function ArcoCapazExplorador({ block }: { block: ToolBlock }) {
  const init = { alpha: Math.round(num(block.params?.a, 60, 40, 140) / 5) * 5, t: 0.5, delta: 0 };
  const [s, setS] = useState(init);
  const U = 34;
  const O0: Pt = [260, 300]; // punto medio de AB
  const sc = (p: Pt): Pt => [O0[0] + p[0] * U, O0[1] - p[1] * U];
  const A: Pt = [-3, 0];
  const B: Pt = [3, 0];
  const { R, d } = arcoCapaz(6, s.alpha);
  const C: Pt = [0, d];
  const thB = Math.atan2(B[1] - C[1], B[0] - C[0]);
  let thA = Math.atan2(A[1] - C[1], A[0] - C[0]);
  if (thA < thB) thA += 2 * Math.PI; // el arco recorre la parte alta, pasando por 90°
  const th = thB + s.t * (thA - thB);
  const rad = R + s.delta;
  const P: Pt = [C[0] + rad * Math.cos(th), C[1] + rad * Math.sin(th)];
  const ang = anguloEn(P, A, B);
  const dentro = Math.abs(s.delta) < 0.05;
  const color = dentro ? MANIM.green : MANIM.red;
  const arcPts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = thB + (i / 60) * (thA - thB);
    const q = sc([C[0] + R * Math.cos(t), C[1] + R * Math.sin(t)]);
    arcPts.push(`${i === 0 ? "M" : "L"} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`);
  }
  return (
    <Frame
      stacked
      hint={block.hint ?? "Desde cualquier punto del arco, el segmento AB se ve con el mismo ángulo. Sal del arco y el ángulo cambia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo α con que se ve AB" value={s.alpha} min={40} max={140} step={5} unit="°" color={MANIM.purple} onChange={(alpha) => setS((x) => ({ ...x, alpha }))} />
          <Slider label="Posición de P a lo largo del arco" value={Math.round(s.t * 100)} min={10} max={90} step={1} unit=" %" color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, t: v / 100 }))} />
          <Slider label="Separación de P respecto al arco" value={s.delta} min={-1} max={1} step={0.25} unit=" cm" color={MANIM.orange} onChange={(delta) => setS((x) => ({ ...x, delta }))} />
        </>
      }
    >
      <Svg w={520} h={330} testId="arco-capaz" maxH={360}>
        <circle cx={sc(C)[0]} cy={sc(C)[1]} r={R * U} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 5" />
        <path d={arcPts.join(" ")} fill="none" stroke={MANIM.purple} strokeWidth={3.5} />
        <Seg a={sc(A)} b={sc(B)} color={MANIM.ink} width={4} />
        <Seg a={sc(P)} b={sc(A)} color={color} width={2.5} />
        <Seg a={sc(P)} b={sc(B)} color={color} width={2.5} />
        <Dot p={sc(A)} r={5} />
        <Dot p={sc(B)} r={5} />
        <Dot p={sc(C)} color={MANIM.muted} r={4} />
        <text x={sc(A)[0] - 14} y={sc(A)[1] + 20} fill={MANIM.ink} fontSize={15} fontWeight={700}>A</text>
        <text x={sc(B)[0] + 4} y={sc(B)[1] + 20} fill={MANIM.ink} fontSize={15} fontWeight={700}>B</text>
        <text x={sc(C)[0] + 8} y={sc(C)[1] - 6} fill={MANIM.muted} fontSize={13}>O</text>
        <Dot p={sc(P)} color={color} r={7} />
        <text x={sc(P)[0] + 10} y={sc(P)[1] - 10} fill={color} fontSize={16} fontWeight={700}>P</text>
      </Svg>
      <Readout>
        <Stat color={color} label="Ángulo APB">{f1(ang)}°</Stat>
        <Stat color={MANIM.purple} label="Radio del arco R = AB / (2 sen α)">{f2(R)} cm</Stat>
        <Stat color={MANIM.muted} label="Centro: distancia a AB">{f2(Math.abs(d))} cm {d < -1e-9 ? "(por debajo)" : ""}</Stat>
      </Readout>
      <Note>El <b>arco capaz</b> de α sobre AB es el lugar geométrico de los puntos desde los que se ve el segmento AB bajo un ángulo α. Es un arco de circunferencia que pasa por A y B: todos los ángulos inscritos que abarcan la misma cuerda miden lo mismo. Con α = 90° es la <b>semicircunferencia</b> de diámetro AB (teorema de Thales). Se usa para situar un punto desde el que se «ve» un segmento con un ángulo dado, por ejemplo en topografía.</Note>
    </Frame>
  );
}

/* ═════════════ Tema 2: proporcionalidad, equivalencia y semejanza ═════════════ */

/** Cuarta proporcional x en a/b = c/x, es decir x = b·c/a (NaN si a = 0). */
export const cuartaProporcional = (a: number, b: number, c: number) => (a !== 0 ? (b * c) / a : NaN);
/** Tercera proporcional x en a/b = b/x, es decir x = b²/a. */
export const terceraProporcional = (a: number, b: number) => cuartaProporcional(a, b, b);
/** Media proporcional x en a/x = x/b, es decir x = √(a·b). */
export const mediaProporcional = (a: number, b: number) => (a >= 0 && b >= 0 ? Math.sqrt(a * b) : NaN);
export const PHI = (1 + Math.sqrt(5)) / 2;
/** Parte áurea de un segmento de longitud a: el mayor trozo x con a/x = x/(a − x). */
export const segmentoAureo = (a: number) => a / PHI;
export const areaTriangulo = (base: number, altura: number) => (base * altura) / 2;
/** Lado del cuadrado de igual área que un rectángulo b × h. */
export const ladoCuadradoEquivalente = (b: number, h: number) => mediaProporcional(b, h);
/** Altura que debe tener un triángulo de base `base` para tener la misma área que un rectángulo b × h. */
export const alturaTrianguloEquivalente = (base: number, b: number, h: number) => (base > 0 ? (2 * b * h) / base : NaN);
/** Imagen de un punto en la homotecia de centro O y razón k. */
export const homotecia = (p: Pt, o: Pt, k: number): Pt => [o[0] + k * (p[0] - o[0]), o[1] + k * (p[1] - o[1])];
export const razonAreas = (k: number) => k * k;
export const razonVolumenes = (k: number) => Math.abs(k * k * k);

/* ───────────── 4. Teorema de Thales: segmentos proporcionales ───────────── */

export function ThalesExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 3, 1, 8)), b: Math.round(num(block.params?.b, 2, 1, 8)), c: Math.round(num(block.params?.c, 5, 1, 10)) };
  const [s, setS] = useState(init);
  const d = cuartaProporcional(s.a, s.b, s.c);
  const O: Pt = [90, 245];
  const u = 235 / Math.max(s.a + s.b, s.c + d, 1);
  const dir1 = (-10 * Math.PI) / 180;
  const dir2 = (-48 * Math.PI) / 180;
  const at = (len: number, dir: number): Pt => [O[0] + len * u * Math.cos(dir), O[1] + len * u * Math.sin(dir)];
  const A = at(s.a, dir1);
  const B = at(s.a + s.b, dir1);
  const A2 = at(s.c, dir2);
  const B2 = at(s.c + d, dir2);
  const lab = (p: Pt, t: string, dx = 8, dy = -8) => (
    <text x={p[0] + dx} y={p[1] + dy} fill={MANIM.ink} fontSize={15} fontWeight={700}>
      {t}
    </text>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos rectas que salen de O, cortadas por paralelas, quedan divididas en segmentos proporcionales."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="OA" value={s.a} min={1} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="AB" value={s.b} min={1} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="OA′" value={s.c} min={1} max={10} step={1} unit=" cm" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
        </>
      }
    >
      <Svg w={520} h={280} testId="thales" maxH={310}>
        <Seg a={O} b={at(Math.max(s.a + s.b, 1) * 1.05, dir1)} color={MANIM.ink} width={3} />
        <Seg a={O} b={at((s.c + d) * 1.05, dir2)} color={MANIM.ink} width={3} />
        <Seg a={A} b={A2} color={MANIM.green} width={3} />
        <Seg a={B} b={B2} color={MANIM.green} width={3} />
        <Dot p={O} r={5} />
        <Dot p={A} color={MANIM.blue} r={5} />
        <Dot p={B} color={MANIM.orange} r={5} />
        <Dot p={A2} color={MANIM.purple} r={5} />
        <Dot p={B2} color={MANIM.orange} r={5} />
        {lab(O, "O", -16, 20)}
        {lab(A, "A", 6, 20)}
        {lab(B, "B", 6, 20)}
        {lab(A2, "A′", -26, 4)}
        {lab(B2, "B′", -26, 4)}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="OA / OA′">{f2(s.a / s.c)}</Stat>
        <Stat color={MANIM.orange} label="AB / A′B′">{Number.isFinite(d) && d > 0 ? f2(s.b / d) : "—"}</Stat>
        <Stat color={MANIM.green} label="A′B′ = AB · OA′ / OA (cuarta proporcional)">{f2(d)} cm</Stat>
      </Readout>
      <Note><b>Teorema de Thales:</b> si dos rectas que se cortan en O son cortadas por rectas <b>paralelas</b>, los segmentos que se forman son proporcionales: OA/OA′ = AB/A′B′ = OB/OB′. Sirve para <b>dividir un segmento en partes iguales o proporcionales</b> y para hallar la <b>cuarta proporcional</b> sin calcular nada.</Note>
    </Frame>
  );
}

/* ───────────── 5. Media proporcional (teorema de la altura) ───────────── */

export function MediaProporcionalExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 4, 1, 12)), b: Math.round(num(block.params?.b, 9, 1, 12)) };
  const [s, setS] = useState(init);
  const h = mediaProporcional(s.a, s.b);
  const L = s.a + s.b;
  const u = 400 / L;
  const O: Pt = [60, 205];
  const A: Pt = O;
  const Hh: Pt = [O[0] + s.a * u, O[1]];
  const B: Pt = [O[0] + L * u, O[1]];
  const C: Pt = [Hh[0], O[1] - h * u];
  const cx = O[0] + (L * u) / 2;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En la semicircunferencia de diámetro AB, la altura desde C es media proporcional entre los dos trozos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="AH" value={s.a} min={1} max={12} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="HB" value={s.b} min={1} max={12} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="media-proporcional" maxH={300}>
        <path d={`M ${A[0]} ${A[1]} A ${(L * u) / 2} ${(L * u) / 2} 0 0 1 ${B[0]} ${B[1]}`} fill="none" stroke={MANIM.purple} strokeWidth={3} />
        <Seg a={A} b={B} color={MANIM.ink} width={3.5} />
        <Seg a={Hh} b={C} color={MANIM.green} width={3.5} />
        <Seg a={A} b={C} color={MANIM.muted} width={2} dashed />
        <Seg a={C} b={B} color={MANIM.muted} width={2} dashed />
        <Dot p={A} r={5} />
        <Dot p={B} r={5} />
        <Dot p={Hh} r={5} />
        <Dot p={C} color={MANIM.green} r={6} />
        <text x={A[0] - 4} y={A[1] + 22} fill={MANIM.ink} fontSize={15} fontWeight={700}>A</text>
        <text x={B[0] - 4} y={B[1] + 22} fill={MANIM.ink} fontSize={15} fontWeight={700}>B</text>
        <text x={Hh[0] - 5} y={Hh[1] + 22} fill={MANIM.ink} fontSize={15} fontWeight={700}>H</text>
        <text x={C[0] + 8} y={C[1] - 8} fill={MANIM.green} fontSize={15} fontWeight={700}>C</text>
        <text x={cx} y={O[1] + 44} textAnchor="middle" fill={MANIM.muted} fontSize={13}>diámetro AB = {s.a} + {s.b} = {L} cm</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Altura CH = √(AH · HB)">{f2(h)} cm</Stat>
        <Stat color={MANIM.muted} label="CH² = AH · HB">{f1(h * h)} = {f1(s.a * s.b)}</Stat>
        <Stat color={MANIM.purple} label="Cateto AC = √(AH · AB)">{f2(Math.sqrt(s.a * L))} cm</Stat>
      </Readout>
      <Note>Por Thales, el triángulo ACB es rectángulo en C. En todo triángulo rectángulo, la <b>altura sobre la hipotenusa</b> es <b>media proporcional</b> entre los segmentos que determina: AH/CH = CH/HB. Así se construye <b>√(a·b)</b> con regla y compás, la clave de la cuadratura de rectángulos. El <b>teorema del cateto</b> da AC² = AH · AB.</Note>
    </Frame>
  );
}

/* ───────────── 6. Equivalencia de áreas ───────────── */

export function EquivalenciaExplorador({ block }: { block: ToolBlock }) {
  const init = { b: Math.round(num(block.params?.a, 8, 1, 12)), h: Math.round(num(block.params?.b, 2, 1, 12)) };
  const [s, setS] = useState(init);
  const area = s.b * s.h;
  const lado = ladoCuadradoEquivalente(s.b, s.h);
  const hTri = alturaTrianguloEquivalente(s.b, s.b, s.h);
  const u = Math.min(16, 150 / Math.max(s.b, s.h, lado, hTri));
  const y0 = 220;
  const rect = (x: number, w: number, hh: number, color: string) => <rect x={x} y={y0 - hh * u} width={w * u} height={hh * u} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={2} />;
  const x1 = 20;
  const x2 = x1 + s.b * u + 30;
  const x3 = x2 + lado * u + 30;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Figuras distintas pueden tener la misma área: son equivalentes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Base del rectángulo" value={s.b} min={1} max={12} step={1} unit=" cm" color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Altura del rectángulo" value={s.h} min={1} max={12} step={1} unit=" cm" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="equivalencia" maxH={280}>
        {rect(x1, s.b, s.h, MANIM.blue)}
        {rect(x2, lado, lado, MANIM.green)}
        <polygon points={`${x3},${y0} ${x3 + s.b * u},${y0} ${x3 + (s.b * u) / 2},${y0 - hTri * u}`} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.orange} strokeWidth={2} />
        <text x={x1} y={y0 + 22} fill={MANIM.blue} fontSize={13} fontWeight={700}>rectángulo</text>
        <text x={x2} y={y0 + 22} fill={MANIM.green} fontSize={13} fontWeight={700}>cuadrado</text>
        <text x={x3} y={y0 + 22} fill={MANIM.orange} fontSize={13} fontWeight={700}>triángulo</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Área del rectángulo">{f1(area)} cm²</Stat>
        <Stat color={MANIM.green} label="Cuadrado equivalente: lado √(b·h)">{f2(lado)} cm → {f1(lado * lado)} cm²</Stat>
        <Stat color={MANIM.orange} label="Triángulo equivalente de igual base: altura 2h">{f1(hTri)} cm → {f1(areaTriangulo(s.b, hTri))} cm²</Stat>
      </Readout>
      <Note>Dos figuras son <b>equivalentes</b> si tienen la misma área aunque su forma sea distinta. Transformar un rectángulo en un cuadrado equivalente (<b>cuadratura</b>) usa la <b>media proporcional</b>: lado = √(b·h). Un triángulo con la misma base y <b>doble de altura</b> que un rectángulo tiene su misma área.</Note>
    </Frame>
  );
}

/* ───────────── 7. Semejanza y homotecia ───────────── */

export function HomoteciaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { k: Math.max(-3, Math.min(3, Math.round(num(block.params?.a, 2, -3, 3) * 2) / 2)) };
  const [s, setS] = useState(init);
  const U = 22;
  const O: Pt = [260, 140];
  const tri: Pt[] = [[1, 0.5], [3, 0.5], [2, 2]];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const img = tri.map((p) => homotecia(p, [0, 0], s.k));
  const poly = (pts: Pt[]) => pts.map((p) => sc(p).join(",")).join(" ");
  const tipo = s.k === 0 ? "degenerada (todo se reduce a O)" : s.k > 0 ? "directa (misma orientación)" : "inversa (figura girada 180°)";
  const efecto = Math.abs(s.k) > 1 ? "ampliación" : Math.abs(s.k) === 1 ? "igual tamaño" : s.k === 0 ? "—" : "reducción";
  return (
    <Frame
      stacked
      hint={block.hint ?? "La homotecia agranda o reduce desde un centro O. Prueba razones negativas."}
      onReset={() => setS(init)}
      controls={<Slider label="Razón de homotecia k" value={s.k} min={-3} max={3} step={0.5} color={MANIM.purple} onChange={(k) => setS({ k })} />}
    >
      <Svg w={520} h={290} testId="homotecia" maxH={320}>
        {tri.map((p, i) => (
          <Seg key={i} a={sc([0, 0])} b={sc(img[i]!)} color={MANIM.muted} width={1.5} dashed />
        ))}
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={2.5} />
        <polygon points={poly(img)} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={2.5} />
        <Dot p={sc([0, 0])} color={MANIM.ink} r={5} />
        <text x={sc([0, 0])[0] - 16} y={sc([0, 0])[1] + 18} fill={MANIM.ink} fontSize={15} fontWeight={700}>O</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Razón k">{fmtEs(s.k, 1)}</Stat>
        <Stat color={MANIM.blue} label="Longitudes × |k|">{f2(Math.abs(s.k))}</Stat>
        <Stat color={MANIM.orange} label="Áreas × k²">{f2(razonAreas(s.k))}</Stat>
        <Stat color={MANIM.green} label="Volúmenes × |k|³">{f2(razonVolumenes(s.k))}</Stat>
        <Stat color={MANIM.muted} label="Tipo">{tipo} · {efecto}</Stat>
      </Readout>
      <Note>En una <b>homotecia</b> de centro O y razón k, cada punto P pasa a P′ en la recta OP con OP′ = k · OP. Si k &gt; 0 es <b>directa</b>; si k &lt; 0 es <b>inversa</b> (P′ queda al otro lado de O). La figura resultante es <b>semejante</b>: mismos ángulos, lados proporcionales con razón |k|, áreas con razón k² y volúmenes con |k|³. Es la base de las <b>escalas</b> y de los cambios de tamaño en los planos.</Note>
    </Frame>
  );
}
