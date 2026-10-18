import { describe, expect, it } from "vitest";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, PredictStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const THEME_TEN_SLUGS = [
  "algebra-letras-numeros",
  "algebra-expresiones-monomios",
  "algebra-ecuaciones",
  "algebra-tecnicas-ecuaciones",
  "algebra-resolucion-primer-grado",
  "algebra-problemas-ecuaciones",
] as const;

const THEME_TEN: InteractiveLesson[] = THEME_TEN_SLUGS.map((slug) => interactiveLessons[slug]);

function visualsOf(step: SlideStep): SlideBlock[] {
  return [...step.blocks, ...(step.visual ? [step.visual] : [])];
}

describe("lecciones del tema 10 (álgebra)", () => {
  it("son las seis del temario, en orden y en pizarra", () => {
    expect(THEME_TEN.map((l) => l.slug)).toEqual([...THEME_TEN_SLUGS]);
    expect(THEME_TEN.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican con diapositivas y no quedan pasos `concept` ni `animated_solution`", () => {
    for (const lesson of THEME_TEN) {
      expect(lesson.steps.filter((s) => s.type === "slide").length).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.some((s) => s.type === "concept" || s.type === "animated_solution")).toBe(false);
    }
  });

  it("los ejercicios predict tienen enunciado con contexto y explican cada error", () => {
    for (const lesson of THEME_TEN) {
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

  it("todos los ejercicios tienen ayuda propia", () => {
    for (const lesson of THEME_TEN) {
      for (const step of lesson.steps.filter((s) => s.type !== "slide")) {
        expect(step.help?.length ?? 0, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("no hay más de tres diapositivas de teoría seguidas sin un ejercicio", () => {
    for (const lesson of THEME_TEN) {
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, lesson.slug).toBeLessThanOrEqual(3);
      }
    }
  });

  it("cada animación del tema se dibuja en todos sus pasos", () => {
    let count = 0;
    for (const lesson of THEME_TEN) {
      for (const step of lesson.steps.filter((s): s is SlideStep => s.type === "slide")) {
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
    expect(count).toBeGreaterThanOrEqual(19);
  });

  it("la teoría que antes era solo texto también lleva animación", () => {
    const scenes = new Set(
      THEME_TEN.flatMap((l) => l.steps)
        .filter((s): s is SlideStep => s.type === "slide")
        .flatMap(visualsOf)
        .flatMap((b) => (b.kind === "anim" ? [b.scene] : [])),
    );
    for (const scene of [
      "letras-valores",
      "enunciado-expresion",
      "campo-perimetro-area",
      "monomio-partes",
      "monomio-producto",
      "monomio-cociente",
      "ecuacion-identidad",
      "comprobar-solucion",
      "pasos-problema",
    ]) {
      expect(scenes.has(scene as never), scene).toBe(true);
    }
  });

  it("incluye las dos herramientas interactivas del tema", () => {
    const tools = THEME_TEN.flatMap((l) => l.steps)
      .filter((s): s is SlideStep => s.type === "slide")
      .flatMap(visualsOf)
      .filter((b): b is Extract<SlideBlock, { kind: "tool" }> => b.kind === "tool")
      .map((b) => b.tool);
    expect(tools.sort()).toEqual(["balanza-explorador", "valor-numerico"]);
  });

  it("las balanzas del tema tienen solución entera", () => {
    for (const lesson of THEME_TEN) {
      for (const step of lesson.steps.filter((s): s is SlideStep => s.type === "slide")) {
        for (const block of visualsOf(step)) {
          if (block.kind === "anim" && block.scene === "balanza-ecuacion") {
            const { a = 1, b = 0, c = 0, sign } = block.params ?? {};
            const total = sign === "-" ? c + b : c - b;
            expect(total % (sign === "-" ? 1 : a), `${lesson.slug}/${step.id}`).toBe(0);
          }
        }
      }
    }
  });
});
