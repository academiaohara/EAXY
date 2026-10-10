import {
  findNextLesson,
  getModuleProgress,
} from "@/lib/curriculum/course-progress";
import { LessonPathNode } from "@/components/learning/lesson-path-node";
import type { ModuleSummary } from "@/lib/curriculum/types";

type LearningPathProps = {
  modules: ModuleSummary[];
  /** Suma al índice del tema mostrado (p. ej. 3 si esta vista es el tema 4 del curso). */
  moduleNumberOffset?: number;
  /** Oculta la cabecera del tema (p. ej. cuando la página del tema ya la muestra). */
  hideModuleHeaders?: boolean;
};

function ModuleLessonList({ courseModule }: { courseModule: ModuleSummary }) {
  const nextLessonId = findNextLesson([courseModule])?.lesson.id;

  return (
    <ol className="relative min-w-0 space-y-3">
      {courseModule.lessons.map((lesson, index) => (
        <LessonPathNode
          key={lesson.id}
          lesson={lesson}
          position={index + 1}
          isLast={index === courseModule.lessons.length - 1}
          isNextTarget={lesson.id === nextLessonId}
        />
      ))}
    </ol>
  );
}

function ModuleProgressPill({ courseModule }: { courseModule: ModuleSummary }) {
  const { total, completed, percent } = getModuleProgress(courseModule);

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-cobalt transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium tabular-nums text-muted-foreground">
        {completed}/{total}
      </span>
    </div>
  );
}

export function LearningPath({
  modules,
  moduleNumberOffset = 0,
  hideModuleHeaders = false,
}: LearningPathProps) {
  return (
    <div className="space-y-10" data-testid="learning-path">
      {modules.map((courseModule, moduleIndex) => (
        <section
          key={courseModule.id}
          className="space-y-4"
          data-testid={`module-${courseModule.id}`}
          id={`module-${courseModule.id}`}
        >
          {hideModuleHeaders ? (
            <div className="flex justify-end">
              <ModuleProgressPill courseModule={courseModule} />
            </div>
          ) : (
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">
                  Tema {moduleIndex + 1 + moduleNumberOffset}
                </p>
                <h2 className="font-heading text-xl font-semibold text-ink">{courseModule.title}</h2>
              </div>
              <ModuleProgressPill courseModule={courseModule} />
            </div>
          )}

          {courseModule.lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin lecciones todavía en este tema.</p>
          ) : (
            <ModuleLessonList courseModule={courseModule} />
          )}
        </section>
      ))}
    </div>
  );
}
