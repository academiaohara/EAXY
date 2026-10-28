import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { circulosPorDosPuntosTangentes, ejeRadical, longitudTangente, potencia, secante, tangenteRectaYCirculo } from "@/components/lesson/slide/tools/DtIIPotenciaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-potencia-punto-explorador", "dt2-eje-radical-explorador", "dt2-circulo-dos-puntos-tangente-explorador", "dt2-tangente-recta-circulo-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de potencia y tangencias: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("potencia y tangente", () => {
    expect(potencia(5, 3)).toBe(16);
    expect(longitudTangente(5, 3)).toBe(4);
    expect(longitudTangente(2, 3)).toBeNaN();
  });
  it("PA·PB es la potencia para cualquier secante", () => {
    for (const th of [0, 10, 30, 60]) {
      const s = secante(6, 3, th);
      if (s) expect(s.producto).toBeCloseTo(potencia(6, 3));
    }
    expect(secante(6, 3, 80)).toBeNull();
    expect(secante(6, 3, 0)!.t1).toBeCloseTo(3);
  });
  it("eje radical", () => {
    expect(ejeRadical(5, 3, 8)!.x).toBe(5);
    expect(ejeRadical(4, 4, 6)!.x).toBe(3);
    expect(ejeRadical(3, 2, 4)!.relacion).toBe("secantes");
    expect(ejeRadical(3, 2, 8)!.relacion).toBe("exteriores");
    expect(ejeRadical(3, 2, 5)!.relacion).toBe("tangentes exteriores");
    expect(ejeRadical(3, 3, 0)).toBeNull();
    const e = ejeRadical(3, 2, 4)!;
    // puntos de corte: a la misma distancia de ambos centros
    expect(Math.hypot(e.x, e.h!)).toBeCloseTo(3);
    expect(Math.hypot(e.x - 4, e.h!)).toBeCloseTo(2);
  });
  it("circunferencia por A y B tangente a la recta", () => {
    const A: [number, number] = [-3, 2];
    const B: [number, number] = [4, 5];
    const sols = circulosPorDosPuntosTangentes(A, B);
    expect(sols).toHaveLength(2);
    for (const c of sols) {
      expect(Math.hypot(A[0] - c.T, A[1] - c.r)).toBeCloseTo(c.r);
      expect(Math.hypot(B[0] - c.T, B[1] - c.r)).toBeCloseTo(c.r);
    }
    expect(circulosPorDosPuntosTangentes([-3, 4], [5, 4])).toHaveLength(1);
    expect(circulosPorDosPuntosTangentes([-3, -1], [5, 4])).toHaveLength(0);
  });
  it("tangente a una recta en T y a una circunferencia", () => {
    const r = tangenteRectaYCirculo(2, 0, 5, 1.5)!;
    expect(r.potencia).toBeCloseTo(26.75);
    expect(r.exterior).toBeCloseTo(26.75 / 13);
    // tangencia exterior: distancia entre centros = suma de radios
    expect(Math.hypot(2, r.exterior - 5)).toBeCloseTo(r.exterior + 1.5);
    // tangencia interior: distancia = diferencia de radios
    expect(Math.hypot(2, r.interior - 5)).toBeCloseTo(Math.abs(r.interior - 1.5));
    expect(tangenteRectaYCirculo(0, 0, 1, 2)).toBeNull();
  });
});
