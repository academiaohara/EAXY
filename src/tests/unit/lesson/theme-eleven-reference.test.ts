import { describe, expect, it } from "vitest";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, PredictStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const THEME_ELEVEN_SLUGS = [
  "rectas-y-angulos-rectas",
  "rectas-y-angulos-mediatriz-bisectriz",
  "rectas-y-angulos-angulos",
  "rectas-y-angulos-paralelas",
  "rectas-y-angulos-medida",
  "rectas-y-angulos-poligonos",
] as const;

const THEME_ELEVEN: InteractiveLesson[] = THEME_ELEVEN_SLUGS.map((slug) => interactiveLessons[slug]);

function visualsOf(step: SlideStep): SlideBlock[] {
  return [...step.blocks, ...(step.visual ? [step.visual] : [])];
}

const slidesOf = (lesson: InteractiveLesson) => lesson.steps.filter((s): s is SlideStep => s.type === "slide");

describe("lecciones del tema 11 (rectas y ángulos)", () => {
  it("son las seis del temario, en orden y en pizarra", () => {
    expect(THEME_ELEVEN.map((l) => l.slug)).toEqual([...THEME_ELEVEN_SLUGS]);
    expect(THEME_ELEVEN.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican con diapositivas y no quedan pasos `concept` ni `animated_solution`", () => {
    for (const lesson of THEME_ELEVEN) {
      expect(slidesOf(lesson).length).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.some((s) => s.type === "concept" || s.type === "animated_solution")).toBe(false);
    }
  });

  it("los ejercicios predict tienen enunciado con contexto y explican cada error", () => {
    for (const lesson of THEME_ELEVEN) {
      for (const step of lesson.steps.filter((s): s is PredictStep => s.type === "predict")) {
        expect(step.question.length, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(40);
        const wrong = (step.choices ?? []).filter((c) => c.id !== step.correctChoiceId);
        expect(wrong.length).toBeGreaterThanOrEqual(2);
        expect(wrong.every((c) => (c.incorrectFeedback ?? "").length > 20), `${lesson.slug}/${step.id}`).toBe(true);
        expect(step.explanation, `${lesson.slug}/${step.id}`).toBeTruthy();
      }
    }
  });

  it("todos los pasos con pregunta tienen al menos dos ayudas propias", () => {
    for (const lesson of THEME_ELEVEN) {
      for (const step of lesson.steps) {
        expect(step.help?.length ?? 0, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(step.type === "slide" ? 1 : 2);
      }
    }
  });

  it("no hay más de tres diapositivas de teoría seguidas sin un ejercicio", () => {
    for (const lesson of THEME_ELEVEN) {
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, lesson.slug).toBeLessThanOrEqual(3);
      }
    }
  });

  it("cada animación del tema se dibuja y cuenta lo que hace paso a paso", () => {
    let count = 0;
    for (const lesson of THEME_ELEVEN) {
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
    expect(count).toBeGreaterThanOrEqual(13);
  });

  it("las construcciones con compás y regla tienen animación y herramienta", () => {
    const visuals = slidesOf(interactiveLessons["rectas-y-angulos-mediatriz-bisectriz"]).flatMap(visualsOf);
    const scenes = visuals.flatMap((b) => (b.kind === "anim" ? [b.scene] : []));
    const tools = visuals.flatMap((b) => (b.kind === "tool" ? [b.tool] : []));
    expect(scenes).toEqual(expect.arrayContaining(["mediatriz-compas", "bisectriz-compas"]));
    expect(tools).toEqual(expect.arrayContaining(["compas-mediatriz", "compas-bisectriz"]));
  });

  it("incluye herramientas interactivas en cada lección menos en la de medida", () => {
    for (const lesson of THEME_ELEVEN) {
      const tools = slidesOf(lesson).flatMap(visualsOf).filter((b) => b.kind === "tool");
      expect(tools.length, lesson.slug).toBeGreaterThanOrEqual(1);
    }
  });
});
