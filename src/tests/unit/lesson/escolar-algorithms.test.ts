import { describe, expect, it } from "vitest";
import {
  buildDivisionAlgorithmSteps,
  buildMultiplicationAlgorithmSteps,
} from "@/components/lesson/stage/modules/mul-div-naturales/escolar-algorithms";

describe("escolar-algorithms", () => {
  it("genera cociente 25 para 150 : 6", () => {
    const steps = buildDivisionAlgorithmSteps(150, 6);
    const last = steps[steps.length - 1]!;
    expect(last.quotientDigits).toBe("25");
    expect(last.caption).toMatch(/exacta/i);
  });

  it("genera producto 408 para 34 × 12", () => {
    const steps = buildMultiplicationAlgorithmSteps(34, 12);
    const last = steps[steps.length - 1]!;
    expect(last.total).toBe("408");
  });
});
