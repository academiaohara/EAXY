import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { expandSci, roundingReport } from "@/components/lesson/slide/tools/DecimalesTools";

function slider(label: RegExp) {
  return screen.getByLabelText(label) as HTMLInputElement;
}

describe("herramienta decimal-explorador", () => {
  it("clasifica exacto, puro y mixto", () => {
    render(<SlideTool block={{ kind: "tool", tool: "decimal-explorador", params: { n: 13, d: 40 } }} />);
    expect(screen.getByTestId("tool-decimal-tipo")).toHaveTextContent("decimal exacto");
    fireEvent.change(slider(/Denominador/), { target: { value: "33" } });
    fireEvent.change(slider(/Numerador/), { target: { value: "41" } });
    expect(screen.getByTestId("tool-decimal-tipo")).toHaveTextContent("periódico puro");
    expect(screen.getByTestId("tool-decimal-tipo")).toHaveTextContent("2 cifras");
    fireEvent.change(slider(/Denominador/), { target: { value: "15" } });
    fireEvent.change(slider(/Numerador/), { target: { value: "32" } });
    expect(screen.getByTestId("tool-decimal-tipo")).toHaveTextContent("periódico mixto");
  });

  it("acota valores absurdos y reinicia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "decimal-explorador", params: { n: 9999, d: 1 } }} />);
    expect(Number(slider(/Numerador/).value)).toBe(99);
    expect(Number(slider(/Denominador/).value)).toBe(2);
    fireEvent.change(slider(/Denominador/), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/Denominador/).value).toBe("2");
  });
});

describe("herramienta generatriz-explorador", () => {
  it("3,84 periódico = 127/33", () => {
    render(<SlideTool block={{ kind: "tool", tool: "generatriz-explorador", params: { a: 3, c: 84 }, initial: [0, 2] }} />);
    expect(screen.getByTestId("tool-generatriz").textContent).toContain("127");
    expect(screen.getByTestId("tool-generatriz").textContent).toContain("33");
  });

  it("mixto: 1,2(34) = 611/495 y los controles se acotan al cambiar la longitud", () => {
    render(<SlideTool block={{ kind: "tool", tool: "generatriz-explorador", params: { a: 1, b: 2, c: 34 }, initial: [1, 2] }} />);
    expect(screen.getByTestId("tool-generatriz").textContent).toContain("611");
    fireEvent.click(screen.getAllByRole("button", { name: "1" })[0]!);
    expect(Number(slider(/^Periodo/).value)).toBeLessThanOrEqual(9);
  });
});

describe("herramienta aproximacion-explorador", () => {
  it("roundingReport: 183 594 a los millares", () => {
    const r = roundingReport("183594", 3);
    expect(r.approx).toBe(184_000_000);
    expect(r.err).toBe(406_000);
    expect(r.bound).toBe(500_000);
  });
  it("roundingReport con decimales: 6,175 a las centésimas", () => {
    const r = roundingReport("6,175", -2);
    expect(r.approx).toBe(6180);
    expect(r.err).toBe(5);
    expect(r.bound).toBe(5);
  });
  it("muestra aproximación, cifras significativas y cota", () => {
    render(<SlideTool block={{ kind: "tool", tool: "aproximacion-explorador", params: { a: 0, b: 4 } }} />);
    expect(screen.getByTestId("tool-aprox").textContent).toContain("2");
    expect(screen.getByTestId("tool-readout").textContent).toContain("180");
  });
  it("acota el orden al tamaño de la cantidad", () => {
    render(<SlideTool block={{ kind: "tool", tool: "aproximacion-explorador", params: { a: 6, b: 7 } }} />);
    expect(Number(slider(/Redondear/).value)).toBeLessThanOrEqual(-1);
  });
});

describe("herramienta notacion-explorador", () => {
  it("expandSci", () => {
    expect(expandSci(634, 5)).toBe("634000");
    expect(expandSci(634, 2)).toBe("634");
    expect(expandSci(634, 0)).toBe("6,34");
    expect(expandSci(980, -11)).toBe("0,000000000098");
    expect(expandSci(105, 1)).toBe("10,5");
  });
  it("muestra todas las cifras y cambia con el exponente", () => {
    render(<SlideTool block={{ kind: "tool", tool: "notacion-explorador", params: { a: 634, b: 5 } }} />);
    expect(screen.getByTestId("tool-notacion-cifras").textContent).toContain("634 000");
    fireEvent.change(slider(/Exponente/), { target: { value: "-3" } });
    expect(screen.getByTestId("tool-notacion-cifras").textContent).toContain("0,00634");
  });
  it("acota valores extremos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "notacion-explorador", params: { a: 5, b: 99 } }} />);
    expect(Number(slider(/Mantisa/).value)).toBe(100);
    expect(Number(slider(/Exponente/).value)).toBe(15);
  });
});
