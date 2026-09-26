import Link from "next/link";
import Image from "next/image";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import type { NextLessonRef } from "@/lib/curriculum/course-progress";

type CourseNextStepProps = {
  next: NextLessonRef;
};

function lessonMetaLabel(next: NextLessonRef): string {
  const { lesson } = next;
  if (lesson.kind === "interactive") {
    return lesson.stepCount ? `Lección guiada · ${lesson.stepCount} pasos` : "Lección guiada";
  }
  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

function actionLabel(next: NextLessonRef): string {
  if (next.isReview) {
    return "Repasar";
  }
  return next.lesson.pathStatus === "started" ? "Continuar" : "Empezar";
}

export function CourseNextStep({ next }: CourseNextStepProps) {
  return (
    <div className="space-y-4" data-testid="course-next-step">
      <div className="rounded-3xl border-2 border-cobalt/20 bg-paper-raised p-5 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">
          {next.isReview ? "Repaso" : "Siguiente paso"}
        </p>
        <h2 className="mt-2 font-heading text-lg font-semibold leading-snug text-ink">
          {next.lesson.title.replace(/^\d+\.\s*/, "")}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Tema {next.moduleNumber} · {next.module.title}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cobalt-tint/60 px-2.5 py-1 text-xs font-medium text-cobalt">
          <SparklesIcon className="size-3.5" aria-hidden />
          {lessonMetaLabel(next)}
        </p>
        <Button
          nativeButton={false}
          className="mt-4 w-full rounded-full py-6 text-base font-semibold"
          render={<Link href={resolveLessonHref(next.lesson.id)} data-testid="course-next-cta" />}
        >
          {actionLabel(next)}
        </Button>
      </div>

      <div className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white/70 p-4">
        <Image
          src="/tutor/soot-sprite.jpg"
          alt=""
          width={56}
          height={56}
          className="size-11 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Te acompaño paso a paso dentro de la lección. Si algo no sale, pulsa{" "}
          <span className="font-medium text-ink">¿Por qué?</span> y lo vemos juntos.
        </p>
      </div>
    </div>
  );
}
