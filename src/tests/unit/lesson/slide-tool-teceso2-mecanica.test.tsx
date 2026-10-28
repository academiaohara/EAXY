import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { coefSeguridad, desplazamiento, elevador, inercia, longitudCorrea, maquinaSimple, relacionTren, rpmConducidaPoleas, salidaReductor, tension } from "@/components/lesson/slide/tools/TecEso2MecanicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-tension-explorador", "eso2-perfil-canto-explorador", "eso2-ventaja-mecanica-explorador", "eso2-tren-transmision-explorador", "eso2-poleas-correas-explorador", "eso2-transformacion-explorador", "eso2-elevador-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 4: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 4", () => {
  it("tensión e inercia", () => {
    expect(tension(3000, 100)).toBe(30);
    expect(tension(6000, 300)).toBe(20);
    expect(coefSeguridad(235, 47)).toBe(5);
    expect(inercia(10, 30, true) / inercia(10, 30, false)).toBeCloseTo(9);
  });
  it("máquinas simples", () => {
    expect(maquinaSimple(0, 300, 60).fuerza).toBeCloseTo(100);
    expect(maquinaSimple(1, 800, 4).fuerza).toBe(200);
    expect(maquinaSimple(2, 500, 5).fuerza).toBe(100);
    expect(maquinaSimple(2, 500, 5).recorrido).toBe(5);
  });
  it("engranajes y poleas", () => {
    expect(relacionTren(10, 40, 10, 10)).toBe(4);
    const o = salidaReductor(1200, 2, 4, 1);
    expect(o.rpm).toBe(300);
    expect(o.par).toBe(8);
    expect(o.pOut).toBeCloseTo(o.pIn);
    expect(rpmConducidaPoleas(1200, 40, 120)).toBe(400);
    expect(longitudCorrea(false, 100, 100, 300)).toBeCloseTo(600 + Math.PI * 100);
  });
  it("transformación del movimiento y elevador", () => {
    expect(desplazamiento("tornillo", 2, 15)).toBe(30);
    expect(desplazamiento("pinon", 10, 1)).toBeCloseTo(2 * Math.PI * 10);
    expect(desplazamiento("biela", 25, 0.5)).toBeCloseTo(50, 5);
    expect(desplazamiento("leva", 6, 0.5)).toBeCloseTo(12);
    const e = elevador(1500, 30, 10, 20.408163265306122, 1, 5);
    expect(e.rpmTambor).toBe(50);
    expect(elevador(1500, 10, 10, 20.408163265306122, 1, 2).parNecesario).toBeCloseTo(2, 3);
    expect(elevador(1500, 10, 10, 200, 1, 2).sube).toBe(false);
  });
});
