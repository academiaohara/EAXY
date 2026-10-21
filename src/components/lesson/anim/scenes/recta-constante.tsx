import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 120, bottom: 378, ux: 60, uy: 60, xMin: -1, yMin: -1 };

/** y = k (recta horizontal, sí es función) frente a x = k (recta vertical, no lo es). */
export function buildRectaConstante(params: { a?: number }): AnimBuild {
  const k = Math.min(Math.max(params.a ?? 3, 1), 5);
  const xMax = 9;
  const yMax = 5;
  const dots = [1, 4, 7];
  return {
    label: `Función constante y = ${k} frente a la recta vertical x = ${k}`,
    captions: [
      `$y = ${k}$: da igual el valor de $x$, $y$ vale siempre ${k}.`,
      `Todos los puntos están a la misma altura: una recta **paralela al eje $X$**. Es una función.`,
      `Ahora $x = ${k}$: es una recta **vertical**. A un mismo $x$ le corresponden muchos valores de $y$.`,
      `Una vertical corta al eje $X$ una vez pero a $x = ${k}$ le asigna infinitos $y$: **no es una función**.`,
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={xMax} yMax={yMax} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat <= 1}>
          <line x1={mapX(AREA, AREA.xMin)} y1={mapY(AREA, k)} x2={mapX(AREA, xMax)} y2={mapY(AREA, k)} stroke={MANIM.yellow} strokeWidth={5} strokeLinecap="round" />
          <Txt x={mapX(AREA, xMax) - 10} y={mapY(AREA, k) - 14} size={26} color={MANIM.yellow} anchor="end">{`y = ${k}`}</Txt>
        </Fade>
        <Fade show={beat === 1} scale={0.4}>
          {dots.map((x) => (
            <g key={x}>
              <line x1={mapX(AREA, x)} y1={mapY(AREA, 0)} x2={mapX(AREA, x)} y2={mapY(AREA, k)} stroke={MANIM.blue} strokeDasharray="5 5" strokeWidth={2} />
              <circle cx={mapX(AREA, x)} cy={mapY(AREA, k)} r={8} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={mapX(AREA, k)} y1={mapY(AREA, AREA.yMin)} x2={mapX(AREA, k)} y2={mapY(AREA, yMax)} stroke={MANIM.red} strokeWidth={5} strokeLinecap="round" />
          <Txt x={mapX(AREA, k) + 14} y={mapY(AREA, yMax) + 16} size={26} color={MANIM.red} anchor="start">{`x = ${k}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} scale={0.4}>
          {[1, 2, 4].map((y) => (
            <circle key={y} cx={mapX(AREA, k)} cy={mapY(AREA, y)} r={8} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
          ))}
          <Txt x={mapX(AREA, k) + 24} y={mapY(AREA, 2.5)} size={24} color={MANIM.orange} anchor="start">{`un x → muchos y`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
