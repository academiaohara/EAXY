import { describe, expect, it } from "vitest";
import {
  findNextLesson,
  getCourseProgress,
  getModuleProgress,
} from "@/lib/curriculum/course-progress";
import type { LessonSummary, ModuleSummary } from "@/lib/curriculum/types";

function lesson(
  id: string,
  pathStatus: LessonSummary["pathStatus"],
  exerciseCount = 0,
): LessonSummary {
  return {
    id,
    title: `Lección ${id}`,
    orderIndex: 0,
    videoUrl: null,
    exerciseCount,
    pathStatus,
    conceptIds: [],
    kind: "interactive",
  };
}

function courseModule(id: string, lessons: LessonSummary[]): ModuleSummary {
  return { id, slug: id, title: `Tema ${id}`, orderIndex: 0, lessons, topicExercises: [] };
}

describe("getModuleProgress", () => {
  it("cuenta las lecciones completadas del tema", () => {
    const progress = getModuleProgress(
      courseModule("m1", [lesson("a", "completed"), lesson("b", "started")]),
    );

    expect(progress).toEqual({ total: 2, completed: 1, percent: 50 });
  });

  it("no divide por cero en temas vacíos", () => {
    expect(getModuleProgress(courseModule("m0", [])).percent).toBe(0);
  });
});

describe("getCourseProgress", () => {
  it("agrega lecciones y ejercicios de todos los temas", () => {
    const progress = getCourseProgress([
      courseModule("m1", [lesson("a", "completed", 2), lesson("b", "not_started", 3)]),
      courseModule("m2", [lesson("c", "completed", 1)]),
    ]);

    expect(progress).toEqual({
      totalLessons: 3,
      completedLessons: 2,
      totalExercises: 6,
      percent: 67,
    });
  });
});

describe("findNextLesson", () => {
  it("prioriza la lección empezada", () => {
    const next = findNextLesson([
      courseModule("m1", [lesson("a", "completed"), lesson("b", "started")]),
      courseModule("m2", [lesson("c", "not_started")]),
    ]);

    expect(next?.lesson.id).toBe("b");
    expect(next?.moduleNumber).toBe(1);
    expect(next?.isReview).toBe(false);
  });

  it("cae en la primera lección pendiente", () => {
    const next = findNextLesson([
      courseModule("m1", [lesson("a", "completed")]),
      courseModule("m2", [lesson("c", "not_started")]),
    ]);

    expect(next?.lesson.id).toBe("c");
    expect(next?.moduleNumber).toBe(2);
  });

  it("propone repaso cuando todo está completado", () => {
    const next = findNextLesson([courseModule("m1", [lesson("a", "completed")])]);

    expect(next?.lesson.id).toBe("a");
    expect(next?.isReview).toBe(true);
  });

  it("devuelve null sin lecciones", () => {
    expect(findNextLesson([courseModule("m1", [])])).toBeNull();
  });
});
