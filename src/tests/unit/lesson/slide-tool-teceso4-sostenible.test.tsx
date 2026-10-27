import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { arbolesNecesarios, consumoFinal, contraste, huellaAnual, impactoAnual, letraEnergetica, pendienteMaxima, pendienteRampa, reparar_vs_nuevo, simulaDia } from "@/components/lesson/slide/tools/TecEso4SostenibleTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-huella-hogar-explorador", "eso4-autoconsumo-explorador", "eso4-certificado-explorador", "eso4-reparar-explorador", "eso4-accesibilidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 7: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 7", () => {
  it("huella y autoconsumo", () => {
    expect(huellaAnual(3000, 0, 0, 0)).toBeCloseTo(0.6);
    expect(huellaAnual(0, 0, 10000, 2000)).toBeCloseTo(2.2);
    expect(arbolesNecesarios(0.66)).toBeCloseTo(30);
    const sin = simulaDia(3, 10, 0);
    const con = simulaDia(3, 10, 10);
    expect(sin.totGen).toBeCloseTo(12);
    expect(con.autoconsumo).toBeGreaterThan(sin.autoconsumo);
    expect(con.red).toBeLessThan(sin.red);
    expect(simulaDia(0, 10, 5).autoconsumo).toBe(0);
    expect(sin.totDem).toBeCloseTo(10);
    expect(sin.autoconsumo).toBeLessThanOrEqual(100);
  });
  it("certificado y circular", () => {
    expect(letraEnergetica(30)).toBe("A");
    expect(letraEnergetica(120)).toBe("D");
    expect(letraEnergetica(400)).toBe("G");
    expect(consumoFinal(150, 40, 3.5)).toBeCloseTo(25.71, 1);
    expect(consumoFinal(150, 40, 0)).toBe(Infinity);
    expect(impactoAnual(300, 6)).toBe(50);
    expect(impactoAnual(300, 0)).toBe(Infinity);
    const r = reparar_vs_nuevo(60, 400, 4, 8, 300);
    expect(r.repAnio).toBe(15);
    expect(r.nuevoAnio).toBe(50);
    expect(r.convieneReparar).toBe(true);
    expect(reparar_vs_nuevo(390, 400, 1, 8, 300).convieneReparar).toBe(false);
  });
  it("accesibilidad", () => {
    expect(pendienteRampa(30, 4)).toBeCloseTo(7.5);
    expect(pendienteMaxima(2)).toBe(10);
    expect(pendienteMaxima(4)).toBe(8);
    expect(pendienteMaxima(8)).toBe(6);
    expect(contraste(0, 255)).toBeCloseTo(21, 0);
    expect(contraste(100, 100)).toBeCloseTo(1);
    expect(contraste(255, 0)).toBeCloseTo(contraste(0, 255));
  });
});
