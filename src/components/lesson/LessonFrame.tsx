"use client";

import Link from "next/link";
import { StarIcon, XIcon } from "lucide-react";
import { LessonProgressHeader } from "@/components/lesson/LessonProgressHeader";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFrameProps = {
  closeHref: string;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  stars?: number;
  totalStars?: number;
  feedback?: FeedbackStatus | null;
  children: React.ReactNode;
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
  stars = 0,
  totalStars,
  feedback = null,
  children,
  overlay,
  tutorPanelOpen = false,
  className,
}: LessonFrameProps) {
  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";

  return (
    <div
      className={cn("relative flex h-full min-h-0 w-full flex-col overflow-hidden", className)}
      data-testid="lesson-frame"
    >
      <div className={cn("flex shrink-0 items-center gap-3 pb-3 pt-3 sm:gap-4", LESSON_SHELL_WIDTH)}>
        <Link
          href={closeHref}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white/80 hover:text-slate-800"
          aria-label="Cerrar lección"
          data-testid="lesson-close"
        >
          <XIcon className="size-5" />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">{lessonTitle}</p>
            <p className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-400">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
          <LessonProgressHeader current={currentStep} total={totalSteps} />
        </div>

        <LessonStarCounter stars={stars} totalStars={totalStars} />
      </div>

      <div className={cn("flex min-h-0 flex-1 flex-col pb-3", LESSON_SHELL_WIDTH)}>
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border-2 bg-paper-raised shadow-sm transition-colors duration-300",
            isCorrect && "border-emerald-400 shadow-emerald-100/80",
            isIncorrect && "border-rose-300 shadow-rose-100/60",
            !feedback && "border-white",
          )}
          data-testid="lesson-step-panel"
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-10 sm:py-8 lg:px-14">
            {children}
          </div>
        </div>
      </div>

      {overlay ? (
        <div
          className={cn(
            "pointer-events-none absolute bottom-6 z-30 transition-[left,right] duration-300",
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
