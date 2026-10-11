import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { useLessonPresenterChrome } from "@/components/lesson/LessonPresenterChrome";

function ChromeHarness({
  feedback,
  onNext,
}: {
  feedback: "correct" | null;
  onNext: () => void;
}) {
  const { overlays } = useLessonPresenterChrome({
    closeHref: "/aprender",
    stepTitle: "Paso",
    steps: [{ id: "s1", title: "Uno" }],
    currentStepIndex: 0,
    completedSteps: [false],
    visitedSteps: [true],
    onGoToStep: vi.fn(),
    canBack: false,
    onBack: vi.fn(),
    control: null,
    footerCenter: null,
    presenterNav: null,
    feedback,
    isLastStep: false,
    onNext,
    stepHelpAvailable: false,
    onOpenHelp: vi.fn(),
  });

  return <div>{overlays}</div>;
}

describe("useLessonPresenterChrome", () => {
  it("la flecha avanzar dispara onNext cuando hay feedback", () => {
    const onNext = vi.fn();
    render(<ChromeHarness feedback="correct" onNext={onNext} />);

    fireEvent.click(screen.getByTestId("lesson-presenter-forward"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
