import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { shiftComma } from "@/components/lesson/anim/scenes/coma-potencias10";
import { fromScaled, readDec, trimDec, words } from "@/components/lesson/anim/decimal";
import type { InteractiveLesson, SlideStep } from "@/lib/lesson/types";

const THEME_FIVE_SLUGS = [
  "ordenes-unidades-decimales",
  "operaciones-numeros-decimales",
  "division-numeros-decimales",
] as const;

const THEME_FIVE: InteractiveLesson[] = THEME_FIVE_SLUGS.map((slug) => interactiveLessons[slug]);

describe("lecciones del tema 5 (números decimales)", () => {
  it("son las tres del temario, en orden y en pizarra", () => {
    expect(THEME_FIVE.map((l) => l.slug)).toEqual([...THEME_FIVE_SLUGS]);
    expect(THEME_FIVE.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican la teoría con diapositivas animadas y evalúan con tests de decisión", () => {
    for (const lesson of THEME_FIVE) {
      const slides = lesson.steps.filter((s): s is SlideStep => s.type === "slide");
      expect(slides.length, lesson.slug).toBeGreaterThanOrEqual(3);
      expect(lesson.steps.length, lesson.slug).toBeLessThanOrEqual(10);
      expect(lesson.steps.every((s) => s.type === "slide" || s.type === "predict"), lesson.slug).toBe(true);
      expect(slides.every((s) => s.visual?.kind === "anim"), lesson.slug).toBe(true);
    }
  });

  it("cada pregunta tiene enunciado con contexto, una opción correcta y explica los errores típicos", () => {
    for (const lesson of THEME_FIVE) {
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
    for (const lesson of THEME_FIVE) {
      const ids = lesson.steps.map((s) => s.id);
      expect(new Set(ids).size, lesson.slug).toBe(ids.length);
    }
  });

  it("solo hay ilustración donde explica algo (báscula y rollo de tela)", () => {
    const srcs = THEME_FIVE.flatMap((l) =>
      l.steps
        .filter((s): s is SlideStep => s.type === "slide")
        .flatMap((s) => s.blocks)
        .flatMap((b) => (b.kind === "story" && b.src ? [b.src] : b.kind === "figure" ? [b.src] : [])),
    );
    expect(srcs.sort()).toEqual(["/lesson/decimales/bascula.png", "/lesson/decimales/rollo-tela.png"]);
  });
});

describe("lectura y escritura de decimales", () => {
  it("pone los números en palabras con la concordancia femenina de «unidades» y «milésimas»", () => {
    expect(words(21, true)).toBe("veintiuna");
    expect(words(574, true)).toBe("quinientas setenta y cuatro");
    expect(words(100)).toBe("cien");
    expect(words(375, true)).toBe("trescientas setenta y cinco");
  });

  it("lee los decimales del libro", () => {
    expect(readDec("13,0574")).toBe("trece unidades y quinientas setenta y cuatro diezmilésimas");
    expect(readDec("2,74")).toBe("dos unidades y setenta y cuatro centésimas");
    expect(readDec("0,05")).toBe("cinco centésimas");
    expect(readDec("1,001")).toBe("una unidad y una milésima");
  });

  it("opera con enteros escalados, sin errores de coma flotante", () => {
    expect(fromScaled(1115, 2)).toBe("11,15");
    expect(fromScaled(12, 2)).toBe("0,12");
    expect(trimDec("30,0000")).toBe("30");
    expect(trimDec("4,2000")).toBe("4,2");
  });
});

describe("aritmética de las animaciones del tema 5", () => {
  it("la suma y la resta en columna dan el resultado del libro", () => {
    expect(buildSlideAnim("decimal-columna", { terms: ["4,35", "3,1", "6,22", "5,3"], op: "+" }).label).toContain("= 18,97");
    expect(buildSlideAnim("decimal-columna", { terms: ["18,6", "7,45"], op: "-" }).label).toContain("= 11,15");
    expect(buildSlideAnim("decimal-columna", { terms: ["153,32", "18,55"], op: "-" }).label).toContain("= 134,77");
  });

  it("el producto cuenta las cifras decimales de los dos factores", () => {
    expect(buildSlideAnim("decimal-producto", { terms: ["12,85", "3,5"], places: 2 }).label).toContain("= 44,975");
    expect(buildSlideAnim("decimal-producto", { terms: ["0,4", "0,3"] }).label).toContain("= 0,12");
    expect(buildSlideAnim("decimal-producto", { terms: ["3,52", "5,1"] }).label).toContain("= 17,952");
  });

  it("desplazar la coma equivale a multiplicar o dividir por potencias de 10", () => {
    expect(shiftComma("2,45", "mul", 1)).toBe("24,5");
    expect(shiftComma("2,45", "mul", 2)).toBe("245");
    expect(shiftComma("2,45", "mul", 3)).toBe("2450");
    expect(shiftComma("15,3", "div", 1)).toBe("1,53");
    expect(shiftComma("15,3", "div", 2)).toBe("0,153");
    expect(shiftComma("15,3", "div", 3)).toBe("0,0153");
  });

  it("la división del libro: 35 : 4 = 8,75 exacta y 7,3 : 3 ≈ 2,43 periódica", () => {
    expect(buildSlideAnim("division-decimal", { terms: ["35", "4"], places: 2 }).label).toBe("35 : 4 = 8,75");
    expect(buildSlideAnim("division-decimal", { terms: ["8,5", "5"], places: 2 }).label).toBe("8,5 : 5 = 1,7");
    expect(buildSlideAnim("division-decimal", { terms: ["1", "4"], places: 2 }).label).toBe("1 : 4 = 0,25");
    expect(buildSlideAnim("division-decimal", { terms: ["7,3", "3"], places: 2 }).label).toBe("7,3 : 3 = 2,43…");
  });

  it("dividir entre un decimal es dividir los dos números por el mismo factor", () => {
    expect(buildSlideAnim("division-coma-divisor", { terms: ["7,5", "0,25"] }).label).toBe("7,5 : 0,25 = 750 : 25 = 30");
    expect(buildSlideAnim("division-coma-divisor", { terms: ["90", "2,5"] }).label).toBe("90 : 2,5 = 900 : 25 = 36");
  });

  it("comparar y redondear usan los números pedidos", () => {
    expect(buildSlideAnim("comparar-decimales", { terms: ["5,04", "5,4"] }).label).toBe("Comparar 5,04 y 5,4: 5,04 < 5,4");
    expect(buildSlideAnim("comparar-decimales", { terms: ["2,895", "3,1"] }).label).toContain("2,895 < 3,1");
    expect(buildSlideAnim("redondeo-decimal", { dec: "4,2857" }).label).toContain("a las centésimas 4,29");
    expect(buildSlideAnim("redondeo-decimal", { dec: "4,2857" }).label).toContain("a las décimas 4,3");
  });
});
