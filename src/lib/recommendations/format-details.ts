const DETAIL_LABELS: Record<string, string> = {
  assignmentId: "ID de tarea",
  classroomName: "Aula",
  status: "Estado",
  conceptId: "Concepto",
  conceptTitle: "Concepto",
  mastery: "Dominio",
  masteryPercent: "Dominio",
  daysSinceLastAttempt: "Días desde el último intento",
  attemptsLastHour: "Intentos en la última hora",
  threshold: "Umbral",
  lessonId: "Lección",
  lessonTitle: "Lección",
  recentAverageScore: "Media reciente",
  recentAttemptsCount: "Intentos recientes",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  in_progress: "En curso",
  completed: "Completada",
};

function formatDetailValue(key: string, value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (key === "status" && typeof value === "string") {
    return STATUS_LABELS[value] ?? value;
  }

  if (key === "mastery" && typeof value === "number") {
    return `${Math.round(value * 100)}%`;
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  return String(value);
}

export function formatRecommendationDetails(
  details: Record<string, unknown>,
): Array<{ label: string; value: string }> {
  return Object.entries(details).map(([key, value]) => ({
    label: DETAIL_LABELS[key] ?? key,
    value: formatDetailValue(key, value),
  }));
}
