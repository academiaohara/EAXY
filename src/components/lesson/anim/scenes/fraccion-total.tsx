import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 80;
const W = 640;

/** Conocida la parte (n/d del total), se halla el total: una parte = P : n y el total = d partes. */
export function buildFraccionTotal(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const n = params.a ?? 7;
  const d = params.b ?? 20;
  const part = params.c ?? 37800;
  const one = part / n;
  const total = one * d;
  const fmt = (v: number) => v.toLocaleString("es-ES");
  const seg = W / d;
  return {
    label: `Si ${n}/${d} del total son ${fmt(part)} €, el total es ${fmt(total)} €`,
    captions: [
      `El total está partido en $${d}$ partes iguales; la parte conocida son $${n}$ de ellas y vale $${fmt(part)}$ €.`,
      `Si $${n}$ partes valen $${fmt(part)}$ €, **una** parte vale $${fmt(part)} : ${n} = ${fmt(one)}$ €.`,
      `El total son las $${d}$ partes: $${fmt(one)} \\cdot ${d} = ${fmt(total)}$ €. Es multiplicar por la fracción **inversa**: $${fmt(part)} \\cdot \\dfrac{${d}}{${n}}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={150} width={W} height={60} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        <rect x={X0} y={150} width={n * seg} height={60} fill={MANIM.blue} fillOpacity={0.6} />
        {Array.from({ length: d - 1 }, (_, k) => (
          <line key={k} x1={X0 + (k + 1) * seg} y1={150} x2={X0 + (k + 1) * seg} y2={210} stroke={MANIM.ink} strokeOpacity={0.5} />
        ))}
        <Txt x={X0 + (n * seg) / 2} y={188} size={26} color={MANIM.ink}>{`${fmt(part)} €`}</Txt>
        <Txt x={X0 + (n * seg) / 2} y={130} size={26} color={MANIM.blue}>{`${n}/${d}`}</Txt>
        <Fade show={beat >= 1} dy={8}>
          <rect x={X0} y={150} width={seg} height={60} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={X0} y={250} size={24} color={MANIM.yellow} anchor="start">{`1 parte = ${fmt(one)} €`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <line x1={X0} y1={285} x2={X0 + W} y2={285} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={X0 + W / 2} y={330} size={34} color={MANIM.green}>{`Total: ${fmt(total)} €`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
