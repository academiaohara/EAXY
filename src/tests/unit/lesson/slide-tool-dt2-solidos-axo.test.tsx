import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { AMPLIACION_ISO, NECESIDADES, SISTEMAS, carasVisiblesConvexo, carasVisiblesIso, casaGirada, circuloCaballera, explanacion, isometrica, razonAreaCaballera, sistemaRecomendado } from "@/components/lesson/slide/tools/DtIISolidosAxoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-solido-isometrico-explorador", "dt2-caballera-circulos-explorador", "dt2-conica-casa-explorador", "dt2-explanacion-explorador", "dt2-elegir-sistema-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de sólidos en axonométrico, cónico y acotados: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 9 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("isométrica", () => {
    for (const p of [isometrica(1, 0, 0), isometrica(0, 1, 0), isometrica(0, 0, 1)]) expect(Math.hypot(p[0], p[1])).toBeCloseTo(1);
    expect(AMPLIACION_ISO).toBeCloseTo(1.2247, 3);
    const v = carasVisiblesIso(6);
    expect(v.filter(Boolean).length).toBe(3);
    expect(carasVisiblesIso(4).some(Boolean)).toBe(true);
  });
  it("caballera: razón de áreas y circunferencia frontal", () => {
    expect(razonAreaCaballera("XZ", 45, 0.5)).toBe(1);
    expect(razonAreaCaballera("XY", 30, 0.5)).toBeCloseTo(0.25);
    expect(razonAreaCaballera("YZ", 60, 0.5)).toBeCloseTo(0.25);
    const c = circuloCaballera("XZ", [0, 0, 0], 1, 45, 0.5);
    for (const p of c) expect(Math.hypot(p[0], p[1])).toBeCloseTo(1);
    const t = circuloCaballera("XY", [0, 0, 0], 1, 45, 0.5);
    const ys = t.map((p) => p[1]);
    expect((Math.max(...ys) - Math.min(...ys)) / 2).toBeLessThan(1);
  });
  it("casa en cónica: caras visibles", () => {
    const { pts, caras } = casaGirada(4, 3, 3, 1.5, 30);
    expect(pts).toHaveLength(10);
    expect(caras).toHaveLength(9);
    const v = carasVisiblesConvexo(pts, caras, 12, 3);
    expect(v.filter(Boolean).length).toBeGreaterThanOrEqual(3);
    expect(v[0]).toBe(false);
  });
  it("explanación", () => {
    const d = explanacion(10, 7, 0.2, 1);
    expect(d.tipo).toBe("desmonte");
    expect(d.y).toBeCloseTo(3.75);
    expect(d.z).toBeCloseTo(10.75);
    expect(10 + 0.2 * d.y).toBeCloseTo(d.z);
    const t = explanacion(10, 13, 0.2, 1);
    expect(t.tipo).toBe("terraplén");
    expect(t.y).toBeCloseTo(2.5);
    expect(13 - t.y).toBeCloseTo(10 + 0.2 * t.y);
    expect(explanacion(10, 10, 0.2, 1).tipo).toBe("a nivel");
    expect(explanacion(10, 7, 0.5, 0.5).valido).toBe(false);
  });
  it("sistemas de representación", () => {
    for (const n of NECESIDADES) expect(SISTEMAS[sistemaRecomendado(n)]).toBeDefined();
    expect(sistemaRecomendado("cliente")).toBe("conico");
    expect(SISTEMAS.conico.realismo).toBeGreaterThan(SISTEMAS.diedrico.realismo);
    expect(SISTEMAS.diedrico.medidas).toBeGreaterThan(SISTEMAS.conico.medidas);
  });
});
