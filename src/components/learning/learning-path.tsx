import Link from "next/link";
import { CheckIcon, ChevronRightIcon, DumbbellIcon, SparklesIcon } from "lucide-react";
import {
  findNextLesson,
  getLessonProgressStatus,
  getModuleProgress,
  type LessonProgressStatus,
} from "@/lib/curriculum/course-progress";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import { cn } from "@/lib/utils";
import type { LessonSummary, ModuleSummary } from "@/lib/curriculum/types";

type LearningPathProps = {
  modules: ModuleSummary[];
  /** Suma al índice del tema mostrado (p. ej. 3 si esta vista es el tema 4 del curso). */
  moduleNumberOffset?: number;
  /** Oculta la cabecera del tema (p. ej. cuando la página del tema ya la muestra). */
  hideModuleHeaders?: boolean;
};

const STATUS_LABELS: Record<LessonProgressStatus, string> = {
  completed: "Completada",
  started: "En curso",
  available: "Disponible",
};

const STATUS_CHIP_STYLES: Record<LessonProgressStatus, string> = {
  completed: "bg-white/20 text-white",
  started: "bg-cobalt-tint text-cobalt",
  available: "bg-slate-100 text-slate-500",
};

function lessonMetaLabel(lesson: LessonSummary): string {
  if (lesson.kind === "interactive") {
    return lesson.stepCount ? `${lesson.stepCount} pasos guiados` : "Lección guiada";
  }
  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

type PathNodeProps = {
  lesson: LessonSummary;
  position: number;
  isLast: boolean;
  isNextTarget: boolean;
};

function PathNode({ lesson, position, isLast, isNextTarget }: PathNodeProps) {
  const status = getLessonProgressStatus(lesson);
  const isInteractive = lesson.kind === "interactive";
  const isCurrent =
    status === "started" || (isNextTarget && status !== "completed");
  const connectorBrand = status === "completed";

  return (
    <li className="relative">
      {!isLast ? (
        <span
          className={cn(
            "pointer-events-none absolute left-[2.125rem] top-full h-3 w-0.5 -translate-x-1/2 sm:left-[2.5rem]",
            connectorBrand ? "bg-cobalt" : "bg-slate-300",
          )}
          aria-hidden
        />
      ) : null}

      <Link
        href={resolveLessonHref(lesson.id)}
        data-testid={`lesson-link-${lesson.id}`}
        className={cn(
          "group flex items-center gap-4 rounded-2xl border bg-paper-raised p-3 shadow-sm outline-none transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 sm:p-4",
          status === "completed" &&
            "border-cobalt bg-cobalt hover:border-cobalt/90 hover:bg-cobalt/95 focus-visible:ring-cobalt/50",
          status !== "completed" &&
            isCurrent &&
            "border-cobalt/40 hover:border-cobalt/55 focus-visible:ring-cobalt/40",
          status !== "completed" &&
            !isCurrent &&
            "border-slate-200 hover:border-cobalt/40 focus-visible:ring-cobalt/40",
        )}
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] transition-colors sm:size-12",
            status === "completed" && "border-white/90 bg-white/15 text-white",
            status !== "completed" &&
              isCurrent &&
              "border-cobalt bg-white text-cobalt shadow-[0_0_0_4px_rgba(47,95,224,0.12)]",
            status !== "completed" &&
              !isCurrent &&
              "border-slate-200 bg-white text-slate-400 group-hover:border-cobalt/50 group-hover:text-cobalt",
          )}
          aria-hidden
        >
          {status === "completed" ? (
            <CheckIcon className="size-5" strokeWidth={3} />
          ) : isInteractive ? (
            <SparklesIcon className="size-5" />
          ) : (
            <DumbbellIcon className="size-5" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "text-[11px] font-semibold tabular-nums",
                status === "completed" ? "text-cobalt-tint" : "text-slate-400",
              )}
            >
              {String(position).padStart(2, "0")}
            </span>
            {status !== "available" ? (
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  STATUS_CHIP_STYLES[status],
                )}
              >
                {STATUS_LABELS[status]}
              </span>
            ) : null}
          </span>
          <span
            className={cn(
              "mt-0.5 block font-medium leading-snug",
              status === "completed"
                ? "text-white"
                : "text-ink group-hover:text-cobalt",
            )}
          >
            {lesson.title.replace(/^\d+\.\s*/, "")}
          </span>
          <span
            className={cn(
              "block text-xs",
              status === "completed" ? "text-white/80" : "text-muted-foreground",
            )}
          >
            {lessonMetaLabel(lesson)}
          </span>
        </span>

        <ChevronRightIcon
          className={cn(
            "size-5 shrink-0 transition-transform group-hover:translate-x-0.5",
            status === "completed"
              ? "text-white/70 group-hover:text-white"
              : "text-slate-300 group-hover:text-cobalt",
          )}
          aria-hidden
        />
      </Link>
    </li>
  );
}

function ModuleLessonList({ courseModule }: { courseModule: ModuleSummary }) {
  const nextLessonId = findNextLesson([courseModule])?.lesson.id;

  return (
    <ol className="min-w-0 space-y-3">
      {courseModule.lessons.map((lesson, index) => (
        <PathNode
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
