import { describe, expect, it } from "vitest";
import {
  formatMasteryPercent,
  getMasteryQualitativeState,
  MASTERY_STATE_LABELS,
} from "@/lib/mastery/state";

describe("getMasteryQualitativeState", () => {
  it("devuelve not_started sin intentos", () => {
    expect(getMasteryQualitativeState(0, 0)).toBe("not_started");
  });

  it("devuelve struggling con mastery bajo", () => {
    expect(getMasteryQualitativeState(0.2, 3)).toBe("struggling");
  });

  it("devuelve developing en el rango medio-bajo", () => {
    expect(getMasteryQualitativeState(0.55, 2)).toBe("developing");
  });

  it("devuelve proficient en el rango alto", () => {
    expect(getMasteryQualitativeState(0.75, 5)).toBe("proficient");
  });

  it("devuelve mastered con mastery alto", () => {
    expect(getMasteryQualitativeState(0.9, 8)).toBe("mastered");
  });
});

describe("formatMasteryPercent", () => {
  it("formatea mastery como porcentaje entero", () => {
    expect(formatMasteryPercent(0.756)).toBe("76%");
  });
});

describe("MASTERY_STATE_LABELS", () => {
  it("tiene etiqueta en español para cada estado", () => {
    expect(MASTERY_STATE_LABELS.not_started).toBe("Sin empezar");
    expect(MASTERY_STATE_LABELS.mastered).toBe("Dominado");
  });
});
