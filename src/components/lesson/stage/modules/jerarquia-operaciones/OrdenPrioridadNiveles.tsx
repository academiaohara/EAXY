"use client";

import { useCallback, useEffect, useMemo, type DragEvent } from "react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "parentesis", label: "Paréntesis" },
  { id: "mul-div", label: "Multiplicación y división" },
  { id: "sum-resta", label: "Suma y resta" },
] as const;

const SLOT_COUNT = 3;

function normalizeSlots(tapSequence: readonly string[]): (string | null)[] {
  const slots: (string | null)[] = [null, null, null];
  tapSequence.forEach((id, index) => {
    if (index < SLOT_COUNT && id) {
      slots[index] = id;
    }
  });
  return slots;
}

function slotsToTapSequence(slots: readonly (string | null)[]): string[] {
  return slots.map((id) => id ?? "");
}

export type OrdenPrioridadNivelesProps = {
  tapSequence?: readonly string[];
  onTapSequenceChange?: (sequence: string[]) => void;
  disabled?: boolean;
  onReadyChange?: (ready: boolean) => void;
};

export function OrdenPrioridadNiveles({
  tapSequence = [],
  onTapSequenceChange,
  disabled = false,
  onReadyChange,
}: OrdenPrioridadNivelesProps) {
  const slots = useMemo(() => normalizeSlots(tapSequence), [tapSequence]);

  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  const pool = ITEMS.filter((item) => !slots.includes(item.id));

  const placeInSlot = useCallback(
    (itemId: string, slotIndex: number) => {
      if (disabled) {
        return;
      }
      const next = [...slots];
      const prevSlot = next.findIndex((id) => id === itemId);
      if (prevSlot >= 0) {
        next[prevSlot] = null;
      }
      if (next[slotIndex]) {
        next[slotIndex] = null;
      }
      next[slotIndex] = itemId;
      onTapSequenceChange?.(slotsToTapSequence(next));
    },
    [disabled, onTapSequenceChange, slots],
  );

  const returnToPool = useCallback(
    (itemId: string) => {
      if (disabled) {
        return;
      }
      const next = slots.map((id) => (id === itemId ? null : id));
      onTapSequenceChange?.(slotsToTapSequence(next));
    },
    [disabled, onTapSequenceChange, slots],
  );

  const handleDropOnSlot = (event: DragEvent, slotIndex: number) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text/plain");
    if (itemId) {
      placeInSlot(itemId, slotIndex);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-lg space-y-4"
      data-testid="jerarquia-orden-prioridad"
      aria-label="Ordenar niveles de prioridad"
    >
      <p className="text-center text-sm text-ink-muted">
        1 se calcula antes que 2, y 2 antes que 3.
      </p>
      <div className="grid gap-3">
        {slots.map((filledId, slotIndex) => (
          <div
            key={`slot-${slotIndex + 1}`}
            className={cn(
              "flex min-h-[3.25rem] items-center gap-3 rounded-2xl border-2 border-dashed px-3 py-2 transition",
              filledId
                ? "border-slate-300 bg-white/80"
                : "border-slate-200/80 bg-slate-50/40",
            )}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDropOnSlot(event, slotIndex)}
            data-testid={`jerarquia-priority-slot-${slotIndex + 1}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">
              {slotIndex + 1}
            </span>
            {filledId ? (
              <button
                type="button"
                draggable={!disabled}
                disabled={disabled}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", filledId)}
                onClick={() => returnToPool(filledId)}
                className={cn(
                  "min-h-11 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-ink shadow-sm",
                  !disabled && "cursor-grab hover:border-cobalt/40 active:cursor-grabbing",
                )}
              >
                {ITEMS.find((item) => item.id === filledId)?.label ?? filledId}
              </button>
            ) : (
              <span className="text-sm text-ink-muted">Arrastra aquí</span>
            )}
          </div>
        ))}
      </div>
      <div
        className="flex min-h-[3.5rem] flex-wrap justify-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/50 px-3 py-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const itemId = event.dataTransfer.getData("text/plain");
          if (itemId) {
            returnToPool(itemId);
          }
        }}
      >
        {pool.length === 0 ? (
          <span className="text-sm text-ink-muted">Todos los niveles están colocados.</span>
        ) : (
          pool.map((item) => (
            <button
              key={item.id}
              type="button"
              draggable={!disabled}
              disabled={disabled}
              onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
              className={cn(
                "min-h-11 rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm",
                !disabled && "cursor-grab hover:border-cobalt/40 active:cursor-grabbing",
              )}
              data-testid={`jerarquia-priority-item-${item.id}`}
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
