"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExerciseRenderer } from "@/components/exercises/exercise-renderer";
import { Button } from "@/components/ui/button";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";
import type { PracticeExercise } from "@/lib/practice/types";

type PracticeSessionProps = {
  exercise: PracticeExercise;
};

function formatMasteryPercent(mastery: number): string {
  return `${Math.round(mastery * 100)}%`;
}

export function PracticeSession({ exercise }: PracticeSessionProps) {
  const router = useRouter();
  const [attemptResult, setAttemptResult] = useState<SubmitExerciseAttemptResult | null>(null);

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-6 rounded-xl border border-border bg-paper-raised p-6 shadow-sm"
      data-testid="practice-session"
    >
      <header className="space-y-1">
        <p className="text-sm text-muted-foreground">Practicando</p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {exercise.conceptTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          Dificultad {exercise.difficulty} / 5
        </p>
      </header>

      <ExerciseRenderer
        exerciseId={exercise.id}
        type={exercise.type}
        content={exercise.content}
        onAttemptResult={setAttemptResult}
      />

      {attemptResult?.mastery !== undefined && (
        <p className="text-sm text-ink" data-testid="practice-mastery-update">
          Dominio de «{attemptResult.conceptTitle ?? exercise.conceptTitle}»:{" "}
          <strong>{formatMasteryPercent(attemptResult.mastery)}</strong>
        </p>
      )}

      {attemptResult && (
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => router.refresh()}
            data-testid="practice-next-button"
          >
            Siguiente ejercicio
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/aprender">Volver a Aprender</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
