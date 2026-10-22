import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { mul, polyTex } from "@/components/lesson/anim/poly";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 190;
const Y0 = 100;
const COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple];

const term = (c: number, k: number) => {
  if (c === 0) return "0";
  const body = k === 0 ? String(Math.abs(c)) : `${Math.abs(c) === 1 ? "" : Math.abs(c)}${k === 1 ? "x" : `x${k === 2 ? "²" : "³"}`}`;
  return `${c < 0 ? "−" : ""}${body}`;
};

/** (ax + b)(cx + d) como áreas de un rectángulo partido en cuatro. `a, b, c, d` enteros positivos. */
export function buildProductoArea(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const a = Math.min(Math.max(Math.round(params.a ?? 1), 1), 5);
  const b = Math.min(Math.max(Math.round(params.b ?? 2), 1), 9);
  const c = Math.min(Math.max(Math.round(params.c ?? 1), 1), 5);
  const d = Math.min(Math.max(Math.round(params.d ?? 3), 1), 9);
  const P = mul([b, a], [d, c]);
  const w1 = 250;
  const w2 = 110;
  const h1 = 150;
  const h2 = 76;
  const cells = [
    { x: X0, y: Y0, w: w1, h: h1, t: term(a * c, 2), c: COLORS[0]! },
    { x: X0 + w1, y: Y0, w: w2, h: h1, t: term(b * c, 1), c: COLORS[1]! },
    { x: X0, y: Y0 + h1, w: w1, h: h2, t: term(a * d, 1), c: COLORS[2]! },
    { x: X0 + w1, y: Y0 + h1, w: w2, h: h2, t: String(b * d), c: COLORS[3]! },
  ];
  const f = (p: number, q: number) => `${p === 1 ? "" : p}x${q === 0 ? "" : ` + ${q}`}`;

  return {
    label: `(${f(a, b)})(${f(c, d)}) = ${polyTex(P)} como áreas`,
    captions: [
      `Un rectángulo de **base** $${a === 1 ? "" : a}x + ${b}$ y **altura** $${c === 1 ? "" : c}x + ${d}$: su área es el producto.`,
      `Lo partimos en **cuatro rectángulos**: cada término de la base por cada término de la altura.`,
      `Las áreas: $${a * c === 1 ? "" : a * c}x^2$, $${b * c === 1 ? "" : b * c}x$, $${a * d === 1 ? "" : a * d}x$ y $${b * d}$.`,
      `Se suman y se reducen los semejantes: $(${a === 1 ? "" : a}x + ${b})(${c === 1 ? "" : c}x + ${d}) = ${polyTex(P)}$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Txt x={X0 + w1 / 2} y={Y0 - 22} size={26} color={MANIM.blue}>{`${a === 1 ? "" : a}x`}</Txt>
        <Txt x={X0 + w1 + w2 / 2} y={Y0 - 22} size={26} color={MANIM.green}>{`${b}`}</Txt>
        <Txt x={X0 - 30} y={Y0 + h1 / 2 + 8} size={26} color={MANIM.orange}>{`${c === 1 ? "" : c}x`}</Txt>
        <Txt x={X0 - 30} y={Y0 + h1 + h2 / 2 + 8} size={26} color={MANIM.purple}>{`${d}`}</Txt>
        <rect x={X0} y={Y0} width={w1 + w2} height={h1 + h2} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
        {cells.map((k, i) => (
          <g key={i}>
            <Fade show={beat >= 1}>
              <rect x={k.x} y={k.y} width={k.w} height={k.h} fill={k.c} fillOpacity={0.3} stroke={k.c} strokeWidth={3} />
            </Fade>
            <Fade show={beat >= 2} dy={8}>
              <Txt x={k.x + k.w / 2} y={k.y + k.h / 2 + 10} size={30} color={MANIM.ink}>{k.t}</Txt>
            </Fade>
          </g>
        ))}
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={395} size={30} color={MANIM.yellow}>{polyTex(P).replace(/\^\{2\}/g, "²").replace(/\^\{3\}/g, "³").replace(/ - /g, " − ")}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
