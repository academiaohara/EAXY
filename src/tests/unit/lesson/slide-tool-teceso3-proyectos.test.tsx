import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { cargaMaximaViga, costeProyecto, cumpleEspecificacion, margenEspecificacion, masaViga, precioVenta, puntoEquilibrio } from "@/components/lesson/slide/tools/TecEso3ProyectosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-especificaciones-explorador", "eso3-simulacion-viga-explorador", "eso3-coste-proyecto-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 1: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 1", () => {
  it("especificaciones", () => {
    expect(cumpleEspecificacion(430, { max: 500 })).toBe(true);
    expect(cumpleEspecificacion(225, { min: 180, max: 220 })).toBe(false);
    expect(cumpleEspecificacion(NaN, { max: 5 })).toBe(false);
    expect(margenEspecificacion(430, { max: 500 })).toBeCloseTo(14);
    expect(margenEspecificacion(225, { min: 180, max: 220 })).toBeLessThan(0);
  });
  it("viga y costes", () => {
    expect(cargaMaximaViga(40, 20, 20, 300)).toBeCloseTo(711.1, 1);
    expect(cargaMaximaViga(40, 20, 20, 0)).toBe(0);
    expect(masaViga(20, 20, 300, 0.5)).toBeCloseTo(60);
    expect(costeProyecto(40, 20, 12, 10).total).toBeCloseTo(308);
    expect(precioVenta(308, 20)).toBeCloseTo(369.6);
    expect(puntoEquilibrio(300, 10, 5)).toBe(60);
    expect(puntoEquilibrio(300, 5, 5)).toBe(Infinity);
  });
});
