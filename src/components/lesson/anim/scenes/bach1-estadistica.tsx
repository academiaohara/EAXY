import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const COLS = 12;
const ROWS = 6;
const SAMPLE = [3, 8, 14, 17, 22, 29, 31, 38, 44, 49, 55, 62];
const DATOS = [2, 3, 2, 1, 4, 2, 0, 3, 2, 3, 2, 5];

/** Población, muestra, dato y variable: 72 familias y una muestra de 12. */
export function buildEstadisticaConceptos(): AnimBuild {
  const cx = (i: number) => 60 + (i % COLS) * 48;
  const cy = (i: number) => 90 + Math.floor(i / COLS) * 52;
  return {
    label: "Población, muestra, dato y variable",
    captions: [
      "La **población** es el conjunto de individuos que se quiere estudiar: aquí, todas las familias de un país (cada punto es una).",
      "Como no se puede preguntar a todas, se toma una **muestra**: un subconjunto de la población (los puntos resaltados).",
      "La **variable** es la característica que se mide —aquí, el número de hijos— y cada valor observado es un **dato**.",
      "El **tamaño muestral** $n$ es el número de datos: en esta muestra $n = 12$. Con la muestra se estima cómo es la población.",
    ],
    beatMs: 5000,
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={36} size={26} color={MANIM.muted}>Población: todas las familias</Txt>
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const s = SAMPLE.indexOf(i);
          const on = beat >= 1 && s >= 0;
          return (
            <g key={i}>
              <circle cx={cx(i)} cy={cy(i)} r={on ? 14 : 10} fill={on ? MANIM.orange : MANIM.muted} fillOpacity={on ? 0.95 : 0.35} stroke={on ? MANIM.yellow : "none"} strokeWidth={3} />
              {beat >= 2 && s >= 0 ? <Txt x={cx(i)} y={cy(i) + 7} size={20} color="#101418">{String(DATOS[s])}</Txt> : null}
            </g>
          );
        })}
        <Fade show={beat >= 1}>
          <Txt x={690} y={110} size={26} color={MANIM.orange}>Muestra</Txt>
          <Txt x={690} y={140} size={18} color={MANIM.muted}>(puntos resaltados)</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={690} y={206} size={22} color={MANIM.yellow}>Variable X:</Txt>
          <Txt x={690} y={234} size={22} color={MANIM.yellow}>nº de hijos</Txt>
          <Txt x={690} y={262} size={18} color={MANIM.muted}>cada número es un dato</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={620} y={310} width={140} height={44} rx={10} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={690} y={341} size={26} color={MANIM.green}>n = 12</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
