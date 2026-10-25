import { Canvas, Fade, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";

const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));

const tex = (n: number) => fmtEs(n, 3).replace(",", "{,}");

/**
 * Suma infinita de una progresión geométrica como saltos sobre la recta.
 * `a` = a₁ (entero), razón `r = b/c` con 0 < b < c.
 */
export function buildSerieGeometricaSaltos(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a1 = clampInt(params.a, 4, 1, 12);
  const den = clampInt(params.c, 2, 2, 10);
  const num = clampInt(params.b, 1, 1, den - 1);
  const r = num / den;
  const S = a1 / (1 - r);
  const x0 = 60;
  const x1 = 740;
  const u = (x1 - x0) / (S * 1.12);
  const X = (v: number) => x0 + v * u;
  const Y = 270;
  const terms = Array.from({ length: 9 }, (_, i) => a1 * Math.pow(r, i));
  const partial = terms.reduce<number[]>((acc, t) => [...acc, (acc[acc.length - 1] ?? 0) + t], []);
  const rTex = `\\dfrac{${num}}{${den}}`;
  const shown = [3, 5, 9];
  const jump = (i: number) => {
    const from = i === 0 ? 0 : partial[i - 1]!;
    const to = partial[i]!;
    const mid = (X(from) + X(to)) / 2;
    const h = Math.min(120, Math.max(18, (X(to) - X(from)) * 0.55));
    return (
      <g key={i}>
        <path d={`M ${X(from)} ${Y} Q ${mid} ${Y - h * 1.6} ${X(to)} ${Y}`} fill="none" stroke={i % 2 ? MANIM.orange : MANIM.blue} strokeWidth={3} />
        <polygon points={quadArrowHead(mid, Y - h * 1.6 * 0.5, X(to), Y, 11)} fill={i % 2 ? MANIM.orange : MANIM.blue} />
      </g>
    );
  };
  return {
    label: `Suma infinita de la progresión geométrica de primer término ${a1} y razón ${num}/${den}`,
    captions: [
      `Una progresión geométrica de primer término $a_1 = ${a1}$ y razón $r = ${rTex}$. Cada salto sobre la recta mide ${num}/${den} del anterior: ${a1}, ${fmtEs(terms[1]!, 3)}, ${fmtEs(terms[2]!, 3)}…`,
      `Tras 3 saltos hemos recorrido $S_3 = ${tex(partial[2]!)}$. Los saltos se hacen cada vez más pequeños.`,
      `Con 5 saltos, $S_5 = ${tex(partial[4]!)}$; con 9, $S_9 = ${tex(partial[8]!)}$. Las sumas parciales **crecen, pero cada vez menos**: se acercan a un punto.`,
      `Como $|r| < 1$, ese punto existe: $S = \\dfrac{a_1}{1 - r} = \\dfrac{${a1}}{1 - ${rTex}} = ${tex(S)}$. Nunca se alcanza con un número finito de saltos, pero se puede estar tan cerca como se quiera.`,
    ],
    beatMs: 4800,
    render: (beat) => {
      const count = beat === 0 ? 3 : shown[Math.min(beat - 1, 2)]!;
      return (
        <Canvas>
          <line x1={x0 - 20} y1={Y} x2={x1 + 20} y2={Y} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={X(0)} y1={Y - 8} x2={X(0)} y2={Y + 8} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={X(0)} y={Y + 34} size={20} color={MANIM.muted}>0</Txt>
          {Array.from({ length: count }, (_, i) => jump(i))}
          {Array.from({ length: count }, (_, i) => (
            <circle key={i} cx={X(partial[i]!)} cy={Y} r={5} fill={MANIM.yellow} />
          ))}
          <Txt x={X(partial[count - 1]!)} y={Y + 34} size={20} color={MANIM.yellow}>{`S${count === 3 ? "₃" : count === 5 ? "₅" : "₉"}`}</Txt>
          <Fade show={beat >= 3} dy={-8}>
            <line x1={X(S)} y1={Y - 190} x2={X(S)} y2={Y + 12} stroke={MANIM.green} strokeWidth={3} strokeDasharray="8 7" />
            <Txt x={X(S) - 10} y={Y - 196} size={26} color={MANIM.green} anchor="end">{`S = ${fmtEs(S, 3)}`}</Txt>
          </Fade>
          <Txt x={400} y={52} size={26} color={MANIM.muted}>{`a₁ = ${a1},   r = ${num}/${den}`}</Txt>
        </Canvas>
      );
    },
  };
}
