import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { SIMBOLOS, SITUACIONES, brilloLamparas, circuitoCerrado, evaluaMontaje, luceConmutadores } from "@/components/lesson/slide/tools/TecEso1ElectricidadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["conductores-aislantes-explorador", "circuito-simple-explorador", "simbolos-electricos-explorador", "control-luz-explorador", "serie-paralelo-explorador", "montaje-circuito-explorador", "seguridad-electrica-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 6: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 6", () => {
  it("funciones: circuito cerrado, conmutadores, montaje y lámparas", () => {
    expect(circuitoCerrado({ sw: true, cable: true, lamp: true, pila: true })).toBe(true);
    expect(circuitoCerrado({ sw: true, cable: true, lamp: false, pila: true })).toBe(false);
    expect(luceConmutadores(true, true)).toBe(true);
    expect(luceConmutadores(true, false)).toBe(false);
    expect(evaluaMontaje([["p+", "s1"], ["s2", "l1"], ["l2", "p-"]], true).estado).toBe("luce");
    expect(evaluaMontaje([["p+", "s1"], ["s2", "l1"], ["l2", "p-"]], false).estado).toBe("abierto");
    expect(evaluaMontaje([["p+", "p-"]], true).estado).toBe("corto");
    expect(evaluaMontaje([["p+", "s1"], ["s2", "p-"]], true).estado).toBe("corto");
    expect(evaluaMontaje([], true).estado).toBe("abierto");
    expect(brilloLamparas("serie", 3, [1]).rotas).toBe(true);
    expect(brilloLamparas("paralelo", 3, [1]).luces).toEqual([1, 0, 1]);
    expect(brilloLamparas("paralelo", 3, []).corriente).toBe(3);
    expect(SIMBOLOS).toHaveLength(8);
    expect(SITUACIONES).toHaveLength(8);
  });

  it("conductores: la moneda enciende la bombilla y la goma no", () => {
    mount("conductores-aislantes-explorador", { n: 0 });
    expect(text()).toContain("Encendida: es conductor");
    fireEvent.click(screen.getByRole("button", { name: "Goma de borrar" }));
    expect(text()).toContain("Apagada: es aislante");
  });

  it("circuito simple: con todo en su sitio lucirá al cerrar el interruptor; una avería lo apaga", () => {
    mount("circuito-simple-explorador");
    expect(text()).toContain("Abierto");
    fireEvent.click(screen.getByRole("button", { name: "Cerrado" }));
    expect(text()).toContain("Cerrado: circula corriente");
    fireEvent.click(screen.getByRole("button", { name: "Fundida" }));
    expect(text()).toContain("la bombilla está fundida");
  });

  it("símbolos: el modo repaso oculta el nombre hasta pulsar", () => {
    mount("simbolos-electricos-explorador", { n: 0 });
    expect(screen.getByTestId("simbolo-detalle").textContent).toContain("Pila");
    fireEvent.click(screen.getByRole("button", { name: /Ocultar nombre/ }));
    expect(screen.getByTestId("simbolo-detalle").textContent).not.toContain("Pila (generador)");
    fireEvent.click(screen.getByRole("button", { name: /Mostrar nombre/ }));
    expect(screen.getByTestId("simbolo-detalle").textContent).toContain("Pila (generador)");
  });

  it("control: el interruptor mantiene la luz y el pulsador solo mientras se pulsa", () => {
    mount("control-luz-explorador", { n: 0 });
    fireEvent.click(screen.getByRole("button", { name: /Cerrar el interruptor/ }));
    expect(text()).toContain("Encendida");
    fireEvent.click(screen.getByRole("button", { name: "Pulsador" }));
    const b = screen.getByRole("button", { name: /Mantén pulsado/ });
    expect(text()).toContain("Apagada");
    fireEvent.mouseDown(b);
    expect(text()).toContain("Encendida");
    fireEvent.mouseUp(b);
    expect(text()).toContain("Apagada");
    fireEvent.click(screen.getByRole("button", { name: "Dos conmutadores" }));
    expect(text()).toContain("Encendida");
    fireEvent.click(screen.getByRole("button", { name: /entrada/ }));
    expect(text()).toContain("Apagada");
  });

  it("serie y paralelo: en serie quitar una apaga todas; en paralelo, solo esa", () => {
    mount("serie-paralelo-explorador", { n: 0, a: 3 });
    expect(text()).toContain("3 de 3");
    fireEvent.click(screen.getByRole("button", { name: "Quitar la lámpara 2" }));
    expect(text()).toContain("0 de 3");
    fireEvent.click(screen.getByRole("button", { name: "En paralelo" }));
    fireEvent.click(screen.getByRole("button", { name: "Quitar la lámpara 2" }));
    expect(text()).toContain("2 de 3");
  });

  it("montaje: unir los terminales con cables enciende la lámpara y unir los polos da cortocircuito", () => {
    mount("montaje-circuito-explorador");
    const t = (n: string) => screen.getByRole("button", { name: `Terminal ${n}` });
    const une = (a: string, b: string) => {
      fireEvent.click(t(a));
      fireEvent.click(t(b));
    };
    expect(text()).toContain("Circuito abierto");
    une("Pila +", "Interruptor A");
    une("Interruptor B", "Lámpara A");
    une("Lámpara B", "Pila −");
    expect(text()).toContain("Funciona");
    une("Pila +", "Pila −");
    expect(text()).toContain("Cortocircuito");
  });

  it("seguridad: acierta y falla con la explicación correspondiente", () => {
    mount("seguridad-electrica-explorador");
    expect(screen.getByTestId("situacion-actual").textContent).toContain("bombilla");
    fireEvent.click(screen.getByRole("button", { name: "Es peligroso" }));
    expect(text()).toContain("¡Correcto!");
    fireEvent.click(screen.getByRole("button", { name: "Es peligroso" }));
    expect(text()).toContain("Ojo:");
  });
});
