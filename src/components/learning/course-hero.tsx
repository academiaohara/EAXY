import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  DumbbellIcon,
  LayersIcon,
} from "lucide-react";
import { CourseMathEmblem } from "@/components/learning/course-math-emblem";
import { Button } from "@/components/ui/button";
import {
  findNextLesson,
  getCourseProgress,
} from "@/lib/curriculum/course-progress";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import { sortModules } from "@/lib/curriculum/course-navigation";
import {
  formatCourseLevel,
  getCourseVariantLabel,
} from "@/lib/navigation/course-levels";
import { stripLessonNumber, topicHref } from "@/lib/navigation/learning-trail";
import { getSubject, subjectOfCourse } from "@/lib/navigation/subjects";
import type { CourseSummary, ModuleSummary } from "@/lib/curriculum/types";

type CourseHeroProps = {
  course: CourseSummary;
  modules: ModuleSummary[];
};

export function CourseHero({ course, modules }: CourseHeroProps) {
  const sorted = sortModules(modules);
  const { totalLessons, completedLessons, totalExercises, percent } =
    getCourseProgress(sorted);
  const next = findNextLesson(sorted);
  const hasStarted = sorted.some((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.pathStatus !== "not_started"),
  );

  const primaryLabel = next?.isReview
    ? "Repasar"
    : hasStarted
      ? "Continuar"
      : "Empezar el curso";
  const level = formatCourseLevel(course.title);
  const variant = getCourseVariantLabel(course.title);
  const subject = getSubject(subjectOfCourse(course));
  const context =
    variant === subject?.label
      ? subject.label
      : `${subject?.label ?? "Curso"} · ${variant}`;

  return (
    <section
      className="relative overflow-hidden rounded-[2.25rem] bg-ink text-white shadow-[0_30px_80px_-48px_rgb(25_58_50/0.8)]"
      data-testid="course-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_22rem_at_0%_0%,rgb(244_201_93/0.19),transparent_70%)]"
        aria-hidden
      />
      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div className="space-y-5">
          <div className="space-y-2">
            <p
              className="text-xs font-extrabold uppercase tracking-[0.16em] text-sun"
              data-testid="course-hero-context"
            >
              {context}
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {level}
            </h1>
            {course.description ? (
              <p className="max-w-2xl leading-relaxed text-white/70">
                {course.description}
              </p>
            ) : null}
          </div>

          <dl className="flex flex-wrap gap-2 text-sm text-white/75">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/15">
              <LayersIcon className="size-4 text-sun" aria-hidden />
              <dd>
                {sorted.length} {sorted.length === 1 ? "tema" : "temas"}
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/15">
              <BookOpenIcon className="size-4 text-sun" aria-hidden />
              <dd>
                {totalLessons} {totalLessons === 1 ? "lección" : "lecciones"}
              </dd>
            </div>
            {totalExercises > 0 ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/15">
                <DumbbellIcon className="size-4 text-sun" aria-hidden />
                <dd>
                  {totalExercises}{" "}
                  {totalExercises === 1 ? "ejercicio" : "ejercicios"}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-white/65">
              <span>
                {completedLessons} de {totalLessons} lecciones completadas
              </span>
              <span className="tabular-nums text-white">{percent}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-white/15"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso del curso"
              data-testid="course-progress-bar"
            >
              <div
                className="h-full rounded-full bg-sun transition-all duration-500"
                style={{ width: `${percent}%` }}
                data-testid="course-progress-fill"
              />
            </div>
          </div>

          {next ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                nativeButton={false}
                className="rounded-full bg-sun text-ink hover:bg-sun/90"
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
                className="min-w-0 text-sm text-white/65 transition-colors hover:text-white"
                data-testid="course-hero-topic-link"
              >
                <span className="font-semibold text-white">
                  Tema {next.moduleNumber}
                </span>{" "}
                — {stripLessonNumber(next.lesson.title)}
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
