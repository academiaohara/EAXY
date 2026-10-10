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
        "relative z-10 block size-2.5 shrink-0 rounded-full border-2 transition-all duration-200",
        !canNavigate && "border-slate-600/40 bg-slate-700/30",
        canNavigate && !isCurrent && !isCompleted && "border-slate-400/70 bg-slate-500/40",
        isCompleted && !isCurrent && "border-emerald-400/80 bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.45)]",
        isCurrent &&
          "size-3 border-cobalt bg-cobalt/90 shadow-[0_0_14px_rgba(59,130,246,0.55)] ring-2 ring-cobalt/35",
      )}
      aria-hidden
    >
      {isCurrent ? (
        <span className="absolute inset-0 animate-ping rounded-full bg-cobalt/40 opacity-60" />
      ) : null}
    </span>
  );
}

function SlideLabel({
  index,
  title,
  visible,
  side,
}: {
  index: number;
  title: string;
  visible: boolean;
  side: "left";
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 z-20 max-w-[min(12.5rem,calc(100vw-6rem))] -translate-y-1/2 transition-[opacity,transform] duration-200 ease-out",
        side === "left" && "right-[calc(100%+0.75rem)] origin-right",
        visible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="rounded-lg border border-[color:var(--stage-border,#334155)] bg-[#121a26]/96 px-3 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--stage-muted,#94a3b8)]">
          Diapositiva {index + 1}
        </p>
        <p className="line-clamp-3 text-xs font-medium leading-snug text-[color:var(--stage-ink,#e8edf5)]">
          <MathRenderer text={title} />
        </p>
      </div>
    </div>
  );
}

/** Rail vertical con puntos; al pasar el ratón o anclar (rejilla) muestra el título de cada paso. */
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
  const [hovering, setHovering] = useState(false);
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

  return (
    <nav
      id="lesson-slides-sidebar"
      data-testid="lesson-slides-sidebar"
      aria-label="Diapositivas de la lección"
      className={cn(
        "pointer-events-auto absolute right-0 top-[3.25rem] z-[58] flex w-11 sm:top-[3.75rem] sm:w-12",
        "bottom-[5.5rem] sm:bottom-[6.25rem]",
      )}
      onMouseEnter={() => {
        setHovering(true);
        onRailHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        onRailHoverChange?.(false);
        setFocusedIndex(null);
      }}
    >
      <div
        className="relative flex h-full w-full flex-col justify-center py-2 pr-2 sm:pr-2.5"
        role="tablist"
        aria-labelledby={listId}
      >
        <p id={listId} className="sr-only">
          Pasos de la lección, paso {currentIndex + 1} de {steps.length}
        </p>

        <div
          className="pointer-events-none absolute right-[0.6875rem] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[color:var(--stage-border,#475569)] to-transparent sm:right-[0.8125rem]"
          aria-hidden
        />

        <div className="relative flex min-h-0 flex-1 flex-col justify-evenly gap-1">
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
                    ? `Diapositiva ${index + 1}, completada: ${step.title}`
                    : isCurrent
                      ? `Diapositiva ${index + 1}, actual: ${step.title}`
                      : canNavigate
                        ? `Ir a diapositiva ${index + 1}: ${step.title}`
                        : `Diapositiva ${index + 1}, sin visitar`
                }
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex((prev) => (prev === index ? null : prev))}
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex((prev) => (prev === index ? null : prev))}
                onClick={() => {
                  if (canNavigate) {
                    onGoToStep(index);
                    onOpenChange(false);
                  }
                }}
                className={cn(
                  "group relative flex w-full items-center justify-end rounded-full py-1.5 pl-2 pr-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/50",
                  !canNavigate && "cursor-default opacity-40",
                )}
              >
                <SlideLabel index={index} title={step.title} visible={labelVisible} side="left" />
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
