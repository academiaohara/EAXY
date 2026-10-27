import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { burndown, embudo, estimacionPert, normalCdf, plazoRecuperacion, proyectoPert, sprintsNecesarios, tiempoEntrega, van } from "@/components/lesson/slide/tools/TecTi2ProyectosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["ti2-embudo-explorador", "ti2-sprint-explorador", "ti2-kanban-explorador", "ti2-estimacion-pert-explorador", "ti2-van-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería II, proyectos de I+D: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de proyectos de I+D", () => {
  it("embudo y metodologías ágiles", () => {
    const e = embudo(100, [0.3, 0.5, 0.6, 0.8], [1, 10, 50, 100]);
    expect(e.cuentas[1]).toBeCloseTo(30);
    expect(e.productos).toBeCloseTo(7.2);
    expect(e.gasto).toBeCloseTo(2050);
    expect(e.costePorProducto).toBeCloseTo(284.7, 1);
    expect(embudo(100, [0, 0.5], [1, 1]).costePorProducto).toBe(Infinity);
    expect(sprintsNecesarios(120, 20)).toBe(6);
    expect(sprintsNecesarios(125, 20)).toBe(7);
    expect(sprintsNecesarios(120, 0)).toBe(Infinity);
    const b = burndown(120, 20, 6);
    expect(b[0]).toBe(120);
    expect(b[6]).toBe(0);
    expect(burndown(100, 20, 3, 30)[3]).toBe(130);
    expect(tiempoEntrega(12, 4)).toBe(3);
    expect(tiempoEntrega(4, 4)).toBe(1);
    expect(tiempoEntrega(4, 0)).toBe(Infinity);
  });
  it("estimación PERT", () => {
    const t = estimacionPert(2, 4, 10);
    expect(t.esp).toBeCloseTo(4.667, 3);
    expect(t.sigma).toBeCloseTo(1.333, 3);
    expect(normalCdf(0)).toBeCloseTo(0.5, 3);
    expect(normalCdf(1.645)).toBeCloseTo(0.95, 2);
    const p = proyectoPert([{ o: 2, m: 4, p: 10 }, { o: 3, m: 5, p: 9 }, { o: 1, m: 2, p: 6 }], 12.3);
    expect(p.mu).toBeCloseTo(12.5, 1);
    expect(p.prob).toBeGreaterThan(0.4);
    expect(p.prob).toBeLessThan(0.6);
    expect(proyectoPert([{ o: 3, m: 3, p: 3 }], 3).prob).toBe(1);
    expect(proyectoPert([{ o: 3, m: 3, p: 3 }], 2).prob).toBe(0);
  });
  it("valor actual neto", () => {
    expect(van(100, 120, 1, 10)).toBeCloseTo(9.09, 2);
    expect(van(100, 30, 6, 0)).toBeCloseTo(80);
    expect(van(100, 30, 6, 8)).toBeCloseTo(38.69, 1);
    expect(van(100, 30, 6, 20)).toBeLessThan(van(100, 30, 6, 5));
    expect(plazoRecuperacion(100, 30)).toBeCloseTo(3.33, 2);
    expect(plazoRecuperacion(100, 0)).toBe(Infinity);
  });
});
