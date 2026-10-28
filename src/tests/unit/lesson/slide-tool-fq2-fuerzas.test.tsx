import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ASTROS, MUELLES, SUPERFICIES, alargamiento, componentes, estadoResultante, peso, resultante, rozamiento, superaLimite } from "@/components/lesson/slide/tools/Fq2FuerzasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-fuerza-vector-explorador", "fq2-peso-masa-explorador", "fq2-muelle-hooke-explorador", "fq2-rozamiento-explorador", "fq2-equilibrio-fuerzas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de las fuerzas: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("componentes de una fuerza", () => {
    const [x, y] = componentes(50, 0);
    expect(x).toBeCloseTo(50);
    expect(y).toBeCloseTo(0);
    const [a, b] = componentes(100, 30);
    expect(Math.hypot(a, b)).toBeCloseTo(100);
    expect(a).toBeCloseTo(86.6, 1);
    expect(componentes(10, 90)[0]).toBeCloseTo(0);
  });
  it("peso y masa", () => {
    expect(peso(60, ASTROS.tierra.g)).toBeCloseTo(588);
    expect(peso(60, ASTROS.luna.g)).toBeCloseTo(96);
    expect(peso(60, ASTROS.tierra.g) / peso(60, ASTROS.luna.g)).toBeGreaterThan(5.5);
    expect(peso(60, ASTROS.tierra.g) / 60).toBeCloseTo(9.8);
  });
  it("ley de Hooke", () => {
    expect(alargamiento(4, 50)).toBeCloseTo(0.08);
    expect(alargamiento(1, 0)).toBeNaN();
    expect(alargamiento(2 * 1.5, MUELLES.medio.k)).toBeCloseTo(2 * alargamiento(1.5, MUELLES.medio.k));
    expect(superaLimite(0.1)).toBe(false);
    expect(superaLimite(0.2)).toBe(true);
    expect(MUELLES.duro.k).toBeGreaterThan(MUELLES.blando.k);
  });
  it("rozamiento", () => {
    const r = rozamiento(10, 0.4, 30);
    expect(r.N).toBeCloseTo(98);
    expect(r.max).toBeCloseTo(39.2);
    expect(r.mueve).toBe(false);
    expect(r.froz).toBe(30);
    expect(r.neta).toBe(0);
    const m = rozamiento(10, 0.4, 60);
    expect(m.mueve).toBe(true);
    expect(m.neta).toBeCloseTo(20.8);
    expect(m.a).toBeCloseTo(2.08);
    expect(rozamiento(10, SUPERFICIES.hielo.mu, 5).mueve).toBe(true);
    expect(rozamiento(0, 0.4, 5).a).toBeNaN();
  });
  it("resultante y equilibrio", () => {
    expect(resultante(50, 20)).toBe(30);
    expect(resultante(40, 40)).toBe(0);
    expect(estadoResultante(0)).toContain("equilibrio");
    expect(estadoResultante(5)).toContain("derecha");
    expect(estadoResultante(-5)).toContain("izquierda");
  });
});
