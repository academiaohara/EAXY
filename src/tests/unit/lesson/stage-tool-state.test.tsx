import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExploreStepView } from "@/components/lesson/steps/StageSteps";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { LessonPersistedStateProvider } from "@/components/lesson/LessonPersistedStateContext";
import type { ExploreStep } from "@/lib/lesson/types";

const exploreStep: ExploreStep = {
  id: "paren-explore",
  type: "explore",
  title: "Paréntesis",
  question: "Consigue 5",
  module: "piramide-reduccion",
  scene: "explorar-parentesis",
  goal: {
    kind: "expression-result",
    tokens: ["9", "-", "1", "+", "3"],
    target: 5,
  },
};

function ControlProbe() {
  const { control } = useLessonStepControl();
  if (!control) {
    return null;
  }
  return (
    <button
      type="button"
      data-testid={control.testId}
      disabled={control.disabled}
      onClick={() => control.onClick()}
    >
      {control.label}
    </button>
  );
}

describe("ExploreStepView toolState", () => {
  it("restaura la colocación de paréntesis al reanudar", async () => {
    let toolState: Record<string, unknown> = {
      "paren-explore": {
        selectedIds: [],
        openAfter: 1,
        closeBefore: 4,
      },
    };

    const { rerender } = render(
      <LessonPersistedStateProvider
        toolState={toolState}
        onToolStateChange={(next) => {
          toolState = typeof next === "function" ? next(toolState) : next;
        }}
      >
        <LessonStepControlProvider>
          <ExploreStepView step={exploreStep} theme="paper" onCheck={() => {}} />
          <ControlProbe />
        </LessonStepControlProvider>
      </LessonPersistedStateProvider>,
    );

    const openButtons = screen.getAllByLabelText(/Abrir paréntesis/);
    expect(openButtons.some((button) => button.className.includes("border-cobalt"))).toBe(true);

    rerender(
      <LessonPersistedStateProvider
        toolState={toolState}
        onToolStateChange={(next) => {
          toolState = typeof next === "function" ? next(toolState) : next;
        }}
      >
        <LessonStepControlProvider>
          <ExploreStepView step={exploreStep} theme="paper" onCheck={() => {}} />
          <ControlProbe />
        </LessonStepControlProvider>
      </LessonPersistedStateProvider>,
    );

    expect(screen.getByTestId("lesson-check-button")).toBeEnabled();
  });
});
