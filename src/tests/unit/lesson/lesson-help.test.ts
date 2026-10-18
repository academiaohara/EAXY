import { describe, expect, it } from "vitest";
import { interactiveLessons } from "@/data/lessons";
import { buildHelpRoute, getHelpNode } from "@/lib/lesson/help-route";
import { isQuizStep, type HelpBranch } from "@/lib/lesson/types";

const allSteps = Object.entries(interactiveLessons).flatMap(([slug, lesson]) =>
  lesson.steps.map((step) => ({ slug, step })),
);

function walk(branches: HelpBranch[]): HelpBranch[] {
  return branches.flatMap((branch) => [branch, ...walk(branch.branches ?? [])]);
}

describe("ayuda del tutor en las lecciones", () => {
  it.each(allSteps.map(({ slug, step }) => [`${slug}/${step.id}`, step] as const))(
    "%s tiene ayuda propia que no repite la teoría ni el enunciado",
    (_name, step) => {
      expect(step.help?.length ?? 0).toBeGreaterThan(0);
      for (const branch of walk(step.help ?? [])) {
        expect(branch.label.trim()).not.toBe("");
        expect(branch.message.trim()).not.toBe("");
        if (isQuizStep(step)) {
          expect(branch.message).not.toBe(step.question);
          expect(branch.detail ?? []).not.toContain(step.question);
        }
        if (isQuizStep(step) && step.hint) {
          expect(branch.detail ?? []).not.toContain(step.hint);
        }
        for (const line of step.content ?? []) {
          expect(branch.message).not.toBe(line);
          expect(branch.detail ?? []).not.toContain(line);
        }
      }
      const route = buildHelpRoute(step, null);
      for (const node of route.nodes) {
        for (const option of node.options) {
          if (option.next !== null) expect(getHelpNode(route, option.next)).toBeDefined();
        }
      }
    },
  );
});
