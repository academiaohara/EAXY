import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 90, bottom: 375, ux: 52, uy: 34, xMin: -1, yMin: -1 };

/** La función a trozos del libro: y = x + 4 (x ≤ 3), y = −2x + 13 (3 < x < 6), y = 1 (x ≥ 6). */
export function buildFuncionTrozos(): AnimBuild {
  const X = (x: number) => mapX(AREA, x);
  const Y = (y: number) => mapY(AREA, y);
  return {
    label: "Función a trozos: x + 4 si x ≤ 3, −2x + 13 si 3 < x < 6, 1 si x ≥ 6",
    captions: [
      "El primer tramo es una recta de pendiente $1$ y ordenada en el origen $4$: $y = x + 4$, hasta $x = 3$.",
      "El segundo tramo pasa por $(3, 7)$ con pendiente $-2$: $y = 7 - 2(x - 3) = -2x + 13$.",
      "El tercer tramo es constante: $y = 1$, desde $x = 6$ en adelante.",
      "Se describe dando **cada tramo con los valores de $x$ en que vale**: $f(x) = \\begin{cases} x + 4 & x \\le 3 \\\\ -2x + 13 & 3 < x < 6 \\\\ 1 & x \\ge 6 \\end{cases}$",
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={11} yMax={9} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 0}>
          <line x1={X(0)} y1={Y(4)} x2={X(3)} y2={Y(7)} stroke={MANIM.blue} strokeWidth={6} strokeLinecap="round" />
          <Txt x={X(0.2)} y={Y(6)} size={22} color={MANIM.blue} anchor="start">y = x + 4</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <line x1={X(3)} y1={Y(7)} x2={X(6)} y2={Y(1)} stroke={MANIM.orange} strokeWidth={6} strokeLinecap="round" />
          <Txt x={X(4.6)} y={Y(5.3)} size={22} color={MANIM.orange} anchor="start">y = −2x + 13</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X(6)} y1={Y(1)} x2={X(10)} y2={Y(1)} stroke={MANIM.green} strokeWidth={6} strokeLinecap="round" />
          <Txt x={X(8)} y={Y(1.8)} size={22} color={MANIM.green}>y = 1</Txt>
        </Fade>
        <circle cx={X(3)} cy={Y(7)} r={7} fill={MANIM.yellow} />
        <circle cx={X(6)} cy={Y(1)} r={7} fill={MANIM.yellow} />
        <circle cx={X(0)} cy={Y(4)} r={6} fill={MANIM.blue} />
      </Canvas>
    ),
  };
}
