import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { galgaR, opamp, quantAd, rtd } from "@/components/lesson/slide/tools/SensoresTools";
import { bimodalNext, jkNext, reversalStep, rsStep, timerOutput } from "@/components/lesson/slide/tools/SecuencialTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  // unidad 11
  "cuantizacion-ad-explorador",
  "sensor-curva-explorador",
  "sensor-proximidad-explorador",
  "potenciometro-divisor-explorador",
  "galga-deformacion-explorador",
  "encoder-rpm-explorador",
  "termorresistencia-puente-explorador",
  "puente-potenciometros-explorador",
  "operacional-inversor-explorador",
  // unidad 12
  "binario-byte-explorador",
  "conversion-decimal-binario-explorador",
  "hex-bcd-explorador",
  "logica-niveles-explorador",
  "puerta-logica-explorador",
  "morgan-explorador",
  "formas-canonicas-explorador",
  "karnaugh-explorador",
  "nand-nor-explorador",
  "mux-decoder-explorador",
  "sumador-binario-explorador",
  // unidad 13
  "secuencial-memoria-explorador",
  "biestable-rs-explorador",
  "biestable-jk-explorador",
  "registro-contador-explorador",
  "cableado-elementos-explorador",
  "grafo-bimodal-explorador",
  "secuencia-reles-explorador",
  "motor-enclavamiento-explorador",
];

const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));

describe("herramientas TI2 unidades 11–13: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, c: 77, n: 3 })).not.toThrow();
  });
  it.each(TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta con ceros y negativos", (tool) => {
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -5, b: -5, c: -5, n: -5 })).not.toThrow();
  });
});

describe("cálculos de la unidad 11", () => {
  it("conversor A/D: 7 V con 3 bits cae en el intervalo [6; 7,5) y da 100", () => {
    const q = quantAd(7, 3);
    expect(q.step).toBe(1.5);
    expect(q.code).toBe(4);
    expect(q.binary).toBe("100");
    expect(quantAd(12, 8).code).toBe(255);
    expect(quantAd(0, 1).binary).toBe("0");
  });

  it("galga del ejemplo 1 del libro: ε = 0,0015 y R = 5018,9 Ω", () => {
    const g = galgaR(10000, 30, 220000, 2.5, 5000);
    expect(g.eps).toBeCloseTo(0.0015152, 6);
    expect(g.r).toBeCloseTo(5018.94, 1);
  });

  it("galga: pletina de 25 mm² a 5000 N da 5011,4 Ω; con 5010 Ω la fuerza es 4400 N", () => {
    expect(galgaR(5000, 25, 220000, 2.5, 5000).r).toBeCloseTo(5011.36, 1);
    const eps = (5010 / 5000 - 1) / 2.5;
    expect(eps * 220000 * 25).toBeCloseTo(4400, 6);
  });

  it("termorresistencia: Pt100 a 100 °C vale 138,5 Ω; α = 2,63e-4 con Rx = 105,26", () => {
    expect(rtd(100, 0.00385, 100)).toBeCloseTo(138.5, 6);
    expect((105.26 / 100 - 1) / 200).toBeCloseTo(2.63e-4, 6);
    expect((100 * 100) / 95).toBeCloseTo(105.263, 3);
  });

  it("operacional: 15 mV con 150 k / 0,5 k da −4,5 V y satura a ±15 V", () => {
    expect(opamp("inv", 0.5, 150, 0.015, 0).out).toBeCloseTo(-4.5, 9);
    expect(opamp("comp", 10, 100, 0.5, 0.8).out).toBeCloseTo(3, 9);
    const sat = opamp("inv", 0.1, 500, 0.05, 0);
    expect(sat.saturated).toBe(true);
    expect(sat.out).toBe(-15);
  });
});

