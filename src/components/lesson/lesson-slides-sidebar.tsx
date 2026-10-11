"use client";

import { useCallback, useId, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { formatLessonStepTitle } from "@/lib/lesson/presenter-title";
import { cn } from "@/lib/utils";

export type LessonSlideNavItem = {
  id: string;
  title: string;
};

type LessonSlidesSidebarProps = {
  slides: LessonSlideNavItem[];
  current: number;
  maxReached: number;
  visitedSteps: boolean[];
  completedSteps: boolean[];
  onSelect: (index: number) => void;
};

export type SlideDotVariant = "done" | "current" | "pending" | "pending-locked";

/** Color del punto según visita/completado, no según índice relativo al paso actual. */
export function resolveSlideDotVariant(
  index: number,
  current: number,
  maxReached: number,
  visitedSteps: boolean[],
  completedSteps: boolean[],
): SlideDotVariant {
  const isCurrent = index === current;
  if (isCurrent) {
    return "current";
  }
  const visited = Boolean(visitedSteps[index]);
  const completed = Boolean(completedSteps[index]);
  if (visited || completed) {
    return "done";
  }
  if (index > maxReached) {
    return "pending-locked";
  }
  return "pending";
}

function SlideDot({ variant }: { variant: SlideDotVariant }) {
  return (
    <span
      className={cn(
        "block size-[9px] shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none",
        variant === "done" && "bg-emerald-400 ring-1 ring-emerald-300/55",
        variant === "current" &&
          "bg-[#8b96ff] shadow-[0_0_0_3px_rgba(139,150,255,0.48)]",
        variant === "pending" && "bg-slate-200/70 ring-1 ring-white/35",
        variant === "pending-locked" && "bg-slate-300/45 ring-1 ring-white/25",
      )}
      aria-hidden
    />
  );
}

function SlideTitleLabel({
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
        "pointer-events-none absolute right-[calc(100%+8px)] top-1/2 max-w-[min(14rem,calc(100vw-6rem))] -translate-y-1/2 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border px-2.5 py-1 text-[11px] font-medium leading-none tracking-tight transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none sm:text-xs",
        visible ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0",
        isCurrent
          ? "border-cobalt/50 bg-cobalt/18 text-[color:var(--stage-ink,#e8edf5)]"
          : "border-[color:var(--stage-border,#475569)]/85 bg-[#121a26]/95 text-[color:var(--stage-muted,#cbd5e1)]",
      )}
      aria-hidden={!visible}
    >
      <MathRenderer text={formatLessonStepTitle(title)} />
    </span>
  );
}

export function LessonSlidesSidebar({
  slides,
  current,
  maxReached,
  visitedSteps,
  completedSteps,
  onSelect,
}: LessonSlidesSidebarProps) {
  const listId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const labelVisible = useCallback(
    (index: number) => hoverIndex === index || focusIndex === index,
    [focusIndex, hoverIndex],
  );

  return (
    <nav
      id="lesson-slides-sidebar"
      data-testid="lesson-slides-sidebar"
      aria-label="Pasos de la lección"
      className="pointer-events-none fixed right-[10px] top-1/2 z-[58] -translate-y-1/2"
    >
      <p id={listId} className="sr-only">
        Pasos de la lección, paso {current + 1} de {slides.length}
      </p>
      <ol
        className="pointer-events-auto m-0 flex list-none flex-col items-center gap-[2px] p-0"
        aria-labelledby={listId}
      >
        {slides.map((slide, index) => {
          const isCurrent = index === current;
          const variant = resolveSlideDotVariant(
            index,
            current,
            maxReached,
            visitedSteps,
            completedSteps,
          );
          const isLocked = variant === "pending-locked";

          return (
            <li key={slide.id}>
              <button
                type="button"
                data-testid={`lesson-slide-thumb-${index + 1}`}
                aria-label={slide.title}
                aria-current={isCurrent ? "step" : undefined}
                aria-disabled={index > current && isLocked ? true : undefined}
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked && index !== current) {
                    onSelect(index);
                  }
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex((prev) => (prev === index ? null : prev))}
                onFocus={() => setFocusIndex(index)}
                onBlur={() => setFocusIndex((prev) => (prev === index ? null : prev))}
                className={cn(
                  "relative inline-flex size-[22px] items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#121a26]",
                  isLocked && "cursor-default opacity-45",
                  !isLocked && "hover:bg-white/[0.04]",
                )}
              >
                <SlideTitleLabel
                  title={slide.title}
                  visible={labelVisible(index)}
                  isCurrent={isCurrent}
                />
                <SlideDot variant={variant} />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
