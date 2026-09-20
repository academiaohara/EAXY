import Link from "next/link";
import { BookOpenIcon, ChevronRightIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import type { CourseOutline, LessonSummary } from "@/lib/curriculum/types";

type CourseOutlineProps = {
  outline: CourseOutline;
  backHref?: string;
};

function lessonStatusLabel(status: LessonSummary["pathStatus"]): string {
  switch (status) {
    case "completed":
      return "Completada";
    case "started":
      return "En curso";
    default:
      return "Pendiente";
  }
}

function lessonStatusVariant(
  status: LessonSummary["pathStatus"],
): "default" | "secondary" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "started":
      return "secondary";
    default:
      return "outline";
  }
}

function lessonMetaLabel(lesson: LessonSummary): string {
  if (lesson.kind === "interactive") {
    return lesson.stepCount
      ? `Lección interactiva · ${lesson.stepCount} pasos`
      : "Lección interactiva";
  }

  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

function lessonOrderNumber(title: string, fallback: number): string {
  const match = title.match(/^(\d+)\./);
  return match?.[1] ?? String(fallback);
}

export function CourseOutlineView({ outline, backHref = "/aprender" }: CourseOutlineProps) {
  const hasContent = outline.modules.some((module) => module.lessons.length > 0);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8" data-testid="course-outline">
      <header className="space-y-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-cobalt"
        >
          ← Volver a niveles
        </Link>

        <div className="overflow-hidden rounded-2xl border border-border bg-paper-raised shadow-sm">
          <div className="border-b border-border/60 bg-gradient-to-br from-cobalt-tint/80 via-paper-raised to-paper-raised px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cobalt/10 text-cobalt">
                <BookOpenIcon className="size-5" aria-hidden />
              </div>
              <div className="space-y-1">
                <h1 className="font-heading text-3xl font-semibold tracking-tight">
                  {outline.course.title}
                </h1>
                {outline.course.description ? (
                  <p className="text-muted-foreground">{outline.course.description}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {!hasContent ? (
        <Card className="p-6 text-center" data-testid="course-empty-state">
          <p className="font-medium">Contenido próximamente</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Estamos preparando las lecciones de este nivel. Vuelve pronto.
          </p>
        </Card>
      ) : (
        outline.modules.map((module) => (
          <section key={module.id} className="space-y-4" data-testid={`module-${module.id}`}>
            <div className="flex items-center gap-2 border-l-4 border-cobalt pl-3">
              <h2 className="font-heading text-xl font-medium">{module.title}</h2>
            </div>

            {module.lessons.length === 0 ? (
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Sin lecciones todavía en este tema.</p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {module.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={resolveLessonHref(lesson.id)}
                    data-testid={`lesson-link-${lesson.id}`}
                    className="group block"
                  >
                    <Card className="overflow-hidden border-border transition-all hover:border-cobalt/40 hover:shadow-md">
                      <div className="flex items-stretch">
                        <div className="flex w-14 shrink-0 items-center justify-center bg-cobalt-tint/50 text-lg font-semibold text-cobalt transition-colors group-hover:bg-cobalt group-hover:text-white">
                          {lessonOrderNumber(lesson.title, index + 1)}
                        </div>
                        <div className="flex flex-1 items-start justify-between gap-4 p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {lesson.kind === "interactive" ? (
                                <SparklesIcon className="size-4 shrink-0 text-cobalt" aria-hidden />
                              ) : null}
                              <h3 className="font-medium leading-snug">{lesson.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{lessonMetaLabel(lesson)}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <Badge variant={lessonStatusVariant(lesson.pathStatus)}>
                              {lessonStatusLabel(lesson.pathStatus)}
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
                ))}
              </div>
            )}
          </section>
        ))
      )}
    </div>
  );
}
