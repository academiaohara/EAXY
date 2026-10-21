import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const N = 7;
const BASE = 360;
const SLOT = 52;

/** Aritmética (+d) frente a geométrica (·r): una crece por escalones iguales, la otra se dispara. */
export function buildProgresionComparar(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a1 = Math.min(Math.max(params.a ?? 3, 1), 5);
  const d = Math.min(Math.max(params.b ?? 3, 1), 5);
  const r = Math.min(Math.max(params.c ?? 2, 2), 3);
  const ar = Array.from({ length: N }, (_, i) => a1 + d * i);
  const ge = Array.from({ length: N }, (_, i) => a1 * r ** i);
  const scale = 250 / Math.max(...ge);
  const x0 = 400 - (N * SLOT) / 2;

  return {
    label: `Progresión aritmética (+${d}) frente a geométrica (·${r}) desde ${a1}`,
    captions: [
      `Empezamos las dos en $a_1 = ${a1}$.`,
      `**Aritmética:** se suma siempre ${d}. Las barras suben por escalones iguales: ${ar.join(", ")}.`,
      `**Geométrica:** se multiplica siempre por ${r}. Cada barra es ${r} veces la anterior: ${ge.join(", ")}.`,
      `Al principio van parecidas, pero la geométrica se dispara: en el término ${N}, ${ge[N - 1]} frente a ${ar[N - 1]}. Por eso $a_n = a_1 \\cdot r^{n-1}$ crece (o decrece) tan deprisa.`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={x0 - 10} y1={BASE} x2={x0 + N * SLOT + 10} y2={BASE} stroke={MANIM.grid} strokeWidth={2} />
        {Array.from({ length: N }, (_, i) => {
          const cx = x0 + i * SLOT + SLOT / 2;
          const showA = beat >= 1 && (i === 0 || beat >= 1);
          const showG = beat >= 2 && (i === 0 || beat >= 2);
          const hA = ar[i] * scale;
          const hG = ge[i] * scale;
          return (
            <g key={i}>
              <Fade show={i === 0 || showA} dy={10}>
                <rect x={cx - 20} y={BASE - hA} width={18} height={hA} fill={MANIM.blue} />
              </Fade>
              <Fade show={i === 0 || showG} dy={10}>
                <rect x={cx + 2} y={BASE - hG} width={18} height={hG} fill={MANIM.orange} />
              </Fade>
              <Txt x={cx} y={BASE + 26} size={18} color={MANIM.muted}>{`a${i + 1}`}</Txt>
            </g>
          );
        })}
        <Fade show={beat >= 1} dy={6}>
          <rect x={90} y={40} width={16} height={16} fill={MANIM.blue} />
          <Txt x={116} y={54} size={20} color={MANIM.blue} anchor="start">{`aritmética: +${d}`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={6}>
          <rect x={90} y={70} width={16} height={16} fill={MANIM.orange} />
          <Txt x={116} y={84} size={20} color={MANIM.orange} anchor="start">{`geométrica: ·${r}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
