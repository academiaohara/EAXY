import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CONVERSIONES, ESCALAS, aCientifica, convertirCadena, ordenMagnitud, pendienteOrigen, periodoPendulo, saltoOrdenes, sumaErrores2, PEND_L, PEND_T2, texCientifica } from "@/components/lesson/slide/tools/Fq3TrabajoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-pendulo-variables-explorador", "fq3-ordenes-magnitud-explorador", "fq3-factores-conversion-explorador", "fq3-grafica-ajuste-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del trabajo científico: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("péndulo", () => {
    expect(periodoPendulo(1)).toBeCloseTo(2.007, 2);
    expect(periodoPendulo(4)).toBeCloseTo(2 * periodoPendulo(1), 6);
    expect(periodoPendulo(0)).toBeNaN();
  });
  it("notación científica", () => {
    expect(aCientifica(150000000)).toEqual({ mantisa: 1.5, exp: 8 });
    expect(aCientifica(0.0000004).exp).toBe(-7);
    expect(aCientifica(0).mantisa).toBe(0);
    expect(aCientifica(NaN).mantisa).toBeNaN();
    expect(ordenMagnitud(1e-10)).toBe(-10);
    expect(ordenMagnitud(-1)).toBeNaN();
    expect(saltoOrdenes(1.27e7, 1.7)).toBe(7);
    expect(texCientifica(1.5e11)).toContain("10¹¹");
    for (let i = 1; i < ESCALAS.length; i++) expect(ESCALAS[i]!.m).toBeGreaterThan(ESCALAS[i - 1]!.m);
  });
  it("factores de conversión", () => {
    expect(convertirCadena(90, CONVERSIONES[0]!.factores)).toBeCloseTo(25);
    expect(convertirCadena(7.8, CONVERSIONES[1]!.factores)).toBeCloseTo(7800);
    expect(convertirCadena(1, CONVERSIONES[2]!.factores)).toBeCloseTo(3.6e6);
    expect(convertirCadena(2, CONVERSIONES[3]!.factores)).toBe(172800);
  });
  it("ajuste", () => {
    const k = pendienteOrigen(PEND_L, PEND_T2);
    expect(k).toBeGreaterThan(3.8);
    expect(k).toBeLessThan(4.2);
    expect(sumaErrores2(PEND_L, PEND_T2, k)).toBeLessThan(sumaErrores2(PEND_L, PEND_T2, k + 0.5));
    expect(pendienteOrigen([], [])).toBeNaN();
  });
});
