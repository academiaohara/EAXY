import { describe, expect, it } from "vitest";
import {
  countCompletedLessons,
  resolveLessonProgressStatus,
} from "@/lib/content/progress";
import type { LearningPathRecord } from "@/lib/content/types";

describe("resolveLessonProgressStatus", () => {
  it("devuelve not_started sin registro de progreso", () => {
    expect(resolveLessonProgressStatus(undefined)).toBe("not_started");
  });

  it("devuelve started cuando la lección está en curso", () => {
    const path: LearningPathRecord = {
      lessonId: "lesson-1",
      status: "started",
      completedAt: null,
    };

    expect(resolveLessonProgressStatus(path)).toBe("started");
  });

  it("devuelve completed cuando la lección está completada", () => {
    const path: LearningPathRecord = {
      lessonId: "lesson-1",
      status: "completed",
      completedAt: "2026-09-13T12:00:00.000Z",
    };

    expect(resolveLessonProgressStatus(path)).toBe("completed");
  });
});

describe("countCompletedLessons", () => {
  it("cuenta solo lecciones con status completed", () => {
    const lessonIds = ["l1", "l2", "l3"];
    const paths: LearningPathRecord[] = [
      { lessonId: "l1", status: "completed", completedAt: "2026-09-13T12:00:00.000Z" },
      { lessonId: "l2", status: "started", completedAt: null },
    ];

    expect(countCompletedLessons(lessonIds, paths)).toBe(1);
  });
});
