import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PracticaReducirExpresion } from "@/components/lesson/stage/modules/jerarquia-operaciones/PracticaReducirExpresion";
import { pickNextOperation } from "@/lib/lesson/stage/jerarquia-reduce";
import { divisionOrdenOperacionesNaturalesLesson } from "@/data/lessons/division-orden-operaciones-naturales";

const step = divisionOrdenOperacionesNaturalesLesson.steps.find((s) => s.id === "practica-mul-primero");
const tokens =
  step && "goal" in step && step.goal.kind === "hierarchy-reduce" ? [...step.goal.tokens] : [];

describe("PracticaReducirExpresion", () => {
  it("pickNextOperation prioriza × en los tokens de la lección", () => {
    expect(pickNextOperation(tokens).m).toBe(5);
    expect(tokens[5]).toBe("×");
  });

  it("acepta × como primera operación en 4 + 3 − 2 × 3", async () => {
    const onTokensChange = vi.fn();
    render(
      <PracticaReducirExpresion
        initialTokens={tokens}
        tokens={tokens}
        history={[]}
        onTokensChange={onTokensChange}
      />,
    );

    fireEvent.click(screen.getByTestId("jerarquia-op-5"));

    await waitFor(
      () => {
        expect(onTokensChange).toHaveBeenCalledWith(["4", "+", "3", "−", "6"], tokens);
      },
      { timeout: 2000 },
    );
    expect(screen.queryByText("Mismo nivel: de izquierda a derecha.")).not.toBeInTheDocument();
  });
});
