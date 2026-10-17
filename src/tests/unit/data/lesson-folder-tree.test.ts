import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { curriculum } from "@/content/curriculum";
import { interactiveLessons } from "@/data/lessons";
import { lessonSourceRelativePath } from "@/data/lessons/lesson-source-path";

const LESSONS_ROOT = path.join(process.cwd(), "src/data/lessons");

describe("árbol de carpetas de lecciones", () => {
  it("cada interactiveSlug del catálogo tiene fichero en curso/tema/lección", () => {
    for (const course of curriculum.courses) {
      for (const courseModule of course.modules) {
        for (const lesson of courseModule.lessons) {
          const slug = lesson.interactiveSlug;
          if (!slug) continue;
          const relative = lessonSourceRelativePath(
            course.slug,
            courseModule.orderIndex,
            courseModule.slug,
            lesson.orderIndex,
            slug,
          );
          const absolute = path.join(LESSONS_ROOT, relative);
          expect(fs.existsSync(absolute), relative).toBe(true);
        }
      }
    }
  });

  it("el registro interactiveLessons incluye todas las lecciones del catálogo", () => {
    const slugs = new Set<string>();
    for (const course of curriculum.courses) {
      for (const courseModule of course.modules) {
        for (const lesson of courseModule.lessons) {
          if (lesson.interactiveSlug) slugs.add(lesson.interactiveSlug);
        }
      }
    }
    for (const slug of slugs) {
      expect(interactiveLessons[slug as keyof typeof interactiveLessons]?.slug).toBe(slug);
    }
  });
});
