import Link from "next/link";
import { ChevronRightIcon, GraduationCapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";

type CourseCatalogViewProps = {
  courses: CourseCatalogEntry[];
};

function lessonCountLabel(count: number): string {
  if (count === 0) {
    return "Próximamente";
  }
  return count === 1 ? "1 lección" : `${count} lecciones`;
}

function courseShortTitle(title: string): string {
  return title.replace(/^Matemáticas\s+/i, "");
}

export function CourseCatalogView({ courses }: CourseCatalogViewProps) {
  return (
    <div className="space-y-5" data-testid="course-catalog">
      <header className="space-y-2">
        <h2 className="font-heading text-xl font-medium">Niveles</h2>
        <p className="text-sm text-muted-foreground">
          Elige tu curso. Iremos añadiendo temas y lecciones en cada nivel.
        </p>
      </header>

      <div className="grid gap-3">
        {courses.map((course) => {
          const hasLessons = course.lessonCount > 0;

          return (
            <Link
              key={course.id}
              href={`/aprender/curso/${course.id}`}
              data-testid={`course-link-${course.id}`}
              className="group block"
            >
              <Card
                className={`overflow-hidden transition-all hover:shadow-md ${
                  hasLessons
                    ? "border-border hover:border-cobalt/40"
                    : "border-border/70 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-stretch">
                  <div
                    className={`flex w-16 shrink-0 flex-col items-center justify-center gap-1 px-2 text-center transition-colors ${
                      hasLessons
                        ? "bg-cobalt-tint/60 text-cobalt group-hover:bg-cobalt group-hover:text-white"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <GraduationCapIcon className="size-5" aria-hidden />
                    <span className="text-[10px] font-semibold uppercase leading-tight tracking-wide">
                      {courseShortTitle(course.title)}
                    </span>
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-4 p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">{course.title}</h3>
                      {course.description ? (
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant={hasLessons ? "default" : "outline"}>
                        {lessonCountLabel(course.lessonCount)}
                      </Badge>
                      <ChevronRightIcon
                        className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
