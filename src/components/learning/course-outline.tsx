import Link from "next/link";
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

export function CourseOutlineView({ outline, backHref = "/aprender" }: CourseOutlineProps) {
  const hasContent = outline.modules.some((module) => module.lessons.length > 0);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8" data-testid="course-outline">
      <header className="space-y-3">
        <Link
          href={backHref}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Volver a niveles
        </Link>
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            {outline.course.title}
          </h1>
          {outline.course.description ? (
            <p className="text-muted-foreground">{outline.course.description}</p>
          ) : null}
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
            <h2 className="font-heading text-xl font-medium">{module.title}</h2>

            {module.lessons.length === 0 ? (
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Sin lecciones todavía en este tema.</p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={resolveLessonHref(lesson.id)}
                    data-testid={`lesson-link-${lesson.id}`}
                  >
                    <Card className="p-4 transition-colors hover:bg-paper-raised">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lessonMetaLabel(lesson)}</p>
                        </div>
                        <Badge variant={lessonStatusVariant(lesson.pathStatus)}>
                          {lessonStatusLabel(lesson.pathStatus)}
                        </Badge>
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
