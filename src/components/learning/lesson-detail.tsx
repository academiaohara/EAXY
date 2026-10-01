import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  countCompletedExercises,
} from "@/lib/learning-paths/completion";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import {
  formatMasteryPercent,
  getMasteryState,
  MASTERY_STATE_LABELS,
} from "@/lib/mastery/states";
import type { LessonDetail } from "@/lib/curriculum/types";

type LessonDetailViewProps = {
  lesson: LessonDetail;
};

export function LessonDetailView({ lesson }: LessonDetailViewProps) {
  const completedExercises = countCompletedExercises(
    lesson.exercises.map((exercise) => ({
      exerciseId: exercise.id,
      hasCorrectAttempt: exercise.hasCorrectAttempt,
    })),
  );

  if (lesson.kind === "interactive" && lesson.interactiveSlug) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8" data-testid="lesson-detail">
        <header className="space-y-3">
          <Link
            href="/aprender"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Volver a niveles
          </Link>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {lesson.courseTitle} · {lesson.moduleTitle}
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          </div>
        </header>

        <Card className="space-y-4 p-6">
          <Badge>Lección interactiva</Badge>
          <p className="text-sm text-muted-foreground">
            {lesson.stepCount
              ? `Recorrido guiado de ${lesson.stepCount} pasos con teoría, preguntas y feedback inmediato.`
              : "Recorrido guiado con teoría, preguntas y feedback inmediato."}
          </p>
          <Button nativeButton={false} render={<Link href={resolveLessonHref(lesson.id)} />}>
            Iniciar lección
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8" data-testid="lesson-detail">
      <header className="space-y-3">
        <Link
          href="/aprender"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Volver al curso
        </Link>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {lesson.courseTitle} · {lesson.moduleTitle}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Progreso: {completedExercises} de {lesson.exerciseCount} ejercicios completados
        </p>
      </header>

      {lesson.concepts.length > 0 ? (
        <section className="space-y-3" data-testid="lesson-concepts">
          <h2 className="font-heading text-lg font-medium">Conceptos</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {lesson.concepts.map((concept) => {
              const state = getMasteryState(concept.mastery, concept.attemptCount);
              return (
                <Card key={concept.id} className="p-3">
                  <p className="font-medium">{concept.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {MASTERY_STATE_LABELS[state]} · {formatMasteryPercent(concept.mastery)}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="space-y-3" data-testid="lesson-exercises">
        <h2 className="font-heading text-lg font-medium">Ejercicios</h2>
        <div className="grid gap-3">
          {lesson.exercises.map((exercise, index) => (
            <Card
              key={exercise.id}
              className={cn(
                "p-4 transition-colors",
                exercise.hasCorrectAttempt &&
                  "border-emerald-300/80 bg-emerald-50/50 ring-1 ring-emerald-200/60",
              )}
              data-testid={`lesson-exercise-${exercise.id}`}
              data-completed={exercise.hasCorrectAttempt ? "true" : "false"}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Ejercicio {index + 1}</p>
                  <p className="font-medium">{exercise.questionPreview}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Dificultad {exercise.difficulty}</Badge>
                    {exercise.hasCorrectAttempt ? (
                      <Badge className="gap-1 bg-emerald-600 text-white hover:bg-emerald-600">
                        <CheckCircle2Icon className="size-3" aria-hidden />
                        Completado
                      </Badge>
                    ) : exercise.attemptCount > 0 ? (
                      <Badge variant="secondary">En progreso</Badge>
                    ) : null}
                  </div>
                </div>
                <Button
                  nativeButton={false}
                  render={<Link href={`/aprender/ejercicio/${exercise.id}`} />}
                >
                  {exercise.hasCorrectAttempt ? "Repasar" : "Practicar"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
