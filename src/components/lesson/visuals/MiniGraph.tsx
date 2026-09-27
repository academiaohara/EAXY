import { useId } from "react";
import { getGraphBounds } from "@/lib/lesson/graph-math";
import type { GraphLine, SystemGraphConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#2f5fe0", "#c0392b", "#16a085", "#d35400"];
const SIZE = 160;
const PAD = 14;

type Bounds = ReturnType<typeof getGraphBounds>;

function sx(x: number, bounds: Bounds): number {
  return PAD + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (SIZE - 2 * PAD);
}

function sy(y: number, bounds: Bounds): number {
  return SIZE - PAD - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * (SIZE - 2 * PAD);
}

function segment(line: GraphLine, bounds: Bounds): [number, number, number, number] {
  if (line.form === "vertical" || (line.form === "standard" && line.b === 0)) {
    const x = line.form === "vertical" ? line.x : line.c / line.a;
    return [sx(x, bounds), sy(bounds.yMin, bounds), sx(x, bounds), sy(bounds.yMax, bounds)];
  }
  if (line.form === "horizontal") {
    return [sx(bounds.xMin, bounds), sy(line.y, bounds), sx(bounds.xMax, bounds), sy(line.y, bounds)];
  }
  const y1 = (line.c - line.a * bounds.xMin) / line.b;
  const y2 = (line.c - line.a * bounds.xMax) / line.b;
  return [sx(bounds.xMin, bounds), sy(y1, bounds), sx(bounds.xMax, bounds), sy(y2, bounds)];
}

type MiniGraphProps = {
  graph: SystemGraphConfig;
  /** Retraso con el que empieza a dibujarse, para encadenar varias gráficas. */
  delayMs?: number;
  className?: string;
};

/** Gráfica pequeña y sin controles: las rectas se trazan solas al aparecer. */
export function MiniGraph({ graph, delayMs = 0, className }: MiniGraphProps) {
  const clipId = useId();
  const bounds = getGraphBounds(graph);
  const originX = sx(0, bounds);
  const originY = sy(0, bounds);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={cn("aspect-square w-full", className)}
      role="img"
      aria-hidden
      data-testid="lesson-mini-graph"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={PAD} y={PAD} width={SIZE - 2 * PAD} height={SIZE - 2 * PAD} rx={6} />
        </clipPath>
      </defs>

      <rect x={PAD} y={PAD} width={SIZE - 2 * PAD} height={SIZE - 2 * PAD} rx={6} fill="#f8fafc" />
      {Array.from({ length: bounds.xMax - bounds.xMin + 1 }).map((_, index) => {
        const x = sx(bounds.xMin + index, bounds);
        return <line key={`gx-${index}`} x1={x} y1={PAD} x2={x} y2={SIZE - PAD} stroke="#e2e8f0" strokeWidth={0.6} />;
      })}
      {Array.from({ length: bounds.yMax - bounds.yMin + 1 }).map((_, index) => {
        const y = sy(bounds.yMin + index, bounds);
        return <line key={`gy-${index}`} x1={PAD} y1={y} x2={SIZE - PAD} y2={y} stroke="#e2e8f0" strokeWidth={0.6} />;
      })}
      {bounds.xMin <= 0 && bounds.xMax >= 0 ? (
        <line x1={originX} y1={PAD} x2={originX} y2={SIZE - PAD} stroke="#94a3b8" strokeWidth={1} />
      ) : null}
      {bounds.yMin <= 0 && bounds.yMax >= 0 ? (
        <line x1={PAD} y1={originY} x2={SIZE - PAD} y2={originY} stroke="#94a3b8" strokeWidth={1} />
      ) : null}

      <g clipPath={`url(#${clipId})`}>
        {graph.lines.map((line, index) => {
          const [x1, y1, x2, y2] = segment(line, bounds);
          const color = line.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
          return (
            <line
              key={line.id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              pathLength={1}
              stroke={color}
              strokeWidth={index === 0 ? 3 : 2.5}
              strokeLinecap="round"
              strokeOpacity={index === 0 ? 1 : 0.9}
              className="lesson-draw-line"
              style={{ animationDelay: `${delayMs + index * 450}ms` }}
            />
          );
        })}
      </g>

      {(graph.highlightPoints ?? []).map((point, index) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={sx(point.x, bounds)}
          cy={sy(point.y, bounds)}
          r={4.5}
          fill="#0f172a"
          stroke="#fff"
          strokeWidth={1.5}
          className="lesson-point-pop"
          style={{ animationDelay: `${delayMs + graph.lines.length * 450 + 250 + index * 150}ms` }}
        />
      ))}
    </svg>
  );
}
