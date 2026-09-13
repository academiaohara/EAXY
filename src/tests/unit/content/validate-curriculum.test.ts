import { describe, expect, it } from "vitest";
import { curriculum, validateCurriculum } from "@/content";

describe("validateCurriculum", () => {
  it("valida el catálogo principal sin errores", () => {
    expect(validateCurriculum(curriculum)).toEqual([]);
  });

  it("incluye al menos 12 conceptos y 30 ejercicios", () => {
    expect(curriculum.concepts.length).toBeGreaterThanOrEqual(12);
    expect(curriculum.exercises.length).toBeGreaterThanOrEqual(30);
  });
});
