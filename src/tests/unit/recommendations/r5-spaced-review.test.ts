import { describe, expect, it } from "vitest";
import { evaluateR5SpacedReview } from "@/lib/recommendations/rules/r5-spaced-review";
import { CONCEPT_A, createBaseContext, daysAgo, EXERCISE_A1 } from "@/tests/unit/recommendations/fixtures";

describe("R5 — repaso espaciado", () => {
  it("recomienda repaso tras 7 días sin practicar un concepto competente", () => {
    const recommendation = evaluateR5SpacedReview(
      createBaseContext({
        concepts: [
          {
            id: CONCEPT_A,
            slug: "concept-a",
            title: "Concepto A",
            mastery: 0.75,
            attemptCount: 4,
            lastAttemptAt: daysAgo(8),
            exerciseIds: [EXERCISE_A1],
          },
        ],
      }),
    );

    expect(recommendation?.action).toBe("practice");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });
});
