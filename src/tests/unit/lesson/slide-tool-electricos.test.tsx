import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "campo-hilo-explorador",
  "lorentz-explorador",
  "espira-par-explorador",
  "fem-induccion-explorador",
  "motor-cc-explorador",
  "curvas-cc-explorador",
  "balance-cc-explorador",
  "arranque-cc-explorador",
  "velocidad-trifasico-explorador",
  "trifasico-conexion-explorador",
  "curva-par-asincrono-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const slider = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

describe("herramientas de Tecnología Industrial II, unidad 7: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta con parámetros negativos o cero", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de la unidad 7", () => {
  it("dos hilos de 20 A a 1 mm: 0,12 N sobre 1,5 m", () => {
    render(<SlideTool block={{ kind: "tool", tool: "campo-hilo-explorador", params: { a: 20, b: 20, c: 1 } }} />);
    expect(text()).toContain("0,12");
    expect(text()).toContain("atracción");
    press("Contrario");
    expect(text()).toContain("repulsión");
  });

  it("protón a 8·10⁶ m/s en 2 T: radio de 4,18 cm", () => {
    render(<SlideTool block={{ kind: "tool", tool: "lorentz-explorador", params: { a: 8, b: 2 } }} />);
    expect(text()).toContain("4,18 cm");
  });

  it("espira: 100 espiras, 2 A, 100 cm², 0,5 T y 90° dan 1 N·m", () => {
    render(<SlideTool block={{ kind: "tool", tool: "espira-par-explorador", params: { a: 100, b: 2, c: 90 } }} />);
    expect(text()).toContain("1 N·m");
    fireEvent.change(slider("Ángulo entre S y B, φ"), { target: { value: "0" } });
    expect(text()).toContain("nulo");
  });

  it("fem: barra 0,5 T · 0,4 m · 3 m/s da 0,6 V; bobina de 200 espiras con 2 mWb en 0,1 s, 4 V", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fem-induccion-explorador", params: { a: 0.5, b: 3 } }} />);
    expect(text()).toContain("0,6 V");
    press("Bobina con flujo variable");
    expect(text()).toContain("4 V");
  });

  it("motor derivación del ejemplo 3: I_ex 1 A, I_i 10 A, I 11 A; serie del ejemplo 4: 5 A", () => {
    render(<SlideTool block={{ kind: "tool", tool: "motor-cc-explorador", params: { a: 200, b: 160 } }} />);
    expect(text()).toContain("10 A");
    expect(text()).toContain("11 A");
    press("Serie");
    fireEvent.change(slider("Fuerza contraelectromotriz, E'"), { target: { value: "170" } });
    expect(text()).toContain("5 A");
  });

  it("curvas: derivación a 15 A gira a 1 327 rpm y da 75 N·m", () => {
    render(<SlideTool block={{ kind: "tool", tool: "curvas-cc-explorador", params: { a: 15 } }} />);
    expect(text()).toMatch(/1.327 rpm/);
    expect(text()).toContain("75 N·m");
    press("Serie");
    expect(text()).toContain("embala");
  });

  it("balance del ejemplo 6: 3 000 W absorbidos, 2 339 W útiles y 77,9 %", () => {
    render(<SlideTool block={{ kind: "tool", tool: "balance-cc-explorador", params: { a: 150, b: 20 } }} />);
    expect(text()).toMatch(/2.339 W/);
    expect(text()).toContain("78 %");
  });

  it("arranque del ejemplo 7: 40 A nominales, 500 A en directo y 2,63 Ω de reóstato", () => {
    render(<SlideTool block={{ kind: "tool", tool: "arranque-cc-explorador", params: { a: 250, b: 230 } }} />);
    expect(text()).toContain("40 A");
    expect(text()).toContain("500 A");
    expect(text()).toMatch(/2,6[23] Ω/);
  });

  it("trifásico de 4 polos a 50 Hz con 4 % de deslizamiento: 1 500 y 1 440 rpm", () => {
    render(<SlideTool block={{ kind: "tool", tool: "velocidad-trifasico-explorador", params: { a: 2, b: 4 } }} />);
    expect(text()).toMatch(/1.500 rpm/);
    expect(text()).toMatch(/1.440 rpm/);
  });

  it("conexión: 230/400 V en 230 V es triángulo y en 400 V es estrella", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trifasico-conexion-explorador", params: { a: 18 } }} />);
    expect(text()).toContain("Triángulo");
    expect(text()).toContain("10,39 A");
    press("400 V");
    expect(text()).toContain("Estrella");
  });

  it("característica mecánica: con carga ligera hay punto de funcionamiento y con carga excesiva el motor se cala", () => {
    render(<SlideTool block={{ kind: "tool", tool: "curva-par-asincrono-explorador", params: { a: 100, b: 100 } }} />);
    expect(text()).toContain("rpm");
    expect(text()).toContain("arranca");
    fireEvent.change(slider("Par resistente de la carga"), { target: { value: "200" } });
    fireEvent.change(slider("Tensión aplicada"), { target: { value: "70" } });
    expect(text()).toContain("se cala");
  });
});
