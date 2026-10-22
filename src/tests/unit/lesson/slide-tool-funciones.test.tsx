import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("funcion-explorador", () => {
  it("x³ − 3x + 2: valor en x = 2 y tramos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "funcion-explorador", params: { a: 0 } }} />);
    expect(screen.getByTestId("tool-fn-valor")).toHaveTextContent("x = −2 → 0");
    fireEvent.change(slider(/Valor de x/), { target: { value: "2" } });
    expect(screen.getByTestId("tool-fn-valor")).toHaveTextContent("→ 4");
    expect(screen.getByTestId("tool-fn-tramo")).toHaveTextContent("crece");
    fireEvent.change(slider(/Valor de x/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-fn-tramo")).toHaveTextContent("decrece");
    expect(screen.getByTestId("tool-fn-extremos")).toHaveTextContent("Máximo relativo en x = −1");
  });
  it("cambia de función", () => {
    render(<SlideTool block={{ kind: "tool", tool: "funcion-explorador", params: { a: 0 } }} />);
    fireEvent.click(screen.getByRole("button", { name: "Función 4" }));
    expect(screen.getByTestId("tool-fn-extremos")).toHaveTextContent("Sin máximos");
  });
});

describe("periodica-explorador", () => {
  it("t = 42 con T = 30 se comporta como t = 12", () => {
    render(<SlideTool block={{ kind: "tool", tool: "periodica-explorador", initial: [30, 42] }} />);
    expect(screen.getByTestId("tool-periodo-resto")).toHaveTextContent("como en t = 12");
    fireEvent.change(slider(/Instante/), { target: { value: "15" } });
    expect(screen.getByTestId("tool-periodo-valor")).toHaveTextContent("40");
  });
});

describe("aparcamiento-explorador", () => {
  it("1 h 15 min: 4 €, 2,5 € y 4 €", () => {
    render(<SlideTool block={{ kind: "tool", tool: "aparcamiento-explorador", params: { a: 75 } }} />);
    expect(screen.getByTestId("tool-aparcamiento-1")).toHaveTextContent("4 €");
    expect(screen.getByTestId("tool-aparcamiento-2")).toHaveTextContent("2,5 €");
    expect(screen.getByTestId("tool-aparcamiento-3")).toHaveTextContent("4 €");
  });
});
