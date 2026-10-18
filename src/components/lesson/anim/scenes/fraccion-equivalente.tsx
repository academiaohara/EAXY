import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { Frac, FractionBar, Subdivision } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 100;
const W = 600;
const Y = 190;
const H = 70;

/** Fracción equivalente: se corta cada parte en `c` trozos y el área sombreada no cambia. */
export function buildFraccionEquivalente(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 1;
  const b = params.b ?? 2;
  const k = params.c ?? 3;
  const m = b * k;
  const shadedW = (a / b) * W;

  return {
    label: `La fracción ${a}/${b} es equivalente a ${a * k}/${m}: se corta cada parte en ${k} trozos y la parte coloreada mide lo mismo`,
    captions: [
      `La barra es la unidad, partida en **${b}** partes iguales; hay **${a}** coloreadas: $\\dfrac{${a}}{${b}}$.`,
      `Cortamos **cada parte en ${k}** trozos iguales. Ahora la unidad tiene $${b} \\cdot ${k} = ${m}$ trozos.`,
      `La zona coloreada ocupa $${a} \\cdot ${k} = ${a * k}$ de esos trozos: $\\dfrac{${a}}{${b}} = \\dfrac{${a} \\cdot ${k}}{${b} \\cdot ${k}} = \\dfrac{${a * k}}{${m}}$.`,
      `Hemos cambiado **cómo se escribe**, no cuánto vale: la parte coloreada mide lo mismo antes y después.`,
    ],
    render: (beat) => (
      <Canvas>
        <FractionBar x={X0} y={Y} unitW={W} h={H} den={b} shaded={a} color={MANIM.blue} />
        <Subdivision show={beat >= 1} x={X0} y={Y} unitW={W} h={H} parts={m} existing={b} />
        <Fade show={beat < 2}>
          <Frac x={400} y={100} n={a} d={b} size={44} color={MANIM.blue} />
        </Fade>
        <Fade show={beat >= 2} dy={-8}>
          <Frac x={290} y={100} n={a} d={b} size={40} color={MANIM.blue} />
          <Txt x={355} y={104} size={38}>
            =
          </Txt>
          <Frac x={450} y={100} n={a * k} d={m} size={40} color={MANIM.yellow} />
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={290} y={176} size={24} color={MANIM.orange}>{`× ${k}`}</Txt>
          <Txt x={450} y={176} size={24} color={MANIM.orange}>{`× ${k}`}</Txt>
        </Fade>
        <HBrace show={beat >= 3} x1={X0} x2={X0 + shadedW} y={Y + H + 14} dir="down" color={MANIM.green} label="misma longitud" labelSize={24} />
      </Canvas>
    ),
  };
}
