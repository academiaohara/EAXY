import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloPunta, areaParalelogramo, diagonalesParalelogramo, esEstrellado, mcd, poligonoRegular, radioDadoLado, tipoParalelogramo } from "@/components/lesson/slide/tools/DtPoligonosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-cuadrilatero-explorador", "dt1-poligono-regular-explorador", "dt1-estrellado-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, polígonos: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de triángulos y polígonos", () => {
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
