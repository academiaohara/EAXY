import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Un monomio es un producto: coeficiente (número) por parte literal (letras con sus exponentes). */
export function buildMonomioPartes(): AnimBuild {
  return {
    label: "El monomio −3x²y separado en coeficiente −3 y parte literal x²y, y leído como producto −3 · x · x · y",
    captions: [
      "Este es un monomio: $-3x^2y$. Parece una sola cosa, pero tiene **dos piezas**.",
      "El **coeficiente** es el número conocido que multiplica: $-3$.",
      "La **parte literal** son las letras con sus exponentes: $x^2y$.",
      "Un monomio es solo un **producto**: $-3 \\cdot x \\cdot x \\cdot y$. Por eso las letras pegadas se multiplican.",
    ],
    render: (beat) => {
      const coef = beat >= 1;
      const lit = beat >= 2;
      const prod = beat >= 3;
      return (
        <Canvas>
          <Fade show={!prod}>
            <Txt x={400} y={170} size={110} weight={800}>
              <tspan fill={coef ? MANIM.yellow : MANIM.ink}>−3</tspan>
              <tspan fill={lit ? MANIM.blue : MANIM.ink}>x²y</tspan>
            </Txt>
          </Fade>
          <Fade show={prod} dy={10}>
            <Txt x={400} y={170} size={80} weight={800}>
              <tspan fill={MANIM.yellow}>−3</tspan>
              <tspan fill={MANIM.muted}> · </tspan>
              <tspan fill={MANIM.blue}>x</tspan>
              <tspan fill={MANIM.muted}> · </tspan>
              <tspan fill={MANIM.blue}>x</tspan>
              <tspan fill={MANIM.muted}> · </tspan>
              <tspan fill={MANIM.blue}>y</tspan>
            </Txt>
          </Fade>
          <Fade show={coef} dy={-8}>
            <rect x={170} y={230} width={200} height={74} rx={14} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={270} y={262} size={22} color={MANIM.yellow}>
              coeficiente
            </Txt>
            <Txt x={270} y={292} size={20} color={MANIM.muted}>
              número conocido
            </Txt>
          </Fade>
          <Fade show={lit} dy={-8}>
            <rect x={400} y={230} width={230} height={74} rx={14} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3} />
            <Txt x={515} y={262} size={22} color={MANIM.blue}>
              parte literal
            </Txt>
            <Txt x={515} y={292} size={20} color={MANIM.muted}>
              letras y exponentes
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
