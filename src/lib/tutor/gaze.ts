import type { TutorPoint } from "@/lib/tutor/types";

export type GazeTargetOptions = {
  pointerX: number;
  pointerY: number;
  /** Rectángulo del tutor en coordenadas de viewport. */
  bounds: { left: number; top: number; width: number; height: number };
  /** Desplazamiento máximo de la pupila en unidades del viewBox. */
  maxOffset: number;
  /** Distancia (en múltiplos del tamaño del tutor) a la que la mirada llega al máximo. */
  reach?: number;
};

export function clampVector(x: number, y: number, max: number): TutorPoint {
  const length = Math.hypot(x, y);

  if (length <= max || length === 0) {
    return { x, y };
  }

  return { x: (x / length) * max, y: (y / length) * max };
}

/**
 * Convierte la posición del puntero en el desplazamiento de las pupilas. La
 * mirada se satura a `maxOffset` cuando el puntero se aleja más de `reach`
 * veces el tamaño del tutor.
 */
export function gazeOffset({
  pointerX,
  pointerY,
  bounds,
  maxOffset,
  reach = 1.6,
}: GazeTargetOptions): TutorPoint {
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  const span = Math.max(bounds.width, bounds.height) * reach;

  if (span === 0) {
    return { x: 0, y: 0 };
  }

  const normalized = clampVector(
    (pointerX - centerX) / span,
    (pointerY - centerY) / span,
    1,
  );

  return {
    x: Math.round(normalized.x * maxOffset * 100) / 100,
    y: Math.round(normalized.y * maxOffset * 100) / 100,
  };
}
