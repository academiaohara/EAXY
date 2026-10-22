import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp) => screen.getByLabelText(label) as HTMLInputElement;

describe("monomio-explorador", () => {
  it("−5x²y: grado 3 y valor para x = 2, y = −3", () => {
    render(<SlideTool block={{ kind: "tool", tool: "monomio-explorador", params: { a: -5, b: 2, c: 1 } }} />);
    expect(screen.getByTestId("tool-mono-datos")).toHaveTextContent("grado 3");
    expect(screen.getByTestId("tool-readout").textContent).toContain("60");
    fireEvent.change(slider(/Exponente de x/), { target: { value: "0" } });
    fireEvent.change(slider(/Exponente de y/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-mono-datos")).toHaveTextContent("grado 0");
  });
  it("acota", () => {
    render(<SlideTool block={{ kind: "tool", tool: "monomio-explorador", params: { a: 99, b: 99, c: -4 } }} />);
    expect(slider(/Coeficiente/).value).toBe("9");
    expect(slider(/Exponente de x/).value).toBe("5");
    expect(slider(/Exponente de y/).value).toBe("0");
  });
});

describe("monomios-operador", () => {
  it("suma de semejantes y de no semejantes; cociente no monomio", () => {
    render(<SlideTool block={{ kind: "tool", tool: "monomios-operador", initial: [3, 2, 4, 2, 0, 0, 0] }} />);
    expect(screen.getByTestId("tool-mono-nota")).toHaveTextContent("Semejantes");
    expect(screen.getByTestId("tool-readout").textContent).toContain("7x");
    fireEvent.change(slider(/Exponente de B/), { target: { value: "3" } });
    expect(screen.getByTestId("tool-mono-nota")).toHaveTextContent("No son semejantes");
    fireEvent.click(screen.getByRole("button", { name: ":" }));
    expect(screen.getByTestId("tool-mono-nota")).toHaveTextContent("no es un monomio");
    fireEvent.click(screen.getByRole("button", { name: "·" }));
    expect(screen.getByTestId("tool-readout").textContent).toContain("12");
  });
});

describe("polinomio-explorador", () => {
  it("grado y valor", () => {
    render(<SlideTool block={{ kind: "tool", tool: "polinomio-explorador", initial: [0, 1, -2, 1], params: { a: 2 } }} />);
    expect(screen.getByTestId("tool-poli-grado")).toHaveTextContent("Grado: 2");
    expect(screen.getByTestId("tool-readout").textContent).toContain("P(2) = 1");
    fireEvent.change(slider(/Coeficiente de x³/), { target: { value: "2" } });
    expect(screen.getByTestId("tool-poli-grado")).toHaveTextContent("Grado: 3");
  });
});

describe("polinomios-operador", () => {
  it("A = 3x²+5x−2, B = x³+4x²−5", () => {
    render(<SlideTool block={{ kind: "tool", tool: "polinomios-operador", initial: [0, 3, 5, -2, 1, 4, 0, -5, 0] }} />);
    expect(screen.getByTestId("tool-poli-resultado")).toHaveTextContent("Grado del resultado: 3");
    fireEvent.click(screen.getByRole("button", { name: "A − B" }));
    expect(screen.getByTestId("tool-readout").textContent).toContain("5x + 3");
  });
});

describe("producto-polinomios-explorador", () => {
  it("(x+2)(x+3) = x²+5x+6 y se comprueba", () => {
    render(<SlideTool block={{ kind: "tool", tool: "producto-polinomios-explorador", initial: [1, 2, 1, 3] }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("5x");
    expect(screen.getByTestId("tool-prod-check")).toHaveTextContent("✓");
  });
});

describe("factor-comun-explorador", () => {
  it("encuentra 3x y comprueba", () => {
    render(<SlideTool block={{ kind: "tool", tool: "factor-comun-explorador", initial: [3, 1, 2, -3, 4] }} />);
    expect(screen.getByTestId("tool-fc-check")).toHaveTextContent("✓");
    expect(screen.getByTestId("tool-readout").textContent).toContain("3x");
  });
  it("sin factor si hay un término suelto", () => {
    render(<SlideTool block={{ kind: "tool", tool: "factor-comun-explorador", initial: [1, 0, 2, -3, 4] }} />);
    expect(screen.getByTestId("tool-fc-check")).toHaveTextContent("✓");
  });
});

describe("mcm-explorador", () => {
  it("m.c.m.(2, 3, 4) = 12", () => {
    render(<SlideTool block={{ kind: "tool", tool: "mcm-explorador", initial: [2, 3, 4] }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("12");
    expect(screen.getByTestId("tool-mcm-factores").textContent).toContain("6x");
    fireEvent.change(slider(/Denominador 3/), { target: { value: "5" } });
    expect(screen.getByTestId("tool-readout").textContent).toContain("30");
  });
});
