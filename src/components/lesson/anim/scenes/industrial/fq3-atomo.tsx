import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 300;
const CY = 210;
const R = [60, 110, 160];
const ang = (a: number, r: number): [number, number] => [CX + r * Math.cos(a), CY + r * Math.sin(a)];

/** Un electrón salta de nivel al absorber energía y emite un fotón al volver. */
export function buildBohrSalto(): AnimBuild {
  return {
    label: "Modelo de Bohr: el electrón salta entre niveles de energía y emite luz",
    beatMs: 5400,
    captions: [
      "En el **modelo de Bohr**, los electrones solo pueden estar en **niveles de energía** concretos alrededor del núcleo.",
      "El electrón está en el **nivel más bajo** (n = 1), el de **menor energía**: es el estado normal del átomo.",
      "Si **absorbe energía** (calor, luz, descarga eléctrica), **salta** a un nivel superior: el átomo queda **excitado**.",
      "Esa situación no dura: el electrón **vuelve** a un nivel inferior.",
      "Al **bajar**, emite un **fotón** con la energía que sobra. Cada elemento emite **colores propios**: su **espectro**.",
    ],
    render: (beat) => {
      const pos = ang(-0.6, R[[0, 0, 2, 1, 0][beat] ?? 0]!);
      return (
        <Canvas>
          {R.map((r, k) => (
            <circle key={k} cx={CX} cy={CY} r={r} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray={k === 0 ? undefined : "6 6"} />
          ))}
          <circle cx={CX} cy={CY} r={22} fill={MANIM.red} />
          <Txt x={CX} y={CY + 7} size={20} color={MANIM.ink}>+</Txt>
          <Fade show={beat >= 1}>
            <Txt x={CX - 36} y={CY - R[0]! + 20} size={18} color={MANIM.muted}>n = 1</Txt>
            <Txt x={CX - 36} y={CY - R[1]! + 20} size={18} color={MANIM.muted}>n = 2</Txt>
            <Txt x={CX - 36} y={CY - R[2]! + 20} size={18} color={MANIM.muted}>n = 3</Txt>
          </Fade>
          <Fade show={beat >= 1}>
            <circle cx={pos[0]} cy={pos[1]} r={11} fill={beat === 2 ? MANIM.orange : MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={150} y={60} size={20} color={MANIM.orange}>absorbe energía</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <path d={`M ${CX + 40} ${CY - 60} q 25 -25 50 0 t 50 0 t 50 0 t 50 0`} stroke={MANIM.green} strokeWidth={4} fill="none" />
            <Txt x={CX + 190} y={CY - 90} size={20} color={MANIM.green}>fotón (luz)</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
