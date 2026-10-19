import { describe, expect, it } from "vitest";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, PredictStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const NEW_SLUGS = [
  "figuras-geometricas-triangulos",
  "figuras-geometricas-cuadrilateros",
  "figuras-geometricas-poligonos-regulares",
  "figuras-geometricas-circunferencia",
] as const;

const NEW_LESSONS: InteractiveLesson[] = NEW_SLUGS.map((slug) => interactiveLessons[slug]);

const visualsOf = (step: SlideStep): SlideBlock[] => [...step.blocks, ...(step.visual ? [step.visual] : [])];
const slidesOf = (lesson: InteractiveLesson) => lesson.steps.filter((s): s is SlideStep => s.type === "slide");

describe("lecciones nuevas del tema 12 (figuras geométricas)", () => {
  it("son las cuatro de figuras planas, en pizarra y numeradas del 1 al 4", () => {
    expect(NEW_LESSONS.map((l) => l.slug)).toEqual([...NEW_SLUGS]);
    expect(NEW_LESSONS.every((l) => l.stage?.theme === "board")).toBe(true);
    expect(NEW_LESSONS.map((l) => l.title.charAt(0))).toEqual(["1", "2", "3", "4"]);
  });

  it("explican con diapositivas y no quedan pasos `concept`", () => {
    for (const lesson of NEW_LESSONS) {
      expect(slidesOf(lesson).length).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.some((s) => s.type === "concept" || s.type === "animated_solution")).toBe(false);
    }
  });

  it("cada lección incluye al menos una herramienta interactiva", () => {
    for (const lesson of NEW_LESSONS) {
      const tools = slidesOf(lesson).flatMap(visualsOf).filter((b) => b.kind === "tool");
      expect(tools.length, lesson.slug).toBeGreaterThanOrEqual(1);
    }
  });

  it("cada animación se construye y cuenta lo que hace en al menos tres pasos", () => {
    let count = 0;
    for (const lesson of NEW_LESSONS) {
      for (const step of slidesOf(lesson)) {
        for (const block of visualsOf(step)) {
          if (block.kind !== "anim") {
            continue;
          }
          count += 1;
          const built = buildSlideAnim(block.scene, block.params, block.captions);
          expect(built.captions.length, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(3);
        }
      }
    }
    expect(count).toBeGreaterThanOrEqual(9);
  });

  it("los ejercicios predict tienen enunciado con contexto y explican cada error", () => {
    for (const lesson of NEW_LESSONS) {
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
    for (const lesson of NEW_LESSONS) {
      for (const step of lesson.steps) {
        expect(step.help?.length ?? 0, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(step.type === "slide" ? 1 : 2);
      }
    }
  });

  it("no hay más de tres diapositivas de teoría seguidas sin un ejercicio", () => {
    for (const lesson of NEW_LESSONS) {
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, lesson.slug).toBeLessThanOrEqual(3);
      }
    }
  });
});

describe("lecciones de sólidos del tema 12", () => {
  it("siguen a las figuras planas, numeradas del 5 al 8", () => {
    const slugs = ["cuerpos-geometricos-poliedros", "cuerpos-geometricos-prismas", "cuerpos-geometricos-piramides", "cuerpos-geometricos-redondos"] as const;
    const titles = slugs.map((slug) => interactiveLessons[slug].title.charAt(0));
    expect(titles).toEqual(["5", "6", "7", "8"]);
  });

  it("los cuerpos de revolución se explican con la animación del giro", () => {
    const scenes = slidesOf(interactiveLessons["cuerpos-geometricos-redondos"])
      .flatMap(visualsOf)
      .flatMap((b) => (b.kind === "anim" ? [b.scene] : []));
    expect(scenes).toContain("revolucion-giro");
  });
});
