import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";

const ROW = 52;
const Y0 = 52;

/** Exponente negativo: al bajar el exponente de uno en uno se divide entre la base. */
export function buildPotenciasExpNegativo(params: { a?: number }): AnimBuild {
  const base = Math.min(Math.max(params.a ?? 2, 2), 5);
  const exps = [3, 2, 1, 0, -1, -2, -3];
  const value = (e: number) => (e >= 0 ? String(base ** e) : `1/${base ** -e}`);

  return {
    label: `Potencias de ${base} al bajar el exponente: ${base}^-3 = 1/${base ** 3}`,
    captions: [
      `Potencias de ${base} con exponente positivo: cada una vale ${base} veces la anterior.`,
      `Al bajar el exponente de uno en uno se **divide entre ${base}**.`,
      `$${base}^{0} = 1$: se llega dividiendo $${base} : ${base}$.`,
      `Seguimos dividiendo entre ${base}: ya hay fracciones.`,
      `Así $${base}^{-1} = \\frac{1}{${base}}$, $${base}^{-2} = \\frac{1}{${base ** 2}}$ y $${base}^{-3} = \\frac{1}{${base ** 3}}$. El exponente negativo **invierte**, no cambia el signo.`,
    ],
    render: (beat) => {
      const rows = beat === 0 ? 3 : beat === 1 ? 3 : beat === 2 ? 4 : beat === 3 ? 5 : 7;
      return (
        <Canvas>
          {exps.map((e, i) => (
            <Fade key={e} show={i < rows} dy={-10}>
              <Txt x={330} y={Y0 + i * ROW + 10} size={30} color={e < 0 ? MANIM.orange : e === 0 ? MANIM.yellow : MANIM.blue} anchor="end">{`${base}${sup(e)} =`}</Txt>
              <Txt x={350} y={Y0 + i * ROW + 10} size={30} color={MANIM.ink} anchor="start">{value(e)}</Txt>
              {i > 0 && beat >= 1 && (
                <g>
                  <path d={`M 480 ${Y0 + (i - 1) * ROW + 24} L 480 ${Y0 + i * ROW - 8}`} stroke={MANIM.green} strokeWidth={3} fill="none" />
                  <Txt x={520} y={Y0 + i * ROW - 6} size={22} color={MANIM.green}>{`: ${base}`}</Txt>
                </g>
              )}
            </Fade>
          ))}
        </Canvas>
      );
    },
  };
}
