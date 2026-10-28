import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { MEZCLAS_SEPARACION, concentracionDiluida, gPorLitro, molaridad, porcentajeEnMasa, porcentajeMasaVolumen, porcentajeVolumen, precipitado, volumenAlicuota } from "@/components/lesson/slide/tools/Fq3DisolucionesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-concentraciones-explorador", "fq3-cristalizacion-explorador", "fq3-dilucion-explorador", "fq3-separacion-etapas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de disoluciones (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("concentraciones", () => {
    expect(gPorLitro(15, 250)).toBeCloseTo(60);
    expect(gPorLitro(15, 0)).toBeNaN();
    expect(porcentajeMasaVolumen(5, 100)).toBe(5);
    expect(porcentajeVolumen(40, 250)).toBeCloseTo(16);
    expect(porcentajeEnMasa(20, 200)).toBe(10);
    expect(porcentajeEnMasa(1, 0)).toBeNaN();
    expect(molaridad(11.7, 58.5, 200)).toBeCloseTo(1);
    expect(molaridad(1, 0, 100)).toBeNaN();
  });
  it("cristalización", () => {
    expect(precipitado("nitrato", 110, 20)).toBeCloseTo(78);
    expect(precipitado("nitrato", 10, 60)).toBe(0);
    expect(precipitado("cloruro", 40, 20)).toBeCloseTo(4);
  });
  it("diluciones", () => {
    expect(concentracionDiluida(50, 100, 250)).toBeCloseTo(20);
    expect(concentracionDiluida(50, 100, 0)).toBeNaN();
    expect(volumenAlicuota(100, 10, 500)).toBeCloseTo(50);
    expect(volumenAlicuota(0, 10, 500)).toBeNaN();
    expect(concentracionDiluida(100, volumenAlicuota(100, 10, 500), 500)).toBeCloseTo(10);
  });
  it("separación", () => {
    expect(MEZCLAS_SEPARACION.length).toBeGreaterThanOrEqual(4);
    for (const m of MEZCLAS_SEPARACION) expect(m.pasos.length).toBeGreaterThan(0);
  });
});
