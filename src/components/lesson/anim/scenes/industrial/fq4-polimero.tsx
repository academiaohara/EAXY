import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const Y = 200;
const X0 = 90;
const DX = 70;

/** Polimerización por adición: los dobles enlaces del eteno se abren y los monómeros se encadenan. */
export function buildPolimerizacion(): AnimBuild {
  return {
    label: "Polimerización por adición: monómeros de eteno que forman polietileno",
    beatMs: 5200,
    captions: [
      "Un **polímero** se forma al unirse muchas moléculas pequeñas, los **monómeros**. Partimos del **eteno**, CH₂=CH₂.",
      "Cada monómero tiene un **doble enlace** C=C. Es la parte reactiva de la molécula.",
      "Con un **catalizador**, el doble enlace se **abre**: cada carbono queda con un electrón libre para unirse.",
      "Los monómeros se **enlazan** unos con otros formando una cadena.",
      "Resultado: una **macromolécula**, el **polietileno** –(CH₂–CH₂)ₙ–, con miles de unidades repetidas.",
    ],
    render: (beat) => {
      const unidos = beat >= 3;
      return (
        <Canvas>
          {Array.from({ length: 7 }, (_, k) => {
            const x = X0 + k * DX;
            return (
              <g key={k}>
                <circle cx={x - 16} cy={Y} r={14} fill={MANIM.blue} />
                <circle cx={x + 16} cy={Y} r={14} fill={MANIM.blue} />
                <Txt x={x - 16} y={Y + 5} size={14} color={MANIM.ink}>C</Txt>
                <Txt x={x + 16} y={Y + 5} size={14} color={MANIM.ink}>C</Txt>
                <line x1={x - 2} y1={Y - 3} x2={x + 2} y2={Y - 3} stroke={beat === 2 ? MANIM.orange : MANIM.ink} strokeWidth={3} />
                {beat < 2 && <line x1={x - 2} y1={Y + 3} x2={x + 2} y2={Y + 3} stroke={MANIM.ink} strokeWidth={3} />}
                <Txt x={x - 26} y={Y - 34} size={12} color={MANIM.muted}>H₂</Txt>
                <Txt x={x + 26} y={Y + 44} size={12} color={MANIM.muted}>H₂</Txt>
                {k < 6 && (
                  <Fade show={unidos}>
                    <line x1={x + 30} y1={Y} x2={x + DX - 30} y2={Y} stroke={MANIM.green} strokeWidth={4} />
                  </Fade>
                )}
              </g>
            );
          })}
          <Fade show={beat === 1}>
            <Txt x={300} y={110} size={20} color={MANIM.orange}>C=C: doble enlace</Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={300} y={110} size={20} color={MANIM.orange}>el doble enlace se abre</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={300} y={300} size={22} color={MANIM.green}>polietileno: –(CH₂–CH₂)ₙ–</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
