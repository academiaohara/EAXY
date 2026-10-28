import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ALTERNATIVAS_EIA, IMPORTANCIAS_EIA, circularidad, clasificaImpacto, cogeneracion, impactoPorUso, oee, usosEquilibrio, valoracionImpacto } from "@/components/lesson/slide/tools/TecTi2SostenibleTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["ti2-eia-explorador", "ti2-cogeneracion-explorador", "ti2-acv-explorador", "ti2-oee-explorador", "ti2-circularidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería II, sostenibilidad: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de sostenibilidad", () => {
  it("matriz de impacto", () => {
    expect(valoracionImpacto(ALTERNATIVAS_EIA[0].mags, IMPORTANCIAS_EIA).total).toBe(7);
    expect(valoracionImpacto(ALTERNATIVAS_EIA[1].mags, IMPORTANCIAS_EIA).total).toBe(-217);
    expect(valoracionImpacto(ALTERNATIVAS_EIA[1].mags, IMPORTANCIAS_EIA, 50).total).toBeGreaterThan(-217);
    expect(valoracionImpacto([-6], [7]).total).toBe(-42);
    expect(clasificaImpacto(5, 100)).toBe("compatible o positivo");
    expect(clasificaImpacto(-60, 100)).toBe("crítico");
  });
  it("cogeneración", () => {
    const c = cogeneracion(0.35, 0.45);
    expect(c.global).toBeCloseTo(0.8);
    expect(c.separado).toBeCloseTo(1.2);
    expect(c.ahorro).toBeCloseTo(0.1667, 3);
  });
  it("ciclo de vida", () => {
    expect(impactoPorUso(1, 0.02, 50)).toBeCloseTo(0.04);
    expect(impactoPorUso(1, 0.02, 0)).toBe(Infinity);
    expect(usosEquilibrio(1, 0.02, 0.08)).toBeCloseTo(16.67, 2);
    expect(usosEquilibrio(1, 0.1, 0.08)).toBe(Infinity);
  });
  it("OEE", () => {
    const r = oee(480, 60, 30, 700, 665);
    expect(r.disponibilidad).toBeCloseTo(0.875);
    expect(r.rendimiento).toBeCloseTo(0.8333, 3);
    expect(r.calidad).toBeCloseTo(0.95);
    expect(r.oee).toBeCloseTo(0.6927, 3);
    expect(oee(0, 0, 30, 0, 0).oee).toBe(0);
  });
  it("circularidad", () => {
    const c = circularidad(30, 50, 1);
    expect(c.lfi).toBeCloseTo(0.6);
    expect(c.mci).toBeCloseTo(0.46);
    expect(circularidad(30, 50, 2).mci).toBeGreaterThan(c.mci);
    expect(circularidad(100, 100, 1).mci).toBe(1);
  });
});
