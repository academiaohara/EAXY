import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { alturaEn, desplazamiento, distanciasParada, instantesEncuentro, longitudTrayectoria, mcu, posicion, tiroVertical } from "@/components/lesson/slide/tools/Fq4CinematicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-vectores-movimiento-explorador", "fq4-encuentro-explorador", "fq4-tiro-vertical-explorador", "fq4-mcu-explorador", "fq4-seguridad-vial-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de cinemática (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("desplazamiento y distancia", () => {
    expect(desplazamiento([0, 0], [3, 4]).modulo).toBe(5);
    expect(longitudTrayectoria([0, 0], [3, 4], 0)).toBeCloseTo(5, 6);
    expect(longitudTrayectoria([0, 0], [3, 4], 1)).toBeGreaterThan(5);
  });
  it("encuentros", () => {
    expect(instantesEncuentro(0, 10, 0, 300, -20, 0)).toEqual([10]);
    expect(instantesEncuentro(0, 10, 0, 300, 10, 0)).toEqual([]);
    expect(instantesEncuentro(0, 0, 2, 100, 0, 0)[0]).toBeCloseTo(10, 6);
    expect(posicion(0, 0, 2, 10)).toBe(100);
  });
  it("tiro vertical", () => {
    const r = tiroVertical(0, 20, 10);
    expect(r.hMax).toBeCloseTo(20);
    expect(r.tVuelo).toBeCloseTo(4);
    expect(r.vImpacto).toBeCloseTo(-20);
    expect(alturaEn(0, 20, 4, 10)).toBeCloseTo(0);
    expect(tiroVertical(19.6, 0, 9.8).tVuelo).toBeCloseTo(2);
  });
  it("MCU y frenada", () => {
    const m = mcu(2, 4);
    expect(m.omega).toBeCloseTo(Math.PI / 2);
    expect(m.v).toBeCloseTo(Math.PI);
    expect(m.ac).toBeCloseTo(m.v ** 2 / 2);
    expect(mcu(0, 4).v).toBeNaN();
    const d = distanciasParada(72, 1, 0.5);
    expect(d.dReaccion).toBeCloseTo(20);
    expect(d.dFrenada).toBeCloseTo(400 / 9.8);
    expect(distanciasParada(144, 1, 0.5).dFrenada).toBeCloseTo(d.dFrenada * 4);
  });
});
