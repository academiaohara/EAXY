import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloEn, arcoCapaz, catetoFaltante, cumpleLugar, esTerna, hipotenusa } from "@/components/lesson/slide/tools/DtGeometriaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-pitagoras-explorador", "dt1-lugar-geometrico-explorador", "dt1-arco-capaz-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, geometría: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de geometría", () => {
  it("Pitágoras", () => {
    expect(hipotenusa(3, 4)).toBe(5);
    expect(catetoFaltante(13, 5)).toBeCloseTo(12);
    expect(catetoFaltante(5, 5)).toBeNaN();
    expect(esTerna(3, 4, 5)).toBe(true);
    expect(esTerna(6, 8, 10)).toBe(true);
    expect(esTerna(1, 1, Math.SQRT2)).toBe(false);
    expect(esTerna(4, 4, 5)).toBe(false);
  });
  it("lugares geométricos", () => {
    expect(cumpleLugar("circunferencia", [3, 0]).cumple).toBe(true);
    expect(cumpleLugar("circunferencia", [0, 4]).cumple).toBe(false);
    expect(cumpleLugar("mediatriz", [0, 4]).cumple).toBe(true);
    expect(cumpleLugar("mediatriz", [0, 4]).a).toBeCloseTo(5);
    expect(cumpleLugar("mediatriz", [1, 0]).cumple).toBe(false);
    expect(cumpleLugar("paralelas", [1, 2]).cumple).toBe(true);
    expect(cumpleLugar("paralelas", [1, -2]).cumple).toBe(true);
    expect(cumpleLugar("paralelas", [1, 1]).cumple).toBe(false);
    const c = Math.cos(Math.PI / 6);
    const s = Math.sin(Math.PI / 6);
    expect(cumpleLugar("bisectriz", [2 * c, 2 * s]).cumple).toBe(true);
    expect(cumpleLugar("bisectriz", [2, 0.1]).cumple).toBe(false);
  });
  it("arco capaz", () => {
    expect(arcoCapaz(6, 90).R).toBeCloseTo(3);
    expect(arcoCapaz(6, 90).d).toBeCloseTo(0);
    expect(arcoCapaz(6, 30).R).toBeCloseTo(6);
    const a60 = arcoCapaz(6, 60);
    expect(a60.R).toBeCloseTo(3.4641, 3);
    expect(a60.d).toBeCloseTo(1.7321, 3);
    expect(arcoCapaz(6, 120).d).toBeLessThan(0);
    expect(arcoCapaz(6, 0).R).toBeNaN();
    // cualquier punto del arco ve AB bajo α
    const { R, d } = arcoCapaz(6, 60);
    for (const th of [0.9, 1.3, 1.5708, 1.9, 2.2]) {
      expect(anguloEn([R * Math.cos(th), d + R * Math.sin(th)], [-3, 0], [3, 0])).toBeCloseTo(60, 3);
    }
    expect(anguloEn([0, 0.1], [-3, 0], [3, 0])).toBeGreaterThan(170);
  });
});
