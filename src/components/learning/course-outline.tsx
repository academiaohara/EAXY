import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { CourseHero } from "@/components/learning/course-hero";
import { CourseTopicPicker } from "@/components/learning/course-topic-picker";
import { Card } from "@/components/ui/card";
import type { CourseOutline } from "@/lib/curriculum/types";

type CourseOutlineProps = {
  outline: CourseOutline;
  backHref?: string;
};

export function CourseOutlineView({ outline, backHref = "/aprender" }: CourseOutlineProps) {
  const hasContent = outline.modules.some(
    (module) => module.lessons.length > 0 || (module.topicExercises?.length ?? 0) > 0,
  );
  const hasModules = outline.modules.length > 0;

  return (
    <div className="flex w-full flex-col gap-6" data-testid="course-outline">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cobalt"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Volver a niveles
      </Link>

      {!hasModules ? (
        <Card className="p-6 text-center" data-testid="course-empty-state">
          <p className="font-medium">Contenido próximamente</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Estamos preparando las lecciones de este nivel. Vuelve pronto.
          </p>
        </Card>
      ) : (
        <>
          <CourseHero course={outline.course} modules={outline.modules} />

          {hasContent ? (
            <CourseTopicPicker courseId={outline.course.id} modules={outline.modules} />
          ) : (
            <Card className="p-6 text-center" data-testid="course-empty-state">
              <p className="font-medium">Temas en preparación</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Los temas de este nivel aparecerán aquí cuando estén listos.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
