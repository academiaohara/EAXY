import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** La raíz cuadrada deshace el cuadrado: lado ↔ área. */
export function buildRaizCuadrado(params: { a?: number }): AnimBuild {
  const s = Math.min(Math.max(params.a ?? 5, 2), 8);
  const cell = Math.min(40, 280 / s);
  const x0 = 200 - (s * cell) / 2;
  const y0 = 70;
  const area = s * s;

  return {
    label: `Raíz cuadrada: el cuadrado de lado ${s} tiene área ${area}`,
    captions: [
      `Un cuadrado de lado $${s}$.`,
      `Su área es $${s}^2 = ${area}$: elevar al cuadrado lleva del lado al área.`,
      `Al revés: si el área es ${area}, el lado es $\\sqrt{${area}} = ${s}$. La raíz deshace la potencia.`,
      `Con un cubo pasa igual: $2^3 = 8$ y $\\sqrt[3]{8} = 2$.`,
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 2}>
          <rect x={x0} y={y0} width={s * cell} height={s * cell} fill={beat >= 1 ? "rgba(88,196,221,0.25)" : "none"} stroke={MANIM.blue} strokeWidth={3} className="anim-t" />
          {beat >= 1 && Array.from({ length: s - 1 }, (_, i) => (
            <g key={i}>
              <line x1={x0 + (i + 1) * cell} y1={y0} x2={x0 + (i + 1) * cell} y2={y0 + s * cell} stroke={MANIM.blue} strokeOpacity={0.5} />
              <line x1={x0} y1={y0 + (i + 1) * cell} x2={x0 + s * cell} y2={y0 + (i + 1) * cell} stroke={MANIM.blue} strokeOpacity={0.5} />
            </g>
          ))}
          <Txt x={x0 + (s * cell) / 2} y={y0 - 16} size={26} color={MANIM.yellow}>{`lado = ${s}`}</Txt>
        </Fade>
        <Fade show={beat === 1} dy={8}>
          <Txt x={560} y={170} size={32} color={MANIM.ink}>{`${s}² = ${area}`}</Txt>
          <Txt x={560} y={215} size={24} color={MANIM.muted}>área</Txt>
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <Txt x={560} y={170} size={32} color={MANIM.orange}>{`√${area} = ${s}`}</Txt>
          <Txt x={560} y={215} size={24} color={MANIM.muted}>lado</Txt>
        </Fade>
        <Fade show={beat === 3} dy={8}>
          <Txt x={400} y={170} size={40} color={MANIM.blue}>2³ = 8</Txt>
          <Txt x={400} y={250} size={40} color={MANIM.orange}>∛8 = 2</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
