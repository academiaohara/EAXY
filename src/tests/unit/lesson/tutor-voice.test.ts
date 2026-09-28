import { describe, expect, it } from "vitest";
import { plainTextForTutorVoice } from "@/lib/lesson/tutor-voice";

describe("plainTextForTutorVoice", () => {
  it("quita las negritas", () => {
    expect(plainTextForTutorVoice("Mira la **solución** del sistema.")).toBe(
      "Mira la solución del sistema.",
    );
  });

  it("lee variables y números dentro de fórmulas inline", () => {
    expect(plainTextForTutorVoice("Sustituye $x = 1.5$ en la ecuación.")).toBe(
      "Sustituye equis igual a 1.5 en la ecuación.",
    );
  });

  it("deja el texto normal intacto", () => {
    expect(plainTextForTutorVoice("¡Muy bien! Lo has clavado.")).toBe(
      "¡Muy bien! Lo has clavado.",
    );
  });
});
