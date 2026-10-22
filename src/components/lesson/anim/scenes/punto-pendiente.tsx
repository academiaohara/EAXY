import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { frac, fracTex } from "@/components/lesson/anim/eq";
import { lineTex, pointSlopeTex, pointSlopeToSlopeIntercept } from "@/components/lesson/anim/lin";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 70, bottom: 380, ux: 34, uy: 22, xMin: -2, yMin: -2 };
const XMAX = 14;
const YMAX = 14;

/** Recta por un punto con pendiente dada: `y = y0 + m(x − x0)`. `nums = [x0, y0, mn, md]` (pendiente mn/md). */
export function buildPuntoPendiente(params: { nums?: number[] }): AnimBuild {
  const [x0, y0, mn, md] = [params.nums?.[0] ?? 2, params.nums?.[1] ?? 3, params.nums?.[2] ?? 2, params.nums?.[3] ?? 3];
  const m = frac(mn, md || 1);
  const { n } = pointSlopeToSlopeIntercept([x0, y0], m);
  const mv = m.n / m.d;
  const nv = n.n / n.d;
  const ymin = -2;
  const lo = Math.max(-2, mv === 0 ? -2 : Math.min((ymin - nv) / mv, (YMAX - nv) / mv));
  const hi = Math.min(XMAX, mv === 0 ? XMAX : Math.max((ymin - nv) / mv, (YMAX - nv) / mv));
  const [xa, xb] = mv === 0 ? [-2, XMAX] : [Math.min(lo, hi), Math.max(lo, hi)];
  const dx = m.d;
  const dy = m.n;
  const tx = x0 + dx;
  const ty = y0 + dy;

  return {
    label: `Recta por (${x0}, ${y0}) con pendiente ${m.n}/${m.d}`,
    captions: [
      `Conocemos un punto, $P(${x0}, ${y0})$, y la pendiente, $m = ${fracTex(m)}$.`,
      `La pendiente dice cómo se sube: si $x$ avanza $${dx}$, $y$ ${dy >= 0 ? "sube" : "baja"} $${Math.abs(dy)}$.`,
      `Los puntos que siguen ese ritmo desde $P$ forman la recta.`,
      `Punto-pendiente: $${pointSlopeTex([x0, y0], m)}$, es decir, $${lineTex(m, n)}$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={XMAX} yMax={YMAX} xStep={2} yStep={2} xLabel="x" yLabel="y" />
        <Fade show={beat >= 2}>
          <clipPath id="pp-clip">
            <rect x={mapX(AREA, -2)} y={mapY(AREA, YMAX)} width={mapX(AREA, XMAX) - mapX(AREA, -2)} height={mapY(AREA, -2) - mapY(AREA, YMAX)} />
          </clipPath>
          <line clipPath="url(#pp-clip)" x1={mapX(AREA, xa)} y1={mapY(AREA, mv * xa + nv)} x2={mapX(AREA, xb)} y2={mapY(AREA, mv * xb + nv)} stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
        </Fade>
        <Fade show={beat >= 1}>
          <line x1={mapX(AREA, x0)} y1={mapY(AREA, y0)} x2={mapX(AREA, tx)} y2={mapY(AREA, y0)} stroke={MANIM.green} strokeWidth={5} />
          <line x1={mapX(AREA, tx)} y1={mapY(AREA, y0)} x2={mapX(AREA, tx)} y2={mapY(AREA, ty)} stroke={MANIM.orange} strokeWidth={5} />
          <Txt x={(mapX(AREA, x0) + mapX(AREA, tx)) / 2} y={mapY(AREA, y0) + (dy >= 0 ? 28 : -14)} size={22} color={MANIM.green}>{`+${dx}`}</Txt>
          <Txt x={mapX(AREA, tx) + 22} y={(mapY(AREA, y0) + mapY(AREA, ty)) / 2 + 6} size={22} color={MANIM.orange} anchor="start">{`${dy >= 0 ? "+" : "−"}${Math.abs(dy)}`}</Txt>
        </Fade>
        <circle cx={mapX(AREA, x0)} cy={mapY(AREA, y0)} r={9} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
        <Txt x={mapX(AREA, x0) + 6} y={mapY(AREA, y0) - 16} size={22} color={MANIM.yellow} anchor="start">{`P(${x0}, ${y0})`}</Txt>
        <Fade show={beat >= 3}>
          <Txt x={540} y={90} size={26} color={MANIM.ink} anchor="start">{`y = ${y0} + ${m.n}/${m.d}·(x − ${x0})`.replace("+ -", "− ").replace("− -", "+ ")}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
