import Link from "next/link";
import type { CourseOutline } from "@/lib/content/types";

type CourseOutlineProps = {
  course: CourseOutline;
};

function statusLabel(status: CourseOutline["modules"][number]["lessons"][number]["status"]) {
  switch (status) {
    case "completed":
      return "Completada";
    case "started":
      return "En progreso";
    default:
      return "Sin empezar";
  }
}

export function CourseOutlineView({ course }: CourseOutlineProps) {
  return (
    <div className="space-y-8" data-testid="course-outline">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{course.title}</h1>
        {course.description && <p className="text-muted-foreground">{course.description}</p>}
      </header>

      {course.modules.map((module) => (
        <section key={module.id} className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">{module.title}</h2>
          <ul className="grid gap-3">
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/aprender/curso/${lesson.id}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-paper-raised px-4 py-3 transition-colors hover:border-cobalt/40 hover:bg-cobalt-tint/20"
                  data-testid="course-lesson-link"
                >
                  <div>
                    <p className="font-medium text-ink">{lesson.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.conceptCount} concepto{lesson.conceptCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground" data-testid="lesson-status-badge">
                    {statusLabel(lesson.status)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
