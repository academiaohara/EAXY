import { describe, expect, it } from "vitest";
import { curriculum } from "@/content/curriculum";
import { interactiveLessons as allLessons } from "@/data/lessons";
import type { InteractiveLesson } from "@/lib/lesson/types";

const interactiveLessons = allLessons as Record<string, InteractiveLesson>;

const course = curriculum.courses.find((c) => c.slug === "matematicas-ccss-1-bachillerato")!;

const TEMAS: [number, string, number][] = [
  [1, "numeros-reales", 15],
  [2, "matematica-financiera", 7],
  [3, "algebra", 20],
  [4, "funciones", 13],
  [5, "limites-y-continuidad", 13],
  [6, "derivadas", 13],
  [7, "estadistica", 13],
  [8, "probabilidad", 12],
  [9, "combinatoria", 10],
  [10, "distribuciones", 11],
];

describe("Matemáticas Aplicadas a las CCSS I (1.º Bachillerato)", () => {
  it("el curso existe y está entre 1.º Bachillerato y 2.º Bachillerato", () => {
    expect(course).toBeDefined();
    expect(course.title).toBe("Matemáticas Aplicadas a las CCSS I (1º Bachillerato)");
    const orden = curriculum.courses.map((c) => c.slug);
    expect(orden.indexOf("matematicas-ccss-1-bachillerato")).toBe(orden.indexOf("matematicas-1-bachillerato") + 1);
  });

  it.each(TEMAS)("el tema %i (%s) tiene %i lecciones interactivas", (orden, slug, total) => {
    const mod = course.modules.find((m) => m.slug === slug)!;
    expect(mod, slug).toBeDefined();
    expect(mod.orderIndex).toBe(orden);
    expect(mod.lessons).toHaveLength(total);
    for (const lesson of mod.lessons) {
      expect(lesson.kind).toBe("interactive");
      expect(interactiveLessons[lesson.interactiveSlug!], lesson.interactiveSlug).toBeDefined();
    }
  });

  it("el curso tiene diez temas y 127 lecciones", () => {
    expect(course.modules).toHaveLength(10);
    expect(course.modules.flatMap((m) => m.lessons)).toHaveLength(TEMAS.reduce((s, t) => s + t[2], 0));
  });

  it("cada lección tiene al menos 5 pasos, alguna comprobación y su slug", () => {
    for (const lesson of course.modules.flatMap((m) => m.lessons)) {
      const l = interactiveLessons[lesson.interactiveSlug!]!;
      expect(l.slug).toBe(lesson.interactiveSlug);
      expect(l.steps.length, lesson.interactiveSlug).toBeGreaterThanOrEqual(5);
      expect(l.steps.some((s) => s.type === "predict" || s.type === "classify"), lesson.interactiveSlug).toBe(true);
    }
  });

  it("los slugs terminan en -ccss1 y los pasos no repiten id dentro de una lección", () => {
    for (const lesson of course.modules.flatMap((m) => m.lessons)) {
      expect(lesson.interactiveSlug).toMatch(/-ccss1$/);
      const ids = interactiveLessons[lesson.interactiveSlug!]!.steps.map((s) => s.id);
      expect(new Set(ids).size, lesson.interactiveSlug).toBe(ids.length);
    }
  });

  it("el subtítulo de cada lección nombra el tema del curso", () => {
    for (const lesson of course.modules.flatMap((m) => m.lessons)) {
      expect(interactiveLessons[lesson.interactiveSlug!]!.subtitle, lesson.interactiveSlug).toMatch(/^CCSS I \(1\.º Bachillerato\), Tema \d+/);
    }
  });

  it("las preguntas de opción tienen una respuesta correcta que existe y las numéricas aceptan alguna respuesta", () => {
    for (const lesson of course.modules.flatMap((m) => m.lessons)) {
      for (const step of interactiveLessons[lesson.interactiveSlug!]!.steps) {
        if (step.type === "predict" && step.mode === "choice") {
          const ids = step.choices?.map((c) => c.id) ?? [];
          expect(ids, `${lesson.interactiveSlug}/${step.id}`).toContain(step.correctChoiceId);
          expect(new Set(ids).size).toBe(ids.length);
        }
        if (step.type === "predict" && step.mode === "numeric") {
          expect(step.correctAnswers?.length, `${lesson.interactiveSlug}/${step.id}`).toBeGreaterThan(0);
        }
      }
    }
  });
});
