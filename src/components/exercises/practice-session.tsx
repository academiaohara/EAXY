"use client";

import { useState } from "react";
import { ExerciseRenderer } from "@/components/exercises/exercise-renderer";
import { MasteryBadge } from "@/components/exercises/mastery-badge";
import { MasteryProgressBar } from "@/components/learning/mastery-progress-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PracticeExerciseContext } from "@/lib/exercises/types";
import { formatMasteryPercent } from "@/lib/mastery/status";

type PracticeSessionProps = {
  context: PracticeExerciseContext;
};

export function PracticeSession({ context }: PracticeSessionProps) {
  const [mastery, setMastery] = useState(context.mastery);
  const [hasAttempts, setHasAttempts] = useState(context.hasAttempts);
  const [updatedMasteryLabel, setUpdatedMasteryLabel] = useState<string | null>(null);

  function handleAttemptComplete(result: { mastery: number; conceptTitle: string }) {
    setMastery(result.mastery);
    setHasAttempts(true);
    setUpdatedMasteryLabel(
      `Tu dominio de «${result.conceptTitle}» ahora es ${formatMasteryPercent(result.mastery)}.`,
    );
  }

  return (
    <div className="space-y-6" data-testid="practice-session">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Concepto</p>
            <p className="font-medium text-ink">{context.conceptTitle}</p>
          </div>
          <MasteryBadge mastery={mastery} hasAttempts={hasAttempts} />
        </div>
        <MasteryProgressBar mastery={mastery} hasAttempts={hasAttempts} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ejercicio</CardTitle>
          <CardDescription>
            Ejercicio {context.attemptedCount + 1} de {context.totalExercises} disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExerciseRenderer
            exerciseId={context.exercise.id}
            type={context.exercise.type}
            content={context.exercise.content}
            onAttemptComplete={handleAttemptComplete}
          />
        </CardContent>
      </Card>

      {updatedMasteryLabel && (
        <p className="text-sm text-emerald-700" role="status" data-testid="mastery-update">
          {updatedMasteryLabel}
        </p>
      )}
    </div>
  );
}
