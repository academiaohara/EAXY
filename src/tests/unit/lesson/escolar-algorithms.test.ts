import { describe, expect, it } from "vitest";
import {
  buildDivisionManoGuidedSteps,
  buildMultiplicationAlgorithmSteps,
} from "@/components/lesson/stage/modules/mul-div-naturales/escolar-algorithms";

describe("escolar-algorithms", () => {
  it("genera cociente 25 para 150 : 6", () => {
    const steps = buildDivisionManoGuidedSteps(150, 6);
    expect(steps).toHaveLength(5);
    const last = steps[steps.length - 1]!;
    expect(last.quotientDigits).toBe("25");
    expect(last.caption).toMatch(/Comprobación/i);
  });

  it("genera producto 408 para 34 × 12", () => {
    const steps = buildMultiplicationAlgorithmSteps(34, 12);
    expect(steps).toHaveLength(4);
    const last = steps[steps.length - 1]!;
    expect(last.total).toBe("408");
    expect(last.rows[2]?.text).toBe("408");
    expect(steps[0]?.highlightMultiplierDigitIndex).toBe(1);
  });
});
