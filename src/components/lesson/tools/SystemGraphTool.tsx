"use client";

import { useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { getGraphBounds, intersectLines } from "@/lib/lesson/graph-math";
import type { GraphLine, SystemGraphConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#2f5fe0", "#c0392b", "#16a085", "#d35400"];

type SystemGraphToolProps = {
  config: SystemGraphConfig;
  compact?: boolean;
};

function toSvgX(x: number, xMin: number, xMax: number, width: number, pad: number): number {
  return pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
}

function toSvgY(y: number, yMin: number, yMax: number, height: number, pad: number): number {
  return height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);
}

function linePath(
  line: GraphLine,
  bounds: ReturnType<typeof getGraphBounds>,
  width: number,
  height: number,
  pad: number,
): string | null {
  const { xMin, xMax, yMin, yMax } = bounds;

  if (line.form === "vertical") {
    const sx = toSvgX(line.x, xMin, xMax, width, pad);
    return `M ${sx} ${pad} L ${sx} ${height - pad}`;
  }

  if (line.form === "horizontal") {
    const sy = toSvgY(line.y, yMin, yMax, height, pad);
    return `M ${pad} ${sy} L ${width - pad} ${sy}`;
  }

  const x1 = xMin;
  const x2 = xMax;
  const y1 = (line.c - line.a * x1) / line.b;
  const y2 = (line.c - line.a * x2) / line.b;

  return `M ${toSvgX(x1, xMin, xMax, width, pad)} ${toSvgY(y1, yMin, yMax, height, pad)} L ${toSvgX(x2, xMin, xMax, width, pad)} ${toSvgY(y2, yMin, yMax, height, pad)}`;
}

export function SystemGraphTool({ config, compact = false }: SystemGraphToolProps) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(
    () => new Set(config.lines.map((line) => line.id)),
  );

  const bounds = useMemo(() => getGraphBounds(config), [config]);
  const width = 360;
  const height = 360;
  const pad = 36;

  const autoIntersection = useMemo(() => {
    if (config.lines.length < 2) {
      return null;
    }
    return intersectLines(config.lines[0], config.lines[1]);
  }, [config.lines]);

  function toggleLine(id: string) {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4" data-testid="system-graph-tool">
      <div className="flex flex-wrap gap-2">
        {config.lines.map((line, index) => {
          const color = line.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
          const active = visibleIds.has(line.id);
          return (
            <button
              key={line.id}
              type="button"
              onClick={() => toggleLine(line.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                active ? "border-transparent text-white" : "border-border bg-paper text-muted-foreground",
              )}
              style={active ? { backgroundColor: color } : undefined}
            >
              <MathRenderer text={line.label} />
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "mx-auto w-full rounded-2xl border border-slate-200 bg-paper-raised p-3 shadow-sm",
          compact && "max-w-[min(100%,30rem)]",
        )}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={cn("mx-auto aspect-square w-full", compact && "max-h-[min(46vh,26rem)]")}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Representación gráfica de rectas"
        >
          {/* Grid */}
          {Array.from({ length: bounds.xMax - bounds.xMin + 1 }).map((_, index) => {
            const x = bounds.xMin + index;
            const sx = toSvgX(x, bounds.xMin, bounds.xMax, width, pad);
            return (
              <line
                key={`v-${x}`}
                x1={sx}
                y1={pad}
                x2={sx}
                y2={height - pad}
                stroke="var(--border)"
                strokeWidth={x === 0 ? 1.5 : 0.5}
              />
            );
          })}
          {Array.from({ length: bounds.yMax - bounds.yMin + 1 }).map((_, index) => {
            const y = bounds.yMin + index;
            const sy = toSvgY(y, bounds.yMin, bounds.yMax, height, pad);
            return (
              <line
                key={`h-${y}`}
                x1={pad}
                y1={sy}
                x2={width - pad}
                y2={sy}
                stroke="var(--border)"
                strokeWidth={y === 0 ? 1.5 : 0.5}
              />
            );
          })}

          {/* Lines */}
          {config.lines.map((line, index) => {
            if (!visibleIds.has(line.id)) {
              return null;
            }
            const path = linePath(line, bounds, width, height, pad);
            if (!path) {
              return null;
            }
            const color = line.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
            return (
              <path
                key={line.id}
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            );
          })}

          {/* Highlight points */}
          {(config.highlightPoints ?? []).map((point) => {
            const cx = toSvgX(point.x, bounds.xMin, bounds.xMax, width, pad);
            const cy = toSvgY(point.y, bounds.yMin, bounds.yMax, height, pad);
            return (
              <g key={`${point.x}-${point.y}`}>
                <circle cx={cx} cy={cy} r={6} fill="#2f5fe0" />
                <circle cx={cx} cy={cy} r={10} fill="none" stroke="#2f5fe0" strokeOpacity={0.35} strokeWidth={2} />
                {point.label ? (
                  <text x={cx + 12} y={cy - 8} className="fill-ink text-[11px]">
                    {point.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {/* Axis labels */}
          <text x={width - pad + 4} y={toSvgY(0, bounds.yMin, bounds.yMax, height, pad) + 4} className="fill-muted-foreground text-[10px]">x</text>
          <text x={toSvgX(0, bounds.xMin, bounds.xMax, width, pad) - 4} y={pad - 8} className="fill-muted-foreground text-[10px]">y</text>
        </svg>
      </div>

      {autoIntersection ? (
        <p className="text-center text-sm text-muted-foreground">
          Punto de corte aproximado:{" "}
          <strong>
            ({autoIntersection.x % 1 === 0 ? autoIntersection.x : autoIntersection.x.toFixed(1)},{" "}
            {autoIntersection.y % 1 === 0 ? autoIntersection.y : autoIntersection.y.toFixed(1)})
          </strong>
        </p>
      ) : null}
    </div>
  );
}
