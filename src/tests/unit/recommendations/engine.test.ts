import { describe, expect, it } from "vitest";
import { getRecommendations } from "@/lib/recommendations/engine";
import {
  CONCEPT_A,
  createBaseContext,
  daysAgo,
  EXERCISE_A1,
} from "@/tests/unit/recommendations/fixtures";

describe("getRecommendations", () => {
  it("evalúa las reglas en orden de prioridad", () => {
    const context = createBaseContext({
      attemptsLastHour: 6,
      concepts: [
        {
          id: CONCEPT_A,
          slug: "concept-a",
          title: "Concepto A",
          mastery: 0.2,
          attemptCount: 2,
          lastAttemptAt: daysAgo(2),
          exerciseIds: [EXERCISE_A1],
        },
      ],
    });

    const [recommendation] = getRecommendations(context);

    expect(recommendation?.explanation.ruleId).toBe("R2");
  });

  it("devuelve R7 cuando ninguna otra regla aplica", () => {
    const [recommendation] = getRecommendations(createBaseContext());

    expect(recommendation?.explanation.ruleId).toBe("R7");
  });
});
