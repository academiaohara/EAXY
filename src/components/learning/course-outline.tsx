"use client";

import { useMemo } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CourseHero } from "@/components/learning/course-hero";
import { CourseTopicPicker } from "@/components/learning/course-topic-picker";
import { Card } from "@/components/ui/card";
import { findDefaultModuleId, sortModules } from "@/lib/curriculum/course-navigation";
import { findNextLesson } from "@/lib/curriculum/course-progress";
import { applyLocalProgressToModules } from "@/lib/local-progress/storage";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import { buildLearningTrail } from "@/lib/navigation/learning-trail";
import type { CourseOutline } from "@/lib/curriculum/types";

type CourseOutlineProps = {
  outline: CourseOutline;
  /** Si false, no mezcla progreso del navegador (usuario con sesión). */
  mergeLocalProgress?: boolean;
};

export function CourseOutlineView({ outline, mergeLocalProgress = true }: CourseOutlineProps) {
  const localStore = useLocalProgress();
  const modules = useMemo(() => {
    const sorted = sortModules(outline.modules);
    return mergeLocalProgress ? applyLocalProgressToModules(sorted, localStore) : sorted;
  }, [mergeLocalProgress, localStore, outline.modules]);

  const hasContent = modules.some(
    (module) => module.lessons.length > 0 || (module.topicExercises?.length ?? 0) > 0,
  );
  const hasModules = modules.length > 0;
  const currentModuleId = findNextLesson(modules)?.module.id ?? findDefaultModuleId(modules);

  return (
    <div className="flex w-full flex-col gap-6" data-testid="course-outline">
      <Breadcrumbs items={buildLearningTrail({ course: outline.course })} />

      {!hasModules ? (
        <>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
            {outline.course.title}
          </h1>
          <Card className="p-6 text-center" data-testid="course-empty-state">
            <p className="font-medium">Contenido próximamente</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Estamos preparando las lecciones de este nivel. Vuelve pronto.
            </p>
          </Card>
        </>
      ) : (
        <>
          <CourseHero course={outline.course} modules={modules} />

          {hasContent ? (
            <CourseTopicPicker
              courseSlug={outline.course.slug}
              modules={modules}
              currentModuleId={currentModuleId}
            />
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
