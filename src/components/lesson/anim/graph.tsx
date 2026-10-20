import { Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";

export type PlotArea = {
  /** Esquina izquierda e inferior del área de dibujo (px del lienzo). */
  left: number;
  bottom: number;
  /** Píxeles por unidad en cada eje. */
  ux: number;
  uy: number;
  xMin: number;
  yMin: number;
};

export const mapX = (a: PlotArea, x: number) => a.left + (x - a.xMin) * a.ux;
export const mapY = (a: PlotArea, y: number) => a.bottom - (y - a.yMin) * a.uy;

/** Ejes con cuadrícula suave, marcas numeradas y rótulos de las variables. */
export function Axes({
  area,
  xMax,
  yMax,
  xStep,
  yStep,
  xLabel,
  yLabel,
}: {
  area: PlotArea;
  xMax: number;
  yMax: number;
  xStep: number;
  yStep: number;
  xLabel?: string;
  yLabel?: string;
}) {
  const xs: number[] = [];
  for (let x = Math.ceil(area.xMin / xStep) * xStep; x <= xMax; x += xStep) xs.push(x);
  const ys: number[] = [];
  for (let y = Math.ceil(area.yMin / yStep) * yStep; y <= yMax; y += yStep) ys.push(y);
  const x0 = mapX(area, Math.max(area.xMin, 0));
  const y0 = mapY(area, Math.max(area.yMin, 0));
  return (
    <g>
      {xs.map((x) => (
        <g key={`x${x}`}>
          <line x1={mapX(area, x)} y1={mapY(area, area.yMin)} x2={mapX(area, x)} y2={mapY(area, yMax)} stroke={MANIM.grid} strokeWidth={1} strokeOpacity={0.6} />
          {x !== 0 ? <Txt x={mapX(area, x)} y={y0 + 20} size={16} color={MANIM.muted} weight={500}>{String(x)}</Txt> : null}
        </g>
      ))}
      {ys.map((y) => (
        <g key={`y${y}`}>
          <line x1={mapX(area, area.xMin)} y1={mapY(area, y)} x2={mapX(area, xMax)} y2={mapY(area, y)} stroke={MANIM.grid} strokeWidth={1} strokeOpacity={0.6} />
          {y !== 0 ? <Txt x={x0 - 10} y={mapY(area, y) + 5} size={16} color={MANIM.muted} weight={500} anchor="end">{String(y)}</Txt> : null}
        </g>
      ))}
      <line x1={mapX(area, area.xMin)} y1={y0} x2={mapX(area, xMax)} y2={y0} stroke={MANIM.ink} strokeWidth={2.5} />
      <line x1={x0} y1={mapY(area, area.yMin)} x2={x0} y2={mapY(area, yMax)} stroke={MANIM.ink} strokeWidth={2.5} />
      {xLabel ? <Txt x={mapX(area, xMax) - 4} y={y0 + 42} size={18} color={MANIM.blue} anchor="end">{xLabel}</Txt> : null}
      {yLabel ? <Txt x={x0 + 10} y={mapY(area, yMax) - 8} size={18} color={MANIM.orange} anchor="start">{yLabel}</Txt> : null}
    </g>
  );
}

/** Polilínea (puntos en coordenadas de datos) como `points` de SVG. */
export function polyPoints(area: PlotArea, pts: readonly (readonly [number, number])[]): string {
  return pts.map(([x, y]) => `${mapX(area, x)},${mapY(area, y)}`).join(" ");
}
