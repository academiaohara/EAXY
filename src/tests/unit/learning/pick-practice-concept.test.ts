import { describe, expect, it } from "vitest";
import { pickPracticeConceptSlug } from "@/lib/learning/pick-practice-concept";
import type { ConceptProgress } from "@/lib/learning/queries";

function concept(overrides: Partial<ConceptProgress> & Pick<ConceptProgress, "conceptSlug">): ConceptProgress {
  return {
    conceptId: "id",
    title: "Concepto",
    description: "Descripción",
    mastery: 0,
    attemptCount: 0,
    lastAttemptAt: null,
    exerciseCount: 3,
    moduleTitle: "Módulo",
    lessonTitle: "Lección",
    ...overrides,
  };
}

describe("pickPracticeConceptSlug", () => {
  it("prioriza conceptos en recuperación", () => {
    const slug = pickPracticeConceptSlug([
      concept({ conceptSlug: "a", mastery: 0.8, attemptCount: 5 }),
      concept({ conceptSlug: "b", mastery: 0.2, attemptCount: 3 }),
    ]);

    expect(slug).toBe("b");
  });

  it("elige sin empezar si no hay recuperación", () => {
    const slug = pickPracticeConceptSlug([
      concept({ conceptSlug: "a", mastery: 0.8, attemptCount: 5 }),
      concept({ conceptSlug: "b", attemptCount: 0 }),
    ]);

    expect(slug).toBe("b");
  });

  it("elige el de menor dominio cuando todos tienen intentos", () => {
    const slug = pickPracticeConceptSlug([
      concept({ conceptSlug: "a", mastery: 0.75, attemptCount: 2 }),
      concept({ conceptSlug: "b", mastery: 0.55, attemptCount: 4 }),
    ]);

    expect(slug).toBe("b");
  });
});
