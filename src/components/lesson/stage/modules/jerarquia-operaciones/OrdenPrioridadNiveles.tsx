"use client";

import { useCallback, useEffect, useMemo, type DragEvent } from "react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "parentesis", label: "Paréntesis" },
  { id: "mul-div", label: "Multiplicación y división" },
  { id: "sum-resta", label: "Suma y resta" },
] as const;

type ItemId = (typeof ITEMS)[number]["id"];

/** Misma paleta que `NivelesReglas`: violeta → ámbar → cian por prioridad. */
const SLOT_ACCENTS = [
  {
    badge: "bg-violet-400 text-slate-900",
    empty: "border-dashed border-violet-400/50 bg-violet-500/12",
    filled: "border-violet-400/65 bg-violet-500/18",
  },
  {
    badge: "bg-amber-400 text-slate-900",
    empty: "border-dashed border-amber-400/50 bg-amber-500/12",
    filled: "border-amber-400/65 bg-amber-500/18",
  },
  {
    badge: "bg-cyan-400 text-slate-900",
    empty: "border-dashed border-cyan-400/50 bg-cyan-500/12",
    filled: "border-cyan-400/65 bg-cyan-500/18",
  },
] as const;

const ITEM_CHIP: Record<ItemId, string> = {
  parentesis:
    "border-violet-400/75 bg-violet-500/28 hover:border-violet-300 hover:bg-violet-500/38",
  "mul-div": "border-amber-400/75 bg-amber-500/28 hover:border-amber-300 hover:bg-amber-500/38",
  "sum-resta": "border-cyan-400/75 bg-cyan-500/28 hover:border-cyan-300 hover:bg-cyan-500/38",
};

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

  const chipBase =
    "min-h-11 rounded-xl border-2 px-4 py-2 text-sm font-semibold text-ink shadow-[0_4px_14px_-6px_rgba(0,0,0,0.45)]";

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
        {slots.map((filledId, slotIndex) => {
          const accent = SLOT_ACCENTS[slotIndex];
          return (
            <div
              key={`slot-${slotIndex + 1}`}
              className={cn(
                "flex min-h-[3.25rem] items-center gap-3 rounded-2xl border-2 px-3 py-2 transition-colors",
                filledId ? accent.filled : accent.empty,
              )}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDropOnSlot(event, slotIndex)}
              data-testid={`jerarquia-priority-slot-${slotIndex + 1}`}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                  accent.badge,
                )}
              >
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
                    chipBase,
                    "flex-1 px-3 text-left",
                    ITEM_CHIP[filledId as ItemId],
                    !disabled && "cursor-grab active:cursor-grabbing",
                  )}
                >
                  {ITEMS.find((item) => item.id === filledId)?.label ?? filledId}
                </button>
              ) : (
                <span className="text-sm text-ink-muted/80">Arrastra aquí</span>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="flex min-h-[3.5rem] flex-wrap justify-center gap-2 rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/35 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
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
                chipBase,
                ITEM_CHIP[item.id],
                !disabled && "cursor-grab active:cursor-grabbing",
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
