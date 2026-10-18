import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  clampFractionValues,
  FractionProductTool,
  FRACTION_TOOL_MAX_DEN,
} from "@/components/lesson/slide/tools/FractionProductTool";

function value(label: string): number {
  return Number(screen.getByTestId(`fraction-tool-${label}`).textContent);
}

describe("clampFractionValues", () => {
  it("mantiene fracciones propias y denominadores entre 1 y 8", () => {
    expect(clampFractionValues({ a: 9, b: 4, c: -3, d: 99 })).toEqual({ a: 4, b: 4, c: 0, d: FRACTION_TOOL_MAX_DEN });
    expect(clampFractionValues({ a: 5, b: 0, c: 1, d: 1 })).toEqual({ a: 1, b: 1, c: 1, d: 1 });
  });
});

describe("FractionProductTool", () => {
  it("muestra el producto y el resultado simplificado de los valores iniciales", () => {
    render(<FractionProductTool initial={[3, 4, 2, 5]} />);
    expect(screen.getByTestId("fraction-tool-result").textContent).toContain("6");
    expect(screen.getByTestId("fraction-tool-result").textContent).toContain("20");
  });

  it("cambia el resultado al pulsar los botones y nunca sale de los límites", () => {
    render(<FractionProductTool initial={[1, 2, 1, 2]} />);
    for (let i = 0; i < 20; i += 1) {
      fireEvent.click(screen.getByLabelText("Más denominador 1"));
    }
    expect(value("denominador 1")).toBe(FRACTION_TOOL_MAX_DEN);
    for (let i = 0; i < 20; i += 1) {
      fireEvent.click(screen.getByLabelText("Más numerador 1"));
    }
    expect(value("numerador 1")).toBe(FRACTION_TOOL_MAX_DEN);
    for (let i = 0; i < 20; i += 1) {
      fireEvent.click(screen.getByLabelText("Menos denominador 1"));
    }
    // al bajar el denominador, el numerador no puede quedarse por encima
    expect(value("denominador 1")).toBe(1);
    expect(value("numerador 1")).toBe(1);
  });

  it("con un numerador 0 el producto es 0", () => {
    render(<FractionProductTool initial={[3, 4, 2, 5]} />);
    for (let i = 0; i < 5; i += 1) {
      fireEvent.click(screen.getByLabelText("Menos numerador 1"));
    }
    expect(value("numerador 1")).toBe(0);
    expect(screen.getByTestId("fraction-tool-result").textContent).toContain("0");
    expect(screen.queryByRole("button", { name: /reiniciar/i })).toBeNull();
  });
});
