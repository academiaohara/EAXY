import { describe, expect, it } from "vitest";
import { selectExerciseForRecommendation } from "@/lib/recommendations/select-exercise";
import type { Recommendation } from "@/lib/recommendations/types";

const exercises = [
  { id: "easy", conceptId: "c1", difficulty: 1 },
  { id: "medium", conceptId: "c1", difficulty: 2 },
  { id: "hard", conceptId: "c1", difficulty: 4 },
];

describe("selectExerciseForRecommendation", () => {
  it("usa exerciseId explícito de la recomendación", () => {
    const recommendation: Recommendation = {
      action: "practice",
      conceptId: "c1",
      lessonId: null,
      exerciseId: "medium",
      priority: 10,
      explanation: {
        ruleId: "R1",
        summary: "test",
        details: {},
      },
    };

    expect(
      selectExerciseForRecommendation(recommendation, exercises, new Set()),
    ).toBe("medium");
  });

  it("prefiere ejercicios no intentados", () => {
    const recommendation: Recommendation = {
      action: "practice",
      conceptId: "c1",
      lessonId: null,
      exerciseId: null,
      priority: 10,
      explanation: {
        ruleId: "R7",
        summary: "test",
        details: {},
      },
    };

    expect(
      selectExerciseForRecommendation(recommendation, exercises, new Set(["easy"])),
    ).toBe("medium");
  });

  it("prefiere dificultad baja en recuperación", () => {
    const recommendation: Recommendation = {
      action: "recover",
      conceptId: "c1",
      lessonId: null,
      exerciseId: null,
      priority: 10,
      explanation: {
        ruleId: "R2",
        summary: "test",
        details: {},
      },
    };

    expect(
      selectExerciseForRecommendation(recommendation, exercises, new Set()),
    ).toBe("easy");
  });
});
