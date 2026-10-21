import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 70;
const Y0 = 60;

/** Cuadrado de una diferencia: a² menos dos franjas ab, que quitan dos veces b², y se devuelve b² una vez. */
export function buildCuadradoDiferencia(params: { a?: number; b?: number }): AnimBuild {
  const a = Math.min(Math.max(params.a ?? 7, 3), 9);
  const b = Math.min(Math.max(params.b ?? 3, 1), a - 1);
  const u = Math.min(36, 300 / a);
  const A = a * u;
  const B = b * u;
  const R = (a - b) * u;
  const res = (a - b) ** 2;

  return {
    label: `(a − b)² = a² − 2ab + b² con a = ${a} y b = ${b}`,
    captions: [
      `Un cuadrado de lado $a = ${a}$ tiene área $a^2 = ${a * a}$. Queremos el cuadrado de lado $a - b = ${a - b}$.`,
      `Quitamos una franja de ancho $b$ por la derecha: $ab = ${a * b}$.`,
      `Quitamos otra por abajo: otro $ab = ${a * b}$. Pero el cuadradito $b^2$ de la esquina se ha quitado **dos veces**.`,
      `Hay que devolverlo una vez: $(a - b)^2 = a^2 - 2ab + b^2$. Aquí, $${res} = ${a * a} - ${2 * a * b} + ${b * b}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={Y0} width={A} height={A} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <rect x={X0} y={Y0} width={R} height={R} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={X0 + R / 2} y={Y0 + R / 2 + 10} size={26} color={MANIM.ink}>(a − b)²</Txt>
        <Fade show={beat >= 1}>
          <rect x={X0 + R} y={Y0} width={B} height={A} fill={MANIM.red} fillOpacity={0.45} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={X0 + R + B / 2} y={Y0 + R / 2 + 8} size={22} color={MANIM.ink}>ab</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <rect x={X0} y={Y0 + R} width={A} height={B} fill={MANIM.red} fillOpacity={0.45} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={X0 + R / 2} y={Y0 + R + B / 2 + 8} size={22} color={MANIM.ink}>ab</Txt>
          <rect x={X0 + R} y={Y0 + R} width={B} height={B} fill={MANIM.yellow} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={X0 + R + B / 2} y={Y0 + R + B / 2 + 8} size={20} color={MANIM.ink}>b²</Txt>
        </Fade>
        <Txt x={X0 + A / 2} y={Y0 - 14} size={24} color={MANIM.muted}>a</Txt>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={600} y={150} size={30} color={MANIM.ink}>(a − b)²</Txt>
          <Txt x={600} y={200} size={30} color={MANIM.ink}>= a² − 2ab + b²</Txt>
          <Txt x={600} y={270} size={26} color={MANIM.muted}>{`${res} = ${a * a} − ${2 * a * b} + ${b * b}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
