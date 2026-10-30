import { useEffect } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { StoryboardStepView } from "@/components/lesson/storyboard/StoryboardStepView";
import type { StoryboardStep } from "@/lib/lesson/types";

const step: StoryboardStep = {
  id: "lenguaje-plano",
  type: "storyboard",
  title: "Un plano elimina las dudas",
  scene: "dt1-linea-tiempo-dibujo",
  autoplay: false,
  phases: [
    {
      eyebrow: "Primera decisión",
      text: "La forma describe el objeto.",
      highlights: [{ text: "forma", tone: "cobalt" }],
    },
    {
      eyebrow: "Información completa",
      text: "Las medidas permiten construirlo sin adivinar.",
      highlights: [
        { text: "medidas", tone: "emerald" },
        { text: "palabra ausente", tone: "amber" },
      ],
    },
  ],
};

function ControlProbe({ onContinue }: { onContinue: () => void }) {
  const { control } = useLessonStepControl();
  useEffect(() => {
    if (control?.label === "Continuar") {
      onContinue();
    }
  }, [control, onContinue]);
  return <span data-testid="registered-control">{control?.label ?? "none"}</span>;
}

function renderStoryboard(
  candidate: StoryboardStep = step,
  options: { presentationUnlocked?: boolean; onContinue?: () => void } = {},
) {
  const onContinue = options.onContinue ?? vi.fn();
  render(
    <LessonStepControlProvider>
      <StoryboardStepView
        step={candidate}
        onContinue={onContinue}
        presentationUnlocked={options.presentationUnlocked}
      />
      <ControlProbe onContinue={() => undefined} />
    </LessonStepControlProvider>,
  );
  return { onContinue };
}

describe("StoryboardStepView", () => {
  beforeEach(() => {
    vi.useRealTimers();
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("usa todo el ancho sin la tarjeta del reproductor y sincroniza texto y escena", () => {
    renderStoryboard();

    const root = screen.getByTestId("lesson-storyboard");
    expect(root).toHaveClass("w-full");
    expect(root).not.toHaveClass("rounded-2xl", "border");
    expect(screen.getByTestId("lesson-storyboard-narration")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getByText("forma")).toHaveAttribute("data-tone", "cobalt");
    expect(screen.getByText("1/2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Avanzar un paso" }));

    expect(screen.getByText("2/2")).toBeInTheDocument();
    expect(screen.getByText("medidas")).toHaveAttribute("data-tone", "emerald");
    expect(screen.getByText(/sin adivinar/)).toBeInTheDocument();
    expect(screen.getByTestId("registered-control")).toHaveTextContent("Continuar");
  });

  it("una sola fase permite continuar y conserva controles válidos", () => {
    renderStoryboard({ ...step, phases: [step.phases[0]!] });

    expect(screen.getByText("1/1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retroceder un paso" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Avanzar un paso" })).toBeDisabled();
    expect(screen.getByTestId("registered-control")).toHaveTextContent("Continuar");
  });

  it("movimiento reducido evita el avance automático", () => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    renderStoryboard({ ...step, autoplay: true, beatMs: 50 });

    vi.advanceTimersByTime(200);

    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reproducir animación" })).toBeInTheDocument();
  });

  it("un paso ya superado registra Continuar desde la primera fase", () => {
    renderStoryboard(step, { presentationUnlocked: true });
    expect(screen.getByTestId("registered-control")).toHaveTextContent("Continuar");
  });
});
