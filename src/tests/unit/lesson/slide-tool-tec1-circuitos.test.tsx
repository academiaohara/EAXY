import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { lecturaMultimetro, puntoDiodo, resistenciaEquivalente, resolverKirchhoff } from "@/components/lesson/slide/tools/Tec1CircuitosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "carga-corriente-explorador",
  "ohm-explorador",
  "circuito-basico-explorador",
  "resistencias-explorador",
  "kirchhoff-explorador",
  "consumo-energia-explorador",
  "sobrecarga-circuito-explorador",
  "multimetro-explorador",
  "diagnostico-circuito-explorador",
  "diodo-led-explorador",
  "transistor-conmutador-explorador",
  "condensador-carga-explorador",
  "reto-led-explorador",
];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const press = (name: string | RegExp, i = 0) => fireEvent.click(screen.getAllByRole("button", { name })[i]!);

describe("herramientas de Tecnología e Ingeniería I, tema 4: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("funciones de cálculo del tema 4", () => {
  it("resistencia equivalente: serie 600, paralelo 54,5 y mixta 220", () => {
    expect(resistenciaEquivalente("serie", 100, 200, 300)).toBe(600);
    expect(resistenciaEquivalente("paralelo", 100, 200, 300)).toBeCloseTo(54.545, 2);
    expect(resistenciaEquivalente("mixto", 100, 200, 300)).toBe(220);
  });

  it("Kirchhoff: las ecuaciones de nudo y mallas se cumplen", () => {
    const { I1, I2, I3 } = resolverKirchhoff(12, 6, 10, 20, 30);
    expect(I1).toBeCloseTo(0.38182, 4);
    expect(I2).toBeCloseTo(-0.10909, 4);
    expect(I3).toBeCloseTo(I1 + I2, 10);
    expect(12 - I1 * 10 - I3 * 30).toBeCloseTo(0, 10);
    expect(6 - I2 * 20 - I3 * 30).toBeCloseTo(0, 10);
  });

  it("diodo: el punto de trabajo cumple V = Vd + I·R y queda cerca de (V − Vf)/R", () => {
    const { I, Vd } = puntoDiodo(5, 220, 1.9);
    expect(Vd + I * 220).toBeCloseTo(5, 6);
    expect(I).toBeGreaterThan(0.0135);
    expect(I).toBeLessThan(0.0145);
    expect(puntoDiodo(1, 220, 1.9).I).toBeLessThan(1e-5);
    expect(puntoDiodo(0, 220, 1.9).I).toBe(0);
  });

  it("multímetro: voltímetro en paralelo mide 3 V, amperímetro en serie 0,1 A y el óhmetro dentro del circuito se equivoca", () => {
    expect(lecturaMultimetro("V", 0, true).v).toBeCloseTo(3, 6);
    expect(lecturaMultimetro("V", 1, true).v).toBeCloseTo(6, 6);
    expect(lecturaMultimetro("A", 2, true).v).toBeCloseTo(0.1, 6);
    expect(lecturaMultimetro("Ω", 0, false).v).toBeCloseTo(20, 6);
    expect(lecturaMultimetro("Ω", 2, false).v).toBe(90);
  });
});

