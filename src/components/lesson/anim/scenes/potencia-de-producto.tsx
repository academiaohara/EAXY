import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";

const R = 22;

/** (a·b)ⁿ = aⁿ·bⁿ: reordenar los factores. */
export function buildPotenciaDeProducto(params: { a?: number }): AnimBuild {
  const n = Math.min(Math.max(Math.round(params.a ?? 3), 2), 4);
  const gap = 62;
  const pair = 2 * gap + 18;
  const startX = 400 - (n * pair - 18 - gap) / 2 - gap / 2;
  const mixedX = (i: number, k: 0 | 1) => startX + i * pair + k * gap;
  const sortX = (i: number, k: 0 | 1) => 400 - ((n - 1) * gap) / 2 + i * gap + 0 * k;
  const tok = (letter: string, color: string) => (
    <g>
      <circle cx={0} cy={0} r={R} fill={MANIM.panel} stroke={color} strokeWidth={3} />
      <Txt x={0} y={8} size={24} color={color}>{letter}</Txt>
    </g>
  );

  return {
    label: `Potencia de un producto: (a·b)^${n} = a^${n} · b^${n}`,
    captions: [
      `$(a \\cdot b)^{${n}}$ es el producto $(a \\cdot b)$ repetido ${n} veces.`,
      `Hay ${n} factores $a$ y ${n} factores $b$, mezclados.`,
      `Como la multiplicación es conmutativa, juntamos los $a$ por un lado y los $b$ por otro.`,
      `$(a \\cdot b)^{${n}} = a^{${n}} \\cdot b^{${n}}$. **La potencia se reparte entre los factores.**`,
    ],
    beatMs: 3600,
    render: (beat) => {
      const sorted = beat >= 2;
      return (
        <Canvas>
          <Fade show={beat <= 1}>
            <Txt x={400} y={70} size={44} color={MANIM.yellow}>{`(a · b)${sup(n)}`}</Txt>
          </Fade>
          {Array.from({ length: n }, (_, i) => (
            <g key={i}>
              <Move x={sorted ? sortX(i, 0) : mixedX(i, 0)} y={sorted ? 160 : 180}>{tok("a", MANIM.blue)}</Move>
              <Move x={sorted ? sortX(i, 1) : mixedX(i, 1)} y={sorted ? 240 : 180}>{tok("b", MANIM.green)}</Move>
            </g>
          ))}
          <Fade show={beat === 1} dy={-8}>
            {Array.from({ length: n }, (_, i) => (
              <rect key={i} x={mixedX(i, 0) - R - 8} y={180 - R - 8} width={gap + 2 * R + 16} height={2 * R + 16} rx={14} fill="none" stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
            ))}
          </Fade>
          <Fade show={beat >= 3} dy={10}>
            <Txt x={400} y={330} size={42} color={MANIM.orange}>{`(a · b)${sup(n)} = a${sup(n)} · b${sup(n)}`}</Txt>
          </Fade>
          <Fade show={beat === 2} dy={10}>
            <Txt x={400} y={330} size={30} color={MANIM.yellow}>{`${n} factores a  ·  ${n} factores b`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
