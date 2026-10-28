import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { correccionFp, frecuenciaResonancia, impedanciaSerie, potencias, reactanciaC, reactanciaL, senoidal, trifasica, valorEficaz } from "@/components/lesson/slide/tools/TecTi2AlternaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["ti2-senoidal-explorador", "ti2-rlc-explorador", "ti2-potencias-explorador", "ti2-correccion-fp-explorador", "ti2-trifasica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería II, corriente alterna: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { n: 1, a: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de corriente alterna", () => {
  it("señal, reactancias e impedancia", () => {
    expect(valorEficaz(325)).toBeCloseTo(229.8, 1);
    expect(senoidal(10, 50, 0.005, 0)).toBeCloseTo(10);
    expect(senoidal(10, 50, 0, 90)).toBeCloseTo(10);
    expect(reactanciaL(50, 200)).toBeCloseTo(62.83, 1);
    expect(reactanciaC(50, 50)).toBeCloseTo(63.66, 1);
    expect(reactanciaC(0, 50)).toBe(Infinity);
    const z = impedanciaSerie(30, 70, 30);
    expect(z.Z).toBeCloseTo(50);
    expect(z.fase).toBeCloseTo(53.13, 1);
    expect(impedanciaSerie(10, 20, 60).fase).toBeLessThan(0);
    expect(impedanciaSerie(20, 31.4, 31.8).Z).toBeCloseTo(20, 0);
    expect(frecuenciaResonancia(100, 100)).toBeCloseTo(50.33, 1);
    expect(frecuenciaResonancia(0, 100)).toBe(0);
  });
  it("potencias y corrección", () => {
    const p = potencias(230, 10, 0);
    expect(p.P).toBeCloseTo(2300);
    expect(p.Q).toBeCloseTo(0);
    const q = potencias(230, 10, 36.87);
    expect(q.P).toBeCloseTo(1840, -1);
    expect(q.Q).toBeCloseTo(1380, -1);
    expect(q.S ** 2).toBeCloseTo(q.P ** 2 + q.Q ** 2, 0);
    const c = correccionFp(8000, 0.8, 1, 230, 50);
    expect(c.Qc).toBeCloseTo(6000, -1);
    expect(c.C_uF).toBeCloseTo(361, 0);
    expect(c.I1).toBeCloseTo(43.48, 1);
    expect(c.I2).toBeCloseTo(34.78, 1);
    expect(correccionFp(8000, 0.8, 0.8, 230, 50).Qc).toBeCloseTo(0);
    expect(correccionFp(8000, 0.8, 1, 0, 50).C_uF).toBe(0);
  });
  it("sistemas trifásicos", () => {
    const e = trifasica(400, 10, 1, "estrella");
    expect(e.P).toBeCloseTo(6928.2, 1);
    expect(e.Vf).toBeCloseTo(230.94, 1);
    expect(e.If).toBe(10);
    const t = trifasica(400, 20, 0.85, "triangulo");
    expect(t.Vf).toBe(400);
    expect(t.If).toBeCloseTo(11.547, 2);
    expect(t.S ** 2).toBeCloseTo(t.P ** 2 + t.Q ** 2, 0);
  });
});
