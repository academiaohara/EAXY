import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial: number[]) =>
  render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de funciones de 1.º de Bachillerato", () => {
  it("dominio-explorador: racional con denominador x − 2", () => {
    show("dominio-explorador", [1, 2, 3]);
    expect(screen.getByTestId("tool-do-dominio")).toHaveTextContent(/Dom f = ℝ/);
    expect(screen.getByTestId("tool-do-grafica")).toBeInTheDocument();
  });

  it("simetria-explorador: x² es par", () => {
    show("simetria-explorador", [0, 6]);
    expect(screen.getByTestId("tool-si-tipo")).toHaveTextContent(/par/i);
  });

  it("signo-explorador: cortes con los ejes y tabla de signo", () => {
    show("signo-explorador", [-2, 3, 1, 1, 1]);
    expect(screen.getByTestId("tool-sg-raices")).toHaveTextContent("(−2, 0)");
    expect(screen.getByTestId("tool-sg-tabla")).toHaveTextContent(/positiva/);
  });

  it("funcion-raiz-explorador: √x tiene dominio [0, +∞)", () => {
    show("funcion-raiz-explorador", [2, 1, 0, 0]);
    expect(screen.getByTestId("tool-fr-dominio")).toHaveTextContent("[0, +∞)");
    expect(screen.getByTestId("tool-fr-recorrido")).toHaveTextContent("[0, +∞)");
  });

  it("exp-log-explorador: base > 1 crece", () => {
    show("exp-log-explorador", [1]);
    expect(screen.getByTestId("tool-el-exp")).toHaveTextContent("Im = (0, +∞)");
    expect(screen.getByTestId("tool-el-monotonia")).toHaveTextContent(/crecientes|decrecientes/);
  });

  it("trig-funcion-explorador: 2 sen x + 1 tiene recorrido [−1, 3] y periodo 360°/2", () => {
    show("trig-funcion-explorador", [0, 2, 2, 0, 1]);
    expect(screen.getByTestId("tool-tf-amplitud")).toHaveTextContent("Amplitud = 2");
    expect(screen.getByTestId("tool-tf-recorrido")).toHaveTextContent("[−1, 3]");
  });

  it("abs-funcion-explorador: Im |f| = [0, +∞)", () => {
    show("abs-funcion-explorador", [0, 1, -2, 4]);
    expect(screen.getByTestId("tool-ab-recorrido")).toHaveTextContent("Im |f| = [0, +∞)");
    expect(screen.getByTestId("tool-ab-trozos")).toHaveTextContent("x ≥ 2");
  });

  it("oferta-demanda-explorador: equilibrio de p = 2q + 2 y p = 20 − 3q", () => {
    show("oferta-demanda-explorador", [2, 2, 20, 3, 12]);
    expect(screen.getByTestId("tool-od-equilibrio")).toHaveTextContent("q = 3,6, p = 9,2");
  });

  it("composicion-explorador: f∘g y g∘f dan expresiones distintas", () => {
    show("composicion-explorador", [2, 0, 4]);
    expect(screen.getByTestId("tool-cp-fog")).toBeInTheDocument();
    expect(screen.getByTestId("tool-cp-fog").textContent).not.toBe(screen.getByTestId("tool-cp-gof").textContent);
  });

  it("inversa-explorador: muestra la inversa y el punto simétrico", () => {
    show("inversa-explorador", [0, 2]);
    expect(screen.getByTestId("tool-iv-inversa")).toBeInTheDocument();
    expect(screen.getByTestId("tool-iv-punto")).toHaveTextContent("∈ f⁻¹");
  });

  it("aguantan parámetros fuera de rango", () => {
    for (const t of ["dominio-explorador", "simetria-explorador", "signo-explorador", "funcion-raiz-explorador", "exp-log-explorador", "trig-funcion-explorador", "abs-funcion-explorador", "oferta-demanda-explorador", "composicion-explorador", "inversa-explorador"]) {
      const { unmount } = show(t, [99, -99, 99, -99, 99]);
      expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
      unmount();
    }
  });
});
