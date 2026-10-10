"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  TUTOR_HOVER_DWELL_MS,
  pickTutorHoverMood,
  type TutorHoverReactionMood,
} from "@/lib/tutor/hover-reaction";

/**
 * Tras un rato con el puntero encima, el tutor adopta una reacción al azar hasta
 * que el puntero sale.
 */
export function useTutorHoverReaction(enabled: boolean) {
  const [hoverMood, setHoverMood] = useState<TutorHoverReactionMood | null>(null);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onPointerEnter = useCallback(() => {
    if (!enabled) {
      return;
    }

    setHovering(true);
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setHoverMood(pickTutorHoverMood());
    }, TUTOR_HOVER_DWELL_MS);
  }, [clearTimer, enabled]);

  const onPointerLeave = useCallback(() => {
    setHovering(false);
    clearTimer();
    setHoverMood(null);
  }, [clearTimer]);

  useEffect(() => {
    if (!enabled) {
      clearTimer();
      setHoverMood(null);
      setHovering(false);
    }
  }, [clearTimer, enabled]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return { hoverMood, hovering, onPointerEnter, onPointerLeave };
}
