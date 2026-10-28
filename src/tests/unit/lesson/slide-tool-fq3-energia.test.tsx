import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { AISLANTES, MATERIALES_C, alturaPista, calentamientoHielo, calor, calorTotalHastaVapor, estadoPista, kWh, perdidaCalor, potencia, tiempoCalentar, trabajo, wAcv } from "@/components/lesson/slide/tools/Fq3EnergiaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-trabajo-potencia-explorador", "fq3-montana-rusa-explorador", "fq3-calor-especifico-explorador", "fq3-calentamiento-hielo-explorador", "fq3-aislamiento-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de energía (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("trabajo y potencia", () => {
    expect(trabajo(50, 20)).toBe(1000);
    expect(trabajo(100, 10, 60)).toBeCloseTo(500);
    expect(trabajo(100, 10, 90)).toBeCloseTo(0, 6);
    expect(potencia(1000, 10)).toBe(100);
    expect(potencia(1000, 0)).toBeNaN();
    expect(wAcv(735.5)).toBeCloseTo(1);
    expect(kWh(2000, 3)).toBe(6);
  });
  it("pista y conservación", () => {
    expect(alturaPista(0)).toBe(20);
    expect(alturaPista(0.35)).toBe(0);
    expect(alturaPista(5)).toBe(2);
    const abajo = estadoPista(0.35, 500, 0, 10);
    expect(abajo.ec).toBeCloseTo(100000);
    expect(abajo.v).toBeCloseTo(20);
    const roz = estadoPista(0.35, 500, 0.2, 10);
    expect(roz.ec).toBeCloseTo(80000);
    expect(roz.calor).toBeCloseTo(20000);
    for (const s of [0, 0.2, 0.5, 0.9]) {
      const e = estadoPista(s, 300, 0.1);
      expect(e.ep + e.ec + e.calor).toBeCloseTo(300 * 9.8 * 20, 4);
    }
  });
  it("calor específico", () => {
    expect(calor(2, 4180, 50)).toBe(418000);
    expect(tiempoCalentar(418000, 1000)).toBe(418);
    expect(tiempoCalentar(1, 0)).toBeNaN();
    expect(MATERIALES_C.find((m) => m.nombre === "Agua")!.c).toBeGreaterThan(MATERIALES_C.find((m) => m.nombre === "Hierro")!.c);
  });
  it("curva de calentamiento", () => {
    const m = 0.2;
    expect(calentamientoHielo(m, 0).T).toBe(-20);
    expect(calentamientoHielo(m, m * 2100 * 20 + 1000).estado).toContain("fundiendo");
    expect(calentamientoHielo(m, m * 2100 * 20 + 1000).T).toBe(0);
    expect(calentamientoHielo(m, m * (2100 * 20 + 334000 + 4180 * 50)).T).toBeCloseTo(50);
    expect(calentamientoHielo(m, m * (2100 * 20 + 334000 + 4180 * 100 + 1e6)).T).toBe(100);
    expect(calentamientoHielo(m, calorTotalHastaVapor(m) + m * 2000 * 10).T).toBeCloseTo(110);
    expect(calentamientoHielo(0, 100).T).toBeNaN();
    let prev = -Infinity;
    for (let q = 0; q < calorTotalHastaVapor(m) * 1.2; q += 5000) {
      const T = calentamientoHielo(m, q).T;
      expect(T).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = T;
    }
  });
  it("aislamiento", () => {
    expect(perdidaCalor(0.04, 20, 20, 0.1)).toBeCloseTo(160);
    expect(perdidaCalor(0.04, 20, 20, 0.2)).toBeCloseTo(80);
    expect(perdidaCalor(0.04, 20, 20, 0)).toBeNaN();
    expect(AISLANTES[0].k).toBeGreaterThan(AISLANTES[5].k);
  });
});
