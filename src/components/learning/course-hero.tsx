import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, DumbbellIcon, LayersIcon } from "lucide-react";
import { CourseMathEmblem } from "@/components/learning/course-math-emblem";
import { Button } from "@/components/ui/button";
import { findNextLesson, getCourseProgress } from "@/lib/curriculum/course-progress";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import { sortModules } from "@/lib/curriculum/course-navigation";
import { stripLessonNumber, topicHref } from "@/lib/navigation/learning-trail";
import type { CourseSummary, ModuleSummary } from "@/lib/curriculum/types";

type CourseHeroProps = {
  course: CourseSummary;
  modules: ModuleSummary[];
};

export function CourseHero({ course, modules }: CourseHeroProps) {
  const sorted = sortModules(modules);
  const { totalLessons, completedLessons, totalExercises, percent } = getCourseProgress(sorted);
  const next = findNextLesson(sorted);
  const hasStarted = sorted.some((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.pathStatus !== "not_started"),
  );

  const primaryLabel = next?.isReview ? "Repasar" : hasStarted ? "Continuar" : "Empezar el curso";

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-border bg-paper-raised shadow-sm"
      data-testid="course-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_18rem_at_0%_0%,rgb(67_83_255/0.09),transparent_70%)]"
        aria-hidden
      />
      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cobalt">Curso</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {course.title}
            </h1>
            {course.description ? (
              <p className="max-w-2xl leading-relaxed text-ink-muted">{course.description}</p>
            ) : null}
          </div>

          <dl className="flex flex-wrap gap-2 text-sm text-ink-muted">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 ring-1 ring-border">
              <LayersIcon className="size-4 text-cobalt" aria-hidden />
              <dd>
                {sorted.length} {sorted.length === 1 ? "tema" : "temas"}
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 ring-1 ring-border">
              <BookOpenIcon className="size-4 text-cobalt" aria-hidden />
              <dd>
                {totalLessons} {totalLessons === 1 ? "lección" : "lecciones"}
              </dd>
            </div>
            {totalExercises > 0 ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 ring-1 ring-border">
                <DumbbellIcon className="size-4 text-cobalt" aria-hidden />
                <dd>
                  {totalExercises} {totalExercises === 1 ? "ejercicio" : "ejercicios"}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
              <span>
                {completedLessons} de {totalLessons} lecciones completadas
              </span>
              <span className="tabular-nums text-ink">{percent}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso del curso"
              data-testid="course-progress-bar"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cobalt to-emerald-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {next ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                nativeButton={false}
                className="rounded-full"
                render={
                  <Link
                    href={resolveLessonHref(next.lesson.id)}
                    data-testid="course-hero-primary-cta"
                  />
                }
              >
                {primaryLabel}
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Button>
              <Link
                href={topicHref(course.slug, next.module.slug)}
                className="min-w-0 text-sm text-ink-muted transition-colors hover:text-cobalt"
                data-testid="course-hero-topic-link"
              >
                <span className="font-semibold text-ink">Tema {next.moduleNumber}</span> —{" "}
                {stripLessonNumber(next.lesson.title)}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="hidden items-center justify-center lg:flex lg:justify-end">
          <CourseMathEmblem />
        </div>
      </div>
    </section>
  );
}
