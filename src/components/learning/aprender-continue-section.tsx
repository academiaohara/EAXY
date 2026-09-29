import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  GraduationCapIcon,
  PlayCircleIcon,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AprenderContinueStudying, AprenderStudyShortcut } from "@/lib/curriculum/aprender-home";
import type { LessonSummary } from "@/lib/curriculum/types";

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
    <Card
      className="border-cobalt/25 bg-gradient-to-br from-cobalt-tint/40 to-paper-raised p-5 shadow-sm sm:p-6"
      data-testid="aprender-continue-primary"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">
        {entry.actionLabel === "Continuar" ? "Retoma tu estudio" : "Tu siguiente paso"}
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {entry.lessonTitle}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        <GraduationCapIcon className="mr-1 inline size-4 text-cobalt" aria-hidden />
        {entry.courseTitle}
        <span className="mx-1.5 text-slate-300" aria-hidden>
          ·
        </span>
        Tema {entry.moduleNumber}: {entry.moduleTitle}
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-cobalt">
        <SparklesIcon className="size-3.5" aria-hidden />
        {lessonMetaLabel(entry.lesson)}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          nativeButton={false}
          className="rounded-full sm:min-w-[10rem]"
          render={
            <Link href={entry.lessonHref} data-testid="aprender-continue-primary-cta" />
          }
        >
          {entry.actionLabel}
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          className="rounded-full"
          render={
            <Link href={entry.topicHref} data-testid="aprender-continue-topic-link" />
          }
        >
          Ver tema
        </Button>
      </div>
    </Card>
  );
}

function SecondaryContinueCard({ entry }: { entry: AprenderStudyShortcut }) {
  return (
    <Link
      href={entry.lessonHref}
      data-testid={`aprender-continue-shortcut-${entry.courseId}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-paper-raised p-4 shadow-sm outline-none transition-all hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40"
    >
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
        <PlayCircleIcon className="size-3.5" aria-hidden />
        {entry.actionLabel}
      </p>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium leading-snug text-ink group-hover:text-cobalt">
          {entry.lessonTitle}
        </p>
        <p className="text-xs text-muted-foreground">{entry.courseTitle}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-cobalt">
        <BookOpenIcon className="size-3.5" aria-hidden />
        Tema {entry.moduleNumber}
        <ArrowRightIcon
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function AprenderContinueSection({ data }: AprenderContinueSectionProps) {
  return (
    <section className="space-y-4" data-testid="aprender-continue-studying">
      <header className="space-y-1">
        <h2 className="font-heading text-xl font-semibold text-ink">Sigue estudiando</h2>
        <p className="text-sm text-muted-foreground">
          Acceso rápido a lo que estabas haciendo y al siguiente paso en cada nivel.
        </p>
      </header>

      <PrimaryContinueCard entry={data.primary} />

      {data.others.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.others.map((entry) => (
            <SecondaryContinueCard key={`${entry.courseId}-${entry.lessonId}`} entry={entry} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
