import Link from "next/link";
import { LessonStatusBadge } from "@/components/curriculum/lesson-status-badge";
import type { CourseOutline } from "@/lib/curriculum/types";

type CourseOutlineViewProps = {
  outline: CourseOutline;
};

export function CourseOutlineView({ outline }: CourseOutlineViewProps) {
  return (
    <div className="space-y-6" data-testid="course-outline">
      {outline.modules.map((module) => (
        <section key={module.id} className="space-y-3">
          <h2 className="font-heading text-xl font-semibold tracking-tight">{module.title}</h2>
          <ul className="space-y-2">
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/curso/${outline.course.id}/leccion/${lesson.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-paper-raised px-4 py-3 transition-colors hover:border-cobalt/40"
                  data-testid="lesson-link"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.conceptCount} concepto{lesson.conceptCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <LessonStatusBadge status={lesson.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