describe("resultados de las herramientas del tema 4", () => {
  it("cargas: 6 V y 30 Ω dan 200 mA y 2 C en 10 s", () => {
    mount("carga-corriente-explorador", { a: 6, b: 30, c: 10 });
    expect(text()).toContain("200 mA");
    expect(text()).toContain("2 C");
    expect(text()).toContain("1,25e+19");
  });

  it("Ohm: 6 V y 100 Ω dan 60 mA y 0,36 W; con bombilla la intensidad baja", () => {
    const { unmount } = mount("ohm-explorador", { a: 6, b: 100 });
    expect(text()).toContain("60 mA");
    expect(text()).toContain("0,36 W");
    unmount();
    mount("ohm-explorador", { a: 6, b: 100, n: 1 });
    expect(text()).toContain("10,9 mA");
  });

  it("circuito básico: abierto no pasa corriente, cerrado luce y el cortocircuito funde el fusible", () => {
    mount("circuito-basico-explorador");
    expect(text()).toContain("Circuito abierto");
    press("Cerrado");
    expect(text()).toContain("99,4 mA");
    press(/Sí \(cortocircuito\)/);
    expect(text()).toContain("fusible de 1 A se ha fundido");
    press("No");
    press("Cambiar el fusible");
    expect(text()).toContain("receptor funciona");
  });

  it("resistencias: serie 600 Ω y 20 mA; mixta 220 Ω", () => {
    const { unmount } = mount("resistencias-explorador", { a: 100, b: 200, c: 300, n: 0 });
    expect(text()).toContain("600 Ω");
    expect(text()).toContain("20 mA");
    unmount();
    mount("resistencias-explorador", { a: 100, b: 200, c: 300, n: 2 });
    expect(text()).toContain("220 Ω");
  });

  it("Kirchhoff: I₁ = 0,382 A, I₂ = −0,109 A, I₃ = 0,273 A y las tres comprobaciones salen ✓", () => {
    mount("kirchhoff-explorador");
    expect(text()).toContain("0,382 A");
    expect(text()).toContain("-0,109 A");
    expect(text()).toContain("0,273 A");
    expect(screen.getByTestId("kirchhoff-comprobacion").textContent?.match(/✓/g)).toHaveLength(3);
  });

  it("consumo: el coste de la lista inicial a 0,15 €/kWh es 28,64 €", () => {
    mount("consumo-energia-explorador");
    expect(text()).toContain("28,64 €");
  });

  it("sobrecarga: la lavadora sola aguanta y con el horno salta el magnetotérmico de 16 A", () => {
    mount("sobrecarga-circuito-explorador");
    expect(text()).toContain("Aguanta");
    press("Encendido", 1);
    expect(text()).toContain("SALTA");
  });

  it("multímetro: voltímetro en paralelo con R₁ marca 3 V y amperímetro en serie 100 mA", () => {
    mount("multimetro-explorador");
    expect(screen.getByTestId("multimetro").textContent).toContain("3 V");
    press("Amperímetro (A)");
    press("En serie con el circuito");
    expect(screen.getByTestId("multimetro").textContent).toContain("100 mA");
    press("Voltímetro (V)");
    press("Apagada");
    expect(text()).toContain("Sin alimentación");
  });

  it("diagnóstico: con el interruptor sin contacto, 6 V en él y diagnóstico correcto", () => {
    mount("diagnostico-circuito-explorador", { n: 1 });
    press("Tensión del interruptor");
    expect(screen.getByTestId("diagnostico-medidas").textContent).toContain("6 V");
    press("El interruptor no hace contacto");
    press("Comprobar diagnóstico");
    expect(text()).toContain("Correcto");
  });

  it("diodo: LED rojo con 5 V y 220 Ω conduce unos 14 mA", () => {
    mount("diodo-led-explorador", { a: 5, b: 220, n: 0 });
    expect(text()).toMatch(/14,\d mA/);
    expect(text()).toContain("Luce normalmente");
  });

  it("transistor: con 3 V y 10 kΩ está en zona activa y con 5 V y 1 kΩ en saturación", () => {
    const { unmount } = mount("transistor-conmutador-explorador");
    expect(text()).toContain("Zona activa");
    unmount();
    mount("transistor-conmutador-explorador", { a: 5, b: 1 });
    expect(text()).toContain("Saturación");
  });

  it("condensador: τ = 1 s y a τ la tensión es el 63 % de 9 V (5,69 V)", () => {
    mount("condensador-carga-explorador", { a: 9, b: 10, c: 100 });
    expect(text()).toContain("1 s");
    expect(text()).toContain("5,69 V (63 %)");
  });

  it("reto LED: 220 Ω no cumple, 470 Ω sí", () => {
    mount("reto-led-explorador");
    expect(screen.getByTestId("reto-criterios").textContent).toContain("✗");
    press("470 Ω");
    expect(screen.getByTestId("reto-criterios").textContent).not.toContain("✗");
    expect(text()).toContain("Reto superado");
  });
});
