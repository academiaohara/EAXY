import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { barcaRio, circular, intrinsecas, proaRectaGrados, tiroOblicuo } from "@/components/lesson/slide/tools/Fb1CinematicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-vectores-cinematicos-explorador", "fb1-graficas-mrua-explorador", "fb1-parabolico-explorador", "fb1-circular-explorador", "fb1-barca-rio-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de cinemática (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("cálculos de cinemática", () => {
  it("componentes intrínsecas", () => {
    const r = intrinsecas([3, 4], [0, -10]);
    expect(r.at).toBeCloseTo(-8, 6);
    expect(r.an).toBeCloseTo(6, 6);
    expect(r.R).toBeCloseTo(4.17, 2);
  });
  it("tiro oblicuo", () => {
    const t = tiroOblicuo(20, 30, 0, 10);
    expect(t.tVuelo).toBeCloseTo(2, 6);
    expect(t.hMax).toBeCloseTo(5, 6);
    expect(t.alcance).toBeCloseTo(34.64, 2);
  });
  it("movimiento circular", () => {
    const c = circular(2, 4, 0, 1);
    expect(c.v).toBeCloseTo(8, 6);
    expect(c.an).toBeCloseTo(32, 6);
  });
  it("barca en el río", () => {
    const b = barcaRio(4, 2, 90, 100);
    expect(b.t).toBeCloseTo(25, 6);
    expect(b.deriva).toBeCloseTo(50, 6);
    expect(proaRectaGrados(4, 2)).toBeCloseTo(120, 6);
    expect(proaRectaGrados(2, 4)).toBeNaN();
  });
});
