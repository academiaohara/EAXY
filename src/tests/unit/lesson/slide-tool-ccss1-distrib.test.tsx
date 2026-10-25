import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de distribuciones de probabilidad (CCSS I)", () => {
  it("cuantia-explorador: dos monedas", () => {
    show("cuantia-explorador", [0]);
    expect(screen.getByTestId("tool-cu-media")).toHaveTextContent("1");
    expect(screen.getByTestId("tool-cu-varianza")).toHaveTextContent("0,5");
    expect(screen.getByTestId("tool-cu-desviacion")).toHaveTextContent("0,707");
    expect(screen.getByTestId("tool-cu-tabla")).toHaveTextContent("0,75");
  });
  it("cuantia-explorador: juego de los dos dados, media −10/36 y desventajoso", () => {
    show("cuantia-explorador", [4]);
    expect(screen.getByTestId("tool-cu-media")).toHaveTextContent("−0,278");
    expect(screen.getByTestId("tool-cu-juego")).toHaveTextContent("desventajoso");
    expect(screen.getByTestId("tool-cu-juego")).toHaveTextContent("perder 10 €");
  });
  it("cuantia-explorador: suma de dados y valores raros", () => {
    show("cuantia-explorador", [3]);
    expect(screen.getByTestId("tool-cu-media")).toHaveTextContent("7");
    show("cuantia-explorador", [Number.NaN]);
    show("cuantia-explorador");
  });
  it("binomial-explorador: B(10; 0,5), P(X = 5)", () => {
    show("binomial-explorador", [10, 50, 5, 0]);
    expect(screen.getByTestId("tool-bn-prob")).toHaveTextContent("0,2461");
    expect(screen.getByTestId("tool-bn-media")).toHaveTextContent("5");
    expect(screen.getByTestId("tool-bn-desv")).toHaveTextContent("1,581");
  });
  it("binomial-explorador: acumuladas y valores fuera de rango", () => {
    show("binomial-explorador", [3, 50, 1, 1]);
    expect(screen.getByTestId("tool-bn-prob")).toHaveTextContent("0,5");
    const b = show("binomial-explorador", [3, 50, 2, 2]);
    expect(screen.getAllByTestId("tool-bn-prob").at(-1)).toHaveTextContent("0,5");
    b.unmount();
    show("binomial-explorador", [999, -4, 99, 9]);
    show("binomial-explorador");
  });
  it("normal-explorador: N(100, 15) entre 85 y 130", () => {
    show("normal-explorador", [100, 15, 85, 130, 0]);
    expect(screen.getByTestId("tool-no-prob")).toHaveTextContent("0,8186");
    expect(screen.getByTestId("tool-no-z")).toHaveTextContent("−1 y 2");
  });
  it("normal-explorador: colas y valores raros", () => {
    show("normal-explorador", [100, 15, 100, 0, 1]);
    expect(screen.getByTestId("tool-no-prob")).toHaveTextContent("0,5");
    const b = show("normal-explorador", [100, 15, 115, 0, 2]);
    expect(screen.getAllByTestId("tool-no-prob").at(-1)).toHaveTextContent("0,1587");
    b.unmount();
    show("normal-explorador", [Number.NaN, 0, 9999, -9999, 7]);
    show("normal-explorador");
  });
  it("tabla-normal-explorador: z = 1,46 y z negativo", () => {
    show("tabla-normal-explorador", [146]);
    expect(screen.getByTestId("tool-tn-menor")).toHaveTextContent("0,9279");
    expect(screen.getByTestId("tool-tn-mayor")).toHaveTextContent("0,0721");
    expect(screen.getByTestId("tool-tn-consulta")).toHaveTextContent("Fila 1,4, columna 0,06");
    const b = show("tabla-normal-explorador", [-100]);
    expect(screen.getAllByTestId("tool-tn-menor").at(-1)).toHaveTextContent("0,1587");
    expect(screen.getAllByTestId("tool-tn-central").at(-1)).toHaveTextContent("0,6826");
    b.unmount();
    show("tabla-normal-explorador", [400]);
    show("tabla-normal-explorador", [Number.NaN]);
  });
  it("binomial-normal-explorador: B(200; 0,44) entre 80 y 100", () => {
    show("binomial-normal-explorador", [200, 44, 80, 100]);
    expect(screen.getByTestId("tool-bnn-exacta")).toHaveTextContent("0,8495");
    expect(screen.getByTestId("tool-bnn-aprox")).toHaveTextContent("0,8495");
    expect(screen.getByTestId("tool-bnn-criterio")).toHaveTextContent("buena");
  });
  it("binomial-normal-explorador: aproximación pobre y valores raros", () => {
    show("binomial-normal-explorador", [10, 5, 0, 1]);
    expect(screen.getByTestId("tool-bnn-criterio")).toHaveTextContent("no es fiable");
    show("binomial-normal-explorador", [Number.NaN, 999, -3, 9999]);
    show("binomial-normal-explorador");
  });
  it("intervalo-confianza-explorador: 700 de 2 000 al 95 %", () => {
    show("intervalo-confianza-explorador", [350, 2000, 1, 0]);
    expect(screen.getByTestId("tool-ic-z")).toHaveTextContent("1,96");
    expect(screen.getByTestId("tool-ic-error")).toHaveTextContent("2,09 %");
    expect(screen.getByTestId("tool-ic-intervalo")).toHaveTextContent("(0,3291 ; 0,3709)");
  });
  it("intervalo-confianza-explorador: 99 % y simulación", () => {
    show("intervalo-confianza-explorador", [350, 2000, 2, 1]);
    expect(screen.getByTestId("tool-ic-z")).toHaveTextContent("2,576");
    expect(screen.getByTestId("tool-ic-sim")).toHaveTextContent("de 20 intervalos");
    show("intervalo-confianza-explorador", [Number.NaN, 0, 9, 4]);
    show("intervalo-confianza-explorador");
  });
});
