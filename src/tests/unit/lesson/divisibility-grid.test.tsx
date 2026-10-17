import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DivisibilityGrid } from "@/components/lesson/steps/DivisibilityGrid";
import { LessonPrimaryAction } from "@/components/lesson/LessonPrimaryAction";
import { LessonStepControlProvider, useLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { CRITERIA_DIVISORS, explainDivisibility, isDivisibleBy } from "@/lib/lesson/divisibility-criteria";
import type { DivisibilityGridStep } from "@/lib/lesson/types";

afterEach(cleanup);

describe("explainDivisibility", () => {
  it("explica cada criterio con sí y con no", () => {
    expect(explainDivisibility(1350, 2)).toContain("**sí**");
    expect(explainDivisibility(1357, 2)).toContain("**no**");
    expect(explainDivisibility(135, 3)).toContain("1 + 3 + 5 = 9");
    expect(explainDivisibility(418, 9)).toContain("**no**");
    expect(explainDivisibility(1532, 4)).toContain("32 = 4 \\cdot 8");
    expect(explainDivisibility(2915, 11)).toContain("= 11");
    expect(explainDivisibility(2630, 6)).toContain("**no**");
    expect(explainDivisibility(7392, 12)).toContain("**sí**");
  });

  it("el veredicto siempre coincide con la división real", () => {
    for (const d of CRITERIA_DIVISORS) {
      for (const n of [7, 18, 100, 418, 1350, 2915, 5148, 7392]) {
        const text = explainDivisibility(n, d);
        expect(text.includes("**sí**"), `${n}/${d}`).toBe(isDivisibleBy(n, d));
      }
    }
  });
});

function CheckButton() {
  const { control } = useLessonStepControl();
  return control ? <LessonPrimaryAction control={control} /> : null;
}

describe("DivisibilityGrid", () => {
  const step: DivisibilityGridStep = {
    id: "g",
    type: "divisibility_grid",
    title: "Cuadrícula",
    question: "¿Divisible?",
    numbers: [10, 7],
    divisors: [2, 5],
  };

  function renderGrid(onCheck = vi.fn()) {
    render(
      <LessonStepControlProvider>
        <DivisibilityGrid step={step} onCheck={onCheck} />
        <CheckButton />
      </LessonStepControlProvider>,
    );
    return onCheck;
  }

  it("pone ✓ si la casilla es correcta, ✗ si no, y explica", () => {
    renderGrid();
    fireEvent.click(screen.getByRole("button", { name: "10 entre 2" }));
    expect(screen.getByRole("button", { name: /10 entre 2: ✓/ })).toBeInTheDocument();
    expect(screen.getByTestId("grid-explanation")).toHaveTextContent("lleva ✓");

    fireEvent.click(screen.getByRole("button", { name: "7 entre 2" }));
    expect(screen.getByRole("button", { name: /7 entre 2: ✗/ })).toBeInTheDocument();
    expect(screen.getByTestId("grid-explanation")).toHaveTextContent("Aquí no va");
  });

  it("se completa al marcar todos los ✓ y los fallos hacen la respuesta incorrecta", () => {
    const onCheck = vi.fn();
    renderGrid(onCheck);
    fireEvent.click(screen.getByRole("button", { name: "7 entre 5" }));
    fireEvent.click(screen.getByRole("button", { name: "10 entre 2" }));
    expect(screen.getByTestId("lesson-check-button")).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "10 entre 5" }));
    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(expect.objectContaining({ correct: false }));
  });
});
