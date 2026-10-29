import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aFahrenheit, aKelvin, calorSensible, conduccion, curvaCalentamiento, dilatacion, maquinaTermica, rendimientoCarnot, temperaturaEquilibrio } from "@/components/lesson/slide/tools/Fq4CalorTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-equilibrio-termico-explorador", "fq4-cambios-estado-explorador", "fq4-transmision-dilatacion-explorador", "fq4-maquinas-termicas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de calor (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("escalas y equilibrio", () => {
    expect(aKelvin(27)).toBeCloseTo(300.15);
    expect(aFahrenheit(100)).toBe(212);
    expect(calorSensible(2, 4180, 50)).toBe(418000);
    expect(temperaturaEquilibrio(1, 4180, 80, 1, 4180, 20)).toBeCloseTo(50);
    expect(temperaturaEquilibrio(2, 4180, 10, 1, 4180, 40)).toBeCloseTo(20);
    const te = temperaturaEquilibrio(1, 385, 300, 1, 4180, 20);
    expect(te).toBeGreaterThan(20);
    expect(te).toBeLessThan(300);
    expect(temperaturaEquilibrio(0, 1, 1, 0, 1, 1)).toBeNaN();
  });
  it("curva de calentamiento", () => {
    const r0 = curvaCalentamiento(1, 0);
    expect(r0.T).toBe(-20);
    expect(r0.estado).toBe("hielo");
    expect(curvaCalentamiento(1, 2090 * 20 + 100000).estado).toContain("fusión");
    expect(curvaCalentamiento(1, 2090 * 20 + 100000).T).toBe(0);
    const q3 = curvaCalentamiento(1, 0).q3!;
    expect(curvaCalentamiento(1, q3 + 100000).T).toBe(100);
    expect(curvaCalentamiento(1, 1e8).estado).toBe("vapor");
    expect(curvaCalentamiento(0, 100).T).toBeNaN();
    expect(curvaCalentamiento(1, -5).T).toBe(-20);
  });
  it("transmisión y dilatación", () => {
    expect(conduccion(1, 10, 20, 0.2)).toBeCloseTo(1000);
    expect(conduccion(1, 10, 20, 0)).toBeNaN();
    expect(dilatacion(12e-6, 100, 50)).toBeCloseTo(0.06);
  });
  it("máquinas térmicas", () => {
    expect(rendimientoCarnot(600, 300)).toBeCloseTo(0.5);
    expect(rendimientoCarnot(300, 600)).toBeNaN();
    const m = maquinaTermica(500, 0.3);
    expect(m.W).toBeCloseTo(150);
    expect(m.Qc).toBeCloseTo(350);
  });
});
