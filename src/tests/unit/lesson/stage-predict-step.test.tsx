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
    const choice = screen.getByTestId("predict-choice-solo-bocadillos");
    fireEvent.click(choice);
    fireEvent.click(within(predictPanel).getByTestId("lesson-check-button"));

    expect(screen.getByText(/deja fuera los.*bebida/i)).toBeInTheDocument();
  });

  it("muestra pista opcional y feedback al fallar reparte el factor", () => {
    const factorStep = multiplicacionDivisionNaturalesLesson.steps.find(
      (s) => s.id === "distributiva-predict",
    ) as PredictStep;
    const onCheck = vi.fn();
    render(
      wrap(
        <PredictStepView step={factorStep} theme="paper" onCheck={onCheck} />,
      ),
      {
        container: document.body,
      },
    );

    fireEvent.click(screen.getByLabelText("Ver pista"));
    expect(screen.getByTestId("lesson-predict-step").textContent).toMatch(
      /forma desarrollada/i,
    );

    const predictPanel = screen.getByTestId("lesson-predict-step");
    fireEvent.click(screen.getByTestId("predict-choice-sin-repartir"));
    fireEvent.click(within(predictPanel).getByTestId("lesson-check-button"));

    expect(screen.getByTestId("lesson-predict-step").textContent).toMatch(
      /expresión equivalente/i,
    );
  });
});
