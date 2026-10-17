import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { factorize, gcd, lcm } from "@/components/lesson/anim/number-theory";
import type { InteractiveLesson, SlideStep } from "@/lib/lesson/types";

const THEME_THREE_SLUGS = [
  "divisibilidad",
  "criterios-divisibilidad",
  "factores-primos",
  "minimo-comun-multiplo",
  "maximo-comun-divisor",
] as const;

const THEME_THREE: InteractiveLesson[] = THEME_THREE_SLUGS.map((slug) => interactiveLessons[slug]);

describe("lecciones del tema 3 (divisibilidad)", () => {
  it("son las cinco del temario, en orden y en pizarra", () => {
    expect(THEME_THREE.map((l) => l.slug)).toEqual([...THEME_THREE_SLUGS]);
    expect(THEME_THREE.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican la teoría con diapositivas y evalúan con tests de decisión, sin respuestas escritas", () => {
    for (const lesson of THEME_THREE) {
      expect(lesson.steps.filter((s) => s.type === "slide").length).toBeGreaterThanOrEqual(3);
      expect(lesson.steps.length).toBeLessThanOrEqual(10);
      expect(lesson.steps.every((s) => s.type === "slide" || s.type === "predict")).toBe(true);
    }
  });

  it("cada pregunta tiene enunciado con contexto, una opción correcta y explica los errores típicos", () => {
    for (const lesson of THEME_THREE) {
      for (const step of lesson.steps) {
        if (step.type !== "predict") {
          continue;
        }
        const where = `${lesson.slug}/${step.id}`;
        expect(step.question.length, where).toBeGreaterThanOrEqual(40);
        expect(step.choices?.some((c) => c.id === step.correctChoiceId), where).toBe(true);
        const wrong = (step.choices ?? []).filter((c) => c.id !== step.correctChoiceId);
        expect(wrong.length, where).toBeGreaterThanOrEqual(3);
        expect(wrong.every((c) => Boolean(c.incorrectFeedback)), where).toBe(true);
        expect(step.explanation, where).toBeTruthy();
      }
    }
  });

  it("no lleva ilustraciones decorativas: lo visual son animaciones", () => {
    const decorative = THEME_THREE.flatMap((l) =>
      l.steps
        .filter((s): s is SlideStep => s.type === "slide")
        .flatMap((s) => s.blocks)
        .filter((b) => b.kind === "story" || b.kind === "figure"),
    );
    expect(decorative).toEqual([]);
  });
});

describe("aritmética de las animaciones del tema 3", () => {
  it("factoriza, m.c.d. y m.c.m. dan lo que dicen las diapositivas", () => {
    expect(factorize(360)).toEqual([[2, 3], [3, 2], [5, 1]]);
    expect(factorize(320)).toEqual([[2, 6], [5, 1]]);
    expect(gcd(24, 36)).toBe(12);
    expect(lcm(4, 6)).toBe(12);
    expect([16, 24, 320].reduce(gcd)).toBe(8);
    expect([16, 24, 320].reduce(lcm)).toBe(960);
  });

  it("la tabla de exponentes calcula el m.c.m. y el m.c.d. del libro", () => {
    const nums = [16, 24, 320];
    expect(buildSlideAnim("tabla-exponentes", { nums, mode: "mcm" }).captions.at(-1)).toContain("960");
    expect(buildSlideAnim("tabla-exponentes", { nums, mode: "mcd" }).captions.at(-1)).toContain("= 8");
  });

  it("la criba encuentra los 15 primos hasta 50", () => {
    expect(buildSlideAnim("criba-eratostenes", { n: 50 }).captions.at(-1)).toContain("15 primos");
  });

  it("descomposicion-primos descompone 180 como 2² · 3² · 5", () => {
    expect(buildSlideAnim("descomposicion-primos", { n: 180 }).label).toContain("2² · 3² · 5");
  });
});
