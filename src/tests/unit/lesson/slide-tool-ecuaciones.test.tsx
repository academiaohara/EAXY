import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp) => screen.getByLabelText(label) as HTMLInputElement;

describe("tanteo-explorador", () => {
  it("x³ + 5 = 69: se queda corto con 3 y es exacta con 4", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tanteo-explorador", params: { a: 0, b: 30 } }} />);
    expect(screen.getByTestId("tool-tanteo-estado")).toHaveTextContent("corto");
    fireEvent.change(slider(/Valor de x/), { target: { value: "40" } });
    expect(screen.getByTestId("tool-tanteo-estado")).toHaveTextContent("exacta");
    fireEvent.change(slider(/Valor de x/), { target: { value: "50" } });
    expect(screen.getByTestId("tool-tanteo-estado")).toHaveTextContent("Se pasa");
  });
  it("acota y cambia de ecuación", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tanteo-explorador", params: { a: 99, b: 999 } }} />);
    expect(slider(/Valor de x/).value).toBe("100");
    fireEvent.click(screen.getByRole("button", { name: "Ecuación 1" }));
    expect(screen.getByTestId("tool-readout").textContent).toContain("69");
  });
});

describe("ecuacion-lineal-explorador", () => {
  it("3x + 15 = x + 1 → x = −7; sin solución; identidad", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ecuacion-lineal-explorador", initial: [3, 15, 1, 1] }} />);
    expect(screen.getByTestId("tool-lineal-tipo")).toHaveTextContent("x = -7");
    fireEvent.change(slider(/c \(x a la derecha\)/), { target: { value: "3" } });
    expect(screen.getByTestId("tool-lineal-tipo")).toHaveTextContent("Sin solución");
    fireEvent.change(slider(/d \(número a la derecha\)/), { target: { value: "15" } });
    expect(screen.getByTestId("tool-lineal-tipo")).toHaveTextContent("Identidad");
  });
});

describe("cuadratica-explorador", () => {
  it("x² + x − 2: dos soluciones; c = 2 sin solución real; a = 0 se corrige", () => {
    render(<SlideTool block={{ kind: "tool", tool: "cuadratica-explorador", params: { a: 1, b: 1, c: -2 } }} />);
    expect(screen.getByTestId("tool-cuad-caso")).toHaveTextContent("dos soluciones");
    fireEvent.change(slider(/^c$/), { target: { value: "2" } });
    expect(screen.getByTestId("tool-cuad-caso")).toHaveTextContent("ninguna");
    fireEvent.change(slider(/^a$/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-cuad-caso")).toHaveTextContent("a = 0 no vale");
  });
});

describe("raices-factores-explorador", () => {
  it("(x−1)(x−2)(x−3) tiene soluciones 1, 2, 3", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raices-factores-explorador", initial: [1, 2, 3, 1] }} />);
    expect(screen.getByTestId("tool-raices")).toHaveTextContent("1, 2, 3");
    fireEvent.click(screen.getByRole("button", { name: "2 factores" }));
    expect(screen.getByTestId("tool-raices")).toHaveTextContent("1, 2");
  });
});

describe("reparto-ecuacion-explorador", () => {
  it("autocar: 20 personas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "reparto-ecuacion-explorador", initial: [2000, 4, 25] }} />);
    expect(screen.getByTestId("tool-reparto-ec")).toHaveTextContent("Había 20 personas");
  });
});

describe("inecuacion-explorador", () => {
  it("−2x + 1 > 7 → x < −3 con inversión", () => {
    render(<SlideTool block={{ kind: "tool", tool: "inecuacion-explorador", initial: [-2, 1, 7, 2] }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("-3");
    expect(screen.getByTestId("tool-ineq-nota")).toHaveTextContent("invirtió");
    fireEvent.change(slider(/a \(coeficiente de x\)/), { target: { value: "2" } });
    expect(screen.getByTestId("tool-ineq-nota")).toHaveTextContent("no cambia");
  });
});
