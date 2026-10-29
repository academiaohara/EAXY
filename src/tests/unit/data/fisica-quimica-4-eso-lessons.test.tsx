import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { SLIDE_ANIM_REGISTRY, buildSlideAnim } from "@/components/lesson/anim/registry";
import { curriculum } from "@/content/curriculum";
import { interactiveLessons } from "@/data/lessons";
import type { LessonStep, SlideBlock, SlideStep } from "@/lib/lesson/types";

const course = curriculum.courses.find((c) => c.slug === "fisica-4-eso")!;
const lessons = course.modules.flatMap((m) => m.lessons.map((l) => ({ module: m.slug, lesson: l, data: interactiveLessons[l.interactiveSlug as keyof typeof interactiveLessons] })));

function visuals(step: LessonStep): Extract<SlideBlock, { kind: "anim" | "tool" }>[] {
  if (step.type !== "slide") {
    return [];
  }
  const slide = step as SlideStep;
  return [...slide.blocks, ...(slide.visual ? [slide.visual] : [])].filter((b): b is Extract<SlideBlock, { kind: "anim" | "tool" }> => b.kind === "anim" || b.kind === "tool");
}

const TEMAS: [slug: string, lecciones: number][] = [
  ["actividad-cientifica-magnitudes", 3],
  ["el-atomo-y-la-tabla-periodica", 3],
  ["enlace-quimico", 4],
  ["formulacion-y-nomenclatura", 6],
];

describe("curso Física y Química 4.º ESO", () => {
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
    expect(data.steps.length).toBeGreaterThanOrEqual(5);
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
    }
    expect(practice).toBeGreaterThanOrEqual(2);
  });

  it.each(lessons.map((l) => [l.lesson.interactiveSlug!, l] as const))("%s: tiene animaciones o herramientas interactivas", (_slug, { data }) => {
    const n = data.steps.flatMap((s) => visuals(s)).length;
    expect(n).toBeGreaterThanOrEqual(1);
  });

  it("el curso da prioridad a lo visual: casi todas las lecciones llevan animación o herramienta", () => {
    const n = lessons.flatMap(({ data }) => data.steps.flatMap((s) => visuals(s))).length;
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
        }
      }
    }
  });
});
