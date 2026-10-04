import { describe, expect, it } from "vitest";
import {
  findDefaultModuleId,
  isModuleAccessible,
  sortModules,
} from "@/lib/curriculum/course-navigation";
import type { ModuleSummary } from "@/lib/curriculum/types";

function module(id: string, orderIndex: number, lessons: ModuleSummary["lessons"] = []): ModuleSummary {
  return {
    id,
    slug: id,
    title: `Module ${id}`,
    orderIndex,
    lessons,
    topicExercises: [],
  };
}

describe("course-navigation", () => {
  it("ordena módulos por orderIndex", () => {
    const sorted = sortModules([module("b", 2), module("a", 1)]);
    expect(sorted.map((entry) => entry.id)).toEqual(["a", "b"]);
  });

  it("detecta módulos con lecciones o ejercicios de tema", () => {
    expect(isModuleAccessible(module("a", 1, []))).toBe(false);
    expect(
      isModuleAccessible({
        ...module("a", 1, []),
        topicExercises: [
          {
            id: "ex-1",
            title: "Ejercicio",
            statement: "x",
            solutionText: "y",
            solutionVideoUrl: "https://example.com",
          },
        ],
      }),
    ).toBe(true);
  });

  it("prioriza el tema con lección empezada", () => {
    const modules = [
      module("first", 1, [
        {
          id: "l1",
          title: "L1",
          orderIndex: 1,
          videoUrl: null,
          exerciseCount: 0,
          pathStatus: "not_started",
          conceptIds: [],
          kind: "interactive",
        },
      ]),
      module("second", 2, [
        {
          id: "l2",
          title: "L2",
          orderIndex: 1,
          videoUrl: null,
          exerciseCount: 0,
          pathStatus: "started",
          conceptIds: [],
          kind: "interactive",
        },
      ]),
    ];

    expect(findDefaultModuleId(modules)).toBe("second");
  });

  it("elige el primer tema con contenido si no hay nada empezado", () => {
    const modules = [
      module("empty", 1),
      module("with-lessons", 2, [
        {
          id: "l1",
          title: "L1",
          orderIndex: 1,
          videoUrl: null,
          exerciseCount: 0,
          pathStatus: "not_started",
          conceptIds: [],
          kind: "interactive",
        },
      ]),
    ];

    expect(findDefaultModuleId(modules)).toBe("with-lessons");
  });
});
