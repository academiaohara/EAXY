import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { atwood, choque, mesaPolea, muelleColgado, muelleEquivalente, planoInclinado, resultante } from "@/components/lesson/slide/tools/Fb1DinamicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-fuerzas-resultante-explorador", "fb1-plano-inclinado-explorador", "fb1-poleas-explorador", "fb1-muelle-explorador", "fb1-choque-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de dinámica (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("cálculos de dinámica", () => {
  it("resultante de fuerzas", () => {
    expect(resultante([[6, 0], [8, 90]]).R).toBeCloseTo(10, 9);
    expect(resultante([[20, 0], [20, 120], [20, 240]]).R).toBeCloseTo(0, 9);
    expect(resultante([[0, 0]]).ang).toBeNaN();
  });
  it("plano inclinado", () => {
    const r = planoInclinado(10, 30, 0, 10);
    expect(r.a).toBeCloseTo(5, 6);
    expect(r.N).toBeCloseTo(86.6, 1);
    expect(planoInclinado(10, 20, 0.5).desliza).toBe(false);
    expect(planoInclinado(10, 40, 0.5).desliza).toBe(true);
    expect(planoInclinado(10, 40, 0.5, 10).a).toBeCloseTo(10 * (Math.sin(Math.PI * 40 / 180) - 0.5 * Math.cos(Math.PI * 40 / 180)), 6);
  });
  it("poleas", () => {
    expect(atwood(2, 3, 10).a).toBeCloseTo(2, 9);
    expect(atwood(2, 3, 10).T).toBeCloseTo(24, 9);
    expect(mesaPolea(4, 1, 0, 10).a).toBeCloseTo(2, 9);
    expect(mesaPolea(4, 1, 0.5, 10).desliza).toBe(false);
    expect(mesaPolea(1, 1, 0.5, 10).a).toBeCloseTo(2.5, 9);
    expect(atwood(0, 0).a).toBeNaN();
  });
  it("muelles", () => {
    expect(muelleEquivalente(100, 100, "paralelo")).toBe(200);
    expect(muelleEquivalente(100, 100, "serie")).toBe(50);
    expect(muelleColgado(100, 0.5, 10).x).toBeCloseTo(0.05, 9);
    expect(muelleColgado(0, 1).x).toBeNaN();
  });
  it("choques", () => {
    const e = choque(1, 5, 1, 0, 1);
    expect(e.v1f).toBeCloseTo(0, 9);
    expect(e.v2f).toBeCloseTo(5, 9);
    expect(e.perdida).toBeCloseTo(0, 9);
    const i = choque(2000, 3, 1000, 0, 0);
    expect(i.v1f).toBeCloseTo(2, 9);
    expect(i.v2f).toBeCloseTo(2, 9);
    expect(i.perdida).toBeGreaterThan(0);
  });
});
