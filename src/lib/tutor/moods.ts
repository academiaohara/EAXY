import type { TutorPoint } from "@/lib/tutor/geometry";

export type TutorMood =
  "idle" | "happy" | "celebrate" | "thinking" | "sad" | "surprised";

export type TutorBodyAnimation = "float" | "bounce" | "tilt" | "droop" | "pop";

export type TutorExpression = {
  /** Achatamiento vertical del ojo: <1 entorna la mirada. */
  eyeScaleY: number;
  /** Desplazamiento de la pupila en unidades del viewBox. */
  pupilOffset: TutorPoint;
  pupilScale: number;
  browOffset: number;
  /** Grados en el ojo izquierdo; el derecho se espeja. */
  browRotation: number;
  browOpacity: number;
  bodyAnimation: TutorBodyAnimation;
  blink: boolean;
  label: string;
};

export const TUTOR_MOODS: readonly TutorMood[] = [
  "idle",
  "happy",
  "celebrate",
  "thinking",
  "sad",
  "surprised",
] as const;

export const tutorExpressions: Record<TutorMood, TutorExpression> = {
  idle: {
    eyeScaleY: 1,
    pupilOffset: { x: 0, y: 0 },
    pupilScale: 1,
    browOffset: 0,
    browRotation: 0,
    browOpacity: 0.45,
    bodyAnimation: "float",
    blink: true,
    label: "El tutor te acompaña mientras trabajas",
  },
  happy: {
    eyeScaleY: 0.78,
    pupilOffset: { x: 0, y: 1.5 },
    pupilScale: 1.05,
    browOffset: -3,
    browRotation: -8,
    browOpacity: 0.5,
    bodyAnimation: "bounce",
    blink: true,
    label: "El tutor está contento",
  },
  celebrate: {
    eyeScaleY: 1.08,
    pupilOffset: { x: 0, y: -1.5 },
    pupilScale: 1.16,
    browOffset: -6,
    browRotation: -12,
    browOpacity: 0.55,
    bodyAnimation: "bounce",
    blink: true,
    label: "El tutor celebra tu respuesta",
  },
  thinking: {
    eyeScaleY: 0.9,
    pupilOffset: { x: -5, y: -4 },
    pupilScale: 0.95,
    browOffset: -1,
    browRotation: 12,
    browOpacity: 0.6,
    bodyAnimation: "tilt",
    blink: true,
    label: "El tutor está pensando",
  },
  sad: {
    eyeScaleY: 0.72,
    pupilOffset: { x: 0, y: 4 },
    pupilScale: 0.92,
    browOffset: 3,
    browRotation: 16,
    browOpacity: 0.65,
    bodyAnimation: "droop",
    blink: true,
    label: "El tutor te anima a intentarlo otra vez",
  },
  surprised: {
    eyeScaleY: 1.14,
    pupilOffset: { x: 0, y: 0 },
    pupilScale: 0.74,
    browOffset: -7,
    browRotation: -2,
    browOpacity: 0.5,
    bodyAnimation: "pop",
    blink: false,
    label: "El tutor está sorprendido",
  },
};

export function getTutorExpression(mood: TutorMood): TutorExpression {
  return tutorExpressions[mood];
}

/** Traduce el resultado de un paso de lección al estado de ánimo del tutor. */
export function tutorMoodForFeedback(
  status: "correct" | "incorrect" | null | undefined,
): TutorMood {
  if (status === "correct") {
    return "celebrate";
  }
  if (status === "incorrect") {
    return "sad";
  }
  return "idle";
}
