import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { DESCOMPOSICION, HABITOS, PRODUCTOS_HUELLA, balanceCircular, energiaKwh, longitudMinimaRampa, pendienteMaxima, totalHabitos } from "@/components/lesson/slide/tools/TecEso1SostenibleTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["huella-producto-explorador", "consumo-habitos-explorador", "ahorro-energia-explorador", "tiempo-descomposicion-explorador", "lineal-circular-eso-explorador", "rampa-accesibilidad-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 8: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 8", () => {
  it("funciones: energía, balance circular, rampa y hábitos", () => {
    expect(energiaKwh(60, 5)).toBeCloseTo(0.3, 6);
    expect(energiaKwh(1000, 1)).toBe(1);
    expect(balanceCircular(0, 0)).toEqual({ productos: 100, nueva: 100, residuos: 100 });
    expect(balanceCircular(0.5, 0.5).nueva).toBeCloseTo(25, 6);
    expect(pendienteMaxima(2)).toBe(10);
    expect(pendienteMaxima(5)).toBe(8);
    expect(pendienteMaxima(8)).toBe(6);
    expect(longitudMinimaRampa(20)).toBeCloseTo(2, 6);
    expect(longitudMinimaRampa(40)).toBeCloseTo(5, 6);
    expect(longitudMinimaRampa(60)).toBeCloseTo(10, 6);
    expect(totalHabitos([0, 1]).res).toBeCloseTo(1.5, 6);
    expect(HABITOS).toHaveLength(8);
    expect(DESCOMPOSICION).toHaveLength(7);
    for (const p of PRODUCTOS_HUELLA) expect((p.p as readonly number[]).reduce((a, b) => a + b, 0)).toBe(100);
  });

  it("huella: el móvil se fabrica sobre todo y alargar su vida baja el impacto anual", () => {
    mount("huella-producto-explorador", { n: 0 });
    expect(text()).toContain("Fabricación");
    expect(text()).toContain("23,3 kg");
    fireEvent.change(screen.getByRole("slider"), { target: { value: "7" } });
    expect(text()).toContain("10 kg");
  });

  it("hábitos: suma ahorros al activarlos", () => {
    mount("consumo-habitos-explorador");
    fireEvent.click(screen.getByRole("button", { name: /Usar botella reutilizable/ }));
    fireEvent.click(screen.getByRole("button", { name: /Duchas de 5 minutos/ }));
    expect(text()).toContain("2 de 8");
    expect(text()).toContain("600 L");
  });

  it("ahorro: la LED ahorra unos 76 kWh al año con 4 h diarias", () => {
    mount("ahorro-energia-explorador", { n: 0 });
    expect(text()).toContain("76 kWh");
  });

  it("descomposición: tras 100 años solo quedan el plástico y el vidrio", () => {
    mount("tiempo-descomposicion-explorador", { n: 4 });
    expect(text()).toContain("4 de 7");
    expect(text()).toContain("3");
  });

  it("economía circular: 50 % y 50 % dejan 25 de materia prima nueva", () => {
    mount("lineal-circular-eso-explorador", { a: 50, b: 50 });
    expect(text()).toContain("25 %");
  });

  it("rampa: 30 cm en 2 m (15 %) no es accesible; 30 cm en 6 m (5 %) sí", () => {
    mount("rampa-accesibilidad-explorador", { a: 30, b: 2 });
    expect(text()).toContain("Demasiado empinada");
    fireEvent.change(screen.getAllByRole("slider")[1]!, { target: { value: "6" } });
    expect(text()).toContain("Accesible");
  });
});
