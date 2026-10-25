import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);
const btn = (name: RegExp | string) => screen.getByRole("button", { name });

describe("herramientas de derivadas de 1.º de Bachillerato", () => {
  it("secante-explorador: x² en 1 con h = 1 → pendiente 3 y derivada 2", () => {
    show("secante-explorador", [0, 2, 1, 0]);
    expect(screen.getByTestId("tool-sc-tvm")).toHaveTextContent("= 3");
    expect(screen.getByTestId("tool-sc-derivada")).toHaveTextContent("f′(1) = 2");
  });

  it("secante-explorador: con h pequeño la pendiente se acerca a f′", () => {
    show("secante-explorador", [0, 2, 5, 0]);
    expect(screen.getByTestId("tool-sc-tvm")).toHaveTextContent("2,001");
  });

  it("secante-explorador: por la izquierda y con función no definida", () => {
    show("secante-explorador", [0, 2, 1, 1]);
    expect(screen.getByTestId("tool-sc-tvm")).toHaveTextContent("= 1");
    const b = show("secante-explorador", [3, 2, 0, 1]);
    expect(screen.getAllByTestId("tool-sc-puntos").at(-1)).toHaveTextContent("no está definida");
    b.unmount();
  });

  it("derivabilidad-explorador: seis casos", () => {
    const expected = ["esquina", "Derivable", "esquina", "ni siquiera es continua", "tangente es vertical", "Derivable"];
    expected.forEach((t, i) => {
      const { unmount } = show("derivabilidad-explorador", [i, 2]);
      expect(screen.getByTestId("tool-dv-estado")).toHaveTextContent(t);
      unmount();
    });
  });

  it("derivabilidad-explorador: |x| tiene derivadas laterales −1 y 1", () => {
    show("derivabilidad-explorador", [0, 3]);
    expect(screen.getByTestId("tool-dv-laterales")).toHaveTextContent("= −1");
    expect(screen.getByTestId("tool-dv-laterales")).toHaveTextContent("= 1");
  });

  it("funcion-derivada-explorador: x³ − 3x en 2 tiene f′ = 9 y tangente y = 9x − 16", () => {
    show("funcion-derivada-explorador", [1, 20]);
    expect(screen.getByTestId("tool-fd-valores")).toHaveTextContent("f(2) = 2");
    expect(screen.getByTestId("tool-fd-valores")).toHaveTextContent("f′(2) = 9");
    expect(screen.getByTestId("tool-fd-crecimiento")).toHaveTextContent("creciente");
    expect(screen.getByTestId("tool-fd-tangente")).toHaveTextContent("y = 9x − 16");
  });

  it("funcion-derivada-explorador: tangente horizontal en el mínimo", () => {
    show("funcion-derivada-explorador", [1, 10]);
    expect(screen.getByTestId("tool-fd-crecimiento")).toHaveTextContent("tangente horizontal");
    expect(screen.getByTestId("tool-fd-tangente")).toHaveTextContent("y = −2");
  });

  it("producto-cociente-explorador: (x²(x + 1))′ en x = 1 vale 5 y coincide con la numérica", () => {
    show("producto-cociente-explorador", [0, 2, 0, 2]);
    expect(screen.getByTestId("tool-pc-valor")).toHaveTextContent("derivada = 5");
    expect(screen.getByTestId("tool-pc-comprobacion")).toHaveTextContent("5");
  });

  it("producto-cociente-explorador: cociente con g(x) = 2x − 3 en x = 1,5 no está definido", () => {
    show("producto-cociente-explorador", [0, 3, 1, 3]);
    expect(screen.getByTestId("tool-pc-valor")).toHaveTextContent("No definida");
  });

  it("cadena-explorador: sen(x² + 1) → cos(x² + 1)·2x", () => {
    show("cadena-explorador", [2, 0, 2]);
    expect(screen.getByTestId("tool-ca-regla")).toHaveTextContent("cos(x² + 1)");
    expect(screen.getByTestId("tool-ca-valor")).toHaveTextContent("h′(x) = −0,8323");
  });

  it("derivada-inversa-explorador: (ln)′(2) = 1/2", () => {
    show("derivada-inversa-explorador", [0, 20]);
    expect(screen.getByTestId("tool-di-inversa")).toHaveTextContent("= 0,5");
    expect(screen.getByTestId("tool-di-formula")).toHaveTextContent("1/x");
  });

  it("derivada-inversa-explorador: arcsen y arctg", () => {
    show("derivada-inversa-explorador", [5, 10]);
    expect(screen.getByTestId("tool-di-inversa")).toHaveTextContent("= 0,5");
  });

  it("velocidad-aceleracion-explorador: lanzamiento a t = 4 → v = 0", () => {
    show("velocidad-aceleracion-explorador", [1, 20]);
    expect(screen.getByTestId("tool-va-valores")).toHaveTextContent("v = 0");
    expect(screen.getByTestId("tool-va-estado")).toHaveTextContent("Se detiene");
  });

  it("extremos-explorador: x³ − 9x² + 24x tiene máximo en 2 y mínimo en 4", () => {
    show("extremos-explorador", [4]);
    expect(screen.getByTestId("tool-ex-criticos")).toHaveTextContent("x = 2: f = 20");
    expect(screen.getByTestId("tool-ex-criticos")).toHaveTextContent("máximo");
    expect(screen.getByTestId("tool-ex-criticos")).toHaveTextContent("x = 4: f = 16");
    expect(screen.getByTestId("tool-ex-criticos")).toHaveTextContent("mínimo");
  });

  it("extremos-explorador: absolutos en [0, 7] → máximo 70 y mínimo 0", () => {
    show("extremos-explorador", [4, 0, 7, 1]);
    expect(screen.getByTestId("tool-ex-absolutos")).toHaveTextContent("máximo absoluto 70 en x = 7");
    expect(screen.getByTestId("tool-ex-absolutos")).toHaveTextContent("mínimo absoluto 0 en x = 0");
  });

  it("extremos-explorador: x³ tiene inflexión y |x| mínimo sin derivada", () => {
    show("extremos-explorador", [2]);
    expect(screen.getByTestId("tool-ex-criticos")).toHaveTextContent("inflexión");
    const b = show("extremos-explorador", [5]);
    expect(screen.getAllByTestId("tool-ex-criticos").at(-1)).toHaveTextContent("no es derivable");
    b.unmount();
  });

  it("optimizacion-explorador: los cuatro problemas del libro", () => {
    const expected = ["Mínimo en x = 1: 4", "Máximo en x = 3,5: 12,25", "Máximo en x = 4,5: 11,25", "Mínimo en r = 0,86"];
    expected.forEach((t, i) => {
      const { unmount } = show("optimizacion-explorador", [i, 50]);
      expect(screen.getByTestId("tool-op-optimo")).toHaveTextContent(t);
      unmount();
    });
  });

  it("optimizacion-explorador: avisa si la derivada se anula fuera del dominio", () => {
    show("optimizacion-explorador", [2, 50]);
    expect(screen.getByTestId("tool-op-optimo")).toHaveTextContent("fuera del dominio");
  });

  it("aguantan parámetros fuera de rango y cambios", () => {
    for (const t of ["secante-explorador", "derivabilidad-explorador", "funcion-derivada-explorador", "producto-cociente-explorador", "cadena-explorador", "derivada-inversa-explorador", "velocidad-aceleracion-explorador", "extremos-explorador", "optimizacion-explorador"]) {
      const { unmount } = show(t, [99, -99, 99, -99]);
      expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
      unmount();
    }
    show("funcion-derivada-explorador", [0, 10]);
    fireEvent.click(btn("ln x"));
    expect(screen.getByTestId("tool-fd-valores")).toBeInTheDocument();
  });
});
