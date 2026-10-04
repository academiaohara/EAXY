"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LessonContainer } from "@/components/lesson/LessonContainer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { InteractiveLesson } from "@/lib/lesson/types";
import {
  clearPersistedInteractiveLesson,
  readPersistedInteractiveLesson,
  shouldOfferInteractiveLessonResume,
  summarizeInteractiveLessonProgress,
} from "@/lib/local-progress/interactive-lesson-state";
import { resetLocalLessonCatalogStatus } from "@/lib/local-progress/storage";

type LessonNavigationContext = {
  courseId: string;
  courseTitle: string;
  moduleId?: string;
  moduleTitle: string;
};

type InteractiveLessonEntryGateProps = {
  lesson: InteractiveLesson;
  navigation?: LessonNavigationContext;
  curriculumLessonId?: string;
  trackLocalProgress?: boolean;
};

export function InteractiveLessonEntryGate({
  lesson,
  navigation,
  curriculumLessonId,
  trackLocalProgress = false,
}: InteractiveLessonEntryGateProps) {
  const stepCount = lesson.steps.length;
  const topicHref = navigation?.moduleId
    ? `/aprender/curso/${navigation.courseId}/tema/${navigation.moduleId}`
    : navigation
      ? `/aprender/curso/${navigation.courseId}`
      : "/aprender";

  const [phase, setPhase] = useState<"checking" | "prompt" | "active">("checking");
  const [sessionKey, setSessionKey] = useState(0);
  const [openForReview, setOpenForReview] = useState(false);
  const [savedSnapshot, setSavedSnapshot] = useState(() =>
    readPersistedInteractiveLesson(lesson.slug, stepCount),
  );

  const progressSummary = useMemo(
    () => summarizeInteractiveLessonProgress(savedSnapshot, stepCount),
    [savedSnapshot, stepCount],
  );

  useEffect(() => {
    const saved = readPersistedInteractiveLesson(lesson.slug, stepCount);
    setSavedSnapshot(saved);
    setPhase(shouldOfferInteractiveLessonResume(saved, stepCount) ? "prompt" : "active");
  }, [lesson.slug, stepCount, sessionKey]);

  function handleContinue() {
    setOpenForReview(true);
    setPhase("active");
  }

  function handleRestart() {
    clearPersistedInteractiveLesson(lesson.slug);
    if (trackLocalProgress && curriculumLessonId) {
      resetLocalLessonCatalogStatus(curriculumLessonId);
    }
    setOpenForReview(false);
    setSessionKey((key) => key + 1);
    setPhase("active");
  }

  const promptDescription = progressSummary.finished
    ? progressSummary.fullyComplete
      ? "Ya terminaste esta lección. Puedes repasarla o empezar de cero."
      : `Llegaste al final, pero quedan ${progressSummary.pendingStepCount} paso(s) sin marcar como superados.`
    : `Tienes progreso guardado (paso ${progressSummary.furthestStepIndex + 1} de ${progressSummary.stepCount}).`;

  if (phase === "checking") {
    return (
      <div
        className="flex min-h-0 flex-1 items-center justify-center p-8 text-sm text-ink-muted"
        data-testid="interactive-lesson-entry-loading"
      >
        Cargando tu progreso…
      </div>
    );
  }

  return (
    <>
      <Dialog open={phase === "prompt"} onOpenChange={() => undefined}>
        <DialogContent showCloseButton={false} className="sm:max-w-md" data-testid="interactive-lesson-entry-dialog">
          <DialogHeader>
            <DialogTitle>¿Cómo quieres continuar?</DialogTitle>
            <DialogDescription>{promptDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button type="button" className="w-full rounded-full" onClick={handleContinue}>
              {progressSummary.finished ? "Ver la lección" : "Continuar"}
            </Button>
            <Button type="button" variant="outline" className="w-full rounded-full" onClick={handleRestart}>
              Empezar de cero
            </Button>
            <Button
              nativeButton={false}
              variant="ghost"
              className="w-full rounded-full"
              render={<Link href={topicHref} />}
            >
              Volver al tema
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {phase === "active" ? (
        <LessonContainer
          key={sessionKey}
          lesson={lesson}
          navigation={navigation}
          curriculumLessonId={curriculumLessonId}
          trackLocalProgress={trackLocalProgress}
          openForReview={openForReview}
        />
      ) : null}
    </>
  );
}
