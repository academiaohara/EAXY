import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CADENAS, FUENTES, aKelvin, cinetica, emisionesCO2, energiasCaida, potencial, rendimiento, temperaturaEquilibrio, velocidadDeEc } from "@/components/lesson/slide/tools/Fq2EnergiaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-transformaciones-energia-explorador", "fq2-cinetica-potencial-explorador", "fq2-conservacion-energia-explorador", "fq2-calor-temperatura-explorador", "fq2-fuentes-energia-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de la energía: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("cinética y potencial", () => {
    expect(cinetica(70, 10)).toBe(3500);
    expect(potencial(2, 10)).toBeCloseTo(196);
    expect(cinetica(1, 6)).toBeCloseTo(4 * cinetica(1, 3));
    expect(potencial(2, 20)).toBeCloseTo(2 * potencial(2, 10));
  });
  it("conservación: la suma no cambia", () => {
    for (const f of [0, 0.25]) {
      for (const h of [0, 3, 7, 10]) {
        const e = energiasCaida(2, 10, h, f);
        expect(e.ep + e.ec + e.calor).toBeCloseTo(e.total);
      }
    }
    const abajo = energiasCaida(2, 10, 0, 0);
    expect(abajo.ec).toBeCloseTo(196);
    expect(velocidadDeEc(abajo.ec, 2)).toBeCloseTo(14);
    expect(energiasCaida(2, 10, 5, 0.25).calor).toBeCloseTo(24.5);
    expect(velocidadDeEc(1, 0)).toBeNaN();
  });
  it("equilibrio térmico", () => {
    expect(temperaturaEquilibrio(200, 80, 300, 20)).toBeCloseTo(44);
    expect(temperaturaEquilibrio(100, 60, 100, 20)).toBeCloseTo(40);
    expect(temperaturaEquilibrio(0, 0, 0, 0)).toBeNaN();
    const tf = temperaturaEquilibrio(150, 90, 80, 10);
    expect(tf).toBeGreaterThan(10);
    expect(tf).toBeLessThan(90);
    expect(aKelvin(25)).toBe(298);
  });
  it("fuentes y rendimiento", () => {
    expect(emisionesCO2("gas", 200)).toBeCloseTo(98);
    expect(FUENTES.carbon.co2).toBeGreaterThan(FUENTES.solar.co2);
    expect(Object.values(FUENTES).filter((f) => f.renovable).length).toBe(4);
    expect(rendimiento(150, 500)).toBe(30);
    expect(rendimiento(1, 0)).toBeNaN();
    for (const c of Object.values(CADENAS)) expect(c.pasos.length).toBeGreaterThanOrEqual(2);
  });
});
