import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { Arrow } from "@/components/lesson/anim/scenes/vec-ui";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 100, bottom: 395, ux: 52, uy: 34, xMin: -6, yMin: -5 };

/** Vector perpendicular: (a, b) → (−b, a) (giro de 90°) y producto de pendientes −1. `nums = [a, b]`. */
export function buildPerpendicularGiro(params: { nums?: number[] }): AnimBuild {
  const [a, b] = [params.nums?.[0] ?? 5, params.nums?.[1] ?? 2];
  const X = (x: number) => mapX(AREA, x);
  const Y = (y: number) => mapY(AREA, y);
  const s = (n: number) => String(n).replace("-", "−");

  return {
    label: `Perpendicular a (${a}, ${b}): (${-b}, ${a})`,
    captions: [
      `Un vector $\\vec{v}_1 = (${a}, ${b})$.`,
      `Si lo **giramos $90°$**, cada punto $(x, y)$ pasa a $(-y, x)$: sale $\\vec{v}_2 = (${-b}, ${a})$.`,
      `Los dos triángulos rectángulos sombreados son **iguales**, así que los vectores son **perpendiculares**.`,
      `Pendientes: $m_1 = \\dfrac{${b}}{${a}}$ y $m_2 = \\dfrac{${a}}{${-b}}$. Su producto es $m_1\\cdot m_2 = -1$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={6} yMax={6} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 2}>
          <polygon points={`${X(0)},${Y(0)} ${X(a)},${Y(0)} ${X(a)},${Y(b)}`} fill={MANIM.blue} fillOpacity={0.25} />
          <polygon points={`${X(0)},${Y(0)} ${X(-b)},${Y(0)} ${X(-b)},${Y(a)}`} fill={MANIM.orange} fillOpacity={0.25} />
        </Fade>
        <Arrow x1={X(0)} y1={Y(0)} x2={X(a)} y2={Y(b)} color={MANIM.blue} width={6} />
        <Txt x={X(a) + 14} y={Y(b) - 8} size={24} color={MANIM.blue} anchor="start">{`(${s(a)}, ${s(b)})`}</Txt>
        <Fade show={beat >= 1}>
          <Arrow x1={X(0)} y1={Y(0)} x2={X(-b)} y2={Y(a)} color={MANIM.orange} width={6} />
          <Txt x={X(-b) - 14} y={Y(a) - 8} size={24} color={MANIM.orange} anchor="end">{`(${s(-b)}, ${s(a)})`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={640} y={60} size={28} color={MANIM.yellow}>m₁ · m₂ = −1</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
