import { describe, expect, it } from "vitest";
import { dedupeAprenderShortcuts } from "@/lib/curriculum/aprender-home";
import type { AprenderStudyShortcut } from "@/lib/curriculum/aprender-home";

function mockShortcut(courseId: string, lessonId: string): AprenderStudyShortcut {
  return {
    courseId,
    courseSlug: courseId,
    courseTitle: "Curso",
    moduleId: "mod-1",
    moduleTitle: "Tema",
    moduleNumber: 1,
    lessonId,
    lessonTitle: "Lección",
    lesson: {
      id: lessonId,
      title: "Lección",
      orderIndex: 0,
      videoUrl: null,
      exerciseCount: 0,
      pathStatus: "not_started",
      conceptIds: [],
      kind: "interactive",
    },
    topicHref: `/aprender/curso/${courseId}/tema/mod-1`,
    lessonHref: `/aprender/leccion/${lessonId}`,
    actionLabel: "Empezar",
    startedAt: null,
  };
}

describe("dedupeAprenderShortcuts", () => {
  it("elimina accesos duplicados por curso y lección", () => {
    const entries = [
      mockShortcut("c1", "l1"),
      mockShortcut("c1", "l1"),
      mockShortcut("c2", "l2"),
    ];

    expect(dedupeAprenderShortcuts(entries)).toHaveLength(2);
  });
});
