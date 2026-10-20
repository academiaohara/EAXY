import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 70;
const Y0 = 90;

/** Cuadrado de una suma: un cuadrado de lado a + b se parte en a², b² y dos rectángulos ab. */
export function buildCuadradoSuma(params: { a?: number; b?: number }): AnimBuild {
  const a = Math.min(Math.max(params.a ?? 5, 2), 8);
  const b = Math.min(Math.max(params.b ?? 3, 1), 6);
  const u = Math.min(30, 270 / (a + b));
  const s = (a + b) * u;
  const A = a * u;
  const B = b * u;
  const total = (a + b) ** 2;

  return {
    label: `(a + b)² = a² + 2ab + b² con a = ${a} y b = ${b}`,
    captions: [
      `Un cuadrado de lado $a + b$ tiene área $(a + b)^2$. Con $a = ${a}$ y $b = ${b}$ el lado mide $${a + b}$.`,
      `Lo partimos en cuatro zonas: un cuadrado de lado $a$, otro de lado $b$ y **dos rectángulos** $a \\times b$.`,
      `Sumando las zonas: $(a + b)^2 = a^2 + b^2 + 2ab$. Aquí, $${total} = ${a * a} + ${b * b} + ${2 * a * b}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={Y0} width={s} height={s} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={X0 + s / 2} y={Y0 - 14} size={26} color={MANIM.ink}>a + b</Txt>
        <Txt x={X0 - 36} y={Y0 + s / 2 + 8} size={26} color={MANIM.ink}>a + b</Txt>
        <Fade show={beat >= 1}>
          <rect x={X0} y={Y0} width={A} height={A} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
          <rect x={X0 + A} y={Y0 + A} width={B} height={B} fill={MANIM.green} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
          <rect x={X0 + A} y={Y0} width={B} height={A} fill={MANIM.yellow} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
          <rect x={X0} y={Y0 + A} width={A} height={B} fill={MANIM.yellow} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={X0 + A / 2} y={Y0 + A / 2 + 10} size={28} color={MANIM.ink}>a²</Txt>
          <Txt x={X0 + A + B / 2} y={Y0 + A + B / 2 + 10} size={26} color={MANIM.ink}>b²</Txt>
          <Txt x={X0 + A + B / 2} y={Y0 + A / 2 + 10} size={24} color={MANIM.ink}>ab</Txt>
          <Txt x={X0 + A / 2} y={Y0 + A + B / 2 + 9} size={24} color={MANIM.ink}>ab</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={560} y={170} size={30} color={MANIM.ink}>(a + b)²</Txt>
          <Txt x={560} y={220} size={30} color={MANIM.ink}>= a² + 2ab + b²</Txt>
          <Txt x={560} y={290} size={26} color={MANIM.muted}>{`${total} = ${a * a} + ${2 * a * b} + ${b * b}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
