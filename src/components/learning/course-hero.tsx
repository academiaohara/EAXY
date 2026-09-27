import { BookOpenIcon, DumbbellIcon, LayersIcon } from "lucide-react";
import { CourseMathEmblem } from "@/components/learning/course-math-emblem";
import { getCourseProgress } from "@/lib/curriculum/course-progress";
import type { CourseSummary, ModuleSummary } from "@/lib/curriculum/types";

type CourseHeroProps = {
  course: CourseSummary;
  modules: ModuleSummary[];
};

export function CourseHero({ course, modules }: CourseHeroProps) {
  const { totalLessons, completedLessons, totalExercises, percent } = getCourseProgress(modules);

  return (
    <section
      className="overflow-hidden rounded-3xl border border-slate-200 bg-paper-raised shadow-sm"
      data-testid="course-hero"
    >
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div className="space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">Curso</p>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {course.title}
            </h1>
            {course.description ? (
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {course.description}
              </p>
            ) : null}
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <LayersIcon className="size-4 text-cobalt" aria-hidden />
              <dd>
                {modules.length} {modules.length === 1 ? "tema" : "temas"}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <BookOpenIcon className="size-4 text-cobalt" aria-hidden />
              <dd>
                {totalLessons} {totalLessons === 1 ? "lección" : "lecciones"}
              </dd>
            </div>
            {totalExercises > 0 ? (
              <div className="flex items-center gap-2">
                <DumbbellIcon className="size-4 text-cobalt" aria-hidden />
                <dd>
                  {totalExercises} {totalExercises === 1 ? "ejercicio" : "ejercicios"}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="max-w-md space-y-1.5">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso del curso"
              data-testid="course-progress-bar"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cobalt to-emerald-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              {completedLessons} de {totalLessons} lecciones completadas
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <CourseMathEmblem />
        </div>
      </div>
    </section>
  );
}
