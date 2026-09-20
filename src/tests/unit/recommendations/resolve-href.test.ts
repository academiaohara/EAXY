import { describe, expect, it } from "vitest";
import { resolveRecommendationHref } from "@/lib/recommendations/resolve-href";
import type { Recommendation } from "@/lib/recommendations/types";

function baseRecommendation(overrides: Partial<Recommendation>): Recommendation {
  return {
    action: "practice",
    conceptId: null,
    exerciseId: null,
    lessonId: null,
    priority: 10,
    explanation: { ruleId: "R7", summary: "Test", details: {} },
    ...overrides,
  };
}

describe("resolveRecommendationHref", () => {
  it("devuelve null para descanso", () => {
    expect(
      resolveRecommendationHref(baseRecommendation({ action: "rest" })),
    ).toBeNull();
  });

  it("prioriza ejercicio concreto", () => {
    expect(
      resolveRecommendationHref(
        baseRecommendation({ exerciseId: "c1000000-0000-4000-8000-000000000001" }),
      ),
    ).toBe("/aprender/ejercicio/c1000000-0000-4000-8000-000000000001");
  });

  it("enlaza a la lección interactiva cuando hay lessonId", () => {
    expect(
      resolveRecommendationHref(
        baseRecommendation({ lessonId: "a3000000-0000-4000-8000-000000000701" }),
      ),
    ).toBe("/aprender/leccion-interactiva/ecuaciones-lineales-dos-incognitas");
  });

  it("cae en /practicar cuando el concepto no existe en el catálogo", () => {
    expect(
      resolveRecommendationHref(
        baseRecommendation({ conceptId: "b1000000-0000-4000-8000-000000000001" }),
      ),
    ).toBe("/practicar");
  });

  it("cae en /practicar como fallback", () => {
    expect(resolveRecommendationHref(baseRecommendation({}))).toBe("/practicar");
  });
});
