import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { beneficio, produccionOptima } from "@/components/lesson/slide/tools/Ccss1AnalisisTools";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de análisis económico (CCSS I)", () => {
  it("beneficio: modelo p = 60 − 0,5x, coste 10x + 100", () => {
    expect(produccionOptima(60, 0.5, 10)).toBe(50);
    expect(beneficio(60, 0.5, 10, 100, 50).beneficio).toBe(1150);
    expect(beneficio(60, 0.5, 10, 100, 50).derivada).toBe(0);
  });
  it("beneficio-explorador: lecturas con x = 20", () => {
    show("beneficio-explorador", [60, 5, 10, 100, 20]);
    expect(screen.getByTestId("tool-ben-ingresos")).toHaveTextContent("1000 €");
    expect(screen.getByTestId("tool-ben-costes")).toHaveTextContent("300 €");
    expect(screen.getByTestId("tool-ben-beneficio")).toHaveTextContent("700 €");
    expect(screen.getByTestId("tool-ben-derivada")).toHaveTextContent("B′(20) = 30 → el beneficio todavía sube");
    expect(screen.getByTestId("tool-ben-optimo")).toHaveTextContent("x = 50 unidades, con beneficio 1150 €");
  });
  it("beneficio-explorador: después del máximo la derivada es negativa; valores raros", () => {
    show("beneficio-explorador", [60, 5, 10, 100, 80]);
    expect(screen.getByTestId("tool-ben-derivada")).toHaveTextContent("el beneficio ya baja");
    show("beneficio-explorador", [Number.NaN, 99, -4, 9999, -3]);
    show("beneficio-explorador");
  });
});
