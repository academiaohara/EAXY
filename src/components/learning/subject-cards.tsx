import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SUBJECT_ICONS } from "@/components/layout/subject-icons";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";
import { SUBJECTS, SUBJECT_THEME, subjectOfCourse } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

type SubjectCardsProps = {
  courses: CourseCatalogEntry[];
};

export function SubjectCards({ courses }: SubjectCardsProps) {
  return (
    <section className="space-y-4" data-testid="subject-cards" aria-labelledby="materias-title">
      <header className="space-y-1">
        <h2 id="materias-title" className="font-display text-xl font-bold tracking-tight text-ink">
          Tus materias
        </h2>
        <p className="text-sm text-ink-muted">Elige una materia para ver sus cursos y temarios.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SUBJECTS.map((subject) => {
          const theme = SUBJECT_THEME[subject.key];
          const Icon = SUBJECT_ICONS[subject.key];
          const own = courses.filter((course) => subjectOfCourse(course) === subject.key);
          const available = own.filter((course) => course.lessonCount > 0);
          const lessons = available.reduce((sum, course) => sum + course.lessonCount, 0);

          return (
            <Link
              key={subject.key}
              href={subject.href}
              data-testid={`subject-card-${subject.key}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-paper-raised shadow-xs outline-none transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cobalt/40"
            >
              <div
                className={cn(
                  "relative flex h-28 items-end justify-between overflow-hidden bg-gradient-to-br p-5 text-white",
                  theme.gradient,
                )}
              >
                <span
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-[7rem] font-medium leading-none text-white/15"
                  aria-hidden
                >
                  {subject.glyph}
                </span>
                <span className="relative flex size-11 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
                  <Icon className="size-5" aria-hidden />
                </span>
                {available.length === 0 ? (
                  <span className="relative rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
                    Próximamente
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-ink">{subject.label}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{subject.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-1">
                  <p className="text-xs font-medium text-ink-muted">
                    {available.length > 0
                      ? `${available.length} ${available.length === 1 ? "curso" : "cursos"} · ${lessons} ${lessons === 1 ? "lección" : "lecciones"}`
                      : `${own.length} cursos en preparación`}
                  </p>
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full transition-colors group-hover:bg-ink group-hover:text-white",
                      theme.badge,
                    )}
                  >
                    <ArrowRightIcon className="size-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
