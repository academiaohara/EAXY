import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonTutorProvider } from "@/components/lesson/LessonTutorContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";

afterEach(() => {
  cleanup();
});

const CONTENT = ["Una **solución** hace cierta la igualdad.", "Hay que **Ver siguiente paso**."];

describe("ConceptCard", () => {
  it("pide al tutor que explique el término resaltado que se pulsa", () => {
    const askAboutConcept = vi.fn();
    render(
      <LessonTutorProvider value={{ askAboutConcept }}>
        <ConceptCard title="Soluciones" content={CONTENT} showTitle={false} />
      </LessonTutorProvider>,
    );

    fireEvent.click(screen.getByText("solución"));

    expect(askAboutConcept).toHaveBeenCalledWith("solucion", "solución");
    expect(screen.getByTestId("lesson-theory-term-hint")).toBeInTheDocument();
  });

  it("no hace pulsables los términos que el tutor no sabe explicar", () => {
    const askAboutConcept = vi.fn();
    render(
      <LessonTutorProvider value={{ askAboutConcept }}>
        <ConceptCard title="Soluciones" content={CONTENT} showTitle={false} />
      </LessonTutorProvider>,
    );

    const plain = screen.getByText("Ver siguiente paso");
    fireEvent.click(plain);

    expect(plain).not.toHaveAttribute("data-concept");
    expect(askAboutConcept).not.toHaveBeenCalled();
  });

  it("fuera de una lección muestra los términos sin que se puedan pulsar", () => {
    render(<ConceptCard title="Soluciones" content={CONTENT} showTitle={false} />);

    expect(screen.getByText("solución")).not.toHaveAttribute("data-concept");
    expect(screen.queryByTestId("lesson-theory-term-hint")).not.toBeInTheDocument();
  });

  it("muestra una idea por párrafo y las ayudas visuales al lado", () => {
    render(
      <ConceptCard
        title="Soluciones"
        content={CONTENT}
        showTitle={false}
        split
        visuals={[{ kind: "solution-check", a: 1, b: 2, c: 4, pairs: [[2, 1]] }]}
      />,
    );

    expect(screen.getAllByTestId("lesson-theory-idea")).toHaveLength(2);
    expect(screen.getByTestId("lesson-visual-solution-check")).toBeInTheDocument();
  });
});
