import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 120;
const Y0 = 90;
const H = 220;

function Recipiente({ w, n, v, flechas }: { w: number; n: number; v: number; flechas: boolean }) {
  return (
    <g>
      <rect x={X0} y={Y0} width={w} height={H} fill="none" stroke={MANIM.ink} strokeWidth={4} />
      <rect x={X0 + w} y={Y0} width={14} height={H} fill={MANIM.muted} />
      {Array.from({ length: n }, (_, k) => {
        const px = X0 + 14 + ((k * 0.618034) % 1) * (w - 28);
        const py = Y0 + 14 + ((k * 0.7548776) % 1) * (H - 28);
        const a = k * 2.4;
        return (
          <g key={k}>
            <circle cx={px} cy={py} r={7} fill={MANIM.blue} />
            {flechas && <line x1={px} y1={py} x2={px + Math.cos(a) * 14 * v} y2={py + Math.sin(a) * 14 * v} stroke={MANIM.orange} strokeWidth={2} />}
          </g>
        );
      })}
    </g>
  );
}

/** Teoría cinética: la presión nace de los choques de las partículas con las paredes. */
export function buildGasParticulas(): AnimBuild {
  return {
    label: "Modelo cinético de un gas: presión, volumen, temperatura y cantidad",
    beatMs: 5600,
    captions: [
      "Un gas son **partículas en movimiento caótico** que chocan con las paredes del recipiente. Esos choques son la **presión**.",
      "**Boyle**: si **se reduce el volumen** (a T constante), las partículas chocan **más veces** por unidad de superficie: la **presión aumenta**. P·V = cte.",
      "**Charles / Gay-Lussac**: al **calentar**, las partículas van **más rápido** (mayor energía cinética): chocan con más fuerza y más veces. A P constante el volumen crece; a V constante, crece P.",
      "**Avogadro**: si se **añade más gas** (más moles) en el mismo recipiente, hay más choques: **P aumenta** (o V, si el émbolo cede). V ∝ n.",
      "Todo se resume en la **ecuación de los gases ideales**: **P·V = n·R·T**, con T siempre en **kelvin**.",
    ],
    render: (beat) => {
      const w = beat === 1 ? 170 : 300;
      const n = beat === 3 ? 34 : 18;
      const v = beat === 2 ? 2.2 : 1;
      return (
        <Canvas>
          <Recipiente w={w} n={n} v={v} flechas />
          <Fade show={beat === 1}>
            <Txt x={560} y={170} size={26} color={MANIM.red}>P ↑ (V ↓)</Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={560} y={170} size={26} color={MANIM.red}>T ↑ → v ↑ → P ↑</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={560} y={170} size={26} color={MANIM.red}>n ↑ → P ↑</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={560} y={170} size={36} color={MANIM.yellow}>P·V = n·R·T</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
