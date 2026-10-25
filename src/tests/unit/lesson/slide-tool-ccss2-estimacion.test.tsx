import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de estimación (CCSS II)", () => {
  it("media-muestral-explorador: N(μ, σ/√n) y probabilidad con tabla", () => {
    const a = show("media-muestral-explorador", [10, 20, 100, 8, 12]);
    expect(screen.getByTestId("tool-mm-dist")).toHaveTextContent("N(10; 2)");
    expect(screen.getByTestId("tool-mm-prob")).toHaveTextContent("0,6826");
    expect(screen.getByTestId("tool-mm-exacta")).toHaveTextContent("0,6827");
    expect(screen.getByTestId("tool-mm-z")).toHaveTextContent("z = (8 − 10) / 2 = −1");
    a.unmount();
    const b = show("media-muestral-explorador", [12, 20, 100, 12, 8]);
    expect(screen.getByTestId("tool-mm-prob")).toHaveTextContent("0,4772");
    b.unmount();
    show("media-muestral-explorador", [Number.NaN, 99, -4, 500, -5]);
    show("media-muestral-explorador");
  });

  it("proporcion-muestral-explorador: N(p, √(pq/n))", () => {
    const a = show("proporcion-muestral-explorador", [20, 100, 16, 24]);
    expect(screen.getByTestId("tool-pm-dist")).toHaveTextContent("N(0,2; 0,04)");
    expect(screen.getByTestId("tool-pm-prob")).toHaveTextContent("0,6826");
    expect(screen.getByTestId("tool-pm-valida")).toHaveTextContent("sí");
    a.unmount();
    show("proporcion-muestral-explorador", [2, 100, 1, 3]);
    expect(screen.getByTestId("tool-pm-valida")).toHaveTextContent("no");
    show("proporcion-muestral-explorador", [Number.NaN, 9999, -1, 500]);
    show("proporcion-muestral-explorador");
  });

  it("contraste-media-explorador: zona de aceptación y decisión", () => {
    const a = show("contraste-media-explorador", [0, 20, 4, 100, 18, 1]);
    expect(screen.getByTestId("tool-cm-zona")).toHaveTextContent("(1,9216; 2,0784)");
    expect(screen.getByTestId("tool-cm-decision")).toHaveTextContent("se rechaza H₀");
    a.unmount();
    const b = show("contraste-media-explorador", [0, 20, 4, 100, 20, 1]);
    expect(screen.getByTestId("tool-cm-decision")).toHaveTextContent("no se rechaza H₀");
    b.unmount();
    const c = show("contraste-media-explorador", [1, 20, 4, 100, 18, 1]);
    expect(screen.getByTestId("tool-cm-zona")).toHaveTextContent("(1,9342; +∞)");
    c.unmount();
    const d = show("contraste-media-explorador", [2, 20, 4, 100, 25, 2]);
    expect(screen.getByTestId("tool-cm-zona")).toHaveTextContent("−∞");
    d.unmount();
    show("contraste-media-explorador", [Number.NaN, 999, -1, 9999, 999, 9]);
    show("contraste-media-explorador");
  });

  it("contraste-proporcion-explorador: moneda de 65 caras", () => {
    const a = show("contraste-proporcion-explorador", [0, 50, 100, 65, 1]);
    expect(screen.getByTestId("tool-cp-zona")).toHaveTextContent("(0,402; 0,598)");
    expect(screen.getByTestId("tool-cp-decision")).toHaveTextContent("se rechaza H₀");
    a.unmount();
    const b = show("contraste-proporcion-explorador", [0, 50, 100, 55, 1]);
    expect(screen.getByTestId("tool-cp-decision")).toHaveTextContent("no se rechaza H₀");
    b.unmount();
    show("contraste-proporcion-explorador", [Number.NaN, 999, 5, 9999, 9]);
    show("contraste-proporcion-explorador");
  });
});
