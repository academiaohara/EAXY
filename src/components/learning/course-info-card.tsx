import { BookOpenIcon, DumbbellIcon } from "lucide-react";
import type { CourseSummary, ModuleSummary } from "@/lib/curriculum/types";

type CourseInfoCardProps = {
  course: CourseSummary;
  modules: ModuleSummary[];
};

function countLessons(modules: ModuleSummary[]): number {
  return modules.reduce((sum, module) => sum + module.lessons.length, 0);
}

function countExercises(modules: ModuleSummary[]): number {
  return modules.reduce(
    (sum, module) =>
      sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.exerciseCount, 0),
    0,
  );
}

export function CourseInfoCard({ course, modules }: CourseInfoCardProps) {
  const lessonCount = countLessons(modules);
  const exerciseCount = countExercises(modules);

  return (
    <aside
      className="rounded-2xl border border-slate-200 bg-paper-raised p-6 shadow-sm lg:sticky lg:top-8"
      data-testid="course-info-card"
    >
      <div className="mx-auto mb-5 flex h-28 w-full max-w-[200px] items-end justify-center rounded-xl bg-gradient-to-b from-cobalt-tint to-white">
        <div className="relative flex items-end gap-1 pb-2">
          <div className="h-10 w-14 rounded-t-lg bg-slate-700" />
          <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 gap-0.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="size-4 rounded-sm bg-cobalt shadow-sm" />
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 h-6 w-10 -translate-x-1/2 rounded bg-slate-200 text-center text-[10px] leading-6 text-slate-600">
            ∑x
          </div>
        </div>
      </div>

      <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink">
        {course.title}
      </h1>
      {course.description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
      ) : null}

      <dl className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="size-4 text-cobalt" aria-hidden />
          <dd>
            {lessonCount} {lessonCount === 1 ? "lección" : "lecciones"}
          </dd>
        </div>
        {exerciseCount > 0 ? (
          <div className="flex items-center gap-2">
            <DumbbellIcon className="size-4 text-cobalt" aria-hidden />
            <dd>
              {exerciseCount} {exerciseCount === 1 ? "ejercicio" : "ejercicios"}
            </dd>
          </div>
        ) : null}
      </dl>
    </aside>
  );
}
