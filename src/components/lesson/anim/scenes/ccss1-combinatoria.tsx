import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { comb } from "@/components/lesson/anim/combinatoria1b";

/** Triángulo de Pascal: cada número es la suma de los dos de arriba y coincide con C(n, k). */
export function buildTrianguloPascal(): AnimBuild {
  const rows = 6;
  const X = (i: number, j: number) => 400 + (j - i / 2) * 78;
  const Y = (i: number) => 60 + i * 56;
  return {
    label: "Triángulo de Pascal y números combinatorios",
    captions: [
      "El triángulo de Pascal empieza con un $1$ en la cima. Los bordes de cada fila son siempre $1$.",
      "Cada número interior es la **suma de los dos que tiene encima**: $1 + 1 = 2$, $1 + 2 = 3$, $2 + 1 = 3$…",
      "Se completan las filas $0$ a $5$. Cada fila es **simétrica** y suma una potencia de $2$: $1 + 4 + 6 + 4 + 1 = 16 = 2^4$.",
      "Los números son los **combinatorios**: la fila $n$ contiene $\\binom{n}{0}, \\binom{n}{1}, \\dots, \\binom{n}{n}$. Por ejemplo $\\binom{5}{2} = 10$.",
      "La regla de Pascal lo resume: $\\binom{5}{2} = \\binom{4}{1} + \\binom{4}{2} = 4 + 6 = 10$.",
    ],
    beatMs: 5000,
    render: (beat) => {
      const visibleRows = beat === 0 ? 1 : beat === 1 ? 4 : rows;
      return (
        <Canvas>
          {Array.from({ length: visibleRows }, (_, i) =>
            Array.from({ length: i + 1 }, (_, j) => {
              const hot = beat >= 4 && ((i === 5 && j === 2) || (i === 4 && (j === 1 || j === 2)));
              const sum = beat === 1 && i === 3 && j === 1;
              const color = hot ? MANIM.yellow : sum ? MANIM.green : MANIM.ink;
              return (
                <g key={`${i}-${j}`}>
                  {hot ? <circle cx={X(i, j)} cy={Y(i) - 8} r={22} fill={MANIM.yellow} fillOpacity={0.18} stroke={MANIM.yellow} strokeWidth={2.5} /> : null}
                  <Txt x={X(i, j)} y={Y(i)} size={30} color={color}>{String(comb(i, j))}</Txt>
                </g>
              );
            }),
          )}
          <Fade show={beat >= 3}>
            <Txt x={110} y={Y(5)} size={22} color={MANIM.muted}>n = 5</Txt>
            <Txt x={110} y={Y(4)} size={22} color={MANIM.muted}>n = 4</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <rect x={560} y={150} width={200} height={64} rx={12} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={660} y={192} size={28} color={MANIM.yellow}>C(5,2) = 4 + 6</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
