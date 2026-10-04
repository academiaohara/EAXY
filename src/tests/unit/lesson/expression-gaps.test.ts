import { describe, expect, it } from "vitest";
import { evalWithParenthesisPlacement } from "@/lib/lesson/stage/eval-natural-expression";
import { gapToPlacement } from "@/lib/lesson/stage/expression-gaps";

const TOKENS = ["9", "-", "1", "+", "3"];

describe("expression-gaps", () => {
  it("agrupa 1+3 para obtener 5", () => {
    const { openAfter, closeBefore } = gapToPlacement(1);
    expect(evalWithParenthesisPlacement(TOKENS, openAfter, closeBefore)).toBe(5);
  });

  it("agrupa 9-1 para obtener 11", () => {
    const { openAfter, closeBefore } = gapToPlacement(0);
    expect(evalWithParenthesisPlacement(TOKENS, openAfter, closeBefore)).toBe(11);
  });
});
