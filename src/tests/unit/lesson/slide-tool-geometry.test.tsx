import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const slider = (label: RegExp) => screen.getByLabelText(label) as HTMLInputElement;
const readout = () => screen.getByTestId("tool-readout");
const change = (label: RegExp, value: number) => fireEvent.change(slider(label), { target: { value: String(value) } });

describe("herramientas de geometría: valores extremos", () => {
  const tools: SlideToolId[] = [
    "rectas-posicion",
    "punto-mediatriz",
    "compas-mediatriz",
    "compas-bisectriz",
    "bisectriz-explorador",
    "angulo-explorador",
    "angulos-suma",
    "paralelas-explorador",
    "transportador",
    "triangulo-explorador",
    "poligono-explorador",
  ];

  it.each(tools)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() =>
      render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />),
    ).not.toThrow();
    expect(screen.getByTestId("lesson-tool")).toBeInTheDocument();
  });
});

describe("rectas-posicion", () => {
  it("clasifica paralelas, perpendiculares y secantes según el giro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectas-posicion", params: { a: 60 } }} />);
    expect(readout()).toHaveTextContent("secantes");
    change(/Giro/, 0);
    expect(readout()).toHaveTextContent("paralelas");
    change(/Giro/, 90);
    expect(readout()).toHaveTextContent("perpendiculares");
    change(/Giro/, 180);
    expect(readout()).toHaveTextContent("paralelas");
  });
});

describe("punto-mediatriz", () => {
  it("las distancias coinciden solo sobre la mediatriz", () => {
    render(<SlideTool block={{ kind: "tool", tool: "punto-mediatriz", params: { a: 0, b: 2 } }} />);
    expect(readout()).toHaveTextContent("PA = PB");
    change(/lateral/, 1);
    expect(readout()).toHaveTextContent("no está en la mediatriz");
    expect(readout()).toHaveTextContent("más cerca de B");
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(readout()).toHaveTextContent("PA = PB");
  });
});

describe("angulo-explorador", () => {
  it("nombra el ángulo según su amplitud", () => {
    render(<SlideTool block={{ kind: "tool", tool: "angulo-explorador", params: { a: 40 } }} />);
    expect(readout()).toHaveTextContent("agudo");
    fireEvent.click(screen.getByRole("button", { name: "90°" }));
    expect(readout()).toHaveTextContent("recto");
    change(/Amplitud/, 135);
    expect(readout()).toHaveTextContent("obtuso");
    fireEvent.click(screen.getByRole("button", { name: "180°" }));
    expect(readout()).toHaveTextContent("llano");
    fireEvent.click(screen.getByRole("button", { name: "360°" }));
    expect(readout()).toHaveTextContent("completo");
  });
});

describe("angulos-suma", () => {
  it("calcula el complementario y el suplementario", () => {
    render(<SlideTool block={{ kind: "tool", tool: "angulos-suma", params: { a: 64, b: 90 } }} />);
    expect(readout()).toHaveTextContent("26");
    fireEvent.click(screen.getByRole("button", { name: /Suplementarios/ }));
    expect(readout()).toHaveTextContent("116");
    change(/Ángulo α/, 179);
    expect(readout()).toHaveTextContent("1");
  });

  it("al pasar a complementarios el ángulo no se sale de los 90°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "angulos-suma", params: { a: 150, b: 180 } }} />);
    fireEvent.click(screen.getByRole("button", { name: /Complementarios/ }));
    expect(Number(slider(/Ángulo α/).value)).toBeLessThanOrEqual(89);
  });
});

describe("paralelas-explorador", () => {
  it("los correspondientes son iguales y los consecutivos suman 180°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "paralelas-explorador", params: { a: 65 } }} />);
    expect(readout()).toHaveTextContent("son iguales");
    fireEvent.click(screen.getByRole("button", { name: "Consecutivos" }));
    expect(readout()).toHaveTextContent("180");
    expect(readout()).toHaveTextContent("suplementarios");
  });
});

describe("triangulo-explorador", () => {
  it("el tercer ángulo completa 180° y nunca sale negativo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-explorador", params: { a: 50, b: 60 } }} />);
    expect(readout()).toHaveTextContent("70°");
    change(/Ángulo a/, 150);
    change(/Ángulo b/, 150);
    expect(Number(slider(/Ángulo a/).value) + Number(slider(/Ángulo b/).value)).toBeLessThanOrEqual(165);
    expect(readout()).toHaveTextContent("= 180°");
  });
});

describe("poligono-explorador", () => {
  it("suma (n − 2)·180 y reparte entre n lados", () => {
    render(<SlideTool block={{ kind: "tool", tool: "poligono-explorador", params: { n: 5 } }} />);
    expect(readout()).toHaveTextContent("540");
    expect(screen.getByText(/540° : 5 = 108/)).toBeInTheDocument();
    change(/lados/, 7);
    expect(readout()).toHaveTextContent("900");
    expect(screen.getByText(/≈ 128,6/)).toBeInTheDocument();
  });
});

describe("compás y regla", () => {
  it("mediatriz: la abertura se bloquea y con abertura corta los arcos no se cortan", () => {
    render(<SlideTool block={{ kind: "tool", tool: "compas-mediatriz", params: { a: 26 } }} />);
    const next = () => screen.getByRole("button", { name: /Pinchar en B|Colocar la regla/ });
    expect(next()).toBeDisabled();
    change(/Giro/, 100);
    expect(slider(/Abertura/)).toBeDisabled();
    fireEvent.click(next());
    change(/Giro/, 100);
    fireEvent.click(next());
    expect(readout()).toHaveTextContent("no llegan a cortarse");
  });

  it("mediatriz: con abertura suficiente aparece la mediatriz", () => {
    render(<SlideTool block={{ kind: "tool", tool: "compas-mediatriz", params: { a: 40 } }} />);
    change(/Giro/, 100);
    fireEvent.click(screen.getByRole("button", { name: "Pinchar en B" }));
    change(/Giro/, 100);
    fireEvent.click(screen.getByRole("button", { name: "Colocar la regla" }));
    expect(readout()).toHaveTextContent("mediatriz");
    expect(readout()).not.toHaveTextContent("no llegan");
  });

  it("bisectriz: recorre los cuatro pasos hasta colocar la regla", () => {
    render(<SlideTool block={{ kind: "tool", tool: "compas-bisectriz", params: { a: 60, b: 40 } }} />);
    for (const label of ["Pinchar en R", "Pinchar en S", "Colocar la regla"]) {
      change(/Giro/, 100);
      fireEvent.click(screen.getByRole("button", { name: label }));
    }
    expect(readout()).toHaveTextContent("bisectriz");
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/ }));
    expect(readout()).toHaveTextContent("Paso 1");
  });
});
