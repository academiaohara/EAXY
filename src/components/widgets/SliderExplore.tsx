"use client";

import { motion } from "framer-motion";
import type { SliderExploreWidget } from "@/lib/lesson-schema";

interface SliderExploreProps {
  widget: SliderExploreWidget;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function RectDivisionVisual({ totalParts }: { totalParts: number }) {
  if (totalParts < 1) return null;

  return (
    <div className="flex h-16 w-full overflow-hidden rounded-xl border-2 border-slate-200">
      {Array.from({ length: totalParts }, (_, i) => (
        <div
          key={i}
          className="flex-1 border-r border-slate-300 bg-indigo-100 last:border-r-0"
        />
      ))}
    </div>
  );
}

function NumberLineVisual({
  range,
  value,
}: {
  range: [number, number];
  value: number;
}) {
  const [min, max] = range;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative h-12 w-full">
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-slate-200" />
      <motion.div
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 shadow-md"
        animate={{ left: `${pct}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div className="absolute bottom-0 flex w-full justify-between text-xs text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function SliderExplore({
  widget,
  value,
  onChange,
  disabled = false,
}: SliderExploreProps) {
  const divisionCount =
    widget.visual.type === "rect_division" ? value : 0;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      {widget.visual.type === "rect_division" && (
        <RectDivisionVisual totalParts={divisionCount} />
      )}
      {widget.visual.type === "number_line" && (
        <NumberLineVisual range={widget.visual.range} value={value} />
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">
            {widget.label}
          </label>
          <span className="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            {value}
            {widget.unit ?? ""}
          </span>
        </div>
        <input
          type="range"
          min={widget.min}
          max={widget.max}
          step={widget.step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-500 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>
            {widget.min}
            {widget.unit ?? ""}
          </span>
          <span>
            {widget.max}
            {widget.unit ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}
