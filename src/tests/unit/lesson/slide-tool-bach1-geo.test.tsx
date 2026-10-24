import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("producto-escalar-explorador", () => {
  it("(2, 3)·(−1, 4) = 10 y el ángulo es 47,7°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "producto-escalar-explorador", initial: [2, 3, -1, 4] }} />);
    expect(screen.getByTestId("tool-pe-dot")).toHaveTextContent("= 10");
    expect(screen.getByTestId("tool-pe-angulo")).toHaveTextContent("47,7°");
    expect(screen.getByTestId("tool-pe-tipo")).toHaveTextContent("agudo");
  });

  it("(3, 2)·(−2, 3) = 0: perpendiculares", () => {
    render(<SlideTool block={{ kind: "tool", tool: "producto-escalar-explorador", initial: [3, 2, -2, 3] }} />);
    expect(screen.getByTestId("tool-pe-tipo")).toHaveTextContent("Perpendiculares");
    expect(screen.getByTestId("tool-pe-angulo")).toHaveTextContent("90°");
  });

  it("un vector nulo no tiene ángulo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "producto-escalar-explorador", initial: [0, 0, 1, 1] }} />);
    expect(screen.getByTestId("tool-pe-angulo")).toHaveTextContent("nulo");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "producto-escalar-explorador", initial: [99, -99, 99, 99] }} />);
    expect(screen.getByTestId("tool-pe-plano")).toBeInTheDocument();
  });
});

describe("recta-formas-explorador", () => {
  it("P(1, 2) y d = (2, 3): general 3x − 2y + 1 = 0 y pendiente 1,5", () => {
    render(<SlideTool block={{ kind: "tool", tool: "recta-formas-explorador", initial: [1, 2, 2, 3] }} />);
    expect(screen.getByTestId("tool-rf-general")).toHaveTextContent("General: 3x − 2y + 1 = 0");
    expect(screen.getByTestId("tool-rf-explicita")).toHaveTextContent("y = 1,5x + 0,5");
    expect(screen.getByTestId("tool-rf-vectorial")).toHaveTextContent("(x, y) = (1, 2) + t·(2, 3)");
  });

  it("vertical: no hay forma explícita", () => {
    render(<SlideTool block={{ kind: "tool", tool: "recta-formas-explorador", initial: [3, 0, 0, 2] }} />);
    expect(screen.getByTestId("tool-rf-explicita")).toHaveTextContent("no existe");
    expect(screen.getByTestId("tool-rf-continua")).toHaveTextContent("x = 3");
  });

  it("vector director nulo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "recta-formas-explorador", initial: [1, 1, 0, 0] }} />);
    expect(screen.getByTestId("tool-rf-general")).toHaveTextContent("no puede ser nulo");
  });
});

describe("rectas-angulo-explorador", () => {
  it("x + y = 4 y x − y = 1: secantes en (2,5, 1,5) a 90°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectas-angulo-explorador", initial: [1, 1, 4, 1, -1, 1] }} />);
    expect(screen.getByTestId("tool-rg-posicion")).toHaveTextContent("secantes");
    expect(screen.getByTestId("tool-rg-corte")).toHaveTextContent("(2,5, 1,5)");
    expect(screen.getByTestId("tool-rg-angulo")).toHaveTextContent("90°");
  });

  it("paralelas y coincidentes según C", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectas-angulo-explorador", initial: [1, 2, 3, 2, 4, 5] }} />);
    expect(screen.getByTestId("tool-rg-posicion")).toHaveTextContent("paralelas");
    fireEvent.change(slider("C₂"), { target: { value: "6" } });
    expect(screen.getByTestId("tool-rg-posicion")).toHaveTextContent("coincidentes");
  });

  it("aguanta A y B nulos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectas-angulo-explorador", initial: [0, 0, 1, 1, 1, 1] }} />);
    expect(screen.getByTestId("tool-rg-posicion")).toHaveTextContent("Hace falta");
  });
});

