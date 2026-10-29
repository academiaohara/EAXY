import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 400;
const CY = 520;
const R = 300;
const TOP: [number, number] = [CX, CY - R];

/** El cañón de Newton: cuanto mayor es la velocidad, más lejos cae el proyectil, hasta que no llega a caer. */
export function buildCanonNewton(): AnimBuild {
  return {
    label: "El cañón de Newton: de la caída libre a la órbita",
    beatMs: 5600,
    captions: [
      "Newton imaginó un **cañón** en lo alto de una montaña que dispara horizontalmente.",
      "Con **poca velocidad**, la gravedad curva la trayectoria y el proyectil **cae cerca** de la montaña.",
      "Con **más velocidad**, **llega más lejos** antes de caer. Pero la Tierra, al ser esférica, **se curva** bajo él.",
      "A la **velocidad orbital** (≈ 7,9 km/s cerca de la superficie), el proyectil **cae sin llegar nunca al suelo**: queda en **órbita**.",
      "Una **órbita** es una **caída libre continua**: la gravedad actúa de **fuerza centrípeta**.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={CX} cy={CY} r={R} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={3} />
        <rect x={TOP[0] - 8} y={TOP[1] - 22} width={26} height={12} rx={3} fill={MANIM.ink} />
        <Fade show={beat >= 1}>
          <path d={`M ${TOP[0] + 14} ${TOP[1] - 16} Q ${TOP[0] + 70} ${TOP[1] - 12} ${TOP[0] + 90} ${TOP[1] + 22}`} fill="none" stroke={MANIM.red} strokeWidth={4} />
          <Txt x={TOP[0] + 40} y={TOP[1] + 70} size={18} color={MANIM.red}>cae cerca</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <path d={`M ${TOP[0] + 14} ${TOP[1] - 16} Q ${TOP[0] + 170} ${TOP[1] - 12} ${TOP[0] + 230} ${TOP[1] + 70}`} fill="none" stroke={MANIM.orange} strokeWidth={4} />
          <Txt x={TOP[0] + 310} y={TOP[1] + 110} size={18} color={MANIM.orange}>cae más lejos</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <circle cx={CX} cy={CY} r={R + 34} fill="none" stroke={MANIM.green} strokeWidth={4} strokeDasharray="10 8" />
          <circle cx={CX + (R + 34) * Math.cos(-0.9)} cy={CY + (R + 34) * Math.sin(-0.9)} r={9} fill={MANIM.green} />
          <Txt x={CX + 330} y={CY - 250} size={18} color={MANIM.green}>órbita</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={CX} y={44} size={22} color={MANIM.yellow}>órbita = caída libre continua</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
