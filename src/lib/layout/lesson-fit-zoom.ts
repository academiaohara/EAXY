"use client";

import { useEffect, useState } from "react";

/** Alto de viewport (px) para el que está pensada la lección sin reducir. */
const REFERENCE_HEIGHT_PX = 900;
/** Ancho de viewport (px) para el que está pensada la lección sin reducir. */
const REFERENCE_WIDTH_PX = 1100;
/** Por debajo de este factor el texto dejaría de ser legible. */
const MIN_ZOOM = 0.6;

/** Factor (≤ 1) que encoge la lección en pantallas bajas, como un zoom del navegador. */
export function computeLessonFitZoom(viewportWidth: number, viewportHeight: number): number {
  const raw = Math.min(
    1,
    viewportHeight / REFERENCE_HEIGHT_PX,
    viewportWidth / REFERENCE_WIDTH_PX,
  );
  return Math.max(MIN_ZOOM, Math.round(raw * 100) / 100);
}

/**
 * Ajusta la lección a portátiles y ventanas bajas: en una pantalla grande vale 1
 * y en una pequeña reduce proporcionalmente para que quepa sin scroll.
 */
export function useLessonFitZoom(): number {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const update = () => setZoom(computeLessonFitZoom(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return zoom;
}
