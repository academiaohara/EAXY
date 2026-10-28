import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 70;
const Y0 = 70;
const X1 = 470;
const Y1 = 330;
/** Punto de la rampa a la fracción de altura h (1 = arriba, 0 = abajo). */
const punto = (h: number): [number, number] => [X0 + (1 - h) * (X1 - X0), Y1 - h * (Y1 - Y0)];
const FRACCIONES = [1, 0.7, 0.4, 0.05];
const BAR = 210;

export function buildConservacionEnergia(): AnimBuild {
  return {
    label: "Conservación de la energía mecánica en una caída por una rampa sin rozamiento",
    beatMs: 5400,
    captions: [
      "Una bola está **en lo alto** de una rampa, **en reposo**: toda su energía es **potencial**.",
      "Al **bajar**, pierde altura: su energía **potencial disminuye** y gana **velocidad**: aumenta la **cinética**.",
      "A mitad de la bajada, la energía **potencial y la cinética** son **parecidas**.",
      "Cerca del suelo, casi toda la energía es **cinética**: la bola va **más rápido**.",
      "En todo momento **Ep + Ec es la misma**: la energía se ha **transformado**, no se ha perdido (sin rozamiento).",
    ],
    render: (beat) => {
      const h = FRACCIONES[Math.min(beat, 3)]!;
      const [bx, by] = punto(h);
      const ep = h;
      const ec = 1 - h;
      return (
        <Canvas>
          <path d={`M ${X0} ${Y0} L ${X1} ${Y1} L 560 ${Y1}`} stroke={MANIM.ink} strokeWidth={5} fill="none" />
          <circle cx={bx} cy={by - 16} r={16} fill={MANIM.orange} stroke={MANIM.ink} strokeWidth={3} />
          <path d={`M ${X0 - 20} ${Y0} L ${X0 - 20} ${Y1}`} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={X0 - 34} y={(Y0 + Y1) / 2} size={18} color={MANIM.muted}>altura</Txt>
          <path d={`M 640 ${Y1} L 780 ${Y1}`} stroke={MANIM.ink} strokeWidth={3} />
          <rect x={650} y={Y1 - ep * BAR} width={50} height={ep * BAR} fill={MANIM.blue} fillOpacity={0.85} />
          <rect x={715} y={Y1 - ec * BAR} width={50} height={ec * BAR} fill={MANIM.orange} fillOpacity={0.85} />
          <Txt x={675} y={Y1 + 28} size={18} color={MANIM.blue}>Ep</Txt>
          <Txt x={740} y={Y1 + 28} size={18} color={MANIM.orange}>Ec</Txt>
          <Fade show={beat >= 4}>
            <rect x={620} y={Y1 - BAR - 70} width={160} height={36} rx={8} fill={MANIM.green} fillOpacity={0.2} stroke={MANIM.green} strokeWidth={2} />
            <Txt x={700} y={Y1 - BAR - 45} size={20} color={MANIM.green}>Ep + Ec = constante</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
