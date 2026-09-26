"use client";

import Link from "next/link";
import { XIcon, ZapIcon } from "lucide-react";
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
}: LessonFrameProps) {
  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-2 bg-paper-raised shadow-sm transition-colors duration-300",
        isCorrect && "border-emerald-400 shadow-emerald-100/80",
        isIncorrect && "border-red-300 shadow-red-100/60",
        !feedback && "border-slate-200",
      )}
    >
      <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <Link
          href={closeHref}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          aria-label="Cerrar lección"
        >
          <XIcon className="size-5" />
        </Link>

        <LessonProgressHeader current={currentStep} total={totalSteps} />

        <div className="flex shrink-0 items-center gap-2">
          <LessonStarBadge stars={stars} />
          <div
            className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            title="Racha"
            aria-hidden
          >
            <ZapIcon className="size-4" />
          </div>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-8 sm:py-8">{children}</div>
    </div>
  );
}
