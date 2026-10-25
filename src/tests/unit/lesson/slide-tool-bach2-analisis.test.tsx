import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de análisis (2.º Bachillerato)", () => {
  it("uno-infinito-explorador: (1 + 1/n)^n y e^(a·b)", () => {
    show("uno-infinito-explorador", [1, 1, 6]);
    expect(screen.getByTestId("tool-ui-valor")).toHaveTextContent("2,71828");
    expect(screen.getByTestId("tool-ui-limite")).toHaveTextContent("2,71828");
    show("uno-infinito-explorador", [3, 2, 7]);
    expect(screen.getAllByTestId("tool-ui-limite").at(-1)).toHaveTextContent("403,42879");
    show("uno-infinito-explorador", [Number.NaN, 99, -4]);
    show("uno-infinito-explorador");
  });

  it("lhopital-explorador: pasos, límite y tabla", () => {
    show("lhopital-explorador", [2, 3]);
    expect(screen.getByTestId("tool-lh-limite")).toHaveTextContent("1/2");
    expect(screen.getByTestId("tool-lh-pasos")).toHaveTextContent("cos x / 2");
    expect(screen.getByTestId("tool-lh-tabla")).toHaveTextContent("0,4999");
    show("lhopital-explorador", [4, 5]);
    show("lhopital-explorador", [Number.NaN, 99]);
    show("lhopital-explorador");
  });

  it("estudio-funcion-explorador: los pasos y la gráfica de cada función", () => {
    for (let i = 0; i < 7; i++) {
      const a = show("estudio-funcion-explorador", [i, 6]);
      expect(screen.getByTestId("tool-ef-pasos").children).toHaveLength(6);
      expect(screen.getByTestId("tool-ef-grafica")).toBeInTheDocument();
      a.unmount();
    }
    const b = show("estudio-funcion-explorador", [0, 2]);
    expect(screen.getByTestId("tool-ef-pasos").children).toHaveLength(2);
    b.unmount();
    show("estudio-funcion-explorador", [Number.NaN, 99]);
    show("estudio-funcion-explorador");
  });
});
