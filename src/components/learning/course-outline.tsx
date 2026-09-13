import Link from "next/link";
import { LessonStatusBadge } from "@/components/learning/lesson-status-badge";
import type { CourseOutline } from "@/lib/content/types";

type CourseOutlineProps = {
  course: CourseOutline;
};

export function CourseOutlinePanel({ course }: CourseOutlineProps) {
  return (
    <div className="space-y-8" data-testid="course-outline">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{course.title}</h1>
        {course.description && (
          <p className="text-muted-foreground">{course.description}</p>
        )}
        <p className="text-sm text-muted-foreground" data-testid="course-progress-summary">
          {course.completedLessons} de {course.totalLessons} lecciones completadas
        </p>
      </header>

      {course.modules.map((module) => (
        <section key={module.id} className="space-y-3">
          <h2 className="font-heading text-xl font-medium">{module.title}</h2>
          <ul className="space-y-2">
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/curso/${lesson.id}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-paper-raised px-4 py-3 transition-colors hover:border-cobalt/40 hover:bg-cobalt-tint/20"
                  data-testid={`course-lesson-link-${lesson.orderIndex}`}
                >
                  <span className="font-medium text-ink">{lesson.title}</span>
                  <LessonStatusBadge status={lesson.progressStatus} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
