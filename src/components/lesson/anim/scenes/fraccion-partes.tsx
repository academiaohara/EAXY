import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac, sectorPath } from "@/components/lesson/anim/fraction";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 230;
const CY = 215;
const R = 150;

/**
 * Fracción como parte de la unidad: una pizza entera se parte en `b` porciones iguales
 * (denominador) y se toman `a` (numerador). Al final, lo que queda.
 */
export function buildFraccionPartes(params: { a?: number; b?: number }): AnimBuild {
  const d = Math.max(2, Math.min(12, params.b ?? 8));
  const n = Math.max(1, Math.min(d - 1, params.a ?? 6));
  const rest = d - n;
  const idx = Array.from({ length: d }, (_, i) => i);

  return {
    label: `Una pizza partida en ${d} porciones iguales, de las que se toman ${n}: ${n}/${d}`,
    captions: [
      `La pizza entera es **la unidad**: todo lo que se reparte.`,
      `Se parte en **${d} porciones iguales**. Ese ${d} es el **denominador**: dice en cuántas partes se divide la unidad.`,
      `Se toman **${n}** porciones. Ese ${n} es el **numerador**: cuántas partes se cogen.`,
      `Numerador sobre denominador: se ha comido $\\frac{${n}}{${d}}$ de la pizza. La raya separa «cuántas» de «en cuántas».`,
      `Quedan **${rest}** porciones: $\\frac{${rest}}{${d}}$. Lo comido y lo que queda suman la unidad: $\\frac{${n}}{${d}} + \\frac{${rest}}{${d}} = \\frac{${d}}{${d}} = 1$.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <circle cx={CX} cy={CY} r={R} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={4} />
        {idx.map((i) => {
          const taken = i < n;
          const shown = taken ? beat >= 2 : beat >= 1;
          return (
            <path
              key={i}
              d={sectorPath(CX, CY, R, i, d)}
              className="anim-t"
              fill={taken ? (beat >= 4 ? MANIM.green : MANIM.orange) : MANIM.blue}
              fillOpacity={beat >= 2 ? (taken ? 0.85 : beat >= 4 ? 0.35 : 0.18) : beat >= 1 ? 0.18 : 0}
              stroke={MANIM.yellow}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeOpacity={beat >= 1 ? 1 : 0}
              style={{ opacity: shown || beat === 0 ? 1 : 0, transitionDelay: taken && beat >= 2 ? `${i * 90}ms` : "0ms" }}
            />
          );
        })}
        <Fade show={beat === 0} dy={8}>
          <Txt x={CX} y={CY + 10} size={30} color={MANIM.yellow}>
            1 unidad
          </Txt>
        </Fade>
        <Fade show={beat === 1 || beat === 2} dx={20}>
          <Txt x={560} y={200} size={96} color={beat === 1 ? MANIM.blue : MANIM.orange}>
            {beat === 1 ? d : n}
          </Txt>
          <Txt x={560} y={252} size={26} color={MANIM.muted}>
            {beat === 1 ? "denominador" : "numerador"}
          </Txt>
        </Fade>
        <Fade show={beat >= 3} dx={20}>
          <Frac x={540} y={200} n={n} d={d} size={76} nColor={MANIM.orange} dColor={MANIM.blue} />
          <Txt x={612} y={176} size={21} color={MANIM.orange} anchor="start">partes cogidas</Txt>
          <Txt x={612} y={252} size={21} color={MANIM.blue} anchor="start">partes iguales</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={10}>
          <Txt x={560} y={330} size={30} color={MANIM.green}>{`${n}/${d} + ${rest}/${d} = 1`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
