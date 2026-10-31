import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { FLUIDOS, OBJETOS, accionReaccion, bloqueHorizontal, cinematicaDesdeReposo, empuje, flota, fraccionSumergida, presion, presionHidrostatica, resultante, rozamientoMax } from "@/components/lesson/slide/tools/Fq3FuerzasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-composicion-fuerzas-explorador", "fq3-accion-reaccion-explorador", "fq3-newton2-rozamiento-explorador", "fq3-presion-explorador", "fq3-flotacion-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de fuerzas (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("resultante", () => {
    expect(resultante(30, 40, 0).modulo).toBeCloseTo(70);
    expect(resultante(30, 40, 180).modulo).toBeCloseTo(10);
    expect(resultante(30, 40, 90).modulo).toBeCloseTo(50);
    expect(resultante(30, 40, 90).angulo).toBeCloseTo(53.13, 1);
    expect(resultante(50, 50, 120).modulo).toBeCloseTo(50);
  });
  it("acción y reacción", () => {
    const r = accionReaccion(150, 50, 75);
    expect(r.a1).toBe(3);
    expect(r.a2).toBe(2);
    expect(accionReaccion(10, 0, 5).a1).toBeNaN();
  });
  it("segunda ley y rozamiento", () => {
    expect(rozamientoMax(0.2, 20, 10)).toBe(40);
    expect(rozamientoMax(-1, 20)).toBe(0);
    const b = bloqueHorizontal(60, 20, 0.2, 10);
    expect(b.rozamiento).toBe(40);
    expect(b.neta).toBe(20);
    expect(b.a).toBe(1);
    expect(b.parado).toBe(false);
    const p = bloqueHorizontal(30, 20, 0.2, 10);
    expect(p.parado).toBe(true);
    expect(p.a).toBe(0);
    expect(p.rozamiento).toBe(30);
    expect(cinematicaDesdeReposo(2, 3)).toEqual({ v: 6, x: 9 });
  });
  it("presión", () => {
    expect(presion(600, 0.03)).toBeCloseTo(20000);
    expect(presion(10, 0)).toBeNaN();
    expect(presionHidrostatica(1000, 5, 10)).toBe(50000);
    expect(presionHidrostatica(1000, -5)).toBe(0);
  });
  it("flotación", () => {
    expect(empuje(1000, 0.002, 10)).toBe(20);
    expect(fraccionSumergida(500, 1000)).toBe(0.5);
    expect(fraccionSumergida(7870, 1000)).toBe(1);
    expect(fraccionSumergida(0, 1000)).toBeNaN();
    expect(flota(920, 1000)).toBe(true);
    expect(flota(2700, 1000)).toBe(false);
    for (const o of OBJETOS) for (const f of FLUIDOS) expect(flota(o.rho, f.rho)).toBe(fraccionSumergida(o.rho, f.rho) < 1 || o.rho === f.rho);
  });
});
