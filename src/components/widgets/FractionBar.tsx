"use client";

import { motion } from "framer-motion";
import type { FractionBarWidget } from "@/lib/lesson-schema";

interface FractionBarProps {
  widget: FractionBarWidget;
  shadedParts: number;
  onShadeChange: (parts: number) => void;
  disabled?: boolean;
  showResult?: boolean;
  targetShaded?: number;
}

export function FractionBar({
  widget,
  shadedParts,
  onShadeChange,
  disabled = false,
  showResult = false,
  targetShaded,
}: FractionBarProps) {
  const target =
    targetShaded ??
    Math.round(
      (widget.targetNumerator / widget.targetDenominator) * widget.totalParts,
    );

  const handlePartClick = (index: number) => {
    if (disabled) return;
    const newShaded = index + 1 === shadedParts ? index : index + 1;
    onShadeChange(newShaded);
  };

  return (
    <div className="space-y-4">
      <div className="flex h-16 w-full overflow-hidden rounded-2xl border-2 border-slate-200 sm:h-20">
        {Array.from({ length: widget.totalParts }, (_, i) => {
          const isShaded = i < shadedParts;
          const isCorrect = showResult && isShaded && i < target;
          const isWrong =
            showResult && ((isShaded && i >= target) || (!isShaded && i < target));

          let bg = isShaded ? "#6366f1" : "#f8fafc";
          if (showResult) {
            if (i < target) bg = "#10b981";
            else if (isShaded) bg = "#f43f5e";
          }

          return (
            <motion.button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handlePartClick(i)}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              animate={{ backgroundColor: bg }}
              transition={{ duration: 0.2 }}
              className={`flex-1 border-r border-white last:border-r-0 ${
                disabled ? "cursor-default" : "cursor-pointer"
              } ${isWrong ? "opacity-80" : ""}`}
              aria-label={`Parte ${i + 1} de ${widget.totalParts}`}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="text-slate-600">
          Partes sombreadas:{" "}
          <strong className="text-slate-900">{shadedParts}</strong> de{" "}
          <strong className="text-slate-900">{widget.totalParts}</strong>
        </span>
        <span className="w-fit rounded-lg bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
          Objetivo: {widget.targetNumerator}/{widget.targetDenominator}
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Toca las casillas para sombrear. Cada parte debe ser igual.
      </p>
    </div>
  );
}
