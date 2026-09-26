import Link from "next/link";
import { CourseInfoCard } from "@/components/learning/course-info-card";
import { LearningPath } from "@/components/learning/learning-path";
import { Card } from "@/components/ui/card";
import type { CourseOutline } from "@/lib/curriculum/types";

type CourseOutlineProps = {
  outline: CourseOutline;
  backHref?: string;
};

export function CourseOutlineView({ outline, backHref = "/aprender" }: CourseOutlineProps) {
  const hasContent = outline.modules.some((module) => module.lessons.length > 0);

  return (
    <div className="flex w-full flex-col gap-8" data-testid="course-outline">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-cobalt"
      >
        ← Volver a niveles
      </Link>

      {!hasContent ? (
        <Card className="p-6 text-center" data-testid="course-empty-state">
          <p className="font-medium">Contenido próximamente</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Estamos preparando las lecciones de este nivel. Vuelve pronto.
          </p>
        </Card>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-12">
          <CourseInfoCard course={outline.course} modules={outline.modules} />
          <LearningPath modules={outline.modules} />
        </div>
      )}
    </div>
  );
}