describe("distancia-punto-recta-explorador", () => {
  it("P(2, 3) y 3x + 4y − 5 = 0: d = 2,6", () => {
    render(<SlideTool block={{ kind: "tool", tool: "distancia-punto-recta-explorador", initial: [3, 4, -5, 2, 3] }} />);
    expect(screen.getByTestId("tool-dp-dist")).toHaveTextContent("d = 2,6");
    expect(screen.getByTestId("tool-dp-formula")).toHaveTextContent("13 / 5");
  });

  it("punto sobre la recta: distancia 0", () => {
    render(<SlideTool block={{ kind: "tool", tool: "distancia-punto-recta-explorador", initial: [1, 1, -4, 2, 2] }} />);
    expect(screen.getByTestId("tool-dp-dist")).toHaveTextContent("d = 0");
  });

  it("A y B nulos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "distancia-punto-recta-explorador", initial: [0, 0, 1, 1, 1] }} />);
    expect(screen.getByTestId("tool-dp-dist")).toHaveTextContent("no pueden ser ambos 0");
  });
});

describe("mediatriz-explorador", () => {
  it("A(0, 0), B(4, 2): mediatriz 2x + y − 5 = 0 y T(2, 1) pertenece", () => {
    render(<SlideTool block={{ kind: "tool", tool: "mediatriz-explorador", initial: [0, 0, 4, 2, 2, 1] }} />);
    expect(screen.getByTestId("tool-me-ecuacion")).toHaveTextContent("Mediatriz: 2x + y − 5 = 0");
    expect(screen.getByTestId("tool-me-distancias")).toHaveTextContent("T está en la mediatriz");
    expect(screen.getByTestId("tool-me-medio")).toHaveTextContent("(2, 1)");
  });

  it("un punto fuera no equidista; A = B no tiene mediatriz", () => {
    render(<SlideTool block={{ kind: "tool", tool: "mediatriz-explorador", initial: [0, 0, 4, 2, 0, 3] }} />);
    expect(screen.getByTestId("tool-me-distancias")).toHaveTextContent("no está");
    fireEvent.change(slider("B: x"), { target: { value: "0" } });
    fireEvent.change(slider("B: y"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-me-ecuacion")).toHaveTextContent("no hay mediatriz");
  });
});

describe("conica-explorador", () => {
  it("circunferencia (x − 3)² + (y + 2)² = 25 y su ecuación general", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conica-explorador", initial: [0, 5, 3, 3, -2] }} />);
    expect(screen.getByTestId("tool-cn-ecuacion")).toHaveTextContent("(x − 3)² + (y + 2)² = 25");
    expect(screen.getByTestId("tool-cn-general")).toHaveTextContent("x² + y² − 6x + 4y − 12 = 0");
  });

  it("elipse x²/25 + y²/9 = 1: focos (±4, 0), e = 0,8", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conica-explorador", initial: [1, 5, 3, 0, 0] }} />);
    expect(screen.getByTestId("tool-cn-ecuacion")).toHaveTextContent("x²/25 + y²/9 = 1");
    expect(screen.getByTestId("tool-cn-focos")).toHaveTextContent("(−4, 0) y (4, 0)");
    expect(screen.getByTestId("tool-cn-excentricidad")).toHaveTextContent("e = c/a = 0,8");
  });

  it("hipérbola x²/9 − y²/16 = 1: c = 5 y asíntotas con pendiente 1,333", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conica-explorador", initial: [2, 3, 4, 0, 0] }} />);
    expect(screen.getByTestId("tool-cn-excentricidad")).toHaveTextContent("c = 5");
    expect(screen.getByTestId("tool-cn-asintotas")).toHaveTextContent("1,333");
  });

  it("parábola y² = 8x: foco (2, 0) y directriz x = −2", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conica-explorador", initial: [3, 4, 3, 0, 0] }} />);
    expect(screen.getByTestId("tool-cn-ecuacion")).toHaveTextContent("y² = 8x");
    expect(screen.getByTestId("tool-cn-focos")).toHaveTextContent("Foco: (2, 0)");
    expect(screen.getByTestId("tool-cn-directriz")).toHaveTextContent("x = −2");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conica-explorador", initial: [9, 99, 99, 99, -99] }} />);
    expect(screen.getByTestId("tool-cn-grafica")).toBeInTheDocument();
  });
});
