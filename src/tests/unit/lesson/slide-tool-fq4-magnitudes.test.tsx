import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CONJUNTOS, MEDIDAS_G, ajusteLineal, componentes, direccion, errorAbsoluto, errorRelativoPct, estadistica, modulo, productoEscalar, resta, suma, sumaResiduos2 } from "@/components/lesson/slide/tools/Fq4MagnitudesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-vectores-explorador", "fq4-error-medida-explorador", "fq4-ajuste-lineal-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de magnitudes (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("vectores", () => {
    const v = componentes(10, 60);
    expect(v.x).toBeCloseTo(5);
    expect(v.y).toBeCloseTo(8.66, 2);
    expect(modulo({ x: 3, y: 4 })).toBe(5);
    expect(modulo(suma(componentes(6, 0), componentes(8, 90)))).toBeCloseTo(10);
    expect(resta({ x: 5, y: 5 }, { x: 2, y: 1 })).toEqual({ x: 3, y: 4 });
    expect(productoEscalar({ x: 2, y: 3 }, { x: 4, y: -1 })).toBe(5);
    expect(productoEscalar(componentes(3, 0), componentes(5, 90))).toBeCloseTo(0, 9);
    expect(direccion({ x: 0, y: 1 })).toBeCloseTo(90);
    expect(direccion({ x: 0, y: -1 })).toBeCloseTo(270);
    expect(direccion({ x: 0, y: 0 })).toBeNaN();
  });
  it("error e incertidumbre", () => {
    expect(errorAbsoluto(49, 50)).toBe(1);
    expect(errorRelativoPct(49, 50)).toBe(2);
    expect(errorRelativoPct(1, 0)).toBeNaN();
    const e = estadistica([9.6, 9.8, 10.0]);
    expect(e.media).toBeCloseTo(9.8);
    expect(e.s).toBeCloseTo(0.2);
    expect(e.incertidumbre).toBeCloseTo(0.2 / Math.sqrt(3));
    expect(estadistica([5]).s).toBeNaN();
    expect(estadistica([]).media).toBeNaN();
    const e4 = estadistica(MEDIDAS_G.slice(0, 4));
    const e10 = estadistica(MEDIDAS_G);
    expect(e10.incertidumbre).toBeLessThan(e4.incertidumbre);
  });
  it("ajuste lineal", () => {
    const r = ajusteLineal([0, 1, 2, 3], [1, 3, 5, 7]);
    expect(r.a).toBeCloseTo(2);
    expect(r.b).toBeCloseTo(1);
    expect(r.r2).toBeCloseTo(1);
    expect(ajusteLineal([1], [1]).a).toBeNaN();
    expect(ajusteLineal([2, 2, 2], [1, 2, 3]).a).toBeNaN();
    for (const c of CONJUNTOS) {
      const f = ajusteLineal(c.x, c.y);
      expect(f.r2, c.nombre).toBeGreaterThan(0.99);
      expect(sumaResiduos2(c.x, c.y, f.a, f.b)).toBeLessThan(sumaResiduos2(c.x, c.y, f.a * 1.1, f.b));
    }
    expect(ajusteLineal(CONJUNTOS[1].x, CONJUNTOS[1].y).a).toBeCloseTo(9.8, 0);
    expect(ajusteLineal(CONJUNTOS[2].x, CONJUNTOS[2].y).a).toBeCloseTo(2.7, 1);
  });
});
