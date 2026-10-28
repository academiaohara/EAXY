import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { cinematicaDiferencial, metricasReg, potenciaMecanica, protocolosValidos, rpmEncoder, salidasEtapa, siguienteEtapa, simulaRegulacion, velocidadLineal } from "@/components/lesson/slide/tools/TecEso4ControlTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-regulador-explorador", "eso4-motor-explorador", "eso4-robot-explorador", "eso4-secuencia-explorador", "eso4-iot-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 6: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 6", () => {
  const base = { sp: 22, amb: 5, kp: 0.3, ki: 0.01, kd: 2, hist: 1 };
  it("reguladores", () => {
    const onoff = metricasReg(simulaRegulacion({ ...base, modo: 0 }).temp, 22);
    expect(Math.abs(onoff.error)).toBeLessThan(0.5);
    const p = metricasReg(simulaRegulacion({ ...base, modo: 1, kp: 0.05 }).temp, 22);
    expect(p.error).toBeGreaterThan(3);
    const pi = metricasReg(simulaRegulacion({ ...base, modo: 2 }).temp, 22);
    expect(Math.abs(pi.error)).toBeLessThan(0.1);
    const pid = metricasReg(simulaRegulacion({ ...base, modo: 3 }).temp, 22);
    expect(Math.abs(pid.error)).toBeLessThan(0.1);
    expect(pid.sobre).toBeLessThan(pi.sobre);
    const r = simulaRegulacion({ ...base, modo: 3, kp: 0, ki: 0, kd: 0 });
    expect(r.temp).toHaveLength(240);
    expect(r.pot.every((u) => u >= 0 && u <= 1)).toBe(true);
  });
  it("motor y encoder", () => {
    expect(rpmEncoder(50, 20, 100)).toBeCloseTo(1500);
    expect(rpmEncoder(50, 0, 100)).toBe(0);
    expect(velocidadLineal(1500, 65)).toBeCloseTo(5.105, 2);
    expect(potenciaMecanica(0.05, 1500)).toBeCloseTo(7.854, 2);
  });
  it("robot diferencial", () => {
    expect(cinematicaDiferencial(0.3, 0.3, 0.2, 5)).toMatchObject({ x: 1.5, y: 0, radio: Infinity });
    const c = cinematicaDiferencial(0.2, 0.4, 0.2, 1);
    expect(c.v).toBeCloseTo(0.3);
    expect(c.w).toBeCloseTo(1);
    expect(c.radio).toBeCloseTo(0.3);
    const giro = cinematicaDiferencial(-0.2, 0.2, 0.2, 1);
    expect(giro.v).toBeCloseTo(0);
  });
  it("secuencia e IoT", () => {
    const sin = { pulsador: false, pieza: false, abajo: false, arriba: false };
    expect(siguienteEtapa(0, sin)).toBe(0);
    expect(siguienteEtapa(0, { ...sin, pulsador: true })).toBe(1);
    expect(siguienteEtapa(1, { ...sin, abajo: true })).toBe(1);
    expect(siguienteEtapa(3, { ...sin, arriba: true })).toBe(0);
    expect(salidasEtapa(2)).toEqual({ cinta: false, bajar: true, subir: false });
    expect(protocolosValidos(10000, true, 1).map((p) => p.n)).toEqual(["LoRa"]);
    expect(protocolosValidos(10, false, 10000).map((p) => p.n)).toEqual(["Wi-Fi", "4G / 5G"]);
    expect(protocolosValidos(10000, true, 10000)).toEqual([]);
  });
});
