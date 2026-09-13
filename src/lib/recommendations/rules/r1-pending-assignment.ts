import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR1PendingAssignment(
  context: RecommendationContext,
): Recommendation | null {
  const pendingAssignments = context.assignments.filter(
    (assignment) =>
      assignment.status === "pending" || assignment.status === "in_progress",
  );

  if (pendingAssignments.length === 0) {
    return null;
  }

  const assignment = context.classroomId
    ? pendingAssignments.find((item) => item.classroomId === context.classroomId) ??
      pendingAssignments[0]
    : pendingAssignments[0];

  const conceptId = assignment.conceptIds[0] ?? null;
  const exerciseId = assignment.exerciseIds[0] ?? null;

  return {
    action: "practice",
    conceptId,
    exerciseId,
    lessonId: null,
    priority: 100,
    explanation: {
      ruleId: "R1",
      summary: `Tienes una tarea pendiente en el aula ${assignment.classroomName}.`,
      details: {
        assignmentId: assignment.assignmentId,
        classroomName: assignment.classroomName,
        status: assignment.status,
      },
    },
  };
}
