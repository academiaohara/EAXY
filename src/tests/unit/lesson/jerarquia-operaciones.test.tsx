import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JerarquiaOperacionesModule } from "@/components/lesson/stage/modules/jerarquia-operaciones/JerarquiaOperacionesModule";
import { interactiveLessons } from "@/data/lessons";

const divisionOrdenOperacionesNaturalesLesson =
  interactiveLessons["division-orden-operaciones-naturales"];

describe("jerarquía de operaciones", () => {
  it("la lección sigue el flujo exploración → explicación → práctica", () => {
    const steps = divisionOrdenOperacionesNaturalesLesson.steps;
    expect(steps).toHaveLength(9);
    expect(
      steps.filter(
        (step) => "module" in step && step.module === "jerarquia-operaciones",
      ),
    ).toHaveLength(5);
    expect(steps[0]?.type).toBe("predict");
    expect(steps.filter((step) => step.type === "explore")).toHaveLength(3);
    expect(steps.filter((step) => step.type === "slide")).toHaveLength(2);
    expect(steps.filter((step) => step.type === "explore").at(-1)?.id).toBe(
      "practica-orden-niveles",
    );
    expect(steps.at(-1)?.id).toBe("hortelano-predict");
  });

  it("renderiza los tres niveles de reglas", () => {
    render(<JerarquiaOperacionesModule scene="niveles-reglas" />);
    expect(
      screen.getByLabelText("Niveles del orden de operaciones"),
    ).toBeInTheDocument();
    expect(screen.getByText("Paréntesis")).toBeInTheDocument();
    expect(screen.getByText("Multiplicación y división")).toBeInTheDocument();
    expect(screen.getByText("Suma y resta")).toBeInTheDocument();
  });

  it("renderiza el orden de prioridad arrastrable", () => {
    render(
      <JerarquiaOperacionesModule
        scene="orden-prioridad"
        tapSequence={["", "", ""]}
        onTapSequenceChange={() => {}}
      />,
    );
    expect(screen.getByLabelText("Ordenar niveles de prioridad")).toBeInTheDocument();
    expect(screen.getByTestId("jerarquia-priority-slot-1")).toBeInTheDocument();
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
