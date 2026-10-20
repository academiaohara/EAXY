import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const L = 200;
const R = 600;
const TOP = 70;
const BOT = 330;

/** Una gráfica es función si cada recta vertical la corta, como mucho, en un punto. */
export function buildFuncionEsNoEs(): AnimBuild {
  const vx = 40;
  return {
    label: "Cuándo una gráfica es una función",
    beatMs: 3600,
    captions: [
      "Dos gráficas: ¿cuál es una función? Una función asocia a cada valor de $x$ **un único** valor de $y$.",
      "Trazamos una recta vertical: es lo que hace $x$ fijo. En la primera la corta en **un** punto; en la segunda, en **dos**.",
      "A la primera gráfica le corresponde un único $y$ para cada $x$: **es función**. En la segunda, a algunos $x$ les corresponden dos $y$: **no es función**.",
    ],
    render: (beat) => (
      <Canvas>
        <g>
          <line x1={80} y1={BOT} x2={320} y2={BOT} stroke={MANIM.ink} strokeWidth={2.5} />
          <line x1={90} y1={BOT + 10} x2={90} y2={TOP - 10} stroke={MANIM.ink} strokeWidth={2.5} />
          <path d={`M 100 ${BOT - 40} C 150 ${TOP}, 210 ${BOT}, 300 ${TOP + 40}`} fill="none" stroke={MANIM.green} strokeWidth={5} strokeLinecap="round" />
          <Txt x={200} y={BOT + 40} size={22} color={MANIM.green}>A</Txt>
        </g>
        <g>
          <line x1={480} y1={BOT} x2={720} y2={BOT} stroke={MANIM.ink} strokeWidth={2.5} />
          <line x1={490} y1={BOT + 10} x2={490} y2={TOP - 10} stroke={MANIM.ink} strokeWidth={2.5} />
          <ellipse cx={600} cy={(TOP + BOT) / 2} rx={90} ry={95} fill="none" stroke={MANIM.red} strokeWidth={5} />
          <Txt x={600} y={BOT + 40} size={22} color={MANIM.red}>B</Txt>
        </g>
        <Fade show={beat >= 1}>
          <line x1={L + vx - 50} y1={TOP - 10} x2={L + vx - 50} y2={BOT} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
          <line x1={R + 20} y1={TOP - 10} x2={R + 20} y2={BOT} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={200} y={44} size={26} color={MANIM.green}>✓ es función</Txt>
          <Txt x={600} y={44} size={26} color={MANIM.red}>✗ no es función</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
