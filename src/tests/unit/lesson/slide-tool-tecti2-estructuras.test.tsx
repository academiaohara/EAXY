import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloTorsion, aplastamientoUnion, cargaCritica, coefVuelco, cortaduraUnion, flecha, inerciaCirculo, inerciaPolarCirculo, inerciaRectangulo, momentoMaximo, reacciones, resultanteReparto, tensionFlexion, tensionTorsion } from "@/components/lesson/slide/tools/TecTi2EstructurasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["ti2-carga-repartida-explorador", "ti2-reacciones-explorador", "ti2-flexion-explorador", "ti2-torsion-explorador", "ti2-cortadura-explorador", "ti2-pandeo-vuelco-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería II, estructuras: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { n: 1, a: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de estructuras", () => {
  it("cargas y reacciones", () => {
    expect(resultanteReparto("uniforme", 12, 5)).toEqual({ Q: 60, x: 2.5 });
    const t = resultanteReparto("triangular", 12, 5);
    expect(t.Q).toBe(30);
    expect(t.x).toBeCloseTo(3.333, 3);
    const r = reacciones(6, 30, 2, 0);
    expect(r.RB).toBeCloseTo(10);
    expect(r.RA).toBeCloseTo(20);
    const u = reacciones(4, 0, 0, 10);
    expect(u.RA).toBeCloseTo(20);
    expect(u.RB).toBeCloseTo(20);
    expect(reacciones(0, 10, 1, 1)).toEqual({ RA: 0, RB: 0 });
    const m = reacciones(5, 40, 1, 8);
    expect(m.RA + m.RB).toBeCloseTo(80);
  });
  it("flexión y torsión", () => {
    expect(momentoMaximo("puntual", 20, 4)).toBe(20);
    expect(momentoMaximo("uniforme", 10, 6)).toBeCloseTo(45);
    expect(inerciaRectangulo(100, 200)).toBeCloseTo(66.67e6, -4);
    expect(inerciaCirculo(60)).toBeCloseTo(636172.5, 0);
    expect(tensionFlexion(45, inerciaRectangulo(100, 200), 100)).toBeCloseTo(67.5, 1);
    expect(tensionFlexion(1, 0, 10)).toBe(Infinity);
    const base = flecha("uniforme", 10, 6, 210, inerciaRectangulo(100, 200));
    expect(flecha("uniforme", 10, 12, 210, inerciaRectangulo(100, 200)) / base).toBeCloseTo(16);
    expect(flecha("puntual", 10, 4, 0, 1)).toBe(Infinity);
    expect(tensionTorsion(95.5, 30)).toBeCloseTo(18.0, 1);
    expect(tensionTorsion(100, 20) / tensionTorsion(100, 40)).toBeCloseTo(8);
    expect(inerciaPolarCirculo(30)).toBeCloseTo(79521.6, 0);
    expect(anguloTorsion(200, 1000, 80, 20) / anguloTorsion(200, 500, 80, 20)).toBeCloseTo(2);
    expect(anguloTorsion(200, 500, 80, 0)).toBe(Infinity);
  });
  it("uniones, pandeo y vuelco", () => {
    expect(cortaduraUnion(20000, 2, 10)).toBeCloseTo(127.3, 1);
    expect(aplastamientoUnion(20000, 2, 10, 6)).toBeCloseTo(166.7, 1);
    expect(cortaduraUnion(1, 0, 10)).toBe(Infinity);
    expect(cargaCritica(210, inerciaCirculo(60), 3, 1)).toBeCloseTo(146.5, 1);
    expect(cargaCritica(210, inerciaCirculo(60), 6, 1)).toBeCloseTo(cargaCritica(210, inerciaCirculo(60), 3, 1) / 4);
    expect(cargaCritica(210, inerciaCirculo(60), 3, 2)).toBeCloseTo(cargaCritica(210, inerciaCirculo(60), 3, 1) / 4);
    expect(coefVuelco(50, 0.75, 8, 6)).toBeCloseTo(0.78, 2);
    expect(coefVuelco(50, 0.75, 0, 6)).toBe(Infinity);
  });
});
