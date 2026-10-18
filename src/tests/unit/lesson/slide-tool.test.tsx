import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

function slider(label: RegExp) {
  return screen.getByLabelText(label) as HTMLInputElement;
}

describe("herramienta fraccion-explorador", () => {
  it("empieza en los valores dados y marca menor, igual y mayor que 1", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-explorador", params: { n: 3, d: 8 } }} />);
    expect(slider(/Numerador/).value).toBe("3");
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("menor que 1");

    fireEvent.change(slider(/Numerador/), { target: { value: "8" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("igual a 1");

    fireEvent.change(slider(/Numerador/), { target: { value: "11" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("mayor que 1");
  });

  it("con valores extremos nunca sale nada absurdo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-explorador", params: { n: 99, d: 99 } }} />);
    expect(Number(slider(/Denominador/).value)).toBeLessThanOrEqual(12);
    expect(Number(slider(/Numerador/).value)).toBeLessThanOrEqual(24);

    // Al bajar el denominador el numerador se recorta a 2·d para no pasar de dos unidades.
    fireEvent.change(slider(/Denominador/), { target: { value: "1" } });
    expect(Number(slider(/Numerador/).value)).toBeLessThanOrEqual(2);

    fireEvent.change(slider(/Numerador/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("menor que 1");
  });

  it("reiniciar devuelve los valores iniciales", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-explorador", params: { n: 3, d: 8 } }} />);
    fireEvent.change(slider(/Denominador/), { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/Denominador/).value).toBe("8");
    expect(slider(/Numerador/).value).toBe("3");
  });

  it("marca como aproximado el decimal que no termina", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-explorador", params: { n: 1, d: 3 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("≈ 0,333");
  });
});

describe("herramienta fraccion-equivalentes", () => {
  it("multiplica arriba y abajo por k y mantiene la fracción de partida", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-equivalentes", params: { n: 2, d: 5, k: 2 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("4");
    fireEvent.change(slider(/Multiplicar/), { target: { value: "6" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("12");
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("30");
  });

  it("k queda acotado entre 1 y 6 aunque los parámetros sean absurdos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-equivalentes", params: { n: 1, d: 2, k: 50 } }} />);
    expect(slider(/Multiplicar/).value).toBe("6");
  });
});
