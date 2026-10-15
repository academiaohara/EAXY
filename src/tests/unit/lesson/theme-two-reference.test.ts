import { describe, expect, it } from "vitest";
import { potenciasBaseExponenteLesson } from "@/data/lessons/potencias-base-exponente";
import { raizCuadradaNaturalesLesson } from "@/data/lessons/raiz-cuadrada-naturales";
import { stepHasDefinitionBox } from "@/lib/lesson/types";

const THEME_TWO_LESSONS = [potenciasBaseExponenteLesson, raizCuadradaNaturalesLesson];

describe("lecciones de referencia del tema 2", () => {
  it("usa pizarra Manim y cajas de definición en escenas y herramientas", () => {
    for (const lesson of THEME_TWO_LESSONS) {
      expect(lesson.stage?.theme).toBe("board");
      expect(
        lesson.steps
          .filter((step) => step.type === "interactive_tool" || step.type === "narrate")
          .every(stepHasDefinitionBox),
      ).toBe(true);
    }
    expect(
      potenciasBaseExponenteLesson.steps.filter((step) => step.type === "narrate" && step.module === "potencias"),
    ).toHaveLength(4);
    expect(
      raizCuadradaNaturalesLesson.steps.filter(
        (step) => step.type === "narrate" && step.module === "raices-cuadradas",
      ),
    ).toHaveLength(4);
  });

  it("solo incluye potencias y raíz cuadrada (dos lecciones)", () => {
    expect(THEME_TWO_LESSONS.map((l) => l.slug)).toEqual([
      "potencias-base-exponente",
      "raiz-cuadrada-naturales",
    ]);
    expect(THEME_TWO_LESSONS.map((l) => l.steps.length)).toEqual([5, 5]);
  });

  it("no usa respuestas escritas como control", () => {
    for (const lesson of THEME_TWO_LESSONS) {
      expect(lesson.steps.every((step) => step.type !== "fill_in_blank")).toBe(true);
    }
  });
});
