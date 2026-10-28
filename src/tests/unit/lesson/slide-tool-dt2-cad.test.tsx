import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { DENSIDADES, areaPerfilL, estadoCroquis, piezaExtruida } from "@/components/lesson/slide/tools/DtIICadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-croquis-restricciones-explorador", "dt2-modelo-a-vistas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de CAD: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("grados de libertad del croquis", () => {
    expect(estadoCroquis({ horizontales: 0, verticales: 0, cotas: 0, fijos: 0 }).libres).toBe(8);
    expect(estadoCroquis({ horizontales: 2, verticales: 2, cotas: 2, fijos: 1 }).estado).toBe("totalmente definido");
    expect(estadoCroquis({ horizontales: 2, verticales: 2, cotas: 2, fijos: 2 }).estado).toBe("sobredefinido");
    expect(estadoCroquis({ horizontales: 1, verticales: 1, cotas: 1, fijos: 0 }).estado).toBe("infradefinido");
    expect(estadoCroquis({ horizontales: 0, verticales: 0, cotas: 0, fijos: 0 }, true).total).toBe(11);
  });
  it("pieza extruida", () => {
    expect(areaPerfilL(60, 50, 10)).toBe(1000);
    const p = piezaExtruida(60, 50, 10, 40, DENSIDADES.acero);
    expect(p.volumen).toBeCloseTo(40);
    expect(p.masa).toBeCloseTo(314);
    expect(piezaExtruida(60, 50, 10, 40, DENSIDADES.aluminio).masa).toBeLessThan(p.masa);
    expect(areaPerfilL(10, 10, 50)).toBeGreaterThan(0);
  });
});
