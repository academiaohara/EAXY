import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

type Seg = { lo: [number, number]; hi: [number, number]; mid: [number, number] };

const SEGS: Seg[] = [
  { lo: [0, 1], hi: [1, 1], mid: [1, 2] },
  { lo: [0, 1], hi: [1, 2], mid: [1, 4] },
  { lo: [1, 4], hi: [1, 2], mid: [3, 8] },
  { lo: [3, 8], hi: [1, 2], mid: [7, 16] },
];
const txt = ([n, d]: [number, number]) => (d === 1 ? String(n) : `${n}/${d}`);
const X0 = 110;
const X1 = 690;

/** Entre dos racionales siempre hay otro: la media cae justo en medio y el tramo se amplía. */
export function buildRacionalesZoom(): AnimBuild {
  const ys = [70, 150, 230, 310];
  return {
    label: "Entre dos racionales siempre hay otro: 1/2, 1/4, 3/8, 7/16… sin fin",
    captions: [
      "Entre $0$ y $1$ está $\\frac{1}{2}$, su punto medio.",
      "Ampliamos $[0, \\frac{1}{2}]$: en medio cae $\\frac{1}{4}$.",
      "Ampliamos $[\\frac{1}{4}, \\frac{1}{2}]$: en medio cae $\\frac{3}{8}$.",
      "Y entre $\\frac{3}{8}$ y $\\frac{1}{2}$ cae $\\frac{7}{16}$. Siempre cabe otro: **entre dos racionales hay infinitos**.",
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {SEGS.map((s, i) => {
          const y = ys[i]!;
          return (
            <Fade key={i} show={beat >= i} dy={12}>
              <line x1={X0} y1={y} x2={X1} y2={y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
              {[
                { x: X0, v: s.lo, c: MANIM.ink },
                { x: X1, v: s.hi, c: MANIM.ink },
                { x: (X0 + X1) / 2, v: s.mid, c: MANIM.yellow },
              ].map((t, k) => (
                <g key={k}>
                  <line x1={t.x} y1={y - 12} x2={t.x} y2={y + 12} stroke={t.c} strokeWidth={4} />
                  <Txt x={t.x} y={y + 44} size={t.c === MANIM.yellow ? 28 : 24} color={t.c === MANIM.yellow ? MANIM.yellow : MANIM.muted}>{txt(t.v)}</Txt>
                </g>
              ))}
              <circle cx={(X0 + X1) / 2} cy={y} r={7} fill={MANIM.yellow} />
            </Fade>
          );
        })}
        {[0, 1, 2].map((i) => {
          const mid = (X0 + X1) / 2;
          const left = i === 0;
          const pairs: [number, number][] = left ? [[X0, X0], [mid, X1]] : [[mid, X0], [X1, X1]];
          return (
            <Fade key={`z${i}`} show={beat >= i + 1}>
              {pairs.filter(([from, to]) => from !== to).map(([from, to], k) => (
                <line key={k} x1={from} y1={ys[i]! + 8} x2={to} y2={ys[i + 1]! - 8} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" strokeOpacity={0.7} />
              ))}
            </Fade>
          );
        })}
      </Canvas>
    ),
  };
}
