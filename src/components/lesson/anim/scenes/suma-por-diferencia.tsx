import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 60;
const Y0 = 80;

/** Suma por diferencia: a² − b² se corta y se recoloca en un rectángulo (a + b) × (a − b). */
export function buildSumaPorDiferencia(params: { a?: number; b?: number }): AnimBuild {
  const a = Math.min(Math.max(params.a ?? 7, 3), 9);
  const b = Math.min(Math.max(params.b ?? 3, 1), a - 1);
  const u = Math.min(28, 220 / a);
  const A = a * u;
  const B = b * u;
  const D = (a - b) * u;
  const bigX = 400;
  const bigY = 190;

  return {
    label: `a² − b² = (a + b)(a − b) con a = ${a} y b = ${b}`,
    captions: [
      `Al cuadrado de lado $a$ (área $a^2$) le quitamos una esquina cuadrada de lado $b$: queda $a^2 - b^2$.`,
      `Cortamos la figura en dos rectángulos: uno de $a \\times (a - b)$ y otro de $(a - b) \\times b$.`,
      `Girando el pequeño y pegándolo al grande sale un rectángulo de $(a + b) \\times (a - b)$.`,
      `Misma área, dos expresiones: $a^2 - b^2 = (a + b)(a - b)$. Aquí, $${a * a - b * b} = ${a + b} \\cdot ${a - b}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <g className="anim-t" style={{ opacity: beat >= 2 ? 0.25 : 1 }}>
          <rect x={X0} y={Y0} width={A} height={D} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
          <rect x={X0} y={Y0 + D} width={D} height={B} fill={beat >= 1 ? MANIM.green : MANIM.blue} fillOpacity={0.55} stroke={beat >= 1 ? MANIM.ink : "none"} strokeWidth={2} className="anim-t" />
                    <rect x={X0 + D} y={Y0 + D} width={B} height={B} fill="none" stroke={MANIM.red} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={X0 + A / 2} y={Y0 - 12} size={24} color={MANIM.ink}>a</Txt>
          <Txt x={X0 + D + B / 2} y={Y0 + D + B / 2 + 9} size={22} color={MANIM.red}>b²</Txt>
        </g>
        <Fade show={beat >= 2} dy={8}>
          <rect x={bigX} y={bigY} width={A} height={D} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
          <rect x={bigX + A} y={bigY} width={B} height={D} fill={MANIM.green} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={bigX + (A + B) / 2} y={bigY - 12} size={24} color={MANIM.ink}>a + b</Txt>
          <Txt x={bigX - 30} y={bigY + D / 2 + 8} size={24} color={MANIM.ink}>a − b</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={560} y={bigY + D + 70} size={30} color={MANIM.orange}>a² − b² = (a + b)(a − b)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
