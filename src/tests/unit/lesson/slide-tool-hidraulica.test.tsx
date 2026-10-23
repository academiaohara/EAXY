import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "pascal-prensa-explorador",
  "continuidad-bernoulli-explorador",
  "viscosidad-fuerza-explorador",
  "energia-bernoulli-explorador",
  "potencia-hidraulica-explorador",
  "perdida-carga-explorador",
  "bomba-caudal-explorador",
  "cilindro-hidraulico-explorador",
  "limitadora-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const slider = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

describe("herramientas de Tecnología Industrial II, unidad 9: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta con parámetros negativos o cero", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de la unidad 9", () => {
  it("prensa del ejemplo 2: 3 000 N y 86 emboladas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pascal-prensa-explorador", params: { a: 50, b: 2.5, c: 150 } }} />);
    expect(text()).toMatch(/3.000 N/);
    expect(text()).toContain("Emboladas, n = S₂·l₂/(S₁·l₁)86");
  });

  it("continuidad: 30 mm a 30 l/min dan 0,71 m/s y a 10 mm, 6,37 m/s", () => {
    render(<SlideTool block={{ kind: "tool", tool: "continuidad-bernoulli-explorador", params: { a: 30, b: 10, c: 30 } }} />);
    expect(text()).toContain("0,71 m/s");
    expect(text()).toContain("6,37 m/s");
  });

  it("viscosidad del ejemplo 1: 3,4 poises y ≈ 1 070 N", () => {
    render(<SlideTool block={{ kind: "tool", tool: "viscosidad-fuerza-explorador", params: { a: 4, b: 10 } }} />);
    expect(text()).toContain("3,4 poises");
    expect(text()).toMatch(/1.06\d N|1.07\d N/);
  });

  it("energía del ejemplo 5: la presión aporta el 99,8 %", () => {
    render(<SlideTool block={{ kind: "tool", tool: "energia-bernoulli-explorador", params: { a: 1, b: 80, c: 3.5 } }} />);
    expect(text()).toContain("99,8");
    expect(text()).toContain("0,11");
  });

  it("potencia del ejemplo 6: 16,34 kW y 22,2 CV", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-hidraulica-explorador", params: { a: 80, b: 100 } }} />);
    expect(text()).toContain("16,34 kW");
    expect(text()).toContain("22,2 CV");
  });

  it("pérdida de carga: al duplicar la velocidad se cuadruplica", () => {
    render(<SlideTool block={{ kind: "tool", tool: "perdida-carga-explorador", params: { a: 0.04, b: 20, c: 2 } }} />);
    const a = parseFloat((text().match(/h_f([\d,]+) m de aceite/)?.[1] ?? "0").replace(",", "."));
    fireEvent.change(slider("Velocidad, v"), { target: { value: "4" } });
    const b = parseFloat((text().match(/h_f([\d,]+) m de aceite/)?.[1] ?? "0").replace(",", "."));
    expect(b / a).toBeCloseTo(4, 0);
  });

  it("bomba de engranajes: z = 12, m = 4, h = 30 y 1 500 rpm dan 54,3 l/min", () => {
    render(<SlideTool block={{ kind: "tool", tool: "bomba-caudal-explorador", params: { a: 0 } }} />);
    expect(text()).toContain("54,3 l/min");
    press("Pistones radiales");
    expect(text()).toContain("l/min");
  });

  it("cilindro de 32/22 mm a 150 bar y 50 l/min: 1,04 m/s en el avance y 1,96 m/s en el retroceso", () => {
    render(<SlideTool block={{ kind: "tool", tool: "cilindro-hidraulico-explorador", params: { a: 32, b: 22, c: 150 } }} />);
    expect(text()).toContain("1,04 m/s");
    expect(text()).toMatch(/1,9[67] m\/s/);
  });

  it("limitadora: con tarado 150 y carga 200 abre y todo el caudal vuelve al depósito", () => {
    render(<SlideTool block={{ kind: "tool", tool: "limitadora-explorador", params: { a: 150, b: 100 } }} />);
    expect(text()).toContain("cerrada");
    fireEvent.change(slider("Presión que exige la carga"), { target: { value: "200" } });
    expect(text()).toContain("abierta");
    expect(text()).toContain("Caudal al depósito40 l/min");
  });
});
