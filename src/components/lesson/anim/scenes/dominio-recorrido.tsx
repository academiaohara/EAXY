import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, polyPoints, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 120, bottom: 372, ux: 80, uy: 60, xMin: -0.5, yMin: -0.5 };

/** Dominio = valores de x de la gráfica; recorrido = valores de y que alcanza. */
export function buildDominioRecorrido(): AnimBuild {
  const f = (x: number) => 4 - ((x - 4) * (x - 4)) / 3;
  const x0 = 1;
  const x1 = 7;
  const pts: [number, number][] = [];
  for (let x = x0; x <= x1 + 1e-9; x += 0.25) pts.push([x, f(x)]);
  const yMin = f(x0);
  const yMax = 4;
  return {
    label: "Dominio [1, 7] y recorrido [1, 4] de una gráfica",
    captions: [
      "Esta gráfica empieza en $x = 1$ y acaba en $x = 7$.",
      "**Dominio:** los valores de $x$ para los que existe la función. Proyectamos la gráfica sobre el eje $X$: $[1,\\ 7]$.",
      "**Recorrido:** los valores de $y$ que alcanza. Proyectamos sobre el eje $Y$: va del mínimo $1$ al máximo $4$.",
      "Dominio: $[1, 7]$. Recorrido: $[1, 4]$.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={8} yMax={5} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <polyline points={polyPoints(AREA, pts)} fill="none" stroke={MANIM.yellow} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={mapX(AREA, x0)} cy={mapY(AREA, f(x0))} r={7} fill={MANIM.yellow} />
        <circle cx={mapX(AREA, x1)} cy={mapY(AREA, f(x1))} r={7} fill={MANIM.yellow} />
        <Fade show={beat >= 1}>
          <line x1={mapX(AREA, x0)} y1={mapY(AREA, 0)} x2={mapX(AREA, x1)} y2={mapY(AREA, 0)} stroke={MANIM.blue} strokeWidth={9} strokeLinecap="round" />
          <line x1={mapX(AREA, x0)} y1={mapY(AREA, f(x0))} x2={mapX(AREA, x0)} y2={mapY(AREA, 0)} stroke={MANIM.blue} strokeDasharray="5 5" />
          <line x1={mapX(AREA, x1)} y1={mapY(AREA, f(x1))} x2={mapX(AREA, x1)} y2={mapY(AREA, 0)} stroke={MANIM.blue} strokeDasharray="5 5" />
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={mapX(AREA, 0)} y1={mapY(AREA, yMin)} x2={mapX(AREA, 0)} y2={mapY(AREA, yMax)} stroke={MANIM.green} strokeWidth={9} strokeLinecap="round" />
          <line x1={mapX(AREA, 0)} y1={mapY(AREA, yMax)} x2={mapX(AREA, 4)} y2={mapY(AREA, yMax)} stroke={MANIM.green} strokeDasharray="5 5" />
          <line x1={mapX(AREA, 0)} y1={mapY(AREA, yMin)} x2={mapX(AREA, x0)} y2={mapY(AREA, yMin)} stroke={MANIM.green} strokeDasharray="5 5" />
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={200} y={62} size={28} color={MANIM.blue} anchor="start">{"Dominio = [1, 7]"}</Txt>
          <Txt x={200} y={96} size={28} color={MANIM.green} anchor="start">{"Recorrido = [1, 4]"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
