import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ejecutaRobot, evaluaLinea, lecturasSensores, resultadoFabrica, simulaComparador, simulaTermostato } from "@/components/lesson/slide/tools/Tec1AutomaticosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "fabrica-modos-explorador",
  "bloques-control-explorador",
  "sensores-habitacion-explorador",
  "actuadores-explorador",
  "placa-virtual-explorador",
  "senal-umbral-explorador",
  "compuertas-alarma-explorador",
  "termostato-lazo-explorador",
  "linea-clasificacion-explorador",
  "robot-cuadricula-explorador",
];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const press = (name: string | RegExp, i = 0) => fireEvent.click(screen.getAllByRole("button", { name })[i]!);

describe("herramientas de Tecnología e Ingeniería I, tema 6: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("funciones de cálculo del tema 6", () => {
  it("fábrica: manual con 3 operarios, semiautomático con 1 y avería", () => {
    const m = resultadoFabrica(0, 3, 0);
    expect(m.piezas).toBe(240);
    expect(m.coste).toBeCloseTo(3.5957, 3);
    expect(resultadoFabrica(1, 1, 0).piezas).toBe(280);
    expect(resultadoFabrica(2, 1, 8).piezas).toBe(0);
  });
  it("sensores: LDR a 100 lux da 3,44 V; NTC a 25 °C, 2,5 V; eco a 1 m, 5 831 µs", () => {
    const r = lecturasSensores(100, 25, 100);
    expect(r.vLdr).toBeCloseTo(3.4375, 3);
    expect(r.vNtc).toBeCloseTo(2.5, 6);
    expect(r.eco).toBeCloseTo(5830.9, 0);
  });
  it("comparador: sin ruido cambia 4 veces; con ruido rebota; con histéresis vuelve a 4", () => {
    expect(simulaComparador(2, 2, 0, 2.5, 0).cambios).toBe(4);
    expect(simulaComparador(2, 2, 0.6, 2.5, 0).cambios).toBeGreaterThan(8);
    expect(simulaComparador(2, 2, 0.3, 2.5, 1).cambios).toBe(4);
  });
  it("termostato: el lazo cerrado aguanta la ventana mucho mejor que el abierto", () => {
    const r = simulaTermostato(21, 5, 1, true);
    const minA = Math.min(...r.A.slice(200, 260));
    const minC = Math.min(...r.C.slice(200, 260));
    expect(minC).toBeGreaterThan(19.5);
    expect(minA).toBeLessThan(minC - 3);
    expect(r.uAbierto).toBeCloseTo(0.48, 6);
  });
  it("línea: umbral 20 y 0,3 m/s funciona; umbral 15 falla 2; 1 m/s no cumple el ritmo", () => {
    expect(evaluaLinea(20, 0.3)).toMatchObject({ errores: 0, okTiempo: true, okRitmo: true });
    expect(evaluaLinea(15, 0.3).errores).toBe(2);
    expect(evaluaLinea(20, 1).okRitmo).toBe(false);
  });
  it("robot: hay una solución en el mapa 0 y los choques se detectan", () => {
    expect(ejecutaRobot(["D", "A3", "A", "A", "I", "A3", "A", "A"], 0).meta).toBe(true);
    expect(ejecutaRobot(["A3"], 0).choque).toContain("obstáculo");
    expect(ejecutaRobot(["I", "A"], 0).choque).toContain("tablero");
  });
});

describe("resultados de las herramientas del tema 6", () => {
  it("fábrica: manual con 3 operarios cuesta 3,6 € por pieza buena", () => {
    mount("fabrica-modos-explorador", { n: 0, a: 3 });
    expect(text()).toContain("3,6 €");
  });
  it("bloques: el detalle del sensor del termostato", () => {
    mount("bloques-control-explorador");
    press("Sensor", 0);
    expect(screen.getByTestId("bloque-detalle").textContent).toContain("Sensor de temperatura");
  });
  it("sensores: 3,44 V, 2,5 V y 5 831 µs", () => {
    mount("sensores-habitacion-explorador");
    expect(text()).toContain("3,44 V");
    expect(text()).toContain("2,5 V");
    expect(text()).toContain("5 831 µs");
  });
  it("actuadores: motor a 9 V con 10 N·cm gira a 300 rpm; servo a 1,5 ms está a 90°; relé activo", () => {
    const a = mount("actuadores-explorador", { n: 0, a: 9 });
    expect(text()).toContain("300 rpm");
    a.unmount();
    const b = mount("actuadores-explorador", { n: 1 });
    expect(text()).toContain("90 °");
    b.unmount();
    mount("actuadores-explorador", { n: 2 });
    expect(text()).toContain("Activado");
  });
  it("placa: con 300 lux la lectura es 881 y el LED está apagado; a oscuras se enciende", () => {
    const a = mount("placa-virtual-explorador");
    expect(text()).toContain("881");
    expect(text()).toContain("LOW");
    a.unmount();
    mount("placa-virtual-explorador", { a: 0 });
    expect(text()).toContain("HIGH");
  });
  it("umbral: muestra los cambios ideales y los reales", () => {
    mount("senal-umbral-explorador", { a: 2, b: 2, c: 0 });
    expect(text()).toContain("Cambios ideales (sin ruido)4");
  });
  it("alarma: armada sin sensores calla y con la puerta abierta suena", () => {
    mount("compuertas-alarma-explorador");
    expect(text()).toContain("Silencio");
    press("1 (activa)", 1);
    expect(text()).toContain("SUENA");
  });
  it("termostato: se monta y muestra el 48 % de potencia", () => {
    mount("termostato-lazo-explorador");
    expect(text()).toContain("48 %");
  });
  it("línea: configuración inicial sin fallos", () => {
    mount("linea-clasificacion-explorador");
    expect(text()).toContain("0 de 10");
    expect(text()).toContain("La línea funciona");
  });
  it("robot: programa vacío, y la solución llega a la meta", () => {
    mount("robot-cuadricula-explorador");
    expect(screen.getByTestId("robot-programa").textContent).toContain("vacío");
    for (const c of ["Girar der.", "Avanzar ×3", "Avanzar", "Avanzar", "Girar izq.", "Avanzar ×3", "Avanzar", "Avanzar"]) {
      fireEvent.click(screen.getAllByRole("button", { name: c }).find((b) => b.textContent === c)!);
    }
    press("Ejecutar programa");
    expect(text()).toContain("¡Ha llegado a la meta!");
  });
});
