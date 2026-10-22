import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";
import { z } from "@/components/lesson/anim/integers";

const EXPS = [1, 2, 3, 4, 5];
const X0 = 100;
const DX = 150;

/** Signo de una potencia de base negativa: exponente par → positivo, impar → negativo. */
export function buildPotenciaSigno(params: { a?: number }): AnimBuild {
  const base = Math.min(Math.max(Math.round(params.a ?? -2), -4), -2);
  const b = z(base);
  const sign = (e: number) => (e % 2 === 0 ? MANIM.green : MANIM.red);

  return {
    label: `Signo de las potencias de ${b}: (${b})^n es positivo si n es par y negativo si n es impar`,
    captions: [
      `Potencias de base $${base}$: $(${base})^n$ es el producto de $n$ factores iguales a $${base}$.`,
      `Cada nuevo factor $(${base})$ **cambia el signo** del resultado anterior.`,
      `Exponente **impar**: hay un número impar de factores negativos y el resultado es **negativo**.`,
      `Exponente **par**: los factores negativos se emparejan y el resultado es **positivo**.`,
      `Cuidado con el paréntesis: $(${base})^4 = ${base ** 4}$, pero $-${-base}^4 = -${(-base) ** 4}$. La base es solo lo que está dentro del paréntesis.`,
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        {EXPS.map((e, i) => {
          const x = X0 + i * DX;
          const v = base ** e;
          const odd = e % 2 === 1;
          const active = (beat === 2 && odd) || (beat === 3 && !odd);
          return (
            <g key={e}>
              <Fade show={active} scale={0.9}>
                <rect x={x - 66} y={30} width={132} height={196} rx={14} fill={sign(e)} fillOpacity={0.12} stroke={sign(e)} strokeWidth={2.5} />
              </Fade>
              <Txt x={x} y={80} size={30} color={MANIM.ink}>{`(${b})${sup(e)}`}</Txt>
              <Txt x={x} y={118} size={20} color={MANIM.muted}>{`${e} ${e === 1 ? "factor" : "factores"}`}</Txt>
              <Fade show={beat >= 1} dy={10} delay={i * 120}>
                <Txt x={x} y={186} size={34} color={sign(e)}>{z(v)}</Txt>
              </Fade>
              <Fade show={beat >= 2 && (beat === 2 ? odd : !odd) && beat < 4} dy={-6}>
                <Txt x={x} y={252} size={22} color={sign(e)}>{odd ? "impar → −" : "par → +"}</Txt>
              </Fade>
            </g>
          );
        })}
        <Fade show={beat >= 4} dy={14}>
          <line x1={80} y1={286} x2={720} y2={286} stroke={MANIM.grid} strokeWidth={2} />
          <Txt x={230} y={340} size={34} color={MANIM.green}>{`(${b})⁴ = ${z(base ** 4)}`}</Txt>
          <Txt x={230} y={376} size={20} color={MANIM.muted}>el signo también se eleva</Txt>
          <Txt x={570} y={340} size={34} color={MANIM.red}>{`−${-base}⁴ = −${(-base) ** 4}`}</Txt>
          <Txt x={570} y={376} size={20} color={MANIM.muted}>solo se eleva el {-base}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
