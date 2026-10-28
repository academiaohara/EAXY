import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PROGRAMAS } from "@/components/lesson/slide/tools/Tec1ProgramacionTools";
import { LISTA_ORDENADA, busquedaBinaria, busquedaLineal, opsBinaria, opsCuadratica, pasosBurbuja, resumenDatos } from "@/components/lesson/slide/tools/TecEso4ComputacionalTools";
import { runPython } from "@/lib/lesson/mini-python";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-descomposicion-explorador", "eso4-busqueda-explorador", "eso4-ordenacion-explorador", "eso4-datos-explorador", "eso4-complejidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 5: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("algoritmos del tema 5", () => {
  it("búsquedas", () => {
    expect(busquedaLineal(LISTA_ORDENADA, 47)).toEqual({ pos: 10, comps: 11 });
    expect(busquedaLineal(LISTA_ORDENADA, 4)).toEqual({ pos: -1, comps: 16 });
    const b = busquedaBinaria(LISTA_ORDENADA, 51);
    expect(b.pos).toBe(11);
    expect(b.comps).toBe(2);
    expect(busquedaBinaria(LISTA_ORDENADA, 4).pos).toBe(-1);
    for (const v of LISTA_ORDENADA) expect(busquedaBinaria(LISTA_ORDENADA, v).comps).toBeLessThanOrEqual(5);
  });
  it("burbuja y datos", () => {
    const p = pasosBurbuja([5, 2, 9, 1]);
    expect(p[p.length - 1]!.v).toEqual([1, 2, 5, 9]);
    expect(pasosBurbuja([1]).length).toBe(1);
    const r = resumenDatos([12, 14, 9, 17, 21, 25, 19], 15);
    expect(r.sobre).toBe(4);
    expect(r.media).toBeCloseTo(117 / 7);
    expect(resumenDatos([], 3)).toEqual({ media: 0, max: 0, min: 0, sobre: 0 });
    expect(opsBinaria(16)).toBe(5);
    expect(opsBinaria(0)).toBe(0);
    expect(opsCuadratica(100)).toBe(10000);
  });
});

describe("programas de Python añadidos para 4.º ESO", () => {
  const esperado: Record<number, string> = {
    8: "Hay 5 datos",
    9: "Posición: 3",
    10: "Posición: 5 en 2 pasos",
    11: "[1, 2, 5, 9]",
    12: "Media: 17.75",
    13: "4 días por encima de 15",
    14: "Máximo: 0",
  };
  it.each(Object.entries(esperado))("el programa %s se ejecuta y da la salida prevista", (i, texto) => {
    const r = runPython(PROGRAMAS[Number(i)]!.code);
    expect(r.error).toBeUndefined();
    expect(r.output.join("\n")).toContain(texto);
  });
  it("el programa con índice fuera de rango da un error de ejecución en la línea 4", () => {
    const r = runPython(PROGRAMAS[15]!.code);
    expect(r.error?.line).toBe(4);
  });
});
