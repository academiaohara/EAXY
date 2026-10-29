import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { AFINIDAD, ELECTRONEG, IONES, IONIZACION, RADIO, cargaTipica, caracter, elementoEn, oxidoTipico, posicionTabla, valor } from "@/components/lesson/slide/tools/Fb1PeriodicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-tabla-bloques-explorador", "fb1-tendencias-explorador", "fb1-radios-ionicos-explorador", "fb1-reactividad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del sistema periódico (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("datos completos y posiciones únicas", () => {
    expect(RADIO).toHaveLength(54);
    expect(IONIZACION).toHaveLength(54);
    expect(ELECTRONEG).toHaveLength(54);
    expect(AFINIDAD).toHaveLength(54);
    const vistos = new Set<string>();
    for (let z = 1; z <= 54; z += 1) {
      const p = posicionTabla(z)!;
      const k = `${p.periodo},${p.grupo}`;
      expect(vistos.has(k), `Z=${z} repetido en ${k}`).toBe(false);
      vistos.add(k);
    }
    expect(vistos.size).toBe(54);
  });
  it("posiciones conocidas", () => {
    const pos = (z: number) => { const p = posicionTabla(z)!; return `${p.periodo}/${p.grupo}${p.bloque}`; };
    expect(pos(1)).toBe("1/1s");
    expect(pos(2)).toBe("1/18s");
    expect(pos(11)).toBe("3/1s");
    expect(pos(17)).toBe("3/17p");
    expect(pos(26)).toBe("4/8d");
    expect(pos(29)).toBe("4/11d");
    expect(pos(46)).toBe("5/10d");
    expect(pos(54)).toBe("5/18p");
    expect(posicionTabla(0)).toBeNull();
    expect(posicionTabla(55)).toBeNull();
    expect(elementoEn(3, 17)).toBe(17);
    expect(elementoEn(9, 1)).toBeNull();
  });
  it("tendencias periódicas", () => {
    expect(valor("radio", 11)!).toBeGreaterThan(valor("radio", 17)!);
    expect(valor("radio", 19)!).toBeGreaterThan(valor("radio", 11)!);
    expect(valor("ionizacion", 10)!).toBeGreaterThan(valor("ionizacion", 11)!);
    expect(valor("electroneg", 9)!).toBe(3.98);
    expect(valor("electroneg", 18)).toBeNull();
    expect(valor("afinidad", 17)!).toBeGreaterThan(valor("afinidad", 53)!);
    expect(valor("radio", 99)).toBeNull();
  });
  it("carácter, iones y óxidos", () => {
    expect(caracter(11)).toBe("metal");
    expect(caracter(17)).toBe("no metal");
    expect(caracter(14)).toBe("semimetal");
    expect(caracter(18)).toBe("gas noble");
    expect(caracter(26)).toBe("metal");
    expect(cargaTipica(11)).toBe(1);
    expect(cargaTipica(12)).toBe(2);
    expect(cargaTipica(8)).toBe(-2);
    expect(cargaTipica(9)).toBe(-1);
    expect(cargaTipica(26)).toBeNull();
    expect(oxidoTipico(11)).toEqual({ formula: "Na₂O", naturaleza: "básico" });
    expect(oxidoTipico(20)!.formula).toBe("CaO");
    expect(oxidoTipico(13)!.formula).toBe("Al₂O₃");
    expect(oxidoTipico(13)!.naturaleza).toBe("anfótero");
    expect(oxidoTipico(16)!.formula).toBe("SO₃");
    expect(oxidoTipico(18)).toBeNull();
  });
  it("radios iónicos", () => {
    const ne = IONES.filter((i) => i.serie === "Ne");
    for (let k = 1; k < ne.length; k += 1) {
      if (ne[k]!.Z > ne[k - 1]!.Z) expect(ne[k]!.r).toBeLessThan(ne[k - 1]!.r);
    }
    for (const ion of IONES) {
      const ra = RADIO[ion.Z - 1]!;
      expect(ion.q > 0 ? ion.r < ra + 60 : ion.r > ra - 10, ion.sim).toBe(true);
    }
  });
});
