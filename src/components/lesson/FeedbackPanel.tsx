"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CheckResult } from "@/lib/lesson-schema";

interface FeedbackPanelProps {
  result: CheckResult | null;
  hintIndex: number;
  onShowHint: () => void;
}

export function FeedbackPanel({
  result,
  hintIndex,
  onShowHint,
}: FeedbackPanelProps) {
  if (!result) return null;

  const visibleHints = result.hints.slice(0, hintIndex + 1);
  const hasMoreHints = hintIndex < result.hints.length - 1;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.correct ? "correct" : "incorrect"}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl border-2 p-4 ${
          result.correct
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{result.correct ? "✓" : "✗"}</span>
          <div className="flex-1">
            <p
              className={`font-semibold ${
                result.correct ? "text-emerald-800" : "text-amber-800"
              }`}
            >
              {result.correct ? "¡Correcto!" : "Casi…"}
            </p>
            <p className="mt-1 text-sm text-slate-700">{result.explanation}</p>

            {visibleHints.length > 0 && (
              <div className="mt-3 space-y-1">
                {visibleHints.map((hint, i) => (
                  <p key={i} className="text-sm text-slate-600">
                    💡 {hint}
                  </p>
                ))}
              </div>
            )}

            {!result.correct && hasMoreHints && (
              <button
                type="button"
                onClick={onShowHint}
                className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Ver otra pista
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
