import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { decimalText, powerValue } from "@/components/lesson/slide/tools/NumerosTools";

function slider(label: RegExp) {
  return screen.getByLabelText(label) as HTMLInputElement;
}

describe("herramienta enteros-explorador", () => {
  it("compara, da valores absolutos y la distancia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "enteros-explorador", params: { a: -4, b: 6 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("−4 < 6".replace("−", "-"));
    expect(screen.getByTestId("tool-enteros-datos")).toHaveTextContent("10");
    fireEvent.change(slider(/Número a/), { target: { value: "8" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("8 > 6");
    fireEvent.change(slider(/Número b/), { target: { value: "8" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("son el mismo número");
  });

  it("acota valores absurdos y reinicia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "enteros-explorador", params: { a: -99, b: 99 } }} />);
    expect(slider(/Número a/).value).toBe("-10");
    expect(slider(/Número b/).value).toBe("10");
    fireEvent.change(slider(/Número a/), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/Número a/).value).toBe("-10");
  });
});

describe("herramienta potencia-explorador", () => {
  it("base negativa con exponente impar da resultado negativo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-explorador", params: { a: -2, b: 3 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("-8");
    fireEvent.change(slider(/Exponente/), { target: { value: "4" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("16");
  });

  it("exponente 0 vale 1 y el negativo invierte", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-explorador", params: { a: 2, b: 0 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("= 1");
    fireEvent.change(slider(/Exponente/), { target: { value: "-3" } });
    expect(screen.getByTestId("tool-readout").textContent).toContain("8");
  });

  it("la base 0 con exponente no positivo no está definida y no se rompe", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-explorador", params: { a: 0, b: -2 } }} />);
    expect(screen.getByTestId("tool-potencia-indefinida")).toBeInTheDocument();
  });

  it("powerValue devuelve fracciones irreducibles", () => {
    expect(powerValue(-2, -3)).toEqual({ kind: "ok", num: -1, den: 8 });
    expect(powerValue(3, -2)).toEqual({ kind: "ok", num: 1, den: 9 });
    expect(powerValue(-5, 0)).toEqual({ kind: "ok", num: 1, den: 1 });
    expect(powerValue(0, 0).kind).toBe("undefined");
  });
});

describe("herramienta racional-explorador", () => {
  it("simplifica, pasa a mixto y da el decimal", () => {
    render(<SlideTool block={{ kind: "tool", tool: "racional-explorador", params: { n: 23, d: 5 } }} />);
    const out = screen.getByTestId("tool-readout").textContent ?? "";
    expect(out).toContain("4,6");
    fireEvent.change(slider(/Numerador/), { target: { value: "10" } });
    fireEvent.change(slider(/Denominador/), { target: { value: "4" } });
    expect(screen.getByTestId("tool-readout").textContent).toContain("2,5");
  });

  it("marca el decimal periódico como aproximado y respeta los límites", () => {
    render(<SlideTool block={{ kind: "tool", tool: "racional-explorador", params: { n: 99, d: 99 } }} />);
    expect(Number(slider(/Numerador/).value)).toBeLessThanOrEqual(24);
    expect(Number(slider(/Denominador/).value)).toBeLessThanOrEqual(8);
    fireEvent.change(slider(/Denominador/), { target: { value: "3" } });
    fireEvent.change(slider(/Numerador/), { target: { value: "1" } });
    expect(screen.getByTestId("tool-readout").textContent).toContain("0,333");
  });

  it("decimalText distingue exacto y periódico, también en negativos", () => {
    expect(decimalText(1, 4)).toEqual({ text: "0,25", exact: true });
    expect(decimalText(-1, 3)).toEqual({ text: "−0,333", exact: false });
    expect(decimalText(6, 3)).toEqual({ text: "2", exact: true });
  });
});

describe("herramienta gasto-resto-explorador", () => {
  it("la segunda fracción actúa sobre lo que queda y las tres partes suman el total", async () => {
    const { chainParts } = await import("@/components/lesson/slide/tools/NumerosTools");
    expect(chainParts(3, 5, 1, 2)).toEqual({ first: { n: 3, d: 5 }, second: { n: 1, d: 5 }, left: { n: 1, d: 5 } });
    expect(chainParts(1, 3, 3, 4)).toEqual({ first: { n: 1, d: 3 }, second: { n: 1, d: 2 }, left: { n: 1, d: 6 } });
  });

  it("se renderiza, acota valores absurdos y reinicia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "gasto-resto-explorador", initial: [99, 3, 99, 99, 12345] }} />);
    expect(Number(slider(/Denominador 1/).value)).toBe(3);
    expect(Number(slider(/Numerador 1/).value)).toBeLessThanOrEqual(2);
    expect(Number(slider(/Numerador 2/).value)).toBeLessThanOrEqual(9);
    expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
    fireEvent.change(slider(/Denominador 1/), { target: { value: "2" } });
    expect(Number(slider(/Numerador 1/).value)).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/Denominador 1/).value).toBe("3");
  });
});
