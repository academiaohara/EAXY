import Link from "next/link";
import { BookOpenIcon, DumbbellIcon, PlayCircleIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  findNextLesson,
  getLessonProgressStatus,
  type NextLessonRef,
} from "@/lib/curriculum/course-progress";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import type { ModuleSummary } from "@/lib/curriculum/types";

type CourseTopicQuickAccessProps = {
  courseModule: ModuleSummary;
  moduleNumber: number;
};

function lessonMetaLabel(next: NextLessonRef): string {
  const { lesson } = next;
  if (lesson.kind === "interactive") {
    return lesson.stepCount ? `${lesson.stepCount} pasos guiados` : "Lección guiada";
  }
  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

function actionLabel(next: NextLessonRef): string {
  if (next.isReview) {
    return "Repasar";
  }
  return next.lesson.pathStatus === "started" ? "Continuar" : "Empezar";
}

export function CourseTopicQuickAccess({ courseModule, moduleNumber }: CourseTopicQuickAccessProps) {
  const nextRaw = findNextLesson([courseModule]);
  const next = nextRaw ? { ...nextRaw, moduleNumber } : null;

  const inProgress = courseModule.lessons.filter(
    (lesson) => getLessonProgressStatus(lesson) === "started",
  );
  const hasExercises = (courseModule.topicExercises?.length ?? 0) > 0;

  const shortcuts = [
    ...inProgress
      .filter((lesson) => !next || lesson.id !== next.lesson.id)
      .map((lesson) => ({
        key: lesson.id,
        href: resolveLessonHref(lesson.id),
        title: lesson.title.replace(/^\d+\.\s*/, ""),
        meta: "En curso",
        icon: PlayCircleIcon,
        testId: `quick-access-lesson-${lesson.id}`,
      })),
  ];

  if (shortcuts.length === 0 && !next && !hasExercises) {
    return null;
  }

  return (
    <section className="space-y-3" data-testid="course-topic-quick-access">
      <header className="space-y-0.5">
        <h2 className="font-heading text-lg font-semibold text-ink">Sigue donde lo dejaste</h2>
        <p className="text-sm text-muted-foreground">Accesos directos a tu actividad en este tema.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {next ? (
          <Card
            className="border-cobalt/25 bg-cobalt-tint/20 p-4 shadow-sm sm:col-span-2"
            data-testid="quick-access-next"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">
              {next.isReview ? "Repaso recomendado" : "Siguiente paso"}
            </p>
            <p className="mt-2 font-medium leading-snug text-ink">
              {next.lesson.title.replace(/^\d+\.\s*/, "")}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <SparklesIcon className="size-3.5 text-cobalt" aria-hidden />
              {lessonMetaLabel(next)}
            </p>
            <Button
              nativeButton={false}
              className="mt-4 w-full rounded-full sm:w-auto"
              render={
                <Link href={resolveLessonHref(next.lesson.id)} data-testid="quick-access-next-cta" />
              }
            >
              {actionLabel(next)}
            </Button>
          </Card>
        ) : null}

        {shortcuts.map((entry) => {
          const Icon = entry.icon;
          return (
            <Link
              key={entry.key}
              href={entry.href}
              data-testid={entry.testId}
              className="group rounded-2xl border border-slate-200 bg-paper-raised p-4 shadow-sm outline-none transition-all hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40"
            >
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
                <Icon className="size-3.5" aria-hidden />
                {entry.meta}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-ink group-hover:text-cobalt">
                {entry.title}
              </p>
            </Link>
          );
        })}

        {hasExercises ? (
          <a
            href="#topic-exercises"
            data-testid="quick-access-exercises"
            className="group rounded-2xl border border-slate-200 bg-paper-raised p-4 shadow-sm outline-none transition-all hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40"
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
              <DumbbellIcon className="size-3.5" aria-hidden />
              Refuerzo
            </p>
            <p className="mt-2 text-sm font-medium leading-snug text-ink group-hover:text-cobalt">
              Ejercicios del tema
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {courseModule.topicExercises?.length ?? 0}{" "}
              {(courseModule.topicExercises?.length ?? 0) === 1 ? "ejercicio" : "ejercicios"} con
              vídeo y resolución
            </p>
          </a>
        ) : null}

        {courseModule.lessons.length > 0 ? (
          <a
            href="#course-lessons"
            data-testid="quick-access-all-lessons"
            className="group rounded-2xl border border-slate-200 bg-paper-raised p-4 shadow-sm outline-none transition-all hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40"
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
              <BookOpenIcon className="size-3.5" aria-hidden />
              Ruta
            </p>
            <p className="mt-2 text-sm font-medium leading-snug text-ink group-hover:text-cobalt">
              Ver todas las lecciones
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {courseModule.lessons.length}{" "}
              {courseModule.lessons.length === 1 ? "lección" : "lecciones"} en este tema
            </p>
          </a>
        ) : null}
      </div>
    </section>
  );
}
