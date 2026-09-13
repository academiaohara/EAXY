import { describe, expect, it } from "vitest";
import { evaluateR2Recovery } from "@/lib/recommendations/rules/r2-recovery";
import {
  CONCEPT_A,
  createBaseContext,
  daysAgo,
  EXERCISE_A1,
  hoursAgo,
} from "@/tests/unit/recommendations/fixtures";

describe("R2 — recuperación", () => {
  it("recomienda recuperar el concepto con mastery más bajo", () => {
    const recommendation = evaluateR2Recovery(
      createBaseContext({
        concepts: [
          {
            id: CONCEPT_A,
            slug: "concept-a",
            title: "Concepto A",
            mastery: 0.2,
            attemptCount: 3,
            lastAttemptAt: daysAgo(2),
            exerciseIds: [EXERCISE_A1],
          },
        ],
      }),
    );

    expect(recommendation?.action).toBe("recover");
    expect(recommendation?.conceptId).toBe(CONCEPT_A);
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("no aplica si se practicó hace menos de 24h", () => {
    const recommendation = evaluateR2Recovery(
      createBaseContext({
        concepts: [
          {
            id: CONCEPT_A,
            slug: "concept-a",
            title: "Concepto A",
            mastery: 0.2,
            attemptCount: 2,
            lastAttemptAt: hoursAgo(2),
            exerciseIds: [EXERCISE_A1],
          },
        ],
      }),
    );

    expect(recommendation).toBeNull();
  });
});
