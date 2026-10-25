import { describe, expect, it } from "vitest";
import { solveQuadIneq } from "@/components/lesson/anim/quad-ineq";

describe("solveQuadIneq", () => {
  it("dos raíces: fuera o entre ellas según el signo de a y la relación", () => {
    expect(solveQuadIneq(1, -5, 6, "<=").text).toBe("[2, 3]");
    expect(solveQuadIneq(1, 0, -4, "<").text).toBe("(−2, 2)");
    expect(solveQuadIneq(1, -2, -3, ">").text).toBe("(−∞, −1) ∪ (3, +∞)");
    expect(solveQuadIneq(-1, 4, -3, ">=").text).toBe("[1, 3]");
  });

  it("raíz doble", () => {
    expect(solveQuadIneq(1, 2, 1, "<=").text).toBe("{−1}");
    expect(solveQuadIneq(1, -6, 9, ">").text).toBe("(−∞, 3) ∪ (3, +∞)");
    expect(solveQuadIneq(-1, 2, -1, ">").text).toContain("∅");
  });

  it("sin raíces reales", () => {
    expect(solveQuadIneq(1, 0, 1, ">").text).toContain("ℝ");
    expect(solveQuadIneq(1, 1, 1, "<").text).toContain("∅");
    expect(solveQuadIneq(-1, 0, -1, "<=").text).toContain("ℝ");
  });
});
