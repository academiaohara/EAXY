import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { AnimPlayer } from "@/components/lesson/anim/AnimPlayer";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { SlideStepView } from "@/components/lesson/slide/SlideStepView";
import type { SlideBlock, SlideStep } from "@/lib/lesson/types";

const ALL_BLOCKS: SlideBlock[] = [
  { kind: "text", text: "Un **párrafo** normal." },
  { kind: "definition", text: "Una **definición**." },
  { kind: "rule", title: "Regla", text: "Texto", formula: "a + b = b + a" },
  { kind: "example", lines: [{ math: "2 + 3 = 5", note: "nota" }] },
  { kind: "warning", text: "Cuidado." },
  {
    kind: "compare",
    left: { title: "Izquierda", text: "a" },
    right: { title: "Derecha", math: ["x = 1"] },
  },
  { kind: "steps", items: ["uno", "dos"] },
  { kind: "facts", items: [{ tex: "I", label: "uno" }] },
  { kind: "formula", tex: "24 = 6 \\cdot 4" },
  { kind: "relations", items: [{ left: "24", relation: "es múltiplo de", right: "6" }] },
];

function slide(partial: Partial<SlideStep> = {}): SlideStep {
  return {
    id: "demo",
    type: "slide",
    title: "Demo",
    blocks: ALL_BLOCKS,
    ...partial,
  };
}

function renderSlide(step: SlideStep) {
  return render(
    <LessonStepControlProvider>
      <SlideStepView step={step} theme="board" onContinue={vi.fn()} />
    </LessonStepControlProvider>,
  );
}

describe("SlideStepView", () => {
  it("pinta cada tipo de bloque con su forma propia", () => {
    const { container } = renderSlide(slide());
    for (const kind of ["text", "definition", "rule", "example", "warning", "compare", "steps", "facts", "formula", "relations"]) {
      expect(container.querySelector(`[data-slide-block="${kind}"]`), kind).not.toBeNull();
    }
  });

  it("con visual coloca texto y animación en columnas distintas", () => {
    renderSlide(
      slide({
        blocks: [{ kind: "text", text: "hola" }],
        visual: { kind: "anim", scene: "romano-resta" },
      }),
    );
    expect(screen.getByTestId("lesson-slide")).toHaveAttribute("data-arrange", "split");
    expect(screen.getByTestId("lesson-slide-visual")).toContainElement(screen.getByTestId("lesson-anim"));
    expect(screen.getByTestId("lesson-slide-text")).not.toContainElement(screen.getByTestId("lesson-anim"));
  });

  it("sin visual usa una sola columna", () => {
    renderSlide(slide());
    expect(screen.getByTestId("lesson-slide")).toHaveAttribute("data-arrange", "stack");
  });
});

describe("AnimPlayer", () => {
  const captions = ["uno", "dos", "tres"];

  it("avanza y retrocede paso a paso y se detiene al interactuar", () => {
    render(
      <AnimPlayer
        label="demo"
        captions={captions}
        autoplay={false}
        render={(beat) => <span data-testid="canvas">{beat}</span>}
      />,
    );
    expect(screen.getByTestId("lesson-anim-caption")).toHaveTextContent("uno");
    fireEvent.click(screen.getByRole("button", { name: "Avanzar un paso" }));
    expect(screen.getByTestId("lesson-anim-caption")).toHaveTextContent("dos");
    expect(screen.getByTestId("canvas")).toHaveTextContent("1");
    fireEvent.click(screen.getByRole("button", { name: "Retroceder un paso" }));
    expect(screen.getByTestId("lesson-anim-caption")).toHaveTextContent("uno");
  });

  it("reproduce sola y en el último paso ofrece reiniciar", () => {
    vi.useFakeTimers();
    render(
      <AnimPlayer label="demo" captions={captions} beatMs={100} render={() => <span />} />,
    );
    expect(screen.getByTestId("lesson-anim-caption")).toHaveTextContent("uno");
    // Cada paso programa el siguiente temporizador tras renderizar.
    act(() => {
      vi.advanceTimersByTime(100);
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("lesson-anim-caption")).toHaveTextContent("tres");
    fireEvent.click(screen.getByRole("button", { name: "Reiniciar animación" }));
    expect(screen.getByTestId("lesson-anim-caption")).toHaveTextContent("uno");
    vi.useRealTimers();
  });
});
