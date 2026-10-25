import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de funciones (CCSS I)", () => {
  it("interpolacion-explorador: 6,4 mg con los puntos 6, 7 y 8", () => {
    show("interpolacion-explorador", [6.4, 6]);
    expect(screen.getByTestId("tool-int-lineal")).toHaveTextContent("64,4 %");
    expect(screen.getByTestId("tool-int-cuad")).toHaveTextContent("64,51 %");
    expect(screen.getByTestId("tool-int-tipo")).toHaveTextContent("Recta: interpolación · parábola: interpolación");
    expect(screen.getByTestId("tool-int-ecuaciones")).toHaveTextContent("y = 3,5·x + 42");
  });
  it("interpolacion-explorador: extrapolaciones y valores raros", () => {
    show("interpolacion-explorador", [7.3, 6]);
    expect(screen.getByTestId("tool-int-lineal")).toHaveTextContent("67,55 %");
    expect(screen.getByTestId("tool-int-tipo")).toHaveTextContent("Recta: extrapolación · parábola: interpolación");
    const b = show("interpolacion-explorador", [Number.NaN, 99]);
    expect(screen.getAllByTestId("tool-int-grafica").length).toBeGreaterThan(0);
    b.unmount();
    show("interpolacion-explorador");
  });
  it("diferencias-explorador: las dosis son cuadráticas", () => {
    show("diferencias-explorador", [1]);
    expect(screen.getByTestId("tool-dif-grado")).toHaveTextContent("función cuadrática");
  });
  it("diferencias-explorador: recta, cúbica y exponencial", () => {
    for (const [t, texto] of [[0, "función lineal"], [2, "función cúbica"], [3, "no es un polinomio"]] as const) {
      const { unmount } = show("diferencias-explorador", [t]);
      expect(screen.getByTestId("tool-dif-grado")).toHaveTextContent(texto);
      unmount();
    }
    show("diferencias-explorador", [99]);
  });
  it("parte-entera-explorador: [2,3] = 2 y [−2,7] = −3", () => {
    show("parte-entera-explorador", [23]);
    expect(screen.getByTestId("tool-pe-suelo")).toHaveTextContent("2");
    expect(screen.getByTestId("tool-pe-techo")).toHaveTextContent("3");
    expect(screen.getByTestId("tool-pe-decimal")).toHaveTextContent("0,3");
    const b = show("parte-entera-explorador", [-27]);
    expect(screen.getAllByTestId("tool-pe-suelo").at(-1)).toHaveTextContent("−3");
    b.unmount();
    show("parte-entera-explorador", [Number.NaN]);
    show("parte-entera-explorador");
  });
});
