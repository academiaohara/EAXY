import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, GraduationCapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";

type CourseCatalogViewProps = {
  courses: CourseCatalogEntry[];
};

function lessonCountLabel(count: number): string {
  return count === 1 ? "1 lección" : `${count} lecciones`;
}

function courseShortTitle(title: string): string {
  return title.replace(/^Matemáticas\s+/i, "");
}

export function CourseCatalogView({ courses }: CourseCatalogViewProps) {
  return (
    <section className="space-y-4" data-testid="course-catalog">
      <header className="space-y-1">
        <h2 className="font-heading text-xl font-semibold text-ink">Niveles</h2>
        <p className="text-sm text-muted-foreground">
          Elige tu curso. Iremos añadiendo temas y lecciones en cada nivel.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {courses.map((course) => {
          const hasLessons = course.lessonCount > 0;

          return (
            <Link
              key={course.id}
              href={`/aprender/curso/${course.id}`}
              data-testid={`course-link-${course.id}`}
              className={cn(
                "group flex flex-col gap-3 rounded-2xl border bg-paper-raised p-4 shadow-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-cobalt/40",
                hasLessons
                  ? "border-slate-200 hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md"
                  : "border-slate-200/70 opacity-75 hover:opacity-100",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-11 shrink-0 flex-col items-center justify-center rounded-xl text-center text-[10px] font-bold uppercase leading-none tracking-wide transition-colors",
                    hasLessons
                      ? "bg-cobalt-tint text-cobalt group-hover:bg-cobalt group-hover:text-white"
                      : "bg-slate-100 text-slate-400",
                  )}
                  aria-hidden
                >
                  <GraduationCapIcon className="mb-0.5 size-4" />
                  {courseShortTitle(course.title).split(" ")[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium leading-snug text-ink group-hover:text-cobalt">
                    {course.title}
                  </h3>
                  {hasLessons ? (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BookOpenIcon className="size-3.5" aria-hidden />
                      {lessonCountLabel(course.lessonCount)}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Próximamente</p>
                  )}
                </div>
                {hasLessons ? (
                  <ArrowRightIcon
                    className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                    aria-hidden
                  />
                ) : (
                  <Badge variant="outline" className="shrink-0">
                    Pronto
                  </Badge>
                )}
              </div>

              {course.description ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
