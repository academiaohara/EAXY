"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ExerciseRenderer } from "@/components/exercises/exercise-renderer";
import { MasteryBadge } from "@/components/learning/mastery-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { formatMasteryPercent } from "@/lib/mastery/states";

type PracticeExercise = {
  id: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
};

type PracticeSessionProps = {
  conceptSlug: string;
  conceptTitle: string;
  conceptDescription: string;
  lessonSummary: string;
  moduleTitle: string;
  lessonTitle: string;
  exercises: PracticeExercise[];
  initialMastery: number;
  initialAttemptCount: number;
};

export function PracticeSession({
  conceptSlug,
  conceptTitle,
  conceptDescription,
  lessonSummary,
  moduleTitle,
  lessonTitle,
  exercises,
  initialMastery,
  initialAttemptCount,
}: PracticeSessionProps) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [mastery, setMastery] = useState(initialMastery);
  const [attemptCount, setAttemptCount] = useState(initialAttemptCount);
  const [sessionKey, setSessionKey] = useState(0);
  const [updatedMasteryLabel, setUpdatedMasteryLabel] = useState<string | null>(
    null,
  );

  const currentExercise = exercises[exerciseIndex];
  const isFinished = exerciseIndex >= exercises.length;

  function handleExerciseCompleted(result: {
    mastery?: number;
    conceptTitle?: string;
  }) {
    if (result.mastery !== undefined) {
      setMastery(result.mastery);
      setUpdatedMasteryLabel(
        `Tu dominio de «${conceptTitle}» ahora es ${formatMasteryPercent(result.mastery)}.`,
      );
    }
    setAttemptCount((count) => count + 1);
    setCompletedCount((count) => count + 1);

    if (exerciseIndex + 1 < exercises.length) {
      setExerciseIndex((index) => index + 1);
      setSessionKey((key) => key + 1);
    } else {
      setExerciseIndex(exercises.length);
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10 lg:px-10 lg:py-14"
      data-testid="practice-session"
    >
      <Breadcrumbs
        items={[
          { label: "Aprender", href: "/aprender" },
          { label: `Práctica: ${conceptTitle}` },
        ]}
      />

      <header className="relative space-y-3 overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-[0_24px_64px_-44px_rgb(25_58_50/0.75)]">
        <span
          className="absolute -right-12 -top-20 size-56 rounded-full bg-sun"
          aria-hidden
        />
        <div className="relative space-y-3">
          <p className="text-sm font-semibold text-sun">
            {moduleTitle} — {lessonTitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">
              {conceptTitle}
            </h1>
            <MasteryBadge
              mastery={mastery}
              attemptCount={attemptCount}
              showPercent
            />
          </div>
          {updatedMasteryLabel ? (
            <p
              className="text-sm text-emerald-700"
              role="status"
              data-testid="mastery-update"
            >
              {updatedMasteryLabel}
            </p>
          ) : null}
          <p className="max-w-2xl text-white/70">{conceptDescription}</p>
        </div>
      </header>

      {lessonSummary && (
        <Card className="rounded-[1.5rem]">
          <CardHeader>
            <CardTitle className="text-base">Repaso de la lección</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-ink-muted">
              {lessonSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {!isFinished && currentExercise ? (
        <Card className="rounded-[1.5rem]">
          <CardHeader>
            <CardTitle className="text-base">
              Ejercicio {exerciseIndex + 1} de {exercises.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExerciseRenderer
              key={`${currentExercise.id}-${sessionKey}`}
              exerciseId={currentExercise.id}
              type={currentExercise.type}
              content={currentExercise.content}
              onAttemptResult={handleExerciseCompleted}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="flex flex-col items-start gap-4 py-8">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2Icon className="size-6" aria-hidden />
              <p className="font-display text-xl font-semibold">
                Sesión completada
              </p>
            </div>
            <p className="text-sm text-emerald-900/80">
              Has completado {completedCount} ejercicio
              {completedCount === 1 ? "" : "s"} de «{conceptTitle}». Tu dominio
              actual es {Math.round(mastery * 100)} %.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/aprender">
                <Button>Volver a Aprender</Button>
              </Link>
              <Link href={`/practicar/${conceptSlug}`}>
                <Button variant="outline">Repetir sesión</Button>
              </Link>
              <Link href="/perfil">
                <Button variant="ghost">Ver progreso</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
