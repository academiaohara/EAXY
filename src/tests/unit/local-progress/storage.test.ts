import { describe, expect, it } from "vitest";
import {
  applyLocalProgressToModules,
  mergeLessonPathStatus,
} from "@/lib/local-progress/storage";
import type { ModuleSummary } from "@/lib/curriculum/types";

const sampleModules: ModuleSummary[] = [
  {
    id: "mod-1",
    title: "Tema",
    orderIndex: 1,
    lessons: [
      {
        id: "lesson-1",
        title: "Lección 1",
        orderIndex: 1,
        videoUrl: null,
        exerciseCount: 2,
        pathStatus: "not_started",
        conceptIds: [],
        kind: "exercises",
      },
    ],
    topicExercises: [],
  },
];

describe("local progress merge", () => {
  it("marca completada una lección guardada en local", () => {
    const merged = applyLocalProgressToModules(sampleModules, {
      version: 1,
      lessons: { "lesson-1": "completed" },
      exercises: {},
    });

    expect(merged[0]?.lessons[0]?.pathStatus).toBe("completed");
  });

  it("prioriza completada sobre empezada", () => {
    expect(mergeLessonPathStatus("lesson-1", "started", { version: 1, lessons: { "lesson-1": "completed" }, exercises: {} })).toBe(
      "completed",
    );
  });
});
