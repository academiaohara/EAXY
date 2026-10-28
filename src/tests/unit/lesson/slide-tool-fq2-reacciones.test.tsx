import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { FENOMENOS, REACCIONES, avanceReaccion, contarLado, estaAjustada, hayFuego, masaLado } from "@/components/lesson/slide/tools/Fq2ReaccionesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-cambio-fisico-quimico-explorador", "fq2-avance-reaccion-explorador", "fq2-ajuste-ecuacion-explorador", "fq2-triangulo-fuego-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de reacciones: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("las ecuaciones de la lista están ajustadas con sus coeficientes", () => {
    for (const r of REACCIONES) {
      expect(estaAjustada(r, r.coef), r.id).toBe(true);
      const nr = r.reactivos.length;
      expect(masaLado(r.reactivos, r.coef.slice(0, nr)), r.id).toBeCloseTo(masaLado(r.productos, r.coef.slice(nr)));
    }
  });
  it("coeficientes erróneos no ajustan", () => {
    const agua = REACCIONES.find((r) => r.id === "agua")!;
    expect(estaAjustada(agua, [1, 1, 1])).toBe(false);
    expect(estaAjustada(agua, [2, 1, 0])).toBe(false);
    expect(contarLado(["H2", "O2"], [2, 1])).toEqual({ H: 4, O: 2 });
    expect(contarLado(["CH4", "O2"], [1, 2])).toEqual({ C: 1, H: 4, O: 4 });
  });
  it("avance de una reacción", () => {
    const agua = REACCIONES[0]!;
    const a0 = avanceReaccion(agua, 4, 0);
    expect(a0.reactivos.map((x) => x.n)).toEqual([8, 4]);
    expect(a0.productos[0]!.n).toBe(0);
    const a4 = avanceReaccion(agua, 4, 4);
    expect(a4.reactivos.map((x) => x.n)).toEqual([0, 0]);
    expect(a4.productos[0]!.n).toBe(8);
    const m = avanceReaccion(REACCIONES.find((r) => r.id === "metano")!, 4, 2);
    expect(m.productos.map((x) => x.n)).toEqual([2, 4]);
  });
  it("fuego y fenómenos", () => {
    expect(hayFuego(true, true, true)).toBe(true);
    expect(hayFuego(true, false, true)).toBe(false);
    expect(hayFuego(false, true, true)).toBe(false);
    expect(FENOMENOS.filter((f) => f.fisico).length).toBeGreaterThan(2);
    expect(FENOMENOS.filter((f) => !f.fisico).length).toBeGreaterThan(2);
  });
});
