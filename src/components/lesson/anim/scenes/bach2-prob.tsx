import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const C = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 || k === n ? 1 : C(n - 1, k - 1) + C(n - 1, k));

/** Triángulo de Pascal: cada número es la suma de los dos de encima; fila n = coeficientes de (a + b)ⁿ y C(n, k). */
export function buildPascalBinomio(): AnimBuild {
  const px = (n: number, k: number) => 400 + (k - n / 2) * 78;
  const py = (n: number) => 50 + n * 58;
  return {
    label: "Triángulo de Pascal y números combinatorios",
    captions: [
      "Se empieza con un $1$ arriba y cada fila empieza y acaba en $1$. Cada número interior es la **suma de los dos que tiene encima**.",
      "Fila $n$, posición $k$: el número combinatorio $\\dbinom{n}{k}$ (contando desde $k = 0$). Por ejemplo $\\dbinom{4}{2} = 6$.",
      "Así $\\dbinom{5}{2} = \\dbinom{4}{1} + \\dbinom{4}{2} = 4 + 6 = 10$. La fila es **simétrica**: $\\dbinom{5}{2} = \\dbinom{5}{3}$.",
      "La fila $n = 4$ da los coeficientes de $(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$: **binomio de Newton**.",
    ],
    beatMs: 5600,
    render: (beat) => {
      const filas = beat === 0 ? 4 : 6;
      const cells: { n: number; k: number }[] = [];
      for (let n = 0; n < filas; n++) for (let k = 0; k <= n; k++) cells.push({ n, k });
      const resalta = (n: number, k: number) => {
        if (beat === 1) return n === 4 && k === 2 ? MANIM.yellow : null;
        if (beat === 2) return (n === 5 && k === 2) || (n === 4 && (k === 1 || k === 2)) ? MANIM.yellow : null;
        if (beat === 3) return n === 4 ? MANIM.green : null;
        return null;
      };
      return (
        <Canvas>
          {beat === 2 && (
            <g stroke={MANIM.yellow} strokeWidth={2} opacity={0.8}>
              <line x1={px(4, 1)} y1={py(4) + 14} x2={px(5, 2)} y2={py(5) - 22} />
              <line x1={px(4, 2)} y1={py(4) + 14} x2={px(5, 2)} y2={py(5) - 22} />
            </g>
          )}
          {cells.map(({ n, k }) => {
            const col = resalta(n, k);
            return (
              <Txt key={`${n}-${k}`} x={px(n, k)} y={py(n)} size={col ? 32 : 26} color={col ?? MANIM.ink}>{String(C(n, k))}</Txt>
            );
          })}
          <Fade show={beat === 3}>
            <Txt x={80} y={py(4)} size={22} color={MANIM.green} anchor="start">n = 4</Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={80} y={py(4)} size={22} color={MANIM.yellow} anchor="start">n = 4, k = 2</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
