import { Canvas, Fade, HBrace, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, TickMark, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const A: Pt = [190, 215];
const B: Pt = [610, 215];
const M: Pt = [400, 215];
const P: Pt = [400, 85];
const Q: Pt = [400, 345];

/** Mediatriz: perpendicular por el punto medio; cada uno de sus puntos equidista de los extremos. */
export function buildMediatrizEquidistan(): AnimBuild {
  return {
    label: "La mediatriz de un segmento AB es la perpendicular por su punto medio y sus puntos equidistan de A y de B",
    captions: [
      "Partimos de un segmento $AB$.",
      "Su **punto medio** $M$ lo parte en dos mitades iguales: $\\overline{AM} = \\overline{MB}$.",
      "La **mediatriz** $m$ es la recta **perpendicular** al segmento que pasa por su punto medio.",
      "Cada punto de la mediatriz está a **igual distancia** de los extremos: $\\overline{PA} = \\overline{PB}$ y $\\overline{QA} = \\overline{QB}$.",
    ],
    render: (beat) => (
      <Canvas>
        {/* segmento AB */}
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
        <line x1={A[0]} y1={A[1] - 12} x2={A[0]} y2={A[1] + 12} stroke={MANIM.ink} strokeWidth={4} />
        <line x1={B[0]} y1={B[1] - 12} x2={B[0]} y2={B[1] + 12} stroke={MANIM.ink} strokeWidth={4} />
        <Txt x={A[0]} y={A[1] + 46} size={30}>A</Txt>
        <Txt x={B[0]} y={B[1] + 46} size={30}>B</Txt>

        <Fade show={beat === 1} dy={-4}>
          <HBrace show x1={A[0]} x2={M[0]} y={A[1] + 62} color={MANIM.green} label="mitad" labelSize={22} />
          <HBrace show x1={M[0]} x2={B[0]} y={A[1] + 62} color={MANIM.green} label="mitad" labelSize={22} delay={150} />
        </Fade>
        <Fade show={beat >= 1}>
          <TickMark a={A} b={M} n={1} color={MANIM.green} />
          <TickMark a={M} b={B} n={1} color={MANIM.green} />
          <Dot p={M} color={MANIM.green} r={7} />
          <Txt x={M[0] + 22} y={M[1] + 32} size={26} color={MANIM.green}>M</Txt>
        </Fade>

        <WriteLine show={beat >= 2} x1={M[0]} y1={30} x2={M[0]} y2={400} color={MANIM.purple} width={4} />
        <Fade show={beat >= 2}>
          <RightMark v={M} a={90} b={0} size={18} color={MANIM.purple} />
          <Txt x={M[0] + 24} y={52} size={30} color={MANIM.purple}>m</Txt>
        </Fade>

        <Fade show={beat >= 3} dy={6}>
          <Seg a={P} b={A} color={MANIM.blue} width={3} />
          <Seg a={P} b={B} color={MANIM.blue} width={3} />
          <Seg a={Q} b={A} color={MANIM.orange} width={3} />
          <Seg a={Q} b={B} color={MANIM.orange} width={3} />
          <TickMark a={P} b={A} n={2} color={MANIM.blue} />
          <TickMark a={P} b={B} n={2} color={MANIM.blue} />
          <TickMark a={Q} b={A} n={3} color={MANIM.orange} />
          <TickMark a={Q} b={B} n={3} color={MANIM.orange} />
          <Dot p={P} color={MANIM.blue} r={7} />
          <Dot p={Q} color={MANIM.orange} r={7} />
          <Txt x={P[0] + 26} y={P[1] + 8} size={28} color={MANIM.blue}>P</Txt>
          <Txt x={Q[0] + 26} y={Q[1] + 8} size={28} color={MANIM.orange}>Q</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
