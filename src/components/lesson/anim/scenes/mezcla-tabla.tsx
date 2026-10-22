import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs, mixture } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const COLS = [80, 290, 460, 650];

/** Mezcla de dos productos: tabla cantidad–precio–coste y precio de la mezcla = coste total : cantidad total. */
export function buildMezclaTabla(params: { nums?: number[]; titles?: string[]; unit?: string }): AnimBuild {
  const [q1 = 50, p1 = 8.8, q2 = 30, p2 = 6.4] = params.nums ?? [];
  const [n1 = "café superior", n2 = "café inferior"] = params.titles ?? [];
  const [uq = "kg", up = "€"] = (params.unit ?? "kg|€").split("|");
  const m = mixture([{ qty: q1, price: p1 }, { qty: q2, price: p2 }]);
  const lo = Math.min(p1, p2);
  const hi = Math.max(p1, p2);
  const sx = (p: number) => 110 + ((p - lo) / (hi - lo || 1)) * 580;
  const f = (v: number) => fmtEs(v, 3);
  const c2 = (v: number) => v.toFixed(2).replace(".", ",");

  return {
    label: `Mezcla de ${f(q1)} ${uq} a ${f(p1)} y ${f(q2)} ${uq} a ${f(p2)}: precio ${f(m.price)} ${up}/${uq}`,
    captions: [
      `Datos en una tabla: **cantidad**, **precio** y el **coste** de cada producto ($\\text{cantidad} \\cdot \\text{precio}$).`,
      `El coste de cada uno: $${f(q1)} \\cdot ${f(p1)} = ${f(q1 * p1)}$ y $${f(q2)} \\cdot ${f(p2)} = ${f(q2 * p2)}$.`,
      `Se **suman** las cantidades ($${f(m.totalQty)}$ ${uq}) y los costes ($${f(m.totalCost)}$ ${up}).`,
      `Precio de la mezcla $= \\dfrac{\\text{coste total}}{\\text{cantidad total}} = \\dfrac{${f(m.totalCost)}}{${f(m.totalQty)}} = ${f(m.price)}$ ${up}/${uq}. Queda **más cerca del precio del que hay más**.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {["", `cantidad (${uq})`, `precio (${up}/${uq})`, `coste (${up})`].map((h, i) => (
          <Txt key={i} x={COLS[i]!} y={44} size={22} color={MANIM.muted} anchor={i === 0 ? "start" : "middle"}>{h}</Txt>
        ))}
        <line x1={50} y1={58} x2={750} y2={58} stroke={MANIM.grid} strokeWidth={2} />
        {[{ n: n1, q: q1, p: p1, c: MANIM.blue }, { n: n2, q: q2, p: p2, c: MANIM.orange }].map((r, i) => (
          <g key={i}>
            <Txt x={COLS[0]!} y={100 + i * 50} size={26} color={r.c} anchor="start">{r.n}</Txt>
            <Txt x={COLS[1]!} y={100 + i * 50} size={26} color={MANIM.ink}>{f(r.q)}</Txt>
            <Txt x={COLS[2]!} y={100 + i * 50} size={26} color={MANIM.ink}>{c2(r.p)}</Txt>
            <Fade show={beat >= 1}>
              <Txt x={COLS[3]!} y={100 + i * 50} size={26} color={r.c}>{c2(r.q * r.p)}</Txt>
            </Fade>
          </g>
        ))}
        <Fade show={beat >= 2} dy={8}>
          <line x1={50} y1={178} x2={750} y2={178} stroke={MANIM.ink} strokeWidth={2} />
          <Txt x={COLS[0]!} y={214} size={26} color={MANIM.yellow} anchor="start">mezcla</Txt>
          <Txt x={COLS[1]!} y={214} size={26} color={MANIM.yellow}>{f(m.totalQty)}</Txt>
          <Txt x={COLS[3]!} y={214} size={26} color={MANIM.yellow}>{c2(m.totalCost)}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={COLS[2]!} y={214} size={30} color={MANIM.green}>{c2(m.price)}</Txt>
          <line x1={110} y1={320} x2={690} y2={320} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
          <circle cx={sx(p1)} cy={320} r={8} fill={MANIM.blue} />
          <circle cx={sx(p2)} cy={320} r={8} fill={MANIM.orange} />
          <circle cx={sx(m.price)} cy={320} r={11} fill={MANIM.green} />
          <Txt x={sx(p1)} y={356} size={20} color={MANIM.blue}>{f(p1)}</Txt>
          <Txt x={sx(p2)} y={356} size={20} color={MANIM.orange}>{f(p2)}</Txt>
          <Txt x={sx(m.price)} y={292} size={22} color={MANIM.green}>{f(m.price)}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
