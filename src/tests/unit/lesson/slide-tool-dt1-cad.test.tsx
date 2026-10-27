import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aCartesiana, aPolar, areaCirculoRect, areaPoligono, bezier, longitudBezier, masaGramos, piezaCompuesta, puntoDesde, transformar, volumenBooleano } from "@/components/lesson/slide/tools/DtCadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-coordenadas-cad-explorador", "dt1-bezier-explorador", "dt1-transformaciones-explorador", "dt1-booleanas-explorador", "dt1-pieza-compuesta-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, CAD: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -5, b: 5, n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de CAD", () => {
  it("coordenadas", () => {
    const p = aPolar(4, 3);
    expect(p.d).toBeCloseTo(5);
    expect(p.ang).toBeCloseTo(36.87, 2);
    expect(aPolar(-1, 0).ang).toBeCloseTo(180);
    expect(aPolar(0, -1).ang).toBeCloseTo(270);
    const c = aCartesiana(5, 36.8699);
    expect(c[0]).toBeCloseTo(4, 3);
    expect(c[1]).toBeCloseTo(3, 3);
    expect(puntoDesde("absolutas", [2, 1], 6, 4)).toEqual([6, 4]);
    expect(puntoDesde("relativas", [2, 1], 3, -2)).toEqual([5, -1]);
    const q = puntoDesde("polares", [2, 1], 6, 90);
    expect(q[0]).toBeCloseTo(2);
    expect(q[1]).toBeCloseTo(7);
  });
  it("curvas de Bézier", () => {
    const P: [number, number][] = [[0, 0], [2, 3], [6, -2], [8, 0]];
    expect(bezier(P, 0)).toEqual([0, 0]);
    expect(bezier(P, 1)).toEqual([8, 0]);
    expect(bezier(P, 0.5)).toEqual([4, 0.375]);
    expect(longitudBezier(P)).toBeGreaterThan(8);
    expect(longitudBezier([[0, 0], [1, 0], [2, 0], [3, 0]])).toBeCloseTo(3, 6);
  });
  it("transformaciones", () => {
    const g = transformar([1, 0], { k: 1, angDeg: 90, dx: 0, dy: 0, simetria: "ninguna" });
    expect(g[0]).toBeCloseTo(0);
    expect(g[1]).toBeCloseTo(1);
    expect(transformar([2, 3], { k: 1, angDeg: 0, dx: 0, dy: 0, simetria: "eje-x" })).toEqual([2, -3]);
    expect(transformar([2, 3], { k: 1, angDeg: 0, dx: 0, dy: 0, simetria: "eje-y" })).toEqual([-2, 3]);
    expect(transformar([1, 1], { k: 2, angDeg: 0, dx: 3, dy: 1, simetria: "ninguna" })).toEqual([5, 3]);
    const T: [number, number][] = [[1, 1], [3, 1], [2, 3]];
    const img = T.map((p) => transformar(p, { k: 2, angDeg: 30, dx: 1, dy: 1, simetria: "eje-x" }));
    expect(areaPoligono(img)).toBeCloseTo(4 * areaPoligono(T), 6);
    expect(areaPoligono(T)).toBeCloseTo(2);
  });
  it("booleanas y pieza compuesta", () => {
    const v = volumenBooleano("diferencia", 6, 4, 3, 1, -1, 6);
    expect(v.vCaja).toBe(72);
    expect(v.vInt).toBeCloseTo(9.4248, 3);
    expect(v.diferencia).toBeCloseTo(62.575, 2);
    expect(v.union).toBeCloseTo(81.4247, 3);
    expect(v.interseccion).toBeCloseTo(v.vInt, 9);
    // inclusión–exclusión
    expect(v.union).toBeCloseTo(v.vCaja + v.vCil - v.vInt, 9);
    // cilindro fuera de la caja: sin solape
    expect(volumenBooleano("interseccion", 6, 4, 3, 1, 5, 2).resultado).toBe(0);
    expect(volumenBooleano("union", 6, 4, 3, 1, 5, 2).resultado).toBeCloseTo(72 + Math.PI * 2, 6);
    // el círculo cabe dentro del rectángulo y lo recorta si es mayor
    expect(areaCirculoRect(1, 6, 4)).toBeCloseTo(Math.PI, 2);
    expect(areaCirculoRect(5, 6, 4)).toBeCloseTo(24, 1);
    expect(areaCirculoRect(0, 6, 4)).toBe(0);
    const p = piezaCompuesta(100, 60, 20, 15, 30, 5);
    expect(p.volumen).toBeCloseTo(137278.76, 1);
    expect(masaGramos(p.volumen / 1000, 7.85)).toBeCloseTo(1077.64, 1);
    expect(masaGramos(p.volumen / 1000, 2.7)).toBeCloseTo(370.65, 1);
    // el saliente y el taladro no pueden salirse de la base
    expect(piezaCompuesta(40, 40, 10, 50, 10, 50).rBoss).toBe(20);
    expect(piezaCompuesta(40, 40, 10, 50, 10, 50).rHole).toBe(20);
  });
});
