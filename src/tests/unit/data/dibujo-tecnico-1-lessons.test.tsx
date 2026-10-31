import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { SLIDE_ANIM_REGISTRY, buildSlideAnim } from "@/components/lesson/anim/registry";
import { curriculum } from "@/content/curriculum";
import { interactiveLessons } from "@/data/lessons";
import type { LessonStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const course = curriculum.courses.find((c) => c.slug === "dibujo-tecnico-1-bachillerato")!;
const lessons = course.modules.flatMap((m) => m.lessons.map((l) => ({ module: m.slug, lesson: l, data: interactiveLessons[l.interactiveSlug as keyof typeof interactiveLessons] })));

function visuals(step: LessonStep): Extract<SlideBlock, { kind: "anim" | "tool" | "bench" }>[] {
  if (step.type === "bench_task") {
    return [{ kind: "bench", scene: step.scene, params: step.params, notes: step.notes }];
  }
  if (step.type !== "slide") {
    return [];
  }
  const slide = step as SlideStep;
  return [...slide.blocks, ...(slide.visual ? [slide.visual] : [])].filter((b): b is Extract<SlideBlock, { kind: "anim" | "tool" | "bench" }> => b.kind === "anim" || b.kind === "tool" || b.kind === "bench");
}

const TEMAS: [slug: string, lecciones: number][] = [
  ["instrumentos-trazados-fundamentales", 4],
  ["historia-fundamentos-geometricos", 4],
  ["proporcionalidad-equivalencia-semejanza", 4],
  ["triangulos-cuadrilateros-poligonos", 6],
  ["transformaciones-geometricas", 4],
  ["tangencias-curvas-tecnicas", 5],
  ["sistema-diedrico-punto-recta-plano", 6],
  ["sistema-diedrico-relaciones-distancias", 4],
  ["sistemas-axonometricos", 5],
  ["planos-acotados-conico", 6],
  ["normalizacion-documentacion-grafica", 6],
  ["sistemas-cad", 4],
];

describe("curso Dibujo Técnico I", () => {
  it("tiene los temas del currículo con todas sus lecciones, ficheros y registro", () => {
    expect(course.modules.map((m) => m.slug)).toEqual(TEMAS.map(([slug]) => slug));
    for (const [slug, n] of TEMAS) {
      expect(course.modules.find((m) => m.slug === slug)!.lessons, slug).toHaveLength(n);
    }
    for (const { lesson, data } of lessons) {
      expect(data?.slug, lesson.interactiveSlug).toBe(lesson.interactiveSlug);
    }
  });

  it.each(lessons.map((l) => [l.lesson.interactiveSlug!, l] as const))("%s: pasos bien formados", (_slug, { data }) => {
    const conMesa = data.steps.some((st) => st.type === "bench_task" || (st.type === "slide" && st.visual?.kind === "bench"));
    expect(data.steps.length).toBeGreaterThanOrEqual(conMesa ? 2 : 5);
    const ids = data.steps.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    let practice = 0;
    for (const step of data.steps) {
      expect(step.title.length).toBeGreaterThan(2);
      if (step.type === "predict") {
        practice += 1;
        if (step.mode === "numeric") {
          expect(step.correctAnswers?.length, step.id).toBeGreaterThan(0);
        } else {
          expect(step.choices?.map((c) => c.id), step.id).toContain(step.correctChoiceId);
          expect(step.choices!.length, step.id).toBeGreaterThanOrEqual(3);
        }
        expect(step.explanation?.length ?? 0, step.id).toBeGreaterThan(10);
      }
      if (step.type === "classify") {
        practice += 1;
        const groups = new Set(step.groups.map((g) => g.id));
        expect(step.items.every((i) => groups.has(i.group)), step.id).toBe(true);
        expect(step.items.length, step.id).toBeGreaterThanOrEqual(4);
      }
      if (step.type === "interactive_tool" && step.tool === "dt1-workshop") practice += 1;
      if (step.type === "bench_task") {
        practice += 1;
        expect(step.question.length, step.id).toBeGreaterThan(10);
        expect(step.explanation?.length ?? 0, step.id).toBeGreaterThan(10);
      }
    }
    expect(practice).toBeGreaterThanOrEqual(conMesa ? 1 : 2);
  });

  it.each(lessons.map((l) => [l.lesson.interactiveSlug!, l] as const))("%s: tiene animaciones o herramientas interactivas", (_slug, { data }) => {
    const n = data.steps.flatMap((s) => visuals(s)).length + data.steps.filter((s) => s.type === "storyboard").length;
    expect(n).toBeGreaterThanOrEqual(1);
  });

  it("el curso da prioridad a lo visual: casi todas las lecciones llevan animación o herramienta", () => {
    const n = lessons.flatMap(({ data }) => data.steps.flatMap((s) => visuals(s))).length
      + lessons.flatMap(({ data }) => data.steps.filter((s) => s.type === "storyboard")).length;
    expect(n).toBeGreaterThanOrEqual(lessons.length);
  });

  it("todas las animaciones citadas existen y se dibujan en todos sus pasos", () => {
    for (const { data } of lessons) {
      for (const step of data.steps) {
        for (const v of visuals(step)) {
          if (v.kind === "anim") {
            expect(SLIDE_ANIM_REGISTRY[v.scene], `${data.slug}/${step.id}`).toBeDefined();
            const built = buildSlideAnim(v.scene, v.params, v.captions);
            for (let beat = 0; beat < built.captions.length; beat += 1) {
              expect(() => renderToStaticMarkup(<>{built.render(beat)}</>), `${data.slug}/${step.id}#${beat}`).not.toThrow();
            }
          }
        }
      }
    }
  });

  it("todas las herramientas citadas se montan con sus parámetros", () => {
    for (const { data } of lessons) {
      for (const step of data.steps) {
        for (const v of visuals(step)) {
          if (v.kind === "tool") {
            expect(() => render(<SlideTool block={v} />), `${data.slug}/${step.id}`).not.toThrow();
          }
          if (v.kind === "bench") {
            expect(v.notes?.length, `${data.slug}/${step.id}: un texto por paso`).toBe(BENCH_STEPS[v.scene]);
            expect(() => render(<LessonStepControlProvider><SlideBench block={v} /></LessonStepControlProvider>), `${data.slug}/${step.id}`).not.toThrow();
          }
        }
      }
    }
  });
});

describe("tema 1: recorrido didáctico sin solapamientos", () => {
  const theme = course.modules
    .find((module) => module.slug === "historia-fundamentos-geometricos")!
    .lessons.map(
      (lesson) => interactiveLessons[lesson.interactiveSlug as keyof typeof interactiveLessons],
    );

  it("plantea una pregunta central distinta en cada lección", () => {
    expect(theme.map((lesson) => lesson.title)).toEqual([
      "1. Un lenguaje para construir",
      "2. De medir a demostrar",
      "3. Encontrar puntos mediante condiciones",
      "4. Ver un segmento bajo el mismo ángulo",
    ]);
    expect(theme.map((lesson) => lesson.steps[0]?.title)).toEqual([
      "¿Cómo construimos todos el mismo objeto?",
      "¿Cómo sabemos que un método siempre funciona?",
      "¿Dónde están todos los puntos que cumplen una condición?",
      "¿Desde dónde se ve AB con el mismo ángulo?",
    ]);
  });

  it.each(theme.map((lesson) => [lesson.slug, lesson] as const))(
    "%s alterna relato y acción",
    (_slug, lesson) => {
      expect(lesson.steps.length).toBeGreaterThanOrEqual(6);
      expect(lesson.steps.length).toBeLessThanOrEqual(8);
      expect(lesson.steps.some((step) => step.type === "storyboard")).toBe(true);
      expect(
        lesson.steps.filter((step) => step.type === "interactive_tool" && step.tool === "dt1-workshop").length,
      ).toBeGreaterThanOrEqual(2);
      expect(lesson.steps.some((step) => step.type === "predict" || step.type === "classify")).toBe(false);

      let passiveRun = 0;
      for (const step of lesson.steps) {
        passiveRun = ["concept", "slide", "storyboard", "narrate", "reveal"].includes(step.type)
          ? passiveRun + 1
          : 0;
        expect(passiveRun, `${lesson.slug}/${step.id}`).toBeLessThanOrEqual(2);
        if (step.type === "slide") {
          expect(step.blocks.some((block) => block.kind === "steps"), step.id).toBe(false);
        }
      }
    },
  );

  it("reserva cada concepto para la lección que lo desarrolla", () => {
    const [language, proof, loci, arc] = theme.map((lesson) => JSON.stringify(lesson));
    expect(language).toMatch(/perspectiva del Renacimiento/);
    expect(language).not.toMatch(/Euclides/);
    expect(proof).not.toMatch(/arco capaz/i);
    expect((loci!.match(/arco capaz/gi) ?? []).length).toBeLessThanOrEqual(1);
    expect(arc).toMatch(/arco capaz/i);
  });
});
