import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ESCALAS, enDibujo, vistasDe } from "@/components/lesson/slide/tools/TecEso1GraficaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["trazados-basicos-explorador", "acotacion-explorador", "escala-dibujo-explorador", "vistas-pieza-explorador", "perspectiva-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 2: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 2", () => {
  it("funciones: escala y vistas de una pieza", () => {
    expect(enDibujo(6000, 1 / 50)).toBeCloseTo(120, 6);
    expect(enDibujo(25, 2)).toBe(50);
    expect(ESCALAS).toHaveLength(8);
    const v = vistasDe([2, 2, 2, 1, 0, 0, 1, 0, 0]);
    expect(v.planta.size).toBe(5);
    expect(v.alzado.size).toBe(6);
    expect(v.perfil.size).toBe(4);
  });

  it("escala: 6 m a 1:50 son 120 mm y caben en un A4; a 1:1 no caben", () => {
    mount("escala-dibujo-explorador", { n: 4, a: 6000 });
    expect(text()).toContain("120 mm");
    expect(text()).toContain("Cabe");
    fireEvent.click(screen.getByRole("button", { name: "1:1" }));
    expect(text()).toContain("No cabe");
  });

  it("acotación: sin acotar falta información; mal acotada avisa de las cotas repetidas", () => {
    mount("acotacion-explorador");
    expect(text()).toContain("Acotación correcta");
    fireEvent.click(screen.getByRole("button", { name: "Sin acotar" }));
    expect(text()).toContain("faltan medidas");
    fireEvent.click(screen.getByRole("button", { name: "Mal acotada" }));
    expect(text()).toContain("repetidas");
  });

  it("vistas: la pieza en L tiene 8 cubos y al pulsar una casilla cambia el total", () => {
    mount("vistas-pieza-explorador", { n: 0 });
    expect(text()).toContain("8");
    const casilla = screen.getByRole("button", { name: /Casilla 3-3: 0 cubos/ });
    fireEvent.click(casilla);
    expect(screen.getByRole("button", { name: /Casilla 3-3: 1 cubos/ })).toBeTruthy();
  });

  it("perspectiva: en caballera el fondo se dibuja a la mitad y en isométrica al completo", () => {
    mount("perspectiva-explorador", { n: 0, c: 60 });
    expect(text()).toContain("30 mm");
    fireEvent.click(screen.getByRole("button", { name: "Isométrica" }));
    expect(text()).toContain("60 mm (×1)");
  });

  it("trazados: cambia de trazado y muestra su explicación", () => {
    mount("trazados-basicos-explorador");
    expect(text()).toContain("0° (paralelas)");
    fireEvent.click(screen.getByRole("button", { name: "Mediatriz de un segmento" }));
    expect(text()).toContain("corta por la mitad");
  });
});
