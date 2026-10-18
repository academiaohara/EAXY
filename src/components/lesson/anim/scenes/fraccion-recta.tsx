import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac } from "@/components/lesson/anim/fraction";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 70;
const UNIT = 330;
const Y = 270;
const xOf = (v: number) => X0 + v * UNIT;

/**
 * La fracción en la recta: la unidad se parte en `b` trozos y se sitúan una fracción menor que 1
 * (`a`/b), la unidad (b/b) y una mayor que 1 (`c`/b).
 */
export function buildFraccionRecta(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const d = Math.max(2, Math.min(8, params.b ?? 5));
  const lo = Math.max(1, Math.min(d - 1, params.a ?? 2));
  const hi = Math.max(d + 1, Math.min(2 * d - 1, params.c ?? 7));
  const marks = [
    { n: lo, color: MANIM.blue, beat: 2 },
    { n: d, color: MANIM.yellow, beat: 3 },
    { n: hi, color: MANIM.red, beat: 4 },
  ];
  const ticks = Array.from({ length: 2 * d + 1 }, (_, i) => i);

  return {
    label: `La recta con la unidad partida en ${d} trozos: ${lo}/${d} antes del 1, ${d}/${d} en el 1 y ${hi}/${d} después`,
    captions: [
      `En la recta, **la unidad** es el tramo de $0$ a $1$.`,
      `Cada unidad se parte en **${d} trozos iguales**: cada marca es un $\\frac{1}{${d}}$.`,
      `$\\frac{${lo}}{${d}}$: ${lo} trozos desde el 0. Todavía no llega a la unidad: **menor que 1**.`,
      `$\\frac{${d}}{${d}}$: los ${d} trozos completan la unidad, y cae justo en el $1$. **Igual a 1**.`,
      `$\\frac{${hi}}{${d}}$: se pasa del 1, hace falta empezar otra unidad (${hi} − ${d} = ${hi - d} trozos más). **Mayor que 1**.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <line x1={X0 - 20} y1={Y} x2={xOf(2) + 20} y2={Y} stroke={MANIM.ink} strokeWidth={3} strokeLinecap="round" />
        {[0, 1, 2].map((v) => (
          <g key={v}>
            <line x1={xOf(v)} y1={Y - 16} x2={xOf(v)} y2={Y + 16} stroke={MANIM.ink} strokeWidth={4} />
            <Txt x={xOf(v)} y={Y + 52} size={30} color={MANIM.ink}>{v}</Txt>
          </g>
        ))}
        <Fade show={beat === 0}>
          <path d={`M ${xOf(0)} ${Y - 30} q ${UNIT / 2} -34 ${UNIT} 0`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={xOf(0.5)} y={Y - 64} size={26} color={MANIM.yellow}>1 unidad</Txt>
        </Fade>
        {ticks.map((i) =>
          i % d === 0 ? null : (
            <Fade key={i} show={beat >= 1} dy={-6} delay={i * 40}>
              <line x1={xOf(i / d)} y1={Y - 10} x2={xOf(i / d)} y2={Y + 10} stroke={MANIM.muted} strokeWidth={2} />
            </Fade>
          ),
        )}
        {marks.map((m) => {
          const x = xOf(m.n / d);
          return (
            <Fade key={m.n} show={beat >= m.beat} dy={-14}>
              <line x1={x} y1={Y - 12} x2={x} y2={Y - 70} stroke={m.color} strokeWidth={2.5} strokeDasharray="5 5" />
              <circle cx={x} cy={Y} r={9} fill={m.color} />
              <Frac x={x} y={110} n={m.n} d={d} size={38} color={m.color} />
            </Fade>
          );
        })}
        <Fade show={beat === 2}>
          <Txt x={xOf(lo / d)} y={Y + 96} size={24} color={MANIM.blue}>menor que 1</Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={xOf(1)} y={Y + 96} size={24} color={MANIM.yellow}>igual a 1</Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={xOf(hi / d)} y={Y + 96} size={24} color={MANIM.red}>mayor que 1</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
