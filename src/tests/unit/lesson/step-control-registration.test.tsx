import { describe, expect, it, vi } from "vitest";
import { useMemo } from "react";
import { render, screen } from "@testing-library/react";
import {
  LessonStepControlProvider,
  useRegisterLessonStepControl,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";

function ControlReadout() {
  const { control } = useLessonStepControl();
  return <span data-testid="control-label">{control?.label ?? "none"}</span>;
}

function StepControlRegistrar({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) {
  const control = useMemo(
    () => ({
      label,
      onClick: vi.fn(),
      disabled,
      testId: `control-${label}`,
    }),
    [disabled, label],
  );
  useRegisterLessonStepControl(control);
  return null;
}

describe("useRegisterLessonStepControl", () => {
  it("restaura el control del padre al desmontar un registro hijo", () => {
    const { rerender } = render(
      <LessonStepControlProvider>
        <StepControlRegistrar label="parent" />
        <StepControlRegistrar label="child" />
        <ControlReadout />
      </LessonStepControlProvider>,
    );

    expect(screen.getByTestId("control-label")).toHaveTextContent("child");

    rerender(
      <LessonStepControlProvider>
        <StepControlRegistrar label="parent" />
        <ControlReadout />
      </LessonStepControlProvider>,
    );

    expect(screen.getByTestId("control-label")).toHaveTextContent("parent");
  });

  it("actualiza disabled sin perder el control entre renders", () => {
    const { rerender } = render(
      <LessonStepControlProvider>
        <StepControlRegistrar label="check" disabled />
        <ControlReadout />
      </LessonStepControlProvider>,
    );

    expect(screen.getByTestId("control-label")).toHaveTextContent("check");

    rerender(
      <LessonStepControlProvider>
        <StepControlRegistrar label="check" />
        <ControlReadout />
      </LessonStepControlProvider>,
    );

    expect(screen.getByTestId("control-label")).toHaveTextContent("check");
  });
});
