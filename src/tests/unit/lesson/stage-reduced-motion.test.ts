import { describe, expect, it } from "vitest";
import { evalWithParenthesisPlacement } from "@/lib/lesson/stage/eval-natural-expression";

describe("stage reduced-motion fallback", () => {
  it("evalúa expresiones válidas sin depender de animación", () => {
    const tokens = ["9", "-", "1", "+", "3"];
    expect(evalWithParenthesisPlacement(tokens, 1, 4)).toBe(5);
    expect(evalWithParenthesisPlacement(tokens, null, null)).toBe(11);
  });
});
