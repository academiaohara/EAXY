import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { IntAxis, MINUS, labelStep, lineScale, rangeOf, signColor, tex, texp, z, zp } from "@/components/lesson/anim/integers";

const Y = 290;

function Arrow({ x1, x2, y, color, show, dashed = false }: { x1: number; x2: number; y: number; color: string; show: boolean; dashed?: boolean }) {
  const s = x2 >= x1 ? 1 : -1;
  return (
    <Fade show={show} dy={-6}>
      <line x1={x1} y1={y} x2={x2 - 4 * s} y2={y} stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={dashed ? "10 8" : undefined} />
      <path d={`M ${x2 - 16 * s} ${y - 12} L ${x2} ${y} L ${x2 - 16 * s} ${y + 12}`} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    </Fade>
  );
}

/** Restar un entero = sumar su opuesto: se invierte el movimiento que haría la suma. */
export function buildRestaOpuesto(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 8;
  const b = params.b ?? -2;
  const asSum = a + b;
  const result = a - b;
  const [lo, hi] = rangeOf([a, asSum, result], 2);
  const sx = lineScale(lo, hi, 70, 730);
  const dir = (n: number) => (n > 0 ? "la derecha" : "la izquierda");
  const header = `${z(a)} ${MINUS} ${zp(b)}`;
  const opposite = -b;
  const after = `${z(a)} ${opposite < 0 ? MINUS : "+"} ${Math.abs(opposite)}`;

  return {
    label: `${header} = ${z(result)}: restar ${zp(b)} es sumar su opuesto`,
    captions: [
      `Queremos calcular $${tex(a)} - ${texp(b)}$: **restar** un número ${b < 0 ? "negativo" : "positivo"}.`,
      `Si **sumáramos** $${texp(b)}$, nos moveríamos hacia ${dir(b)}, hasta $${tex(asSum)}$.`,
      `**Restar** es lo contrario de sumar: el movimiento se invierte y vamos hacia ${dir(-b)}.`,
      `Llegamos a $${tex(result)}$. Restar $${texp(b)}$ equivale a **sumar su opuesto**: $${tex(a)} - ${texp(b)} = ${tex(a)} ${opposite < 0 ? "-" : "+"} ${Math.abs(opposite)}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <IntAxis lo={lo} hi={hi} y={Y} x0={70} x1={730} labelEvery={labelStep(lo, hi)} />
        <Txt x={400} y={70} size={46} color={MANIM.ink}>{header}</Txt>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={140} size={40} color={MANIM.yellow}>{`= ${after} = ${z(result)}`}</Txt>
        </Fade>

        {/* suma (lo que haría +b) */}
        <Arrow x1={sx(a)} x2={sx(asSum)} y={Y - 52} color={MANIM.muted} show={beat === 1 || beat === 2} dashed />
        <Fade show={beat === 1 || beat === 2} dy={-6}>
          <Txt x={(sx(a) + sx(asSum)) / 2} y={Y - 70} size={22} color={MANIM.muted} weight={500}>{`sumar ${zp(b)}`}</Txt>
        </Fade>
        {/* resta (movimiento invertido) */}
        <Arrow x1={sx(a)} x2={sx(result)} y={Y - 52} color={signColor(-b)} show={beat >= 2} />
        <Fade show={beat >= 2} dy={-6}>
          <Txt x={(sx(a) + sx(result)) / 2} y={Y - 70} size={24} color={signColor(-b)}>{`restar ${zp(b)}`}</Txt>
        </Fade>

        {/* el punto se desplaza */}
        <Move x={beat >= 2 ? sx(result) - sx(a) : 0} y={0}>
          <circle cx={sx(a)} cy={Y} r={12} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
        </Move>
      </Canvas>
    ),
  };
}
