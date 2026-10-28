import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CAMBIOS, FASES_MIN, TOTAL_MIN, SUSTANCIAS, curvaCalentamiento, densidad, fraccionSumergida, posicionesParticulas, presionRelativa, velocidadRelativa } from "@/components/lesson/slide/tools/Fq2MateriaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-densidad-flotacion-explorador", "fq2-estados-propiedades-explorador", "fq2-modelo-cinetico-explorador", "fq2-cambios-estado-explorador", "fq2-curva-calentamiento-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de la materia: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 9 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 3 })).not.toThrow();
    expect(() => mount(tool, { n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("densidad y flotación", () => {
    expect(densidad(270, 100)).toBeCloseTo(2.7);
    expect(densidad(1, 0)).toBeNaN();
    expect(fraccionSumergida(0.5, 1)).toBeCloseTo(0.5);
    expect(fraccionSumergida(2.7, 1)).toBe(1);
    expect(fraccionSumergida(7.9, 13.6)).toBeCloseTo(7.9 / 13.6);
  });
  it("modelo cinético", () => {
    expect(velocidadRelativa(300)).toBe(1);
    expect(velocidadRelativa(1200)).toBeCloseTo(2);
    expect(presionRelativa(600, 100)).toBeCloseTo(2);
    expect(presionRelativa(300, 50)).toBeCloseTo(2);
    expect(presionRelativa(300, 0)).toBeNaN();
    const p = posicionesParticulas(24);
    expect(p).toHaveLength(24);
    for (const q of p) for (const c of q) { expect(c).toBeGreaterThanOrEqual(0); expect(c).toBeLessThan(1); }
  });
  it("cambios de estado: absorben los que separan partículas", () => {
    expect(CAMBIOS).toHaveLength(6);
    for (const c of CAMBIOS) {
      const inv = CAMBIOS.find((x) => x.de === c.a && x.a === c.de);
      expect(inv, c.id).toBeDefined();
      expect(inv!.energia).not.toBe(c.energia);
    }
  });
  it("curva de calentamiento: continua y con tramos constantes", () => {
    expect(TOTAL_MIN).toBe(FASES_MIN.reduce((s, v) => s + v, 0));
    for (const s of Object.values(SUSTANCIAS)) {
      let prev = curvaCalentamiento(s.fusion, s.ebullicion, 0).T;
      for (let i = 1; i <= TOTAL_MIN * 20; i++) {
        const cur = curvaCalentamiento(s.fusion, s.ebullicion, i / 20).T;
        expect(cur).toBeGreaterThanOrEqual(prev - 1e-9);
        expect(cur - prev).toBeLessThan(40);
        prev = cur;
      }
      expect(curvaCalentamiento(s.fusion, s.ebullicion, 3).T).toBe(s.fusion);
      expect(curvaCalentamiento(s.fusion, s.ebullicion, 3).estado).toContain("fusión");
      expect(curvaCalentamiento(s.fusion, s.ebullicion, 10).T).toBe(s.ebullicion);
      expect(curvaCalentamiento(s.fusion, s.ebullicion, 0).estado).toBe("sólido");
      expect(curvaCalentamiento(s.fusion, s.ebullicion, TOTAL_MIN).estado).toBe("gas");
    }
    expect(curvaCalentamiento(0, 100, -5).T).toBe(-20);
  });
});
