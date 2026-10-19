import { describe, expect, it } from "vitest";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { interactiveLessons } from "@/data/lessons";
import type { InteractiveLesson, PredictStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const T14 = [
  "tablas-graficas-coordenadas-cartesianas",
  "tablas-graficas-informacion-puntos",
  "tablas-graficas-interpretacion-graficas",
  "tablas-graficas-distribuciones-estadisticas",
  "tablas-graficas-parametros-estadisticos",
  "tablas-graficas-graficos-estadisticos",
] as const;
const T15 = [
  "probabilidad-experimento-aleatorio-determinista",
  "probabilidad-espacio-muestral",
  "probabilidad-sucesos-seguro-imposible",
  "probabilidad-frecuencias",
  "probabilidad-laplace",
] as const;

const lessons = (slugs: readonly (keyof typeof interactiveLessons)[]): InteractiveLesson[] => slugs.map((s) => interactiveLessons[s]);
const visualsOf = (step: SlideStep): SlideBlock[] => [...step.blocks, ...(step.visual ? [step.visual] : [])];
const slidesOf = (lesson: InteractiveLesson) => lesson.steps.filter((s): s is SlideStep => s.type === "slide");

describe.each([
  ["14 (tablas y gráficas)", lessons(T14), 6, 8],
  ["15 (probabilidad)", lessons(T15), 5, 7],
] as const)("lecciones del tema %s", (_name, list, count, minAnims) => {
  it("son las del temario, numeradas y en pizarra", () => {
    expect(list).toHaveLength(count);
    expect(list.map((l) => l.title.charAt(0))).toEqual(Array.from({ length: count }, (_, i) => String(i + 1)));
    expect(list.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican con diapositivas y no quedan pasos `concept` ni `animated_solution`", () => {
    for (const lesson of list) {
      expect(slidesOf(lesson).length, lesson.slug).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.some((s) => s.type === "concept" || s.type === "animated_solution" || s.type === "interactive_tool"), lesson.slug).toBe(false);
    }
  });

  it("cada animación cuenta lo que hace en al menos tres pasos", () => {
    let anims = 0;
    for (const lesson of list) {
      for (const step of slidesOf(lesson)) {
        for (const block of visualsOf(step)) {
          if (block.kind === "anim") {
            anims += 1;
            expect(buildSlideAnim(block.scene, block.params, block.captions).captions.length, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(3);
          }
        }
      }
    }
    expect(anims).toBeGreaterThanOrEqual(minAnims);
  });

  it("los ejercicios predict tienen contexto y explican cada error", () => {
    for (const lesson of list) {
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
    for (const lesson of list) {
      for (const step of lesson.steps) {
        expect(step.help?.length ?? 0, `${lesson.slug}/${step.id}`).toBeGreaterThanOrEqual(step.type === "slide" ? 1 : 2);
      }
    }
  });

  it("no hay más de tres diapositivas seguidas sin un ejercicio", () => {
    for (const lesson of list) {
      let run = 0;
      for (const step of lesson.steps) {
        run = step.type === "slide" ? run + 1 : 0;
        expect(run, lesson.slug).toBeLessThanOrEqual(3);
      }
    }
  });
});

describe("herramientas de los temas 14 y 15", () => {
  it("cada tema tiene herramientas interactivas", () => {
    const tools = (l: InteractiveLesson[]) => l.flatMap(slidesOf).flatMap(visualsOf).filter((b) => b.kind === "tool");
    expect(tools(lessons(T14)).length).toBeGreaterThanOrEqual(3);
    expect(tools(lessons(T15)).length).toBeGreaterThanOrEqual(2);
  });
});
