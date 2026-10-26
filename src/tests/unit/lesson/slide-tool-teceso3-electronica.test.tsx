import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { comparador, divisor, e12Superior, formatoOhm, ldrOhm, luxUmbral, luzAutomatica, mismoNodo, ntcOhm, resistenciaConductor, resistenciaLed, tauMs, transistor, vCondensador, valorResistencia } from "@/components/lesson/slide/tools/TecEso3ElectronicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-conductor-explorador", "eso3-codigo-colores-explorador", "eso3-led-resistencia-explorador", "eso3-transistor-explorador", "eso3-sensor-divisor-explorador", "eso3-condensador-explorador", "eso3-protoboard-explorador", "eso3-comparador-explorador", "eso3-luz-automatica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 4: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 4", () => {
  it("conductores y código de colores", () => {
    expect(resistenciaConductor(0.5, 10, 0.5)).toBe(10);
    expect(resistenciaConductor(0.5, 10, 1)).toBe(5);
    expect(valorResistencia(3, 9, 2)).toBe(3900);
    expect(valorResistencia(1, 0, 3)).toBe(10000);
    expect(formatoOhm(3900)).toBe("3,9 kΩ");
    expect(formatoOhm(470)).toBe("470 Ω");
  });
  it("LED y transistor", () => {
    expect(resistenciaLed(9, 2, 10)).toBeCloseTo(700);
    expect(Number.isNaN(resistenciaLed(1.5, 2, 10))).toBe(true);
    expect(e12Superior(700)).toBe(820);
    expect(e12Superior(680)).toBe(680);
    expect(e12Superior(1000)).toBe(1000);
    const t = transistor(5, 10000, 200);
    expect(t.ibMa).toBeCloseTo(0.43);
    expect(t.icMaxMa).toBeCloseTo(43);
    expect(t.satura).toBe(false);
    expect(transistor(5, 1000, 200).satura).toBe(true);
    expect(transistor(0.5, 1000, 50).icMaxMa).toBe(0);
  });
  it("sensores, condensador y comparador", () => {
    expect(divisor(5, 10000, 10000)).toBe(2.5);
    expect(divisor(5, 10000, 30000)).toBeCloseTo(3.75);
    expect(ldrOhm(100)).toBeCloseTo(10000);
    expect(ldrOhm(10)).toBeGreaterThan(ldrOhm(100));
    expect(ntcOhm(25)).toBeCloseTo(10000);
    expect(ntcOhm(50)).toBeLessThan(10000);
    expect(tauMs(10, 100)).toBe(1000);
    expect(vCondensador(5, 1000, 1000)).toBeCloseTo(5 * (1 - Math.exp(-1)));
    expect(vCondensador(5, 1000, 5000)).toBeGreaterThan(4.9);
    expect(comparador(3, 2.5)).toBe(true);
    expect(comparador(1, 2)).toBe(false);
  });
  it("protoboard y luz automática", () => {
    expect(mismoNodo(3, 0, 3, 0)).toBe(true);
    expect(mismoNodo(3, 0, 3, 1)).toBe(false);
    expect(mismoNodo(3, 0, 4, 0)).toBe(false);
    expect(luzAutomatica(100, 10000).vb).toBeCloseTo(2.5);
    expect(luzAutomatica(100, 10000).encendida).toBe(true);
    expect(luzAutomatica(1000, 10000).encendida).toBe(false);
    const u = luxUmbral(10000);
    expect(luzAutomatica(u * 0.95, 10000).encendida).toBe(true);
    expect(luzAutomatica(u * 1.05, 10000).encendida).toBe(false);
    expect(luxUmbral(100000)).toBeLessThan(luxUmbral(10000));
  });
});
