import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac } from "@/components/lesson/anim/fraction";
import { FractionBar } from "@/components/lesson/anim/fraction-svg";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Fracción impropia → número mixto: unidades completas y resto, con la división entera. */
export function buildFraccionMixta(params: { a?: number; b?: number }): AnimBuild {
  const d = Math.min(Math.max(Math.round(params.b ?? 5), 2), 8);
  const n = Math.min(Math.max(Math.round(params.a ?? 23), d + 1), 5 * d + d - 1);
  const q = Math.floor(n / d);
  const r = n % d;
  const units = Math.ceil(n / d);
  const unitW = Math.min(124, 680 / units);
  const x0 = 400 - (units * unitW) / 2;
  const y = 190;
  const whole = Math.min(q, units);

  return {
    label: `La fracción ${n}/${d} como número mixto: ${q} y ${r}/${d}`,
    captions: [
      `$\\frac{${n}}{${d}}$ son ${n} trozos de tamaño $\\frac{1}{${d}}$. Es mayor que 1.`,
      `Cada ${d} trozos forman **una unidad completa**. Agrupamos.`,
      `Salen **${q}** unidades completas y sobran **${r}** trozos: es la división entera $${n} : ${d}$.`,
      `$\\frac{${n}}{${d}} = ${q} + \\frac{${r}}{${d}}$. Se escribe como número mixto: **${q} y ${r}/${d}**.`,
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Frac x={80} y={80} n={n} d={d} size={40} color={MANIM.ink} />
        <FractionBar x={x0} y={y} unitW={unitW} h={64} units={units} den={d} shaded={n} color={MANIM.blue} />
        <HBrace show={beat >= 1} x1={x0 + 4} x2={x0 + whole * unitW - 4} y={y + 76} color={MANIM.green} label={`${q} unidades`} />
        <HBrace show={beat >= 2 && r > 0} x1={x0 + whole * unitW + 4} x2={x0 + whole * unitW + r * (unitW / d) - 4} y={y + 76} color={MANIM.orange} label={`${r} trozos`} />
        <Fade show={beat >= 2} dy={10}>
          <Txt x={400} y={392} size={32} color={MANIM.yellow}>{`${n} = ${d} · ${q} + ${r}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={230} y={92} size={40} color={MANIM.green}>{`= ${q}`}</Txt>
          <Txt x={286} y={92} size={34} color={MANIM.muted}>+</Txt>
          <Frac x={336} y={80} n={r} d={d} size={40} color={MANIM.orange} />
        </Fade>
      </Canvas>
    ),
  };
}
