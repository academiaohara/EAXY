import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Método de sustitución: 3x + 2y = 18 y x − 3y = −5, paso a paso. */
export function buildSustitucionSistema(): AnimBuild {
  return {
    label: "Método de sustitución: 3x + 2y = 18 y x − 3y = −5 tienen solución x = 4, y = 3",
    captions: [
      "Dos ecuaciones con dos incógnitas.",
      "**Despejar:** en la segunda, $x$ no tiene coeficiente: $x = 3y - 5$.",
      "**Sustituir** esa expresión en la primera: $x$ desaparece y queda una sola incógnita.",
      "**Resolver:** $9y - 15 + 2y = 18$, luego $11y = 33$ y $y = 3$.",
      "**Calcular la otra:** $x = 3 \\cdot 3 - 5 = 4$.",
      "**Comprobar** en las dos: $12 + 6 = 18$ y $4 - 9 = -5$. Solución: $(4,\\ 3)$.",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={50} size={30} color={MANIM.ink}>3x + 2y = 18</Txt>
        <Txt x={400} y={95} size={30} color={beat === 1 ? MANIM.yellow : MANIM.ink}>x − 3y = −5</Txt>
        <line x1={250} y1={115} x2={550} y2={115} stroke={MANIM.grid} strokeWidth={2} />
        <Fade show={beat >= 1} dy={8}>
          <Txt x={400} y={160} size={30} color={MANIM.yellow}>x = 3y − 5</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={210} size={30} color={MANIM.blue}>3(3y − 5) + 2y = 18</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={260} size={30} color={MANIM.green}>11y = 33  →  y = 3</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={8}>
          <Txt x={400} y={310} size={30} color={MANIM.orange}>x = 3·3 − 5 = 4</Txt>
        </Fade>
        <Fade show={beat >= 5} dy={8}>
          <rect x={250} y={335} width={300} height={56} rx={10} fill="none" stroke={MANIM.green} strokeWidth={3} />
          <Txt x={400} y={373} size={30} color={MANIM.green}>x = 4,  y = 3  ✓</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
