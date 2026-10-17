import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";

const sistemasNumeracionNaturalesLesson =
  interactiveLessons["sistemas-numeracion-naturales"];
const sumaRestaNaturalesLesson = interactiveLessons["suma-resta-naturales"];
const multiplicacionDivisionNaturalesLesson =
  interactiveLessons["multiplicacion-division-naturales"];
const divisionOrdenOperacionesNaturalesLesson =
  interactiveLessons["division-orden-operaciones-naturales"];
import {
  stepHasDefinitionBox,
  type InteractiveLesson,
} from "@/lib/lesson/types";

const THEME_ONE_LESSONS: InteractiveLesson[] = [
  sistemasNumeracionNaturalesLesson,
  sumaRestaNaturalesLesson,
  multiplicacionDivisionNaturalesLesson,
  divisionOrdenOperacionesNaturalesLesson,
];

describe("lecciones de referencia del tema 1", () => {
  it("numeración usa pizarra y cajas de definición como la lección de multiplicación", () => {
    expect(sistemasNumeracionNaturalesLesson.stage?.theme).toBe("board");
    expect(multiplicacionDivisionNaturalesLesson.stage?.theme).toBe("board");
    expect(
      sistemasNumeracionNaturalesLesson.steps.filter((step) => step.type === "interactive_tool").every(
        stepHasDefinitionBox,
      ),
    ).toBe(true);
  });

  it("la lección 1 unifica origen, sistemas y redondeo del temario", () => {
    const ids = sistemasNumeracionNaturalesLesson.steps.map((step) => step.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "origen-contar",
        "sistema-egipcio",
        "sistema-romano",
        "sistemas-historia-juego",
        "decimal-canje",
        "decimal-posicion",
        "redondeo-regla",
        "redondeo-practica-24963",
      ]),
    );
    expect(
      sistemasNumeracionNaturalesLesson.steps.some(
        (step) =>
          step.type === "interactive_tool" &&
          "scene" in step &&
          step.scene.startsWith("redondeo"),
      ),
    ).toBe(true);
  });

  it("la teoría nueva se explica con diapositivas de bloques y animaciones", () => {
    for (const lesson of THEME_ONE_LESSONS) {
      const slides = lesson.steps.filter((step) => step.type === "slide");
      expect(slides.length).toBeGreaterThan(0);
    }
  });

  it("mantienen pocas diapositivas y no usan respuestas escritas como control", () => {
    for (const lesson of THEME_ONE_LESSONS) {
      expect(lesson.steps.length).toBeLessThanOrEqual(10);
    }

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
});
