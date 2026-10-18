import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/**
 * Traducir «el doble de la edad que tenía el año pasado»: la frase se lee por trozos
 * y el paréntesis nace de que el doble afecta a todo el resultado.
 */
export function buildEnunciadoExpresion(): AnimBuild {
  return {
    label: "Traducción por trozos de «el doble de la edad del año pasado»: x, x − 1 y 2(x − 1), frente al error 2x − 1",
    captions: [
      "La edad de Juan es lo que no sabemos: la llamamos $x$.",
      "«La edad que tenía el año pasado» es **un año menos**: $x - 1$.",
      "«El doble de» eso: el doble se aplica a **todo** lo anterior, así que lo encerramos en un paréntesis: $2(x - 1)$.",
      "Si no hay paréntesis, $2x - 1$ duplica solo la $x$. Con $x = 5$: **8** frente a **9**. No dicen lo mismo.",
    ],
    render: (beat) => (
      <Canvas>
        {/* la frase */}
        <Txt x={400} y={52} size={26} color={MANIM.muted}>
          <tspan fill={beat >= 2 ? MANIM.yellow : MANIM.muted}>el doble de </tspan>
          <tspan fill={beat >= 1 ? MANIM.blue : MANIM.muted}>la edad que tenía el año pasado</tspan>
        </Txt>
        {/* x, x - 1, 2(x - 1) */}
        <Fade show={beat === 0} dy={10}>
          <Txt x={400} y={190} size={80} color={MANIM.blue} weight={800}>
            x
          </Txt>
        </Fade>
        <Fade show={beat === 1} dy={10}>
          <Txt x={400} y={190} size={80} color={MANIM.blue} weight={800}>
            x − 1
          </Txt>
        </Fade>
        <Fade show={beat === 2} dy={10}>
          <Txt x={400} y={190} size={80} weight={800}>
            <tspan fill={MANIM.yellow}>2</tspan>
            <tspan fill={MANIM.ink}>(</tspan>
            <tspan fill={MANIM.blue}>x − 1</tspan>
            <tspan fill={MANIM.ink}>)</tspan>
          </Txt>
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <g>
            <rect x={90} y={110} width={290} height={170} rx={16} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={235} y={165} size={46} color={MANIM.green} weight={800}>
              2(x − 1)
            </Txt>
            <Txt x={235} y={225} size={26} color={MANIM.ink}>
              2 · (5 − 1) = 8
            </Txt>
            <Txt x={235} y={262} size={22} color={MANIM.green}>
              el doble del año pasado
            </Txt>
            <rect x={420} y={110} width={290} height={170} rx={16} fill={MANIM.panel} stroke={MANIM.red} strokeWidth={3} />
            <Txt x={565} y={165} size={46} color={MANIM.red} weight={800}>
              2x − 1
            </Txt>
            <Txt x={565} y={225} size={26} color={MANIM.ink}>
              2 · 5 − 1 = 9
            </Txt>
            <Txt x={565} y={262} size={22} color={MANIM.red}>
              el doble de hoy, menos 1
            </Txt>
          </g>
        </Fade>
      </Canvas>
    ),
  };
}
