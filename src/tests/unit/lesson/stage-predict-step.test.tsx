import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { PredictStepView } from "@/components/lesson/steps/StageSteps";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { LessonPersistedStateProvider } from "@/components/lesson/LessonPersistedStateContext";
import type { PredictStep } from "@/lib/lesson/types";

const step: PredictStep = {
  id: "test-predict",
  type: "predict",
  title: "Test",
  question: "¿Cuánto?",
  mode: "numeric",
  correctAnswers: ["828"],
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

function wrap(ui: ReactNode) {
  return (
    <LessonPersistedStateProvider toolState={{}} onToolStateChange={() => {}}>
      <LessonStepControlProvider>
        {ui}
        <ControlProbe />
      </LessonStepControlProvider>
    </LessonPersistedStateProvider>
  );
}

describe("PredictStepView", () => {
  it("no muestra continuar hasta comprobar la respuesta", async () => {
    const onCheck = vi.fn();
    render(wrap(<PredictStepView step={step} theme="paper" onCheck={onCheck} />), {
      container: document.body,
    });

    expect(screen.queryByTestId("lesson-continue-button")).not.toBeInTheDocument();
    expect(screen.getByTestId("lesson-check-button")).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Tu respuesta"), { target: { value: "828" } });
    expect(screen.getByTestId("lesson-check-button")).toBeEnabled();

    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(
      expect.objectContaining({ correct: true, snapshot: expect.objectContaining({ kind: "predict" }) }),
    );
  });
});
