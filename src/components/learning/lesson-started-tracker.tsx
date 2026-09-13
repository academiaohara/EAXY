"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { markLessonStarted } from "@/lib/learning-paths/actions";

type LessonStartedTrackerProps = {
  lessonId: string;
  shouldMarkStarted: boolean;
};

export function LessonStartedTracker({ lessonId, shouldMarkStarted }: LessonStartedTrackerProps) {
  const router = useRouter();
  const markedRef = useRef(false);

  useEffect(() => {
    if (!shouldMarkStarted || markedRef.current) {
      return;
    }

    markedRef.current = true;

    void markLessonStarted(lessonId).then((result) => {
      if (!result.error) {
        router.refresh();
      }
    });
  }, [lessonId, shouldMarkStarted, router]);

  return null;
}
