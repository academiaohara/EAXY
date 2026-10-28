import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { amortizacion, arbolesEquivalentes, emisionesTrayecto, energiaDiariaFv, perdidaEnvolvente, potenciaEolica, potenciaHidraulica, potenciaPico, transmitancia } from "@/components/lesson/slide/tools/TecEso3SostenibleTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-solar-explorador", "eso3-eolica-explorador", "eso3-aislamiento-explorador", "eso3-transporte-explorador", "eso3-hidraulica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 8: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 8", () => {
  it("solar y amortización", () => {
    expect(potenciaPico(10, 20)).toBeCloseTo(2000);
    expect(energiaDiariaFv(2000, 5)).toBeCloseTo(8);
    expect(amortizacion(6000, 600)).toBeCloseTo(10);
    expect(amortizacion(6000, 0)).toBe(Infinity);
  });
  it("eólica e hidráulica", () => {
    expect(potenciaEolica(40, 10) / potenciaEolica(40, 5)).toBeCloseTo(8);
    expect(potenciaHidraulica(10, 50) / potenciaHidraulica(10, 25)).toBeCloseTo(2);
    expect(potenciaHidraulica(0, 50)).toBe(0);
  });
  it("aislamiento y transporte", () => {
    expect(transmitancia(0, 0)).toBeCloseTo(1 / 0.3);
    expect(transmitancia(0.04, 8)).toBeCloseTo(1 / 2.3);
    expect(perdidaEnvolvente(0.5, 60, 15)).toBeCloseTo(450);
    expect(emisionesTrayecto(170, 15, 220)).toBeCloseTo(1122);
    expect(emisionesTrayecto(0, 15, 220)).toBe(0);
    expect(arbolesEquivalentes(44)).toBeCloseTo(2);
  });
});
