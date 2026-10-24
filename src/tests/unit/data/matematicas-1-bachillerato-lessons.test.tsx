import { describe, expect, it } from "vitest";
import { curriculum } from "@/content/curriculum";
import { interactiveLessons as allLessons } from "@/data/lessons";
import type { InteractiveLesson } from "@/lib/lesson/types";

const interactiveLessons = allLessons as Record<string, InteractiveLesson>;

const course = curriculum.courses.find((c) => c.slug === "matematicas-1-bachillerato")!;

describe("Matemáticas 1.º Bachillerato", () => {
  it("el tema 6 (Funciones) tiene 11 lecciones interactivas", () => {
    const mod = course.modules.find((m) => m.slug === "funciones")!;
    expect(mod.orderIndex).toBe(6);
    expect(mod.lessons).toHaveLength(11);
    for (const lesson of mod.lessons) {
      expect(interactiveLessons[lesson.interactiveSlug!]).toBeDefined();
    }
  });

  it("el tema 5 (Geometría) tiene 13 lecciones interactivas", () => {
    const mod = course.modules.find((m) => m.slug === "geometria")!;
    expect(mod.orderIndex).toBe(5);
    expect(mod.lessons).toHaveLength(13);
    for (const lesson of mod.lessons) {
      expect(interactiveLessons[lesson.interactiveSlug!]).toBeDefined();
    }
  });

  it("el tema 4 (Trigonometría) tiene 13 lecciones interactivas", () => {
    const mod = course.modules.find((m) => m.slug === "trigonometria")!;
    expect(mod.orderIndex).toBe(4);
    expect(mod.lessons).toHaveLength(13);
    for (const lesson of mod.lessons) {
      expect(interactiveLessons[lesson.interactiveSlug!]).toBeDefined();
    }
  });

  it("el tema 3 (Sucesiones) tiene 10 lecciones interactivas", () => {
    const mod = course.modules.find((m) => m.slug === "sucesiones")!;
    expect(mod.orderIndex).toBe(3);
    expect(mod.lessons).toHaveLength(10);
    for (const lesson of mod.lessons) {
      expect(interactiveLessons[lesson.interactiveSlug!]).toBeDefined();
    }
  });

  it("el tema 2 (Álgebra) tiene 15 lecciones interactivas", () => {
    const mod = course.modules.find((m) => m.slug === "algebra")!;
    expect(mod.orderIndex).toBe(2);
    expect(mod.lessons).toHaveLength(15);
    for (const lesson of mod.lessons) {
      expect(interactiveLessons[lesson.interactiveSlug!]).toBeDefined();
    }
  });

  it("el tema 1 tiene 15 lecciones interactivas", () => {
    const mod = course.modules.find((m) => m.slug === "numeros-reales-y-complejos")!;
    expect(mod.orderIndex).toBe(1);
    expect(mod.lessons).toHaveLength(15);
    for (const lesson of mod.lessons) {
      expect(lesson.kind).toBe("interactive");
      expect(interactiveLessons[lesson.interactiveSlug!]).toBeDefined();
    }
  });

  it("cada lección tiene al menos 5 pasos y alguna comprobación", () => {
    for (const lesson of course.modules.flatMap((m) => m.lessons)) {
      const steps = interactiveLessons[lesson.interactiveSlug!]!.steps;
      expect(steps.length, lesson.interactiveSlug).toBeGreaterThanOrEqual(5);
      expect(steps.some((s) => s.type === "predict" || s.type === "classify"), lesson.interactiveSlug).toBe(true);
    }
  });

  it("las preguntas de opción tienen una respuesta correcta que existe", () => {
    for (const lesson of course.modules.flatMap((m) => m.lessons)) {
      for (const step of interactiveLessons[lesson.interactiveSlug!]!.steps) {
        if (step.type === "predict" && step.mode === "choice") {
          expect(step.choices?.map((c) => c.id), `${lesson.interactiveSlug}/${step.id}`).toContain(step.correctChoiceId);
        }
        if (step.type === "predict" && step.mode === "numeric") {
          expect(step.correctAnswers?.length, `${lesson.interactiveSlug}/${step.id}`).toBeGreaterThan(0);
        }
      }
    }
  });
});
