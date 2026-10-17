import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import type { ExprStep, InteractiveLesson, SlideBlock, SlideStep } from "@/lib/lesson/types";

const THEME_FOUR_SLUGS = [
  "numeros-enteros",
  "suma-resta-enteros",
  "parentesis-enteros",
  "multiplicacion-division-enteros",
] as const;

const THEME_FOUR: InteractiveLesson[] = THEME_FOUR_SLUGS.map((slug) => interactiveLessons[slug]);

/** Evalúa los tokens de una expresión de la animación (−, ·, :, corchetes) con aritmética de JS. */
function evalTokens(tokens: string[]): number {
  const js = tokens
    .join(" ")
    .replaceAll("−", "-")
    .replaceAll("·", "*")
    .replaceAll(":", "/")
    .replaceAll("[", "(")
    .replaceAll("]", ")");
  return new Function(`return (${js});`)() as number;
}

function derivations(): { where: string; steps: ExprStep[] }[] {
  const found: { where: string; steps: ExprStep[] }[] = [];
  for (const lesson of THEME_FOUR) {
    for (const step of lesson.steps) {
      if (step.type !== "slide") {
        continue;
      }
      const visual = (step as SlideStep).visual;
      if (visual?.kind !== "anim" || visual.scene !== "expr-reescritura") {
        continue;
      }
      for (const [key, steps] of [["expr", visual.params?.expr], ["expr2", visual.params?.expr2]] as const) {
        if (steps) {
          found.push({ where: `${lesson.slug}/${step.id}/${key}`, steps });
        }
      }
    }
  }
  return found;
}

describe("lecciones del tema 4 (números enteros)", () => {
  it("son las cuatro del temario, en orden y en pizarra", () => {
    expect(THEME_FOUR.map((l) => l.slug)).toEqual([...THEME_FOUR_SLUGS]);
    expect(THEME_FOUR.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican la teoría con diapositivas y evalúan con tests de decisión, sin respuestas escritas", () => {
    for (const lesson of THEME_FOUR) {
      expect(lesson.steps.filter((s) => s.type === "slide").length).toBeGreaterThanOrEqual(3);
      expect(lesson.steps.length).toBeLessThanOrEqual(10);
      expect(lesson.steps.every((s) => s.type === "slide" || s.type === "predict")).toBe(true);
    }
  });

  it("cada pregunta tiene enunciado con contexto, una opción correcta y explica los errores típicos", () => {
    for (const lesson of THEME_FOUR) {
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
    for (const lesson of THEME_FOUR) {
      const ids = lesson.steps.map((s) => s.id);
      expect(new Set(ids).size, lesson.slug).toBe(ids.length);
    }
  });

  it("las ilustraciones apuntan a public/lesson/enteros", () => {
    const srcs = THEME_FOUR.flatMap((l) =>
      l.steps
        .filter((s): s is SlideStep => s.type === "slide")
        .flatMap((s) => s.blocks as SlideBlock[])
        .flatMap((b) => (b.kind === "story" || b.kind === "figure") && b.src ? [b.src] : []),
    );
    expect(srcs.length).toBe(5);
    expect(srcs.every((src) => src.startsWith("/lesson/enteros/") && src.endsWith(".png"))).toBe(true);
  });

  it("cada paso de una derivación vale lo mismo que el anterior hasta el resultado", () => {
    const all = derivations();
    expect(all.length).toBeGreaterThanOrEqual(6);
    for (const { where, steps } of all) {
      const values = steps.map((s) => evalTokens(s.tokens));
      expect(new Set(values).size, `${where}: ${values.join(" → ")}`).toBe(1);
    }
  });

  it("las derivaciones del libro dan 5 (anidados), −12 (combinadas), −3 y −30", () => {
    const byWhere = Object.fromEntries(derivations().map((d) => [d.where, evalTokens(d.steps[0]!.tokens)]));
    expect(byWhere["parentesis-enteros/anidados/expr"]).toBe(5);
    expect(byWhere["multiplicacion-division-enteros/combinadas/expr"]).toBe(-12);
    expect(byWhere["suma-resta-enteros/varios-numeros/expr"]).toBe(-3);
    expect(byWhere["multiplicacion-division-enteros/regla-signos/expr"]).toBe(-30);
  });
});

describe("aritmética de las animaciones del tema 4", () => {
  it("la suma en la recta y las fichas dan el resultado de las diapositivas", () => {
    expect(buildSlideAnim("suma-recta", { a: -3, b: -8 }).label).toContain("= −11");
    expect(buildSlideAnim("suma-recta", { a: 4, b: -9 }).label).toContain("= −5");
    expect(buildSlideAnim("fichas-opuestos", { a: 4, b: -9 }).label).toContain("= −5");
  });

  it("restar un negativo es sumar su opuesto", () => {
    expect(buildSlideAnim("resta-opuesto", { a: 8, b: -2 }).label).toContain("= 10");
    expect(buildSlideAnim("resta-opuesto", { a: 7, b: 6 }).label).toContain("= 1");
  });

  it("un signo delante del paréntesis actúa sobre todos los términos", () => {
    expect(buildSlideAnim("parentesis-signos", { sign: "+", nums: [3, -6, 5] }).captions.at(-1)).toContain("= 2$");
    expect(buildSlideAnim("parentesis-signos", { sign: "-", nums: [8, -6, -5] }).captions.at(-1)).toContain("= -8 + 6 + 5 = 3$");
  });

  it("el producto y el cociente siguen la regla de los signos", () => {
    const prod = buildSlideAnim("producto-signos", { a: 3, b: 5 });
    expect(prod.captions).toHaveLength(5);
    expect(prod.captions[3]).toContain("ganas 15");
    expect(buildSlideAnim("division-inversa", { a: 4, b: 5 }).captions.at(-1)).toContain("la misma");
  });

  it("el valor absoluto y la comparación usan los números pedidos", () => {
    expect(buildSlideAnim("valor-absoluto", { a: -7, b: 4 }).label).toContain("-7");
    expect(buildSlideAnim("comparar-enteros", { a: -8, b: -20 }).label).toContain("-20 < -8");
    expect(buildSlideAnim("comparar-enteros", { a: 3, b: -2 }).label).toContain("-2 < 3");
  });
});
