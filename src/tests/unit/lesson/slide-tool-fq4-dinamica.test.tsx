import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aceleracionNeta, alargamientoPeso, atwood, energiaElastica, fuerzaCentripeta, fuerzaElastica, mesaPolea, planoInclinado, rozamiento, velocidadMaximaCurva } from "@/components/lesson/slide/tools/Fq4DinamicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-newton-explorador", "fq4-rozamiento-explorador", "fq4-plano-inclinado-explorador", "fq4-poleas-explorador", "fq4-elastica-centripeta-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de dinámica (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("segunda ley", () => {
    expect(aceleracionNeta([50, -20], 6)).toBe(5);
    expect(aceleracionNeta([10], 0)).toBeNaN();
  });
  it("rozamiento", () => {
    const quieto = rozamiento(10, 30, 0.5, 0.4);
    expect(quieto.desliza).toBe(false);
    expect(quieto.fr).toBe(30);
    expect(quieto.a).toBe(0);
    const mueve = rozamiento(10, 80, 0.5, 0.4);
    expect(mueve.desliza).toBe(true);
    expect(mueve.fr).toBeCloseTo(39.2);
    expect(mueve.a).toBeCloseTo((80 - 39.2) / 10);
  });
  it("plano inclinado", () => {
    const sin = planoInclinado(10, 30, 0);
    expect(sin.a).toBeCloseTo(9.8 * 0.5, 6);
    expect(planoInclinado(10, 10, 0.5).desliza).toBe(false);
    expect(planoInclinado(10, 45, 0.5).desliza).toBe(true);
    expect(planoInclinado(10, 45, 0.5).a).toBeCloseTo(9.8 * (Math.SQRT1_2 - 0.5 * Math.SQRT1_2), 6);
    expect(planoInclinado(10, 0, 0.3).a).toBe(0);
    expect(planoInclinado(10, 30, 1).anguloLimite).toBeCloseTo(45);
  });
  it("poleas", () => {
    const a = atwood(2, 3);
    expect(a.a).toBeCloseTo(9.8 / 5);
    expect(a.T).toBeCloseTo((2 * 2 * 3 * 9.8) / 5);
    expect(atwood(0, 0).a).toBeNaN();
    const m = mesaPolea(3, 2, 0);
    expect(m.a).toBeCloseTo((2 * 9.8) / 5);
    expect(m.T).toBeCloseTo(3 * m.a);
    expect(mesaPolea(10, 1, 0.5).desliza).toBe(false);
  });
  it("muelles y curvas", () => {
    expect(fuerzaElastica(200, -0.1)).toBeCloseTo(20);
    expect(energiaElastica(200, 0.1)).toBeCloseTo(1);
    expect(alargamientoPeso(1, 98)).toBeCloseTo(0.1);
    expect(fuerzaCentripeta(1000, 10, 50)).toBe(2000);
    expect(fuerzaCentripeta(1, 1, 0)).toBeNaN();
    expect(velocidadMaximaCurva(0.4, 40)).toBeCloseTo(Math.sqrt(0.4 * 9.8 * 40));
    expect(velocidadMaximaCurva(0.4, 0)).toBeNaN();
  });
});
