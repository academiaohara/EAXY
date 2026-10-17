import Link from "next/link";
import { ArrowRightIcon, PlayIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AprenderContinueStudying, AprenderStudyShortcut } from "@/lib/curriculum/aprender-home";
import type { LessonSummary } from "@/lib/curriculum/types";
import { courseHref, courseShortTitle } from "@/lib/navigation/learning-trail";

type AprenderContinueSectionProps = {
  data: AprenderContinueStudying;
};

function lessonMetaLabel(lesson: LessonSummary): string {
  if (lesson.kind === "interactive") {
    return lesson.stepCount ? `${lesson.stepCount} pasos guiados` : "Lección guiada";
  }
  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

function PrimaryContinueCard({ entry }: { entry: AprenderStudyShortcut }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt via-indigo-600 to-violet-600 p-6 text-white shadow-lg shadow-cobalt/20 sm:p-8"
      data-testid="aprender-continue-primary"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-6 right-6 select-none font-mono text-[9rem] leading-none text-white/10"
        aria-hidden
      >
        ∑
      </div>

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
          {entry.actionLabel === "Continuar" ? "Retoma tu estudio" : "Tu siguiente paso"}
        </p>

        <p className="mt-4 flex flex-wrap items-center gap-1.5 text-sm text-white/80">
          <Link
            href={courseHref(entry.courseSlug)}
            className="rounded-full bg-white/15 px-2.5 py-0.5 font-medium text-white transition-colors hover:bg-white/25"
          >
            {courseShortTitle(entry.courseTitle)}
          </Link>
          <span aria-hidden>›</span>
          <Link href={entry.topicHref} className="hover:text-white hover:underline underline-offset-4">
            Tema {entry.moduleNumber}: {entry.moduleTitle}
          </Link>
        </p>

        <h3 className="mt-2 max-w-xl font-display text-2xl font-bold leading-tight sm:text-3xl">
          {entry.lessonTitle}
        </h3>

        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/80">
          <SparklesIcon className="size-4" aria-hidden />
          {lessonMetaLabel(entry.lesson)}
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            size="lg"
            nativeButton={false}
            className="rounded-full bg-white text-cobalt shadow-md hover:bg-white/90 sm:min-w-[11rem]"
            render={<Link href={entry.lessonHref} data-testid="aprender-continue-primary-cta" />}
          >
            <PlayIcon data-icon="inline-start" className="fill-current" aria-hidden />
            {entry.actionLabel}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            nativeButton={false}
            className="rounded-full text-white hover:bg-white/15 hover:text-white"
            render={<Link href={entry.topicHref} data-testid="aprender-continue-topic-link" />}
          >
            Ver tema
            <ArrowRightIcon data-icon="inline-end" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SecondaryContinueCard({ entry }: { entry: AprenderStudyShortcut }) {
  return (
    <Link
      href={entry.lessonHref}
      data-testid={`aprender-continue-shortcut-${entry.courseId}`}
      className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-paper-raised p-4 shadow-xs outline-none transition-all hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40"
    >
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cobalt-tint text-cobalt transition-colors group-hover:bg-cobalt group-hover:text-white"
        aria-hidden
      >
        <PlayIcon className="size-4 fill-current" />
      </span>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-xs font-semibold text-cobalt">
          {entry.actionLabel} — {courseShortTitle(entry.courseTitle)}
        </p>
        <p className="truncate text-sm font-semibold text-ink">{entry.lessonTitle}</p>
        <p className="truncate text-xs text-ink-muted">
          Tema {entry.moduleNumber}: {entry.moduleTitle}
        </p>
      </div>
      <ArrowRightIcon
        className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
        aria-hidden
      />
    </Link>
  );
}

export function AprenderContinueSection({ data }: AprenderContinueSectionProps) {
  return (
    <section className="space-y-4" data-testid="aprender-continue-studying">
      <h2 className="sr-only">Sigue estudiando</h2>

      <PrimaryContinueCard entry={data.primary} />

      {data.others.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-ink-muted">También en tus otros cursos</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.others.map((entry) => (
              <SecondaryContinueCard key={`${entry.courseId}-${entry.lessonId}`} entry={entry} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
