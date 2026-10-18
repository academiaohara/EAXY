import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const XS = [1, 2, 3, 4, 5];
const ROW0 = 150;
const ROW_H = 44;

type Eq = { title: string; tex: string; l: (x: number) => number; r: (x: number) => number; color: string; cx: number };

const ECUACION: Eq = { title: "Ecuación", tex: "3x − 4 = 8", l: (x) => 3 * x - 4, r: () => 8, color: MANIM.yellow, cx: 210 };
const IDENTIDAD: Eq = { title: "Identidad", tex: "6x − 4x = 2x", l: (x) => 6 * x - 4 * x, r: (x) => 2 * x, color: MANIM.green, cx: 590 };

/** Se prueban valores: la ecuación solo se cumple con alguno; la identidad, con todos. */
export function buildEcuacionIdentidad(): AnimBuild {
  const shown = (beat: number) => (beat === 0 ? 0 : beat === 1 ? 2 : beat === 2 ? 4 : 5);
  return {
    label: "Se prueban x = 1…5: 3x − 4 = 8 solo se cumple con x = 4; 6x − 4x = 2x se cumple con todos",
    captions: [
      "Dos igualdades con letra. Para saber de qué tipo es cada una, **probamos valores** de $x$.",
      "Con $x = 1$ y $x = 2$: la primera **falla** en los dos casos; la segunda sale bien.",
      "Con $x = 3$ y $x = 4$: la primera se cumple **solo** con $x = 4$. La segunda sigue cumpliéndose.",
      "Con $x = 5$ la primera vuelve a fallar. Es una **ecuación**: solo vale $x = 4$. La otra es una **identidad**: vale **siempre**.",
    ],
    render: (beat) => {
      const n = shown(beat);
      const col = (eq: Eq) => (
        <g key={eq.title}>
          <Txt x={eq.cx} y={42} size={26} color={eq.color}>
            {eq.title}
          </Txt>
          <Txt x={eq.cx} y={88} size={34} color={MANIM.ink} weight={800}>
            {eq.tex}
          </Txt>
          {XS.map((x, i) => {
            const l = eq.l(x);
            const r = eq.r(x);
            const ok = l === r;
            const y = ROW0 + i * ROW_H;
            return (
              <Fade key={x} show={i < n} dy={10}>
                <rect x={eq.cx - 160} y={y - 28} width={320} height={40} rx={10} fill={ok ? MANIM.green : MANIM.red} fillOpacity={0.14} />
                <Txt x={eq.cx - 120} y={y} size={22} color={MANIM.muted}>
                  {`x = ${x}`}
                </Txt>
                <Txt x={eq.cx + 5} y={y} size={22} color={MANIM.ink}>
                  {`${String(l).replace("-", "−")} ${ok ? "=" : "≠"} ${r}`}
                </Txt>
                <Txt x={eq.cx + 125} y={y + 2} size={26} color={ok ? MANIM.green : MANIM.red} weight={800}>
                  {ok ? "✓" : "✗"}
                </Txt>
              </Fade>
            );
          })}
        </g>
      );
      return (
        <Canvas>
          {col(ECUACION)}
          {col(IDENTIDAD)}
          <Fade show={beat >= 3} dy={8}>
            <Txt x={ECUACION.cx} y={ROW0 + 5 * ROW_H + 18} size={22} color={MANIM.yellow}>
              solo x = 4
            </Txt>
            <Txt x={IDENTIDAD.cx} y={ROW0 + 5 * ROW_H + 18} size={22} color={MANIM.green}>
              para todo x
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
