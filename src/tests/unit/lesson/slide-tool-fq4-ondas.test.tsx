import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloLimite, bandaPorLongitud, categoriaRuido, colorVisible, elongacion, frecuenciaEM, nivelSonido, onda, refraccion, tiempoEco, tiempoMaxExposicion, velocidadSonidoAire } from "@/components/lesson/slide/tools/Fq4OndasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-onda-explorador", "fq4-espectro-explorador", "fq4-sonido-explorador", "fq4-optica-explorador", "fq4-contaminacion-acustica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de ondas (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("ondas", () => {
    const o = onda(2, 5);
    expect(o.v).toBe(10);
    expect(o.T).toBeCloseTo(0.2);
    expect(onda(0, 5).v).toBeNaN();
    expect(elongacion(1, 4, 2, 1, 0)).toBeCloseTo(1);
    expect(elongacion(1, 4, 2, 0, 0)).toBeCloseTo(0);
  });
  it("espectro", () => {
    expect(bandaPorLongitud(5e-7)!.id).toBe("vis");
    expect(bandaPorLongitud(3)!.id).toBe("radio");
    expect(bandaPorLongitud(1e-12)!.id).toBe("gamma");
    expect(bandaPorLongitud(1e-9)!.id).toBe("x");
    expect(bandaPorLongitud(-1)).toBeNull();
    expect(frecuenciaEM(3)).toBeCloseTo(1e8);
    expect(colorVisible(650)).toMatch(/^#ff/i);
    expect(colorVisible(900)).toBe("#888888");
  });
  it("sonido", () => {
    expect(velocidadSonidoAire(20)).toBeCloseTo(343);
    expect(nivelSonido(90, 2)).toBeCloseTo(90 - 6.02, 1);
    expect(nivelSonido(90, 0)).toBeNaN();
    expect(tiempoEco(340, 340)).toBe(2);
    expect(tiempoMaxExposicion(85)).toBe(8);
    expect(tiempoMaxExposicion(91)).toBeCloseTo(2);
    expect(categoriaRuido(130)).toContain("dolor");
    expect(categoriaRuido(NaN)).toBe("—");
  });
  it("óptica", () => {
    expect(refraccion(1, 1.5, 0)).toBe(0);
    expect(refraccion(1, 2, 30)).toBeCloseTo((Math.asin(0.25) * 180) / Math.PI);
    expect(refraccion(1.5, 1, 60)).toBeNull();
    expect(anguloLimite(1.5, 1)).toBeCloseTo(41.8, 1);
    expect(anguloLimite(1, 1.5)).toBeNaN();
  });
});
