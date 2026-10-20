import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, polyPoints, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";

export const TEMPERATURA: readonly (readonly [number, number])[] = [
  [0, 12],
  [5, 6],
  [9, 10],
  [14, 20],
  [17, 20],
  [24, 12],
];

export const AREA_TEMPERATURA: PlotArea = { left: 110, bottom: 350, ux: 26, uy: 13, xMin: 0, yMin: 0 };

/** Gráfica de la temperatura a lo largo de un día: cada hora (x) tiene una temperatura (y). */
export function buildFuncionTemperatura(): AnimBuild {
  const a = AREA_TEMPERATURA;
  return {
    label: "Gráfica de la temperatura a lo largo de un día",
    beatMs: 3400,
    captions: [
      "Esta gráfica describe la temperatura de un lugar a lo largo de un día. Cada punto relaciona una **hora** con una **temperatura**.",
      "A las $9$ h la temperatura era de $10\\,°\\text{C}$: el punto de la gráfica es $(9, 10)$.",
      "La **variable independiente** $x$ (la hora) va en el eje horizontal y la **variable dependiente** $y$ (la temperatura), en el vertical: $y$ es **función** de $x$.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={a} xMax={24} yMax={24} xStep={3} yStep={4} xLabel="tiempo (h)" yLabel="temperatura (°C)" />
        <polyline points={polyPoints(a, TEMPERATURA)} fill="none" stroke={MANIM.yellow} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
        <Fade show={beat === 1}>
          <line x1={mapX(a, 9)} y1={mapY(a, 0)} x2={mapX(a, 9)} y2={mapY(a, 10)} stroke={MANIM.blue} strokeWidth={3} strokeDasharray="8 6" />
          <line x1={mapX(a, 0)} y1={mapY(a, 10)} x2={mapX(a, 9)} y2={mapY(a, 10)} stroke={MANIM.orange} strokeWidth={3} strokeDasharray="8 6" />
          <circle cx={mapX(a, 9)} cy={mapY(a, 10)} r={9} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={mapX(a, 9) + 16} y={mapY(a, 10) + 34} size={24} color={MANIM.yellow} anchor="start">a las 9 h: 10 °C</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={mapX(a, 24) - 6} y={mapY(a, 21)} size={22} color={MANIM.blue} anchor="end">x: variable independiente</Txt>
          <Txt x={mapX(a, 24) - 6} y={mapY(a, 24)} size={22} color={MANIM.orange} anchor="end">y: variable dependiente</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
