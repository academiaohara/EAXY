import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JerarquiaOperacionesModule } from "@/components/lesson/stage/modules/jerarquia-operaciones/JerarquiaOperacionesModule";
import { divisionOrdenOperacionesNaturalesLesson } from "@/data/lessons/division-orden-operaciones-naturales";

describe("jerarquía de operaciones", () => {
  it("la lección sigue el flujo exploración → explicación → práctica", () => {
    const steps = divisionOrdenOperacionesNaturalesLesson.steps;
    expect(steps).toHaveLength(6);
    expect(
      steps.filter((step) => "module" in step && step.module === "jerarquia-operaciones"),
    ).toHaveLength(6);
    expect(steps[0]?.type).toBe("predict");
    expect(steps.filter((step) => step.type === "explore")).toHaveLength(3);
  });

  it("renderiza los tres niveles de reglas", () => {
    render(<JerarquiaOperacionesModule scene="niveles-reglas" />);
    expect(screen.getByLabelText("Niveles del orden de operaciones")).toBeInTheDocument();
    expect(screen.getByText("Paréntesis")).toBeInTheDocument();
  });

  it("renderiza la exploración Ana / Leo", () => {
    render(
      <JerarquiaOperacionesModule
        scene="exploracion-ana-leo"
        revealPlayed
        selectedChoiceId="l"
        isCorrect
      />,
    );
    expect(screen.getByLabelText("Ticket de la cafetería")).toBeInTheDocument();
    expect(screen.getByText("= 10 €")).toBeInTheDocument();
  });
});
