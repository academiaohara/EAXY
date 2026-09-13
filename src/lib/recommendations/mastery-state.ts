import {
  MASTERY_DEVELOPING_MAX,
  MASTERY_PROFICIENT_MAX,
  MASTERY_STRUGGLING_MAX,
} from "@/lib/recommendations/constants";

export type QualitativeMasteryState =
  | "not_started"
  | "struggling"
  | "developing"
  | "proficient"
  | "mastered";

export function getQualitativeMasteryState(
  mastery: number,
  hasAttempts: boolean,
): QualitativeMasteryState {
  if (!hasAttempts) {
    return "not_started";
  }

  if (mastery < MASTERY_STRUGGLING_MAX) {
    return "struggling";
  }

  if (mastery < MASTERY_DEVELOPING_MAX) {
    return "developing";
  }

  if (mastery < MASTERY_PROFICIENT_MAX) {
    return "proficient";
  }

  return "mastered";
}

export function formatMasteryPercent(mastery: number): number {
  return Math.round(mastery * 100);
}
