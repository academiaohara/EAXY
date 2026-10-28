import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ESCALAS, ESPESORES, dimensionDibujo, dimensionReal, escalaAdecuada, espesorFino, formatoA, hojasA4, margenRecuadro, pieza, toleranciaPosicion } from "@/components/lesson/slide/tools/DtNormalizacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-tipos-linea-explorador", "dt1-formatos-explorador", "dt1-escala-explorador", "dt1-vistas-explorador", "dt1-acotacion-sistemas-explorador", "dt1-simbolos-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, normalización: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -5, b: 5, n: -2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de normalización", () => {
  it("espesores de línea", () => {
    expect(espesorFino(0.7)).toBeCloseTo(0.35);
    for (let i = 1; i < ESPESORES.length; i++) expect(ESPESORES[i]! / ESPESORES[i - 1]!).toBeCloseTo(Math.SQRT2, 1);
  });
  it("formatos de la serie A", () => {
    expect(formatoA(0)).toEqual([841, 1189]);
    expect(formatoA(1)).toEqual([594, 841]);
    expect(formatoA(2)).toEqual([420, 594]);
    expect(formatoA(3)).toEqual([297, 420]);
    expect(formatoA(4)).toEqual([210, 297]);
    expect(formatoA(5)).toEqual([148, 210]);
    expect(formatoA(6)).toEqual([105, 148]);
    expect((841 * 1189) / 1e6).toBeCloseTo(1, 2);
    expect(1189 / 841).toBeCloseTo(Math.SQRT2, 2);
    expect(hojasA4(1)).toBe(8);
    expect(hojasA4(4)).toBe(1);
    expect(hojasA4(0)).toBe(16);
    expect(margenRecuadro(4)).toBe(10);
    expect(margenRecuadro(1)).toBe(20);
  });
  it("escalas", () => {
    expect(dimensionDibujo(2000, 1, 50)).toBe(40);
    expect(dimensionDibujo(15, 2, 1)).toBe(30);
    expect(dimensionReal(45, 1, 200)).toBe(9000);
    expect(escalaAdecuada(1250, 400)).toEqual([1, 5]);
    expect(escalaAdecuada(5, 400)).toEqual([50, 1]);
    expect(escalaAdecuada(100, 100)).toEqual([1, 1]);
    expect(escalaAdecuada(1e9, 100)).toBeNull();
    expect(escalaAdecuada(0, 100)).toBeNull();
    expect(ESCALAS).toContainEqual([1, 1000]);
  });
  it("pieza en L y tolerancias", () => {
    const p = pieza(80, 50, 20, 30, 40);
    expect(p.altura).toBe(50);
    expect(p.areaAlzado).toBe(2800);
    expect(p.volumen).toBe(140000);
    expect(pieza(80, 50, 20, 30, 200).areaAlzado).toBe(80 * 50);
    expect(toleranciaPosicion("cadena", 4, 0.1)).toBeCloseTo(0.4);
    expect(toleranciaPosicion("paralelo", 4, 0.1)).toBeCloseTo(0.1);
  });
});