describe("herramientas de la unidad 11", () => {
  it("cuantización: 35 L con 3 bits", () => {
    mount("cuantizacion-ad-explorador", { a: 35, b: 3 });
    expect(text()).toContain("7 V");
    expect(text()).toContain("1,5 V");
    expect(text()).toContain("100");
  });
  it("curva del sensor: 3,6 L y 3 L sobre 60 L son 6 % y 5 %", () => {
    mount("sensor-curva-explorador", { a: 3.6, b: 3 });
    expect(text()).toContain("6 %");
    expect(text()).toContain("5 %");
    expect(text()).toContain("0,2 V/L");
  });
  it("proximidad: el plástico no lo detecta un inductivo", () => {
    mount("sensor-proximidad-explorador", { a: 2, b: 15 });
    expect(text()).toContain("solo reacciona frente a metales");
    expect(text()).toContain("No detecta");
  });
  it("reóstato de nivel: 2,4 m dan 4,8 V y 17 m³", () => {
    mount("potenciometro-divisor-explorador", { a: 2.4 });
    expect(text()).toContain("4,8 V");
    expect(text()).toContain("17 m³");
  });
  it("galga: valores por defecto del ejemplo del libro", () => {
    mount("galga-deformacion-explorador");
    expect(text()).toMatch(/5\s?018,9 Ω/);
    expect(text()).toContain("333,3 N/mm²");
  });
  it("encoder: 12 ranuras a 600 rpm = 120 Hz y 30° por impulso", () => {
    mount("encoder-rpm-explorador");
    expect(text()).toContain("120 Hz");
    expect(text()).toContain("30°");
  });
  it("termorresistencia: platino a 150 °C = 157,8 Ω y R₁ = 63,4 Ω", () => {
    mount("termorresistencia-puente-explorador");
    expect(text()).toContain("157,8 Ω");
    expect(text()).toContain("63,4 Ω");
  });
  it("puente de potenciómetros: 70 y 40 mm con 10 V dan 3 V", () => {
    mount("puente-potenciometros-explorador");
    expect(text()).toContain("3 V");
  });
  it("operacional: ganancia −300 y salida −4,5 V", () => {
    mount("operacional-inversor-explorador");
    expect(text()).toContain("-300");
    expect(text()).toContain("-4,5 V");
  });
});

describe("herramientas de la unidad 12", () => {
  it("byte: 45 = 00101101 = 2D", () => {
    mount("binario-byte-explorador", { a: 45 });
    expect(text()).toContain("00101101");
    expect(text()).toContain("2D");
  });
  it("conversión: 45 = 101101", () => {
    mount("conversion-decimal-binario-explorador", { a: 45 });
    expect(text()).toContain("101101");
  });
  it("hex/BCD: 342 = 101010110 = 156 hex", () => {
    mount("hex-bcd-explorador", { a: 342 });
    expect(text()).toContain("101010110");
    expect(text()).toContain("156");
    expect(text()).toContain("0011");
  });
  it("niveles: la señal 11010010 se invierte en lógica negativa", () => {
    mount("logica-niveles-explorador");
    expect(text()).toContain("11010010");
    press("Lógica negativa");
    expect(text()).toContain("00101101");
  });
  it("puertas básicas: la NOT con a = 0 da S = 1; la NOR con 00 también", () => {
    mount("puerta-logica-explorador", { a: 0 });
    expect(text()).toContain("S=1");
    document.body.innerHTML = "";
    mount("puerta-logica-explorador", { a: 1 });
    expect(text()).toContain("S=1");
  });
  it("Morgan: las dos columnas coinciden", () => {
    mount("morgan-explorador");
    expect(text()).toContain("coinciden en las cuatro filas");
  });
  it("formas canónicas de la tabla 12.15: Σ(1, 3, 4, 6, 7) y Π(2, 5, 7)", () => {
    mount("formas-canonicas-explorador", { a: 0 });
    expect(text()).toContain("Σ(1, 3, 4, 6, 7)");
    expect(text()).toContain("Π(2, 5, 7)");
  });
  it("Karnaugh: el ejemplo 13 son tres grupos de dos celdas", () => {
    mount("karnaugh-explorador", { a: 3, b: 1 });
    expect((text().match(/Grupo de 2/g) ?? []).length).toBe(3);
  });
  it("Karnaugh: el ejemplo 17 produce tres grupos de cuatro", () => {
    mount("karnaugh-explorador", { a: 4, b: 0 });
    expect((text().match(/Grupo de 4/g) ?? []).length).toBe(3);
  });
  it("NAND: el ejemplo 16 necesita 6 puertas", () => {
    mount("nand-nor-explorador", { a: 2 });
    expect(text()).toContain("Total: 6 puertas");
  });
  it("multiplexor: D5 = 0 con la selección 101", () => {
    mount("mux-decoder-explorador", { a: 0 });
    expect(text()).toContain("Salida W = D5");
  });
  it("comparador: 1001 > 0110", () => {
    mount("mux-decoder-explorador", { a: 3 });
    expect(text()).toContain("1001 = 9");
    expect(screen.getByRole("img", { name: "A > B: encendida" })).toBeTruthy();
  });
  it("sumador completo: 1 + 1 + 0 = 10", () => {
    mount("sumador-binario-explorador", { a: 1 });
    expect(text()).toContain("1 + 1 + 0 = 10");
  });
  it("sumador de 4 bits: 11 + 6 = 17 = 10001", () => {
    mount("sumador-binario-explorador", { a: 2 });
    expect(text()).toContain("11 + 6 = 17 = 10001");
  });
});

