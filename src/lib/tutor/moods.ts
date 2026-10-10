import type { TutorPoint } from "@/lib/tutor/types";

export type TutorMood =
  | "idle"
  | "happy"
  | "celebrate"
  | "thinking"
  | "sad"
  | "surprised"
  | "annoyed";

export type TutorBodyAnimation = "float" | "bounce" | "tilt" | "droop" | "pop";

export type TutorExpression = {
  /** Achatamiento vertical del ojo: <1 entorna la mirada. */
  eyeScaleY: number;
  /** Fracción del ojo tapada por el párpado inferior (0 = ojo abierto). */
  lidCoverage: number;
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
  "annoyed",
] as const;

export const tutorExpressions: Record<TutorMood, TutorExpression> = {
  idle: {
    eyeScaleY: 1,
    lidCoverage: 0,
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
    eyeScaleY: 0.94,
    lidCoverage: 0.38,
    pupilOffset: { x: 0, y: 1.5 },
    pupilScale: 1.12,
    browOffset: -4,
    browRotation: 4,
    browOpacity: 0.5,
    bodyAnimation: "bounce",
    blink: true,
    label: "El tutor está contento",
  },
  celebrate: {
    eyeScaleY: 1.08,
    lidCoverage: 0.1,
    pupilOffset: { x: 0, y: -1.5 },
    pupilScale: 1.16,
    browOffset: -7,
    browRotation: 7,
    browOpacity: 0.55,
    bodyAnimation: "bounce",
    blink: true,
    label: "El tutor celebra tu respuesta",
  },
  thinking: {
    eyeScaleY: 0.92,
    lidCoverage: 0.22,
    pupilOffset: { x: -5, y: -4 },
    pupilScale: 1.04,
    browOffset: -2,
    browRotation: 11,
    browOpacity: 0.6,
    bodyAnimation: "tilt",
    blink: true,
    label: "El tutor está pensando",
  },
  sad: {
    eyeScaleY: 0.88,
    lidCoverage: 0.2,
    pupilOffset: { x: 0, y: 3 },
    pupilScale: 1.02,
    browOffset: 2,
    browRotation: -15,
    browOpacity: 0.65,
    bodyAnimation: "droop",
    blink: true,
    label: "El tutor te anima a intentarlo otra vez",
  },
  surprised: {
    eyeScaleY: 1.14,
    lidCoverage: 0,
    pupilOffset: { x: 0, y: 0 },
    pupilScale: 0.74,
    browOffset: -9,
    browRotation: 0,
    browOpacity: 0.5,
    bodyAnimation: "pop",
    blink: false,
    label: "El tutor está sorprendido",
  },
  annoyed: {
    eyeScaleY: 0.84,
    lidCoverage: 0.12,
    pupilOffset: { x: 0, y: 1 },
    pupilScale: 1.06,
    browOffset: 5,
    browRotation: 22,
    browOpacity: 0.72,
    bodyAnimation: "tilt",
    blink: true,
    label: "El tutor se ha enfadado un poco",
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
