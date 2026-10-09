import { describe, expect, it } from "vitest";
import {
  applyOperationAt,
  pickNextOperation,
} from "@/lib/lesson/stage/jerarquia-reduce";

describe("jerarquia-reduce", () => {
  it("prioriza × antes que + en 4 + 3 − 2 × 3", () => {
    const tokens = ["4", "+", "3", "−", "2", "×", "3"];
    expect(pickNextOperation(tokens).m).toBe(5);
    const after = applyOperationAt(tokens, 5);
    expect(after.join(" ")).toBe("4 + 3 − 6");
  });

  it("reduce 18 ÷ 3 × 2 + ( 8 − 3 ) hasta 17", () => {
    let tokens = ["18", "÷", "3", "×", "2", "+", "(", "8", "−", "3", ")"];
    while (tokens.length > 1) {
      const { m } = pickNextOperation(tokens);
      tokens = applyOperationAt(tokens, m);
    }
    expect(tokens[0]).toBe("17");
  });
});
