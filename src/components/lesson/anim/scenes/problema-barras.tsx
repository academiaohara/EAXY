import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 70;
const W = 660;

/** «Un número más su k-ésima parte es N»: modelo de barras que lleva a la ecuación x + x/k = N. `nums = [k, N]`. */
export function buildProblemaBarras(params: { nums?: number[] }): AnimBuild {
  const k = Math.min(Math.max(Math.round(params.nums?.[0] ?? 3), 2), 8);
  const N = params.nums?.[1] ?? 48;
  const parts = k + 1;
  const seg = W / parts;
  const part = N / parts;
  const x = part * k;
  const f = (v: number) => fmtEs(v, 3);

  return {
    label: `x + x/${k} = ${f(N)}: la barra tiene ${parts} partes iguales; x = ${f(x)}`,
    captions: [
      `El número que buscamos es $x$. Lo dibujamos como una barra partida en **${k} partes iguales**: cada parte es $\\frac{x}{${k}}$.`,
      `Le añadimos su **${k === 2 ? "mitad" : k === 3 ? "tercera parte" : k === 4 ? "cuarta parte" : `${k}.ª parte`}**: una parte más.`,
      `Ahora la barra tiene **${parts} partes** iguales y mide $${f(N)}$: la ecuación es $x + \\dfrac{x}{${k}} = ${f(N)}$.`,
      `Cada parte vale $${f(N)} : ${parts} = ${f(part)}$. El número son ${k} partes: $x = ${k} \\cdot ${f(part)} = ${f(x)}$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {Array.from({ length: k }, (_, i) => (
          <g key={i}>
            <rect x={X0 + i * seg} y={150} width={seg} height={64} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2.5} />
            <Txt x={X0 + i * seg + seg / 2} y={190} size={22} color={MANIM.ink}>{beat >= 3 ? f(part) : `x/${k}`}</Txt>
          </g>
        ))}
        <HBrace show={beat <= 2 || beat >= 3} x1={X0 + 4} x2={X0 + k * seg - 4} y={226} color={MANIM.blue} label={beat >= 3 ? `x = ${f(x)}` : "x"} />
        <Fade show={beat >= 1} dy={-10}>
          <rect x={X0 + k * seg} y={150} width={seg} height={64} fill={MANIM.orange} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2.5} />
          <Txt x={X0 + k * seg + seg / 2} y={190} size={22} color={MANIM.ink}>{beat >= 3 ? f(part) : `x/${k}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <HBrace show x1={X0 + 4} x2={X0 + W - 4} y={118} dir="up" color={MANIM.yellow} label={`${f(N)}`} />
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={340} size={34} color={MANIM.green}>{`${parts} partes = ${f(N)} → 1 parte = ${f(part)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
