"use client";

import { useCallback, useId, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

export type LessonSlidePreview = {
  id: string;
  title: string;
};

type LessonSlidesSidebarProps = {
  /** Anclado abierto (botón rejilla del presentador). */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: LessonSlidePreview[];
  currentIndex: number;
  completed: boolean[];
  visited: boolean[];
  onGoToStep: (index: number) => void;
  /** true mientras el puntero está sobre el rail (margen extra al contenido). */
  onRailHoverChange?: (hovering: boolean) => void;
};

function SlideDot({
  isCurrent,
  isCompleted,
  canNavigate,
}: {
  isCurrent: boolean;
  isCompleted: boolean;
  canNavigate: boolean;
}) {
  return (
    <span
      className={cn(
        "relative z-10 block size-2 shrink-0 rounded-full transition-colors duration-200",
        !canNavigate && "bg-slate-600/35 ring-1 ring-slate-600/50",
        canNavigate && !isCurrent && !isCompleted && "bg-slate-400/55 ring-1 ring-slate-500/60",
        isCompleted && !isCurrent && "bg-emerald-400/85 ring-1 ring-emerald-300/50",
        isCurrent && "size-2.5 bg-cobalt ring-2 ring-cobalt/45 ring-offset-1 ring-offset-[#121a26]",
      )}
      aria-hidden
    />
  );
}

/** Etiqueta horizontal de una sola fila (solo título). */
function SlideRowLabel({
  title,
  visible,
  isCurrent,
}: {
  title: string;
  visible: boolean;
  isCurrent: boolean;
}) {
  return (
    <span
      className={cn(
        "block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none tracking-tight transition-[max-width,opacity,padding,border-color] duration-200 ease-out sm:text-xs",
        visible ? "max-w-[min(13rem,calc(100vw-5rem))] opacity-100" : "max-w-0 border-transparent px-0 opacity-0",
        isCurrent
          ? "border-cobalt/45 bg-cobalt/15 text-[color:var(--stage-ink,#e8edf5)]"
          : "border-[color:var(--stage-border,#334155)]/80 bg-[#121a26]/90 text-[color:var(--stage-muted,#cbd5e1)]",
      )}
      aria-hidden={!visible}
    >
      <MathRenderer text={title} />
    </span>
  );
}

/** Rail vertical: puntos + etiqueta horizontal en la misma fila al hover o anclar. */
export function LessonSlidesSidebar({
  open,
  onOpenChange,
  steps,
  currentIndex,
  completed,
  visited,
  onGoToStep,
  onRailHoverChange,
}: LessonSlidesSidebarProps) {
  const listId = useId();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const showLabel = useCallback(
    (index: number) => {
      if (open) {
        return true;
      }
      return focusedIndex === index;
    },
    [focusedIndex, open],
  );

  const labelsActive = open || focusedIndex !== null;

  return (
    <nav
      id="lesson-slides-sidebar"
      data-testid="lesson-slides-sidebar"
      aria-label="Pasos de la lección"
      className={cn(
        "pointer-events-auto absolute right-0 top-[3.25rem] z-[58] flex transition-[width] duration-200 ease-out sm:top-[3.75rem]",
        "bottom-[5.5rem] sm:bottom-[6.25rem]",
        labelsActive ? "w-[min(15.5rem,calc(100%-1.25rem))] sm:w-[min(16.5rem,calc(100%-2rem))]" : "w-9 sm:w-10",
      )}
      onMouseEnter={() => onRailHoverChange?.(true)}
      onMouseLeave={() => {
        onRailHoverChange?.(false);
        setFocusedIndex(null);
      }}
    >
      <div
        className="relative flex h-full w-full flex-col justify-center py-2 pr-1.5 sm:pr-2"
        role="tablist"
        aria-labelledby={listId}
      >
        <p id={listId} className="sr-only">
          Pasos de la lección, paso {currentIndex + 1} de {steps.length}
        </p>

        <div
          className="pointer-events-none absolute right-[0.5625rem] top-8 bottom-8 w-px bg-[color:var(--stage-border,#475569)]/55 sm:right-[0.625rem]"
          aria-hidden
        />

        <div className="relative flex min-h-0 flex-1 flex-col justify-evenly">
          {steps.map((step, index) => {
            const isCurrent = index === currentIndex;
            const isCompleted = completed[index];
            const canNavigate = visited[index] || isCurrent;
            const labelVisible = showLabel(index);

            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                disabled={!canNavigate}
                data-testid={`lesson-slide-thumb-${index + 1}`}
                aria-label={
                  isCompleted
                    ? `Completado: ${step.title}`
                    : isCurrent
                      ? `Paso actual: ${step.title}`
                      : canNavigate
                        ? `Ir a: ${step.title}`
                        : `Sin visitar: ${step.title}`
                }
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex((prev) => (prev === index ? null : prev))}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => {
                  if (canNavigate) {
                    onGoToStep(index);
                    onOpenChange(false);
                  }
                }}
                className={cn(
                  "flex w-full items-center justify-end gap-2 rounded-sm py-1 pl-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/45",
                  !canNavigate && "cursor-default opacity-35",
                  canNavigate && "hover:bg-white/[0.03]",
                )}
              >
                <SlideRowLabel title={step.title} visible={labelVisible} isCurrent={isCurrent} />
                <SlideDot
                  isCurrent={isCurrent}
                  isCompleted={Boolean(isCompleted)}
                  canNavigate={canNavigate}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
