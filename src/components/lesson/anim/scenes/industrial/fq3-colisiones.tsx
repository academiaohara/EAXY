import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const BASE: [number, number][] = [[250, 140], [330, 200], [420, 150], [500, 220], [290, 270], [380, 300], [470, 280], [550, 160], [330, 110], [440, 240], [260, 220], [520, 100], [360, 160], [600, 250]];
const DIR: [number, number][] = [[1, 0.4], [-1, 0.2], [0.6, 1], [-0.8, -0.6], [1, -0.5], [-0.3, 1], [-1, -0.2], [0.5, -1], [1, 0.9], [-1, 0.7], [0.2, -1], [-0.6, 0.8], [0.9, -0.2], [-1, -0.4]];

/** Teoría de colisiones: qué hace que una reacción vaya más deprisa. */
export function buildColisiones(): AnimBuild {
  return {
    label: "Teoría de colisiones: factores que modifican la velocidad de una reacción",
    beatMs: 5400,
    captions: [
      "Para que ocurra una reacción, las partículas de los reactivos deben **chocar** con **energía suficiente**.",
      "Al **subir la temperatura**, las partículas se mueven **más deprisa**: hay más choques y más energéticos.",
      "Con **mayor concentración** hay **más partículas** en el mismo volumen: los choques son **más frecuentes**.",
      "Un sólido **en polvo** expone **más superficie** que un trozo: hay más partículas disponibles para chocar.",
      "Un **catalizador** ofrece un camino con **menos barrera de energía**: la reacción es **más rápida** y él **no se consume**.",
    ],
    render: (beat) => {
      const n = beat === 2 ? 14 : 7;
      const len = beat === 1 ? 46 : 18;
      return (
        <Canvas>
          <Fade show={beat <= 2}>
            <rect x={190} y={70} width={460} height={270} rx={10} fill="none" stroke={MANIM.muted} strokeWidth={3} />
            {BASE.slice(0, n).map((p, i) => {
              const d = DIR[i]!;
              const L = Math.hypot(d[0], d[1]);
              return (
                <g key={i}>
                  <Seg a={p} b={[p[0] + (d[0] / L) * len, p[1] + (d[1] / L) * len]} color={beat === 1 ? MANIM.red : MANIM.yellow} width={3} />
                  <Dot p={p} r={11} color={i % 2 === 0 ? MANIM.blue : MANIM.orange} />
                </g>
              );
            })}
          </Fade>
          <Fade show={beat === 3}>
            <rect x={110} y={140} width={150} height={150} fill={MANIM.muted} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={3} />
            <Txt x={185} y={380} size={20} color={MANIM.muted}>un trozo</Txt>
            {Array.from({ length: 16 }, (_, k) => (
              <rect key={k} x={420 + (k % 4) * 52} y={140 + Math.floor(k / 4) * 52} width={40} height={40} fill={MANIM.muted} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
            ))}
            <Txt x={520} y={380} size={20} color={MANIM.muted}>en polvo: más superficie</Txt>
          </Fade>
          <Fade show={beat === 4}>
            <path d="M 100 300 L 200 300 Q 300 300 350 90 Q 400 300 500 300 L 700 300" fill="none" stroke={MANIM.red} strokeWidth={4} />
            <path d="M 100 300 L 200 300 Q 300 300 350 180 Q 400 300 500 300 L 700 300" fill="none" stroke={MANIM.green} strokeWidth={4} />
            <Txt x={350} y={70} size={20} color={MANIM.red}>sin catalizador</Txt>
            <Txt x={350} y={165} size={20} color={MANIM.green}>con catalizador</Txt>
            <Txt x={150} y={340} size={18} color={MANIM.muted}>reactivos</Txt>
            <Txt x={620} y={340} size={18} color={MANIM.muted}>productos</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
