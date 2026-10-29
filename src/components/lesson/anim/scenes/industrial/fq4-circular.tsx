import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 300;
const CY = 210;
const R = 120;
const ANG = [0.4, 0.4, 0.4, 1.9, 3.6];

/** MCU: la rapidez no cambia, pero la velocidad (tangente) gira y la aceleración apunta al centro. */
export function buildMcu(): AnimBuild {
  return {
    label: "Movimiento circular uniforme: velocidad tangente y aceleración hacia el centro",
    beatMs: 5400,
    captions: [
      "En el **movimiento circular uniforme** el móvil recorre una circunferencia con **rapidez constante**.",
      "Su **velocidad** es siempre **tangente** a la trayectoria: tiene la dirección del movimiento en cada instante.",
      "El módulo de la velocidad no cambia, pero **su dirección sí**. Por eso hay **aceleración**.",
      "Un instante después, la velocidad apunta en **otra dirección**, y la aceleración sigue dirigida **hacia el centro**.",
      "Es la **aceleración centrípeta**: **a = v²/R**. Sin ella, el móvil saldría por la tangente.",
    ],
    render: (beat) => {
      const a = ANG[beat] ?? 0.4;
      const px = CX + R * Math.cos(a);
      const py = CY - R * Math.sin(a);
      const vx = -Math.sin(a);
      const vy = -Math.cos(a);
      const ux = (CX - px) / R;
      const uy = (CY - py) / R;
      return (
        <Canvas>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
          <circle cx={CX} cy={CY} r={5} fill={MANIM.ink} />
          <Fade show={beat >= 1}>
            <line x1={px} y1={py} x2={px + vx * 90} y2={py + vy * 90} stroke={MANIM.green} strokeWidth={5} />
            <Txt x={px + vx * 112} y={py + vy * 112 + 6} size={22} color={MANIM.green}>v</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <line x1={px} y1={py} x2={px + ux * 70} y2={py + uy * 70} stroke={MANIM.red} strokeWidth={5} />
            <Txt x={px + ux * 90} y={py + uy * 90 + 6} size={22} color={MANIM.red}>a</Txt>
          </Fade>
          <circle cx={px} cy={py} r={12} fill={MANIM.orange} stroke={MANIM.ink} strokeWidth={2} />
          <Fade show={beat >= 4}>
            <Txt x={CX} y={400} size={24} color={MANIM.yellow}>a = v²/R = ω²·R</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
