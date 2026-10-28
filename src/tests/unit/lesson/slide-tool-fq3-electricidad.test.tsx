import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { APARATOS, circuito, corrienteCuerpoMA, efectoCorriente, electronesPorSegundo, energiaKWh, frotamiento, fuerzaCoulomb, intensidad, ohmI, ohmR, ohmV, potenciaElectrica, resistenciaHilo, resistenciaParalelo, resistenciaSerie, tension, tipoFuerzaCarga, TRIBO } from "@/components/lesson/slide/tools/Fq3ElectricidadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-carga-coulomb-explorador", "fq3-intensidad-tension-explorador", "fq3-ley-ohm-explorador", "fq3-resistencia-hilo-explorador", "fq3-circuito-explorador", "fq3-consumo-electrico-explorador", "fq3-seguridad-electrica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de electricidad (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 5, b: 5, c: 5, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("carga y Coulomb", () => {
    expect(fuerzaCoulomb(4, 4, 0.5)).toBeCloseTo(0.576, 3);
    expect(fuerzaCoulomb(4, 4, 1)).toBeCloseTo(fuerzaCoulomb(4, 4, 0.5) / 4, 6);
    expect(fuerzaCoulomb(4, 4, 0)).toBeNaN();
    expect(fuerzaCoulomb(4, -4, 0.5)).toBeCloseTo(fuerzaCoulomb(4, 4, 0.5), 9);
    expect(tipoFuerzaCarga(1, 1)).toBe("repulsión");
    expect(tipoFuerzaCarga(1, -1)).toBe("atracción");
    expect(tipoFuerzaCarga(0, 1)).toContain("no hay");
    expect(frotamiento(0, 1)).toEqual({ positivo: TRIBO[0], negativo: TRIBO[1] });
    expect(frotamiento(3, 1)).toEqual({ positivo: TRIBO[1], negativo: TRIBO[3] });
    expect(frotamiento(2, 2)).toBeNull();
    expect(frotamiento(-1, 99)).toBeNull();
  });
  it("intensidad y tensión", () => {
    expect(intensidad(6, 3)).toBe(2);
    expect(intensidad(6, 0)).toBeNaN();
    expect(tension(36, 6)).toBe(6);
    expect(tension(36, 0)).toBeNaN();
    expect(electronesPorSegundo(1)).toBeCloseTo(6.24e18, -16);
  });
  it("Ohm y resistencia", () => {
    expect(ohmI(12, 20)).toBeCloseTo(0.6);
    expect(ohmI(12, 0)).toBeNaN();
    expect(ohmV(0.2, 50)).toBeCloseTo(10);
    expect(ohmR(9, 0.3)).toBeCloseTo(30);
    expect(ohmR(9, 0)).toBeNaN();
    expect(resistenciaHilo(0.017, 100, 1)).toBeCloseTo(1.7);
    expect(resistenciaHilo(0.017, 100, 0)).toBeNaN();
  });
  it("circuitos", () => {
    expect(resistenciaSerie([10, 20])).toBe(30);
    expect(resistenciaParalelo([20, 20])).toBeCloseTo(10);
    expect(resistenciaParalelo([10, 40])).toBeCloseTo(8);
    expect(resistenciaParalelo([10, 0])).toBeNaN();
    expect(resistenciaParalelo([])).toBeNaN();
    const s = circuito("serie", 12, 10, 20);
    expect(s.I).toBeCloseTo(0.4);
    expect(s.V1 + s.V2).toBeCloseTo(12);
    const p = circuito("paralelo", 12, 10, 40);
    expect(p.I).toBeCloseTo(p.I1 + p.I2);
    expect(p.V1).toBe(12);
    expect(p.Req).toBeLessThan(10);
  });
  it("potencia y seguridad", () => {
    expect(potenciaElectrica(230, 5)).toBe(1150);
    expect(energiaKWh(2000, 3)).toBe(6);
    expect(APARATOS.length).toBeGreaterThan(5);
    expect(corrienteCuerpoMA(230, 100000)).toBeCloseTo(2.3);
    expect(corrienteCuerpoMA(230, 1000)).toBeCloseTo(230);
    expect(corrienteCuerpoMA(230, 0)).toBeNaN();
    expect(efectoCorriente(0.5)).toContain("imperceptible");
    expect(efectoCorriente(20)).toContain("contracción");
    expect(efectoCorriente(100)).toContain("muerte");
    expect(efectoCorriente(NaN)).toBe("—");
  });
});
