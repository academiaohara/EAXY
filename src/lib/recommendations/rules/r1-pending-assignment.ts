import { RULE_IDS } from "@/lib/recommendations/constants";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR1PendingAssignment(
  context: RecommendationContext,
): Recommendation | null {
  const assignment = context.pendingAssignments[0];
  if (!assignment) {
    return null;
  }

  return {
    action: "practice",
    conceptId: assignment.conceptId,
    lessonId: null,
    exerciseId: assignment.exerciseId,
    priority: 100,
    explanation: {
      ruleId: RULE_IDS.R1,
      summary: `Tienes una tarea pendiente en el aula ${assignment.classroomName}.`,
      details: {
        assignmentId: assignment.id,
        classroomName: assignment.classroomName,
      },
    },
  };
}
