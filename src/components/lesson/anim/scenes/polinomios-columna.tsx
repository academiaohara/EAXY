import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { add, neg, polyTex, sub, type Poly } from "@/components/lesson/anim/poly";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X = (i: number) => 230 + i * 130;
const HEAD = ["x³", "x²", "x", "1"];

const plain = (p: Poly): string => {
  const parts: string[] = [];
  for (let k = p.length - 1; k >= 0; k -= 1) {
    const c = p[k] ?? 0;
    if (c === 0) continue;
    const a = Math.abs(c);
    const body = k === 0 ? String(a) : `${a === 1 ? "" : a}x${k === 1 ? "" : sup(k)}`;
    parts.push(parts.length === 0 ? `${c < 0 ? "−" : ""}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`);
  }
  return parts.join("") || "0";
};

const cell = (c: number, first = false) => (c === 0 ? "" : `${c < 0 ? "−" : first ? "" : "+"}${Math.abs(c)}`);

/** Suma y resta de polinomios en columnas por grado. `nums = [a3,a2,a1,a0,b3,b2,b1,b0]`, `op` suma o resta. */
export function buildPolinomiosColumna(params: { nums?: number[]; op?: "+" | "-" }): AnimBuild {
  const n = params.nums ?? [0, 3, 5, -2, 1, 4, 0, -5];
  const A: Poly = [n[3] ?? 0, n[2] ?? 0, n[1] ?? 0, n[0] ?? 0];
  const B: Poly = [n[7] ?? 0, n[6] ?? 0, n[5] ?? 0, n[4] ?? 0];
  const minus = params.op === "-";
  const Bshown = minus ? neg(B) : B;
  const R = minus ? sub(A, B) : add(A, B);
  const ta = (p: Poly) => `$${polyTex(p)}$`;

  return {
    label: `${polyTex(A)} ${minus ? "−" : "+"} (${polyTex(B)}) = ${polyTex(R)}`,
    captions: [
      `Colocamos los dos polinomios en **columnas por grado**; donde falta un término, queda un hueco (un $0$).`,
      minus
        ? `Restar es **sumar el opuesto**: cambian de signo **todos** los términos de $B$.`
        : `Los términos de **igual grado** (semejantes) quedan uno debajo de otro.`,
      `Se suma cada columna: se suman solo los coeficientes de los términos semejantes.`,
      `$(${polyTex(A)}) ${minus ? "-" : "+"} (${polyTex(B)}) = ${polyTex(R)}$`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {HEAD.map((h, i) => (
          <Txt key={h} x={X(i)} y={46} size={26} color={MANIM.muted}>{h}</Txt>
        ))}
        <line x1={60} y1={62} x2={740} y2={62} stroke={MANIM.grid} strokeWidth={2} />
        <Txt x={90} y={116} size={28} color={MANIM.blue} anchor="start">A</Txt>
        {[3, 2, 1, 0].map((k, i) => (
          <Txt key={`a${k}`} x={X(i)} y={116} size={34} color={MANIM.blue}>{cell(A[k] ?? 0, true) || "·"}</Txt>
        ))}
        <Txt x={90} y={186} size={28} color={minus && beat >= 1 ? MANIM.red : MANIM.green} anchor="start">{minus ? (beat >= 1 ? "−B" : "B") : "B"}</Txt>
        {[3, 2, 1, 0].map((k, i) => (
          <Txt key={`b${k}`} x={X(i)} y={186} size={34} color={minus && beat >= 1 ? MANIM.red : MANIM.green}>
            {cell((beat >= 1 ? Bshown : B)[k] ?? 0, true) || "·"}
          </Txt>
        ))}
        <Fade show={beat >= 2}>
          <line x1={60} y1={214} x2={740} y2={214} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={90} y={266} size={28} color={MANIM.yellow} anchor="start">{minus ? "A − B" : "A + B"}</Txt>
          {[3, 2, 1, 0].map((k, i) => (
            <Txt key={`r${k}`} x={X(i)} y={266} size={36} color={MANIM.yellow}>{cell(R[k] ?? 0, true) || "·"}</Txt>
          ))}
        </Fade>
        <Fade show={beat >= 3} dy={12}>
          <Txt x={400} y={356} size={34} color={MANIM.orange}>{plain(R)}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
