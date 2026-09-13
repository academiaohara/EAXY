import {
  MASTERY_DEVELOPING_MAX,
  MASTERY_MASTERED_MIN,
  MASTERY_STRUGGLING_MAX,
} from "@/lib/mastery/constants";

export type MasteryQualitativeState =
  | "not_started"
  | "struggling"
  | "developing"
  | "proficient"
  | "mastered";

export function getMasteryQualitativeState(
  mastery: number,
  attemptCount = 0,
): MasteryQualitativeState {
  if (attemptCount === 0) {
    return "not_started";
  }

  if (mastery < MASTERY_STRUGGLING_MAX) {
    return "struggling";
  }

  if (mastery < MASTERY_DEVELOPING_MAX) {
    return "developing";
  }

  if (mastery < MASTERY_MASTERED_MIN) {
    return "proficient";
  }

  return "mastered";
}

export function formatMasteryPercent(mastery: number): string {
  return `${Math.round(mastery * 100)}%`;
}

export const MASTERY_STATE_LABELS: Record<MasteryQualitativeState, string> = {
  not_started: "Sin empezar",
  struggling: "En recuperación",
  developing: "En desarrollo",
  proficient: "Competente",
  mastered: "Dominado",
};
