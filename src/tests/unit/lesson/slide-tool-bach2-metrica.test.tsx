import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de geometría métrica (2.º Bachillerato)", () => {
  it("angulos-espacio-explorador: rectas, recta y plano, planos y vector nulo", () => {
    const a = show("angulos-espacio-explorador", [0, 1, 1, 0, 1, 0, 0]);
    expect(screen.getByTestId("tool-ae-ang")).toHaveTextContent("45°");
    a.unmount();
    const b = show("angulos-espacio-explorador", [1, 1, 1, 1, 0, 0, 1]);
    expect(screen.getByTestId("tool-ae-formula")).toHaveTextContent("sen");
    expect(screen.getByTestId("tool-ae-ang")).toHaveTextContent("35,26°");
    b.unmount();
    const c = show("angulos-espacio-explorador", [0, 1, 2, 2, 2, 1, -2]);
    expect(screen.getByTestId("tool-ae-perp")).toBeInTheDocument();
    c.unmount();
    show("angulos-espacio-explorador", [0, 0, 0, 0, 1, 1, 1]);
    expect(screen.getByTestId("tool-ae-ang")).toHaveTextContent("no definido");
  });
  it("proyeccion-simetrico-explorador: plano, recta y punto", () => {
    const a = show("proyeccion-simetrico-explorador", [0, 3, 1, 2, 1, 1, 1, -3]);
    expect(screen.getByTestId("tool-ps-pie")).toHaveTextContent("(2, 0, 1)");
    expect(screen.getByTestId("tool-ps-sim")).toHaveTextContent("(1, −1, 0)");
    a.unmount();
    const b = show("proyeccion-simetrico-explorador", [1, 2, 3, 4, 1, 1, 1, 1, 1, 0]);
    expect(screen.getByTestId("tool-ps-pie")).toHaveTextContent("(5/2, 5/2, 1)");
    expect(screen.getByTestId("tool-ps-sim")).toHaveTextContent("(3, 2, −2)");
    b.unmount();
    const c = show("proyeccion-simetrico-explorador", [2, 1, -1, 1, 0, -1, 2]);
    expect(screen.getByTestId("tool-ps-sim")).toHaveTextContent("(−1, −1, 3)");
    c.unmount();
    show("proyeccion-simetrico-explorador", [Number.NaN, 99]);
    show("proyeccion-simetrico-explorador");
  });
  it("distancias-espacio-explorador: punto-plano, punto-recta y rectas", () => {
    const a = show("distancias-espacio-explorador", [0, 6, 0, 0, 1, 2, 2, 3]);
    expect(screen.getByTestId("tool-de-exacta")).toHaveTextContent("3");
    a.unmount();
    const b = show("distancias-espacio-explorador", [1, 1, 3, 1, 0, 0, 0, 3, 0, 0]);
    expect(screen.getByTestId("tool-de-exacta")).toHaveTextContent("√10");
    b.unmount();
    const c = show("distancias-espacio-explorador", [2, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 1, 0]);
    expect(screen.getByTestId("tool-de-exacta")).toHaveTextContent("5");
    expect(screen.getByTestId("tool-de-nota")).toHaveTextContent("cruzan");
    fireEvent.change(screen.getByLabelText("Filas P, u, Q, v33"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-de-exacta")).toHaveTextContent("0");
    c.unmount();
    show("distancias-espacio-explorador");
  });
});
