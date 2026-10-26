import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { costePorResistencia, energiaIncorporada, longitudCorte, masaColada, medidaModelo, nivelRiesgo, resistenciaEspecifica, rpmCorte, tiempoLaser, tiempoPasada, velocidadCorte } from "@/components/lesson/slide/tools/TecEso3MaterialesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-prestaciones-explorador", "eso3-fundicion-explorador", "eso3-corte-explorador", "eso3-union-explorador", "eso3-impacto-material-explorador", "eso3-laser-explorador", "eso3-riesgos-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 2: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 2", () => {
  it("prestaciones, colada y modelo", () => {
    expect(resistenciaEspecifica(275, 2.7)).toBeCloseTo(101.85, 1);
    expect(costePorResistencia(2, 100)).toBeCloseTo(2);
    expect(masaColada(200, 2.7)).toBeCloseTo(0.702, 3);
    expect(medidaModelo(100, 1.5)).toBeCloseTo(101.5);
  });
  it("corte en torno", () => {
    expect(rpmCorte(60, 20)).toBeCloseTo(954.9, 1);
    expect(velocidadCorte(50, 400)).toBeCloseTo(62.83, 1);
    expect(tiempoPasada(100, 0.2, 500)).toBeCloseTo(1);
    expect(tiempoPasada(100, 0, 500)).toBe(Infinity);
    expect(rpmCorte(60, 0)).toBe(0);
  });
  it("impacto, láser y riesgo", () => {
    expect(energiaIncorporada(10, 180, 15, 100)).toBeCloseTo(150);
    expect(energiaIncorporada(10, 180, 15, 0)).toBeCloseTo(1800);
    expect(longitudCorte(100, 60, 0, 5)).toBeCloseTo(320);
    expect(tiempoLaser(320, 8, 0)).toBeCloseTo(40);
    expect(tiempoLaser(320, 0, 0)).toBe(Infinity);
    expect(nivelRiesgo(3, 4)).toMatchObject({ valor: 12, nivel: "Medio" });
    expect(nivelRiesgo(1, 2).nivel).toBe("Bajo");
    expect(nivelRiesgo(5, 5).nivel).toBe("Alto");
  });
});
