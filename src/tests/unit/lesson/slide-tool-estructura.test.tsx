import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const ESTRUCTURA_TOOLS: SlideToolId[] = [
  "isotopos-explorador",
  "curva-enlace-explorador",
  "electronegatividad-explorador",
  "covalente-explorador",
  "enlace-fusion-grafica",
  "celda-explorador",
  "alotropia-explorador",
  "tension-deformacion-explorador",
  "diagrama-traccion-explorador",
  "hooke-explorador",
  "tension-trabajo-explorador",
  "brinell-explorador",
  "vickers-explorador",
  "rockwell-explorador",
  "charpy-explorador",
  "fatiga-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const slider = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

describe("herramientas de Tecnología Industrial II, unidad 1: valores extremos", () => {
  it.each(ESTRUCTURA_TOOLS)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
    expect(screen.getByTestId("lesson-tool")).toBeInTheDocument();
  });

  it.each(ESTRUCTURA_TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });

  it.each(ESTRUCTURA_TOOLS)("%s se monta con parámetros negativos o cero", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de la unidad 1", () => {
  it("isótopos: C-12 es isótopo de C-14; con 8 neutrones es el mismo átomo; N-14 es isóbaro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "isotopos-explorador", params: { a: 6, b: 8 } }} />);
    expect(text()).toContain("isótopo");
    fireEvent.change(slider("Neutrones, N"), { target: { value: "8" } });
    expect(text()).toContain("el mismo átomo");
    fireEvent.change(slider("Protones, Z"), { target: { value: "7" } });
    fireEvent.change(slider("Neutrones, N"), { target: { value: "7" } });
    expect(text()).toContain("isóbaro");
    fireEvent.change(slider("Protones, Z"), { target: { value: "8" } });
    fireEvent.change(slider("Neutrones, N"), { target: { value: "8" } });
    expect(text()).toContain("isótono");
  });

  it("electronegatividad: Na y Cl dan enlace iónico (ΔEN = 2,1)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "electronegatividad-explorador" }} />);
    expect(text()).toContain("iónico");
    expect(text()).toContain("2,1");
  });

  it("curva de enlace: a 0,30 nm hay equilibrio y la energía es −E₀", () => {
    render(<SlideTool block={{ kind: "tool", tool: "curva-enlace-explorador", params: { a: 30, b: 100 } }} />);
    expect(text()).toContain("equilibrio");
    expect(text()).toContain("-100 kcal/mol");
  });

  it("covalente: el oxígeno comparte dos pares (doble) y el nitrógeno tres (triple)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "covalente-explorador", params: { a: 3 } }} />);
    expect(text()).toContain("O=O doble");
    press(/^N · nitrógeno$/);
    expect(text()).toContain("N≡N triple");
  });

  it("celdas: BCC tiene 2 átomos, FCC 4 y HCP 6", () => {
    render(<SlideTool block={{ kind: "tool", tool: "celda-explorador", params: { a: 0 } }} />);
    expect(text()).toContain("= 2");
    press("FCC");
    expect(text()).toContain("= 4");
    press("HCP");
    expect(text()).toContain("= 6");
  });

  it("alotropía: el hierro a 1 000 °C es FCC y el aluminio nunca cambia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "alotropia-explorador", params: { a: 0, b: 1000 } }} />);
    expect(text()).toContain("FCC");
    expect(text()).toMatch(/912 °C y 1.394 °C/);
    press("Al");
    expect(text()).toContain("ninguna");
  });

  it("tensión: 30 kN sobre Ø 13,8 mm dan unos 201 MPa", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tension-deformacion-explorador", params: { a: 30, b: 13.8, c: 0.1 } }} />);
    expect(text()).toContain("201 MPa");
    expect(text()).toContain("0,001");
  });

  it("diagrama de tracción: tras pasar el límite elástico y soltar queda deformación permanente", () => {
    render(<SlideTool block={{ kind: "tool", tool: "diagrama-traccion-explorador", params: { a: 0 } }} />);
    expect(text()).toContain("plástica");
    press("Soltar");
    expect(text()).toContain("de la total");
    fireEvent.change(slider("Deformación aplicada"), { target: { value: "5" } });
    expect(text()).toContain("elástica");
    expect(text()).toContain("ninguna");
  });

  it("Hooke: acero con 20 kN sobre 150 mm² y 1 m se alarga 0,62 mm dentro de la zona elástica", () => {
    render(<SlideTool block={{ kind: "tool", tool: "hooke-explorador", params: { a: 1, b: 20, c: 150 } }} />);
    expect(text()).toContain("0,62 mm");
    expect(text()).toContain("elástico: Hooke vale");
    fireEvent.change(slider("Fuerza de tracción, F"), { target: { value: "200" } });
    expect(text()).toContain("pasa el límite elástico");
  });

  it("tensión de trabajo: acero con n = 1,7 trabaja a unos 144 MPa", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tension-trabajo-explorador", params: { a: 1, b: 1.7 } }} />);
    expect(text()).toContain("144 MPa");
  });

  it("Brinell: 500 kp, bola de 5 mm y huella de 2,3 mm dan 114 HB", () => {
    render(<SlideTool block={{ kind: "tool", tool: "brinell-explorador", params: { a: 500, b: 2.3 } }} />);
    expect(text()).toContain("114 HB");
    expect(text()).toContain("Huella válida");
  });

  it("Vickers: 120 kp y 0,5 mm de diagonal dan 890 HV", () => {
    render(<SlideTool block={{ kind: "tool", tool: "vickers-explorador", params: { a: 120, b: 0.5 } }} />);
    expect(text()).toContain("890 HV");
  });

  it("Rockwell: e = 40 da HRC 60 y HRB 90", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rockwell-explorador", params: { a: 40 } }} />);
    expect(text()).toContain("HRC = 100 − e60");
    press(/HRB/);
    expect(text()).toContain("HRB = 130 − e90");
  });

  it("Charpy: 120° → 75° con 20 kg absorbe 119 J y una resiliencia de 149 J/cm²", () => {
    render(<SlideTool block={{ kind: "tool", tool: "charpy-explorador", params: { a: 120, b: 75 } }} />);
    expect(text()).toContain("119 J");
    expect(text()).toContain("149 J/cm²");
  });

  it("fatiga: por encima del límite rompe y por debajo no rompe nunca", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fatiga-explorador", params: { a: 70 } }} />);
    expect(text()).toContain("rompe tras");
    fireEvent.change(slider("Tensión alterna (% de σ_R)"), { target: { value: "30" } });
    expect(text()).toContain("no rompe nunca");
  });

  it("energía de enlace y fusión: la gráfica ofrece estimación para los metales", () => {
    render(<SlideTool block={{ kind: "tool", tool: "enlace-fusion-grafica", params: { a: 1500 } }} />);
    expect(text()).toContain("kcal/mol");
    press("Metálico");
    expect(screen.getByTestId("tool-enlace-fusion")).toBeInTheDocument();
  });
});
