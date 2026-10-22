import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { Arrow } from "@/components/lesson/anim/scenes/vec-ui";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 90, bottom: 385, ux: 55, uy: 42, xMin: -1, yMin: -1 };

/** Suma de vectores: u, v a continuación de u, y u + v. `nums = [ux, uy, vx, vy]` (positivos). */
export function buildSumaVectores(params: { nums?: number[] }): AnimBuild {
  const [ux, uy, vx, vy] = [params.nums?.[0] ?? 3, params.nums?.[1] ?? 1, params.nums?.[2] ?? 2, params.nums?.[3] ?? 3];
  const sx = ux + vx;
  const sy = uy + vy;
  const X = (x: number) => mapX(AREA, x);
  const Y = (y: number) => mapY(AREA, y);

  return {
    label: `Suma de vectores: (${ux}, ${uy}) + (${vx}, ${vy}) = (${sx}, ${sy})`,
    captions: [
      `El vector $\\vec{u} = (${ux}, ${uy})$, desde el origen.`,
      `Para sumar, se coloca $\\vec{v} = (${vx}, ${vy})$ **a continuación de $\\vec{u}$**: el origen de $\\vec{v}$ coincide con el extremo de $\\vec{u}$.`,
      `$\\vec{u} + \\vec{v}$ es el vector del origen de $\\vec{u}$ al extremo de $\\vec{v}$: $(${ux} + ${vx},\\ ${uy} + ${vy}) = (${sx},\\ ${sy})$.`,
      `Se obtiene lo mismo colocando $\\vec{u}$ tras $\\vec{v}$: la suma es la **diagonal del paralelogramo**.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={8} yMax={8} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 3}>
          <Arrow x1={X(0)} y1={Y(0)} x2={X(vx)} y2={Y(vy)} color={MANIM.orange} width={3} head={12} dash="8 6" />
          <Arrow x1={X(vx)} y1={Y(vy)} x2={X(sx)} y2={Y(sy)} color={MANIM.blue} width={3} head={12} dash="8 6" />
        </Fade>
        <Arrow x1={X(0)} y1={Y(0)} x2={X(ux)} y2={Y(uy)} color={MANIM.blue} width={6} />
        <Txt x={(X(0) + X(ux)) / 2} y={(Y(0) + Y(uy)) / 2 + 30} size={26} color={MANIM.blue}>u</Txt>
        <Fade show={beat >= 1}>
          <Arrow x1={X(ux)} y1={Y(uy)} x2={X(sx)} y2={Y(sy)} color={MANIM.orange} width={6} />
          <Txt x={(X(ux) + X(sx)) / 2 + 22} y={(Y(uy) + Y(sy)) / 2 + 10} size={26} color={MANIM.orange} anchor="start">v</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow x1={X(0)} y1={Y(0)} x2={X(sx)} y2={Y(sy)} color={MANIM.green} width={7} />
          <Txt x={(X(0) + X(sx)) / 2 - 14} y={(Y(0) + Y(sy)) / 2 - 14} size={26} color={MANIM.green} anchor="end">u + v</Txt>
          <Txt x={X(sx) + 14} y={Y(sy) - 8} size={24} color={MANIM.green} anchor="start">{`(${sx}, ${sy})`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
