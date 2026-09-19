import { describe, expect, it } from "vitest";
import {
  checkFillInBlankAnswerFlexible,
  normalizeCommutativeSum,
  normalizeMathExpression,
} from "@/lib/lesson/check-answer";

describe("normalizeMathExpression", () => {
  it("elimina espacios y normaliza a minúsculas", () => {
    expect(normalizeMathExpression("1 + x")).toBe("1+x");
    expect(normalizeMathExpression("X + 1")).toBe("x+1");
  });
});

describe("normalizeCommutativeSum", () => {
  it("acepta sumandos en distinto orden", () => {
    expect(normalizeCommutativeSum("1 + x")).toBe("1+x");
    expect(normalizeCommutativeSum("x + 1")).toBe("1+x");
  });
});

describe("checkFillInBlankAnswerFlexible", () => {
  it("acepta variantes equivalentes de y = 1 + x", () => {
    expect(checkFillInBlankAnswerFlexible("1 + x", ["1 + x", "x + 1"])).toBe(true);
    expect(checkFillInBlankAnswerFlexible("x + 1", ["1 + x", "x + 1"])).toBe(true);
    expect(checkFillInBlankAnswerFlexible("1+x", ["1 + x", "x + 1"])).toBe(true);
  });

  it("rechaza respuestas incorrectas", () => {
    expect(checkFillInBlankAnswerFlexible("x - 1", ["1 + x", "x + 1"])).toBe(false);
  });
});
