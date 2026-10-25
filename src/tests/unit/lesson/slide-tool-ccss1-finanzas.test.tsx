import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de matemática financiera (CCSS I)", () => {
  it("capitalizacion-explorador: 90 €/trimestre al 3 % durante 20 años", () => {
    show("capitalizacion-explorador", [90, 3, 20, 4]);
    expect(screen.getByTestId("tool-cap-capital")).toHaveTextContent("9890,15 €");
    expect(screen.getByTestId("tool-cap-aportado")).toHaveTextContent("7200 €");
    expect(screen.getByTestId("tool-cap-periodos")).toHaveTextContent("80 periodos");
  });
  it("capitalizacion-explorador: sin interés, capital = aportado; parámetros raros", () => {
    show("capitalizacion-explorador", [100, 0, 10, 12]);
    expect(screen.getByTestId("tool-cap-intereses")).toHaveTextContent("0 €");
    const b = show("capitalizacion-explorador", [Number.NaN, 999, -5, 7]);
    expect(screen.getAllByTestId("tool-cap-grafica").length).toBeGreaterThan(0);
    b.unmount();
    show("capitalizacion-explorador");
  });
  it("prestamo-explorador: hipoteca de 72 000 € al 2 % a 20 años", () => {
    show("prestamo-explorador", [72000, 2, 20, 12]);
    expect(screen.getByTestId("tool-pre-cuota")).toHaveTextContent("364,24 €");
    expect(screen.getByTestId("tool-pre-periodos")).toHaveTextContent("240 cuotas");
  });
  it("prestamo-explorador: interés cero y valores fuera de rango", () => {
    show("prestamo-explorador", [12000, 0, 1, 12]);
    expect(screen.getByTestId("tool-pre-cuota")).toHaveTextContent("1000 €");
    expect(screen.getByTestId("tool-pre-intereses")).toHaveTextContent("0 €");
    show("prestamo-explorador", [-1, 99, 99, 3]);
  });
  it("tae-explorador: 2 % trimestral → 2,015 %", () => {
    show("tae-explorador", [2, 4]);
    expect(screen.getByTestId("tool-tae-valor")).toHaveTextContent("2,015 %");
    expect(screen.getByTestId("tool-tae-periodo")).toHaveTextContent("0,5 %");
    expect(screen.getByTestId("tool-tae-montante")).toHaveTextContent("1020,15 €");
  });
  it("tae-explorador: una capitalización anual no cambia el rédito", () => {
    show("tae-explorador", [3, 1]);
    expect(screen.getByTestId("tool-tae-valor")).toHaveTextContent("3 %");
    show("tae-explorador", [Number.NaN, 5]);
  });
});
