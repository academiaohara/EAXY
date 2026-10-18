import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac, sectorPath } from "@/components/lesson/anim/fraction";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 230;
const CY = 215;
const R = 150;

/** Centro del sector `i` de `d`, en ángulo (arriba y sentido horario, como `sectorPath`). */
function midAngle(i: number, d: number): number {
  return -Math.PI / 2 + (2 * Math.PI * (i + 0.5)) / d;
}

/**
 * Fracción como parte de la unidad: una pizza entera se parte en `b` porciones iguales
 * (denominador, numeradas para contarlas) y se toman `a` (numerador). Al final se separan
 * las que quedan y se retiran las que se han comido.
 */
export function buildFraccionPartes(params: { a?: number; b?: number }): AnimBuild {
  const d = Math.max(2, Math.min(12, params.b ?? 8));
  const n = Math.max(1, Math.min(d - 1, params.a ?? 6));
  const rest = d - n;
  const idx = Array.from({ length: d }, (_, i) => i);
  // Las que quedan se apartan hacia el lado en que están todas juntas.
  const restDir = midAngle(n + (rest - 1) / 2, d);
  const dx = Math.cos(restDir) * 46;
  const dy = Math.sin(restDir) * 46;

  return {
    label: `Una pizza partida en ${d} porciones iguales, de las que se toman ${n}: ${n}/${d}`,
    captions: [
      `La pizza entera es **la unidad**: todo lo que se reparte.`,
      `Se parte en **${d} porciones iguales**: las contamos, ${idx.map((i) => i + 1).join(", ")}. Ese ${d} es el **denominador**: dice en cuántas partes se divide la unidad.`,
      `Se toman **${n}** porciones. Ese ${n} es el **numerador**: cuántas partes se cogen.`,
      `Numerador sobre denominador: se ha comido $\\frac{${n}}{${d}}$ de la pizza. La raya separa «cuántas» de «en cuántas».`,
      `Separamos las **${rest}** porciones que no se han tomado: son las que quedan.`,
      `Quitamos las ${n} comidas y quedan **${rest}**: $\\frac{${rest}}{${d}}$. Lo comido y lo que queda suman la unidad: $\\frac{${n}}{${d}} + \\frac{${rest}}{${d}} = \\frac{${d}}{${d}} = 1$.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill={MANIM.panel}
          stroke={MANIM.yellow}
          strokeWidth={4}
          className="anim-t"
          style={{ opacity: beat <= 3 ? 1 : 0 }}
        />
        {idx.map((i) => {
          const taken = i < n;
          const eaten = taken && beat >= 5;
          const apart = !taken && beat >= 4;
          const a = midAngle(i, d);
          return (
            <g
              key={i}
              className="anim-t"
              style={{
                opacity: eaten ? 0 : 1,
                transform: apart ? `translate(${dx}px, ${dy}px)` : "translate(0px, 0px)",
              }}
            >
              <path
                d={sectorPath(CX, CY, R, i, d)}
                className="anim-t"
                fill={taken && beat >= 2 ? MANIM.orange : MANIM.blue}
                fillOpacity={beat >= 2 ? (taken ? 0.85 : 0.22) : beat >= 1 ? 0.18 : 0}
                stroke={MANIM.yellow}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeOpacity={beat >= 1 ? 1 : 0}
                style={{ transitionDelay: taken && beat === 2 ? `${i * 90}ms` : "0ms" }}
              />
              <Fade show={beat === 1 || beat === 2}>
                <Txt x={CX + Math.cos(a) * R * 0.66} y={CY + Math.sin(a) * R * 0.66 + 10} size={30} color={MANIM.ink}>
                  {i + 1}
                </Txt>
              </Fade>
            </g>
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
        <Fade show={beat === 3 || beat === 4} dx={20}>
          <Frac x={540} y={200} n={n} d={d} size={76} nColor={MANIM.orange} dColor={MANIM.blue} />
          <Txt x={612} y={176} size={21} color={MANIM.orange} anchor="start">partes cogidas</Txt>
          <Txt x={612} y={252} size={21} color={MANIM.blue} anchor="start">partes iguales</Txt>
        </Fade>
        <Fade show={beat >= 5} dy={10}>
          <Frac x={560} y={190} n={rest} d={d} size={76} nColor={MANIM.blue} dColor={MANIM.blue} />
          <Txt x={560} y={290} size={22} color={MANIM.muted}>porciones que quedan</Txt>
          <Txt x={560} y={340} size={30} color={MANIM.green}>{`${n}/${d} + ${rest}/${d} = 1`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
