import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anchoPista, apilado, caudalExtrusion, errorPolimetro, lecturaMicrometro, resistenciaPista, resolucionRango, tiempoImpresion, volumenMaterial } from "@/components/lesson/slide/tools/TecEso4TallerTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-micrometro-explorador", "eso4-polimetro-explorador", "eso4-apilado-explorador", "eso4-impresion-flujo-explorador", "eso4-pista-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 8: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 8", () => {
  it("micrómetro y polímetro", () => {
    expect(lecturaMicrometro(7.38)).toEqual({ escala: 7, tambor: 38, total: 7.38 });
    expect(lecturaMicrometro(7.88)).toEqual({ escala: 7.5, tambor: 38, total: 7.88 });
    expect(lecturaMicrometro(99).total).toBe(25);
    expect(lecturaMicrometro(-3).total).toBe(0);
    expect(resolucionRango(2)).toBeCloseTo(0.001);
    expect(errorPolimetro(1.5, 0.5, 2, 0.001)).toBeCloseTo(0.0095);
    expect(errorPolimetro(-1.5, 0.5, 2, 0.001)).toBeCloseTo(0.0095);
  });
  it("apilado e impresión 3D", () => {
    const a = apilado([0.1, 0.1, 0.1, 0.1]);
    expect(a.peor).toBeCloseTo(0.4);
    expect(a.rss).toBeCloseTo(0.2);
    expect(apilado([]).peor).toBe(0);
    expect(caudalExtrusion(0.4, 0.2, 50)).toBeCloseTo(4);
    expect(volumenMaterial(30000, 0.35, 20)).toBeCloseTo(14400);
    expect(tiempoImpresion(14400, 4)).toBeCloseTo(100);
    expect(tiempoImpresion(14400, 0)).toBe(Infinity);
  });
  it("pistas de una placa", () => {
    expect(anchoPista(1)).toBeGreaterThan(0.2);
    expect(anchoPista(1)).toBeLessThan(0.5);
    expect(anchoPista(3)).toBeGreaterThan(anchoPista(1));
    expect(anchoPista(0)).toBe(0);
    expect(resistenciaPista(50, 0.3)).toBeCloseTo(0.0819, 3 - 1);
    expect(resistenciaPista(50, 0)).toBe(Infinity);
  });
});
