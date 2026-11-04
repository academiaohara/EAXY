import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { SUBJECT_ICONS } from "@/components/layout/subject-icons";
import type { CurriculumCourse } from "@/content/types";
import { groupCoursesByLevel } from "@/lib/navigation/course-levels";
import { SUBJECTS, SUBJECT_THEME, subjectOfCourse } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

type HomeCourseExplorerProps = {
  courses: readonly CurriculumCourse[];
};

export function HomeCourseExplorer({ courses }: HomeCourseExplorerProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2" data-testid="home-course-explorer">
      {SUBJECTS.map((subject) => {
        const Icon = SUBJECT_ICONS[subject.key];
        const theme = SUBJECT_THEME[subject.key];
        const ownCourses = courses.filter((course) => subjectOfCourse(course) === subject.key);
        const levels = groupCoursesByLevel(ownCourses);

        return (
          <article
            key={subject.key}
            className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-paper-raised p-5 shadow-[0_18px_45px_-34px_rgb(25_58_50/0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-32px_rgb(25_58_50/0.5)]"
            data-testid={`home-subject-${subject.key}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={cn("flex size-11 items-center justify-center rounded-2xl", theme.badge)}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
                    {subject.label}
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-muted">{subject.tagline}</p>
                </div>
              </div>
              <Link
                href={subject.href}
                aria-label={`Ver ${subject.label}`}
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-offset-2",
                  theme.badge,
                  theme.ring,
                )}
              >
                <ArrowUpRightIcon className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {levels.map((level) => (
                <Link
                  key={level.key}
                  href={`${subject.href}#${level.key}`}
                  className="rounded-full border border-border bg-paper px-3 py-1.5 text-xs font-bold text-ink-muted outline-none transition hover:border-ink/25 hover:bg-cobalt-tint hover:text-ink focus-visible:ring-2 focus-visible:ring-cobalt/30"
                >
                  {level.label}
                </Link>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
