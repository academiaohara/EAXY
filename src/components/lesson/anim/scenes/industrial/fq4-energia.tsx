import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const S = [0, 0.25, 0.5, 0.75, 1];
const X = (u: number): number => 60 + u * 420;
const H0 = 230;
const Y = (u: number): number => 340 - H0 * (2 * u - 1) ** 2;

/** Una bola en una pista en U: la energía potencial se convierte en cinética y vuelta, y la mecánica se conserva. */
export function buildConservacionPista(): AnimBuild {
  return {
    label: "Conservación de la energía mecánica en una pista sin rozamiento",
    beatMs: 5400,
    captions: [
      "Una bola se suelta en lo alto de una pista **sin rozamiento**. Toda su energía es **potencial**: Ep máxima, Ec = 0.",
      "Al bajar, la **altura disminuye** (baja la Ep) y la **velocidad aumenta** (sube la Ec).",
      "En el punto más bajo, h = 0: toda la energía es **cinética**, con la **máxima velocidad**.",
      "Al subir de nuevo, la Ec se **transforma otra vez** en Ep: la bola frena.",
      "Llega a la **misma altura** de partida. La **energía mecánica Em = Ec + Ep** ha sido **constante** todo el rato.",
    ],
    render: (beat) => {
      const u = S[beat] ?? 0;
      const ep = (2 * u - 1) ** 2;
      const pts = Array.from({ length: 41 }, (_, k) => `${X(k / 40)},${Y(k / 40)}`).join(" ");
      return (
        <Canvas>
          <polyline points={pts} fill="none" stroke={MANIM.muted} strokeWidth={5} />
          <circle cx={X(u)} cy={Y(u) - 14} r={14} fill={MANIM.orange} stroke={MANIM.ink} strokeWidth={2} />
          <rect x={570} y={340 - ep * 230} width={36} height={ep * 230} fill={MANIM.green} />
          <rect x={620} y={340 - (1 - ep) * 230} width={36} height={(1 - ep) * 230} fill={MANIM.orange} />
          <rect x={670} y={110} width={36} height={230} fill={MANIM.yellow} fillOpacity={0.85} />
          <line x1={560} y1={340} x2={720} y2={340} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={588} y={366} size={18} color={MANIM.green}>Ep</Txt>
          <Txt x={638} y={366} size={18} color={MANIM.orange}>Ec</Txt>
          <Txt x={688} y={366} size={18} color={MANIM.yellow}>Em</Txt>
          <Fade show={beat >= 4}>
            <Txt x={300} y={60} size={24} color={MANIM.yellow}>Em = Ec + Ep = constante</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
