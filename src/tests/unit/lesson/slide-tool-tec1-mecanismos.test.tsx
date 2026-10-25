import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { elevacionLeva, generoPalanca, posicionPiston, relacionTren } from "@/components/lesson/slide/tools/Tec1MecanismosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "maquina-desmontaje-explorador",
  "poleas-correas-explorador",
  "engranajes-explorador",
  "bicicleta-explorador",
  "sin-fin-explorador",
  "biela-manivela-explorador",
  "leva-seguidor-explorador",
  "cremallera-tornillo-explorador",
  "palanca-explorador",
  "polipasto-explorador",
  "disco-giratorio-explorador",
  "motor-virtual-explorador",
  "reductor-rendimiento-explorador",
  "transmision-editor-explorador",
];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería I, tema 3: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 3", () => {
  it("funciones: relación de un tren, carrera de la biela, leva y género de palanca", () => {
    expect(relacionTren([15, 45])).toBeCloseTo(1 / 3, 6);
    expect(relacionTren([15, 45, 12, 36])).toBeCloseTo(1 / 9, 6);
    expect(posicionPiston(0, 30, 110)).toBeCloseTo(140, 6);
    expect(posicionPiston(180, 30, 110)).toBeCloseTo(80, 6);
    expect(elevacionLeva(0, 10, 30)).toBeCloseTo(20, 6);
    expect(elevacionLeva(180, 10, 30)).toBeCloseTo(0, 6);
    expect(generoPalanca(60, 20, 100)).toBe(1);
    expect(generoPalanca(0, 50, 100)).toBe(2);
    expect(generoPalanca(0, 100, 50)).toBe(3);
  });

  it("poleas: 60 mm → 120 mm a 1 200 rpm da 600 rpm, i = 0,5 y 3,77 m/s", () => {
    mount("poleas-correas-explorador", { a: 60, b: 120, c: 1200 });
    expect(text()).toContain("600 rpm");
    expect(text()).toContain("0,5");
    expect(text()).toContain("3,77 m/s");
    fireEvent.click(screen.getByRole("button", { name: "Cruzada" }));
    expect(text()).toContain("Contrario");
  });

  it("engranajes: simple 15/45 a 900 rpm da 300 rpm y sentido contrario; compuesto da 100 rpm", () => {
    const { unmount } = mount("engranajes-explorador", { a: 15, b: 45, c: 900 });
    expect(text()).toContain("300 rpm");
    expect(text()).toContain("Contrario");
    unmount();
    mount("engranajes-explorador", { a: 15, b: 45, c: 900, n: 1 });
    expect(text()).toContain("100 rpm");
    expect(text()).toContain("El mismo");
  });

  it("bicicleta: 50/25 a 80 rpm da 4,2 m por pedalada y 20,2 km/h", () => {
    mount("bicicleta-explorador", { a: 50, b: 25, c: 80 });
    expect(text()).toContain("4,2 m");
    expect(text()).toContain("20,2 km/h");
  });

  it("sin fin: 1 500 rpm con corona de 30 dientes da 50 rpm", () => {
    mount("sin-fin-explorador", { a: 1500, b: 30, c: 1 });
    expect(text()).toContain("50 rpm");
  });

  it("biela-manivela: θ = 60° con R = 30 y L = 110 sitúa el émbolo a 121,9 mm", () => {
    mount("biela-manivela-explorador");
    expect(text()).toContain("121,9 mm");
  });

  it("leva: θ = 90° con e = 10 eleva el seguidor 8,3 mm", () => {
    mount("leva-seguidor-explorador");
    expect(text()).toContain("8,3 mm");
  });

  it("piñón-cremallera: 20 mm a 60 rpm da 125,7 mm/s; tornillo de 2 mm de paso, 2 mm/s", () => {
    const { unmount } = mount("cremallera-tornillo-explorador", { a: 20, c: 60 });
    expect(text()).toContain("125,7 mm/s");
    unmount();
    mount("cremallera-tornillo-explorador", { n: 1, b: 2, c: 60 });
    expect(text()).toContain("2 mm/s");
  });

  it("palanca: 20 kg a 40 cm del apoyo pide 196,2 N con F a 40 cm, de 1.er género", () => {
    mount("palanca-explorador");
    expect(text()).toContain("196,2 N");
    expect(text()).toContain("1.º género");
    expect(text()).toContain("Cae por la izquierda");
  });

  it("polipasto: 120 kg con 4 cuerdas y η = 90 % pide 327 N y 8 m de cuerda", () => {
    mount("polipasto-explorador", { a: 4, b: 120, c: 90 });
    expect(text()).toContain("327 N");
    expect(text()).toContain("8 m");
    expect(text()).toContain("2 616 J");
  });

  it("disco: 300 rpm y 15 cm dan 31,42 rad/s, 5 Hz, 0,2 s y 4,71 m/s", () => {
    mount("disco-giratorio-explorador", { a: 300, b: 15 });
    expect(text()).toContain("31,42 rad/s");
    expect(text()).toContain("5 Hz");
    expect(text()).toContain("0,2 s");
    expect(text()).toContain("4,71 m/s");
  });

  it("motor: 8 N·m a 1 200 rpm son 1 005 W", () => {
    mount("motor-virtual-explorador", { a: 8, b: 1200 });
    expect(text()).toContain("1 005 W");
  });

  it("reductor: 1 000 W, 1 500 rpm, 1:10 y η = 90 % dan 150 rpm, 57,3 N·m y 100 W de pérdidas", () => {
    mount("reductor-rendimiento-explorador", { a: 1000, b: 1500, c: 10 });
    expect(text()).toContain("150 rpm");
    expect(text()).toContain("57,3 N·m");
    expect(text()).toContain("100 W");
  });

  it("editor de transmisiones: la configuración inicial cumple el intervalo 150–250 rpm", () => {
    mount("transmision-editor-explorador");
    expect(text()).toContain("242 rpm");
    expect(text()).toContain("Cumple el requisito");
  });

  it("desmontaje: empieza con 1 pieza identificada y suma al pulsar otra", () => {
    mount("maquina-desmontaje-explorador");
    expect(text()).toContain("1 de 5");
    fireEvent.click(screen.getByRole("button", { name: "Cadena" }));
    expect(text()).toContain("2 de 5");
    expect(screen.getByTestId("maquina-detalle").textContent).toContain("Transmisión");
  });
});
