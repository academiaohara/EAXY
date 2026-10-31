import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ELECTRONEG, IONIZACION, NOMBRES, RADIO, SIMBOLOS, cargaIon, configuracion, desapareados, electronesValencia, nombre, posicion, simbolo, textoConfiguracion, valorPropiedad } from "@/components/lesson/slide/tools/Fq4AtomoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-configuracion-explorador", "fq4-tabla-bloques-explorador", "fq4-propiedades-periodicas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del átomo (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("configuraciones", () => {
    expect(textoConfiguracion(17)).toBe("1s² 2s² 2p⁶ 3s² 3p⁵");
    expect(textoConfiguracion(20)).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 4s²");
    expect(textoConfiguracion(26)).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²");
    expect(textoConfiguracion(24)).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹");
    expect(textoConfiguracion(29)).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹");
    expect(textoConfiguracion(36)).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶");
    expect(configuracion(0)).toEqual([]);
    expect(configuracion(37)).toEqual([]);
    for (let z = 1; z <= 36; z++) expect(configuracion(z).reduce((s, c) => s + c.e, 0), `Z=${z}`).toBe(z);
  });
  it("valencia y desapareados", () => {
    expect(electronesValencia(17)).toBe(7);
    expect(electronesValencia(16)).toBe(6);
    expect(electronesValencia(2)).toBe(2);
    expect(electronesValencia(26)).toBe(8);
    expect(electronesValencia(29)).toBe(1);
    expect(electronesValencia(36)).toBe(8);
    expect(electronesValencia(0)).toBeNaN();
    expect(desapareados(7)).toBe(3);
    expect(desapareados(8)).toBe(2);
    expect(desapareados(10)).toBe(0);
    expect(desapareados(24)).toBe(6);
    expect(desapareados(26)).toBe(4);
  });
  it("posición y iones", () => {
    expect(posicion(1)).toEqual({ periodo: 1, grupo: 1, bloque: "s" });
    expect(posicion(2)).toEqual({ periodo: 1, grupo: 18, bloque: "s" });
    expect(posicion(5)).toEqual({ periodo: 2, grupo: 13, bloque: "p" });
    expect(posicion(10)).toEqual({ periodo: 2, grupo: 18, bloque: "p" });
    expect(posicion(16)).toEqual({ periodo: 3, grupo: 16, bloque: "p" });
    expect(posicion(20)).toEqual({ periodo: 4, grupo: 2, bloque: "s" });
    expect(posicion(26)).toEqual({ periodo: 4, grupo: 8, bloque: "d" });
    expect(posicion(31)).toEqual({ periodo: 4, grupo: 13, bloque: "p" });
    expect(posicion(36)).toEqual({ periodo: 4, grupo: 18, bloque: "p" });
    expect(posicion(37)).toBeNull();
    expect(cargaIon(11)).toBe(1);
    expect(cargaIon(17)).toBe(-1);
    expect(cargaIon(8)).toBe(-2);
    expect(cargaIon(26)).toBe(2);
    expect(cargaIon(10)).toBeNull();
    expect(simbolo(26)).toBe("Fe");
    expect(nombre(26)).toBe("Hierro");
    expect(simbolo(99)).toBe("?");
    expect(SIMBOLOS.length).toBe(36);
    expect(NOMBRES.length).toBe(36);
    for (let z = 1; z <= 36; z++) expect(posicion(z)).not.toBeNull();
  });
  it("propiedades periódicas", () => {
    expect(RADIO.length).toBe(36);
    expect(IONIZACION.length).toBe(36);
    expect(ELECTRONEG.length).toBe(36);
    // en el periodo 2 (Li → F) el radio disminuye y la energía de ionización y la electronegatividad aumentan
    for (let z = 4; z <= 9; z++) {
      expect(valorPropiedad("radio", z)!).toBeLessThan(valorPropiedad("radio", z - 1)!);
      expect(valorPropiedad("electroneg", z)!).toBeGreaterThan(valorPropiedad("electroneg", z - 1)!);
    }
    expect(valorPropiedad("ionizacion", 9)!).toBeGreaterThan(valorPropiedad("ionizacion", 3)!);
    // en el grupo 1 el radio aumenta y la ionización disminuye
    expect(valorPropiedad("radio", 3)!).toBeLessThan(valorPropiedad("radio", 11)!);
    expect(valorPropiedad("radio", 11)!).toBeLessThan(valorPropiedad("radio", 19)!);
    expect(valorPropiedad("ionizacion", 3)!).toBeGreaterThan(valorPropiedad("ionizacion", 11)!);
    expect(valorPropiedad("ionizacion", 11)!).toBeGreaterThan(valorPropiedad("ionizacion", 19)!);
    // gases nobles: máxima ionización del periodo y sin electronegatividad
    expect(valorPropiedad("ionizacion", 10)!).toBeGreaterThan(valorPropiedad("ionizacion", 9)!);
    expect(valorPropiedad("electroneg", 10)).toBeNull();
    expect(valorPropiedad("radio", 0)).toBeNull();
    expect(valorPropiedad("radio", 99)).toBeNull();
  });
});
