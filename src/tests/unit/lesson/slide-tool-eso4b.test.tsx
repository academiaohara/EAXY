import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("intervalo-explorador", () => {
  it("el extremo entra solo con corchete", () => {
    render(<SlideTool block={{ kind: "tool", tool: "intervalo-explorador", initial: [-2, 3, 0, 3] }} />);
    expect(screen.getByTestId("tool-int-notacion")).toHaveTextContent("(−2, 3)");
    expect(screen.getByTestId("tool-int-x")).toHaveTextContent("no pertenece");
    fireEvent.click(screen.getByRole("button", { name: "[ a, b ]" }));
    expect(screen.getByTestId("tool-int-notacion")).toHaveTextContent("[−2, 3]");
    expect(screen.getByTestId("tool-int-desigualdad")).toHaveTextContent("−2 ≤ x ≤ 3");
    expect(screen.getByTestId("tool-int-x")).toHaveTextContent("pertenece");
  });

  it("aguanta parámetros extremos o ausentes", () => {
    render(<SlideTool block={{ kind: "tool", tool: "intervalo-explorador", initial: [99, -99, 9, 99] }} />);
    expect(screen.getByTestId("tool-int-notacion")).toBeInTheDocument();
  });
});

describe("sistema-inecuaciones-explorador", () => {
  it("-1 ≤ x < 3 y sin solución", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-inecuaciones-explorador", initial: [3, 0, -1, 3] }} />);
    expect(screen.getByTestId("tool-si-solucion")).toHaveTextContent("[−1, 3)");
    fireEvent.change(slider("Valor de la 2.ª inecuación"), { target: { value: "5" } });
    expect(screen.getByTestId("tool-si-solucion")).toHaveTextContent("Sin solución");
  });

  it("x ≥ 2 y x ≤ 2 dejan un punto", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-inecuaciones-explorador", initial: [2, 3, 2, 1] }} />);
    expect(screen.getByTestId("tool-si-solucion")).toHaveTextContent("[2, 2]");
  });
});

describe("ruffini-explorador", () => {
  it("x³ − 2x² − 5x + 6 entre x − 1: resto 0", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ruffini-explorador", initial: [1, -2, -5, 6, 1] }} />);
    expect(screen.getByTestId("tool-ruf-raiz")).toHaveTextContent("1 es raíz");
    fireEvent.change(slider(/Valor a/), { target: { value: "2" } });
    expect(screen.getByTestId("tool-ruf-raiz")).toHaveTextContent("P(2) = −4");
  });
});

describe("fraccion-alg-explorador", () => {
  it("coinciden salvo en los valores excluidos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fraccion-alg-explorador", params: { a: 0, b: 3 } }} />);
    expect(screen.getByTestId("tool-fa-estado")).toHaveTextContent("Mismo valor");
    fireEvent.change(slider(/Valor de x/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-fa-orig")).toHaveTextContent("no existe");
    expect(screen.getByTestId("tool-fa-estado")).toHaveTextContent("excluidos");
  });
});

describe("trig-explorador", () => {
  it("las razones no dependen del tamaño", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trig-explorador", params: { a: 30, b: 4 } }} />);
    expect(screen.getByTestId("tool-trig-sen")).toHaveTextContent("sen α = 0,5");
    expect(screen.getByTestId("tool-trig-cos")).toHaveTextContent("cos α = 0,866");
    fireEvent.change(slider("Hipotenusa"), { target: { value: "9" } });
    expect(screen.getByTestId("tool-trig-sen")).toHaveTextContent("sen α = 0,5");
    expect(screen.getByTestId("tool-trig-lados")).toHaveTextContent("Opuesto 4,5");
  });

  it("valores fuera de rango se acotan", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trig-explorador", params: { a: 500, b: -3 } }} />);
    expect(screen.getByTestId("tool-trig-tg")).toBeInTheDocument();
  });
});

describe("trig-resolver-explorador", () => {
  it("dos catetos 17 y 40: ángulos del libro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trig-resolver-explorador", params: { n: 1, c: 17, d: 40 } }} />);
    expect(screen.getByTestId("tool-res-angulos")).toHaveTextContent("α = 23° 1′ 32″");
    expect(screen.getByTestId("tool-res-angulos")).toHaveTextContent("β = 66° 58′ 28″");
    expect(screen.getByTestId("tool-res-lados")).toHaveTextContent("Hipotenusa 43,46");
  });

  it("un lado y un ángulo: cometa de 36 m a 62°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trig-resolver-explorador", params: { n: 0, a: 62, b: 36 } }} />);
    expect(screen.getByTestId("tool-res-lados")).toHaveTextContent("Opuesto 31,79");
  });
});

describe("combinatoria-explorador", () => {
  it("m = 8, n = 3", () => {
    render(<SlideTool block={{ kind: "tool", tool: "combinatoria-explorador", params: { a: 8, b: 3 } }} />);
    expect(screen.getByTestId("tool-comb-vr")).toHaveTextContent("512");
    expect(screen.getByTestId("tool-comb-v")).toHaveTextContent("336");
    expect(screen.getByTestId("tool-comb-c")).toHaveTextContent("56");
    expect(screen.getByTestId("tool-comb-p")).toHaveTextContent("40 320");
  });

  it("n nunca supera m", () => {
    render(<SlideTool block={{ kind: "tool", tool: "combinatoria-explorador", params: { a: 3, b: 10 } }} />);
    expect(screen.getByTestId("tool-comb-c")).toHaveTextContent("1");
    expect(screen.getByTestId("tool-comb-nota")).toHaveTextContent("6");
  });
});
