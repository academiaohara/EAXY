import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Frac } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const S = 300;
const X0 = 60;
const Y0 = 60;

/** Producto de fracciones como área: a/b del ancho por c/d del alto. */
export function buildFraccionDeFraccion(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const a = params.a ?? 3;
  const b = params.b ?? 4;
  const c = params.c ?? 2;
  const d = params.d ?? 5;
  const num = a * c;
  const den = b * d;
  const g = gcd(num, den) || 1;
  const cw = S / b;
  const cuad = (n: number) => `${n} ${n === 1 ? "cuadradito" : "cuadraditos"}`;
  const ch = S / d;

  const captions = [
    `El cuadrado es la **unidad**: vale $1$.`,
    `Lo partimos en **${b}** columnas y coloreamos **${a}**: $\\dfrac{${a}}{${b}}$ del cuadrado.`,
    `Ahora lo partimos en **${d}** filas y nos quedamos con **${c}**: $\\dfrac{${c}}{${d}}$ **de lo que ya teníamos**.`,
    `La zona donde se cruzan tiene $${a} \\cdot ${c} = ${num}$ ${num === 1 ? "cuadradito" : "cuadraditos"} de un total de $${b} \\cdot ${d} = ${den}$: $\\dfrac{${a}}{${b}} \\cdot \\dfrac{${c}}{${d}} = \\dfrac{${num}}{${den}}$.`,
    ...(g > 1
      ? [`Y si numerador y denominador comparten factor, se simplifica: $\\dfrac{${num}}{${den}} = \\dfrac{${num / g}}{${den / g}}$.`]
      : []),
  ];

  const colLines: ReactNode[] = [];
  for (let i = 1; i < b; i += 1) {
    colLines.push(<line key={`c${i}`} x1={X0 + i * cw} x2={X0 + i * cw} y1={Y0} y2={Y0 + S} stroke={MANIM.blue} strokeWidth={2.5} />);
  }
  const rowLines: ReactNode[] = [];
  for (let j = 1; j < d; j += 1) {
    rowLines.push(<line key={`r${j}`} x1={X0} x2={X0 + S} y1={Y0 + j * ch} y2={Y0 + j * ch} stroke={MANIM.green} strokeWidth={2.5} />);
  }

  return {
    label: `${a}/${b} · ${c}/${d} = ${num}/${den} como área de un cuadrado unidad`,
    captions,
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={Y0} width={S} height={S} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} rx={3} />
        <Fade show={beat >= 1}>
          <rect x={X0} y={Y0} width={a * cw} height={S} fill={MANIM.blue} fillOpacity={0.4} />
        </Fade>
        <Fade show={beat >= 2}>
          <rect x={X0} y={Y0} width={S} height={c * ch} fill={MANIM.green} fillOpacity={0.4} />
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={X0} y={Y0} width={a * cw} height={c * ch} fill={MANIM.yellow} fillOpacity={0.65} stroke={MANIM.yellow} strokeWidth={4} />
        </Fade>
        <Fade show={beat >= 1}>{colLines}</Fade>
        <Fade show={beat >= 2}>{rowLines}</Fade>
        <rect x={X0} y={Y0} width={S} height={S} fill="none" stroke={MANIM.ink} strokeWidth={3} rx={3} />
        {/* expresión a la derecha */}
        <Fade show={beat >= 1} dx={-6}>
          <Frac x={450} y={150} n={a} d={b} size={38} color={MANIM.blue} />
        </Fade>
        <Fade show={beat >= 2} dx={-6}>
          <Txt x={510} y={156} size={38}>
            ·
          </Txt>
          <Frac x={570} y={150} n={c} d={d} size={38} color={MANIM.green} />
        </Fade>
        <Fade show={beat >= 3} dx={-6}>
          <Txt x={635} y={156} size={38}>
            =
          </Txt>
          <Frac x={710} y={150} n={num} d={den} size={38} color={MANIM.yellow} />
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={580} y={290} size={22} color={MANIM.muted}>{`${cuad(num)} de ${den}`}</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={8}>
          <Txt x={580} y={340} size={30} color={MANIM.yellow}>{`= ${num / g}/${den / g}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
