import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, polyPoints } from "@/components/lesson/anim/graph";
import { AREA_TEMPERATURA, TEMPERATURA } from "@/components/lesson/anim/scenes/funcion-temperatura";
import type { AnimBuild } from "@/components/lesson/anim/types";

type Seg = { from: number; to: number };
const PTS = TEMPERATURA;
const seg = (i: number): readonly (readonly [number, number])[] => [PTS[i]!, PTS[i + 1]!];

/** La misma gráfica, leída de izquierda a derecha: tramos crecientes, decrecientes y constantes, máximo y mínimo. */
export function buildFuncionTramosExtremos(): AnimBuild {
  const a = AREA_TEMPERATURA;
  const crec: Seg[] = [{ from: 1, to: 2 }, { from: 2, to: 3 }];
  return {
    label: "Crecimiento, decrecimiento, máximos y mínimos de una función",
    beatMs: 3600,
    captions: [
      "Para interpretar una función, la leemos **de izquierda a derecha** y observamos cómo cambia $y$ cuando aumenta $x$.",
      "Entre las $5$ h y las $14$ h la gráfica **sube**: la función es **creciente**. Al aumentar $x$, aumenta $y$.",
      "De $0$ a $5$ h y de $17$ a $24$ h **baja**: **decreciente**. De $14$ a $17$ h mantiene el valor: **constante**.",
      "El **máximo** es el punto de mayor ordenada ($20\\,°\\text{C}$) y el **mínimo**, el de menor ordenada ($6\\,°\\text{C}$, a las $5$ h).",
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={a} xMax={24} yMax={24} xStep={3} yStep={4} xLabel="tiempo (h)" yLabel="temperatura (°C)" />
        <polyline points={polyPoints(a, PTS)} fill="none" stroke={MANIM.muted} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" strokeOpacity={0.6} />
        <Fade show={beat >= 1}>
          {crec.map((s) => (
            <polyline key={s.from} points={polyPoints(a, seg(s.from))} fill="none" stroke={MANIM.green} strokeWidth={7} strokeLinecap="round" />
          ))}
          <Txt x={mapX(a, 12.5)} y={mapY(a, 9)} size={22} color={MANIM.green}>creciente</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <polyline points={polyPoints(a, seg(0))} fill="none" stroke={MANIM.red} strokeWidth={7} strokeLinecap="round" />
          <polyline points={polyPoints(a, seg(4))} fill="none" stroke={MANIM.red} strokeWidth={7} strokeLinecap="round" />
          <polyline points={polyPoints(a, seg(3))} fill="none" stroke={MANIM.yellow} strokeWidth={7} strokeLinecap="round" />
          <Txt x={mapX(a, 2.5)} y={mapY(a, 15)} size={22} color={MANIM.red}>decreciente</Txt>
          <Txt x={mapX(a, 20.5)} y={mapY(a, 19)} size={22} color={MANIM.red}>decreciente</Txt>
          <Txt x={mapX(a, 15.5)} y={mapY(a, 22.5)} size={22} color={MANIM.yellow}>constante</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <circle cx={mapX(a, 14)} cy={mapY(a, 20)} r={10} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={mapX(a, 14) - 14} y={mapY(a, 20) - 14} size={24} color={MANIM.orange} anchor="end">máximo</Txt>
          <circle cx={mapX(a, 5)} cy={mapY(a, 6)} r={10} fill={MANIM.purple} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={mapX(a, 5) + 14} y={mapY(a, 6) + 28} size={24} color={MANIM.purple} anchor="start">mínimo</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
