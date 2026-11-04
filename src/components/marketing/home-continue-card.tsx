import Link from "next/link";
import { ArrowRightIcon, BookOpenCheckIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AprenderStudyShortcut } from "@/lib/curriculum/aprender-home";
import { formatCourseLevel } from "@/lib/navigation/course-levels";
import { getSubject, subjectOfCourse } from "@/lib/navigation/subjects";

type HomeContinueCardProps = {
  entry: AprenderStudyShortcut;
};

export function HomeContinueCard({ entry }: HomeContinueCardProps) {
  const subject = getSubject(subjectOfCourse({ slug: entry.courseSlug, title: entry.courseTitle }));
  const lessonMeta =
    entry.lesson.kind === "interactive"
      ? entry.lesson.stepCount
        ? `${entry.lesson.stepCount} pasos guiados`
        : "Lección guiada"
      : `${entry.lesson.exerciseCount} ejercicios`;

  return (
    <aside
      className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#fffdf8]/95 p-6 text-ink shadow-[0_28px_60px_-35px_rgb(25_58_50/0.55)] backdrop-blur"
      data-testid="home-continue-card"
    >
      <div className="pointer-events-none absolute -right-8 -top-12 size-36 rounded-full bg-[var(--sun)]/45" aria-hidden />
      <div className="relative">
        <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#a55439]">
          <SparklesIcon className="size-3.5" aria-hidden />
          {entry.actionLabel === "Continuar" ? "Retoma tu estudio" : "Tu siguiente paso"}
        </p>
        <p className="mt-6 text-sm font-bold text-ink-muted">
          {subject?.label} · {formatCourseLevel(entry.courseTitle)}
        </p>
        <h2 className="mt-2 max-w-sm font-display text-2xl font-extrabold leading-tight tracking-tight">
          {entry.lessonTitle}
        </h2>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <BookOpenCheckIcon className="size-4 text-[#2b7664]" aria-hidden />
          Tema {entry.moduleNumber} · {lessonMeta}
        </p>
        <Button
          variant="sun"
          size="lg"
          className="mt-6 rounded-full"
          nativeButton={false}
          render={<Link href={entry.lessonHref} />}
        >
          {entry.actionLabel}
          <ArrowRightIcon data-icon="inline-end" aria-hidden />
        </Button>
      </div>
    </aside>
  );
}
