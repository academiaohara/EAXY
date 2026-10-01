import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, LayersIcon } from "lucide-react";
import { courseHref, courseShortTitle } from "@/lib/navigation/learning-trail";
import { cn } from "@/lib/utils";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";

type CourseCatalogViewProps = {
  courses: CourseCatalogEntry[];
};

const LEVEL_ACCENTS = [
  "from-sky-500 to-cobalt",
  "from-cobalt to-violet-500",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
] as const;

function lessonCountLabel(count: number): string {
  return count === 1 ? "1 lección" : `${count} lecciones`;
}

function stageOf(title: string): "ESO" | "Bachillerato" {
  return /bachillerato/i.test(title) ? "Bachillerato" : "ESO";
}

function CourseCard({ course, accent }: { course: CourseCatalogEntry; accent: string }) {
  const hasLessons = course.lessonCount > 0;
  const shortTitle = courseShortTitle(course.title);
  const [level] = shortTitle.split(" ");

  return (
    <Link
      href={courseHref(course.id)}
      data-testid={`course-link-${course.id}`}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-paper-raised p-5 shadow-xs outline-none transition-all focus-visible:ring-2 focus-visible:ring-cobalt/40",
        hasLessons
          ? "border-border hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-lg hover:shadow-cobalt/5"
          : "border-dashed border-border bg-paper-raised/60",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl font-display text-base font-extrabold text-white shadow-sm",
            hasLessons ? cn("bg-gradient-to-br", accent) : "bg-slate-200 text-slate-500 shadow-none",
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
        <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-cobalt">
          {course.title}
        </h3>
        {course.description ? (
          <p className="text-sm leading-relaxed text-ink-muted">{course.description}</p>
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

export function CourseCatalogView({ courses }: CourseCatalogViewProps) {
  const stages = (["ESO", "Bachillerato"] as const)
    .map((stage) => ({
      stage,
      courses: courses.filter((course) => stageOf(course.title) === stage),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <section className="space-y-6" data-testid="course-catalog">
      <header className="space-y-1">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">Todos los cursos</h2>
        <p className="text-sm text-ink-muted">
          Entra en un curso para ver su temario y elegir por dónde empezar.
        </p>
      </header>

      {stages.map((group) => (
        <div key={group.stage} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
            {group.stage}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                accent={LEVEL_ACCENTS[courses.indexOf(course) % LEVEL_ACCENTS.length]}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
