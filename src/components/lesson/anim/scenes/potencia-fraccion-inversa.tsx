import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X = 170;
const ROWS = [70, 140, 210, 280];

/** (a/b)⁻ⁿ = (b/a)ⁿ: el exponente negativo invierte la fracción. */
export function buildPotenciaFraccionInversa(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = Math.min(Math.max(Math.round(params.a ?? 2), 1), 9);
  const b = Math.min(Math.max(Math.round(params.b ?? 3), 2), 9);
  const n = Math.min(Math.max(Math.round(params.c ?? 2), 1), 3);
  const an = a ** n;
  const bn = b ** n;
  const lines = [
    { text: `(${a}/${b})${sup(-n)}`, color: MANIM.blue, lead: "" },
    { text: `1 / (${a}/${b})${sup(n)}`, color: MANIM.yellow, lead: "=" },
    { text: `1 / (${an}/${bn})`, color: MANIM.yellow, lead: "=" },
    { text: `${bn}/${an}`, color: MANIM.orange, lead: "=" },
  ];

  return {
    label: `Exponente negativo de una fracción: (${a}/${b})^-${n} = (${b}/${a})^${n} = ${bn}/${an}`,
    captions: [
      `$\\left(\\frac{${a}}{${b}}\\right)^{-${n}}$: exponente negativo.`,
      `Un exponente negativo es el **inverso** de la potencia: $\\left(\\frac{${a}}{${b}}\\right)^{-${n}} = 1 : \\left(\\frac{${a}}{${b}}\\right)^{${n}}$.`,
      `Calculamos la potencia positiva: $\\left(\\frac{${a}}{${b}}\\right)^{${n}} = \\frac{${an}}{${bn}}$.`,
      `Dividir $1$ entre $\\frac{${an}}{${bn}}$ es multiplicar por su inversa: queda $\\frac{${bn}}{${an}}$.`,
      `Es lo mismo que **dar la vuelta a la fracción y elevar con exponente positivo**: $\\left(\\frac{${b}}{${a}}\\right)^{${n}}$.`,
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        {lines.map((l, i) => (
          <Fade key={i} show={beat >= i} dy={12}>
            <Txt x={X} y={ROWS[i]!} size={40} color={MANIM.muted} anchor="end">{l.lead}</Txt>
            <Txt x={X + 24} y={ROWS[i]!} size={44} color={l.color} anchor="start">{l.text}</Txt>
          </Fade>
        ))}
        <Fade show={beat >= 4} dy={14}>
          <rect x={150} y={316} width={500} height={70} rx={14} fill={MANIM.green} fillOpacity={0.12} stroke={MANIM.green} strokeWidth={2.5} />
          <Txt x={400} y={364} size={38} color={MANIM.green}>{`(${a}/${b})${sup(-n)} = (${b}/${a})${sup(n)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
