import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ajuste, alargamiento, areaCircular, brinell, capacidadCp, capacidadCpk, clasificaAcero, coefSeguridad, durezaRecocida, durezaTemplada, energiaCharpy, fraccionFuera, normalCdf, tensionNormal } from "@/components/lesson/slide/tools/TecEso4MaterialesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-hooke-explorador", "eso4-brinell-explorador", "eso4-charpy-explorador", "eso4-acero-explorador", "eso4-ajuste-explorador", "eso4-calidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 2: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 2", () => {
  it("Hooke, dureza y Charpy", () => {
    const sig = tensionNormal(5000, areaCircular(10));
    expect(sig).toBeCloseTo(63.66, 1);
    expect(alargamiento(sig, 210, 500)).toBeCloseTo(0.1516, 3);
    expect(coefSeguridad(250, sig)).toBeCloseTo(3.93, 1);
    expect(coefSeguridad(250, 0)).toBe(Infinity);
    expect(tensionNormal(1000, 0)).toBe(Infinity);
    expect(brinell(3000, 10, 4)).toBeCloseTo(229, 0);
    expect(brinell(3000, 10, 10)).toBe(Infinity);
    expect(energiaCharpy(22, 1.4, 0.9)).toBeCloseTo(107.9, 1);
    expect(energiaCharpy(22, 1.4, 2)).toBe(0);
  });
  it("aceros y ajustes", () => {
    expect(clasificaAcero(0.45).nombre).toContain("medio");
    expect(clasificaAcero(0.1).nombre).toContain("bajo");
    expect(clasificaAcero(0.9).nombre).toContain("alto");
    expect(clasificaAcero(3).nombre).toContain("Fundición");
    expect(durezaRecocida(0.8)).toBeGreaterThan(durezaRecocida(0.2));
    expect(durezaTemplada(0.8)).toBeGreaterThan(55);
    expect(durezaTemplada(5)).toBeLessThanOrEqual(66);
    expect(ajuste(25, 0, -10, -29)).toEqual({ max: 54, min: 10, tipo: "Con juego" });
    expect(ajuste(10, 0, 40, 25).tipo).toBe("Con apriete");
    expect(ajuste(25, 0, 10, -10).tipo).toBe("Indeterminado");
  });
  it("calidad estadística", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 3);
    expect(normalCdf(1.96)).toBeCloseTo(0.975, 3);
    expect(normalCdf(-1)).toBeCloseTo(0.1587, 3);
    expect(fraccionFuera(20, 0.05, 19.9, 20.1)).toBeCloseTo(0.0455, 3);
    expect(fraccionFuera(20, 0, 19.9, 20.1)).toBe(0);
    expect(fraccionFuera(21, 0, 19.9, 20.1)).toBe(1);
    expect(capacidadCp(19.9, 20.1, 0.05)).toBeCloseTo(0.667, 2);
    expect(capacidadCpk(20.05, 19.9, 20.1, 0.05)).toBeCloseTo(0.333, 2);
    expect(capacidadCp(19.9, 20.1, 0)).toBe(Infinity);
  });
});
