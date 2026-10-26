import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PUERTAS, adc, combinacionesSirena, puerta, siguientePuerta, simulaLazo, simulaRiego, sirena } from "@/components/lesson/slide/tools/TecEso3ControlTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-sistema-ips-explorador", "eso3-lazo-control-explorador", "eso3-conversor-adc-explorador", "eso3-puertas-explorador", "eso3-alarma-explorador", "eso3-puerta-garaje-explorador", "eso3-riego-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 5: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 5", () => {
  it("lazo abierto y cerrado", () => {
    const frio = simulaLazo(21, 5, 50, 240);
    const calido = simulaLazo(21, 15, 50, 240);
    // El lazo cerrado mantiene la consigna con cualquier temperatura exterior; el abierto depende de ella.
    expect(Math.abs(frio.cerrado.at(-1)! - 21)).toBeLessThan(1.2);
    expect(Math.abs(calido.cerrado.at(-1)! - 21)).toBeLessThan(1.2);
    expect(Math.abs(frio.abierto.at(-1)! - calido.abierto.at(-1)!)).toBeGreaterThan(5);
    expect(simulaLazo(21, 10, 50, 0).fraccionOn).toBe(0);
  });
  it("conversor y puertas", () => {
    expect(adc(5, 5, 10).codigo).toBe(1023);
    expect(adc(0, 5, 8).codigo).toBe(0);
    expect(adc(2.5, 5, 2)).toMatchObject({ codigo: 2, niveles: 4 });
    expect(adc(5, 5, 10).resolucion * 1000).toBeCloseTo(4.88, 1);
    expect(adc(-1, 5, 4).codigo).toBe(0);
    expect(puerta("AND", true, false)).toBe(false);
    expect(puerta("NOR", false, false)).toBe(true);
    expect(puerta("XOR", true, true)).toBe(false);
    expect(puerta("NOT", false, true)).toBe(true);
    expect(PUERTAS).toHaveLength(6);
  });
  it("alarma y puerta de garaje", () => {
    expect(sirena(true, false, false, true)).toBe(true);
    expect(sirena(false, true, true, true)).toBe(false);
    expect(combinacionesSirena()).toBe(7);
    expect(siguientePuerta("Cerrada", "Pulsador")).toBe("Abriendo");
    expect(siguientePuerta("Abriendo", "Final de carrera arriba")).toBe("Abierta");
    expect(siguientePuerta("Cerrando", "Obstáculo")).toBe("Abriendo");
    expect(siguientePuerta("Cerrada", "Obstáculo")).toBe("Cerrada");
  });
  it("riego", () => {
    const r = simulaRiego(60, 50, 4);
    expect(r.horasBomba).toBeGreaterThan(0);
    expect(Math.min(...r.auto)).toBeGreaterThan(Math.min(...r.temp));
    expect(r.litrosTemp).toBe(60);
    expect(Math.max(...r.auto)).toBeLessThanOrEqual(100);
  });
});
