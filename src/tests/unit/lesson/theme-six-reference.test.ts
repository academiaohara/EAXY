import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { cellsToText, digitCells } from "@/components/lesson/anim/scenes/tabla-unidades";
import { groupDec, unitIndex } from "@/components/lesson/anim/units";
import type { InteractiveLesson, SlideStep } from "@/lib/lesson/types";

const THEME_SIX_SLUGS = [
  "sistema-metrico-magnitudes",
  "sistema-metrico-longitud",
  "sistema-metrico-capacidad",
  "sistema-metrico-peso",
  "sistema-metrico-superficie",
] as const;

const THEME_SIX: InteractiveLesson[] = THEME_SIX_SLUGS.map((slug) => interactiveLessons[slug]);

describe("lecciones del tema 6 (sistema métrico decimal)", () => {
  it("son las cinco del temario, en orden y en pizarra", () => {
    expect(THEME_SIX.map((l) => l.slug)).toEqual([...THEME_SIX_SLUGS]);
    expect(THEME_SIX.every((l) => l.stage?.theme === "board")).toBe(true);
  });

  it("explican la teoría con diapositivas y evalúan con tests de decisión", () => {
    for (const lesson of THEME_SIX) {
      const slides = lesson.steps.filter((s): s is SlideStep => s.type === "slide");
      expect(slides.length, lesson.slug).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.length, lesson.slug).toBeLessThanOrEqual(10);
      expect(lesson.steps.every((s) => s.type === "slide" || s.type === "predict"), lesson.slug).toBe(true);
      expect(slides.every((s) => s.visual?.kind === "anim"), lesson.slug).toBe(true);
    }
  });

  it("cada pregunta tiene enunciado con contexto, una opción correcta y explica los errores típicos", () => {
    for (const lesson of THEME_SIX) {
      for (const step of lesson.steps) {
        if (step.type !== "predict") continue;
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
    for (const lesson of THEME_SIX) {
      const ids = lesson.steps.map((s) => s.id);
      expect(new Set(ids).size, lesson.slug).toBe(ids.length);
    }
  });

  it("solo hay una ilustración, la que anclan la unidad variable (el codo)", () => {
    const srcs = THEME_SIX.flatMap((l) =>
      l.steps
        .filter((s): s is SlideStep => s.type === "slide")
        .flatMap((s) => s.blocks)
        .flatMap((b) => (b.kind === "story" && b.src ? [b.src] : b.kind === "figure" ? [b.src] : [])),
    );
    expect(srcs).toEqual(["/lesson/sistema-metrico/comerciantes-codo.png"]);
  });
});

describe("tabla de múltiplos y submúltiplos", () => {
  it("lee las cifras colocadas en la tabla con la coma donde toca", () => {
    const cells = digitCells("243", 8);
    expect(cellsToText(cells, 8)).toBe("243");
    expect(cellsToText(cells, 6)).toBe("2,43");
    expect(cellsToText(digitCells("0,062", 6), 8)).toBe("6,2");
    expect(cellsToText(digitCells("15", 5), 8)).toBe("15000");
  });

  it("agrupa los miles y reconoce unidades con y sin exponente", () => {
    expect(groupDec("15000")).toBe("15 000");
    expect(groupDec("1280,5")).toBe("1 280,5");
    expect(unitIndex("m2", "hm²")).toBe(1);
    expect(unitIndex("m2", "m2")).toBe(3);
    expect(unitIndex("l", "dal")).toBe(2);
  });

  it("resuelve los ejemplos del libro (cambio de unidad)", () => {
    const conv = (units: "m" | "l" | "g" | "m2", dec: string, from: string, to: string) =>
      buildSlideAnim("tabla-unidades", { units, dec, from, to }).label;
    const nb = (s: string) => s.replace(/ /g, " ");
    expect(nb(conv("m", "15", "km", "m"))).toBe("15 km = 15 000 m");
    expect(nb(conv("m", "0,062", "dam", "dm"))).toBe("0,062 dam = 6,2 dm");
    expect(nb(conv("m", "1,28", "m", "mm"))).toBe("1,28 m = 1 280 mm");
    expect(nb(conv("m", "243", "cm", "m"))).toBe("243 cm = 2,43 m");
    expect(nb(conv("l", "2,73", "kl", "l"))).toBe("2,73 kl = 2 730 l");
    expect(nb(conv("l", "560", "l", "hl"))).toBe("560 l = 5,6 hl");
    expect(nb(conv("l", "0,0268", "l", "ml"))).toBe("0,0268 l = 26,8 ml");
    expect(nb(conv("l", "60", "cl", "l"))).toBe("60 cl = 0,6 l");
    expect(nb(conv("g", "0,0583", "kg", "g"))).toBe("0,0583 kg = 58,3 g");
    expect(nb(conv("g", "630", "cg", "g"))).toBe("630 cg = 6,3 g");
  });

  it("en superficie cada salto mueve la coma dos lugares", () => {
    const conv = (dec: string, from: string, to: string) =>
      buildSlideAnim("tabla-unidades", { units: "m2", dec, from, to }).label.replace(/ /g, " ");
    expect(conv("47200", "m2", "hm2")).toBe("47 200 m² = 4,72 hm²");
    expect(conv("6,2", "dm2", "cm2")).toBe("6,2 dm² = 620 cm²");
    expect(conv("1,25", "dam2", "m2")).toBe("1,25 dam² = 125 m²");
    expect(conv("252800", "m2", "hm2")).toBe("252 800 m² = 25,28 hm²");
  });

  it("junta la forma compleja en una sola unidad", () => {
    const join = (units: "m" | "l" | "g" | "m2", parts: string[], to: string) =>
      buildSlideAnim("tabla-unidades", { units, parts, to }).label.replace(/ /g, " ");
    expect(join("m", ["3 dam", "8 m", "7 cm"], "m")).toBe("3 dam 8 m 7 cm = 38,07 m");
    expect(join("m", ["2 m", "5 dm"], "m")).toBe("2 m 5 dm = 2,5 m");
    expect(join("l", ["3 kl", "2 dal", "6 l", "5 dl"], "l")).toBe("3 kl 2 dal 6 l 5 dl = 3 026,5 l");
    expect(join("l", ["4 l", "2 dl", "5 cl", "7 ml"], "l")).toBe("4 l 2 dl 5 cl 7 ml = 4,257 l");
    expect(join("g", ["8 hg", "6 g", "7 dg", "5 cg"], "g")).toBe("8 hg 6 g 7 dg 5 cg = 806,75 g");
    expect(join("m2", ["5 km²", "48 hm²", "25 dam²"], "m2")).toBe("5 km² 48 hm² 25 dam² = 5 482 500 m²");
    expect(join("m2", ["6 dam²", "58 m²", "46 dm²"], "m2")).toBe("6 dam² 58 m² 46 dm² = 658,46 m²");
  });

  it("separa en forma compleja", () => {
    expect(buildSlideAnim("tabla-unidades", { units: "m", dec: "12,06", from: "hm" }).label).toBe(
      "12,06 hm en forma compleja",
    );
  });

  it("los cálculos de las preguntas coinciden con la animación", () => {
    const conv = (units: "m" | "l" | "g" | "m2", dec: string, from: string, to: string) =>
      buildSlideAnim("tabla-unidades", { units, dec, from, to }).label.replace(/ /g, " ");
    expect(conv("m", "0,105", "km", "m")).toBe("0,105 km = 105 m");
    expect(conv("l", "750", "ml", "l")).toBe("750 ml = 0,75 l");
    expect(conv("m2", "3,5", "hm2", "m2")).toBe("3,5 hm² = 35 000 m²");
  });
});

describe("otras escenas del tema 6", () => {
  it("cuadrados-area: el triángulo es la mitad del rectángulo", () => {
    const b = buildSlideAnim("cuadrados-area", { a: 5, b: 3 });
    expect(b.label).toContain("15 u.c.");
    expect(b.label).toContain("7,5 u.c.");
  });

  it("escalera-unidades usa saltos de 10 y, en superficie, de 100", () => {
    expect(buildSlideAnim("escalera-unidades", { units: "m" }).captions.at(-1)).toContain("10 veces");
    expect(buildSlideAnim("escalera-unidades", { units: "m2" }).captions.at(-1)).toContain("100 veces");
  });
});
