"use client";

import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LessonSlidePreview = {
  id: string;
  title: string;
};

type LessonSlidesSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: LessonSlidePreview[];
  currentIndex: number;
  completed: boolean[];
  visited: boolean[];
  onGoToStep: (index: number) => void;
};

export function LessonSlidesToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className="shrink-0 rounded-none text-[color:var(--stage-muted,#94a3b8)] hover:bg-white/5 hover:text-[color:var(--stage-ink,#e8edf5)]"
      aria-label={open ? "Cerrar panel de diapositivas" : "Abrir panel de diapositivas"}
      aria-expanded={open}
      aria-controls="lesson-slides-sidebar"
      data-testid="lesson-slides-toggle"
      onClick={onToggle}
    >
      {open ? <PanelRightClose className="size-5" aria-hidden /> : <PanelRightOpen className="size-5" aria-hidden />}
    </Button>
  );
}

/** Panel lateral estilo PowerPoint: miniaturas numeradas para saltar entre pasos visitados. */
export function LessonSlidesSidebar({
  open,
  onOpenChange,
  steps,
  currentIndex,
  completed,
  visited,
  onGoToStep,
}: LessonSlidesSidebarProps) {
  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-30 bg-black/25 transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="Cerrar panel de diapositivas"
        tabIndex={open ? 0 : -1}
        onClick={() => onOpenChange(false)}
      />

      <aside
        id="lesson-slides-sidebar"
        className={cn(
          "fixed right-0 top-0 z-40 flex h-full w-[15.5rem] flex-col border-l border-[color:var(--stage-border,#334155)] bg-[#121a26] text-[color:var(--stage-ink,#e8edf5)] shadow-[-8px_0_24px_rgba(0,0,0,0.35)] transition-transform duration-300 sm:w-[17rem]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        data-testid="lesson-slides-sidebar"
        aria-hidden={!open}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-[color:var(--stage-border,#334155)] px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--stage-muted,#94a3b8)]">
            Diapositivas
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-none text-[color:var(--stage-muted,#94a3b8)] hover:bg-white/5 hover:text-[color:var(--stage-ink,#e8edf5)]"
            aria-label="Cerrar panel"
            onClick={() => onOpenChange(false)}
          >
            <PanelRightClose className="size-4" aria-hidden />
          </Button>
        </header>

        <div
          className="scrollbar-subtle flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2"
          role="tablist"
          aria-label={`Pasos de la lección, paso ${currentIndex + 1} de ${steps.length}`}
        >
          {steps.map((step, index) => {
            const isCurrent = index === currentIndex;
            const isCompleted = completed[index];
            const canNavigate = visited[index] || isCurrent;

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
                        ? `Diapositiva ${index + 1}: ${step.title}`
                        : `Diapositiva ${index + 1}, sin visitar`
                }
                onClick={() => {
                  if (canNavigate) {
                    onGoToStep(index);
                    onOpenChange(false);
                  }
                }}
                className={cn(
                  "group flex flex-col gap-1.5 rounded-none border p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/50",
                  !canNavigate && "cursor-default opacity-45",
                  isCurrent
                    ? "border-cobalt/70 bg-cobalt/15 ring-1 ring-cobalt/40"
                    : "border-[color:var(--stage-border,#334155)] bg-[#1a2332] hover:border-cobalt/35 hover:bg-[#1e293b]",
                )}
              >
                <div
                  className={cn(
                    "relative flex aspect-[16/10] w-full items-center justify-center border border-[color:var(--stage-border,#334155)] bg-[#0f172a] text-[color:var(--stage-muted,#94a3b8)]",
                    isCurrent && "border-cobalt/50",
                  )}
                >
                  <span className="text-lg font-bold tabular-nums">{index + 1}</span>
                  {isCompleted ? (
                    <span
                      className="absolute right-1 top-1 size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <span className="line-clamp-2 px-0.5 text-[11px] font-medium leading-snug text-[color:var(--stage-ink,#e8edf5)]">
                  <MathRenderer text={step.title} />
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
