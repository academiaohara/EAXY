import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { buildSlideAnim, SLIDE_ANIM_REGISTRY } from "@/components/lesson/anim/registry";
import { fmt } from "@/components/lesson/anim/format";
import { interactiveLessons } from "@/data/lessons";
import type { SlideAnimId, SlideBlock, SlideStep } from "@/lib/lesson/types";

type AnimBlock = Extract<SlideBlock, { kind: "anim" }>;

function lessonAnimBlocks(): { lesson: string; stepId: string; block: AnimBlock }[] {
  const found: { lesson: string; stepId: string; block: AnimBlock }[] = [];
  for (const lesson of Object.values(interactiveLessons)) {
    for (const step of lesson.steps) {
      if (step.type !== "slide") {
        continue;
      }
      const slide = step as SlideStep;
      const blocks: SlideBlock[] = [...slide.blocks, ...(slide.visual ? [slide.visual] : [])];
      for (const block of blocks) {
        if (block.kind === "anim") {
          found.push({ lesson: lesson.slug, stepId: slide.id, block });
        }
      }
    }
  }
  return found;
}

describe("fmt", () => {
  it("agrupa siempre en miles, también con cuatro cifras", () => {
    expect(fmt(1435)).toBe("1 435");
    expect(fmt(293_518)).toBe("293 518");
    expect(fmt(40)).toBe("40");
    expect(fmt(1_000_000)).toBe("1 000 000");
  });
});

describe("registro de animaciones de diapositiva", () => {
  const ids = Object.keys(SLIDE_ANIM_REGISTRY) as SlideAnimId[];

  it.each(ids)("%s construye y dibuja todos sus pasos sin fallar", (id) => {
    const params =
      id === "expr-reescritura"
        ? {
            expr: [
              { tokens: ["6", "+", "2", "·", "4"], active: [2, 4] as [number, number], note: "a" },
              { tokens: ["14"], fresh: [0, 0] as [number, number], note: "b" },
            ],
          }
        : {};
    const built = buildSlideAnim(id, params);
    expect(built.label.length).toBeGreaterThan(10);
    expect(built.captions.length).toBeGreaterThanOrEqual(2);
    for (let beat = 0; beat < built.captions.length; beat += 1) {
      expect(built.captions[beat]!.length).toBeGreaterThan(0);
      expect(() => renderToStaticMarkup(<>{built.render(beat)}</>)).not.toThrow();
    }
  });

  it("los textos de paso de la lección pueden sustituir a los de la escena", () => {
    const built = buildSlideAnim("area-distributiva", { a: 15, b: 4, c: 3 }, ["uno"]);
    expect(built.captions[0]).toBe("uno");
    expect(built.captions.length).toBeGreaterThan(1);
  });
});

describe("animaciones usadas en las lecciones", () => {
  const blocks = lessonAnimBlocks();

  it("hay animaciones en las lecciones del tema 1", () => {
    expect(blocks.length).toBeGreaterThanOrEqual(6);
  });

  it.each(blocks.map((b) => [`${b.lesson}/${b.stepId}`, b] as const))(
    "%s se dibuja en todos sus pasos",
    (_name, { block }) => {
      const built = buildSlideAnim(block.scene, block.params, block.captions);
      for (let beat = 0; beat < built.captions.length; beat += 1) {
        expect(() => renderToStaticMarkup(<>{built.render(beat)}</>)).not.toThrow();
      }
    },
  );
});
