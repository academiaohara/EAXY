import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, DumbbellIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getModuleProgress } from "@/lib/curriculum/course-progress";
import type { ModuleSummary } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

type CourseTopicPickerProps = {
  courseId: string;
  modules: ModuleSummary[];
};

function lessonCountLabel(count: number): string {
  return count === 1 ? "1 lección" : `${count} lecciones`;
}

export function CourseTopicPicker({ courseId, modules }: CourseTopicPickerProps) {
  const sorted = [...modules].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <nav className="space-y-4" aria-label="Elegir tema" data-testid="course-topic-picker">
      <header className="space-y-1">
        <h2 className="font-heading text-xl font-semibold text-ink">Elegir tema</h2>
        <p className="text-sm text-muted-foreground">
          Selecciona un tema para ver sus lecciones y ejercicios de refuerzo.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {sorted.map((courseModule, index) => {
          const { total, completed, percent } = getModuleProgress(courseModule);
          const exerciseCount = courseModule.topicExercises?.length ?? 0;
          const hasLessons = total > 0;
          const hasExercises = exerciseCount > 0;
          const isAvailable = hasLessons || hasExercises;

          const cardClassName = cn(
            "flex h-full flex-col gap-3 rounded-2xl border bg-paper-raised p-4 shadow-sm",
            isAvailable
              ? "border-slate-200"
              : "border-slate-200/70 opacity-75",
          );

          const inner = (
            <>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">
                      Tema {index + 1}
                    </p>
                    <h3 className="font-medium leading-snug text-ink group-hover:text-cobalt">
                      {courseModule.title}
                    </h3>
                  </div>
                  {isAvailable ? (
                    <ArrowRightIcon
                      className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                      aria-hidden
                    />
                  ) : (
                    <Badge variant="outline" className="shrink-0">
                      Pronto
                    </Badge>
                  )}
                </div>

                {isAvailable ? (
                  <>
                    <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {hasLessons ? (
                        <div className="flex items-center gap-1.5">
                          <BookOpenIcon className="size-3.5 text-cobalt" aria-hidden />
                          <dd>{lessonCountLabel(total)}</dd>
                        </div>
                      ) : null}
                      {hasExercises ? (
                        <div className="flex items-center gap-1.5">
                          <DumbbellIcon className="size-3.5 text-cobalt" aria-hidden />
                          <dd>
                            {exerciseCount}{" "}
                            {exerciseCount === 1 ? "ejercicio" : "ejercicios"}
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    {hasLessons ? (
                      <div className="mt-auto space-y-1">
                        <div
                          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Progreso en ${courseModule.title}`}
                        >
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <p className="text-[11px] font-medium tabular-nums text-muted-foreground">
                          {completed}/{total} lecciones
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Estamos preparando el contenido de este tema.
                  </p>
                )}
            </>
          );

          return (
            <li key={courseModule.id}>
              {isAvailable ? (
                <Link
                  href={`/aprender/curso/${courseId}/tema/${courseModule.id}`}
                  data-testid={`topic-link-${courseModule.id}`}
                  className={cn(
                    cardClassName,
                    "group outline-none transition-all hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40",
                  )}
                >
                  {inner}
                </Link>
              ) : (
                <div className={cardClassName} data-testid={`topic-link-${courseModule.id}`}>
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
