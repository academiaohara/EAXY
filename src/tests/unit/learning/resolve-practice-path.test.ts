import { describe, expect, it } from "vitest";
import { resolveDefaultPracticePath } from "@/lib/learning/resolve-practice-path";
import { getFirstModuleWithTopicExercises } from "@/content";

describe("resolveDefaultPracticePath", () => {
  it("prioriza la práctica conceptual y no vuelve a ejercicios externos retirados", () => {
    const firstTopic = getFirstModuleWithTopicExercises();
    expect(firstTopic).toBeUndefined();

    const path = resolveDefaultPracticePath();
    expect(path === null || !path.startsWith("/practicar/tema/")).toBe(true);
  });
});
