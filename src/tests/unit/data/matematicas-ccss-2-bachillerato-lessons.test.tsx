import { describe, expect, it } from "vitest";
import { curriculum } from "@/content/curriculum";
import { interactiveLessons as allLessons } from "@/data/lessons";
import type { InteractiveLesson } from "@/lib/lesson/types";

const interactiveLessons = allLessons as Record<string, InteractiveLesson>;

const course = curriculum.courses.find((c) => c.slug === "matematicas-ccss-2-bachillerato")!;

/** [orden, slug del tema, nº de lecciones] */
const TEMAS: [number, string, number][] = [
  [1, "matrices", 12],
  [2, "sistemas-de-ecuaciones", 12],
  [3, "programacion-lineal", 12],
  [4, "limites-y-continuidad", 12],
  [5, "derivadas", 12],
  [6, "integrales", 12],
];

const lessons = () => course.modules.flatMap((m) => m.lessons);

describe("Matemáticas CCSS II (2.º Bachillerato)", () => {
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

  it("el curso tiene los temas y lecciones esperados", () => {
    expect(course.modules).toHaveLength(TEMAS.length);
    expect(lessons()).toHaveLength(TEMAS.reduce((s, t) => s + t[2], 0));
  });

  it("cada lección tiene al menos 5 pasos, alguna comprobación y su slug", () => {
    for (const lesson of lessons()) {
      const l = interactiveLessons[lesson.interactiveSlug!]!;
      expect(l.slug).toBe(lesson.interactiveSlug);
      expect(l.steps.length, lesson.interactiveSlug).toBeGreaterThanOrEqual(5);
      expect(l.steps.some((s) => s.type === "predict" || s.type === "classify"), lesson.interactiveSlug).toBe(true);
    }
  });

  it("los slugs terminan en -ccss2 y los pasos no repiten id dentro de una lección", () => {
    for (const lesson of lessons()) {
      expect(lesson.interactiveSlug).toMatch(/-ccss2$/);
      const ids = interactiveLessons[lesson.interactiveSlug!]!.steps.map((s) => s.id);
      expect(new Set(ids).size, lesson.interactiveSlug).toBe(ids.length);
    }
  });

  it("el subtítulo de cada lección nombra el tema del curso", () => {
    for (const lesson of lessons()) {
      expect(interactiveLessons[lesson.interactiveSlug!]!.subtitle, lesson.interactiveSlug).toMatch(/^CCSS II \(2\.º Bachillerato\), Tema \d+/);
    }
  });

  it("las preguntas de opción tienen una respuesta correcta que existe y las numéricas aceptan alguna respuesta", () => {
    for (const lesson of lessons()) {
      for (const step of interactiveLessons[lesson.interactiveSlug!]!.steps) {
        if (step.type === "predict" && step.mode === "choice") {
          const ids = step.choices?.map((c) => c.id) ?? [];
          expect(ids, `${lesson.interactiveSlug}/${step.id}`).toContain(step.correctChoiceId);
          expect(new Set(ids).size).toBe(ids.length);
        }
        if (step.type === "predict" && step.mode === "numeric") {
          expect(step.correctAnswers?.length, `${lesson.interactiveSlug}/${step.id}`).toBeGreaterThan(0);
        }
        if (step.type === "classify") {
          const grupos = step.groups.map((g) => g.id);
          for (const item of step.items) {
            expect(grupos, `${lesson.interactiveSlug}/${step.id}`).toContain(item.group);
          }
        }
      }
    }
  });
});
