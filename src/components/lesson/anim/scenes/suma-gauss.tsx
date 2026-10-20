import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CELL = 58;
const Y1 = 90;
const Y2 = 160;
const Y3 = 230;

/** Suma de 1 + 2 + … + n: se escribe al derecho y al revés, y cada columna suma lo mismo. */
export function buildSumaGauss(params: { a?: number }): AnimBuild {
  const n = Math.min(Math.max(params.a ?? 10, 4), 12);
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const x0 = 400 - (n * CELL) / 2;
  const cx = (i: number) => x0 + i * CELL + CELL / 2;
  const pair = n + 1;
  const total = (n * pair) / 2;

  return {
    label: `Suma de los ${n} primeros números naturales: ${total}`,
    captions: [
      `Queremos sumar $1 + 2 + \\dots + ${n}$. La escribimos una vez al derecho.`,
      `Y otra vez **al revés**, justo debajo.`,
      `Cada columna suma lo mismo: $${pair}$. Los términos equidistantes de los extremos suman igual.`,
      `Hay $${n}$ columnas iguales, pero hemos sumado dos veces la progresión: $2S = ${n} \\cdot ${pair}$.`,
      `$S_{${n}} = \\dfrac{${n} \\cdot ${pair}}{2} = ${total}$. En general, $S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {nums.map((v, i) => (
          <g key={`a${i}`}>
            <rect x={x0 + i * CELL + 3} y={Y1 - 28} width={CELL - 6} height={52} rx={8} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={2} />
            <Txt x={cx(i)} y={Y1 + 8} size={26} color={MANIM.ink}>{String(v)}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1} dy={8}>
          {nums.map((v, i) => (
            <g key={`b${i}`}>
              <rect x={x0 + i * CELL + 3} y={Y2 - 28} width={CELL - 6} height={52} rx={8} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={2} />
              <Txt x={cx(i)} y={Y2 + 8} size={26} color={MANIM.ink}>{String(n + 1 - v)}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          {nums.map((_, i) => (
            <g key={`c${i}`}>
              <line x1={cx(i)} y1={Y1 + 28} x2={cx(i)} y2={Y2 - 32} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="4 4" />
              <Txt x={cx(i)} y={Y3} size={26} color={MANIM.yellow}>{String(pair)}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={296} size={30} color={MANIM.ink}>{`2S = ${n} · ${pair} = ${n * pair}`}</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={8}>
          <Txt x={400} y={346} size={36} color={MANIM.orange}>{`S = ${n * pair} : 2 = ${total}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
