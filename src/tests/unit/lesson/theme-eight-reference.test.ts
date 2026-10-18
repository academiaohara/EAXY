import { describe, expect, it } from "vitest";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, PredictStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const THEME_EIGHT_SLUGS = [
  "operaciones-fracciones-comun-denominador",
  "operaciones-fracciones-suma-resta",
  "operaciones-fracciones-multiplicacion-division",
  "operaciones-fracciones-problemas",
] as const;

const THEME_EIGHT: InteractiveLesson[] = THEME_EIGHT_SLUGS.map((slug) => interactiveLessons[slug]);

function visualsOf(step: SlideStep): SlideBlock[] {
  return [...step.blocks, ...(step.visual ? [step.visual] : [])];
}

describe("lecciones del tema 8 (operaciones con fracciones)", () => {
  it("son las cuatro del temario, en orden y en pizarra", () => {
    expect(THEME_EIGHT.map((l) => l.slug)).toEqual([...THEME_EIGHT_SLUGS]);
    expect(THEME_EIGHT.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican con diapositivas y no quedan pasos `concept` ni `animated_solution`", () => {
    for (const lesson of THEME_EIGHT) {
      expect(lesson.steps.filter((s) => s.type === "slide").length).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.some((s) => s.type === "concept" || s.type === "animated_solution")).toBe(false);
    }
  });

  it("los ejercicios predict tienen enunciado con contexto y explican cada error", () => {
    for (const lesson of THEME_EIGHT) {
      for (const step of lesson.steps.filter((s): s is PredictStep => s.type === "predict")) {
        expect(step.question.length, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(40);
        expect(step.help?.length ?? 0, `${lesson.slug}/${step.id} help`).toBeGreaterThanOrEqual(2);
        const wrong = (step.choices ?? []).filter((c) => c.id !== step.correctChoiceId);
        expect(wrong.length).toBeGreaterThanOrEqual(2);
        expect(wrong.every((c) => (c.incorrectFeedback ?? "").length > 20), `${lesson.slug}/${step.id}`).toBe(true);
        expect(step.explanation, `${lesson.slug}/${step.id}`).toBeTruthy();
      }
    }
  });

  it("no hay más de tres diapositivas de teoría seguidas sin un ejercicio", () => {
    for (const lesson of THEME_EIGHT) {
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, lesson.slug).toBeLessThanOrEqual(3);
      }
    }
  });

  it("cada animación de las lecciones del tema 8 se dibuja en todos sus pasos", () => {
    let count = 0;
    for (const lesson of THEME_EIGHT) {
      for (const step of lesson.steps.filter((s): s is SlideStep => s.type === "slide")) {
        for (const block of visualsOf(step)) {
          if (block.kind !== "anim") {
            continue;
          }
          count += 1;
          const built = buildSlideAnim(block.scene, block.params, block.captions);
          expect(built.captions.length).toBeGreaterThanOrEqual(3);
        }
      }
    }
    expect(count).toBeGreaterThanOrEqual(8);
  });

  it("incluye la herramienta interactiva del producto de fracciones", () => {
    const found = THEME_EIGHT.flatMap((l) => l.steps)
      .filter((s): s is SlideStep => s.type === "slide")
      .flatMap(visualsOf)
      .filter((b) => b.kind === "tool");
    expect(found).toHaveLength(1);
  });
});
