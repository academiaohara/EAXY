import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aplicaFuncion, aritmeticos, bisiesto, bisiestoMalo, estrategiaMitades, logico, opera, pistaNumero, trazar } from "@/components/lesson/slide/tools/TecEso2ProgramacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-traza-explorador", "eso2-tipos-datos-explorador", "eso2-operadores-explorador", "eso2-funcion-explorador", "eso2-pruebas-explorador", "eso2-adivina-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 6: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 6", () => {
  it("trazas de los programas", () => {
    const fin = (n: number, p?: number) => trazar(n, p).traza.at(-1)!;
    expect(fin(0).salida).toEqual(["15"]);
    expect(fin(1, 4).salida).toEqual(["Suspenso"]);
    expect(fin(1, 5).salida).toEqual(["Aprobado"]);
    expect(fin(2).salida).toEqual(["3", "2", "1", "¡Despegue!"]);
    expect(fin(3).salida).toEqual(["24"]);
    for (const p of [0, 1, 2, 3]) {
      for (const e of trazar(p).traza) expect(e.linea).toBeLessThan(trazar(p).codigo.length);
    }
  });
  it("tipos, operadores y funciones", () => {
    expect(opera(0, 1, "+").resultado).toBe("10");
    expect(opera(3, 3, "+").resultado).toBe("«77»");
    expect(opera(0, 3, "+").resultado).toBe("error de tipos");
    expect(opera(0, 3, "=").resultado).toBe("falso");
    expect(aritmeticos(29, 6)).toMatchObject({ resto: 5, cociente: 4 });
    expect(aritmeticos(5, 0).division).toBeNaN();
    expect(logico(true, false)).toEqual({ y: false, o: true, noP: false });
    expect(aplicaFuncion(0, 8, 5)).toBe(40);
    expect(aplicaFuncion(1, 100, 0)).toBe(212);
    expect(aplicaFuncion(2, 100, 20)).toBe(80);
  });
  it("bisiestos y adivina el número", () => {
    expect(bisiestoMalo(1900)).toBe(true);
    expect(bisiesto(1900)).toBe(false);
    expect([2000, 2024].every(bisiesto)).toBe(true);
    expect(pistaNumero(37, 20)).toBe("Mayor");
    expect(pistaNumero(37, 50)).toBe("Menor");
    for (let n = 1; n <= 100; n += 1) expect(estrategiaMitades(n).length).toBeLessThanOrEqual(7);
    expect(estrategiaMitades(37).at(-1)).toBe(37);
  });
});
