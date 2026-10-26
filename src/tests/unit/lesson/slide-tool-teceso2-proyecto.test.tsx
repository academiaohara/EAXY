import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { IDEAS_SCAMPER, NOTAS_IDEAS, OBJETOS_SCAMPER, TECNICAS_SCAMPER, evaluaPruebas, evaluaRequisito, planifica, puntuaMemoria } from "@/components/lesson/slide/tools/TecEso2ProyectoTools";
import { puntuacion } from "@/components/lesson/slide/tools/TecEso2MaterialesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-requisitos-explorador", "eso2-scamper-explorador", "eso2-seleccion-ideas-explorador", "eso2-gantt-explorador", "eso2-pruebas-prototipo-explorador", "eso2-memoria-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 1: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 1", () => {
  it("requisitos", () => {
    expect(evaluaRequisito("").nivel).toBe("vacio");
    expect(evaluaRequisito("El soporte debe ser fuerte y bonito").nivel).toBe("vago");
    expect(evaluaRequisito("El soporte debe aguantar 500 g sin deformarse").nivel).toBe("medible");
    expect(evaluaRequisito("El soporte debe costar menos de 5").nivel).toBe("parcial");
    expect(evaluaRequisito("Debe costar menos de 5 €").nivel).toBe("medible");
  });
  it("SCAMPER completo", () => {
    expect(IDEAS_SCAMPER).toHaveLength(OBJETOS_SCAMPER.length);
    for (const fila of IDEAS_SCAMPER) expect(fila).toHaveLength(TECNICAS_SCAMPER.length);
  });
  it("selección de ideas y pruebas", () => {
    expect(puntuacion([4, 3, 3, 4, 2], NOTAS_IDEAS[1]!)).toBeCloseTo(58 / 16);
    expect(evaluaPruebas([500, 3, 20, 5])).toEqual([true, true, true, true]);
    expect(evaluaPruebas([450, 2, 15, 6])).toEqual([false, false, false, false]);
  });
  it("planificación con camino crítico", () => {
    const p = planifica([2, 3, 1, 4, 1, 2]);
    expect(p.total).toBe(11);
    expect(p.critica).toEqual([true, true, true, true, true, false]);
    const q = planifica([2, 3, 1, 4, 1, 9]);
    expect(q.total).toBe(14);
    expect(q.critica[5]).toBe(true);
    expect(q.critica[3]).toBe(false);
  });
  it("memoria", () => {
    expect(puntuaMemoria(Array(12).fill(true))).toEqual({ total: 12, faltanClave: [] });
    expect(puntuaMemoria(Array(12).fill(false)).faltanClave).toHaveLength(6);
  });
});
