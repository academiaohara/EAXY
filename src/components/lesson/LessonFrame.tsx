"use client";

import Link from "next/link";
import { StarIcon, XIcon } from "lucide-react";
import { LessonProgressHeader } from "@/components/lesson/LessonProgressHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFrameProps = {
  closeHref: string;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  /** Índice actual 0-based para la barra navegable. */
  currentStepIndex?: number;
  completedSteps?: boolean[];
  visitedSteps?: boolean[];
  onGoToStep?: (index: number) => void;
  stars?: number;
  totalStars?: number;
  feedback?: FeedbackStatus | null;
  children: React.ReactNode;
  /** Pie con las acciones del paso, dentro del panel para que el brillo lo rodee todo. */
  footer?: React.ReactNode;
  /** Capa flotante sobre el contenido (el tutor), fuera del flujo del paso. */
  overlay?: React.ReactNode;
  /** Con el panel izquierdo abierto, la bola se mueve a la derecha para no taparse. */
  tutorPanelOpen?: boolean;
  className?: string;
};

/** Ancho útil compartido por cabecera, contenido y pie: casi todo el viewport. */
export const LESSON_SHELL_WIDTH = "mx-auto w-full max-w-[112rem] px-4 sm:px-6 lg:px-10";

function LessonStarCounter({ stars, totalStars }: { stars: number; totalStars?: number }) {
  return (
    <div
      className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-amber-600 shadow-sm ring-1 ring-slate-200/70"
      data-testid="lesson-stars"
      aria-label={
        totalStars ? `${stars} de ${totalStars} estrellas` : `${stars} estrellas conseguidas`
      }
    >
      <StarIcon className="size-4 fill-amber-400 text-amber-400" aria-hidden />
      <span className="tabular-nums">
        {stars}
        {totalStars ? <span className="text-amber-600/60">/{totalStars}</span> : null}
      </span>
    </div>
  );
}

export function LessonFrame({
  closeHref,
  lessonTitle,
  currentStep,
  totalSteps,
  currentStepIndex,
  completedSteps,
  visitedSteps,
  onGoToStep,
  stars = 0,
  totalStars,
  feedback = null,
  children,
  footer,
  overlay,
  tutorPanelOpen = false,
  className,
}: LessonFrameProps) {
  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";

  return (
    <div
      className={cn("relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden", className)}
      data-testid="lesson-frame"
      data-feedback={feedback ?? "none"}
    >
      {/* Brillo de fondo alrededor del panel al acertar o fallar. */}
      <div
        className={cn("lesson-feedback-backdrop lesson-feedback-backdrop-correct", isCorrect && "is-visible")}
        aria-hidden
      />
      <div
        className={cn("lesson-feedback-backdrop lesson-feedback-backdrop-incorrect", isIncorrect && "is-visible")}
        aria-hidden
      />

      <div className={cn("flex shrink-0 items-center gap-3 pb-3 pt-3 sm:gap-4", LESSON_SHELL_WIDTH)}>
        <Button
          variant="ghost"
          size="icon-lg"
          nativeButton={false}
          className="rounded-full text-ink-muted hover:bg-cobalt-tint hover:text-cobalt active:bg-[color-mix(in_srgb,var(--cobalt-tint),var(--cobalt)_18%)] active:text-cobalt"
          aria-label="Cerrar lección"
          render={<Link href={closeHref} data-testid="lesson-close" />}
        >
          <XIcon className="size-5" />
        </Button>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">{lessonTitle}</p>
            <p className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-400">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
          <LessonProgressHeader
            currentIndex={currentStepIndex ?? currentStep - 1}
            total={totalSteps}
            completed={completedSteps ?? []}
            visited={visitedSteps ?? []}
            onGoToStep={onGoToStep ?? (() => {})}
          />
          <p className="text-[10px] leading-snug text-slate-400">
            Pulsa un tramo visitado para ir a ese paso. Verde = superado; ámbar = visitado sin completar.
          </p>
        </div>

        <LessonStarCounter stars={stars} totalStars={totalStars} />
      </div>

      <div className={cn("flex min-h-0 flex-1 flex-col pb-4", LESSON_SHELL_WIDTH)}>
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border-2 bg-paper-raised shadow-sm transition-[border-color,box-shadow] duration-300",
            isCorrect && "lesson-panel-glow-correct border-emerald-400",
            isIncorrect && "lesson-panel-glow-incorrect border-amber-400",
            !feedback && "border-white",
          )}
          data-testid="lesson-step-panel"
        >
          <div className="scrollbar-subtle min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-10 sm:py-8 lg:px-14">
            {children}
          </div>
          {footer}
        </div>
      </div>

      {overlay ? (
        <div
          className={cn(
            "pointer-events-none absolute z-30 transition-[left,right] duration-300",
            footer ? "bottom-[6.75rem]" : "bottom-6",
            tutorPanelOpen
              ? "right-4 sm:right-8 lg:right-12"
              : "left-4 sm:left-8 lg:left-12",
          )}
        >
          {overlay}
        </div>
      ) : null}
    </div>
  );
}
