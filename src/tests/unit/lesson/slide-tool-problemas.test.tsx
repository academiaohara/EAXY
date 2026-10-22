import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp) => screen.getByLabelText(label) as HTMLInputElement;

describe("proporcion-explorador", () => {
  it("directa: 5 → 12 y 8 → 19,2; inversa: producto constante", () => {
    render(<SlideTool block={{ kind: "tool", tool: "proporcion-explorador", params: { a: 5, b: 12, c: 8 } }} />);
    expect(screen.getByTestId("tool-prop-tipo")).toHaveTextContent("Directa");
    expect(screen.getByTestId("tool-readout").textContent).toContain("19");
    fireEvent.click(screen.getByRole("button", { name: "Inversa" }));
    expect(screen.getByTestId("tool-prop-tipo")).toHaveTextContent("Inversa");
    expect(screen.getByTestId("tool-readout").textContent).toContain("7");
  });
  it("acota valores", () => {
    render(<SlideTool block={{ kind: "tool", tool: "proporcion-explorador", params: { a: 999, b: -4, c: 0 } }} />);
    expect(slider(/A \(dato\)/).value).toBe("20");
    expect(slider(/B \(dato\)/).value).toBe("1");
    expect(slider(/Nuevo valor/).value).toBe("1");
  });
});

describe("compuesta-explorador", () => {
  it("vacas y días directas: 840; con la 2.ª inversa cambia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "compuesta-explorador", params: { a: 15, b: 7, c: 294 }, initial: [10, 30, 0, 0] }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("840");
    fireEvent.click(screen.getByRole("button", { name: "2.ª inversa" }));
    expect(screen.getByTestId("tool-readout").textContent).not.toContain("840");
  });
});

describe("reparto-explorador", () => {
  it("1, 2 y 5 de 600 000", () => {
    render(<SlideTool block={{ kind: "tool", tool: "reparto-explorador", initial: [1, 2, 5, 600000] }} />);
    const t = screen.getByTestId("tool-reparto").textContent ?? "";
    expect(t).toContain("75");
    expect(t).toContain("150");
    expect(t).toContain("375");
  });
  it("valores extremos y reinicio", () => {
    render(<SlideTool block={{ kind: "tool", tool: "reparto-explorador", initial: [99, 0, 99, 7] }} />);
    expect(slider(/1\.º/).value).toBe("12");
    expect(slider(/2\.º/).value).toBe("1");
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/1\.º/).value).toBe("12");
  });
});

describe("mezcla-explorador", () => {
  it("50 kg a 8,80 y 30 kg a 6,40 → 7,9", () => {
    render(<SlideTool block={{ kind: "tool", tool: "mezcla-explorador", initial: [50, 880, 30, 640] }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("7");
    expect(screen.getByTestId("tool-readout").textContent).toContain("632");
  });
});

describe("moviles-explorador", () => {
  it("se cruzan en 1 h 45 min", () => {
    render(<SlideTool block={{ kind: "tool", tool: "moviles-explorador", initial: [80, 120, 350, 0] }} />);
    expect(screen.getByTestId("tool-movil-tiempo")).toHaveTextContent("1 h 45 min");
  });
  it("alcance: 14 km/h y 38 km/h con 22 km → 55 min; si el 2.º es más lento, no alcanza", () => {
    render(<SlideTool block={{ kind: "tool", tool: "moviles-explorador", params: { n: 1 }, initial: [14, 38, 22, 0] }} />);
    expect(screen.getByTestId("tool-movil-tiempo")).toHaveTextContent("55 min");
    fireEvent.change(slider(/Velocidad 2/), { target: { value: "10" } });
    expect(screen.getByTestId("tool-movil-tiempo")).toHaveTextContent("nunca alcanzará");
  });
});

describe("indice-variacion-explorador", () => {
  it("−20 % y −40 % → índice 0,48 y −52 % en total", () => {
    render(<SlideTool block={{ kind: "tool", tool: "indice-variacion-explorador", params: { a: 100, b: -20, c: -40 } }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("0");
    expect(screen.getByTestId("tool-indice-global")).toHaveTextContent("52");
    expect(screen.getByTestId("tool-indice-global")).toHaveTextContent("no");
  });
});

describe("interes-explorador", () => {
  it("750 € al 4 % durante 36 meses → 90 €", () => {
    render(<SlideTool block={{ kind: "tool", tool: "interes-explorador", params: { a: 750, b: 4, c: 36 } }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("90");
    expect(screen.getByTestId("tool-interes-total")).toHaveTextContent("840");
  });
  it("acota", () => {
    render(<SlideTool block={{ kind: "tool", tool: "interes-explorador", params: { a: 1, b: 99, c: 0 } }} />);
    expect(slider(/Capital/).value).toBe("500");
    expect(slider(/Rédito/).value).toBe("12");
    expect(slider(/Tiempo/).value).toBe("1");
  });
});
