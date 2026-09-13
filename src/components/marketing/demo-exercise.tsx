"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEMO = {
  question: "¿Cuál es el valor de x en 2x + 4 = 10?",
  options: [
    { id: "a", text: "x = 2" },
    { id: "b", text: "x = 3" },
    { id: "c", text: "x = 4" },
  ],
  correctOptionId: "b",
  explanation: "Restamos 4 a ambos lados: 2x = 6. Dividimos entre 2: x = 3.",
};

export function DemoExercise() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = selected === DEMO.correctOptionId;

  return (
    <div className="rounded-xl border border-border bg-paper-raised p-6 shadow-sm">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-cobalt">Pruébalo ahora</p>
      <p className="font-display text-lg font-medium text-ink">{DEMO.question}</p>

      <fieldset className="mt-4 space-y-2" disabled={checked}>
        {DEMO.options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
              selected === option.id && "border-cobalt bg-cobalt-tint/40",
              checked && option.id === DEMO.correctOptionId && "border-emerald-500 bg-emerald-50",
              checked && selected === option.id && option.id !== DEMO.correctOptionId && "border-destructive bg-destructive/5",
            )}
          >
            <input
              type="radio"
              name="demo-exercise"
              checked={selected === option.id}
              onChange={() => setSelected(option.id)}
              className="accent-cobalt"
            />
            <span>{option.text}</span>
          </label>
        ))}
      </fieldset>

      {checked && (
        <p className={`mt-4 text-sm ${isCorrect ? "text-emerald-700" : "text-destructive"}`}>
          {isCorrect ? "¡Correcto!" : "Casi — la respuesta es x = 3."} {DEMO.explanation}
        </p>
      )}

      <Button
        type="button"
        className="mt-4"
        disabled={!selected || checked}
        onClick={() => setChecked(true)}
      >
        Comprobar
      </Button>
    </div>
  );
}
