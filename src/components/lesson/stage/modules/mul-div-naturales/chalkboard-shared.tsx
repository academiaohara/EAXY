"use client";

import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

export type SubVisibility = { from: number; to?: number };

export function isVisibleAtSub(sub: number, rule: SubVisibility): boolean {
  if (sub < rule.from) {
    return false;
  }
  if (rule.to !== undefined) {
    return sub >= rule.from && sub <= rule.to;
  }
  return sub >= rule.from;
}

export function quadPath([x1, y1, cx, cy, x2, y2]: [number, number, number, number, number, number]) {
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function arrowHead([x1, y1, cx, cy, x2, y2]: [number, number, number, number, number, number]) {
  const tx = x2 - cx;
  const ty = y2 - cy;
  const len = Math.hypot(tx, ty) || 1;
  const ux = tx / len;
  const uy = ty / len;
  const px = -uy;
  const py = ux;
  const size = 10;
  const baseX = x2 - ux * size * 1.4;
  const baseY = y2 - uy * size * 1.4;
  return `${x2},${y2} ${baseX + px * size * 0.55},${baseY + py * size * 0.55} ${baseX - px * size * 0.55},${baseY - py * size * 0.55}`;
}

export function DrawnArrow({
  coords,
  visible,
  reduced,
  delayMs,
  stroke = "#e8edf5",
}: {
  coords: [number, number, number, number, number, number];
  visible: boolean;
  reduced: boolean;
  delayMs: number;
  stroke?: string;
}) {
  const d = quadPath(coords);
  const head = arrowHead(coords);
  return (
    <g
      className={cn(!visible && "opacity-0")}
      style={{
        transition: reduced ? undefined : "opacity 0.35s ease",
        transitionDelay: reduced ? undefined : `${delayMs}ms`,
      }}
      aria-hidden={!visible}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={reduced || visible ? 0 : 1}
        style={{
          transition: reduced ? undefined : `stroke-dashoffset 0.55s ease ${delayMs}ms`,
        }}
      />
      <polygon
        points={head}
        fill={stroke}
        className={cn(reduced || visible ? "opacity-100" : "opacity-0")}
        style={{
          transition: reduced ? undefined : `opacity 0.25s ease ${delayMs + 400}ms`,
        }}
      />
    </g>
  );
}

export function SubProgressDots({ sub, total }: { sub: number; total: number }) {
  return (
    <div className="mt-3 flex justify-center gap-2" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            i + 1 === sub ? "bg-cobalt" : i + 1 < sub ? "bg-cobalt/45" : "bg-slate-300",
          )}
        />
      ))}
    </div>
  );
}

export function useChalkboardMotion() {
  return useReducedMotion();
}

export const CHALK_INK = "#e8edf5";
export const CHALK_MUTED = "#94a3b8";
export const CHALK_ACCENT = "#6ee7b7";
