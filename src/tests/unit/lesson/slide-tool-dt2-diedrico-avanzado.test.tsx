import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { abatePunto, areaPoligono, cambioPlanoVertical, distanciaPuntoRecta, giroEjeVertical, giroParaFrontal, magnitudYAngulos, puntoDePlanoPorLT, vistaDeFrente } from "@/components/lesson/slide/tools/DtIIDiedricoAvanzadoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-abatimiento-punto-explorador", "dt2-verdadera-forma-explorador", "dt2-giro-recta-explorador", "dt2-cambio-plano-explorador", "dt2-magnitud-angulos-explorador", "dt2-distancia-punto-recta-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de diédrico avanzado: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("abatimiento de un punto", () => {
    const r = abatePunto(2, 30);
    expect(r.real).toBeCloseTo(4);
    expect(r.horiz).toBeCloseTo(3.464, 3);
    expect(Math.hypot(r.horiz, 2)).toBeCloseTo(r.real);
    expect(abatePunto(1, 0).real).toBeNaN();
  });
  it("figura en un plano por la LT", () => {
    const tri: [number, number][] = [[0, 0], [4, 0], [0, 3]];
    const pts = tri.map((q) => puntoDePlanoPorLT(q[0], q[1], 60));
    expect(areaPoligono(pts.map((q) => q.horiz))).toBeCloseTo(6 * Math.cos(Math.PI / 3));
    expect(areaPoligono(pts.map((q) => q.vert))).toBeCloseTo(6 * Math.sin(Math.PI / 3));
    expect(areaPoligono(pts.map((q) => q.abatido))).toBeCloseTo(6);
  });
  it("giro alrededor de un eje vertical", () => {
    const p = giroEjeVertical([3, 1, 2], [1, 1], 90);
    expect(p[0]).toBeCloseTo(1);
    expect(p[1]).toBeCloseTo(3);
    expect(p[2]).toBe(2);
    const a = [-1.5, 1, 1] as const;
    const b = [a[0] + 4 * Math.cos(Math.PI / 6), a[1] + 4 * Math.sin(Math.PI / 6), 3.5] as const;
    const th = giroParaFrontal(a, b);
    expect(th).toBeCloseTo(-30);
    expect(giroEjeVertical(b, [a[0], a[1]], th)[1]).toBeCloseTo(1);
  });
  it("cambio de plano vertical", () => {
    const n = cambioPlanoVertical([2, 3, 4], 90);
    expect(n.x).toBeCloseTo(3);
    expect(n.e).toBeCloseTo(-2);
    expect(n.z).toBe(4);
    const q = cambioPlanoVertical([2, 3, 4], 0);
    expect(q.x).toBeCloseTo(2);
    expect(q.e).toBeCloseTo(3);
    expect(Math.hypot(cambioPlanoVertical([2, 3, 4], 37).x, cambioPlanoVertical([2, 3, 4], 37).e)).toBeCloseTo(Math.hypot(2, 3));
  });
  it("verdadera magnitud y ángulos", () => {
    const m = magnitudYAngulos([0, 0, 0], [3, 4, 0]);
    expect(m.real).toBeCloseTo(5);
    expect(m.conPH).toBeCloseTo(0);
    expect(m.conPV).toBeCloseTo(Math.asin(4 / 5) * (180 / Math.PI));
    expect(magnitudYAngulos([0, 0, 0], [6, 0, 8]).conPH).toBeCloseTo(53.13, 2);
  });
  it("distancia de un punto a una recta", () => {
    expect(distanciaPuntoRecta([0, 5, 0], [0, 0, 0], [10, 0, 0])).toBeCloseTo(5);
    const a = [-2, 1, 1] as const;
    const b = [2, 3, 3] as const;
    for (const p of [[1, 4, 1], [0, 0, 0], [-3, 2, 4]] as const) {
      expect(vistaDeFrente(p, a, b).d).toBeCloseTo(distanciaPuntoRecta(p, a, b));
    }
    expect(distanciaPuntoRecta([1, 1, 1], [0, 0, 0], [0, 0, 0])).toBeNaN();
    expect(vistaDeFrente([1, 1, 1], [0, 0, 0], [0, 0, 0]).d).toBeNaN();
  });
});
