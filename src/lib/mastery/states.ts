/**
 * Estados cualitativos derivados del mastery (umbrales globales fijos en MVP).
 * Ver docs/learning-model.md.
 */

export const MASTERY_STATES = [
  "not_started",
  "struggling",
  "developing",
  "proficient",
  "mastered",
] as const;

export type MasteryState = (typeof MASTERY_STATES)[number];

export const MASTERY_THRESHOLDS = {
  struggling: 0.4,
  developing: 0.7,
  proficient: 0.85,
} as const;

export function getMasteryState(mastery: number | null | undefined, attemptCount = 1): MasteryState {
  if (mastery === null || mastery === undefined || attemptCount <= 0) {
    return "not_started";
  }
  if (mastery < MASTERY_THRESHOLDS.struggling) return "struggling";
  if (mastery < MASTERY_THRESHOLDS.developing) return "developing";
  if (mastery < MASTERY_THRESHOLDS.proficient) return "proficient";
  return "mastered";
}

export const MASTERY_STATE_LABELS: Record<MasteryState, string> = {
  not_started: "Sin empezar",
  struggling: "Necesita refuerzo",
  developing: "En progreso",
  proficient: "Casi dominado",
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
  return `${Math.round(mastery * 100)} %`;
}
