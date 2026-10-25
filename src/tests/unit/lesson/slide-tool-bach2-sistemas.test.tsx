import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de sistemas lineales (2.º Bachillerato)", () => {
  it("sistema-rouche-explorador: determinado, indeterminado, incompatible y homogéneo", () => {
    const a = show("sistema-rouche-explorador", [1, 1, 1, 3, 2, -1, 1, 2, 1, 2, -3, 0]);
    expect(screen.getByTestId("tool-sr-tipo")).toHaveTextContent("determinado");
    expect(screen.getByTestId("tool-sr-solucion")).toHaveTextContent("x = 1, y = 1, z = 1");
    a.unmount();
    const b = show("sistema-rouche-explorador", [1, 1, 1, 3, 2, -1, 1, 2, 3, 0, 2, 5]);
    expect(screen.getByTestId("tool-sr-tipo")).toHaveTextContent("indeterminado");
    expect(screen.getByTestId("tool-sr-general")).toHaveTextContent("λ");
    fireEvent.change(screen.getByLabelText("B31"), { target: { value: "6" } });
    expect(screen.getByTestId("tool-sr-tipo")).toHaveTextContent("Incompatible");
    expect(screen.getByTestId("tool-sr-sin")).toBeInTheDocument();
    b.unmount();
    const c = show("sistema-rouche-explorador", [1, -1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 0, 1]);
    expect(screen.getByTestId("tool-sr-tipo")).toHaveTextContent("indeterminado");
    expect(screen.getByTestId("tool-sr-general")).toHaveTextContent("x = λ");
    c.unmount();
    show("sistema-rouche-explorador", [Number.NaN, 999999, -999999]);
    show("sistema-rouche-explorador");
  });

  it("sistema-rouche-explorador: el sistema del cajero tiene la solución del problema", () => {
    show("sistema-rouche-explorador", [1, 1, 1, 225, 50, 20, 10, 7000, 1, -2, 1, 0]);
    expect(screen.getByTestId("tool-sr-solucion")).toHaveTextContent("x = 100, y = 75, z = 50");
  });

  it("cramer-explorador: solución 2, −1, 3 y matriz singular", () => {
    const a = show("cramer-explorador", [3, 2, 3, -1, 3, -1, 5, 1, 2, 4, -2, 22, 12]);
    expect(screen.getByTestId("tool-cr-det")).toHaveTextContent("−56");
    expect(screen.getByTestId("tool-cr-dx")).toHaveTextContent("−112");
    expect(screen.getByTestId("tool-cr-solucion")).toHaveTextContent("x = −112 / −56 = 2");
    fireEvent.click(screen.getByRole("button", { name: "2 × 2" }));
    fireEvent.change(screen.getByLabelText("A11"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("A12"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("A21"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("A22"), { target: { value: "4" } });
    expect(screen.getByTestId("tool-cr-nosistema")).toBeInTheDocument();
    a.unmount();
    show("cramer-explorador", [Number.NaN, 99]);
    show("cramer-explorador");
  });

  it("sistema-familia-explorador: casos especiales de cada familia", () => {
    const a = show("sistema-familia-explorador", [0, 0]);
    expect(screen.getByTestId("tool-sf-tipo")).toHaveTextContent("Incompatible");
    a.unmount();
    const b = show("sistema-familia-explorador", [0, 3]);
    expect(screen.getByTestId("tool-sf-tipo")).toHaveTextContent("indeterminado");
    expect(screen.getByTestId("tool-sf-general")).toHaveTextContent("y = 1 − λ");
    b.unmount();
    const c = show("sistema-familia-explorador", [1, -2]);
    expect(screen.getByTestId("tool-sf-tipo")).toHaveTextContent("Incompatible");
    c.unmount();
    const d = show("sistema-familia-explorador", [1, -1]);
    expect(screen.getByTestId("tool-sf-solucion")).toHaveTextContent("x = 0, y = 1, z = 0");
    d.unmount();
    show("sistema-familia-explorador", [2, 1]);
    expect(screen.getByTestId("tool-sf-rA")).toHaveTextContent("1");
    show("sistema-familia-explorador", [Number.NaN, 99]);
    show("sistema-familia-explorador");
  });
});
