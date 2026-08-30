"use client";

import { motion } from "framer-motion";
import type { TapSelectWidget } from "@/lib/lesson-schema";
import { MathContent } from "@/lib/math";

interface TapSelectProps {
  widget: TapSelectWidget;
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  correctId?: string;
}

export function TapSelect({
  widget,
  selectedId,
  onSelect,
  disabled = false,
  showResult = false,
  correctId,
}: TapSelectProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {widget.options.map((option) => {
        const isSelected = selectedId === option.id;
        const isCorrect = showResult && option.id === correctId;
        const isWrong = showResult && isSelected && option.id !== correctId;

        let borderClass = "border-slate-200 hover:border-indigo-300";
        if (isSelected && !showResult) {
          borderClass = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200";
        }
        if (isCorrect) {
          borderClass = "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200";
        }
        if (isWrong) {
          borderClass = "border-rose-500 bg-rose-50 ring-2 ring-rose-200";
        }

        return (
          <motion.button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            animate={
              isCorrect
                ? { scale: [1, 1.03, 1] }
                : isWrong
                  ? { x: [0, -6, 6, -4, 4, 0] }
                  : {}
            }
            transition={{ duration: 0.4 }}
            className={`rounded-2xl border-2 bg-white p-4 text-left transition-colors disabled:cursor-not-allowed ${borderClass}`}
          >
            {option.image && (
              <div
                className="mb-3 flex justify-center"
                dangerouslySetInnerHTML={{ __html: option.image }}
              />
            )}
            <div className="text-sm font-medium text-slate-800">
              <MathContent content={option.label} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
