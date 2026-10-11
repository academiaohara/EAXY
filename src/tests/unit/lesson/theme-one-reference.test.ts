import { describe, expect, it } from "vitest";
import { aproximacionRedondeoNaturalesLesson } from "@/data/lessons/aproximacion-redondeo-naturales";
import { divisionOrdenOperacionesNaturalesLesson } from "@/data/lessons/division-orden-operaciones-naturales";
import { multiplicacionDivisionNaturalesLesson } from "@/data/lessons/multiplicacion-division-naturales";
import { sistemasNumeracionNaturalesLesson } from "@/data/lessons/sistemas-numeracion-naturales";
import { sumaRestaNaturalesLesson } from "@/data/lessons/suma-resta-naturales";
import {
  stepHasDefinitionBox,
  type InteractiveLesson,
} from "@/lib/lesson/types";

const THEME_ONE_LESSONS: InteractiveLesson[] = [
  sistemasNumeracionNaturalesLesson,
  aproximacionRedondeoNaturalesLesson,
  sumaRestaNaturalesLesson,
  multiplicacionDivisionNaturalesLesson,
  divisionOrdenOperacionesNaturalesLesson,
];

describe("lecciones de referencia del tema 1", () => {
  it("numeración usa pizarra y cajas de definición como la lección de multiplicación", () => {
    expect(sistemasNumeracionNaturalesLesson.stage?.theme).toBe("board");
    expect(multiplicacionDivisionNaturalesLesson.stage?.theme).toBe("board");
    expect(
      sistemasNumeracionNaturalesLesson.steps.every(stepHasDefinitionBox),
    ).toBe(true);
  });

  it("mantienen pocas diapositivas y no usan respuestas escritas como control", () => {
    expect(THEME_ONE_LESSONS.map((lesson) => lesson.steps.length)).toEqual([
      4, 4, 4, 6, 5,
    ]);

    for (const lesson of THEME_ONE_LESSONS) {
      expect(lesson.steps.every((step) => step.type !== "fill_in_blank")).toBe(
        true,
      );
    }
  });

  it("reserva las preguntas tipo test para decisiones matemáticas con contexto", () => {
    const checks = THEME_ONE_LESSONS.flatMap((lesson) =>
      lesson.steps.filter((step) => step.type === "predict"),
    );

    expect(checks.length).toBeGreaterThan(0);
    expect(
      checks.every((step) => step.choices && step.choices.length >= 2),
    ).toBe(true);
    expect(checks.every((step) => step.question.length >= 40)).toBe(true);
  });

  it("mantiene el redondeo dentro de su lección y no lo duplica en numeración", () => {
    expect(
      sistemasNumeracionNaturalesLesson.steps.some(
        (step) =>
          step.type === "interactive_tool" &&
          "scene" in step &&
          step.scene.startsWith("redondeo"),
      ),
    ).toBe(false);
    expect(
      aproximacionRedondeoNaturalesLesson.steps.some(
        (step) => step.id === "293518",
      ),
    ).toBe(true);
  });
});
