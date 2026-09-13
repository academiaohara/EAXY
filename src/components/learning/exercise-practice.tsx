"use client";

import Link from "next/link";
import { useState } from "react";
import { ExerciseRenderer } from "@/components/exercises/exercise-renderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ExerciseType } from "@/lib/exercise-engine/types";

type ExercisePracticeProps = {
  exerciseId: string;
  type: ExerciseType;
  content: unknown;
  lessonId: string | null;
  lessonTitle: string | null;
};

export function ExercisePractice({
  exerciseId,
  type,
  content,
  lessonId,
  lessonTitle,
}: ExercisePracticeProps) {
  const [lessonCompleted, setLessonCompleted] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6" data-testid="exercise-practice">
      <header className="space-y-2">
        {lessonId && lessonTitle ? (
          <Link
            href={`/aprender/leccion/${lessonId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Volver a {lessonTitle}
          </Link>
        ) : (
          <Link
            href="/aprender"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Volver al curso
          </Link>
        )}
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Practicar</h1>
      </header>

      {lessonCompleted ? (
        <Card className="border-cobalt-tint bg-cobalt-tint/30 p-4" data-testid="lesson-completed-banner">
          <p className="font-medium">¡Lección completada!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Has resuelto correctamente todos los ejercicios de esta lección.
          </p>
          {lessonId ? (
            <Button
              className="mt-4"
              variant="outline"
              render={<Link href={`/aprender/leccion/${lessonId}`} />}
            >
              Volver a la lección
            </Button>
          ) : null}
        </Card>
      ) : null}

      <Card className="p-6">
        <ExerciseRenderer
          exerciseId={exerciseId}
          type={type}
          content={content}
          onAttemptResult={(result) => {
            if (result.lessonCompleted) {
              setLessonCompleted(true);
            }
          }}
        />
      </Card>
    </div>
  );
}
