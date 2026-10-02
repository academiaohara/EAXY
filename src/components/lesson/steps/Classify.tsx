"use client";

import { useCallback, useMemo, useState, type DragEvent } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell, tallFractions } from "@/components/lesson/steps/PracticeShell";
import {
  classifyIsComplete,
  classifyMistakes,
  type ClassifyAssignments,
} from "@/lib/lesson/practice-check";
import { cn } from "@/lib/utils";
import type { ClassifyStep, VisualTone } from "@/lib/lesson/types";

type ClassifyProps = {
  step: ClassifyStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
};

const DEFAULT_TONES: VisualTone[] = ["cobalt", "violet", "emerald", "rose"];

const toneBin: Record<VisualTone, { bin: string; title: string; active: string }> = {
  cobalt: { bin: "border-cobalt/25 bg-cobalt-tint/25", title: "text-cobalt", active: "border-cobalt bg-cobalt-tint/60" },
  violet: { bin: "border-violet-200 bg-violet-50/50", title: "text-violet-700", active: "border-violet-500 bg-violet-100/70" },
  emerald: { bin: "border-emerald-200 bg-emerald-50/50", title: "text-emerald-700", active: "border-emerald-500 bg-emerald-100/70" },
  amber: { bin: "border-amber-200 bg-amber-50/50", title: "text-amber-700", active: "border-amber-400 bg-amber-100/70" },
  rose: { bin: "border-rose-200 bg-rose-50/50", title: "text-rose-700", active: "border-rose-400 bg-rose-100/70" },
};

const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Classify({ step, onCheck, disabled = false, compact = false }: ClassifyProps) {
  const [assignments, setAssignments] = useState<ClassifyAssignments>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState<string[]>([]);

  const locked = disabled || checked;
  const complete = classifyIsComplete(step, assignments);
  const pool = step.items.filter((item) => !assignments[item.id]);

  const place = useCallback(
    (itemId: string, groupId: string | undefined) => {
      if (locked) {
        return;
      }
      setAssignments((prev) => ({ ...prev, [itemId]: groupId }));
      setSelectedId(null);
    },
    [locked],
  );

  const handleCheck = useCallback(() => {
    if (checked || !complete) {
      return;
    }
    const wrong = classifyMistakes(step, assignments);
    setMistakes(wrong);
    setChecked(true);
    setSelectedId(null);
    onCheck(wrong.length === 0);
  }, [assignments, checked, complete, onCheck, step]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: !complete || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, complete, disabled, handleCheck]);

  useRegisterLessonStepControl(control);

  function dropOn(event: DragEvent, groupId: string | undefined) {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text/plain");
    if (itemId) {
      place(itemId, groupId);
    }
  }

  function renderChip(item: ClassifyStep["items"][number]) {
    const isSelected = selectedId === item.id;
    const wrong = checked && mistakes.includes(item.id);
    const right = checked && !wrong;
    const correctGroup = step.groups.find((group) => group.id === item.group);

    return (
      <button
        key={item.id}
        type="button"
        draggable={!locked}
        onDragStart={(event) => {
          event.dataTransfer.setData("text/plain", item.id);
          setSelectedId(item.id);
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (!locked) {
            setSelectedId(isSelected ? null : item.id);
          }
        }}
        disabled={locked}
        aria-pressed={isSelected}
        className={cn(
          "lesson-idea-enter relative inline-flex min-h-11 items-center gap-2 rounded-xl border-2 bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-sm transition-all sm:text-base",
          !locked && "cursor-grab hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing",
          isSelected ? "-translate-y-0.5 border-cobalt ring-4 ring-cobalt/15" : "border-slate-200",
          right && "border-emerald-400 bg-emerald-50 text-emerald-900",
          wrong && "border-amber-400 bg-amber-50 text-amber-950 animate-shake",
        )}
        data-testid="classify-item"
        data-item-id={item.id}
      >
        <MathRenderer text={tallFractions(item.text)} />
        {right ? <CheckIcon className="size-4 text-emerald-600" strokeWidth={3} aria-label="Bien" /> : null}
        {wrong ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800">
            <XIcon className="size-3.5" strokeWidth={3} aria-hidden />
            va en «{correctGroup?.label}»
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-classify">
      <div
        className={cn(
          "flex min-h-16 flex-wrap items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed px-3 py-3 transition-colors",
          pool.length > 0 ? "border-slate-200 bg-slate-50/70" : "border-transparent",
          selectedId && assignments[selectedId] && "border-cobalt/40 bg-cobalt-tint/20",
        )}
        onClick={() => selectedId && assignments[selectedId] && place(selectedId, undefined)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => dropOn(event, undefined)}
        data-testid="classify-pool"
      >
        {pool.length > 0 ? (
          pool.map(renderChip)
        ) : checked ? null : (
          <span className="text-sm text-ink-muted">Todas colocadas. ¡Comprueba!</span>
        )}
      </div>

      <p className="text-center text-xs text-ink-muted">
        {selectedId
          ? "Ahora toca el grupo donde va."
          : "Toca una tarjeta (o arrástrala) y luego el grupo donde va."}
      </p>

      <div className={cn("grid gap-3", GRID_COLS[step.groups.length] ?? "sm:grid-cols-2")}>
        {step.groups.map((group, index) => {
          const tone = toneBin[group.tone ?? DEFAULT_TONES[index % DEFAULT_TONES.length]];
          const members = step.items.filter((item) => assignments[item.id] === group.id);
          const target = Boolean(selectedId) && !locked;

          return (
            <div
              key={group.id}
              role="button"
              tabIndex={target ? 0 : -1}
              aria-label={`Grupo ${group.label}`}
              onClick={() => selectedId && place(selectedId, group.id)}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && selectedId) {
                  event.preventDefault();
                  place(selectedId, group.id);
                }
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => dropOn(event, group.id)}
              className={cn(
                "flex min-h-36 flex-col gap-3 rounded-2xl border-2 p-3 transition-all sm:p-4",
                tone.bin,
                target && cn("cursor-pointer hover:scale-[1.01]", tone.active),
              )}
              data-testid="classify-group"
              data-group-id={group.id}
            >
              <p className={cn("text-center font-heading text-sm font-semibold uppercase tracking-wide", tone.title)}>
                <MathRenderer text={tallFractions(group.label)} />
              </p>
              <div className="flex flex-wrap justify-center gap-2">{members.map(renderChip)}</div>
            </div>
          );
        })}
      </div>
    </PracticeShell>
  );
}
