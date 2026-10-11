import { describe, expect, it } from "vitest";
import {
  evalNaturalExpression,
  evalWithParenthesisPlacement,
  isValidParenthesisPlacement,
  listValidParenthesisSlots,
} from "@/lib/lesson/stage/eval-natural-expression";

describe("evalNaturalExpression", () => {
  it("evalúa sumas y restas de izquierda a derecha", () => {
    expect(evalNaturalExpression("9 - 1 + 3")).toBe(11);
    expect(evalNaturalExpression("9 - (1 + 3)")).toBe(5);
  });

  it("rechaza restas que darían negativos", () => {
    expect(evalNaturalExpression("1 - 9")).toBeNull();
  });
});

describe("evalWithParenthesisPlacement", () => {
  const tokens = ["9", "-", "1", "+", "3"];

  it("acepta colocaciones válidas que dan 5", () => {
    expect(isValidParenthesisPlacement(tokens, 1, 4)).toBe(true);
    expect(evalWithParenthesisPlacement(tokens, 1, 4)).toBe(5);
    expect(isValidParenthesisPlacement(tokens, -1, 4)).toBe(true);
    expect(evalWithParenthesisPlacement(tokens, -1, 4)).toBe(11);
  });

  it("rechaza paréntesis incompletos", () => {
    expect(isValidParenthesisPlacement(tokens, 1, null)).toBe(false);
  });
});

describe("listValidParenthesisSlots", () => {
  it("solo ofrece abrir/cerrar en posiciones con sentido para 9 - 1 + 3", () => {
    const tokens = ["9", "-", "1", "+", "3"];
    const slots = listValidParenthesisSlots(tokens);
    expect(slots.openAfter).toEqual([-1, 1]);
    expect(slots.closeBefore).toEqual([2, 4]);
  });
});
