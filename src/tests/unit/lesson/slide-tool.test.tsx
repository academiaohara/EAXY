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

describe("herramienta valor-numerico", () => {
  it("calcula a·n + b para el n elegido", () => {
    render(<SlideTool block={{ kind: "tool", tool: "valor-numerico", params: { a: 2, b: 3, n: 5 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("13");
    fireEvent.change(slider(/Número n/), { target: { value: "10" } });
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("23");
  });

  it("con valores extremos se queda dentro de 0–10 y reinicia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "valor-numerico", params: { a: 99, b: -99, n: 99 } }} />);
    expect(Number(slider(/Número n/).value)).toBeLessThanOrEqual(10);
    fireEvent.change(slider(/Número n/), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/Número n/).value).toBe("10");
  });
});

describe("herramienta balanza-explorador", () => {
  it("la solución no cambia al sumar, restar o dividir en los dos platos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "balanza-explorador", params: { a: 2, b: 3, c: 11 } }} />);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("2x + 3 = 11");
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("x = 4");

    fireEvent.click(screen.getByRole("button", { name: /Restar 1/ }));
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("2x + 2 = 10");
    expect(screen.getByRole("button", { name: /Dividir entre 2/ })).not.toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /Restar 1/ }));
    fireEvent.click(screen.getByRole("button", { name: /Restar 1/ }));
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("2x = 8");
    fireEvent.click(screen.getByRole("button", { name: /Dividir entre 2/ }));
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("x = 4");
  });

  it("no deja dividir si no sale exacto y reinicia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "balanza-explorador", params: { a: 2, b: 3, c: 11 } }} />);
    expect(screen.getByRole("button", { name: /Dividir entre 2/ })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("2x + 3 = 11");
  });

  it("con valores extremos no sale nada absurdo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "balanza-explorador", params: { a: 99, b: 99, c: 99 } }} />);
    expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
  });
});

describe("herramienta porcentaje-cuadricula", () => {
  const filled = () => document.querySelectorAll('[data-testid="tool-grid"] rect[fill="#ffd866"]').length;

  it("pinta tantas casillas como el porcentaje", () => {
    render(<SlideTool block={{ kind: "tool", tool: "porcentaje-cuadricula", params: { a: 35 } }} />);
    expect(slider(/Porcentaje/).value).toBe("35");
    expect(filled()).toBe(35);
    expect(screen.getByTestId("tool-readout")).toHaveTextContent("35 casillas de cada 100");

    fireEvent.click(screen.getByRole("button", { name: "75 %" }));
    expect(filled()).toBe(75);
  });

  it("con valores extremos se queda entre 0 y 100 y reinicia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "porcentaje-cuadricula", params: { a: 500 } }} />);
    expect(slider(/Porcentaje/).value).toBe("100");
    expect(filled()).toBe(100);
    fireEvent.change(slider(/Porcentaje/), { target: { value: "0" } });
    expect(filled()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(slider(/Porcentaje/).value).toBe("100");
  });
});
