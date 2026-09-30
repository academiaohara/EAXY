"use client";

import { useState } from "react";
import { Caveat } from "next/font/google";
import {
  DumbbellIcon,
  EyeIcon,
  EyeOffIcon,
  PencilLineIcon,
  PlayCircleIcon,
  XIcon,
} from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TopicExerciseSummary } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

type TopicExercisesSectionProps = {
  moduleTitle: string;
  exercises: TopicExerciseSummary[];
  /** Ancho completo bajo las lecciones (grid de tarjetas). Por defecto, compacto. */
  layout?: "compact" | "full";
};

function splitSolutionSteps(solutionText: string): string[] {
  return solutionText
    .split("\n")
    .map((step) => step.trim())
    .filter(Boolean);
}

export function TopicExercisesSection({
  moduleTitle,
  exercises,
  layout = "compact",
}: TopicExercisesSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  if (exercises.length === 0) {
    return null;
  }

  const selectedExercise =
    selectedIndex !== null ? exercises[selectedIndex] : null;

  const openExercise = (index: number) => {
    setSelectedIndex(index);
    setShowVideo(false);
    setSolutionRevealed(false);
  };

  const closeExercise = () => {
    setSelectedIndex(null);
    setShowVideo(false);
    setSolutionRevealed(false);
  };

  return (
    <>
      <section
        id="topic-exercises"
        className={cn(
          "scroll-mt-6 space-y-4",
          layout === "full"
            ? "rounded-2xl border border-slate-200 bg-paper-raised/40 p-4 sm:p-6"
            : "space-y-3 rounded-2xl border border-slate-200 bg-white/60 p-4 sm:p-5 lg:min-w-0",
        )}
        data-testid="topic-exercises"
      >
        <div className="space-y-1">
          {layout === "full" ? (
            <h2 className="flex flex-wrap items-center gap-2 font-heading text-lg font-semibold text-ink">
              <DumbbellIcon className="size-5 shrink-0 text-cobalt" aria-hidden />
              Ejercicios del tema
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                {exercises.length}
              </span>
            </h2>
          ) : (
            <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-ink sm:text-base">
              <DumbbellIcon className="size-4 shrink-0 text-cobalt" aria-hidden />
              Ejercicios del tema
            </h3>
          )}
          <p className="text-sm text-muted-foreground">
            Refuerzo de {moduleTitle}: abre cada ejercicio para ver el enunciado
            y la resolución.
          </p>
        </div>

        <div
          className={cn(
            "grid gap-2",
            layout === "full" && "gap-3 sm:grid-cols-2 xl:grid-cols-3",
          )}
        >
          {exercises.map((exercise, index) => (
            <button
              key={exercise.id}
              type="button"
              className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40 focus-visible:ring-offset-2"
              onClick={() => openExercise(index)}
              data-testid={`topic-exercise-${exercise.id}`}
            >
              <Card className="h-full border-slate-200 p-3 shadow-none transition-all group-hover:-translate-y-0.5 group-hover:border-cobalt/40 group-hover:shadow-sm sm:p-3.5">
                <p className="text-[11px] font-medium tabular-nums text-muted-foreground">
                  Ejercicio {index + 1}
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-ink group-hover:text-cobalt">
                  {exercise.title}
                </p>
              </Card>
            </button>
          ))}
        </div>
      </section>

      <Dialog
        open={selectedExercise !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeExercise();
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex h-[min(88vh,52rem)] w-[min(68rem,calc(100vw-2rem))] max-w-none flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-none"
          data-testid="topic-exercise-dialog"
        >
          {selectedExercise && selectedIndex !== null ? (
            <>
              <DialogHeader className="flex-row items-center justify-between gap-4 border-b border-slate-200 bg-paper-raised px-5 py-4 sm:px-8 sm:py-5">
                <div className="min-w-0 space-y-1">
                  <DialogDescription className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                    Ejercicio {selectedIndex + 1} · {moduleTitle}
                  </DialogDescription>
                  <DialogTitle className="truncate text-xl font-semibold leading-tight sm:text-2xl">
                    {selectedExercise.title}
                  </DialogTitle>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    type="button"
                    variant={showVideo ? "default" : "outline"}
                    onClick={() => setShowVideo((value) => !value)}
                    aria-pressed={showVideo}
                    data-testid="topic-exercise-view-video"
                  >
                    <PlayCircleIcon
                      data-icon="inline-start"
                      className="size-4"
                    />
                    {showVideo ? "Ocultar vídeo" : "Ver vídeo"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={closeExercise}
                    aria-label="Cerrar"
                  >
                    <XIcon className="size-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto bg-paper px-5 py-6 sm:px-8 sm:py-7">
                <section
                  className="relative shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-paper-raised px-5 py-5 shadow-[0_1px_0_rgba(23,26,33,0.04)] sm:px-7 sm:py-6"
                  data-testid="topic-exercise-statement"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-cobalt"
                    aria-hidden
                  />
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Enunciado
                  </p>
                  <p className="text-base leading-8 text-ink sm:text-[1.0625rem] [&_.katex]:text-[1.08em]">
                    <MathRenderer text={selectedExercise.statement} />
                  </p>
                </section>

                {showVideo ? (
                  <section
                    className="shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-black shadow-sm"
                    data-testid="topic-exercise-video"
                  >
                    <div className="aspect-video w-full">
                      <iframe
                        src={selectedExercise.solutionVideoUrl}
                        title={`Resolución: ${selectedExercise.title}`}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </section>
                ) : null}

                <section
                  className="flex min-h-[18rem] flex-[1_0_auto] flex-col"
                  data-testid="topic-exercise-solution"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <PencilLineIcon className="size-3.5" aria-hidden />
                      Resolución
                    </p>
                    {solutionRevealed ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSolutionRevealed(false)}
                        data-testid="topic-exercise-hide-solution"
                      >
                        <EyeOffIcon
                          data-icon="inline-start"
                          className="size-4"
                        />
                        Ocultar
                      </Button>
                    ) : null}
                  </div>

                  <div className="relative flex flex-[1_0_auto] overflow-hidden rounded-xl border border-[#e6dcc4] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                    <HandwrittenSolution
                      steps={splitSolutionSteps(selectedExercise.solutionText)}
                      hidden={!solutionRevealed}
                    />

                    {!solutionRevealed ? (
                      <button
                        type="button"
                        onClick={() => setSolutionRevealed(true)}
                        className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper/30 text-ink outline-none transition-colors hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-cobalt"
                        data-testid="topic-exercise-view-written"
                      >
                        <span className="flex size-14 items-center justify-center rounded-full bg-paper-raised text-cobalt shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-105">
                          <EyeIcon className="size-6" aria-hidden />
                        </span>
                        <span className="rounded-full bg-paper-raised/90 px-4 py-1.5 text-sm font-medium shadow-sm ring-1 ring-slate-200">
                          Ver resolución
                        </span>
                        <span className="text-xs text-ink-muted">
                          Inténtalo tú primero
                        </span>
                      </button>
                    ) : null}
                  </div>
                </section>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

type HandwrittenSolutionProps = {
  steps: string[];
  hidden: boolean;
};

function HandwrittenSolution({ steps, hidden }: HandwrittenSolutionProps) {
  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={cn(
        "relative w-full bg-[#fdfaf1] py-6 pr-6 pl-14 transition-[filter] duration-300 sm:pr-10 sm:pl-20",
        "bg-[linear-gradient(rgba(47,95,224,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(47,95,224,0.09)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]",
        hidden && "pointer-events-none blur-[7px] select-none",
      )}
      data-testid="topic-exercise-handwritten"
    >
      <span
        className="absolute inset-y-0 left-9 w-px bg-[#e8a3a3] sm:left-14"
        aria-hidden
      />
      <ol
        className={cn(
          handwriting.className,
          "space-y-3 text-[1.55rem] leading-[2.5rem] text-[#1f3a8a]",
        )}
      >
        {steps.map((step, index) => (
          <li
            key={`${index}-${step}`}
            className="relative [&_.katex]:text-[0.64em]"
          >
            <span className="absolute -left-10 top-0 text-[1.3rem] text-[#c0392b]/80 sm:-left-14">
              {index + 1})
            </span>
            <MathRenderer text={step} />
          </li>
        ))}
      </ol>
    </div>
  );
}
