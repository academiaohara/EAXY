import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const TERMICOS_TOOLS: SlideToolId[] = [
  "carnot-explorador",
  "brayton-explorador",
  "otto-diesel-explorador",
  "potencia-motor-explorador",
  "cilindrada-explorador",
  "frigorifica-explorador",
  "motor-tiempos-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const slider = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

describe("herramientas de Tecnología Industrial II, unidad 6: valores extremos", () => {
  it.each(TERMICOS_TOOLS)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
  });
  it.each(TERMICOS_TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
  it.each(TERMICOS_TOOLS)("%s se monta con parámetros negativos o cero", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de la unidad 6", () => {
  it("Carnot: entre 20 y 900 °C da 75 %; como frigorífica, entre 23 y 35 °C da 24,7", () => {
    render(<SlideTool block={{ kind: "tool", tool: "carnot-explorador", params: { a: 900, b: 20 } }} />);
    expect(text()).toContain("75 %");
    press("Máquina frigorífica");
    fireEvent.change(slider("Foco caliente, T_c"), { target: { value: "35" } });
    fireEvent.change(slider("Foco frío, T_f"), { target: { value: "23" } });
    expect(text()).toContain("24,7");
  });

  it("Brayton: r_p = 10 da 48,2 %", () => {
    render(<SlideTool block={{ kind: "tool", tool: "brayton-explorador", params: { a: 10 } }} />);
    expect(text()).toContain("48,2 %");
    expect(text()).toContain("51,8 %");
  });

  it("Otto y Diesel con r = 10 y r_c = 2: 60,2 % y 53,4 %; con r > 12 avisa de la detonación", () => {
    render(<SlideTool block={{ kind: "tool", tool: "otto-diesel-explorador", params: { a: 10, b: 2 } }} />);
    expect(text()).toContain("60,2 %");
    expect(text()).toContain("53,4 %");
    fireEvent.change(slider("Relación de compresión, r"), { target: { value: "16" } });
    expect(text()).toContain("detonaría");
  });

  it("potencia: 2 l a 3 000 rpm con gasolina y η = 30 % dan 52,8 kW", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-motor-explorador", params: { a: 3000, b: 2 } }} />);
    expect(text()).toContain("52,8 kW");
  });

  it("cilindrada: 89 × 79,5 mm con r = 10,5 y 6 cilindros", () => {
    render(<SlideTool block={{ kind: "tool", tool: "cilindrada-explorador", params: { a: 89, b: 79.5, c: 10.5 } }} />);
    expect(text()).toContain("494,6 cm³");
    expect(text()).toContain("2,97 l");
    expect(text()).toContain("52,1 cm³");
  });

  it("frigorífica: entre −10 y 28 °C la eficiencia de Carnot es 6,9", () => {
    render(<SlideTool block={{ kind: "tool", tool: "frigorifica-explorador", params: { a: -10, b: 28 } }} />);
    expect(text()).toContain("6,9");
  });

  it("motor de cuatro tiempos: 0° es admisión y 450° es expansión", () => {
    render(<SlideTool block={{ kind: "tool", tool: "motor-tiempos-explorador", params: { a: 0 } }} />);
    expect(text()).toContain("1.º · Admisión");
    fireEvent.change(slider("Ángulo del cigüeñal"), { target: { value: "450" } });
    expect(text()).toContain("3.º · Expansión");
    expect(text()).toContain("sí: el gas empuja el pistón");
  });
});
