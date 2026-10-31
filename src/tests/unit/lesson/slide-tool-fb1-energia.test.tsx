import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { arrastre, cinetica, distanciaParada, elevacion, energiasRampa, muelleLanzamiento, trabajo, velocidadFinal } from "@/components/lesson/slide/tools/Fb1EnergiaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-trabajo-explorador", "fb1-teorema-ec-explorador", "fb1-rampa-energia-explorador", "fb1-muelle-energia-explorador", "fb1-potencia-rendimiento-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de energía (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("cálculos de energía", () => {
  it("trabajo y arrastre", () => {
    expect(trabajo(40, 60, 15)).toBeCloseTo(300, 6);
    expect(trabajo(10, 90, 5)).toBeCloseTo(0, 6);
    const r = arrastre(20, 0, 0, 5, 0.3, 10);
    expect(r.Wr).toBeCloseTo(-300, 6);
    expect(r.Wn).toBeCloseTo(-300, 6);
    expect(arrastre(10, 1000, 90, 5, 0.5).N).toBe(0);
  });
  it("teorema de las fuerzas vivas", () => {
    expect(cinetica(1000, 20)).toBe(200000);
    expect(velocidadFinal(3, 0, 600)).toBeCloseTo(20, 9);
    expect(velocidadFinal(3, 1, -1000)).toBeNaN();
    expect(distanciaParada(1000, 20, -4000)).toBeCloseTo(50, 9);
    expect(distanciaParada(1000, 20, 4000)).toBeNaN();
  });
  it("rampa: la energía total se conserva", () => {
    for (const f of [0, 0.3, 0.7, 1]) {
      const r = energiasRampa(2, 5, 35, 0.2, f, 10);
      expect(r.Ep + r.Ec + r.Q).toBeCloseTo(r.Etot, 6);
    }
    expect(energiasRampa(2, 5, 30, 0, 1, 10).vFinal).toBeCloseTo(10, 6);
    expect(energiasRampa(2, 5, 10, 0.5, 1).desliza).toBe(false);
  });
  it("muelle y elevación", () => {
    const m = muelleLanzamiento(400, 0.1, 0.5, 0, 10);
    expect(m.Ec).toBeCloseTo(2, 9);
    expect(m.v).toBeCloseTo(Math.sqrt(8), 9);
    expect(muelleLanzamiento(400, 0.1, 0.5, 100).Ec).toBe(0);
    const e = elevacion(500, 20, 20, 0.5, 0.15, 10);
    expect(e.Wu).toBe(100000);
    expect(e.Pu).toBe(5000);
    expect(e.Wc).toBe(200000);
    expect(elevacion(1, 1, 0, 1).Pu).toBeNaN();
  });
});
