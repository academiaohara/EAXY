import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac } from "@/components/lesson/anim/fraction";
import { lcm } from "@/components/lesson/anim/poly";
import type { AnimBuild } from "@/components/lesson/anim/types";

type T = { c: number; d: number; x: boolean };

/**
 * Multiplicar por el m.c.m. para quitar denominadores. `nums` son ternas `[coeficiente, denominador, lleva x (1/0)]`.
 * Por defecto `x/2 − x/3 + 3/4`.
 */
export function buildDenominadoresMcm(params: { nums?: number[] }): AnimBuild {
  const n = params.nums ?? [1, 2, 1, -1, 3, 1, 3, 4, 0];
  const terms: T[] = [];
  for (let i = 0; i + 2 < n.length && terms.length < 3; i += 3) terms.push({ c: n[i]!, d: Math.max(1, n[i + 1]!), x: n[i + 2] === 1 });
  const m = lcm(terms.map((t) => t.d));
  const mult = terms.map((t) => (m / t.d) * t.c);
  const lit = (t: T) => (t.x ? "x" : "");
  const tex = (t: T) => `${t.c < 0 ? "-" : ""}\\frac{${Math.abs(t.c) === 1 && t.x ? "" : Math.abs(t.c)}${lit(t)}}{${t.d}}`;
  const sumX = terms.reduce((s, t, i) => s + (t.x ? mult[i]! : 0), 0);
  const sumK = terms.reduce((s, t, i) => s + (t.x ? 0 : mult[i]!), 0);
  const res = `${sumX === 0 ? "" : `${sumX === 1 ? "" : sumX === -1 ? "−" : sumX}x`}${sumK === 0 ? "" : `${sumX !== 0 && sumK > 0 ? " + " : sumX !== 0 ? " − " : sumK < 0 ? "−" : ""}${Math.abs(sumK)}`}` || "0";
  const X = [150, 400, 650];
  const label = (t: T) => `${Math.abs(t.c) === 1 && t.x ? "" : Math.abs(t.c)}${lit(t)}`;

  return {
    label: `Multiplicar por el m.c.m. (${m}) para quitar denominadores: ${res}`,
    captions: [
      `Una expresión con denominadores distintos: $${terms.map(tex).join(" ").replace(/^-/, "-")}$.`,
      `Calculamos el **m.c.m.** de los denominadores: $\\text{m.c.m.}(${terms.map((t) => t.d).join(", ")}) = ${m}$.`,
      `Multiplicamos **cada término** por $${m}$ (la expresión entera queda multiplicada por $${m}$).`,
      `Cada denominador se **simplifica** con $${m}$: ${terms.map((t, i) => `$${m} : ${t.d} = ${m / t.d}$ → $${mult[i]! < 0 ? "-" : ""}${Math.abs(mult[i]!)}${lit(t)}$`).join("; ")}.`,
      `Sin denominadores: $${res.replace(/−/g, "-")}$. (Es la expresión original multiplicada por $${m}$.)`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {terms.map((t, i) => (
          <g key={i}>
            {i > 0 ? <Txt x={X[i]! - 120} y={150} size={34} color={MANIM.ink}>{t.c < 0 ? "−" : "+"}</Txt> : null}
            <Frac x={X[i]!} y={140} n={label(t)} d={t.d} size={42} color={[MANIM.blue, MANIM.green, MANIM.orange][i]} />
            <Fade show={beat >= 2 && beat < 4} dy={-8}>
              <Txt x={X[i]!} y={64} size={26} color={MANIM.yellow}>{`· ${m}`}</Txt>
            </Fade>
            <Fade show={beat >= 3} dy={10}>
              <Txt x={X[i]!} y={250} size={34} color={[MANIM.blue, MANIM.green, MANIM.orange][i]}>{`${m / t.d} · ${label(t)}`}</Txt>
            </Fade>
          </g>
        ))}
        <Fade show={beat >= 1 && beat < 2}>
          <Txt x={400} y={330} size={36} color={MANIM.yellow}>{`m.c.m.(${terms.map((t) => t.d).join(", ")}) = ${m}`}</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={10}>
          <Txt x={400} y={340} size={46} color={MANIM.green}>{res}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
