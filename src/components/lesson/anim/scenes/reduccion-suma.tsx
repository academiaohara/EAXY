import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { bestElimination, eqText, solveSystem, type Eq2 } from "@/components/lesson/anim/sys";
import { fracValue } from "@/components/lesson/anim/eq";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const DEFAULT: [Eq2, Eq2] = [[3, -5, 1], [1, 2, 15]];
const sg = (n: number) => String(n).replace("-", "−");

/** Método de reducción: multiplicar, sumar para que una incógnita desaparezca, despejar y volver a sustituir. `nums = [a1,b1,c1,a2,b2,c2]`. */
export function buildReduccionSuma(params: { nums?: number[] }): AnimBuild {
  const n = params.nums ?? [];
  const given: [Eq2, Eq2] | null = n.length >= 6 ? [[n[0], n[1], n[2]], [n[3], n[4], n[5]]] : null;
  const pick = (pair: [Eq2, Eq2]) => {
    const plan = bestElimination(pair[0], pair[1]);
    const sol = solveSystem(pair[0], pair[1]);
    return plan && sol.kind === "unica" ? { pair, plan, sol } : null;
  };
  const { pair, plan, sol } = (given && pick(given)) ?? pick(DEFAULT)!;
  const [e1, e2] = pair;
  const elim = plan.eliminate;
  const other = elim === "x" ? "y" : "x";
  const v = (f: { n: number; d: number }) => fmtEs(fracValue(f), 3);
  const val = other === "y" ? sol.y : sol.x;
  const rest = elim === "x" ? sol.x : sol.y;
  const coefOther = plan.sum[elim === "x" ? 1 : 0];

  return {
    label: `Reducción: ${eqText(e1)} y ${eqText(e2)}; se elimina ${elim}; ${other} = ${v(val)}, ${elim} = ${v(rest)}`,
    captions: [
      `Queremos que **${elim}** tenga el mismo coeficiente en las dos ecuaciones, pero con **signo contrario**.`,
      `Multiplicamos la 1.ª por $${plan.m1}$ y la 2.ª por $${sg(plan.m2)}$: ahora ${elim} vale $${sg(plan.scaled1[elim === "x" ? 0 : 1])}$ y $${sg(plan.scaled2[elim === "x" ? 0 : 1])}$.`,
      `**Sumamos** las dos ecuaciones: ${elim} **desaparece** y queda una ecuación con una sola incógnita.`,
      `Despejamos: $${other} = \\dfrac{${sg(plan.sum[2])}}{${sg(coefOther)}} = ${v(val)}$.`,
      `Sustituimos en una ecuación original y sale ${elim} $= ${v(rest)}$. Solución: $x = ${v(sol.x)}$, $y = ${v(sol.y)}$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={60} size={38} color={MANIM.ink}>{eqText(e1)}</Txt>
        <Txt x={400} y={115} size={38} color={MANIM.ink}>{eqText(e2)}</Txt>
        <Fade show={beat >= 1}>
          <Txt x={110} y={60} size={28} color={MANIM.orange}>{`× ${sg(plan.m1)}`}</Txt>
          <Txt x={110} y={115} size={28} color={MANIM.orange}>{`× ${sg(plan.m2)}`}</Txt>
          <Txt x={400} y={190} size={38} color={MANIM.blue}>{eqText(plan.scaled1)}</Txt>
          <Txt x={400} y={245} size={38} color={MANIM.blue}>{eqText(plan.scaled2)}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={150} y1={270} x2={650} y2={270} stroke={MANIM.muted} strokeWidth={3} />
          <Txt x={400} y={318} size={38} color={MANIM.green}>{eqText(plan.sum)}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={400} y={372} size={40} color={MANIM.yellow}>{`${other} = ${v(val)}`}</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={680} y={372} size={30} color={MANIM.green}>{`${elim} = ${v(rest)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
