import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { PredictStepView } from "@/components/lesson/steps/StageSteps";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { LessonPersistedStateProvider } from "@/components/lesson/LessonPersistedStateContext";
import type { PredictStep } from "@/lib/lesson/types";
import { multiplicacionDivisionNaturalesLesson } from "@/data/lessons/multiplicacion-division-naturales";

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
    render(
      wrap(<PredictStepView step={step} theme="paper" onCheck={onCheck} />),
      {
        container: document.body,
      },
    );

    expect(
      screen.queryByTestId("lesson-continue-button"),
    ).not.toBeInTheDocument();
    const predictPanel = screen.getByTestId("lesson-predict-step");
    expect(within(predictPanel).getByTestId("lesson-check-button")).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Tu respuesta"), {
      target: { value: "828" },
    });
    expect(within(predictPanel).getByTestId("lesson-check-button")).toBeEnabled();

    fireEvent.click(within(predictPanel).getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(
      expect.objectContaining({
        correct: true,
        snapshot: expect.objectContaining({ kind: "predict" }),
      }),
    );
  });

  it("no muestra la fórmula numérica de la distributiva antes de comprobar", () => {
    const menuStep = multiplicacionDivisionNaturalesLesson.steps.find(
      (s) => s.id === "distributiva-predict",
    ) as PredictStep;
    render(
      wrap(<PredictStepView step={menuStep} theme="paper" onCheck={vi.fn()} />),
      { container: document.body },
    );

    expect(screen.queryByTestId("distributiva-formula")).not.toBeInTheDocument();
    expect(screen.getByText(/Cuánto pagas en total/i)).toBeInTheDocument();
  });

  it("muestra la fórmula tras comprobar la distributiva", () => {
    const menuStep = multiplicacionDivisionNaturalesLesson.steps.find(
      (s) => s.id === "distributiva-predict",
    ) as PredictStep;
    render(
      wrap(<PredictStepView step={menuStep} theme="paper" onCheck={vi.fn()} />),
      { container: document.body },
    );

    const predictPanel = screen.getByTestId("lesson-predict-step");
    fireEvent.click(screen.getByTestId("predict-choice-56"));
    fireEvent.click(within(predictPanel).getByTestId("lesson-check-button"));

    expect(screen.getByTestId("distributiva-formula")).toBeInTheDocument();
  });

  it("muestra feedback específico al fallar el menú de la distributiva", () => {
    const menuStep = multiplicacionDivisionNaturalesLesson.steps.find(
      (s) => s.id === "distributiva-predict",
    ) as PredictStep;
    const onCheck = vi.fn();
    render(
      wrap(<PredictStepView step={menuStep} theme="paper" onCheck={onCheck} />),
      {
        container: document.body,
      },
    );

    const predictPanel = screen.getByTestId("lesson-predict-step");
    fireEvent.click(screen.getByTestId("predict-choice-40"));
    fireEvent.click(within(predictPanel).getByTestId("lesson-check-button"));

    expect(
      screen.getByText(/Ese solo cuenta los bocadillos/i),
    ).toBeInTheDocument();
  });

  it("muestra feedback al elegir 80 € en el menú de la distributiva", () => {
    const menuStep = multiplicacionDivisionNaturalesLesson.steps.find(
      (s) => s.id === "distributiva-predict",
    ) as PredictStep;
    const onCheck = vi.fn();
    render(
      wrap(<PredictStepView step={menuStep} theme="paper" onCheck={onCheck} />),
      {
        container: document.body,
      },
    );

    const predictPanel = screen.getByTestId("lesson-predict-step");
    fireEvent.click(screen.getByTestId("predict-choice-80"));
    fireEvent.click(within(predictPanel).getByTestId("lesson-check-button"));

    expect(screen.getByText(/Has multiplicado/i)).toBeInTheDocument();
  });
});
