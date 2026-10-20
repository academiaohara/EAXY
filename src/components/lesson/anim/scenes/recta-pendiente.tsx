import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const AREA: PlotArea = { left: 110, bottom: 378, ux: 45, uy: 45, xMin: -3, yMin: -1 };

/** La recta y = mx + n: corta al eje Y en (0, n) y por cada unidad a la derecha sube m. */
export function buildRectaPendiente(params: { a?: number; b?: number }): AnimBuild {
  const m = params.a ?? 2;
  const n = params.b ?? 1;
  const xMax = 11;
  const yMax = 7;
  const edge = (y: number) => (y - n) / m;
  const [xs, xe] =
    m === 0
      ? [AREA.xMin, xMax]
      : m > 0
        ? [Math.max(AREA.xMin, edge(AREA.yMin)), Math.min(xMax, edge(yMax))]
        : [Math.max(AREA.xMin, edge(yMax)), Math.min(xMax, edge(AREA.yMin))];
  const mAbs = numEs(Math.abs(m));
  const eq = n === 0 ? `y = ${numEs(m)}x` : `y = ${numEs(m)}x ${n < 0 ? "−" : "+"} ${numEs(Math.abs(n))}`;
  const eqTex = n === 0 ? `y = ${numTex(m)}x` : `y = ${numTex(m)}x ${n < 0 ? "-" : "+"} ${numTex(Math.abs(n))}`;
  return {
    label: `Recta de ecuación ${eq}`,
    beatMs: 3600,
    captions: [
      `La recta $${eqTex}$ corta al eje $Y$ en $(0, ${numTex(n)})$: $n = ${numTex(n)}$ es la **ordenada en el origen**.`,
      `Por cada **unidad** que avanzamos hacia la derecha, $y$ ${m >= 0 ? "sube" : "baja"} $${numTex(Math.abs(m))}$: la **pendiente** es $m = ${numTex(m)}$.`,
      `Otra unidad a la derecha y otra vez ${m >= 0 ? "sube" : "baja"} $${numTex(Math.abs(m))}$. Siempre el mismo salto: es una recta.`,
      `En $y = mx + n$, $m$ es la pendiente (la inclinación) y $n$, la ordenada en el origen.`,
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={xMax} yMax={yMax} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <line x1={mapX(AREA, xs)} y1={mapY(AREA, m * xs + n)} x2={mapX(AREA, xe)} y2={mapY(AREA, m * xe + n)} stroke={MANIM.yellow} strokeWidth={5} strokeLinecap="round" />
        <circle cx={mapX(AREA, 0)} cy={mapY(AREA, n)} r={9} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
        <Fade show={beat === 0}>
          <Txt x={mapX(AREA, 0) + 16} y={mapY(AREA, n) - 14} size={24} color={MANIM.orange} anchor="start">{`(0, ${numEs(n)})`}</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <line x1={mapX(AREA, 0)} y1={mapY(AREA, n)} x2={mapX(AREA, 1)} y2={mapY(AREA, n)} stroke={MANIM.blue} strokeWidth={5} />
          <line x1={mapX(AREA, 1)} y1={mapY(AREA, n)} x2={mapX(AREA, 1)} y2={mapY(AREA, n + m)} stroke={MANIM.green} strokeWidth={5} />
          <Txt x={mapX(AREA, 0.5)} y={mapY(AREA, n) + (m >= 0 ? 26 : -12)} size={22} color={MANIM.blue}>+1</Txt>
          <Txt x={mapX(AREA, 1) + 14} y={mapY(AREA, n + m / 2) + 6} size={22} color={MANIM.green} anchor="start">{`${m < 0 ? "−" : "+"}${mAbs}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={mapX(AREA, 1)} y1={mapY(AREA, n + m)} x2={mapX(AREA, 2)} y2={mapY(AREA, n + m)} stroke={MANIM.blue} strokeWidth={5} />
          <line x1={mapX(AREA, 2)} y1={mapY(AREA, n + m)} x2={mapX(AREA, 2)} y2={mapY(AREA, n + 2 * m)} stroke={MANIM.green} strokeWidth={5} />
          <circle cx={mapX(AREA, 1)} cy={mapY(AREA, n + m)} r={7} fill={MANIM.ink} />
          <circle cx={mapX(AREA, 2)} cy={mapY(AREA, n + 2 * m)} r={7} fill={MANIM.ink} />
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={700} y={90} size={30} color={MANIM.yellow} anchor="end">{eq}</Txt>
          <Txt x={700} y={124} size={22} color={MANIM.muted} anchor="end">{`pendiente m = ${numEs(m)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
