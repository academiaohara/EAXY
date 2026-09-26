"use client";

import Image from "next/image";
import { MessageCircleIcon, MicIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

type LessonTutorProps = {
  message: string;
  className?: string;
};

export function LessonTutor({ message, className }: LessonTutorProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-16 z-30 px-3 sm:bottom-[4.5rem] sm:px-5",
        className,
      )}
      data-testid="lesson-tutor"
      aria-live="polite"
    >
      <div className="mx-auto flex w-full max-w-4xl items-end justify-start gap-2 pl-1 sm:pl-2">
        <div className="pointer-events-auto flex shrink-0 flex-col items-center gap-1.5 pb-0.5">
          <div className="relative size-[4.5rem] sm:size-20">
            <div
              className="absolute inset-x-2 bottom-0 h-2 rounded-full bg-black/10 blur-sm"
              aria-hidden
            />
            <Image
              src="/tutor/soot-sprite.jpg"
              alt="Tutor Eaxy"
              width={80}
              height={80}
              className="relative size-[4.5rem] animate-[lesson-tutor-float_3s_ease-in-out_infinite] rounded-full object-cover object-center sm:size-20"
              priority
            />
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="flex size-7 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-slate-200/80">
              <MessageCircleIcon className="size-3.5" aria-hidden />
            </span>
            <span className="flex size-7 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-slate-200/80">
              <MicIcon className="size-3.5" aria-hidden />
            </span>
          </div>
        </div>

        <div className="relative mb-8 max-w-[min(100%,16rem)] rounded-2xl rounded-bl-sm border border-slate-200/90 bg-white px-3.5 py-2.5 text-sm leading-snug text-ink shadow-md shadow-slate-200/60 sm:mb-10 sm:max-w-xs">
          <p>
            <MathRenderer text={message} />
          </p>
          <span
            className="absolute -bottom-2 left-4 size-3 rotate-45 border-b border-r border-slate-200/90 bg-white"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
