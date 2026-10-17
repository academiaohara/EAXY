import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { IntAxis, labelStep, lineScale, rangeOf, signColor, tex, z, zp } from "@/components/lesson/anim/integers";

const Y = 250;

/** Comparar enteros: el mayor es el que queda más a la derecha; con negativos el orden «se invierte». */
export function buildCompararEnteros(params: { a?: number; b?: number }): AnimBuild {
  const first = params.a ?? -8;
  const second = params.b ?? -20;
  // `small` queda a la izquierda, `big` a la derecha.
  const small = Math.min(first, second);
  const big = Math.max(first, second);
  const [lo, hi] = rangeOf([small, big, 0], 2);
  const sx = lineScale(lo, hi, 70, 730);
  const bothNeg = big < 0;
  const sg = (n: number) => `${n > 0 ? "+" : ""}${tex(n)}`;

  return {
    label: `Comparación de ${tex(small)} y ${tex(big)} en la recta: ${tex(small)} < ${tex(big)}`,
    captions: [
      `Colocamos $${sg(small)}$ y $${sg(big)}$ en la recta.`,
      `En la recta los números **crecen hacia la derecha**: el que queda más a la derecha es el **mayor**.`,
      `$${sg(big)}$ está a la derecha de $${sg(small)}$, así que $${sg(small)} < ${sg(big)}$.`,
      bothNeg
        ? `Con negativos el orden **se invierte**: $|${tex(small)}| = ${Math.abs(small)}$ es mayor que $|${tex(big)}| = ${Math.abs(big)}$, pero $${tex(small)}$ está más lejos del $0$ hacia la izquierda, y por eso es **menor**.`
        : `Un número positivo es mayor que $0$ y $0$ es mayor que cualquier negativo.`,
    ],
    render: (beat) => (
      <Canvas>
        <IntAxis lo={lo} hi={hi} y={Y} x0={70} x1={730} labelEvery={labelStep(lo, hi)} />

        {/* sentido del orden */}
        <Fade show={beat >= 1 && beat < 3} dy={8}>
          <line x1={110} y1={Y + 86} x2={690} y2={Y + 86} stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" />
          <path d={`M 676 ${Y + 74} L 692 ${Y + 86} L 676 ${Y + 98}`} fill="none" stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <Txt x={150} y={Y + 124} size={22} color={MANIM.blue}>menor</Txt>
          <Txt x={650} y={Y + 124} size={22} color={MANIM.blue}>mayor</Txt>
        </Fade>

        {/* distancias al cero (solo con negativos) */}
        <Fade show={beat >= 3 && bothNeg} dy={-4}>
          <HBrace show x1={sx(small)} x2={sx(0)} y={Y + 60} color={signColor(small)} label={String(Math.abs(small))} labelSize={22} />
          <HBrace show x1={sx(big)} x2={sx(0)} y={Y - 52} dir="up" color={MANIM.yellow} label={String(Math.abs(big))} labelSize={22} delay={150} />
        </Fade>

        {/* puntos */}
        <circle cx={sx(small)} cy={Y} r={11} fill={signColor(small)} stroke={MANIM.surface} strokeWidth={3} />
        <circle cx={sx(big)} cy={Y} r={11} fill={big === 0 ? MANIM.ink : signColor(big)} stroke={MANIM.surface} strokeWidth={3} />
        <Txt x={sx(small)} y={Y - 28} size={28} color={signColor(small)}>{zp(small)}</Txt>
        <Txt x={sx(big)} y={Y - 28} size={28} color={signColor(big)}>{zp(big)}</Txt>

        {/* resultado */}
        <Fade show={beat >= 2} dy={10}>
          <Txt x={400} y={80} size={42} color={MANIM.yellow}>{`${z(small)} < ${z(big)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
