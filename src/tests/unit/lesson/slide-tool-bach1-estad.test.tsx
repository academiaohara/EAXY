import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de estadística de 1.º de Bachillerato", () => {
  it("percentiles-explorador: percentil 30 de los 30 pesos = 57,29 (lugar 9)", () => {
    show("percentiles-explorador", [0, 30]);
    expect(screen.getByTestId("tool-cu-posicion")).toHaveTextContent("= 9 → lugar 9");
    expect(screen.getByTestId("tool-cu-percentil")).toHaveTextContent("Percentil 30 = 57,29");
    expect(screen.getByTestId("tool-cu-cuartiles")).toHaveTextContent("Me = 68,3");
  });

  it("percentiles-explorador: percentil 15 → lugar 5 (52,35) y distribución de n = 20", () => {
    show("percentiles-explorador", [0, 15]);
    expect(screen.getByTestId("tool-cu-posicion")).toHaveTextContent("lugar 5");
    expect(screen.getByTestId("tool-cu-percentil")).toHaveTextContent("52,35");
    const b = show("percentiles-explorador", [1, 90]);
    expect(screen.getAllByTestId("tool-cu-percentil").at(-1)).toHaveTextContent("Percentil 90 = 20");
    expect(screen.getAllByTestId("tool-cu-cuartiles").at(-1)).toHaveTextContent("Q₁ = 10 Me = 12,5 Q₃ = 15");
    b.unmount();
  });

  it("doble-entrada-explorador: impresoras, X | Y = 1 y dependencia", () => {
    show("doble-entrada-explorador", [0, 3, 1]);
    expect(screen.getByTestId("tool-de-cond-col")).toHaveTextContent("2: 0,23");
    expect(screen.getByTestId("tool-de-cond-col")).toHaveTextContent("3: 0,62");
    expect(screen.getByTestId("tool-de-celda")).toHaveTextContent("8/25 = 0,32");
    expect(screen.getByTestId("tool-de-indep")).toHaveTextContent("Dependientes");
  });

  it("doble-entrada-explorador: las cuatro tablas y valores fuera de rango", () => {
    for (const t of [0, 1, 2, 3]) {
      const { unmount } = show("doble-entrada-explorador", [t, 99, 99]);
      expect(screen.getByTestId("tool-de-tabla")).toBeInTheDocument();
      unmount();
    }
  });

  it("nube-regresion-explorador: renta y ahorro, recta y predicción", () => {
    show("nube-regresion-explorador", [0, 0, 0, 0, 0, 100]);
    expect(screen.getByTestId("tool-nr-r")).toHaveTextContent("r = 0,851");
    expect(screen.getByTestId("tool-nr-recta")).toHaveTextContent("y = −5,266 + 0,339·x");
    expect(screen.getByTestId("tool-nr-recta")).toHaveTextContent("x = 17,32 + 2,137·y");
  });

  it("nube-regresion-explorador: extrapolación y fiabilidad", () => {
    show("nube-regresion-explorador", [1, 0, 0, 0, 0, 100]);
    expect(screen.getByTestId("tool-nr-prediccion")).toHaveTextContent("extrapolación");
    expect(screen.getByTestId("tool-nr-fiabilidad")).toHaveTextContent("r² = 0,995");
  });

  it("nube-regresion-explorador: la nube sintética respeta r", () => {
    show("nube-regresion-explorador", [6, -80]);
    expect(screen.getByTestId("tool-nr-r")).toHaveTextContent("r = −0,8");
    expect(screen.getByTestId("tool-nr-r")).toHaveTextContent("negativa fuerte");
  });

  it("nube-regresion-explorador: IPC e inflación y dato atípico", () => {
    show("nube-regresion-explorador", [5]);
    expect(screen.getByTestId("tool-nr-r")).toHaveTextContent("débil");
    const b = show("nube-regresion-explorador", [0, 0, 1, 100, 0]);
    expect(screen.getAllByTestId("tool-nr-medias").at(-1)).toHaveTextContent("n = 11");
    b.unmount();
  });

  it("aguantan parámetros fuera de rango", () => {
    for (const t of ["percentiles-explorador", "doble-entrada-explorador", "nube-regresion-explorador"]) {
      const { unmount } = show(t, [99, -99, 99, -99, 99, 99]);
      expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
      unmount();
    }
  });
});
