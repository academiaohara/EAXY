import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de vectores (2.º Bachillerato)", () => {
  it("vectores-puntos-explorador: AB, módulo y punto medio", () => {
    show("vectores-puntos-explorador", [1, 0, 1, 3, 2, 4]);
    expect(screen.getByTestId("tool-vp-ab")).toHaveTextContent("(2, 2, 3)");
    expect(screen.getByTestId("tool-vp-mod")).toHaveTextContent("√17");
    show("vectores-puntos-explorador", [Number.NaN, 99, -99]);
    show("vectores-puntos-explorador");
  });
  it("vectores-dependencia-explorador: base y coplanares", () => {
    show("vectores-dependencia-explorador", [1, 0, 1, 0, 1, 1, 1, 1, 0]);
    expect(screen.getByTestId("tool-vd-det")).toHaveTextContent("−2");
    expect(screen.getByTestId("tool-vd-estado")).toHaveTextContent("base");
    fireEvent.change(screen.getByLabelText("Filas u, v, w33"), { target: { value: "2" } });
    expect(screen.getByTestId("tool-vd-rango")).toHaveTextContent("2");
    expect(screen.getByTestId("tool-vd-estado")).toHaveTextContent("dependientes");
    show("vectores-dependencia-explorador");
  });
  it("producto-escalar-3d-explorador: perpendiculares, ángulo y vector nulo", () => {
    const a = show("producto-escalar-3d-explorador", [1, 2, 2, 2, 0, -1]);
    expect(screen.getByTestId("tool-pe-dot")).toHaveTextContent("0");
    expect(screen.getByTestId("tool-pe-tipo")).toHaveTextContent("perpendiculares");
    a.unmount();
    const b = show("producto-escalar-3d-explorador", [1, 1, 0, 0, 1, 1]);
    expect(screen.getByTestId("tool-pe-ang")).toHaveTextContent("60");
    b.unmount();
    show("producto-escalar-3d-explorador", [0, 0, 0, 1, 1, 1]);
    expect(screen.getByTestId("tool-pe-ang")).toHaveTextContent("no definido");
  });
  it("producto-vectorial-explorador: u×v y áreas", () => {
    show("producto-vectorial-explorador", [-1, 2, 0, -1, 0, 3]);
    expect(screen.getByTestId("tool-pv-cross")).toHaveTextContent("(6, 3, 2)");
    expect(screen.getByTestId("tool-pv-area")).toHaveTextContent("7");
    expect(screen.getByTestId("tool-pv-tri")).toHaveTextContent("3,5");
    show("producto-vectorial-explorador");
  });
  it("producto-mixto-explorador: volúmenes y coplanares", () => {
    const a = show("producto-mixto-explorador", [3, 0, 0, 1, 3, 0, 1, 1, 3]);
    expect(screen.getByTestId("tool-pm-mixto")).toHaveTextContent("27");
    expect(screen.getByTestId("tool-pm-tetra")).toHaveTextContent("4,5");
    a.unmount();
    show("producto-mixto-explorador", [1, 0, 1, 0, 1, 1, 1, 1, 2]);
    expect(screen.getByTestId("tool-pm-estado")).toHaveTextContent("coplanares");
    show("producto-mixto-explorador");
  });
});
