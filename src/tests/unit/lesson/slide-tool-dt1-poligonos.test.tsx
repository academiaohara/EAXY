import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { angulosTriangulo, anguloPunta, areaParalelogramo, baricentro, circuncentro, clasificaTriangulo, diagonalesParalelogramo, esEstrellado, existeTriangulo, incentro, mcd, metodoGeneral, ortocentro, poligonoRegular, radioDadoLado, tipoParalelogramo } from "@/components/lesson/slide/tools/DtPoligonosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-puntos-notables-explorador", "dt1-triangulo-datos-explorador", "dt1-cuadrilatero-explorador", "dt1-poligono-regular-explorador", "dt1-metodo-general-explorador", "dt1-estrellado-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, polígonos: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de triángulos y polígonos", () => {
  it("puntos notables", () => {
    expect(baricentro([0, 0], [6, 0], [0, 9])).toEqual([2, 3]);
    const o = circuncentro([0, 0], [6, 0], [0, 9]);
    expect(o[0]).toBeCloseTo(3);
    expect(o[1]).toBeCloseTo(4.5);
    expect(ortocentro([0, 0], [6, 0], [0, 9])[0]).toBeCloseTo(0);
    expect(circuncentro([0, 0], [1, 1], [2, 2])[0]).toBeNaN();
    const i = incentro([0, 0], [6, 0], [0, 8]);
    expect(i.r).toBeCloseTo(2);
    expect(i.centro[0]).toBeCloseTo(2);
    // recta de Euler: H = 3G − 2O
    const A: [number, number] = [0, 0];
    const B: [number, number] = [6, 0];
    const C: [number, number] = [4, 4.5];
    const g = baricentro(A, B, C);
    const oo = circuncentro(A, B, C);
    const h = ortocentro(A, B, C);
    expect(h[0]).toBeCloseTo(3 * g[0] - 2 * oo[0]);
    expect(h[1]).toBeCloseTo(3 * g[1] - 2 * oo[1]);
  });
  it("triángulos", () => {
    expect(existeTriangulo(3, 4, 5)).toBe(true);
    expect(existeTriangulo(1, 2, 3)).toBe(false);
    expect(existeTriangulo(0, 2, 2)).toBe(false);
    const [x, y, z] = angulosTriangulo(3, 4, 6);
    expect(z).toBeCloseTo(117.28, 1);
    expect(x + y + z).toBeCloseTo(180);
    expect(angulosTriangulo(1, 2, 3)[0]).toBeNaN();
    expect(clasificaTriangulo(3, 4, 5)).toEqual({ lados: "escaleno", angulos: "rectángulo" });
    expect(clasificaTriangulo(5, 5, 5)).toEqual({ lados: "equilátero", angulos: "acutángulo" });
    expect(clasificaTriangulo(5, 5, 8).angulos).toBe("obtusángulo");
    expect(clasificaTriangulo(1, 2, 9).lados).toBe("no existe");
  });
  it("paralelogramos", () => {
    expect(tipoParalelogramo(4, 4, 90)).toBe("cuadrado");
    expect(tipoParalelogramo(4, 4, 60)).toBe("rombo");
    expect(tipoParalelogramo(4, 3, 90)).toBe("rectángulo");
    expect(tipoParalelogramo(4, 3, 70)).toBe("romboide");
    const [d1, d2] = diagonalesParalelogramo(3, 4, 90);
    expect(d1).toBeCloseTo(5);
    expect(d2).toBeCloseTo(5);
    expect(areaParalelogramo(3, 4, 90)).toBeCloseTo(12);
    expect(areaParalelogramo(3, 4, 30)).toBeCloseTo(6);
  });
  it("polígonos regulares", () => {
    const h = poligonoRegular(6, 5);
    expect(h.lado).toBeCloseTo(5);
    expect(h.interior).toBeCloseTo(120);
    expect(poligonoRegular(8, 1).interior).toBeCloseTo(135);
    expect(poligonoRegular(10, 1).diagonales).toBe(35);
    expect(poligonoRegular(6, 4).area).toBeCloseTo(41.569, 2);
    expect(poligonoRegular(5, 10).lado).toBeCloseTo(11.756, 2);
    expect(poligonoRegular(10, 10).lado).toBeCloseTo(6.18, 2);
    expect(radioDadoLado(6, 4)).toBeCloseTo(4);
    expect(radioDadoLado(8, 5)).toBeCloseTo(6.5328, 3);
  });
  it("método general", () => {
    for (const n of [3, 4, 6]) {
      expect(metodoGeneral(n).error).toBeCloseTo(0, 6);
    }
    expect(metodoGeneral(7).aproximado).toBeCloseTo(0.8692, 3);
    expect(metodoGeneral(7).error * 100).toBeCloseTo(0.16, 1);
    expect(Math.abs(metodoGeneral(5).error)).toBeLessThan(0.002);
    expect(metodoGeneral(12).error).toBeGreaterThan(metodoGeneral(8).error);
  });
  it("estrellados", () => {
    expect(mcd(6, 4)).toBe(2);
    expect(esEstrellado(5, 2)).toBe(true);
    expect(esEstrellado(6, 2)).toBe(false);
    expect(esEstrellado(8, 3)).toBe(true);
    expect(esEstrellado(5, 1)).toBe(false);
    expect(anguloPunta(5, 2)).toBeCloseTo(36);
    expect(anguloPunta(7, 3)).toBeCloseTo(25.714, 2);
  });
});
