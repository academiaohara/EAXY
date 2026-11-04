import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChevronDownIcon,
  LayersIcon,
} from "lucide-react";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";
import {
  getCourseVariantLabel,
  groupCoursesByLevel,
} from "@/lib/navigation/course-levels";
import { courseHref } from "@/lib/navigation/learning-trail";
import { SUBJECT_THEME, type SubjectKey } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

type CourseLevelCatalogProps = {
  courses: CourseCatalogEntry[];
  subject: SubjectKey;
};

function CourseMeta({ course }: { course: CourseCatalogEntry }) {
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-ink-muted">
      <span className="inline-flex items-center gap-1">
        <LayersIcon className="size-3.5" aria-hidden />
        {course.moduleCount} {course.moduleCount === 1 ? "tema" : "temas"}
      </span>
      <span className="inline-flex items-center gap-1">
        <BookOpenIcon className="size-3.5" aria-hidden />
        {course.lessonCount}{" "}
        {course.lessonCount === 1 ? "lección" : "lecciones"}
      </span>
    </span>
  );
}

export function CourseLevelCatalog({
  courses,
  subject,
}: CourseLevelCatalogProps) {
  const groups = groupCoursesByLevel(courses);
  const theme = SUBJECT_THEME[subject];

  return (
    <section
      className="space-y-8"
      data-testid="course-catalog"
      aria-label="Cursos por año"
    >
      {(["ESO", "Bachillerato", "Otros"] as const).map((stage) => {
        const stageGroups = groups.filter((group) => group.stage === stage);
        if (stageGroups.length === 0) {
          return null;
        }

        return (
          <div key={stage} className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.15em] text-ink-muted">
              {stage}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stageGroups.map((group) => {
                const onlyCourse =
                  group.courses.length === 1 ? group.courses[0] : null;
                const hasAvailable = group.courses.some(
                  (course) => course.lessonCount > 0,
                );
                const shell = cn(
                  "relative overflow-hidden rounded-[1.6rem] border bg-paper-raised shadow-[0_16px_42px_-32px_rgb(25_58_50/0.5)]",
                  hasAvailable
                    ? cn("border-border", theme.hoverBorder)
                    : "border-dashed border-border",
                );

                if (onlyCourse && onlyCourse.lessonCount > 0) {
                  return (
                    <Link
                      id={group.key}
                      key={group.key}
                      href={courseHref(onlyCourse.slug)}
                      data-testid={`course-link-${onlyCourse.id}`}
                      className={cn(
                        shell,
                        "group flex min-h-48 flex-col justify-between p-5 outline-none transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cobalt/35",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={cn(
                            "flex size-14 items-center justify-center rounded-2xl font-display text-lg font-extrabold",
                            theme.badge,
                          )}
                        >
                          {group.label.split(" ")[0]}
                        </span>
                        <span
                          className={cn(
                            "flex size-9 items-center justify-center rounded-full transition group-hover:bg-ink group-hover:text-white",
                            theme.badge,
                          )}
                        >
                          <ArrowRightIcon className="size-4" aria-hidden />
                        </span>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                          {group.label}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                          {onlyCourse.description}
                        </p>
                        <div className="mt-4">
                          <CourseMeta course={onlyCourse} />
                        </div>
                      </div>
                    </Link>
                  );
                }

                if (!hasAvailable) {
                  return (
                    <article
                      id={group.key}
                      key={group.key}
                      data-testid={`course-level-${group.key}`}
                      className={cn(
                        shell,
                        "flex min-h-48 flex-col justify-between p-5 opacity-75",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-paper font-display text-lg font-extrabold text-ink-muted">
                          {group.label.split(" ")[0]}
                        </span>
                        <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-bold text-ink-muted">
                          Próximamente
                        </span>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                          {group.label}
                        </h3>
                        {group.courses.length > 1 ? (
                          <p className="mt-1 text-sm text-ink-muted">
                            Sus itinerarios estarán disponibles más adelante.
                          </p>
                        ) : null}
                      </div>
                    </article>
                  );
                }

                return (
                  <details
                    id={group.key}
                    key={group.key}
                    data-testid={`course-level-${group.key}`}
                    className={cn(
                      shell,
                      "group/details md:col-span-2 xl:col-span-3",
                    )}
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt/35 [&::-webkit-details-marker]:hidden">
                      <span
                        className={cn(
                          "flex size-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold",
                          theme.badge,
                        )}
                      >
                        {group.label.split(" ")[0]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-2xl font-extrabold tracking-tight text-ink">
                          {group.label}
                        </span>
                        <span className="mt-1 block text-sm text-ink-muted">
                          Elige tu itinerario para continuar
                        </span>
                      </span>
                      <ChevronDownIcon
                        className="size-5 shrink-0 text-ink-muted transition-transform group-open/details:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="grid gap-3 border-t border-border bg-paper/55 p-4 md:grid-cols-2">
                      {group.courses.map((course) => {
                        const label = getCourseVariantLabel(course.title);
                        if (course.lessonCount === 0) {
                          return (
                            <div
                              key={course.id}
                              className="rounded-2xl border border-dashed border-border bg-paper-raised/70 p-4 opacity-70"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="font-display text-lg font-extrabold text-ink">
                                  {label}
                                </h3>
                                <span className="text-[11px] font-bold text-ink-muted">
                                  Próximamente
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <Link
                            key={course.id}
                            href={courseHref(course.slug)}
                            data-testid={`course-link-${course.id}`}
                            className="group/variant rounded-2xl border border-border bg-paper-raised p-4 outline-none transition hover:border-ink/25 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-cobalt/35"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-display text-lg font-extrabold text-ink">
                                  {label}
                                </h3>
                                {course.description ? (
                                  <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                                    {course.description}
                                  </p>
                                ) : null}
                              </div>
                              <ArrowRightIcon
                                className="mt-1 size-4 shrink-0 text-ink-muted transition-transform group-hover/variant:translate-x-0.5 group-hover/variant:text-ink"
                                aria-hidden
                              />
                            </div>
                            <div className="mt-4">
                              <CourseMeta course={course} />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
