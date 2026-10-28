import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { POLIEDROS, desarrolloCilindro, desarrolloCono, desarrolloPiramide, medidasSolido, poliedroRegular, poligonoRegular, seccionPrisma, seccionRevolucion } from "@/components/lesson/slide/tools/DtIICuerposTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-solido-diedrico-explorador", "dt2-seccion-prisma-explorador", "dt2-seccion-revolucion-explorador", "dt2-poliedros-regulares-explorador", "dt2-desarrollo-cuerpos-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de cuerpos en diédrico: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 9 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 1 })).not.toThrow();
    expect(() => mount(tool, { n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("medidas de prisma y pirámide", () => {
    const p = medidasSolido("prisma", 4, Math.SQRT2 * 1.5, 5);
    expect(p.lado).toBeCloseTo(3);
    expect(p.base).toBeCloseTo(9);
    expect(p.volumen).toBeCloseTo(45);
    expect(medidasSolido("piramide", 4, Math.SQRT2 * 1.5, 5).volumen).toBeCloseTo(15);
    expect(poligonoRegular(6, 2)).toHaveLength(6);
  });
  it("sección de un prisma: área real = base / cos α", () => {
    const s = seccionPrisma(4, 2, 60, 2, 4);
    expect(s.areaReal).toBeCloseTo(s.areaBase / 0.5);
    expect(s.z[0]).toBeDefined();
    expect(seccionPrisma(4, 2, 40, 2, 4).valida).toBe(true);
    expect(seccionPrisma(4, 2, 60, 1, 4).valida).toBe(false);
  });
  it("sección de un cilindro y un cono", () => {
    const c = seccionRevolucion("cilindro", 2, 4, 60, 2);
    expect(c.a).toBeCloseTo(4, 1);
    expect(c.b).toBeCloseTo(2, 1);
    expect(c.area).toBeCloseTo(Math.PI * 4 * 2, 0);
    const k = seccionRevolucion("cono", 2, 4, 30, 2);
    expect(k.valida).toBe(true);
    expect(k.a).toBeGreaterThan(k.b);
    expect(seccionRevolucion("cono", 2, 4, 89, 2).valida).toBe(false);
  });
  it("poliedros regulares cumplen Euler", () => {
    for (const p of POLIEDROS) expect(poliedroRegular(p, 2).euler).toBe(2);
    expect(poliedroRegular("cubo", 4).volumen).toBe(64);
    expect(poliedroRegular("cubo", 4).area).toBe(96);
    expect(poliedroRegular("tetraedro", 1).volumen).toBeCloseTo(0.11785, 4);
    expect(poliedroRegular("dodecaedro", 1).volumen).toBeCloseTo(7.663, 3);
    expect(poliedroRegular("icosaedro", 1).volumen).toBeCloseTo(2.1817, 3);
    expect(poliedroRegular("octaedro", 1).volumen).toBeCloseTo(0.4714, 3);
  });
  it("desarrollos", () => {
    const c = desarrolloCono(3, 4);
    expect(c.g).toBe(5);
    expect(c.angulo).toBeCloseTo(216);
    expect(c.lateral).toBeCloseTo(Math.PI * 15);
    expect(desarrolloCilindro(2, 5).lateral).toBeCloseTo(62.83, 1);
    const p = desarrolloPiramide(4, Math.SQRT2 * 1.5, 4);
    expect(p.lado).toBeCloseTo(3);
    expect(p.apotemaLateral).toBeCloseTo(Math.hypot(4, 1.5));
  });
});
