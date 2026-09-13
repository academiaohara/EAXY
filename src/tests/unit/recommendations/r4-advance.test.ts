import { describe, expect, it } from "vitest";
import { evaluateR4Advance } from "@/lib/recommendations/rules/r4-advance";
import {
  CONCEPT_A,
  CONCEPT_B,
  createBaseContext,
  LESSON_2,
} from "@/tests/unit/recommendations/fixtures";

describe("R4 — avance", () => {
  it("recomienda avanzar cuando los prerrequisitos están cumplidos", () => {
    const recommendation = evaluateR4Advance(
      createBaseContext({
        concepts: [
          {
            id: CONCEPT_A,
            slug: "concept-a",
            title: "Concepto A",
            mastery: 0.8,
            attemptCount: 5,
            lastAttemptAt: null,
            exerciseIds: [],
          },
          {
            id: CONCEPT_B,
            slug: "concept-b",
            title: "Concepto B",
            mastery: 0,
            attemptCount: 0,
            lastAttemptAt: null,
            exerciseIds: ["exercise-b1"],
          },
        ],
      }),
    );

    expect(recommendation?.action).toBe("advance");
    expect(recommendation?.conceptId).toBe(CONCEPT_B);
    expect(recommendation?.lessonId).toBe(LESSON_2);
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });
});
