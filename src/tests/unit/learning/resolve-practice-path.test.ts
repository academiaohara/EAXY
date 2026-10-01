import { describe, expect, it } from "vitest";
import {
  resolveDefaultPracticePath,
  topicPracticePath,
} from "@/lib/learning/resolve-practice-path";
import { getFirstModuleWithTopicExercises } from "@/content";

describe("resolveDefaultPracticePath", () => {
  it("redirige a ejercicios de tema cuando no hay conceptos en el catálogo", () => {
    const firstTopic = getFirstModuleWithTopicExercises();
    expect(firstTopic).toBeDefined();

    const path = resolveDefaultPracticePath();
    expect(path).toBe(topicPracticePath(firstTopic!.module.id));
  });
});
