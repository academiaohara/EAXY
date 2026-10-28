import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { COEF_ISO, caballera, ejesOrtogonales, elipseOrtogonal, planoPorTrazas, tipoAxonometria } from "@/components/lesson/slide/tools/DtAxonometricoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-axonometria-ortogonal-explorador", "dt1-isometrica-pieza-explorador", "dt1-caballera-explorador", "dt1-axo-punto-plano-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, axonometría: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: 0.3, b: 0.3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de axonometría", () => {
  it("coeficientes de reducción y ángulos entre ejes", () => {
    const iso = ejesOrtogonales(COEF_ISO, COEF_ISO);
    expect(iso.valido).toBe(true);
    if (iso.valido) {
      expect(iso.kz).toBeCloseTo(COEF_ISO, 6);
      expect(iso.xy).toBeCloseTo(120, 6);
      expect(iso.yz).toBeCloseTo(120, 6);
      expect(iso.xz).toBeCloseTo(120, 6);
    }
    const dim = ejesOrtogonales(0.9, 0.9);
    expect(dim.valido).toBe(true);
    if (dim.valido) {
      expect(dim.kz).toBeCloseTo(0.6164, 3);
      expect(dim.xy).toBeCloseTo(103.57, 1);
      expect(dim.xz).toBeCloseTo(dim.yz, 6);
      expect(dim.xy + dim.yz + dim.xz).toBeCloseTo(360, 6);
    }
    const tri = ejesOrtogonales(0.9, 0.7);
    if (tri.valido) expect(tri.xy + tri.yz + tri.xz).toBeCloseTo(360, 6);
    // kx² + ky² + kz² = 2
    expect(0.9 ** 2 + 0.7 ** 2 + (ejesOrtogonales(0.9, 0.7).kz as number) ** 2).toBeCloseTo(2, 9);
    // combinaciones imposibles
    expect(ejesOrtogonales(0.5, 0.5).valido).toBe(false);
    expect(ejesOrtogonales(1, 1).valido).toBe(false);
    expect(ejesOrtogonales(0, 0.8).valido).toBe(false);
  });
  it("tipo de axonometría y elipses", () => {
    expect(tipoAxonometria(0.8165, 0.8165, 0.8165)).toBe("isométrica");
    expect(tipoAxonometria(0.9, 0.9, 0.6164)).toBe("dimétrica");
    expect(tipoAxonometria(0.9, 0.7, 0.8367)).toBe("trimétrica");
    expect(elipseOrtogonal(1 / Math.sqrt(3)).menor).toBeCloseTo(0.5774, 3);
    expect(40 / COEF_ISO).toBeCloseTo(48.99, 1);
    expect((40 / COEF_ISO) * (1 / Math.sqrt(3))).toBeCloseTo(28.28, 1);
  });
  it("caballera y plano por trazas", () => {
    expect(caballera(0, 0, 0, 45, 0.5)).toEqual([0, 0]);
    const q = caballera(1, 8, 2, 45, 0.5);
    expect(q[0]).toBeCloseTo(1 + 4 * Math.SQRT1_2, 6);
    expect(q[1]).toBeCloseTo(2 + 4 * Math.SQRT1_2, 6);
    expect(caballera(3, 4, 5, 30, 1)[0]).toBeCloseTo(3 + 4 * Math.cos(Math.PI / 6), 6);
    const p = planoPorTrazas(3, 3, 3);
    expect(p.area).toBeCloseTo(7.7942, 3);
    expect(p.distancia).toBeCloseTo(1.7321, 3);
    expect(Math.hypot(3, 4, 12)).toBe(13);
  });
});
