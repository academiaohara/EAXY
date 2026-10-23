import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "presion-neumatica-explorador",
  "caudal-cilindro-explorador",
  "relacion-compresion-explorador",
  "fuerza-cilindro-explorador",
  "consumo-aire-explorador",
  "valvula-nomenclatura-explorador",
  "logica-neumatica-explorador",
  "ventosa-vacio-explorador",
  "numeracion-neumatica-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const slider = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

describe("herramientas de Tecnología Industrial II, unidad 8: valores extremos", () => {
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

describe("resultados de las herramientas de la unidad 8", () => {
  it("presión: 6 bar manométricos son 7,01 bar absolutos; en Magdeburgo ≈ 6 575 N", () => {
    render(<SlideTool block={{ kind: "tool", tool: "presion-neumatica-explorador", params: { a: 6 } }} />);
    expect(text()).toContain("7,01 bar");
    fireEvent.change(slider("Presión manométrica (relativa)"), { target: { value: "-0.9" } });
    expect(text()).toContain("depresión");
    expect(text()).toMatch(/6.5\d\d N/);
  });

  it("caudal del ejemplo 1: 12,57 cm², 37,7 l/min y unos 279 l/min atmosféricos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "caudal-cilindro-explorador", params: { a: 40, b: 0.5, c: 80 } }} />);
    expect(text()).toContain("12,57 cm²");
    expect(text()).toContain("37,7 l/min");
    expect(text()).toMatch(/2[78]\d l\/min/);
  });

  it("relación de compresión: 6 bar dan 7 y a 12 bar hacen falta dos etapas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "relacion-compresion-explorador", params: { a: 6 } }} />);
    expect(text()).toContain("7100");
    fireEvent.change(slider("Presión de trabajo (manométrica)"), { target: { value: "12" } });
    expect(text()).toContain("dos etapas");
  });

  it("fuerza: 80/25 mm a 6 bar da 2 714 N de avance y 2 450 N de retroceso", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fuerza-cilindro-explorador", params: { a: 80, b: 25, c: 6 } }} />);
    expect(text()).toMatch(/2.714 N/);
    press("Doble efecto: retroceso");
    expect(text()).toMatch(/2.4(49|50) N/);
  });

  it("consumo: 80/25 mm, 700 mm y 5 ciclos dan ≈ 234 l/min", () => {
    render(<SlideTool block={{ kind: "tool", tool: "consumo-aire-explorador", params: { a: 80, b: 700 } }} />);
    expect(text()).toContain("234 l/min");
  });

  it("válvula: 3 vías y 2 posiciones se llama 3/2 y sirve para simple efecto", () => {
    render(<SlideTool block={{ kind: "tool", tool: "valvula-nomenclatura-explorador", params: { a: 3, b: 2 } }} />);
    expect(text()).toContain("3/2");
    expect(text()).toContain("simple efecto");
    press("5");
    expect(text()).toContain("doble efecto");
  });

  it("lógica: selectora (O) con un pulsador da señal; simultaneidad (Y) no", () => {
    render(<SlideTool block={{ kind: "tool", tool: "logica-neumatica-explorador", params: { a: 0 } }} />);
    const pulsados = screen.getAllByRole("button", { name: "Pulsado" });
    fireEvent.click(pulsados[0]!);
    expect(text()).toContain("hay presión");
    press("Simultaneidad (Y)");
    expect(text()).toContain("sin presión");
  });

  it("ventosa: a nivel del mar sujeta más que a 1 000 m", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ventosa-vacio-explorador", params: { a: 0 } }} />);
    const masaMar = text().match(/Masa que sujeta([\d ,]+) kg/)?.[1] ?? "";
    fireEvent.change(slider("Altitud de la instalación"), { target: { value: "1000" } });
    const masaAlt = text().match(/Masa que sujeta([\d ,]+) kg/)?.[1] ?? "";
    expect(parseFloat(masaAlt.replace(/\s/g, "").replace(",", "."))).toBeLessThan(parseFloat(masaMar.replace(/\s/g, "").replace(",", ".")));
  });

  it("numeración: 1.4 es captador del avance y 1.0 el cilindro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "numeracion-neumatica-explorador", params: { a: 1, b: 4 } }} />);
    expect(text()).toContain("avance");
    fireEvent.change(slider("Segunda cifra"), { target: { value: "0" } });
    expect(text()).toContain("cilindro del grupo 1");
  });
});
