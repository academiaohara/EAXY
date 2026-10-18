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
import type { ClassifySnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import type { ClassifyStep, VisualTone } from "@/lib/lesson/types";

type ClassifyProps = {
  step: ClassifyStep;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  compact?: boolean;
  saved?: ClassifySnapshot | null;
};

const DEFAULT_TONES: VisualTone[] = ["cobalt", "violet", "emerald", "rose"];

/** Colores de grupo (paleta de pizarra): el tono se usa en borde, fondo suave y rótulo. */
const TONE_COLOR: Record<VisualTone, string> = {
  cobalt: "#58c4dd",
  violet: "#c59bd6",
  emerald: "#83c167",
  amber: "#ffd866",
  rose: "#fc6255",
};

function mix(color: string, pct: number): string {
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}

const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Classify({
  step,
  onCheck,
  disabled = false,
  compact = false,
  saved = null,
}: ClassifyProps) {
  const restored = saved?.kind === "classify" ? saved : null;
  const [assignments, setAssignments] = useState<ClassifyAssignments>(restored?.assignments ?? {});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(Boolean(restored));
  const [mistakes, setMistakes] = useState<string[]>(restored?.mistakes ?? []);

  const groupColor = (index: number) =>
    TONE_COLOR[step.groups[index]?.tone ?? DEFAULT_TONES[index % DEFAULT_TONES.length]!];

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
    const correct = wrong.length === 0;
    onCheck({
      correct,
      snapshot: {
        kind: "classify",
        assignments,
        mistakes: wrong,
        isCorrect: correct,
      },
    });
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
    const groupIndex = step.groups.findIndex((group) => group.id === assignments[item.id]);
    const tint = groupIndex >= 0 ? groupColor(groupIndex) : null;

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
          if (locked) {
            return;
          }
          const groupOfItem = assignments[item.id];
          if (selectedId && selectedId !== item.id && groupOfItem) {
            place(selectedId, groupOfItem);
            return;
          }
          setSelectedId(isSelected ? null : item.id);
        }}
        disabled={locked}
        aria-pressed={isSelected}
        style={
          !isSelected && !wrong && !right && tint
            ? { borderColor: mix(tint, 70), backgroundColor: mix(tint, 14) }
            : undefined
        }
        className={cn(
          "lesson-idea-enter relative inline-flex min-h-12 items-center gap-2 rounded-xl border-2 px-4 py-2 text-base font-semibold text-[color:var(--stage-ink,#fff)] shadow-[0_2px_0_rgba(0,0,0,0.35)] transition-all sm:text-lg",
          "border-[#3d4f66] bg-[#222f43]",
          !locked && "cursor-grab hover:-translate-y-0.5 hover:border-[#58c4dd]/70 active:cursor-grabbing",
          isSelected && "-translate-y-1 border-[#58c4dd] bg-[#58c4dd]/15 ring-4 ring-[#58c4dd]/25",
          right && "border-[#83c167] bg-[#83c167]/15",
          wrong && "border-[#ffd866] bg-[#ffd866]/15 animate-shake",
        )}
        data-testid="classify-item"
        data-item-id={item.id}
      >
        <MathRenderer text={tallFractions(item.text)} />
        {right ? <CheckIcon className="size-4 text-[#83c167]" strokeWidth={3} aria-label="Bien" /> : null}
        {wrong ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ffd866]">
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
          "flex min-h-[4.5rem] flex-wrap items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-4 transition-colors",
          pool.length > 0 ? "border-[#3d4f66] bg-[#1a2332]/70" : "border-transparent",
          selectedId && assignments[selectedId] && "border-[#58c4dd]/60 bg-[#58c4dd]/10",
        )}
        onClick={() => selectedId && assignments[selectedId] && place(selectedId, undefined)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => dropOn(event, undefined)}
        data-testid="classify-pool"
      >
        {pool.length > 0 ? (
          pool.map(renderChip)
        ) : checked ? null : (
          <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Todas colocadas. ¡Comprueba!</span>
        )}
      </div>

      <p className="text-center text-sm text-[color:var(--stage-muted,#b8c2d0)]">
        {selectedId
          ? "Ahora toca el grupo donde va."
          : "Toca una tarjeta (o arrástrala) y luego el grupo donde va."}
      </p>

      <div className={cn("grid gap-3", GRID_COLS[step.groups.length] ?? "sm:grid-cols-2")}>
        {step.groups.map((group, index) => {
          const color = groupColor(index);
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
              style={{
                borderColor: mix(color, target ? 90 : 55),
                backgroundColor: mix(color, target ? 16 : 8),
              }}
              className={cn(
                "flex min-h-36 flex-col gap-3 overflow-hidden rounded-2xl border-2 pb-3 transition-all",
                target && "cursor-pointer hover:scale-[1.01]",
              )}
              data-testid="classify-group"
              data-group-id={group.id}
            >
              <p
                className="px-4 py-2.5 text-center font-heading text-base font-bold tracking-wide sm:text-lg"
                style={{ color, backgroundColor: mix(color, 16), borderBottom: `1px solid ${mix(color, 35)}` }}
              >
                <MathRenderer text={tallFractions(group.label)} />
              </p>
              <div className="flex flex-1 flex-wrap content-start justify-center gap-2.5 px-3">
                {members.length > 0 ? (
                  members.map(renderChip)
                ) : (
                  <span className="m-auto text-sm font-medium" style={{ color: mix(color, 55) }}>
                    {target ? "Toca para colocar aquí" : "Suelta aquí"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PracticeShell>
  );
}
