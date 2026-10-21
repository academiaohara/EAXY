import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 80;
const W = 640;

/** Test de 50 preguntas (+1 por acierto, −0,5 por fallo, nota 24,5): problema con sistema. */
export function buildSistemaTest(): AnimBuild {
  const total = 50;
  const x = 33;
  const y = 17;
  const w = (v: number) => (v / total) * W;

  return {
    label: "Test de 50 preguntas: 33 aciertos y 17 fallos",
    captions: [
      "50 preguntas: cada una es un acierto $(x)$ o un fallo $(y)$. Primera ecuación: $x + y = 50$.",
      "Cada acierto suma $1$ y cada fallo resta $0{,}5$: $x - 0{,}5y = 24{,}5$.",
      "Se sustituye $x = 50 - y$: $50 - 1{,}5y = 24{,}5$, luego $y = 17$ y $x = 33$.",
      "**Interpretar:** 33 aciertos y 17 fallos dan $33 - 8{,}5 = 24{,}5$. La solución es entera y positiva, como pide el enunciado.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={70} width={W} height={56} rx={8} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={400} y={52} size={26} color={MANIM.muted}>50 preguntas</Txt>
        {beat >= 2 ? (
          <g>
            <rect x={X0} y={70} width={w(x)} height={56} rx={8} fill={MANIM.green} fillOpacity={0.45} stroke={MANIM.green} strokeWidth={3} className="anim-t" />
            <rect x={X0 + w(x)} y={70} width={w(y)} height={56} rx={8} fill={MANIM.red} fillOpacity={0.45} stroke={MANIM.red} strokeWidth={3} className="anim-t" />
            <Txt x={X0 + w(x) / 2} y={106} size={28} color={MANIM.ink}>{`x = ${x}`}</Txt>
            <Txt x={X0 + w(x) + w(y) / 2} y={106} size={28} color={MANIM.ink}>{`y = ${y}`}</Txt>
          </g>
        ) : (
          <Txt x={400} y={106} size={28} color={MANIM.ink}>x aciertos + y fallos</Txt>
        )}
        <Fade show={beat >= 0} dy={8}>
          <Txt x={400} y={190} size={32} color={MANIM.blue}>x + y = 50</Txt>
        </Fade>
        <Fade show={beat >= 1} dy={8}>
          <Txt x={400} y={240} size={32} color={MANIM.yellow}>x − 0,5y = 24,5</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={295} size={30} color={MANIM.green}>50 − 1,5y = 24,5  →  y = 17,  x = 33</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={355} size={30} color={MANIM.orange}>33 − 0,5·17 = 24,5  ✓</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
