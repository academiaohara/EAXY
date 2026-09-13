import { describe, expect, it } from "vitest";
import { getPrimaryRecommendation } from "@/lib/recommendations/engine";
import type { StudentSnapshot } from "@/lib/recommendations/types";

const now = new Date("2026-09-13T12:00:00.000Z");

function buildSnapshot(overrides: Partial<StudentSnapshot> = {}): StudentSnapshot {
  return {
    now,
    concepts: [
      {
        id: "c1",
        slug: "basic",
        title: "Básico",
        orderIndex: 0,
        exerciseCount: 3,
        prerequisites: [],
      },
      {
        id: "c2",
        slug: "advanced",
        title: "Avanzado",
        orderIndex: 1,
        exerciseCount: 2,
        prerequisites: [{ conceptId: "c1", minMastery: 0.6 }],
      },
    ],
    mastery: [
      { conceptId: "c1", mastery: 0, attemptCount: 0, lastAttemptAt: null },
      { conceptId: "c2", mastery: 0, attemptCount: 0, lastAttemptAt: null },
    ],
    recentAttempts: [],
    pendingAssignments: [],
    ...overrides,
  };
}

describe("recommendation rules", () => {
  it("R7 sugiere continuar el curso cuando no hay datos", () => {
    const recommendation = getPrimaryRecommendation(buildSnapshot());
    expect(recommendation?.explanation.ruleId).toBe("R7");
    expect(recommendation?.conceptId).toBe("c1");
  });

  it("R2 sugiere recuperación cuando mastery es bajo", () => {
    const dayAgo = new Date(now.getTime() - 25 * 60 * 60 * 1000);
    const recommendation = getPrimaryRecommendation(
      buildSnapshot({
        mastery: [
          { conceptId: "c1", mastery: 0.2, attemptCount: 4, lastAttemptAt: dayAgo },
          { conceptId: "c2", mastery: 0, attemptCount: 0, lastAttemptAt: null },
        ],
      }),
    );

    expect(recommendation?.explanation.ruleId).toBe("R2");
    expect(recommendation?.action).toBe("recover");
  });

  it("R4 sugiere avance cuando los prerrequisitos están cumplidos", () => {
    const recommendation = getPrimaryRecommendation(
      buildSnapshot({
        mastery: [
          { conceptId: "c1", mastery: 0.8, attemptCount: 5, lastAttemptAt: now },
          { conceptId: "c2", mastery: 0, attemptCount: 0, lastAttemptAt: null },
        ],
      }),
    );

    expect(recommendation?.explanation.ruleId).toBe("R4");
    expect(recommendation?.conceptId).toBe("c2");
  });

  it("R6 sugiere descanso tras muchos intentos recientes", () => {
    const attempts = Array.from({ length: 5 }, (_, index) => ({
      conceptId: "c1",
      correct: true,
      createdAt: new Date(now.getTime() - index * 5 * 60 * 1000),
    }));

    const recommendation = getPrimaryRecommendation(
      buildSnapshot({
        concepts: [
          {
            id: "c1",
            slug: "basic",
            title: "Básico",
            orderIndex: 0,
            exerciseCount: 3,
            prerequisites: [],
          },
        ],
        mastery: [{ conceptId: "c1", mastery: 0.6, attemptCount: 5, lastAttemptAt: now }],
        recentAttempts: attempts,
      }),
    );

    expect(recommendation?.explanation.ruleId).toBe("R6");
    expect(recommendation?.action).toBe("rest");
  });
});
