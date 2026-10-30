import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, LayersIcon } from "lucide-react";
import {
  courseCardTitle,
  courseHref,
  courseLevelLabel,
} from "@/lib/navigation/learning-trail";
import { cn } from "@/lib/utils";
import {
  SUBJECT_THEME,
  stageOfCourse,
  type SubjectKey,
} from "@/lib/navigation/subjects";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";

type CourseCatalogViewProps = {
  courses: CourseCatalogEntry[];
  subject: SubjectKey;
};

function lessonCountLabel(count: number): string {
  return count === 1 ? "1 lección" : `${count} lecciones`;
}

function CourseCard({
  course,
  subject,
}: {
  course: CourseCatalogEntry;
  subject: SubjectKey;
}) {
  const theme = SUBJECT_THEME[subject];
  const hasLessons = course.lessonCount > 0;
  const level = courseLevelLabel(course.title);
  const displayTitle = courseCardTitle(course.title);

  return (
    <Link
      href={courseHref(course.slug)}
      data-testid={`course-link-${course.id}`}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-paper-raised p-5 shadow-xs outline-none transition-all focus-visible:ring-2 focus-visible:ring-cobalt/40",
        hasLessons
          ? cn(
              "border-border hover:-translate-y-0.5 hover:shadow-lg",
              theme.hoverBorder,
            )
          : "border-dashed border-border bg-paper-raised/60",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold text-white shadow-sm",
            hasLessons
              ? cn("bg-gradient-to-br", theme.gradient)
              : "bg-slate-200 text-slate-500 shadow-none",
          )}
          aria-hidden
        >
          {level}
        </span>
        {hasLessons ? (
          <span className="flex size-8 items-center justify-center rounded-full bg-paper text-slate-400 transition-colors group-hover:bg-cobalt group-hover:text-white">
            <ArrowRightIcon className="size-4" aria-hidden />
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            Próximamente
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3
          className="font-display text-xl font-bold leading-tight text-ink group-hover:text-cobalt"
          title={displayTitle === course.title ? undefined : course.title}
        >
          {displayTitle}
        </h3>
        {course.description ? (
          <p className="text-sm leading-relaxed text-ink-muted">
            {course.description}
          </p>
        ) : null}
      </div>

      {hasLessons ? (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <LayersIcon className="size-3.5" aria-hidden />
            {course.moduleCount} {course.moduleCount === 1 ? "tema" : "temas"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpenIcon className="size-3.5" aria-hidden />
            {lessonCountLabel(course.lessonCount)}
          </span>
        </div>
      ) : null}
    </Link>
  );
}

export function CourseCatalogView({
  courses,
  subject,
}: CourseCatalogViewProps) {
  const stages = (["ESO", "Bachillerato"] as const)
    .map((stage) => ({
      stage,
      courses: courses.filter(
        (course) => stageOfCourse(course.title) === stage,
      ),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <section className="space-y-8" data-testid="course-catalog">
      {stages.map((group) => (
        <div key={group.stage} className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
            {group.stage}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.courses.map((course) => (
              <CourseCard key={course.id} course={course} subject={subject} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
