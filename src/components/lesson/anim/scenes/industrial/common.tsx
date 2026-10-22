import type { CSSProperties, ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Txt } from "@/components/lesson/anim/primitives";

type DrawPathProps = {
  show: boolean;
  d: string;
  color?: string;
  width?: number;
  delay?: number;
  opacity?: number;
  dashed?: boolean;
};

/** Trazo que se «dibuja» de un extremo al otro (Create de Manim) sobre una curva cualquiera. */
export function DrawPath({ show, d, color = MANIM.ink, width = 4, delay = 0, opacity = 1, dashed = false }: DrawPathProps) {
  const style: CSSProperties = { transitionDelay: `${show ? delay : 0}ms`, opacity: show ? opacity : 0 };
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={dashed ? "0.02 0.015" : 1}
      strokeDashoffset={show || dashed ? 0 : 1}
      className="anim-draw"
      style={style}
    />
  );
}

/** Ejes con flecha: origen en (x0, y0), x hacia la derecha hasta x1, y hacia arriba hasta y1 (< y0). */
export function Axes({
  x0,
  y0,
  x1,
  y1,
  xLabel,
  yLabel,
  color = MANIM.muted,
}: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  xLabel?: ReactNode;
  yLabel?: ReactNode;
  color?: string;
}) {
  return (
    <g>
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={color} strokeWidth={2.5} />
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke={color} strokeWidth={2.5} />
      <polygon points={`${x1},${y0} ${x1 - 10},${y0 - 5} ${x1 - 10},${y0 + 5}`} fill={color} />
      <polygon points={`${x0},${y1} ${x0 - 5},${y1 + 10} ${x0 + 5},${y1 + 10}`} fill={color} />
      {xLabel !== undefined ? (
        <Txt x={x1} y={y0 + 30} size={18} color={color} anchor="end" weight={500}>
          {xLabel}
        </Txt>
      ) : null}
      {yLabel !== undefined ? (
        <g transform={`translate(${x0 - 30} ${(y0 + y1) / 2}) rotate(-90)`}>
          <Txt x={0} y={0} size={18} color={color} weight={500}>
            {yLabel}
          </Txt>
        </g>
      ) : null}
    </g>
  );
}

/** Interpolación lineal por tramos (x creciente); fuera del rango se queda en los extremos. */
export function interp(points: readonly (readonly [number, number])[], x: number): number {
  const first = points[0]!;
  const last = points[points.length - 1]!;
  if (x <= first[0]) {
    return first[1];
  }
  if (x >= last[0]) {
    return last[1];
  }
  for (let i = 1; i < points.length; i += 1) {
    const [x1, y1] = points[i]!;
    const [x0, y0] = points[i - 1]!;
    if (x <= x1) {
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return last[1];
}

/** Inversa de `interp` para tablas con la segunda coordenada creciente. */
export function interpInverse(points: readonly (readonly [number, number])[], y: number): number {
  return interp(points.map(([a, b]) => [b, a] as const), y);
}

/** Colores de grano (Manim con transparencia razonable). */
export const GRAIN_COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple, MANIM.yellow, MANIM.red, "#7fd3c8"] as const;

export type Seed = readonly [number, number];

/** Recorta un polígono con el semiplano `a·x + b·y <= c` (Sutherland-Hodgman). */
function clipHalfPlane(poly: readonly Seed[], a: number, b: number, c: number): Seed[] {
  const out: Seed[] = [];
  for (let i = 0; i < poly.length; i += 1) {
    const p = poly[i]!;
    const q = poly[(i + 1) % poly.length]!;
    const dp = a * p[0] + b * p[1] - c;
    const dq = a * q[0] + b * q[1] - c;
    if (dp <= 0) {
      out.push(p);
    }
    if (dp * dq < 0) {
      const t = dp / (dp - dq);
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  return out;
}

/** Celdas de Voronoi exactas (un polígono por semilla) dentro de un rectángulo `w × h`. */
export function voronoiPolygons(seeds: readonly Seed[], w: number, h: number): Seed[][] {
  return seeds.map(([sx, sy], i) => {
    let poly: Seed[] = [
      [0, 0],
      [w, 0],
      [w, h],
      [0, h],
    ];
    seeds.forEach(([ox, oy], j) => {
      if (i === j || poly.length === 0) {
        return;
      }
      const a = ox - sx;
      const b = oy - sy;
      const c = (ox * ox + oy * oy - sx * sx - sy * sy) / 2;
      poly = clipHalfPlane(poly, a, b, c);
    });
    return poly;
  });
}

export const pointsAttr = (poly: readonly Seed[]) => poly.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** Semillas repartidas de forma regular pero no alineada (sucesión de baja discrepancia). */
export function spreadSeeds(n: number, w: number, h: number, margin = 14): Seed[] {
  return Array.from({ length: n }, (_, i) => [
    margin + ((i * 0.6180339887 + 0.13) % 1) * (w - 2 * margin),
    margin + ((i * 0.7548776662 + 0.31) % 1) * (h - 2 * margin),
  ]);
}

/** Etiqueta con caja (para rótulos sobre diagramas). */
export function Tag({
  x,
  y,
  children,
  color = MANIM.ink,
  size = 20,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <Txt x={x} y={y} size={size} color={color} anchor={anchor}>
      {children}
    </Txt>
  );
}
