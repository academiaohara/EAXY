import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const COL = 150;

/** De la tabla a la fórmula: la diferencia constante es la pendiente y el valor en x = 0 la ordenada. */
export function buildTablaFormula(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const m = params.a ?? 3;
  const n = params.b ?? 2;
  const c0 = params.c ?? 1;
  const dx = params.d ?? 1;
  const xs = [0, 1, 2, 3].map((i) => c0 + i * dx);
  const dy = m * dx;
  const ys = xs.map((x) => m * x + n);
  const x0 = 400 - ((xs.length - 1) * COL) / 2;
  const cx = (i: number) => x0 + i * COL;
  const nTxt = n === 0 ? "" : ` ${n < 0 ? "−" : "+"} ${numEs(Math.abs(n))}`;
  const coef = m === 1 ? "" : m === -1 ? "−" : numEs(m);
  const coefTex = m === 1 ? "" : m === -1 ? "-" : numEs(m);
  const eq = `y = ${coef}x${nTxt}`;
  return {
    label: `De la tabla a la fórmula: ${eq}`,
    captions: [
      "Una tabla de valores de una función.",
      `Cada vez que $x$ ${dx === 1 ? "sube 1" : `sube ${dx}`}, $y$ cambia siempre lo mismo: **${dy < 0 ? "−" : "+"}${numEs(Math.abs(dy))}**. Por cada unidad de $x$, $y$ cambia $${numEs(m)}$: es la pendiente $m$.`,
      `Para $x = 0$ resulta $y = ${numEs(n)}$: es la ordenada en el origen $n$.`,
      `Fórmula: $y = ${coefTex}x${n === 0 ? "" : n < 0 ? ` - ${numEs(-n)}` : ` + ${numEs(n)}`}$. Se comprueba con otro punto: $x = ${xs[3]} \\to y = ${ys[3]}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={60} y={110} size={28} color={MANIM.blue} anchor="start">x</Txt>
        <Txt x={60} y={200} size={28} color={MANIM.orange} anchor="start">y</Txt>
        <line x1={50} y1={150} x2={750} y2={150} stroke={MANIM.grid} strokeWidth={2} />
        {xs.map((x, i) => (
          <g key={i}>
            <Txt x={cx(i)} y={112} size={30} color={MANIM.blue}>{String(x)}</Txt>
            <Txt x={cx(i)} y={202} size={30} color={MANIM.orange}>{numEs(ys[i])}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1}>
          {xs.slice(0, -1).map((_, i) => (
            <g key={i}>
              <path d={`M ${cx(i) + 28} 226 Q ${cx(i) + COL / 2} 262 ${cx(i + 1) - 28} 226`} stroke={MANIM.green} strokeWidth={3} fill="none" />
              <Txt x={cx(i) + COL / 2} y={278} size={24} color={MANIM.green}>{`${dy < 0 ? "−" : "+"}${numEs(Math.abs(dy))}`}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={330} size={26} color={MANIM.yellow}>{`x = 0  →  y = ${numEs(n)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={385} size={36} color={MANIM.orange}>{eq}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
