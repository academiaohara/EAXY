import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const STEP = 58;
const R = 21;

/** Potencias de la misma base: contar factores para producto y cociente. */
export function buildPotenciasFactores(params: { a?: number; b?: number }): AnimBuild {
  const m = Math.min(Math.max(params.a ?? 4, 2), 6);
  const n = Math.min(Math.max(params.b ?? 2, 1), m - 1);
  const total = m + n;
  const left = m - n;
  const x0 = (count: number) => 400 - ((count - 1) * STEP) / 2;
  const tok = (x: number, y: number, color: string, struck = false) => (
    <g>
      <circle cx={x} cy={y} r={R} fill={MANIM.panel} stroke={color} strokeWidth={3} />
      <Txt x={x} y={y + 8} size={22} color={color}>a</Txt>
      {struck && <line x1={x - 16} y1={y + 16} x2={x + 16} y2={y - 16} stroke={MANIM.red} strokeWidth={4} />}
    </g>
  );

  return {
    label: `Potencias de la misma base: a^${m} · a^${n} = a^${total} y a^${m} : a^${n} = a^${left}`,
    captions: [
      `$a^{${m}}$ son ${m} factores $a$ multiplicados.`,
      `$a^{${n}}$ añade otros ${n} factores $a$.`,
      `En total hay $${m} + ${n} = ${total}$ factores: $a^{${m}} \\cdot a^{${n}} = a^{${total}}$. Se suman los exponentes.`,
      `Para dividir, ${m} factores arriba y ${n} abajo.`,
      `Cada factor de abajo se tacha con uno de arriba.`,
      `Quedan $${m} - ${n} = ${left}$ factores: $a^{${m}} : a^{${n}} = a^{${left}}$. Se restan los exponentes.`,
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 2}>
          {Array.from({ length: m }, (_, i) => (
            <g key={`p${i}`}>{tok(x0(total) + i * STEP, 150, MANIM.blue)}</g>
          ))}
          <Txt x={x0(total) + ((m - 1) * STEP) / 2} y={70} size={30} color={MANIM.blue}>{`a${sup(m)}`}</Txt>
        </Fade>
        <Fade show={beat >= 1 && beat <= 2} dy={10}>
          {Array.from({ length: n }, (_, i) => (
            <g key={`q${i}`}>{tok(x0(total) + (m + i) * STEP, 150, MANIM.green)}</g>
          ))}
          <Txt x={x0(total) + (m + (n - 1) / 2) * STEP} y={70} size={30} color={MANIM.green}>{`a${sup(n)}`}</Txt>
        </Fade>
        <Fade show={beat === 2} dy={10}>
          <line x1={x0(total) - R} y1={210} x2={x0(total) + (total - 1) * STEP + R} y2={210} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={400} y={270} size={34} color={MANIM.yellow}>{`${m} + ${n} = ${total} factores`}</Txt>
          <Txt x={400} y={330} size={38} color={MANIM.orange}>{`a${sup(m)} · a${sup(n)} = a${sup(total)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          {Array.from({ length: m }, (_, i) => (
            <g key={`t${i}`}>{tok(x0(m) + i * STEP, 90, MANIM.blue, beat >= 4 && i < n)}</g>
          ))}
          <line x1={x0(m) - R} y1={150} x2={x0(m) + (m - 1) * STEP + R} y2={150} stroke={MANIM.ink} strokeWidth={3} />
          {Array.from({ length: n }, (_, i) => (
            <g key={`u${i}`}>{tok(x0(m) + i * STEP, 210, MANIM.green, beat >= 4)}</g>
          ))}
        </Fade>
        <Fade show={beat >= 5} dy={10}>
          <Txt x={400} y={320} size={34} color={MANIM.yellow}>{`${m} − ${n} = ${left} factores`}</Txt>
          <Txt x={400} y={374} size={38} color={MANIM.orange}>{`a${sup(m)} : a${sup(n)} = a${sup(left)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
export function sup(n: number): string {
  return String(n).split("").map((c) => SUP[c] ?? c).join("");
}