describe("lógica secuencial de la unidad 13", () => {
  it("R-S con NOR: set, memoria, reset y combinación prohibida", () => {
    expect(rsStep(0, 0, 1)).toEqual({ q: 1, qb: 0, prohibido: false });
    expect(rsStep(1, 0, 0)).toEqual({ q: 1, qb: 0, prohibido: false });
    expect(rsStep(1, 1, 0)).toEqual({ q: 0, qb: 1, prohibido: false });
    expect(rsStep(1, 1, 1)).toEqual({ q: 0, qb: 0, prohibido: true });
    expect(rsStep("?", 0, 0).qb).toBe("?");
  });

  it("J-K estándar: 00 mantiene, 10 set, 01 reset, 11 conmuta", () => {
    for (const q of [0, 1]) {
      expect(jkNext(q, 0, 0)).toBe(q);
      expect(jkNext(q, 1, 0)).toBe(1);
      expect(jkNext(q, 0, 1)).toBe(0);
      expect(jkNext(q, 1, 1)).toBe(1 - q);
    }
  });

  it("ecuaciones bimodales de los ejemplos 1 a 3", () => {
    const off = { sb1: false, sb2: false, sb3: false, sb4: false };
    // ejemplo 1: marcha, mantiene y paro
    expect(bimodalNext(1, 0, { ...off, sb1: true })).toBe(1);
    expect(bimodalNext(1, 1, off)).toBe(1);
    expect(bimodalNext(1, 1, { ...off, sb2: true })).toBe(0);
    expect(bimodalNext(1, 0, off)).toBe(0);
    // ejemplo 2: marcha con SB1 y SB2 a la vez; paro con SB3 y SB4 a la vez
    expect(bimodalNext(2, 0, { ...off, sb1: true })).toBe(0);
    expect(bimodalNext(2, 0, { ...off, sb1: true, sb2: true })).toBe(1);
    expect(bimodalNext(2, 1, { ...off, sb3: true })).toBe(1);
    expect(bimodalNext(2, 1, { ...off, sb3: true, sb4: true })).toBe(0);
    // ejemplo 3: marcha con SB1 o SB2; paro con SB3 o SB4
    expect(bimodalNext(3, 0, { ...off, sb2: true })).toBe(1);
    expect(bimodalNext(3, 1, { ...off, sb4: true })).toBe(0);
  });

  it("inversión de giro: enclavamiento, paro y sobrecarga", () => {
    const none = { sb0: false, sb1: false, sb2: false, ft1: false };
    let k = reversalStep({ km1: 0, km2: 0 }, { ...none, sb1: true });
    expect(k).toEqual({ km1: 1, km2: 0 });
    k = reversalStep(k, none);
    expect(k.km1).toBe(1);
    k = reversalStep(k, { ...none, sb2: true });
    expect(k).toEqual({ km1: 1, km2: 0 });
    k = reversalStep(k, { ...none, sb0: true });
    expect(k).toEqual({ km1: 0, km2: 0 });
    k = reversalStep(k, { ...none, sb2: true });
    expect(k).toEqual({ km1: 0, km2: 1 });
    k = reversalStep(k, { ...none, ft1: true });
    expect(k).toEqual({ km1: 0, km2: 0 });
    // desde cualquier estado alcanzable, pulsando todo, nunca quedan los dos conectados
    for (const prev of [{ km1: 0, km2: 0 }, { km1: 1, km2: 0 }, { km1: 0, km2: 1 }]) {
      const r = reversalStep(prev, { sb0: false, sb1: true, sb2: true, ft1: false });
      expect(r.km1 + r.km2).toBeLessThanOrEqual(1);
    }
  });

  it("temporizadores: a la conexión y a la desconexión", () => {
    expect(timerOutput("on", 8, 3, 23)).toEqual([11, 23]);
    expect(timerOutput("on", 10, 3, 9)).toBeNull();
    expect(timerOutput("off", 5, 3, 15)).toEqual([3, 20]);
  });
});

