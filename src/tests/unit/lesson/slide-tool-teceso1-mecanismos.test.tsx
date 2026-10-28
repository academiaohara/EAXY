import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PINONES, PLATOS, avancePorPedalada, fuerzaAparejo, fuerzaPalanca, fuerzaRuedaEje, relacionTren, rpmConducida } from "@/components/lesson/slide/tools/TecEso1MecanismosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["movimientos-explorador", "palanca-equilibrio-explorador", "poleas-aparejo-explorador", "rueda-eje-explorador", "engranajes-eso-explorador", "tren-engranajes-explorador", "bici-marchas-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 5: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 5", () => {
  it("funciones: palanca, polea, rueda y eje, engranajes, tren y bicicleta", () => {
    expect(fuerzaPalanca(80, 0.5, 2)).toBe(20);
    expect(fuerzaAparejo(200, 4)).toBe(50);
    expect(fuerzaAparejo(90, 2)).toBe(45);
    expect(fuerzaRuedaEje(60, 10, 30)).toBe(20);
    expect(rpmConducida(120, 12, 36)).toBe(40);
    expect(relacionTren([12, 36, 12, 36])).toBeCloseTo(1 / 9, 6);
    expect(avancePorPedalada(48, 12)).toBeCloseTo(8.42, 1);
    expect(PLATOS).toHaveLength(3);
    expect(PINONES).toHaveLength(8);
  });

  it("movimientos: cambia de movimiento y muestra su descripción", () => {
    mount("movimientos-explorador", { n: 0 });
    expect(text()).toContain("línea recta");
    fireEvent.click(screen.getByRole("button", { name: "Circular" }));
    expect(text()).toContain("alrededor de un eje");
  });

  it("palanca: R·dR = 1 200 y la fuerza que equilibra es 20 kg", () => {
    mount("palanca-equilibrio-explorador", { a: 30, b: 40 });
    expect(text()).toContain("1 200 kg·cm");
    expect(text()).toContain("20 kg");
    expect(text()).toContain("Equilibrio");
  });

  it("poleas: con 4 cuerdas la fuerza es la cuarta parte y se recoge 4 veces la altura", () => {
    mount("poleas-aparejo-explorador", { n: 4, a: 200 });
    expect(text()).toContain("50 kg");
    expect(text()).toContain("8 m");
    expect(text()).toContain("Polipasto");
  });

  it("rueda y eje: ventaja 6 y 10 kg para una carga de 60 kg", () => {
    mount("rueda-eje-explorador", { a: 30, b: 5 });
    expect(text()).toContain("6");
    expect(text()).toContain("10 kg");
  });

  it("engranajes: z₁=10, z₂=20 a 60 rpm da 30 rpm y es un reductor; la correa gira en el mismo sentido", () => {
    mount("engranajes-eso-explorador", { n: 0, a: 10, b: 20 });
    expect(text()).toContain("30 rpm");
    expect(text()).toContain("Reductor");
    expect(text()).toContain("Contrario");
    fireEvent.click(screen.getByRole("button", { name: "Poleas con correa" }));
    expect(text()).toContain("mismo (correa abierta)");
  });

  it("tren: dos reducciones de 1/3 dan 0,11 y 900 rpm bajan a 100", () => {
    mount("tren-engranajes-explorador", { a: 900 });
    expect(text()).toContain("0,11");
    expect(text()).toContain("100 rpm");
  });

  it("bicicleta: plato 38 y piñón 21 avanzan 3,8 m por pedalada", () => {
    mount("bici-marchas-explorador", { n: 1, a: 4 });
    expect(text()).toContain("3,8 m");
  });
});
