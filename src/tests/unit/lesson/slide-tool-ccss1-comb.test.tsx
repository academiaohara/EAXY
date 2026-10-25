import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de combinatoria (CCSS I)", () => {
  it("pascal-explorador: C(5, 2) = 10 = 4 + 6 y fila que suma 2⁵", () => {
    show("pascal-explorador", [5, 2]);
    expect(screen.getByTestId("tool-pa-valor")).toHaveTextContent("C(5, 2) = 10");
    expect(screen.getByTestId("tool-pa-suma")).toHaveTextContent("32 = 2⁵");
    expect(screen.getByTestId("tool-pa-regla")).toHaveTextContent("4 + 6 = 10");
  });
  it("pascal-explorador: borde, k mayor que n y valores raros", () => {
    show("pascal-explorador", [0, 0]);
    expect(screen.getByTestId("tool-pa-regla")).toHaveTextContent("bordes");
    const b = show("pascal-explorador", [3, 9]);
    expect(screen.getAllByTestId("tool-pa-valor").at(-1)).toHaveTextContent("C(3, 3) = 1");
    b.unmount();
    show("pascal-explorador", [Number.NaN, -4]);
    show("pascal-explorador");
  });
  it("binomio-explorador: (x + 2)⁴ y su término k = 1", () => {
    show("binomio-explorador", [4, 1, 2, 1]);
    expect(screen.getByTestId("tool-bi-coef")).toHaveTextContent("8");
    expect(screen.getByTestId("tool-bi-suma")).toHaveTextContent("81 = (1 + 2)⁴");
  });
  it("binomio-explorador: coeficientes negativos y valores raros", () => {
    show("binomio-explorador", [5, 2, -1, 2]);
    expect(screen.getAllByTestId("tool-bi-coef").at(-1)).toHaveTextContent("80");
    expect(screen.getAllByTestId("tool-bi-suma").at(-1)).toHaveTextContent("1 = (2 − 1)⁵");
    show("binomio-explorador", [Number.NaN, 99, -99, 99]);
    show("binomio-explorador");
  });
});
