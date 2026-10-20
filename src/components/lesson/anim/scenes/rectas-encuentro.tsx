import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 120, bottom: 372, ux: 420, uy: 62, xMin: 0, yMin: 0 };
const X_MAX = 1.4;
const Y_MAX = 5;

/** Peatón (4 km/h) y ciclista (10 km/h, sale media hora después): el punto de corte es el encuentro. */
export function buildRectasEncuentro(): AnimBuild {
  const peaton = (x: number) => 4 * x;
  const ciclista = (x: number) => 10 * (x - 0.5);
  const xe = 5 / 6;
  const ye = peaton(xe);
  return {
    label: "Peatón y ciclista: el encuentro es el punto de corte de las dos rectas",
    captions: [
      "El peatón camina a $4$ km/h: la distancia recorrida es $y = 4x$ ($x$ en horas).",
      "El ciclista sale **media hora después** a $10$ km/h: $y = 10\\left(x - \\tfrac{1}{2}\\right)$.",
      "Se encuentran cuando han recorrido la **misma distancia**: el **punto de corte** de las dos rectas.",
      "Resolviendo $4x = 10x - 5$ se obtiene $x = \\tfrac{5}{6}$ h $= 50$ minutos, a $\\tfrac{10}{3} \\approx 3{,}33$ km.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={X_MAX} yMax={Y_MAX} xStep={0.5} yStep={1} xLabel="tiempo (h)" yLabel="distancia (km)" />
        <line x1={mapX(AREA, 0)} y1={mapY(AREA, 0)} x2={mapX(AREA, 1.2)} y2={mapY(AREA, peaton(1.2))} stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
        <Txt x={mapX(AREA, 1.2) + 8} y={mapY(AREA, peaton(1.2)) + 6} size={22} color={MANIM.blue} anchor="start">peatón</Txt>
        <Fade show={beat >= 1}>
          <line x1={mapX(AREA, 0.5)} y1={mapY(AREA, 0)} x2={mapX(AREA, 0.95)} y2={mapY(AREA, ciclista(0.95))} stroke={MANIM.orange} strokeWidth={5} strokeLinecap="round" />
          <Txt x={mapX(AREA, 0.95) + 8} y={mapY(AREA, ciclista(0.95)) + 6} size={22} color={MANIM.orange} anchor="start">ciclista</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <circle cx={mapX(AREA, xe)} cy={mapY(AREA, ye)} r={10} fill={MANIM.green} stroke={MANIM.surface} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <line x1={mapX(AREA, xe)} y1={mapY(AREA, ye)} x2={mapX(AREA, xe)} y2={mapY(AREA, 0)} stroke={MANIM.green} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={mapX(AREA, xe) - 12} y={mapY(AREA, ye) - 20} size={22} color={MANIM.green} anchor="end">50 min · 3,33 km</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
