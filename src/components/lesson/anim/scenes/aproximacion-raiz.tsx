import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { sqrtBounds } from "@/components/lesson/anim/radicals";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 90;
const X1 = 710;
const ROW = 92;

const num = (s: string) => Number(s.replace(",", "."));
const sq = (s: string, digits: number) => {
  const v = num(s) ** 2;
  return (Math.round(v * 10 ** (2 * digits)) / 10 ** (2 * digits)).toFixed(2 * digits).replace(".", ",");
};

/** √n atrapada entre dos decimales cada vez más cercanos: las cifras no acaban ni se repiten. */
export function buildAproximacionRaiz(params: { a?: number }): AnimBuild {
  const n = Math.min(Math.max(Math.round(params.a ?? 2), 2), 30);
  const rows = [0, 1, 2, 3].map((d) => ({ d, ...sqrtBounds(n, d) }));
  const root = Math.sqrt(n);
  const exact = rows[0]!.exact;

  return {
    label: `√${n} entre dos decimales cada vez más próximos: ${rows[3]!.lower} < √${n} < ${rows[3]!.upper}`,
    captions: [
      `¿Cuánto vale $\\sqrt{${n}}$? Entre dos enteros: $${rows[0]!.lower}^2 = ${sq(rows[0]!.lower, 0)} < ${n} < ${rows[0]!.upper}^2 = ${sq(rows[0]!.upper, 0)}$.`,
      `Ampliamos el tramo y probamos décimas: $${rows[1]!.lower}^2 = ${sq(rows[1]!.lower, 1)}$ y $${rows[1]!.upper}^2 = ${sq(rows[1]!.upper, 1)}$.`,
      `Con centésimas: $${rows[2]!.lower}^2 = ${sq(rows[2]!.lower, 2)}$ y $${rows[2]!.upper}^2 = ${sq(rows[2]!.upper, 2)}$.`,
      `Con milésimas: $${rows[3]!.lower}^2 = ${sq(rows[3]!.lower, 3)}$ y $${rows[3]!.upper}^2 = ${sq(rows[3]!.upper, 3)}$. Cada cifra nueva sale al estrechar el tramo.`,
      exact
        ? `$\\sqrt{${n}}$ es **exacta**: $${rows[0]!.lower}^2 = ${n}$. Es un entero.`
        : `Nunca llegamos a un cuadrado exacto ni las cifras se repiten: $\\sqrt{${n}} = ${rows[3]!.lower}\\ldots$ es un número **irracional**.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {rows.map((r, i) => {
          const y = 70 + i * ROW;
          const lo = num(r.lower);
          const hi = num(r.upper);
          const frac = hi === lo ? 0.5 : (root - lo) / (hi - lo);
          const x = X0 + frac * (X1 - X0);
          return (
            <Fade key={i} show={beat >= i} dy={12}>
              <line x1={X0} y1={y} x2={X1} y2={y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
              <line x1={X0} y1={y - 12} x2={X0} y2={y + 12} stroke={MANIM.ink} strokeWidth={3} />
              <line x1={X1} y1={y - 12} x2={X1} y2={y + 12} stroke={MANIM.ink} strokeWidth={3} />
              <Txt x={X0} y={y + 36} size={22} color={MANIM.blue}>{r.lower}</Txt>
              <Txt x={X1} y={y + 36} size={22} color={MANIM.blue}>{r.upper}</Txt>
              <Txt x={X0} y={y - 22} size={18} color={MANIM.muted}>{`${r.lower}² = ${sq(r.lower, i)}`}</Txt>
              <Txt x={X1} y={y - 22} size={18} color={MANIM.muted}>{`${r.upper}² = ${sq(r.upper, i)}`}</Txt>
              <circle cx={x} cy={y} r={8} fill={MANIM.orange} />
              {i === 0 ? <Txt x={x} y={y - 22} size={22} color={MANIM.orange}>{`√${n}`}</Txt> : null}
            </Fade>
          );
        })}
      </Canvas>
    ),
  };
}
