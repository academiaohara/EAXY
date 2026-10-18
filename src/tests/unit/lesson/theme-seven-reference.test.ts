import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, SlideStep } from "@/lib/lesson/types";

const THEME_SEVEN_SLUGS = [
  "fracciones-parte-unidad",
  "fracciones-operador",
  "fracciones-decimales",
  "fracciones-equivalentes",
  "fracciones-problemas",
] as const;

const THEME_SEVEN: InteractiveLesson[] = THEME_SEVEN_SLUGS.map((slug) => interactiveLessons[slug]);

describe("lecciones del tema 7 (fracciones)", () => {
  it("son las cinco del temario, en orden y en pizarra", () => {
    expect(THEME_SEVEN.map((l) => l.slug)).toEqual([...THEME_SEVEN_SLUGS]);
    expect(THEME_SEVEN.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican la teoría con diapositivas y practican con predict o manipulables", () => {
    for (const lesson of THEME_SEVEN) {
      const slides = lesson.steps.filter((s): s is SlideStep => s.type === "slide");
      expect(slides.length, lesson.slug).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.length, lesson.slug).toBeLessThanOrEqual(12);
      for (const step of lesson.steps) {
        expect(["slide", "predict", "fraction_pick", "classify"], `${lesson.slug}/${step.id}`).toContain(step.type);
      }
      // Tras la teoría hay práctica: nunca más de tres diapositivas seguidas.
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, `${lesson.slug}/${step.id}`).toBeLessThanOrEqual(3);
      }
    }
  });

  it("cada predict tiene contexto, una opción correcta y explica los errores típicos", () => {
    for (const lesson of THEME_SEVEN) {
      for (const step of lesson.steps) {
        if (step.type !== "predict") {
          continue;
        }
        const where = `${lesson.slug}/${step.id}`;
        expect(step.question.length, where).toBeGreaterThanOrEqual(40);
        expect(step.choices?.some((c) => c.id === step.correctChoiceId), where).toBe(true);
        expect(new Set(step.choices?.map((c) => c.id)).size, where).toBe(step.choices?.length);
        const wrong = (step.choices ?? []).filter((c) => c.id !== step.correctChoiceId);
        expect(wrong.length, where).toBeGreaterThanOrEqual(3);
        expect(wrong.every((c) => Boolean(c.incorrectFeedback)), where).toBe(true);
        expect(step.explanation, where).toBeTruthy();
      }
    }
  });

  it("los ids de los pasos no se repiten dentro de una lección", () => {
    for (const lesson of THEME_SEVEN) {
      const ids = lesson.steps.map((s) => s.id);
      expect(new Set(ids).size, lesson.slug).toBe(ids.length);
    }
  });

  it("solo hay dos ilustraciones, las que anclan algo real (panes y bidón)", () => {
    const srcs = THEME_SEVEN.flatMap((l) =>
      l.steps
        .filter((s): s is SlideStep => s.type === "slide")
        .flatMap((s) => [...s.blocks, ...(s.visual ? [s.visual] : [])])
        .flatMap((b) => ("src" in b && b.src ? [b.src] : [])),
    );
    expect([...srcs].sort()).toEqual(["/lesson/fracciones/bidon.png", "/lesson/fracciones/panes-egipcios.png"]);
  });
});
