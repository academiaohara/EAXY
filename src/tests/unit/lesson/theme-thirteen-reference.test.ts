import { describe, expect, it } from "vitest";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, PredictStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const SLUGS = ["areas-cuadrilateros", "areas-triangulo", "areas-poligonos", "areas-circulo"] as const;
const LESSONS: InteractiveLesson[] = SLUGS.map((slug) => interactiveLessons[slug]);

const visualsOf = (step: SlideStep): SlideBlock[] => [...step.blocks, ...(step.visual ? [step.visual] : [])];
const slidesOf = (lesson: InteractiveLesson) => lesson.steps.filter((s): s is SlideStep => s.type === "slide");

describe("lecciones del tema 13 (áreas y perímetros)", () => {
  it("son las cuatro del temario, en orden y en pizarra", () => {
    expect(LESSONS.map((l) => l.slug)).toEqual([...SLUGS]);
    expect(LESSONS.every((l) => l.stage?.theme === "board")).toBe(true);
    expect(LESSONS.map((l) => l.title.charAt(0))).toEqual(["1", "2", "3", "4"]);
  });

  it("explican con diapositivas y no quedan pasos `concept` ni `animated_solution`", () => {
    for (const lesson of LESSONS) {
      expect(slidesOf(lesson).length).toBeGreaterThanOrEqual(3);
      expect(lesson.steps.some((s) => s.type === "concept" || s.type === "animated_solution")).toBe(false);
    }
  });

  it("cada lección tiene animaciones y al menos una herramienta interactiva", () => {
    for (const lesson of LESSONS) {
      const visuals = slidesOf(lesson).flatMap(visualsOf);
      expect(visuals.filter((b) => b.kind === "anim").length, lesson.slug).toBeGreaterThanOrEqual(2);
      expect(visuals.filter((b) => b.kind === "tool").length, lesson.slug).toBeGreaterThanOrEqual(1);
    }
  });

  it("cada animación se construye y cuenta lo que hace en al menos tres pasos", () => {
    let count = 0;
    for (const lesson of LESSONS) {
      for (const step of slidesOf(lesson)) {
        for (const block of visualsOf(step)) {
          if (block.kind !== "anim") {
            continue;
          }
          count += 1;
          expect(buildSlideAnim(block.scene, block.params, block.captions).captions.length, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(3);
        }
      }
    }
    expect(count).toBeGreaterThanOrEqual(12);
  });

  it("los ejercicios predict tienen enunciado con contexto y explican cada error", () => {
    for (const lesson of LESSONS) {
      for (const step of lesson.steps.filter((s): s is PredictStep => s.type === "predict")) {
        expect(step.question.length, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(40);
        const wrong = (step.choices ?? []).filter((c) => c.id !== step.correctChoiceId);
        expect(wrong.length).toBeGreaterThanOrEqual(2);
        expect(wrong.every((c) => (c.incorrectFeedback ?? "").length > 20), `${lesson.slug}/${step.id}`).toBe(true);
        expect(step.explanation, `${lesson.slug}/${step.id}`).toBeTruthy();
      }
    }
  });

  it("todos los pasos tienen ayuda propia (dos en los ejercicios)", () => {
    for (const lesson of LESSONS) {
      for (const step of lesson.steps) {
        expect(step.help?.length ?? 0, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(step.type === "slide" ? 1 : 2);
      }
    }
  });

  it("no hay más de tres diapositivas de teoría seguidas sin un ejercicio", () => {
    for (const lesson of LESSONS) {
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, lesson.slug).toBeLessThanOrEqual(3);
      }
    }
  });
});
