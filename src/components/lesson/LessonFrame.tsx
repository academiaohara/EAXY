"use client";

import Link from "next/link";
import { FlagIcon, Volume2Icon, XIcon, ZapIcon } from "lucide-react";
import { LessonProgressHeader } from "@/components/lesson/LessonProgressHeader";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFrameProps = {
  closeHref: string;
  currentStep: number;
  totalSteps: number;
  stars?: number;
  feedback?: FeedbackStatus | null;
  children: React.ReactNode;
  className?: string;
};

function LessonStarBadge({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
      <span>{stars}</span>
      <span aria-hidden>⭐</span>
    </div>
  );
}

export function LessonFrame({
  closeHref,
  currentStep,
  totalSteps,
  stars = 0,
  feedback = null,
  children,
  className,
}: LessonFrameProps) {
  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#eef0f3]",
        className,
      )}
      data-testid="lesson-frame"
    >
      <div className="mx-auto flex w-full max-w-4xl shrink-0 items-center gap-3 px-4 pb-2 pt-3 sm:px-6 sm:pt-4">
        <Link
          href={closeHref}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white/80 hover:text-slate-800"
          aria-label="Cerrar lección"
          data-testid="lesson-close"
        >
          <XIcon className="size-5" />
        </Link>

        <LessonProgressHeader current={currentStep} total={totalSteps} />

        <div className="flex shrink-0 items-center gap-2">
          <LessonStarBadge stars={stars} />
          <div
            className="flex size-8 items-center justify-center rounded-full bg-white/80 text-amber-500 shadow-sm ring-1 ring-slate-200/70"
            title="Racha"
            aria-hidden
          >
            <ZapIcon className="size-4 fill-amber-400" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-3 pb-28 sm:px-6 sm:pb-32">
        <div
          className={cn(
            "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border-2 bg-paper-raised shadow-sm transition-colors duration-300",
            isCorrect && "border-emerald-400 shadow-emerald-100/80",
            isIncorrect && "border-red-300 shadow-red-100/60",
            !feedback && "border-white/80",
          )}
        >
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1 sm:left-4 sm:top-4">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Reportar problema"
            >
              <FlagIcon className="size-3.5" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Activar sonido"
            >
              <Volume2Icon className="size-3.5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center">{children}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
