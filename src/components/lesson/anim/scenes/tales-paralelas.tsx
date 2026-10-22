import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const O = { x: 70, y: 150 };
const SR = 0.4; // pendiente de r
const SS = -0.14; // pendiente de s
const PX = 40; // píxeles por unidad horizontal

/** Teorema de Tales: tres paralelas cortan a dos rectas y los segmentos son proporcionales. `nums = [oa, ab, bc, k]`: segmentos en r y razón r/s. */
export function buildTalesParalelas(params: { nums?: number[] }): AnimBuild {
  const [oa, ab, bc, k] = [params.nums?.[0] ?? 2, params.nums?.[1] ?? 3, params.nums?.[2] ?? 4.5, params.nums?.[3] ?? 2];
  const xs = [oa, oa + ab, oa + ab + bc].map((u) => O.x + u * PX);
  const onR = (x: number) => ({ x, y: O.y + (x - O.x) * SR });
  const onS = (x: number) => ({ x, y: O.y + (x - O.x) * SS });
  const A = onR(xs[0]!), B = onR(xs[1]!), C = onR(xs[2]!);
  const A2 = onS(xs[0]!), B2 = onS(xs[1]!), C2 = onS(xs[2]!);
  const f = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
  const ab2 = ab / k;
  const bc2 = bc / k;

  return {
    label: `Teorema de Tales: AB/A'B' = BC/B'C' = ${f(k)}`,
    captions: [
      `Dos rectas $r$ y $s$ que parten de $O$ y **tres paralelas** $a$, $b$, $c$ que las cortan.`,
      `En $r$ las paralelas determinan los segmentos $AB = ${f(ab)}$ y $BC = ${f(bc)}$.`,
      `En $s$ determinan $A'B' = ${f(ab2)}$ y $B'C' = ${f(bc2)}$.`,
      `Los segmentos son **proporcionales**: $\\dfrac{AB}{A'B'} = \\dfrac{${f(ab)}}{${f(ab2)}} = ${f(k)}$ y $\\dfrac{BC}{B'C'} = \\dfrac{${f(bc)}}{${f(bc2)}} = ${f(k)}$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <line x1={O.x} y1={O.y} x2={O.x + 640} y2={O.y + 640 * SR} stroke={MANIM.blue} strokeWidth={4} />
        <line x1={O.x} y1={O.y} x2={O.x + 640} y2={O.y + 640 * SS} stroke={MANIM.green} strokeWidth={4} />
        <Txt x={O.x - 12} y={O.y - 10} size={24} color={MANIM.yellow} anchor="end">O</Txt>
        <Txt x={O.x + 650} y={O.y + 640 * SR} size={22} color={MANIM.blue}>r</Txt>
        <Txt x={O.x + 650} y={O.y + 640 * SS - 4} size={22} color={MANIM.green}>s</Txt>
        {xs.map((x, i) => (
          <line key={i} x1={x} y1={20} x2={x} y2={410} stroke={MANIM.muted} strokeWidth={3} strokeDasharray="10 7" />
        ))}
        {["a", "b", "c"].map((n, i) => (
          <Txt key={n} x={xs[i]! + 14} y={30} size={22} color={MANIM.muted} anchor="start">{n}</Txt>
        ))}
        {[A, B, C].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={7} fill={MANIM.blue} />
            <Txt x={p.x - 12} y={p.y + 22} size={22} color={MANIM.blue} anchor="end">{["A", "B", "C"][i]!}</Txt>
          </g>
        ))}
        {[A2, B2, C2].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={7} fill={MANIM.green} />
            <Txt x={p.x + 10} y={p.y - 12} size={22} color={MANIM.green} anchor="start">{["A'", "B'", "C'"][i]!}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1}>
          <Txt x={(A.x + B.x) / 2 + 36} y={(A.y + B.y) / 2 - 8} size={24} color={MANIM.orange}>{`AB = ${f(ab)}`}</Txt>
          <Txt x={(B.x + C.x) / 2 + 36} y={(B.y + C.y) / 2 - 8} size={24} color={MANIM.orange}>{`BC = ${f(bc)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={(A2.x + B2.x) / 2} y={(A2.y + B2.y) / 2 - 36} size={22} color={MANIM.yellow}>{`A'B' = ${f(ab2)}`}</Txt>
          <Txt x={(B2.x + C2.x) / 2} y={(B2.y + C2.y) / 2 - 36} size={22} color={MANIM.yellow}>{`B'C' = ${f(bc2)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={440} y={385} size={26} color={MANIM.ink}>{`AB / A'B' = BC / B'C' = ${f(k)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
