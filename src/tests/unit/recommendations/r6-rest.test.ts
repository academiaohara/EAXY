import { describe, expect, it } from "vitest";
import { evaluateR6Rest } from "@/lib/recommendations/rules/r6-rest";
import { createBaseContext } from "@/tests/unit/recommendations/fixtures";

describe("R6 — descanso", () => {
  it("recomienda descanso tras 5 ejercicios en la última hora", () => {
    const recommendation = evaluateR6Rest(
      createBaseContext({
        attemptsLastHour: 5,
      }),
    );

    expect(recommendation?.action).toBe("rest");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("no aplica con menos de 5 ejercicios en la última hora", () => {
    expect(evaluateR6Rest(createBaseContext({ attemptsLastHour: 4 }))).toBeNull();
  });
});
