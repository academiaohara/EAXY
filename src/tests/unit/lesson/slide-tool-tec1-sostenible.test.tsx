import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { acvBombilla, demandaCalefaccion, efectosGrupos, flujoCircular, impactoBotellas, indicadores, simulaRed } from "@/components/lesson/slide/tools/Tec1SostenibleTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "indicadores-decision-explorador",
  "mapa-recursos-explorador",
  "edificio-eficiencia-explorador",
  "producto-impacto-explorador",
  "economia-circular-explorador",
  "parque-renovable-explorador",
  "acv-explorador",
  "grupos-afectados-explorador",
];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería I, tema 7: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("funciones de cálculo del tema 7", () => {
  it("indicadores: los paneles dan 75/60/40", () => {
    expect(indicadores([true, false, false, false, false])).toEqual({ a: 75, s: 60, e: 40 });
    expect(indicadores([false, true, false, false, false]).a).toBe(15);
  });
  it("calefacción: el aislamiento reduce la demanda a menos de un tercio", () => {
    expect(demandaCalefaccion(0, 1.4, 21)).toBeCloseTo(9561.4, 0);
    expect(demandaCalefaccion(10, 1.4, 21)).toBeCloseTo(2771.7, 0);
    expect(demandaCalefaccion(10, 1.4, 20)).toBeLessThan(demandaCalefaccion(10, 1.4, 21));
  });
  it("botellas: la reutilizable compensa a partir de unos 38 usos", () => {
    expect(impactoBotellas(30).totR).toBeGreaterThan(impactoBotellas(30).totD);
    expect(impactoBotellas(50).totR).toBeLessThan(impactoBotellas(50).totD);
  });
  it("economía circular: 10 años, 50 % de reparación y 60 % de reciclaje dan 0,31 kg/año", () => {
    const r = flujoCircular(10, 10, 50, 60);
    expect(r.vidaEf).toBeCloseTo(13, 6);
    expect(r.virgenAnio).toBeCloseTo(0.3077, 3);
    expect(flujoCircular(10, 5, 0, 0).virgenAnio).toBeCloseTo(2, 6);
  });
  it("red: sin generación no hay cobertura y las baterías la mejoran", () => {
    expect(simulaRed(0, 0, 0.5, 0, 0).cobertura).toBe(0);
    expect(simulaRed(150, 50, 0.8, 0, 400).cobertura).toBeGreaterThan(simulaRed(150, 50, 0.8, 0, 0).cobertura);
    expect(simulaRed(150, 50, 0.8, 0, 400).cobertura).toBeLessThanOrEqual(100);
  });
  it("ACV: con 25 000 h el LED emite 35,25 kg y la incandescente 230 kg", () => {
    const [inc, , led] = acvBombilla(25000, 150);
    expect(led!.total).toBeCloseTo(35.25, 6);
    expect(inc!.total).toBeCloseTo(230, 6);
    expect(inc!.unidades).toBe(25);
  });
  it("grupos: automatizar sin más perjudica a los trabajadores", () => {
    expect(efectosGrupos([true, false, false, false, false])).toEqual([-2, 2, 3, -1, 0]);
    expect(efectosGrupos([true, true, false, false, false])[0]).toBe(1);
  });
});

describe("resultados de las herramientas del tema 7", () => {
  it("indicadores: al marcar los paneles la dimensión más débil es 40", () => {
    mount("indicadores-decision-explorador");
    fireEvent.click(screen.getAllByRole("checkbox")[0]!);
    expect(text()).toContain("75 / 100");
    expect(text()).toContain("40 / 100");
  });
  it("recursos: en el smartphone la extracción domina el agua", () => {
    mount("mapa-recursos-explorador");
    expect(text()).toContain("Fase que más consumeExtracción");
    expect(text()).toContain("15 055");
  });
  it("edificio: 9 561 kWh de calefacción sin aislante", () => {
    mount("edificio-eficiencia-explorador", { a: 0, b: 1.4, c: 21 });
    expect(text()).toContain("9 561 kWh");
  });
  it("botellas: con 20 usos gana la de un solo uso; equilibrio 38", () => {
    mount("producto-impacto-explorador");
    expect(text()).toContain("La de un solo uso");
    expect(text()).toContain("38");
  });
  it("economía circular: 0,31 kg y 85 % menos", () => {
    mount("economia-circular-explorador", { a: 10, b: 50, c: 60 });
    expect(text()).toContain("0,31 kg");
    expect(text()).toContain("85 %");
  });
  it("parque: sin potencia instalada cubre 0 %", () => {
    mount("parque-renovable-explorador", { a: 0, b: 0 });
    expect(text()).toContain("0 %");
  });
  it("ACV: la incandescente aparece con 230 kg CO₂e", () => {
    mount("acv-explorador");
    expect(text()).toContain("230 kg CO₂e");
  });
  it("grupos: al automatizar, el grupo más perjudicado son los trabajadores", () => {
    mount("grupos-afectados-explorador");
    fireEvent.click(screen.getAllByRole("checkbox")[0]!);
    expect(text()).toContain("Trabajadores del almacén (-2)");
  });
});
