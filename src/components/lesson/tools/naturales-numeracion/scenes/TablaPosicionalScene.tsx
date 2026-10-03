"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { key: "dm", label: "Dec. de millar", digit: "3", value: "30 000 unidades" },
  { key: "um", label: "Unid. de millar", digit: "5", value: "5 000 unidades" },
  { key: "c", label: "Centenas", digit: "3", value: "300 unidades" },
  { key: "d", label: "Decenas", digit: "1", value: "10 unidades" },
  { key: "u", label: "Unidades", digit: "8", value: "8 unidades" },
] as const;

type TablaPosicionalSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function TablaPosicionalScene({ onReadyChange }: TablaPosicionalSceneProps) {
  const [explored, setExplored] = useState<Set<string>>(() => new Set());
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    onReadyChange(explored.size === COLUMNS.length);
  }, [explored.size, onReadyChange]);

  const activeCol = COLUMNS.find((c) => c.key === active);

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        En <strong className="text-ink">35 318</strong> la misma cifra cambia de valor según la columna. Pulsa cada
        cifra para ver cuántas unidades representa.
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[32rem]">
          <div className="grid grid-cols-5 gap-1 text-center">
            {COLUMNS.map((col) => (
              <p
                key={col.key}
                className="px-1 text-[9px] font-semibold uppercase leading-tight text-cobalt sm:text-[10px]"
              >
                {col.label}
              </p>
            ))}
          </div>
          <div className="relative mt-1 grid grid-cols-5 gap-1">
            {COLUMNS.map((col, index) => {
              const isActive = active === col.key;
              const done = explored.has(col.key);
              return (
                <div key={col.key} className="relative flex flex-col items-center">
                  {index < COLUMNS.length - 1 ? (
                    <span
                      className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-[10px] font-bold text-rose-400 sm:inline"
                      aria-hidden
                    >
                      ×10
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      setActive(col.key);
                      setExplored((prev) => new Set(prev).add(col.key));
                    }}
                    className={cn(
                      "w-full rounded-lg border-2 py-4 text-3xl font-bold tabular-nums transition-all",
                      isActive
                        ? "border-cobalt bg-cobalt-tint text-cobalt shadow-sm"
                        : done
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-ink hover:border-cobalt/40",
                    )}
                    aria-pressed={isActive}
                  >
                    {col.digit}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-center text-2xl font-bold tabular-nums tracking-wide text-ink">35 318</p>
        </div>
      </div>

      <div
        className={cn(
          "min-h-[3.5rem] rounded-xl border px-4 py-3 text-center transition-colors",
          activeCol ? "border-cobalt/30 bg-cobalt-tint/40" : "border-dashed border-slate-200 bg-slate-50/50",
        )}
      >
        {activeCol ? (
          <p className="text-sm text-ink">
            El <strong>{activeCol.digit}</strong> en {activeCol.label.toLowerCase()} son{" "}
            <strong className="text-cobalt">{activeCol.value}</strong>.
          </p>
        ) : (
          <p className="text-sm text-ink-muted">Elige una columna.</p>
        )}
      </div>

      <p className="text-xs text-ink-muted">
        Diez unidades de un orden forman una del orden superior ({explored.size}/{COLUMNS.length} columnas vistas).
      </p>
    </div>
  );
}
