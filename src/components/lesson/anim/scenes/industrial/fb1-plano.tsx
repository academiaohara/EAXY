import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const TH = Math.PI / 6;
const A: [number, number] = [110, 370];
const B: [number, number] = [650, 370];
const C: [number, number] = [650, 370 - 540 * Math.tan(TH)];
const U: [number, number] = [Math.cos(TH), -Math.sin(TH)];
const N: [number, number] = [-Math.sin(TH), -Math.cos(TH)];
const P0: [number, number] = [A[0] + U[0] * 320 + N[0] * 22, A[1] + U[1] * 320 + N[1] * 22];

function Flecha({ v, len, color }: { v: [number, number]; len: number; color: string }) {
  const x2 = P0[0] + v[0] * len;
  const y2 = P0[1] + v[1] * len;
  const a = Math.atan2(v[1], v[0]);
  const hx = (d: number) => x2 - 13 * Math.cos(a) + d * 6 * Math.cos(a + Math.PI / 2);
  const hy = (d: number) => y2 - 13 * Math.sin(a) + d * 6 * Math.sin(a + Math.PI / 2);
  return (
    <g>
      <line x1={P0[0]} y1={P0[1]} x2={x2} y2={y2} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx(1)},${hy(1)} ${hx(-1)},${hy(-1)}`} fill={color} />
    </g>
  );
}

/** Descomposición del peso en un plano inclinado y balance de fuerzas. */
export function buildPlano(): AnimBuild {
  return {
    label: "Plano inclinado: descomposición del peso, normal y rozamiento",
    beatMs: 5600,
    captions: [
      "Un bloque sobre un plano inclinado un ángulo **θ**. Sobre él actúan el **peso P = m·g**, vertical hacia abajo, y la **normal N**.",
      "Se eligen ejes **paralelo** y **perpendicular** al plano y se **descompone el peso**: **Pₓ = P·sen θ** y **P_y = P·cos θ**.",
      "**Perpendicular al plano** no hay aceleración: **N = P_y = m·g·cos θ**.",
      "**Paralelo al plano**, Pₓ tira hacia abajo; el **rozamiento F_r = μ·N** se opone al movimiento.",
      "**ΣF = m·a** → **a = g·(sen θ − μ·cos θ)**. La masa se simplifica: no influye en la aceleración.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={`${A.join(",")} ${B.join(",")} ${C.join(",")}`} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.ink} strokeWidth={3} />
        <path d={`M ${A[0] + 90} ${A[1]} A 90 90 0 0 0 ${A[0] + 90 * Math.cos(TH)} ${A[1] - 90 * Math.sin(TH)}`} fill="none" stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={A[0] + 118} y={A[1] - 12} size={20} color={MANIM.ink}>θ</Txt>
        <rect x={P0[0] - 28} y={P0[1] - 22} width={56} height={44} fill={MANIM.blue} fillOpacity={0.8} transform={`rotate(${-30} ${P0[0]} ${P0[1]})`} />
        <Flecha v={[0, 1]} len={130} color={MANIM.red} />
        <Txt x={P0[0] + 24} y={P0[1] + 140} size={20} color={MANIM.red}>P = m·g</Txt>
        <Fade show={beat >= 1}>
          <Flecha v={[-U[0], -U[1]]} len={65} color={MANIM.yellow} />
          <Flecha v={[-N[0], -N[1]]} len={112} color={MANIM.orange} />
          <Txt x={P0[0] - 100} y={P0[1] + 60} size={18} color={MANIM.yellow}>Pₓ</Txt>
          <Txt x={P0[0] + 78} y={P0[1] + 92} size={18} color={MANIM.orange}>P_y</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Flecha v={N} len={112} color={MANIM.green} />
          <Txt x={P0[0] - 90} y={P0[1] - 105} size={20} color={MANIM.green}>N = P_y</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Flecha v={U} len={48} color={MANIM.purple} />
          <Txt x={P0[0] + 78} y={P0[1] - 52} size={18} color={MANIM.purple}>F_r = μ·N</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={560} y={48} size={24} color={MANIM.yellow}>a = g·(sen θ − μ·cos θ)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
