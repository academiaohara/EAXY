import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { APARATOS, costeKWh, energiaCinetica, energiaKWh, energiaPotencial, pistaU, potencia, rendimiento, teoremaTrabajoEnergia, trabajo } from "@/components/lesson/slide/tools/Fq4EnergiaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-trabajo-potencia-explorador", "fq4-energias-explorador", "fq4-teorema-trabajo-energia-explorador", "fq4-conservacion-energia-explorador", "fq4-rendimiento-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de energía (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("trabajo y potencia", () => {
    expect(trabajo(50, 8, 0)).toBeCloseTo(400);
    expect(trabajo(100, 10, 60)).toBeCloseTo(500);
    expect(trabajo(100, 10, 90)).toBeCloseTo(0, 6);
    expect(trabajo(100, 10, 180)).toBeCloseTo(-1000);
    expect(potencia(6000, 30)).toBe(200);
    expect(potencia(1, 0)).toBeNaN();
  });
  it("energías", () => {
    expect(energiaCinetica(1000, 20)).toBe(200000);
    expect(energiaPotencial(3, 10)).toBeCloseTo(294);
    expect(energiaCinetica(2, 20)).toBe(4 * energiaCinetica(2, 10));
  });
  it("teorema trabajo-energía", () => {
    const r = teoremaTrabajoEnergia(2, 0, 20, 0, 5);
    expect(r.wNeto).toBe(100);
    expect(r.vFinal).toBeCloseTo(10);
    const f = teoremaTrabajoEnergia(1000, 10, 0, 0.5, 100);
    expect(f.seDetiene).toBe(true);
    expect(f.vFinal).toBe(0);
    expect(f.distanciaParada).toBeCloseTo(50000 / (0.5 * 1000 * 9.8));
    expect(teoremaTrabajoEnergia(10, 0, 200, 0.2, 10).distanciaParada).toBe(Infinity);
  });
  it("pista en U", () => {
    const a = pistaU(2, 10, 0, 0);
    expect(a.ec).toBe(0);
    expect(a.ep).toBeCloseTo(2 * 9.8 * 10);
    const m = pistaU(2, 10, 0.5, 0);
    expect(m.ep).toBe(0);
    expect(m.v).toBeCloseTo(Math.sqrt(2 * 9.8 * 10));
    const fin = pistaU(2, 10, 1, 0.3);
    expect(fin.em).toBeCloseTo(0.7 * a.emInicial);
    expect(fin.alcanza).toBe(false);
    for (const s of [0, 0.1, 0.5, 0.9, 1]) expect(pistaU(3, 5, s, 0).em).toBeCloseTo(pistaU(3, 5, 0, 0).em);
  });
  it("rendimiento y consumo", () => {
    expect(rendimiento(500, 400)).toBeCloseTo(0.8);
    expect(rendimiento(0, 1)).toBeNaN();
    expect(energiaKWh(150, 4)).toBeCloseTo(0.6);
    expect(costeKWh(20, 0.15)).toBeCloseTo(3);
    for (const a of APARATOS) expect(a.eta).toBeLessThan(1);
  });
});
