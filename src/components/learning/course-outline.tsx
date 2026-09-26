import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { CourseHero } from "@/components/learning/course-hero";
import { CourseNextStep } from "@/components/learning/course-next-step";
import { LearningPath } from "@/components/learning/learning-path";
import { Card } from "@/components/ui/card";
import { findNextLesson } from "@/lib/curriculum/course-progress";
import type { CourseOutline } from "@/lib/curriculum/types";

type CourseOutlineProps = {
  outline: CourseOutline;
  backHref?: string;
};

export function CourseOutlineView({ outline, backHref = "/aprender" }: CourseOutlineProps) {
  const hasContent = outline.modules.some((module) => module.lessons.length > 0);
  const next = findNextLesson(outline.modules);

  return (
    <div className="flex w-full flex-col gap-6" data-testid="course-outline">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cobalt"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Volver a niveles
      </Link>

      {!hasContent ? (
        <Card className="p-6 text-center" data-testid="course-empty-state">
          <p className="font-medium">Contenido próximamente</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Estamos preparando las lecciones de este nivel. Vuelve pronto.
          </p>
        </Card>
      ) : (
        <>
          <CourseHero course={outline.course} modules={outline.modules} />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
            {next ? (
              <aside className="min-w-0 lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1 lg:self-start">
                <CourseNextStep next={next} />
              </aside>
            ) : null}

            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <LearningPath modules={outline.modules} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
