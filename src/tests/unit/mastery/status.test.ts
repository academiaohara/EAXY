import { describe, expect, it } from "vitest";
import {
  formatMasteryPercent,
  getMasteryStatus,
  getMasteryStatusLabel,
} from "@/lib/mastery/status";

describe("getMasteryStatus", () => {
  it("marca not_started sin intentos", () => {
    expect(getMasteryStatus(0, false)).toBe("not_started");
  });

  it("clasifica struggling por debajo de 0.4", () => {
    expect(getMasteryStatus(0.3, true)).toBe("struggling");
  });

  it("clasifica developing entre 0.4 y 0.7", () => {
    expect(getMasteryStatus(0.55, true)).toBe("developing");
  });

  it("clasifica proficient entre 0.7 y 0.85", () => {
    expect(getMasteryStatus(0.75, true)).toBe("proficient");
  });

  it("clasifica mastered a partir de 0.85", () => {
    expect(getMasteryStatus(0.9, true)).toBe("mastered");
  });
});

describe("mastery labels", () => {
  it("formatea porcentaje redondeado", () => {
    expect(formatMasteryPercent(0.756)).toBe("76%");
  });

  it("expone etiquetas en español", () => {
    expect(getMasteryStatusLabel("developing")).toBe("En progreso");
  });
});
