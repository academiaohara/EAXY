import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const L = 110;
const R = 690;
const T = 80;
const B = 370;

/** Pendiente de la recta que pasa por P₁ y P₂: variación de y entre variación de x. */
export function buildPendienteDosPuntos(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const x1 = params.a ?? 2;
  const y1 = params.b ?? -5;
  const x2 = params.c ?? 6;
  const y2 = params.d ?? 1;
  const xMin = Math.min(x1, x2, 0) - 1;
  const xMax = Math.max(x1, x2, 0) + 1;
  const yMin = Math.min(y1, y2, 0) - 1;
  const yMax = Math.max(y1, y2, 0) + 1;
  const sx = (R - L) / (xMax - xMin);
  const sy = (B - T) / (yMax - yMin);
  const u = Math.min(sx, sy);
  const X = (v: number) => L + (v - xMin) * u;
  const Y = (v: number) => B - (v - yMin) * u;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const m = dy / dx;
  const f = (x: number) => y1 + m * (x - x1);
  const xa = xMin;
  const xb = xMax;
  const mTex = `\\dfrac{${numTex(dy)}}{${numTex(dx)}}`;

  return {
    label: `Pendiente de la recta por (${x1}, ${y1}) y (${x2}, ${y2}): ${numEs(m)}`,
    captions: [
      `La recta pasa por $P_1(${numTex(x1)}, ${numTex(y1)})$ y $P_2(${numTex(x2)}, ${numTex(y2)})$.`,
      `Variación de $x$: $x_2 - x_1 = ${numTex(x2)} - (${numTex(x1)}) = ${numTex(dx)}$.`,
      `Variación de $y$: $y_2 - y_1 = ${numTex(y2)} - (${numTex(y1)}) = ${numTex(dy)}$.`,
      `Pendiente: $m = \\dfrac{y_2 - y_1}{x_2 - x_1} = ${mTex} = ${numTex(Math.round(m * 1000) / 1000)}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {xMin < 0 && xMax > 0 ? <line x1={X(0)} y1={T} x2={X(0)} y2={B} stroke={MANIM.grid} strokeWidth={2} /> : null}
        {yMin < 0 && yMax > 0 ? <line x1={L} y1={Y(0)} x2={R} y2={Y(0)} stroke={MANIM.grid} strokeWidth={2} /> : null}
        <line x1={X(xa)} y1={Y(f(xa))} x2={X(xb)} y2={Y(f(xb))} stroke={MANIM.yellow} strokeWidth={4} strokeLinecap="round" />
        <circle cx={X(x1)} cy={Y(y1)} r={9} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
        <circle cx={X(x2)} cy={Y(y2)} r={9} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
        <Txt x={X(x1) + (dy > 0 ? 16 : -16)} y={Y(y1) + (dy > 0 ? 34 : -16)} size={22} color={MANIM.orange} anchor={dy > 0 ? "start" : "end"}>{`P₁(${numEs(x1)}, ${numEs(y1)})`}</Txt>
        <Txt x={X(x2) + (dy > 0 ? -16 : 16)} y={Y(y2) + (dy > 0 ? -16 : 34)} size={22} color={MANIM.orange} anchor={dy > 0 ? "end" : "start"}>{`P₂(${numEs(x2)}, ${numEs(y2)})`}</Txt>
        <Fade show={beat >= 1}>
          <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y1)} stroke={MANIM.blue} strokeWidth={5} />
          <Txt x={(X(x1) + X(x2)) / 2} y={Y(y1) + (dy > 0 ? 28 : -12)} size={22} color={MANIM.blue}>{`Δx = ${numEs(dx)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X(x2)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={MANIM.green} strokeWidth={5} />
          <Txt x={X(x2) + 14} y={(Y(y1) + Y(y2)) / 2 + 8} size={22} color={MANIM.green} anchor="start">{`Δy = ${numEs(dy)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={L + 10} y={40} size={28} color={MANIM.yellow} anchor="start">{`m = Δy / Δx = ${numEs(dy)} / ${numEs(dx)} = ${numEs(Math.round(m * 1000) / 1000)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
