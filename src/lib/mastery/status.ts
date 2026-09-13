export type MasteryStatus =
  | "not_started"
  | "struggling"
  | "developing"
  | "proficient"
  | "mastered";

const MASTERY_STATUS_LABELS: Record<MasteryStatus, string> = {
  not_started: "Sin empezar",
  struggling: "En recuperación",
  developing: "En progreso",
  proficient: "Competente",
  mastered: "Dominado",
};

/**
 * Deriva el estado cualitativo de mastery según umbrales globales del MVP.
 */
export function getMasteryStatus(mastery: number, hasAttempts: boolean): MasteryStatus {
  if (!hasAttempts) {
    return "not_started";
  }

  if (mastery < 0.4) {
    return "struggling";
  }

  if (mastery < 0.7) {
    return "developing";
  }

  if (mastery < 0.85) {
    return "proficient";
  }

  return "mastered";
}

export function getMasteryStatusLabel(status: MasteryStatus): string {
  return MASTERY_STATUS_LABELS[status];
}

export function formatMasteryPercent(mastery: number): string {
  return `${Math.round(mastery * 100)}%`;
}
