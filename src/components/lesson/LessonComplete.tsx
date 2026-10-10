"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";

type IncompleteStep = {
  index: number;
  title: string;
};

type LessonCompleteProps = {
  lessonTitle: string;
  courseHref: string;
  onRestart: () => void;
  incompleteSteps?: IncompleteStep[];
  onJumpToStep?: (index: number) => void;
};

export function LessonComplete({
  lessonTitle,
  courseHref,
  onRestart,
  incompleteSteps = [],
  onJumpToStep,
}: LessonCompleteProps) {
  const allDone = incompleteSteps.length === 0;

  return (
    <div
      className="flex h-full min-h-0 w-full items-center justify-center p-4 sm:p-8"
      data-testid="lesson-complete"
    >
      <div
        className={cn(
          "w-full max-w-2xl overflow-hidden rounded-3xl border-2 bg-paper-raised shadow-lg",
          allDone
            ? "border-emerald-200 shadow-emerald-100/50"
            : "border-amber-200 shadow-amber-100/50",
        )}
      >
        <div
          className={cn(
            "relative bg-gradient-to-b px-8 pt-10 text-center",
            allDone ? "from-emerald-50 to-white" : "from-amber-50 to-white",
          )}
        >
          <div className="relative mx-auto size-24">
            <TutorMascot
              mood={allDone ? "celebrate" : "idle"}
              size={96}
              label={
                allDone
                  ? "El tutor celebra que has completado la lección"
                  : "El tutor te anima a repasar lo que falta"
              }
            />
          </div>
        </div>

        <div className="space-y-6 px-8 pb-10 pt-6 text-center">
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
              {allDone ? "¡Lección completada!" : "Has recorrido la lección"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {allDone
                ? `Has terminado «${lessonTitle}».`
                : `Quedan tramos sin marcar en verde en «${lessonTitle}». Puedes volver cuando quieras.`}
            </p>
          </div>

          {!allDone && onJumpToStep ? (
            <ul className="mx-auto max-w-md space-y-2 text-left text-sm">
              {incompleteSteps.map((step) => (
                <li key={step.index}>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2.5 text-left font-medium text-amber-950 transition hover:bg-amber-100"
                    onClick={() => onJumpToStep(step.index)}
                  >
                    Ir al paso {step.index + 1}: {step.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-full py-6 sm:py-3"
              onClick={onRestart}
            >
              Repetir lección
            </Button>
            <Button
              nativeButton={false}
              className="rounded-full py-6 sm:py-3 sm:min-w-[12rem]"
              render={<Link href={courseHref} />}
            >
              Volver al tema
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