describe("herramientas de la unidad 13", () => {
  it("memoria: pulsar y soltar deja encendida solo la lámpara con memoria", () => {
    mount("secuencial-memoria-explorador");
    press(/a \(marcha\)/);
    press(/a \(marcha\)/);
    expect(screen.getByRole("img", { name: "Lámpara S: apagado" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "Lámpara Q: encendido" })).toBeTruthy();
    press(/R \(reset\)/);
    expect(screen.getByRole("img", { name: "Lámpara Q: apagado" })).toBeTruthy();
  });

  it("R-S: Set, soltar y mantener; R = S = 1 avisa", () => {
    mount("biestable-rs-explorador");
    press(/S \(Set\)/);
    press(/S \(Set\)/);
    expect(text()).toMatch(/Q1/);
    press(/S \(Set\)/);
    press(/R \(Reset\)/);
    expect(text()).toContain("entrada prohibida");
  });

  it("J-K: con J = K = 1 y Q = 0 un flanco da Q = 1", () => {
    mount("biestable-jk-explorador");
    press(/Flanco de reloj/);
    expect(text()).toMatch(/Q1/);
  });

  it("registro: tres pulsos con D = 1 dan 0111", () => {
    mount("registro-contador-explorador", { a: 0 });
    for (let i = 0; i < 3; i += 1) {
      press(/Pulso de reloj/);
    }
    expect(text()).toContain("0111");
  });

  it("contador: cinco pulsos dan 0101", () => {
    mount("registro-contador-explorador", { a: 1 });
    for (let i = 0; i < 5; i += 1) {
      press(/Pulso de reloj/);
    }
    expect(text()).toContain("0101");
  });

  it("temporizador a la conexión: t = 6 s con una orden de 14 s", () => {
    mount("cableado-elementos-explorador");
    expect(text()).toContain("8 s encendida");
    expect(text()).toContain("9 s / 17 s");
  });

  it("bimodal: el relé se mantiene al soltar SB₁ y cae con SB₂", () => {
    mount("grafo-bimodal-explorador");
    press(/SB₁/);
    press(/SB₁/);
    expect(text()).toMatch(/KM₁conectado/);
    press(/SB₂/);
    expect(text()).toMatch(/KM₁desconectado/);
  });

  it("temporizadores encadenados: H₁ 0–50 s y H₂ 20–50 s", () => {
    mount("secuencia-reles-explorador");
    expect(text()).toContain("0 s / 50 s");
    expect(text()).toContain("20 s / 50 s");
  });

  it("motor: SB₁ arranca a derechas y SB₂ no lo cambia", () => {
    mount("motor-enclavamiento-explorador");
    press(/SB₁ derechas/);
    press(/SB₂ izquierdas/);
    expect(text()).toMatch(/Motorderechas/);
  });
});
