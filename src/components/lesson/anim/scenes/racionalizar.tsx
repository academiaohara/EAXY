import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac } from "@/components/lesson/anim/fraction";
import type { AnimBuild } from "@/components/lesson/anim/types";

const fmt = (x: number) => x.toFixed(4).replace(".", ",");

/** Racionalizar a/√b: se multiplica arriba y abajo por √b (se multiplica por 1) y el denominador queda entero. */
export function buildRacionalizar(params: { a?: number; b?: number }): AnimBuild {
  const a = Math.min(Math.max(Math.round(params.a ?? 3), 1), 9);
  const b = Math.min(Math.max(Math.round(params.b ?? 2), 2), 12);
  const value = a / Math.sqrt(b);
  const Y = 190;
  const rb = `√${b}`;

  return {
    label: `Racionalizar ${a}/√${b} = ${a}√${b}/${b}`,
    captions: [
      `$\\dfrac{${a}}{\\sqrt{${b}}} \\approx ${fmt(value)}$. Tiene un radical en el **denominador**, y lo habitual es evitarlo.`,
      `Se multiplica por $\\dfrac{\\sqrt{${b}}}{\\sqrt{${b}}} = 1$: **arriba y abajo** por el mismo número, así el valor **no cambia**.`,
      `En el denominador: $\\sqrt{${b}} \\cdot \\sqrt{${b}} = ${b}$. La raíz desaparece.`,
      `$\\dfrac{${a}}{\\sqrt{${b}}} = \\dfrac{${a}\\sqrt{${b}}}{${b}} \\approx ${fmt(value)}$. Mismo valor, sin radical abajo.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Frac x={120} y={Y} n={String(a)} d={rb} size={50} color={MANIM.blue} />
        <Fade show={beat >= 1} dx={-12}>
          <Txt x={235} y={Y + 14} size={46} color={MANIM.ink}>·</Txt>
          <Frac x={330} y={Y} n={rb} d={rb} size={50} color={MANIM.yellow} />
          <Txt x={445} y={Y + 14} size={46} color={MANIM.ink}>=</Txt>
        </Fade>
        <Fade show={beat >= 1 && beat < 3} dx={-12}>
          <Frac x={580} y={Y} n={`${a}·${rb}`} d={`${rb}·${rb}`} size={46} color={MANIM.ink} />
        </Fade>
        <Fade show={beat >= 2 && beat < 3} dy={10}>
          <Txt x={580} y={Y + 110} size={26} color={MANIM.green}>{`${rb} · ${rb} = ${b}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={-12}>
          <Frac x={580} y={Y} n={`${a}${rb}`} d={String(b)} size={50} color={MANIM.orange} />
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={360} size={28} color={MANIM.muted}>{`${a}/${rb} ≈ ${fmt(value)}  y  ${a}${rb}/${b} ≈ ${fmt((a * Math.sqrt(b)) / b)}`}</Txt>
        </Fade>
        <Fade show={beat === 0} dy={10}>
          <Txt x={400} y={360} size={28} color={MANIM.muted}>{`≈ ${fmt(value)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
