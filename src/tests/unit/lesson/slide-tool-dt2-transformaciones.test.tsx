import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { afinidad, areaTriangulo, clasificaMatriz, elipseAfinidad, homologia, razonProyeccion, rectasLimite } from "@/components/lesson/slide/tools/DtIITransformacionesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-transformaciones-generales-explorador", "dt2-afinidad-explorador", "dt2-elipse-afinidad-explorador", "dt2-homologia-explorador", "dt2-abatimiento-afinidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico II, transformaciones: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, n: 4 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de transformaciones", () => {
  it("clasificación de matrices", () => {
    const c = Math.cos(Math.PI / 6);
    const s = Math.sin(Math.PI / 6);
    expect(clasificaMatriz(c, -s, s, c).tipo).toContain("giro");
    expect(clasificaMatriz(1, 0, 0, -1).tipo).toContain("simetría");
    expect(clasificaMatriz(1.5, 0, 0, 1.5).tipo).toContain("semejanza directa");
    expect(clasificaMatriz(1.5, 0, 0, -1.5).tipo).toContain("semejanza inversa");
    expect(clasificaMatriz(1, 0, 0, 0.5).tipo).toBe("afinidad general");
    expect(clasificaMatriz(1, 0.75, 0, 1).tipo).toBe("afinidad general");
    expect(clasificaMatriz(1, 2, 2, 4).tipo).toContain("degenerada");
    expect(clasificaMatriz(1, 0.75, 0, 1).razonAreas).toBeCloseTo(1);
    expect(clasificaMatriz(1, 0.75, 0, 1).angulo).toBeCloseTo(53.13, 2);
    expect(clasificaMatriz(1, 0, 0, 0.5).razonAreas).toBeCloseTo(0.5);
  });
  it("afinidad", () => {
    expect(afinidad([2, 3], 2, 90)).toEqual([2, 6]);
    expect(afinidad([2, 4], 0.5, 45)[0]).toBeCloseTo(0);
    expect(afinidad([2, 4], 0.5, 45)[1]).toBeCloseTo(2);
    expect(afinidad([2, 3], 1, 60)).toEqual([2, 3]);
    expect(afinidad([5, 0], 3, 60)).toEqual([5, 0]);
    expect(afinidad([2, 3], 2, 0)[0]).toBeNaN();
    const T: [number, number][] = [[1, 1], [4, 1.5], [2.5, 3.5]];
    for (const k of [0.5, -1, 2]) expect(areaTriangulo(T.map((p) => afinidad(p, k, 60)))).toBeCloseTo(Math.abs(k) * areaTriangulo(T), 9);
  });
  it("elipse", () => {
    const e = elipseAfinidad(5, 3);
    expect(e.k).toBeCloseTo(0.6);
    expect(e.area).toBeCloseTo(47.1239, 3);
    expect(e.c).toBeCloseTo(4);
    expect(e.excentricidad).toBeCloseTo(0.8);
    expect(elipseAfinidad(4, 4).excentricidad).toBe(0);
    expect(elipseAfinidad(0, 3).k).toBeNaN();
    // eje mayor vertical (k > 1)
    expect(elipseAfinidad(3, 5).c).toBeCloseTo(4);
  });
  it("homología", () => {
    const O: [number, number] = [0, 5];
    const q = homologia([2, 2], O, 0.2)!;
    expect(q[0]).toBeCloseTo(1.4286, 3);
    expect(q[1]).toBeCloseTo(2.8571, 3);
    // alineados con el centro
    const cruz = (q[0] - O[0]) * (2 - O[1]) - (q[1] - O[1]) * (2 - O[0]);
    expect(Math.abs(cruz)).toBeLessThan(1e-9);
    // los puntos del eje son dobles
    expect(homologia([3, 0], O, 0.2)).toEqual([3, 0]);
    // la recta límite no tiene homólogo
    expect(homologia([1, -5], O, 0.2)).toBeNull();
    expect(rectasLimite(O, 0.2).figura).toBeCloseTo(-5);
    expect(rectasLimite(O, 0.2).imagen).toBeCloseTo(10);
    expect(rectasLimite(O, 0).figura).toBeNaN();
    // μ = 0: identidad
    expect(homologia([2, 2], O, 0)).toEqual([2, 2]);
  });
  it("proyección como afinidad", () => {
    expect(razonProyeccion(60)).toBeCloseTo(0.5);
    expect(razonProyeccion(0)).toBe(1);
    expect(razonProyeccion(90)).toBeCloseTo(0, 9);
    const T: [number, number][] = [[1, 1], [5, 1.5], [2.5, 4]];
    expect(areaTriangulo(T.map((p) => afinidad(p, razonProyeccion(60), 90)))).toBeCloseTo(0.5 * areaTriangulo(T), 9);
  });
});
