import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 90;
const Y0 = 130;
const UNIT = 52;

/** Extraer factor común: g·(bx + c) = g·b·x + g·c; dos áreas que comparten una dimensión. */
export function buildFactorComunArea(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const g = Math.min(Math.max(params.a ?? 3, 2), 4);
  const b = Math.min(Math.max(params.b ?? 2, 1), 3);
  const c = Math.min(Math.max(params.c ?? 3, 1), 4);
  const wX = b * UNIT * 2; // ancho del bloque con x (x vale 2 unidades)
  const wC = c * UNIT;
  const h = g * 36;
  return {
    label: `Extraer factor común: ${g * b}x + ${g * c} = ${g}(${b}x + ${c})`,
    captions: [
      `$${g * b}x + ${g * c}$ son dos áreas: un rectángulo de $${g * b}x$ y otro de $${g * c}$.`,
      `Las dos tienen la misma **altura** $${g}$: es el factor común.`,
      `Lo que queda de cada una es su base: $${b}x$ y $${c}$.`,
      `Sacamos la altura común fuera: $${g * b}x + ${g * c} = ${g}\\,(${b}x + ${c})$. Se comprueba aplicando la propiedad distributiva.`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={Y0} width={wX} height={h} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
        <rect x={X0 + wX + 10} y={Y0} width={wC} height={h} fill={MANIM.green} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={X0 + wX / 2} y={Y0 + h / 2 + 10} size={32} color={MANIM.ink}>{`${g * b}x`}</Txt>
        <Txt x={X0 + wX + 10 + wC / 2} y={Y0 + h / 2 + 10} size={32} color={MANIM.ink}>{String(g * c)}</Txt>
        <Fade show={beat >= 1}>
          <line x1={X0 - 16} y1={Y0} x2={X0 - 16} y2={Y0 + h} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={X0 - 30} y={Y0 + h / 2 + 10} size={32} color={MANIM.yellow} anchor="end">{String(g)}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X0} y1={Y0 + h + 18} x2={X0 + wX} y2={Y0 + h + 18} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={X0 + wX / 2} y={Y0 + h + 52} size={28} color={MANIM.blue}>{`${b}x`}</Txt>
          <line x1={X0 + wX + 10} y1={Y0 + h + 18} x2={X0 + wX + 10 + wC} y2={Y0 + h + 18} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={X0 + wX + 10 + wC / 2} y={Y0 + h + 52} size={28} color={MANIM.green}>{String(c)}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={65} size={36} color={MANIM.orange}>{`${g * b}x + ${g * c} = ${g}(${b}x + ${c})`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
