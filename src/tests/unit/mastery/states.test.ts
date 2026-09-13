import { describe, expect, it } from "vitest";
import { getMasteryState, MASTERY_STATE_LABELS } from "@/lib/mastery/states";

describe("getMasteryState", () => {
  it("devuelve not_started sin intentos", () => {
    expect(getMasteryState(0, 0)).toBe("not_started");
    expect(getMasteryState(null, 0)).toBe("not_started");
  });

  it("clasifica struggling por debajo de 0.4", () => {
    expect(getMasteryState(0.2, 3)).toBe("struggling");
  });

  it("clasifica developing entre 0.4 y 0.7", () => {
    expect(getMasteryState(0.55, 3)).toBe("developing");
  });

  it("clasifica proficient entre 0.7 y 0.85", () => {
    expect(getMasteryState(0.75, 3)).toBe("proficient");
  });

  it("clasifica mastered a partir de 0.85", () => {
    expect(getMasteryState(0.9, 3)).toBe("mastered");
  });

  it("expone etiquetas en español", () => {
    expect(MASTERY_STATE_LABELS.mastered).toBe("Dominado");
  });
});
