import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { caminoCritico, prioridades, viabilidad, vistasPrisma, type Tarea } from "@/components/lesson/slide/tools/TecEso4ProyectosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-casa-calidad-explorador", "eso4-vistas-explorador", "eso4-pert-explorador", "eso4-viabilidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 1: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 1", () => {
  it("casa de la calidad", () => {
    const r = prioridades([4, 5, 3, 2]);
    expect(r.abs[0]).toBe(4 * 9 + 5 * 3 + 3 * 3 + 0);
    expect(r.pct.reduce((a, b) => a + b, 0)).toBeCloseTo(100);
    expect(prioridades([0, 0, 0, 0]).pct).toEqual([0, 0, 0, 0]);
  });
  it("vistas y viabilidad", () => {
    const v = vistasPrisma(80, 50, 60, 2);
    expect(v.alzado).toEqual([40, 25]);
    expect(v.planta).toEqual([40, 30]);
    expect(v.perfil).toEqual([30, 25]);
    expect(vistasPrisma(80, 50, 60, 0).alzado).toEqual([0, 0]);
    const e = viabilidad(2000, 8, 20, 300);
    expect(e.equilibrio).toBe(167);
    expect(e.beneficio).toBe(1600);
    expect(viabilidad(2000, 25, 20, 300).equilibrio).toBe(Infinity);
  });
  it("camino crítico", () => {
    const t: Tarea[] = [
      { id: "A", nombre: "", dur: 3, pre: [] },
      { id: "B", nombre: "", dur: 2, pre: ["A"] },
      { id: "C", nombre: "", dur: 4, pre: ["B"] },
      { id: "D", nombre: "", dur: 3, pre: ["A"] },
      { id: "E", nombre: "", dur: 2, pre: ["C", "D"] },
      { id: "F", nombre: "", dur: 2, pre: ["E"] },
    ];
    const r = caminoCritico(t);
    expect(r.fin).toBe(13);
    expect(r.critica).toEqual(["A", "B", "C", "E", "F"]);
    expect(r.holgura.D).toBe(3);
    expect(caminoCritico([]).fin).toBe(0);
  });
});
