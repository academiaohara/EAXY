/**
 * Estados cualitativos derivados del mastery (umbrales globales fijos en MVP).
 * Fuente única de verdad — ver docs/learning-model.md.
 */

import {
  MASTERY_DEVELOPING_MAX,
  MASTERY_MASTERED_MIN,
  MASTERY_STRUGGLING_MAX,
} from "@/lib/mastery/constants";

export const MASTERY_STATES = [
  "not_started",
  "struggling",
  "developing",
  "proficient",
  "mastered",
] as const;

export type MasteryState = (typeof MASTERY_STATES)[number];

/** @deprecated Usar MASTERY_THRESHOLDS desde constants vía getMasteryState */
export const MASTERY_THRESHOLDS = {
  struggling: MASTERY_STRUGGLING_MAX,
  developing: MASTERY_DEVELOPING_MAX,
  proficient: MASTERY_MASTERED_MIN,
} as const;

export function getMasteryState(
  mastery: number | null | undefined,
  attemptCount = 1,
): MasteryState {
  if (mastery === null || mastery === undefined || attemptCount <= 0) {
    return "not_started";
  }
  if (mastery < MASTERY_STRUGGLING_MAX) return "struggling";
  if (mastery < MASTERY_DEVELOPING_MAX) return "developing";
  if (mastery < MASTERY_MASTERED_MIN) return "proficient";
  return "mastered";
}

export const MASTERY_STATE_LABELS: Record<MasteryState, string> = {
  not_started: "Sin empezar",
  struggling: "En recuperación",
  developing: "En progreso",
  proficient: "Competente",
  mastered: "Dominado",
};

export const MASTERY_STATE_DESCRIPTIONS: Record<MasteryState, string> = {
  not_started: "Todavía no has practicado este concepto.",
  struggling: "Los últimos intentos han fallado más de lo que han acertado.",
  developing: "Vas por buen camino; un poco más de práctica lo consolidará.",
  proficient: "Lo tienes casi dominado. Un repaso de vez en cuando lo mantendrá fresco.",
  mastered: "Dominas este concepto. Puedes avanzar con seguridad.",
};

export function formatMasteryPercent(mastery: number | null | undefined): string {
  if (mastery === null || mastery === undefined) return "—";
  return `${Math.round(mastery * 100)}%`;
}

export function getMasteryStateLabel(state: MasteryState): string {
  return MASTERY_STATE_LABELS[state];
}
