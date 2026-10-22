import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { ESTATURAS_CAJA, boxStats } from "@/components/lesson/anim/est";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const LEFT = 60;
const UX = 17;
const X = (v: number) => LEFT + (v - 148) * UX;
const ROW = 200;

/** Diagrama de caja con valor atípico: las 40 estaturas del libro (el 189 queda fuera de los bigotes). */
export function buildCajaAtipico(): AnimBuild {
  const b = boxStats(ESTATURAS_CAJA);
  const f = (v: number) => fmtEs(v, 1);
  return {
    label: `Diagrama de caja: Q1 = ${f(b.q1)}, Me = ${f(b.me)}, Q3 = ${f(b.q3)}; el 189 es atípico`,
    captions: [
      `Con las 40 estaturas ordenadas: $Q_1 = ${f(b.q1)}$, $Me = ${f(b.me)}$ y $Q_3 = ${f(b.q3)}$. La **caja** abarca de $Q_1$ a $Q_3$ y marca la mediana.`,
      `Longitud de la caja: $${f(b.q3)} - ${f(b.q1)} = ${f(b.iqr)}$. Los **bigotes** no pueden pasar de $1{,}5\\cdot${f(b.iqr)} = ${f(1.5 * b.iqr)}$ desde la caja.`,
      `El bigote derecho llega hasta $${b.whiskerHigh}$, el mayor dato dentro del límite $${f(b.high)}$.`,
      `El **189** está a $189 - ${f(b.q3)} = ${f(189 - b.q3)} > ${f(1.5 * b.iqr)}$ de la caja: es un valor **atípico** y se marca con un **asterisco**.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <line x1={X(148)} y1={ROW + 70} x2={X(192)} y2={ROW + 70} stroke={MANIM.grid} strokeWidth={3} />
        {[150, 160, 170, 180, 190].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={ROW + 64} x2={X(v)} y2={ROW + 76} stroke={MANIM.muted} strokeWidth={2} />
            <Txt x={X(v)} y={ROW + 100} size={20} color={MANIM.muted}>{String(v)}</Txt>
          </g>
        ))}
        <rect x={X(b.q1)} y={ROW - 40} width={X(b.q3) - X(b.q1)} height={80} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={4} />
        <line x1={X(b.me)} y1={ROW - 40} x2={X(b.me)} y2={ROW + 40} stroke={MANIM.yellow} strokeWidth={6} />
        <Txt x={X(b.q1) - 4} y={ROW - 50} size={20} color={MANIM.blue} anchor="end">{`Q1 = ${f(b.q1)}`}</Txt>
        <Txt x={X(b.me)} y={ROW - 84} size={20} color={MANIM.yellow}>{`Me = ${f(b.me)}`}</Txt>
        <Txt x={X(b.q3) + 4} y={ROW - 50} size={20} color={MANIM.blue} anchor="start">{`Q3 = ${f(b.q3)}`}</Txt>
        <line x1={X(b.whiskerLow)} y1={ROW} x2={X(b.q1)} y2={ROW} stroke={MANIM.blue} strokeWidth={4} />
        <line x1={X(b.whiskerLow)} y1={ROW - 18} x2={X(b.whiskerLow)} y2={ROW + 18} stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 1}>
          <line x1={X(b.q3)} y1={ROW + 56} x2={X(b.q3 + 1.5 * b.iqr)} y2={ROW + 56} stroke={MANIM.orange} strokeWidth={4} strokeDasharray="8 6" />
          <Txt x={(X(b.q3) + X(b.q3 + 1.5 * b.iqr)) / 2} y={ROW + 46} size={18} color={MANIM.orange}>{`1,5 · ${f(b.iqr)} = ${f(1.5 * b.iqr)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X(b.q3)} y1={ROW} x2={X(b.whiskerHigh)} y2={ROW} stroke={MANIM.blue} strokeWidth={4} />
          <line x1={X(b.whiskerHigh)} y1={ROW - 18} x2={X(b.whiskerHigh)} y2={ROW + 18} stroke={MANIM.blue} strokeWidth={4} />
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={X(189)} y={ROW + 14} size={44} color={MANIM.red}>*</Txt>
          <Txt x={X(189)} y={ROW - 24} size={20} color={MANIM.red}>189</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
