import { describe, expect, it } from "vitest";
import { evaluateR7Default } from "@/lib/recommendations/rules/r7-default";
import { CONCEPT_A, createBaseContext, LESSON_1 } from "@/tests/unit/recommendations/fixtures";

describe("R7 — continuar curso", () => {
  it("recomienda la siguiente lección lineal no completada", () => {
    const recommendation = evaluateR7Default(createBaseContext());

    expect(recommendation?.action).toBe("practice");
    expect(recommendation?.lessonId).toBe(LESSON_1);
    expect(recommendation?.conceptId).toBe(CONCEPT_A);
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });
});
