import { describe, expect, it } from "vitest";
import { evaluateR1PendingAssignment } from "@/lib/recommendations/rules/r1-pending-assignment";
import { CONCEPT_A, createBaseContext, EXERCISE_A1 } from "@/tests/unit/recommendations/fixtures";

describe("R1 — asignación pendiente", () => {
  it("no aplica sin asignaciones pendientes", () => {
    expect(evaluateR1PendingAssignment(createBaseContext())).toBeNull();
  });

  it("recomienda practicar la tarea pendiente del aula", () => {
    const recommendation = evaluateR1PendingAssignment(
      createBaseContext({
        assignments: [
          {
            assignmentId: "assignment-1",
            classroomId: "classroom-1",
            classroomName: "1º A",
            status: "pending",
            exerciseIds: [EXERCISE_A1],
            conceptIds: [CONCEPT_A],
          },
        ],
      }),
    );

    expect(recommendation?.action).toBe("practice");
    expect(recommendation?.explanation.ruleId).toBe("R1");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });
});
