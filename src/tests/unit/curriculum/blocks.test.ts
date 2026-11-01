import { describe, expect, it } from "vitest";
import { fullCurriculum as curriculum } from "@/content/curriculum";
import {
  BLOCKS,
  MODULE_BLOCK_PLAN,
  getBlock,
  getLessonBlockSlug,
  getModuleBlockSlug,
  moduleBlockKey,
} from "@/content/blocks";
import { buildBlockOutline, summarizeBlocks } from "@/lib/curriculum/blocks";
import type { CourseOutline, ModuleSummary } from "@/lib/curriculum/types";
import { subjectOfCourse } from "@/lib/navigation/subjects";

const blockSlugs = new Set(BLOCKS.map((block) => block.slug));

function outlineOf(courseSlug: string): CourseOutline {
  const course = curriculum.courses.find((candidate) => candidate.slug === courseSlug)!;
  return {
    course: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      orderIndex: course.orderIndex,
    },
    modules: course.modules.map(
      (courseModule): ModuleSummary => ({
        id: courseModule.id,
        slug: courseModule.slug,
        title: courseModule.title,
        orderIndex: courseModule.orderIndex,
        topicExercises: [],
        lessons: courseModule.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          orderIndex: lesson.orderIndex,
          videoUrl: null,
          exerciseCount: 0,
          pathStatus: "not_started",
          conceptIds: [],
          kind: "interactive",
        })),
      }),
    ),
  };
}

describe("bloques de contenido", () => {
  it("los slugs de bloque son únicos por asignatura", () => {
    const keys = BLOCKS.map((block) => `${block.subject}/${block.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("todo tema con lecciones tiene bloque y todo bloque asignado existe", () => {
    for (const course of curriculum.courses) {
      for (const courseModule of course.modules) {
        const key = moduleBlockKey(course.slug, courseModule.slug);
        expect(MODULE_BLOCK_PLAN[key], `falta bloque para ${key}`).toBeDefined();
      }
    }
    for (const [key, plan] of Object.entries(MODULE_BLOCK_PLAN)) {
      const slugs = typeof plan === "string" ? [plan] : [plan.default, ...Object.values(plan.lessons)];
      for (const slug of slugs) {
        expect(blockSlugs.has(slug), `${key} apunta a un bloque inexistente: ${slug}`).toBe(true);
      }
    }
  });

  it("la asignatura del bloque coincide con la de los cursos que lo usan", () => {
    for (const course of curriculum.courses) {
      for (const courseModule of course.modules) {
        for (const lesson of courseModule.lessons) {
          const slug = getLessonBlockSlug(course.slug, courseModule.slug, lesson.orderIndex)!;
          const block = BLOCKS.find((candidate) => candidate.slug === slug)!;
          expect(block.subject, `${course.slug}/${courseModule.slug}#${lesson.orderIndex}`).toBe(
            subjectOfCourse(course),
          );
        }
      }
    }
  });

  it("las reasignaciones por lección apuntan a lecciones que existen", () => {
    for (const [key, plan] of Object.entries(MODULE_BLOCK_PLAN)) {
      if (typeof plan === "string") {
        continue;
      }
      const [courseSlug, moduleSlug] = key.split("/");
      const courseModule = curriculum.courses
        .find((course) => course.slug === courseSlug)
        ?.modules.find((candidate) => candidate.slug === moduleSlug);
      const orderIndexes = courseModule?.lessons.map((lesson) => lesson.orderIndex) ?? [];
      for (const index of Object.keys(plan.lessons).map(Number)) {
        expect(orderIndexes, `${key} no tiene la lección ${index}`).toContain(index);
      }
    }
  });

  it("todo bloque tiene al menos una lección", () => {
    const outlines = curriculum.courses
      .filter((course) => course.modules.length > 0)
      .map((course) => outlineOf(course.slug));
    for (const block of BLOCKS) {
      const outline = buildBlockOutline(
        block,
        outlines.filter((candidate) => subjectOfCourse(candidate.course) === block.subject),
      );
      expect(outline.sections.length, `bloque vacío: ${block.slug}`).toBeGreaterThan(0);
    }
  });

  it("Fracciones reúne los cursos de menor a mayor", () => {
    const outlines = ["matematicas-4-eso", "matematicas-1-eso", "matematicas-3-eso", "matematicas-2-eso"].map(
      outlineOf,
    );
    const fracciones = getBlock("matematicas", "fracciones")!;
    const { sections } = buildBlockOutline(fracciones, outlines);

    expect(sections.map((section) => section.course.slug)).toEqual([
      "matematicas-1-eso",
      "matematicas-2-eso",
      "matematicas-3-eso",
      "matematicas-4-eso",
    ]);
    const first = sections[0].modules.map((courseModule) => courseModule.slug);
    expect(first).toEqual(["fracciones", "operaciones-con-fracciones"]);
  });

  it("las lecciones reasignadas salen de su tema y entran en el bloque nuevo", () => {
    const outlines = [outlineOf("matematicas-3-eso")];
    const fracciones = buildBlockOutline(getBlock("matematicas", "fracciones")!, outlines);
    const porcentajes = buildBlockOutline(
      getBlock("matematicas", "proporcionalidad-y-porcentajes")!,
      outlines,
    );

    expect(fracciones.sections[0].modules[0].lessons).toHaveLength(7);
    expect(porcentajes.sections[0].modules[0].lessons.map((lesson) => lesson.orderIndex)).toEqual([
      8, 9,
    ]);
  });

  it("cada lección aparece en exactamente un bloque", () => {
    const outlines = curriculum.courses
      .filter((course) => subjectOfCourse(course) === "matematicas" && course.modules.length > 0)
      .map((course) => outlineOf(course.slug));
    const summaries = summarizeBlocks("matematicas", outlines);
    const seen = summaries.flatMap((summary) =>
      summary.modules.flatMap((courseModule) => courseModule.lessons.map((lesson) => lesson.id)),
    );
    const total = outlines.reduce(
      (sum, outline) =>
        sum + outline.modules.reduce((moduleSum, courseModule) => moduleSum + courseModule.lessons.length, 0),
      0,
    );

    expect(new Set(seen).size).toBe(seen.length);
    expect(seen).toHaveLength(total);
  });

  it("los ejercicios de tema solo van al bloque por defecto del tema", () => {
    const outline = outlineOf("matematicas-3-eso");
    const fraccionesModule = outline.modules.find((m) => m.slug === "fracciones-y-decimales")!;
    fraccionesModule.topicExercises = [{ id: "e1", title: "E1", statement: "x" }];

    const fracciones = buildBlockOutline(getBlock("matematicas", "fracciones")!, [outline]);
    const porcentajes = buildBlockOutline(
      getBlock("matematicas", "proporcionalidad-y-porcentajes")!,
      [outline],
    );

    expect(getModuleBlockSlug("matematicas-3-eso", "fracciones-y-decimales")).toBe("fracciones");
    expect(fracciones.sections[0].modules[0].topicExercises).toHaveLength(1);
    expect(porcentajes.sections[0].modules[0].topicExercises).toHaveLength(0);
  });
});
