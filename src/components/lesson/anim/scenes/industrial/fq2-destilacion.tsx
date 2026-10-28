import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Seg } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const FC = { x: 170, y: 300, r: 62 };
const COND = { x1: 260, y1: 150, x2: 560, y2: 262 };
const gotas = [0.25, 0.45, 0.65, 0.85];

export function buildDestilacion(): AnimBuild {
  return {
    label: "Separación de una mezcla de alcohol y agua por destilación",
    beatMs: 5600,
    captions: [
      "El **montaje de destilación**: un **matraz** con la mezcla (alcohol y agua), un **refrigerante** y un recipiente para recoger el **destilado**.",
      "Se **calienta** el matraz. El **alcohol** hierve a **78 °C**, antes que el agua (100 °C).",
      "El componente más **volátil** pasa a **vapor** y sube por el cuello del matraz hacia el refrigerante.",
      "En el **refrigerante**, rodeado de agua fría, el vapor se **enfría** y se **condensa**: vuelve a ser líquido.",
      "El líquido condensado, **casi alcohol puro**, gotea y se recoge en el recipiente: es el **destilado**.",
      "En el matraz queda sobre todo el **agua**, que hierve a mayor temperatura. Así se han **separado** los dos líquidos por su **punto de ebullición**.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={FC.x} cy={FC.y} r={FC.r} fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <rect x={FC.x - 14} y={FC.y - FC.r - 70} width={28} height={80} fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <path d={`M ${FC.x - 58} ${FC.y + 10} A ${FC.r} ${FC.r} 0 0 0 ${FC.x + 58} ${FC.y + 10} Z`} fill={MANIM.blue} fillOpacity={beat >= 5 ? 0.5 : 0.35} />
        <Txt x={FC.x} y={FC.y - 14} size={18} color={MANIM.muted}>mezcla</Txt>
        <path d={`M ${FC.x} ${FC.y - FC.r - 70} L ${COND.x1} ${COND.y1}`} stroke={MANIM.ink} strokeWidth={4} fill="none" />
        <polygon points={`${COND.x1},${COND.y1 - 22} ${COND.x2},${COND.y2 - 22} ${COND.x2},${COND.y2 + 22} ${COND.x1},${COND.y1 + 22}`} fill={MANIM.blue} fillOpacity={beat >= 3 ? 0.22 : 0.06} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={(COND.x1 + COND.x2) / 2} y={(COND.y1 + COND.y2) / 2 - 38} size={18} color={MANIM.muted}>refrigerante</Txt>
        <path d={`M ${COND.x2} ${COND.y2} L ${COND.x2 + 30} ${COND.y2 + 50}`} stroke={MANIM.ink} strokeWidth={4} fill="none" />
        <path d="M 600 350 L 600 400 L 700 400 L 700 350" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <Txt x={650} y={340} size={18} color={MANIM.muted}>destilado</Txt>
        <Fade show={beat >= 1}>
          {[-24, 0, 24].map((dx) => (
            <path key={dx} d={`M ${FC.x + dx} ${FC.y + FC.r + 36} q 8 -14 0 -28 q -8 -14 0 -28`} stroke={MANIM.orange} strokeWidth={4} fill="none" />
          ))}
          <Txt x={FC.x + 70} y={FC.y + FC.r + 46} size={18} color={MANIM.orange} anchor="start">calor</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${FC.x - 6 + (i - 1) * 8} ${FC.y - 20 - i * 40} l 0 -22 l -5 8 m 5 -8 l 5 8`} stroke={MANIM.purple} strokeWidth={3} fill="none" />
          ))}
          <Txt x={FC.x - 90} y={FC.y - FC.r - 20} size={18} color={MANIM.purple}>vapor (78 °C)</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={[320, 218]} b={[500, 280]} color={MANIM.blue} width={0} />
          <Txt x={(COND.x1 + COND.x2) / 2 + 30} y={(COND.y1 + COND.y2) / 2 + 70} size={17} color={MANIM.blue}>agua fría</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          {gotas.map((g) => (
            <circle key={g} cx={COND.x1 + (COND.x2 - COND.x1) * g} cy={COND.y1 + (COND.y2 - COND.y1) * g + 8} r={5} fill={MANIM.green} />
          ))}
          <path d="M 600 400 L 700 400 L 700 372 L 600 372 Z" fill={MANIM.green} fillOpacity={0.4} />
        </Fade>
        <Fade show={beat >= 5}>
          <Txt x={FC.x} y={FC.y + 34} size={16} color={MANIM.blue}>queda el agua</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
