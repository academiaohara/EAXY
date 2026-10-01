"use client";

import { useEffect, useMemo } from "react";
import { setLocalLessonStatus } from "@/lib/local-progress/storage";
import { LessonDetailView } from "@/components/learning/lesson-detail";
import {
  applyLocalProgressToLessonExercises,
  mergeLessonPathStatus,
} from "@/lib/local-progress/storage";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import type { LessonDetail } from "@/lib/curriculum/types";

type LessonDetailWithLocalProgressProps = {
  lesson: LessonDetail;
  mergeLocalProgress?: boolean;
};

export function LessonDetailWithLocalProgress({
  lesson,
  mergeLocalProgress = true,
}: LessonDetailWithLocalProgressProps) {
  const localStore = useLocalProgress();

  useEffect(() => {
    if (!mergeLocalProgress) {
      return;
    }
    if (lesson.pathStatus === "not_started") {
      setLocalLessonStatus(lesson.id, "started");
    }
  }, [lesson.id, lesson.pathStatus, mergeLocalProgress]);

  const mergedLesson = useMemo(() => {
    if (!mergeLocalProgress) {
      return lesson;
    }
    return {
      ...lesson,
      pathStatus: mergeLessonPathStatus(lesson.id, lesson.pathStatus, localStore),
      exercises: applyLocalProgressToLessonExercises(lesson.exercises, localStore),
    };
  }, [lesson, localStore, mergeLocalProgress]);

  return <LessonDetailView lesson={mergedLesson} />;
}
