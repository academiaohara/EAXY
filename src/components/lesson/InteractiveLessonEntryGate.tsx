"use client";

import { useEffect, useState } from "react";
import { LessonContainer } from "@/components/lesson/LessonContainer";
import type { InteractiveLesson } from "@/lib/lesson/types";
import {
  clearPersistedInteractiveLesson,
  readPersistedInteractiveLesson,
  shouldOfferInteractiveLessonResume,
} from "@/lib/local-progress/interactive-lesson-state";
import { resetLocalLessonCatalogStatus } from "@/lib/local-progress/storage";

type LessonNavigationContext = {
  courseSlug: string;
  courseTitle: string;
  moduleSlug?: string;
  moduleTitle: string;
};

type InteractiveLessonEntryGateProps = {
  lesson: InteractiveLesson;
  navigation?: LessonNavigationContext;
  curriculumLessonId?: string;
  trackLocalProgress?: boolean;
  /** URL con `?reiniciar=1`: borra progreso y arranca desde el paso 1. */
  restartRequested?: boolean;
};

export function InteractiveLessonEntryGate({
  lesson,
  navigation,
  curriculumLessonId,
  trackLocalProgress = false,
  restartRequested = false,
}: InteractiveLessonEntryGateProps) {
  const stepCount = lesson.steps.length;
  const [ready, setReady] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [openForReview, setOpenForReview] = useState(false);

  useEffect(() => {
    if (restartRequested) {
      clearPersistedInteractiveLesson(lesson.slug);
      if (trackLocalProgress && curriculumLessonId) {
        resetLocalLessonCatalogStatus(curriculumLessonId);
      }
      setOpenForReview(false);
      setSessionKey((key) => key + 1);
      setReady(true);
      return;
    }

    const saved = readPersistedInteractiveLesson(lesson.slug, stepCount);
    setOpenForReview(shouldOfferInteractiveLessonResume(saved, stepCount));
    setReady(true);
  }, [
    curriculumLessonId,
    lesson.slug,
    restartRequested,
    stepCount,
    trackLocalProgress,
  ]);

  if (!ready) {
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
    <LessonContainer
      key={sessionKey}
      lesson={lesson}
      navigation={navigation}
      curriculumLessonId={curriculumLessonId}
      trackLocalProgress={trackLocalProgress}
      openForReview={openForReview}
    />
  );
}
