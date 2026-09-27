"use client";

import { useState } from "react";
import { DumbbellIcon, FileTextIcon, PlayCircleIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TopicExerciseSummary } from "@/lib/curriculum/types";

type TopicExercisesSectionProps = {
  moduleTitle: string;
  exercises: TopicExerciseSummary[];
};

type TopicExerciseModalView = "enunciado" | "escrita" | "video";

export function TopicExercisesSection({ moduleTitle, exercises }: TopicExercisesSectionProps) {
  const [selectedExercise, setSelectedExercise] = useState<TopicExerciseSummary | null>(null);
  const [modalView, setModalView] = useState<TopicExerciseModalView>("enunciado");

  if (exercises.length === 0) {
    return null;
  }

  const openExercise = (exercise: TopicExerciseSummary) => {
    setSelectedExercise(exercise);
    setModalView("enunciado");
  };

  const closeExercise = () => {
    setSelectedExercise(null);
    setModalView("enunciado");
  };

  return (
    <>
      <section
        className="space-y-3 rounded-2xl border border-slate-200 bg-white/60 p-4 sm:p-5 lg:min-w-0"
        data-testid="topic-exercises"
      >
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-ink sm:text-base">
            <DumbbellIcon className="size-4 shrink-0 text-cobalt" aria-hidden />
            Ejercicios del tema
          </h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Refuerzo de {moduleTitle}: abre cada ejercicio para ver el enunciado y la resolución.
          </p>
        </div>

        <div className="grid gap-2">
          {exercises.map((exercise, index) => (
            <button
              key={exercise.id}
              type="button"
              className="w-full text-left"
              onClick={() => openExercise(exercise)}
              data-testid={`topic-exercise-${exercise.id}`}
            >
              <Card className="border-slate-200 p-3 shadow-none transition-all hover:border-cobalt/40 hover:shadow-sm sm:p-3.5">
                <p className="text-[11px] text-muted-foreground">Ejercicio {index + 1}</p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-ink">{exercise.title}</p>
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
          className="flex max-h-[min(90vh,48rem)] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl lg:max-w-4xl"
          data-testid="topic-exercise-dialog"
        >
          {selectedExercise ? (
            <>
              <DialogHeader className="gap-1 border-b border-slate-200 px-6 py-5">
                <DialogTitle className="text-lg">{selectedExercise.title}</DialogTitle>
                <DialogDescription>Enunciado y resolución del ejercicio</DialogDescription>
              </DialogHeader>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                <p className="text-sm leading-relaxed text-ink">
                  <MathRenderer text={selectedExercise.statement} />
                </p>

                {modalView === "escrita" ? (
                  <div className="mt-6 space-y-2 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Resolución escrita
                    </p>
                    <p className="text-sm leading-relaxed text-ink">
                      <MathRenderer text={selectedExercise.solutionText} />
                    </p>
                  </div>
                ) : null}

                {modalView === "video" ? (
                  <div className="mt-6 space-y-2 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Vídeo de resolución
                    </p>
                    <div className="overflow-hidden rounded-xl bg-black">
                      <div className="aspect-video w-full">
                        <iframe
                          src={selectedExercise.solutionVideoUrl}
                          title={`Resolución: ${selectedExercise.title}`}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <DialogFooter className="flex-row flex-wrap gap-2 border-t border-slate-200 bg-muted/30 px-6 py-4 sm:justify-start">
                <Button
                  type="button"
                  variant={modalView === "escrita" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setModalView("escrita")}
                  data-testid="topic-exercise-view-written"
                >
                  <FileTextIcon data-icon="inline-start" className="size-4" />
                  Resolución escrita
                </Button>
                <Button
                  type="button"
                  variant={modalView === "video" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setModalView("video")}
                  data-testid="topic-exercise-view-video"
                >
                  <PlayCircleIcon data-icon="inline-start" className="size-4" />
                  Ver vídeo
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
