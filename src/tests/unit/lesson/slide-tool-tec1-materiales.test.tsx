import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { estimar3d, invNorm, mezclaCompuesto } from "@/components/lesson/slide/tools/Tec1MaterialesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "mesa-muestras-explorador",
  "estructura-atomica-explorador",
  "propiedades-comparador-explorador",
  "carbono-hierro-explorador",
  "polimero-temperatura-explorador",
  "compuesto-mezclas-explorador",
  "tratamiento-curva-explorador",
  "proceso-coste-explorador",
  "impresion-3d-explorador",
  "tolerancia-calidad-explorador",
  "fabrica-riesgos-explorador",
  "reciclaje-energia-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";

describe("herramientas de Tecnología e Ingeniería I, tema 2: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 2", () => {
  it("mesa de muestras: empieza con 1 de 12 y suma al elegir otra", () => {
    render(<SlideTool block={{ kind: "tool", tool: "mesa-muestras-explorador" }} />);
    expect(text()).toContain("1 de 12");
    fireEvent.click(screen.getByRole("button", { name: "Vidrio" }));
    expect(text()).toContain("2 de 12");
    expect(screen.getByTestId("muestra-detalle").textContent).toContain("Cerámico");
  });

  it("estructura: la aleación sustitucional con 15 % añade 6 átomos de 40", () => {
    render(<SlideTool block={{ kind: "tool", tool: "estructura-atomica-explorador", params: { n: 2, a: 15 } }} />);
    expect(text()).toContain("6");
    expect(text()).toContain("Aleación sustitucional: átomos");
  });

  it("propiedades: la resistencia específica del acero es 51 y la del aluminio 111 kJ/kg", () => {
    render(<SlideTool block={{ kind: "tool", tool: "propiedades-comparador-explorador", params: { a: 0, b: 1 } }} />);
    expect(text()).toContain("51");
    expect(text()).toContain("111");
  });

  it("carbono: 0,4 % es acero de medio carbono y 3 % es fundición", () => {
    const { unmount } = render(<SlideTool block={{ kind: "tool", tool: "carbono-hierro-explorador", params: { a: 0.4 } }} />);
    expect(text()).toContain("Acero de medio carbono");
    unmount();
    render(<SlideTool block={{ kind: "tool", tool: "carbono-hierro-explorador", params: { a: 3 } }} />);
    expect(text()).toContain("Fundición");
  });

  it("polímero: el termoplástico a 200 °C está reblandecido y el termoestable no", () => {
    const { unmount } = render(<SlideTool block={{ kind: "tool", tool: "polimero-temperatura-explorador", params: { n: 0, a: 200 } }} />);
    expect(text()).toContain("Reblandecido");
    unmount();
    render(<SlideTool block={{ kind: "tool", tool: "polimero-temperatura-explorador", params: { n: 1, a: 200 } }} />);
    expect(text()).toContain("Sólido rígido e invariable");
  });

  it("compuesto: carbono/epoxi al 50 % da 116,5 GPa y 1 500 kg/m³", () => {
    const r = mezclaCompuesto(0.5, 230, 3, 1800, 1200);
    expect(r.Ep).toBeCloseTo(116.5, 5);
    expect(r.rho).toBeCloseTo(1500, 5);
    expect(r.Et).toBeLessThan(10);
    render(<SlideTool block={{ kind: "tool", tool: "compuesto-mezclas-explorador", params: { n: 1, a: 50 } }} />);
    expect(text()).toContain("116,5");
  });

  it("tratamiento: el temple da martensita y 60 HRC", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tratamiento-curva-explorador", params: { n: 2 } }} />);
    expect(text()).toContain("Martensita");
    expect(text()).toContain("60 HRC");
  });

  it("proceso: con 100 piezas gana el CNC y con 100 000 la fundición a presión", () => {
    const { unmount } = render(<SlideTool block={{ kind: "tool", tool: "proceso-coste-explorador", params: { a: 2 } }} />);
    expect(text()).toContain("Mecanizado CNC");
    unmount();
    render(<SlideTool block={{ kind: "tool", tool: "proceso-coste-explorador", params: { a: 5 } }} />);
    expect(screen.getByTestId("lesson-tool").textContent).toContain("Fundición a presión");
  });

  it("impresión 3D: caja de 60×60×40 mm al 20 % pesa 54,8 g", () => {
    const e = estimar3d(60, 60, 40, 20, 0.2);
    expect(e.masa).toBeCloseTo(54.8, 1);
    expect(estimar3d(60, 60, 40, 80, 0.2).masa).toBeGreaterThan(e.masa);
    render(<SlideTool block={{ kind: "tool", tool: "impresion-3d-explorador" }} />);
    expect(text()).toContain("54,8 g");
  });

  it("tolerancia: sin descentrado no hay defectos y con +0,1 mm fallan 20 de 40", () => {
    expect(invNorm(0.5)).toBeCloseTo(0, 6);
    expect(invNorm(0.975)).toBeCloseTo(1.95996, 3);
    const { unmount } = render(<SlideTool block={{ kind: "tool", tool: "tolerancia-calidad-explorador" }} />);
    expect(text()).toContain("0 de 40");
    unmount();
    render(<SlideTool block={{ kind: "tool", tool: "tolerancia-calidad-explorador", params: { b: 0.1 } }} />);
    expect(text()).toContain("20 de 40");
  });

  it("fábrica: cada puesto pulsado suma un riesgo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fabrica-riesgos-explorador" }} />);
    expect(text()).toContain("0 de 8");
    fireEvent.click(screen.getByRole("button", { name: "Charco de aceite" }));
    expect(text()).toContain("1 de 8");
    expect(screen.getByTestId("riesgo-detalle").textContent).toContain("Caídas");
  });

  it("reciclaje: aluminio al 50 % ahorra el 47 % y consume 895 MJ por 10 kg", () => {
    render(<SlideTool block={{ kind: "tool", tool: "reciclaje-energia-explorador", params: { n: 0, a: 50, b: 10 } }} />);
    expect(text()).toContain("47 %");
    expect(text()).toContain("895 MJ");
  });
});
