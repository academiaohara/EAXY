import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Regla del aspa: se intercambian los números de oxidación como subíndices y se simplifica. */
export function buildReglaAspa(): AnimBuild {
  return {
    label: "Regla del aspa: del número de oxidación al subíndice",
    beatMs: 5600,
    captions: [
      "Para formular un compuesto binario se escriben los **dos elementos** con su **número de oxidación**: aquí Fe(+3) y O(−2).",
      "Se **intercambian** los valores absolutos: el 3 del hierro pasa al oxígeno y el 2 del oxígeno, al hierro (**regla del aspa**).",
      "Queda **Fe₂O₃**: dos átomos de hierro y tres de oxígeno. **Comprobación**: 2·(+3) + 3·(−2) = 0.",
      "Si los subíndices tienen **divisor común**, se **simplifica**: Ca(+2) y O(−2) dan Ca₂O₂, que se simplifica a **CaO**.",
      "Nombre: **sistemática** (prefijos): «trióxido de dihierro». **Stock**: «óxido de hierro(III)».",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={270} y={150} size={64} color={MANIM.yellow}>Fe</Txt>
        <Txt x={430} y={150} size={64} color={MANIM.blue}>O</Txt>
        <Txt x={318} y={106} size={26} color={MANIM.yellow}>+3</Txt>
        <Txt x={466} y={106} size={26} color={MANIM.blue}>−2</Txt>
        <Fade show={beat >= 1}>
          <line x1={326} y1={96} x2={456} y2={206} stroke={MANIM.red} strokeWidth={4} />
          <line x1={470} y1={96} x2={334} y2={206} stroke={MANIM.red} strokeWidth={4} />
          <Txt x={336} y={236} size={30} color={MANIM.blue}>2</Txt>
          <Txt x={470} y={236} size={30} color={MANIM.yellow}>3</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={400} y={320} size={56} color={MANIM.green}>Fe₂O₃</Txt>
          <Txt x={400} y={364} size={20} color={MANIM.muted}>2·(+3) + 3·(−2) = 0</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={640} y={150} size={26} color={MANIM.orange}>Ca(+2) · O(−2)</Txt>
          <Txt x={640} y={190} size={26} color={MANIM.orange}>Ca₂O₂ → CaO</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={400} y={40} size={22} color={MANIM.yellow}>trióxido de dihierro · óxido de hierro(III)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
