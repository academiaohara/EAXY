import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PHI, alturaTrianguloEquivalente, anguloEn, arcoCapaz, areaTriangulo, catetoFaltante, cuartaProporcional, cumpleLugar, esTerna, hipotenusa, homotecia, ladoCuadradoEquivalente, mediaProporcional, razonAreas, razonVolumenes, segmentoAureo, terceraProporcional } from "@/components/lesson/slide/tools/DtGeometriaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-pitagoras-explorador", "dt1-lugar-geometrico-explorador", "dt1-arco-capaz-explorador", "dt1-thales-explorador", "dt1-media-proporcional-explorador", "dt1-equivalencia-explorador", "dt1-homotecia-explorador"];
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

describe("resultados de las herramientas de proporcionalidad, equivalencia y semejanza", () => {
  it("proporcionales", () => {
    expect(cuartaProporcional(3, 2, 6)).toBe(4);
    expect(cuartaProporcional(4, 10, 6)).toBe(15);
    expect(cuartaProporcional(0, 2, 6)).toBeNaN();
    expect(terceraProporcional(2, 6)).toBe(18);
    expect(mediaProporcional(4, 9)).toBe(6);
    expect(mediaProporcional(-1, 4)).toBeNaN();
    expect(PHI).toBeCloseTo(1.618, 3);
    expect(segmentoAureo(10)).toBeCloseTo(6.1803, 3);
    expect(10 / segmentoAureo(10)).toBeCloseTo(segmentoAureo(10) / (10 - segmentoAureo(10)), 6);
  });
  it("equivalencia", () => {
    expect(ladoCuadradoEquivalente(8, 2)).toBe(4);
    expect(areaTriangulo(6, 4)).toBe(12);
    expect(alturaTrianguloEquivalente(5, 5, 3)).toBe(6);
    expect(areaTriangulo(5, alturaTrianguloEquivalente(5, 5, 3))).toBe(15);
    expect(alturaTrianguloEquivalente(0, 5, 3)).toBeNaN();
  });
  it("homotecia", () => {
    expect(homotecia([2, 1], [0, 0], -2)).toEqual([-4, -2]);
    expect(homotecia([3, 5], [1, 1], 2)).toEqual([5, 9]);
    expect(razonAreas(3)).toBe(9);
    expect(razonAreas(-2)).toBe(4);
    expect(razonVolumenes(2)).toBe(8);
    expect(razonVolumenes(-2)).toBe(8);
  });
});
