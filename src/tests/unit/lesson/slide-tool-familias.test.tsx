import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("parabola-explorador", () => {
  it("y = x² − 6x + 6: vértice (3, −3), mínimo; con a < 0 es máximo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "parabola-explorador", params: { a: 1, b: -6, c: 6 } }} />);
    expect(screen.getByTestId("tool-parab-vertice").textContent).toContain("3");
    expect(screen.getByTestId("tool-parab-forma")).toHaveTextContent("mínimo");
    fireEvent.change(slider("a"), { target: { value: "-1" } });
    expect(screen.getByTestId("tool-parab-forma")).toHaveTextContent("máximo");
  });
  it("cortes con los ejes de x² − 4", () => {
    render(<SlideTool block={{ kind: "tool", tool: "parabola-explorador", params: { a: 1, b: 0, c: -4 } }} />);
    expect(screen.getByTestId("tool-parab-cortes")).toHaveTextContent("(−2, 0) y (2, 0)");
  });
});

describe("hiperbola-explorador", () => {
  it("y = 3/(x+3): asíntotas x = −3 e y = 0", () => {
    render(<SlideTool block={{ kind: "tool", tool: "hiperbola-explorador", initial: [3, -3, 0] }} />);
    expect(screen.getByTestId("tool-hip-asintotas")).toHaveTextContent("x = −3");
    expect(screen.getByTestId("tool-hip-asintotas")).toHaveTextContent("y = 0");
  });
});

describe("radical-explorador", () => {
  it("√(x − 4): dominio [4, +∞); reflejada: (−∞, 4]", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radical-explorador", initial: [1, 4, 0, 0] }} />);
    expect(screen.getByTestId("tool-rad-dominio")).toHaveTextContent("[4, +∞)");
    fireEvent.click(screen.getByRole("button", { name: /Reflejar/ }));
    expect(screen.getByTestId("tool-rad-dominio")).toHaveTextContent("(−∞, 4]");
  });
  it("recorrido con k", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radical-explorador", initial: [1, 0, -5, 0] }} />);
    expect(screen.getByTestId("tool-rad-recorrido")).toHaveTextContent("[−5, +∞)");
  });
});

describe("exponencial-explorador", () => {
  it("base 2 crece; base 0,5 decrece", () => {
    render(<SlideTool block={{ kind: "tool", tool: "exponencial-explorador", params: { a: 2 } }} />);
    expect(screen.getByTestId("tool-exp-tipo")).toHaveTextContent("Creciente");
    fireEvent.change(slider("Base a"), { target: { value: "1" } });
    expect(screen.getByTestId("tool-exp-tipo")).toHaveTextContent("Decreciente");
  });
});

describe("compuesto-explorador", () => {
  it("450 € al 5 % durante 5 años → 574,33 €", () => {
    render(<SlideTool block={{ kind: "tool", tool: "compuesto-explorador", initial: [450, 5, 5] }} />);
    expect(screen.getByTestId("tool-comp-valor").textContent?.replace(/\s/g, "")).toContain("574,33€");
    expect(screen.getByTestId("tool-comp-mitad")).toHaveTextContent("duplica");
  });
});
