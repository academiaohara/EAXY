"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopicExercisesSection } from "@/components/learning/topic-exercises-section";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import { cn } from "@/lib/utils";
import type { LessonSummary, ModuleSummary } from "@/lib/curriculum/types";

type LearningPathProps = {
  modules: ModuleSummary[];
};

function pickDefaultLesson(modules: ModuleSummary[]): LessonSummary | null {
  for (const courseModule of modules) {
    const started = courseModule.lessons.find((lesson) => lesson.pathStatus === "started");
    if (started) {
      return started;
    }
    const pending = courseModule.lessons.find((lesson) => lesson.pathStatus !== "completed");
    if (pending) {
      return pending;
    }
  }

  const firstModule = modules[0];
  return firstModule?.lessons[0] ?? null;
}

function lessonStatus(lesson: LessonSummary): "completed" | "active" | "available" | "locked" {
  if (lesson.pathStatus === "completed") {
    return "completed";
  }
  if (lesson.pathStatus === "started") {
    return "active";
  }
  return "available";
}

type PathNodeProps = {
  lesson: LessonSummary;
  status: ReturnType<typeof lessonStatus>;
  isSelected: boolean;
  isLast: boolean;
  onSelect: () => void;
};

function PathNode({ lesson, status, isSelected, isLast, onSelect }: PathNodeProps) {
  const isInteractive = lesson.kind === "interactive";
  const isLocked = status === "locked";

  return (
    <div className="relative flex items-start gap-4">
      {!isLast ? (
        <div
          className="absolute left-6 top-12 h-[calc(100%-0.5rem)] w-0.5 -translate-x-1/2 bg-slate-200"
          aria-hidden
        />
      ) : null}

      <button
        type="button"
        onClick={onSelect}
        disabled={isLocked}
        className={cn(
          "relative z-10 flex shrink-0 flex-col items-center outline-none",
          isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
        aria-pressed={isSelected}
        aria-label={lesson.title}
      >
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full border-[3px] transition-all sm:size-14",
            status === "completed" && "border-cobalt bg-cobalt text-white",
            status === "active" &&
              "border-cobalt bg-white shadow-[0_0_0_4px_rgba(47,95,224,0.15)]",
            status === "available" && "border-slate-200 bg-white hover:border-cobalt/50",
            isSelected && status !== "locked" && "ring-2 ring-cobalt/30 ring-offset-2",
          )}
        >
          {status === "completed" ? (
            <CheckIcon className="size-5" strokeWidth={3} />
          ) : isInteractive ? (
            <SparklesIcon
              className={cn("size-5", status === "active" ? "text-emerald-500" : "text-cobalt")}
            />
          ) : (
            <span className="text-xs font-bold text-cobalt">Ej</span>
          )}
        </div>
      </button>

      <div className="min-w-0 flex-1 pb-10 pt-2">
        <p
          className={cn(
            "font-medium leading-snug",
            isLocked ? "text-slate-400" : "text-ink",
            isSelected && !isLocked && "font-semibold text-cobalt",
          )}
        >
          {lesson.title.replace(/^\d+\.\s*/, "")}
        </p>
        <p className="text-xs text-muted-foreground">
          {lesson.kind === "interactive"
            ? lesson.stepCount
              ? `${lesson.stepCount} pasos`
              : "Lección interactiva"
            : `${lesson.exerciseCount} ejercicios`}
        </p>
      </div>
    </div>
  );
}

export function LearningPath({ modules }: LearningPathProps) {
  const defaultLesson = useMemo(() => pickDefaultLesson(modules), [modules]);
  const [selectedId, setSelectedId] = useState<string | null>(() => defaultLesson?.id ?? null);

  const selectedLesson =
    modules.flatMap((m) => m.lessons).find((l) => l.id === selectedId) ?? defaultLesson;

  return (
    <div className="space-y-10" data-testid="learning-path">
      {modules.map((module, moduleIndex) => (
        <section key={module.id} data-testid={`module-${module.id}`}>
          <div className="mb-6 inline-flex flex-col rounded-xl border-2 border-cobalt/30 bg-white px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cobalt">
              Nivel {moduleIndex + 1}
            </span>
            <span className="font-heading text-lg font-semibold text-ink">{module.title}</span>
          </div>

          {module.lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin lecciones todavía en este tema.</p>
          ) : (
            <div className="pl-1">
              {module.lessons.map((lesson, index) => (
                <PathNode
                  key={lesson.id}
                  lesson={lesson}
                  status={lessonStatus(lesson)}
                  isSelected={selectedId === lesson.id}
                  isLast={index === module.lessons.length - 1}
                  onSelect={() => setSelectedId(lesson.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-6">
            <TopicExercisesSection
              moduleTitle={module.title}
              exercises={module.topicExercises}
            />
          </div>
        </section>
      ))}

      {selectedLesson ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <p className="text-sm text-muted-foreground">Siguiente paso</p>
          <h3 className="mt-1 font-heading text-xl font-semibold text-ink">
            {selectedLesson.title.replace(/^\d+\.\s*/, "")}
          </h3>
          <Button
            nativeButton={false}
            className="mt-4 w-full rounded-full py-6 text-base font-semibold sm:w-auto sm:min-w-[160px]"
            render={<Link href={resolveLessonHref(selectedLesson.id)} />}
            data-testid={`lesson-link-${selectedLesson.id}`}
          >
            {selectedLesson.pathStatus === "completed" ? "Repasar" : "Empezar"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
