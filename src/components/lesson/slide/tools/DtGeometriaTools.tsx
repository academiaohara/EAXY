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
