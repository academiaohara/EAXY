import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs, simpleInterest } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const C0 = 120;
const C1 = 330;
const C2 = 560;

/** Interés simple como proporcionalidad compuesta: capital · tiempo → beneficio. */
export function buildInteresProporcional(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const cap = params.a ?? 750;
  const r = params.b ?? 4;
  const t = params.c ?? 3;
  const yearly = simpleInterest(cap, r, 1);
  const total = simpleInterest(cap, r, t);
  const f = (v: number) => fmtEs(v, 2);

  return {
    label: `Interés de ${f(cap)} € al ${f(r)} % durante ${t} años: ${f(total)} €`,
    captions: [
      `Un rédito del **${f(r)} %** anual significa: $100$ € en $1$ año producen $${f(r)}$ €.`,
      `Para $1$ € en $1$ año: $\\frac{${f(r)}}{100}$. Para **${f(cap)} €** en 1 año: $${f(cap)} \\cdot \\frac{${f(r)}}{100} = ${f(yearly)}$ €.`,
      `Directamente proporcional también al **tiempo**: en $${t}$ años, $${f(yearly)} \\cdot ${t} = ${f(total)}$ €.`,
      `$I = \\dfrac{C \\cdot r \\cdot t}{100} = \\dfrac{${f(cap)} \\cdot ${f(r)} \\cdot ${t}}{100} = ${f(total)}$ €.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {["capital", "tiempo", "interés"].map((h, i) => (
          <Txt key={h} x={[C0, C1, C2][i]!} y={44} size={24} color={MANIM.muted}>{h}</Txt>
        ))}
        <line x1={50} y1={58} x2={750} y2={58} stroke={MANIM.grid} strokeWidth={2} />
        <Txt x={C0} y={110} size={32} color={MANIM.blue}>100 €</Txt>
        <Txt x={C1} y={110} size={32} color={MANIM.ink}>1 año</Txt>
        <Txt x={C2} y={110} size={32} color={MANIM.green}>{`${f(r)} €`}</Txt>
        <Fade show={beat >= 1} dy={10}>
          <Txt x={C0} y={180} size={32} color={MANIM.blue}>{`${f(cap)} €`}</Txt>
          <Txt x={C1} y={180} size={32} color={MANIM.ink}>1 año</Txt>
          <Txt x={C2} y={180} size={32} color={MANIM.green}>{`${f(yearly)} €`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={10}>
          <Txt x={C0} y={250} size={32} color={MANIM.blue}>{`${f(cap)} €`}</Txt>
          <Txt x={C1} y={250} size={32} color={MANIM.orange}>{`${t} años`}</Txt>
          <Txt x={C2} y={250} size={32} color={MANIM.yellow}>{`${f(total)} €`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={340} size={36} color={MANIM.yellow}>{`I = C · r · t / 100 = ${f(total)} €`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
