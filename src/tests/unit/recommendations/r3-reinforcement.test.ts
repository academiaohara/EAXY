import { describe, expect, it } from "vitest";
import { evaluateR3Reinforcement } from "@/lib/recommendations/rules/r3-reinforcement";
import {
  CONCEPT_A,
  createBaseContext,
  EXERCISE_A1,
  hoursAgo,
} from "@/tests/unit/recommendations/fixtures";

describe("R3 — refuerzo", () => {
  it("recomienda refuerzo tras 3 intentos recientes con bajo rendimiento", () => {
    const recommendation = evaluateR3Reinforcement(
      createBaseContext({
        concepts: [
          {
            id: CONCEPT_A,
            slug: "concept-a",
            title: "Concepto A",
            mastery: 0.55,
            attemptCount: 5,
            lastAttemptAt: hoursAgo(1),
            exerciseIds: [EXERCISE_A1],
          },
        ],
        attempts: [
          {
            exerciseId: EXERCISE_A1,
            conceptId: CONCEPT_A,
            correct: false,
            score: 0,
            createdAt: hoursAgo(3),
          },
          {
            exerciseId: EXERCISE_A1,
            conceptId: CONCEPT_A,
            correct: true,
            score: 1,
            createdAt: hoursAgo(2),
          },
          {
            exerciseId: EXERCISE_A1,
            conceptId: CONCEPT_A,
            correct: false,
            score: 0,
            createdAt: hoursAgo(1),
          },
        ],
      }),
    );

    expect(recommendation?.action).toBe("reinforce");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });
});
