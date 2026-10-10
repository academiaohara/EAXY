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
  onSelect: (index: number) => void;
};

function SlideDot({
  variant,
}: {
  variant: "done" | "current" | "pending" | "pending-locked";
}) {
  return (
    <span
      className={cn(
        "block size-[9px] shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none",
        variant === "done" && "bg-emerald-400 ring-1 ring-emerald-300/55",
        variant === "current" &&
          "bg-cobalt shadow-[0_0_0_3px_rgba(67,83,255,0.38)]",
        variant === "pending" && "bg-slate-400/50 ring-1 ring-slate-500/45",
        variant === "pending-locked" && "bg-slate-600/40 ring-1 ring-slate-600/55",
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
          const isDone = index < current;
          const isLocked = index > maxReached;
          let variant: "done" | "current" | "pending" | "pending-locked";
          if (isCurrent) {
            variant = "current";
          } else if (isDone) {
            variant = "done";
          } else if (isLocked) {
            variant = "pending-locked";
          } else {
            variant = "pending";
          }

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
