import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ciclo555, evalBoole, frecuencia555, mixtoR1R2R3, paraleloR, periodo, potenciaVI, potenciaVR, resistenciaBase, rizado, tensionSecundario, valorEficaz } from "@/components/lesson/slide/tools/TecEso4ElectronicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-alterna-explorador", "eso4-potencia-explorador", "eso4-circuito-mixto-explorador", "eso4-fuente-explorador", "eso4-transistor-explorador", "eso4-555-explorador", "eso4-boole-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 4: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 4", () => {
  it("alterna y potencia", () => {
    expect(valorEficaz(325)).toBeCloseTo(229.8, 1);
    expect(periodo(50)).toBeCloseTo(0.02);
    expect(periodo(0)).toBe(Infinity);
    expect(potenciaVI(230, 5)).toBe(1150);
    expect(potenciaVR(12, 0)).toBe(0);
    expect(potenciaVR(12, 144)).toBeCloseTo(1);
  });
  it("circuito mixto y fuente", () => {
    expect(paraleloR(220, 330)).toBeCloseTo(132);
    const m = mixtoR1R2R3(12, 100, 220, 330);
    expect(m.req).toBeCloseTo(232);
    expect(m.i).toBeCloseTo(0.0517, 3);
    expect(m.i2 + m.i3).toBeCloseTo(m.i);
    expect(m.v1 + m.vp).toBeCloseTo(12);
    expect(tensionSecundario(230, 1150, 60)).toBeCloseTo(12);
    expect(rizado(0.5, 50, 0.0022)).toBeCloseTo(2.27, 2);
    expect(rizado(0.5, 50, 0)).toBe(Infinity);
  });
  it("transistor, 555 y Boole", () => {
    expect(resistenciaBase(5, 0.2, 100)).toBeCloseTo(430);
    expect(resistenciaBase(0.5, 0.2, 100)).toBe(Infinity);
    expect(frecuencia555(1000, 10000, 1e-5)).toBeCloseTo(6.86, 2);
    expect(ciclo555(1, 10)).toBeGreaterThan(50);
    expect(evalBoole(0, true, true, false)).toBe(true);
    expect(evalBoole(1, true, true, false)).toBe(false);
    expect(evalBoole(3, true, true, false)).toBe(false);
  });
});
