import Link from "next/link";
import { BookOpenIcon, CheckIcon, ChevronRightIcon, DumbbellIcon, MapPinIcon } from "lucide-react";
import { getModuleProgress } from "@/lib/curriculum/course-progress";
import { isModuleAccessible, sortModules } from "@/lib/curriculum/course-navigation";
import { topicHref } from "@/lib/navigation/learning-trail";
import type { ModuleSummary } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

type CourseTopicPickerProps = {
  courseSlug: string;
  modules: ModuleSummary[];
  /** Tema donde el alumno debería seguir; se marca como «Estás aquí». */
  currentModuleId?: string | null;
};

type TopicStatus = "completed" | "started" | "pending" | "soon";

function topicStatus(courseModule: ModuleSummary): TopicStatus {
  if (!isModuleAccessible(courseModule)) {
    return "soon";
  }
  const { total, completed } = getModuleProgress(courseModule);
  if (total > 0 && completed === total) {
    return "completed";
  }
  if (courseModule.lessons.some((lesson) => lesson.pathStatus !== "not_started")) {
    return "started";
  }
  return "pending";
}

const STATUS_LABEL: Record<TopicStatus, string> = {
  completed: "Completado",
  started: "En curso",
  pending: "Sin empezar",
  soon: "Próximamente",
};

const STATUS_CHIP: Record<TopicStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  started: "bg-cobalt-tint text-cobalt ring-cobalt/20",
  pending: "bg-slate-50 text-slate-500 ring-slate-200",
  soon: "bg-slate-50 text-slate-400 ring-slate-200",
};

export function CourseTopicPicker({ courseSlug, modules, currentModuleId }: CourseTopicPickerProps) {
  const sorted = sortModules(modules);

  return (
    <nav className="space-y-4" aria-label="Temario del curso" data-testid="course-topic-picker">
      <header className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">Temario</h2>
          <p className="text-sm text-ink-muted">
            Elige un tema para ver sus lecciones y ejercicios de refuerzo.
          </p>
        </div>
      </header>

      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {sorted.map((courseModule, index) => {
          const { total, completed, percent } = getModuleProgress(courseModule);
          const exerciseCount = courseModule.topicExercises?.length ?? 0;
          const status = topicStatus(courseModule);
          const isAvailable = status !== "soon";
          const isCurrent = isAvailable && courseModule.id === currentModuleId;
          const number = index + 1;

          const inner = (
            <>
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold tabular-nums transition-colors",
                  status === "completed"
                    ? "bg-emerald-500 text-white"
                    : isCurrent
                      ? "bg-cobalt text-white shadow-md shadow-cobalt/25"
                      : isAvailable
                        ? "bg-cobalt-tint text-cobalt group-hover:bg-cobalt group-hover:text-white"
                        : "bg-slate-100 text-slate-400",
                )}
                aria-hidden
              >
                {status === "completed" ? <CheckIcon className="size-5" /> : String(number).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                      STATUS_CHIP[status],
                    )}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cobalt">
                      <MapPinIcon className="size-3" aria-hidden />
                      Estás aquí
                    </span>
                  ) : null}
                </div>
                <h3 className="font-semibold leading-snug text-ink group-hover:text-cobalt">
                  <span className="sr-only">Tema {number}: </span>
                  {courseModule.title}
                </h3>

                {isAvailable ? (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                    {total > 0 ? (
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpenIcon className="size-3.5" aria-hidden />
                        {completed}/{total} {total === 1 ? "lección" : "lecciones"}
                      </span>
                    ) : null}
                    {exerciseCount > 0 ? (
                      <span className="inline-flex items-center gap-1.5">
                        <DumbbellIcon className="size-3.5" aria-hidden />
                        {exerciseCount} {exerciseCount === 1 ? "ejercicio" : "ejercicios"}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-xs text-ink-muted">Estamos preparando este tema.</p>
                )}

                {total > 0 ? (
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
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
                ) : null}
              </div>

              {isAvailable ? (
                <ChevronRightIcon
                  className="size-5 shrink-0 self-center text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                  aria-hidden
                />
              ) : null}
            </>
          );

          const cardClassName = cn(
            "flex h-full items-start gap-4 rounded-2xl border bg-paper-raised p-4 shadow-xs",
            isCurrent ? "border-cobalt/40 ring-2 ring-cobalt/10" : "border-border",
            !isAvailable && "opacity-70",
          );

          return (
            <li key={courseModule.id}>
              {isAvailable ? (
                <Link
                  href={topicHref(courseSlug, courseModule.slug)}
                  data-testid={`topic-link-${courseModule.id}`}
                  aria-current={isCurrent ? "step" : undefined}
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
      </ol>
    </nav>
  );
}
