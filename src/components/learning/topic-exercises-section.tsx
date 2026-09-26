"use client";

import { useState } from "react";
import { FileTextIcon, PlayCircleIcon } from "lucide-react";
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

type TopicExercisesSectionProps = {
  moduleTitle: string;
  exercises: TopicExerciseSummary[];
};

export function TopicExercisesSection({ moduleTitle, exercises }: TopicExercisesSectionProps) {
  const [statementExercise, setStatementExercise] = useState<TopicExerciseSummary | null>(null);
  const [videoExercise, setVideoExercise] = useState<TopicExerciseSummary | null>(null);

  if (exercises.length === 0) {
    return null;
  }

  return (
    <>
      <section className="space-y-3" data-testid="topic-exercises">
        <div className="space-y-1">
          <h2 className="font-heading text-lg font-medium">Ejercicios del tema</h2>
          <p className="text-sm text-muted-foreground">
            Refuerzo de {moduleTitle}: consulta el enunciado y, cuando lo necesites, la resolución
            en vídeo.
          </p>
        </div>

        <div className="grid gap-3">
          {exercises.map((exercise, index) => (
            <Card key={exercise.id} className="p-4" data-testid={`topic-exercise-${exercise.id}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Ejercicio {index + 1}</p>
                  <p className="font-medium">{exercise.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setStatementExercise(exercise)}
                    data-testid={`topic-exercise-statement-${exercise.id}`}
                  >
                    <FileTextIcon data-icon="inline-start" className="size-4" />
                    Ver enunciado
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setVideoExercise(exercise)}
                    data-testid={`topic-exercise-video-${exercise.id}`}
                  >
                    <PlayCircleIcon data-icon="inline-start" className="size-4" />
                    Ver resolución
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Dialog
        open={statementExercise !== null}
        onOpenChange={(open) => {
          if (!open) {
            setStatementExercise(null);
          }
        }}
      >
        <DialogContent className="max-w-lg" data-testid="topic-exercise-statement-dialog">
          {statementExercise ? (
            <>
              <DialogHeader>
                <DialogTitle>{statementExercise.title}</DialogTitle>
                <DialogDescription>Enunciado del ejercicio</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-ink">
                <MathRenderer text={statementExercise.statement} />
              </p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={videoExercise !== null}
        onOpenChange={(open) => {
          if (!open) {
            setVideoExercise(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl p-0" data-testid="topic-exercise-video-dialog">
          {videoExercise ? (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle>{videoExercise.title}</DialogTitle>
                <DialogDescription>Vídeo de resolución</DialogDescription>
              </DialogHeader>
              <div className="aspect-video w-full overflow-hidden bg-black">
                <iframe
                  src={videoExercise.solutionVideoUrl}
                  title={`Resolución: ${videoExercise.title}`}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
