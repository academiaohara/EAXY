import { describe, expect, it } from "vitest";
import { checkLinearPair, formatLinearEquation } from "@/lib/lesson/visual-math";

describe("formatLinearEquation", () => {
  it("omite los coeficientes 1 y escribe bien los signos", () => {
    expect(formatLinearEquation(1, 2, 4)).toBe("x + 2y = 4");
    expect(formatLinearEquation(3, -5, 1)).toBe("3x - 5y = 1");
    expect(formatLinearEquation(-1, 1, 1)).toBe("-x + y = 1");
  });

  it("deja fuera la incógnita con coeficiente 0", () => {
    expect(formatLinearEquation(0, 2, 6)).toBe("2y = 6");
  });
});

describe("checkLinearPair", () => {
  it("sustituye el par y dice si cumple la igualdad", () => {
    expect(checkLinearPair(1, 2, 4, [2, 1])).toEqual({
      expression: "2 + 2 \\cdot 1",
      value: 4,
      holds: true,
    });
    expect(checkLinearPair(1, 2, 4, [1, 1])).toMatchObject({ value: 3, holds: false });
  });

  it("pone paréntesis a los valores negativos", () => {
    expect(checkLinearPair(1, 2, 4, [-2, 3]).expression).toBe("(-2) + 2 \\cdot 3");
    expect(checkLinearPair(3, -5, 1, [7, 4]).expression).toBe("3 \\cdot 7 - 5 \\cdot 4");
  });
});
