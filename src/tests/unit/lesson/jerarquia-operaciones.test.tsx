import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JerarquiaOperacionesModule } from "@/components/lesson/stage/modules/jerarquia-operaciones/JerarquiaOperacionesModule";
import { divisionOrdenOperacionesNaturalesLesson } from "@/data/lessons/division-orden-operaciones-naturales";

describe("jerarquía de operaciones", () => {
  it("la lección usa solo pasos de escenario y elección táctil", () => {
    const steps = divisionOrdenOperacionesNaturalesLesson.steps;
    expect(steps).toHaveLength(6);
    expect(steps.every((step) => step.type !== "fill_in_blank")).toBe(true);
    expect(steps.filter((step) => step.type === "predict").every((step) => step.mode === "choice")).toBe(
      true,
    );
  });

  it("renderiza la escalera con aria-label", () => {
    render(<JerarquiaOperacionesModule scene="escalera-reglas" />);
    expect(screen.getByLabelText("Orden de las operaciones")).toBeInTheDocument();
  });

  it("renderiza el ejemplo de multiplicación prioritaria", () => {
    render(<JerarquiaOperacionesModule scene="ejemplo-mul-primero" revealPlayed={false} />);
    expect(screen.getByLabelText("Cuatro más tres menos dos por tres")).toBeInTheDocument();
  });
});
