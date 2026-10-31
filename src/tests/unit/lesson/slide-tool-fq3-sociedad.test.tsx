import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CONTAMINANTES, MATERIALES, PICTOGRAMAS, SUSTANCIAS_PH, claseAcidez, colorPH, concentracionH, kelvinACelsius, kgReciclados, temperaturaSinAtmosfera, temperaturaSuperficie, vecesMasAcida } from "@/components/lesson/slide/tools/Fq3SociedadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-escala-ph-explorador", "fq3-pictogramas-explorador", "fq3-contaminantes-explorador", "fq3-efecto-invernadero-explorador", "fq3-reciclaje-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de química y sociedad (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("pH", () => {
    expect(claseAcidez(3)).toBe("ácida");
    expect(claseAcidez(7)).toBe("neutra");
    expect(claseAcidez(10)).toBe("básica");
    expect(concentracionH(4)).toBeCloseTo(1e-4, 12);
    expect(vecesMasAcida(3, 5)).toBeCloseTo(100);
    expect(vecesMasAcida(5, 3)).toBeCloseTo(0.01);
    expect(colorPH(-5)).toBe(colorPH(0));
    expect(colorPH(99)).toBe(colorPH(14));
    for (let i = 1; i < SUSTANCIAS_PH.length; i++) expect(SUSTANCIAS_PH[i]!.ph).toBeGreaterThanOrEqual(SUSTANCIAS_PH[i - 1]!.ph);
  });
  it("datos de pictogramas, contaminantes y materiales", () => {
    expect(PICTOGRAMAS).toHaveLength(9);
    expect(new Set(PICTOGRAMAS.map((p) => p.codigo)).size).toBe(9);
    expect(CONTAMINANTES.length).toBeGreaterThanOrEqual(6);
    expect(MATERIALES.find((m) => m.nombre.startsWith("Latas"))!.ahorro).toBe(95);
  });
  it("efecto invernadero", () => {
    expect(kelvinACelsius(temperaturaSinAtmosfera())).toBeGreaterThan(-19);
    expect(kelvinACelsius(temperaturaSinAtmosfera())).toBeLessThan(-17);
    expect(kelvinACelsius(temperaturaSuperficie(0.78))).toBeCloseTo(15, 0);
    expect(temperaturaSuperficie(0)).toBeCloseTo(temperaturaSinAtmosfera());
    expect(temperaturaSuperficie(1)).toBeGreaterThan(temperaturaSuperficie(0.5));
    expect(temperaturaSuperficie(5)).toBe(temperaturaSuperficie(1));
  });
  it("reciclaje", () => {
    expect(kgReciclados(70, 40)).toBeCloseTo(28);
    expect(kgReciclados(70, 200)).toBe(70);
    expect(kgReciclados(70, -5)).toBe(0);
  });
});
