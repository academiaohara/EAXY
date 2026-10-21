import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const AREA: PlotArea = { left: 110, bottom: 372, ux: 120, uy: 45, xMin: -0.2, yMin: -0.2 };

/** Aparcamiento: cada hora o fracción cuesta lo mismo; la gráfica da saltos y no se pueden unir los puntos. */
export function buildTarifasEscalones(params: { a?: number }): AnimBuild {
  const p = params.a ?? 1.5;
  const steps = [1, 2, 3, 4];
  return {
    label: `Tarifa de aparcamiento de ${numEs(p)} € por hora o fracción`,
    captions: [
      `Un aparcamiento cobra ${numEs(p)} € por **hora o fracción**. Con 30 minutos se paga ${numEs(p)} €.`,
      `Entre 0 y 1 h el coste es ${numEs(p)} €; justo pasada la hora, ${numEs(2 * p)} €.`,
      `La gráfica son **escalones**: el punto lleno (incluido) y el vacío (no incluido) marcan cada salto.`,
      "No se pueden unir los puntos: no existe un coste intermedio entre un escalón y el siguiente. Es una función **discontinua**.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={4.5} yMax={7} xStep={1} yStep={1} xLabel="horas" yLabel="coste (€)" />
        {steps.map((h, i) => {
          const y = p * (i + 1);
          const show = beat >= 1 && (beat >= 2 || i < 2);
          return (
            <Fade key={h} show={i === 0 ? beat >= 0 : show} dx={-10}>
              <line x1={mapX(AREA, h - 1)} y1={mapY(AREA, y)} x2={mapX(AREA, h)} y2={mapY(AREA, y)} stroke={MANIM.yellow} strokeWidth={5} />
              <circle cx={mapX(AREA, h)} cy={mapY(AREA, y)} r={7} fill={MANIM.yellow} />
              <circle cx={mapX(AREA, h - 1)} cy={mapY(AREA, y)} r={7} fill={i === 0 ? MANIM.yellow : MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
              <Txt x={mapX(AREA, h - 0.5)} y={mapY(AREA, y) - 14} size={20} color={MANIM.muted}>{`${numEs(y)} €`}</Txt>
            </Fade>
          );
        })}
        <Fade show={beat >= 3} dy={8}>
          <line x1={mapX(AREA, 1)} y1={mapY(AREA, p)} x2={mapX(AREA, 1)} y2={mapY(AREA, 2 * p)} stroke={MANIM.red} strokeWidth={3} strokeDasharray="6 6" />
          <Txt x={mapX(AREA, 1) + 14} y={mapY(AREA, 1.5 * p)} size={22} color={MANIM.red} anchor="start">salto</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
