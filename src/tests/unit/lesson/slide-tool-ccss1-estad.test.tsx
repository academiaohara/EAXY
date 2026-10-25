import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de estadística de CCSS I", () => {
  it("regresion-cuadratica-explorador: Física, recta y parábola", () => {
    show("regresion-cuadratica-explorador", [1, 9]);
    expect(screen.getByTestId("tool-rc-r2-lineal")).toHaveTextContent("0,607");
    expect(screen.getByTestId("tool-rc-r2-cuad")).toHaveTextContent("0,938");
    expect(screen.getByTestId("tool-rc-ecuaciones")).toHaveTextContent("y = 0,819·x − 0,143");
    expect(screen.getByTestId("tool-rc-prediccion")).toHaveTextContent("recta 7,23 · parábola 6,98");
  });
  it("regresion-cuadratica-explorador: extrapolación, estatura y valores raros", () => {
    show("regresion-cuadratica-explorador", [1, 12]);
    expect(screen.getByTestId("tool-rc-prediccion")).toHaveTextContent("extrapolación");
    const b = show("regresion-cuadratica-explorador", [0, 8]);
    expect(screen.getAllByTestId("tool-rc-r2-cuad").at(-1)).toHaveTextContent("0,476");
    b.unmount();
    show("regresion-cuadratica-explorador", [Number.NaN, 99]);
    show("regresion-cuadratica-explorador");
  });
});
