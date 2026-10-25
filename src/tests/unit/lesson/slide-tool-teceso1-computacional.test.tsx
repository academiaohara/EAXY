import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ALGORITMOS, FLUJOS, NIVELES, PROGRAMAS_ERROR, PROGRAMAS_VAR, cuentaBloques, posicionesCorrectas, ramaClima, simula, type Instr } from "@/components/lesson/slide/tools/TecEso1ComputacionalTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["algoritmo-ordena-explorador", "programa-bloques-explorador", "flujo-sencillo-explorador", "variables-cajas-explorador", "condiciones-explorador", "depura-programa-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

const F: Instr = { k: "F" };
const L: Instr = { k: "L" };
const R: Instr = { k: "R" };

describe("herramientas de Tecnología 1.º ESO, tema 7: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("el simulador del robot", () => {
  it("resuelve los cuatro retos con programas de referencia", () => {
    const sol: Instr[][] = [
      [F, F, F, L, F, F],
      [{ k: "rep", n: 4, cuerpo: [F, L, F, R] }],
      [{ k: "rep", n: 12, cuerpo: [{ k: "if", si: [R], no: [F] }] }],
      [F, L, F, F, F, R, F, F, R, F, F, L, F, F, L, F, F, F],
    ];
    NIVELES.forEach((n, i) => {
      const r = simula(sol[i]!, n);
      expect(r.exito, n.n).toBe(true);
    });
    expect(cuentaBloques(sol[1]!)).toBe(5);
    expect(cuentaBloques(sol[2]!)).toBe(4);
  });

  it("detecta choques, programas vacíos y bucles que no terminan", () => {
    expect(simula([F, F, F, F, F, F], NIVELES[0]!).choque).toBe(true);
    expect(simula([], NIVELES[0]!).exito).toBe(false);
    expect(simula([{ k: "rep", n: 12, cuerpo: [{ k: "rep", n: 12, cuerpo: [{ k: "rep", n: 12, cuerpo: [L] }] }] }], NIVELES[0]!).limite).toBe(true);
  });
});

describe("resultados de las herramientas del tema 7", () => {
  it("funciones: algoritmos, clima y datos", () => {
    expect(posicionesCorrectas([0, 1, 2, 3])).toBe(4);
    expect(posicionesCorrectas([1, 0, 2, 3])).toBe(2);
    expect(ramaClima(true, 30).rama).toBe(0);
    expect(ramaClima(false, 30).rama).toBe(1);
    expect(ramaClima(false, 10).rama).toBe(2);
    expect(ALGORITMOS).toHaveLength(4);
    expect(FLUJOS).toHaveLength(3);
    expect(PROGRAMAS_VAR).toHaveLength(3);
    expect(PROGRAMAS_ERROR).toHaveLength(4);
  });

  it("algoritmo: se comprueba el orden desordenado y mejora al intercambiar", () => {
    mount("algoritmo-ordena-explorador", { n: 0 });
    fireEvent.click(screen.getByRole("button", { name: "Comprobar el orden" }));
    expect(text()).toContain("Incorrecto");
    expect(screen.getByTestId("algoritmo-pasos").children).toHaveLength(6);
  });

  it("robot: construir y ejecutar un programa (reto 1) llega a la meta", () => {
    mount("programa-bloques-explorador", { n: 0 });
    const clic = (n: string) => fireEvent.click(screen.getByRole("button", { name: n }));
    for (const b of ["Avanzar", "Avanzar", "Avanzar", "Girar a la izquierda", "Avanzar", "Avanzar"]) clic(b);
    fireEvent.click(screen.getByRole("button", { name: "Ver resultado" }));
    expect(text()).toContain("¡Meta alcanzada!");
    expect(text()).toContain("6 (programa de referencia: 6)");
  });

  it("robot: un programa vacío no llega y se puede cambiar de reto", () => {
    mount("programa-bloques-explorador", { n: 0 });
    fireEvent.click(screen.getByRole("button", { name: "Ver resultado" }));
    expect(text()).toContain("Sin programa");
    fireEvent.click(screen.getByRole("button", { name: "2. Repetir" }));
    expect(screen.getByRole("button", { name: "Repetir 2 veces" })).toBeTruthy();
  });

  it("robot: repetir añade un bloque con contador y permite añadir dentro", () => {
    mount("programa-bloques-explorador", { n: 1 });
    fireEvent.click(screen.getByRole("button", { name: "Repetir 2 veces" }));
    fireEvent.click(screen.getByRole("button", { name: /añadir dentro del bucle/ }));
    fireEvent.click(screen.getByRole("button", { name: "Avanzar" }));
    expect(screen.getByTestId("programa").textContent).toContain("Avanzar");
    fireEvent.click(screen.getByRole("button", { name: "Más repeticiones" }));
    expect(screen.getByTestId("programa").textContent).toContain("3");
  });

  it("diagrama de flujo: recorrer ¿llueve? por la rama Sí llega a Fin", () => {
    mount("flujo-sencillo-explorador", { n: 0 });
    fireEvent.click(screen.getByRole("button", { name: "Siguiente paso" }));
    fireEvent.click(screen.getByRole("button", { name: "Sí, llueve" }));
    expect(text()).toContain("Coger el paraguas");
    fireEvent.click(screen.getByRole("button", { name: "Siguiente paso" }));
    fireEvent.click(screen.getByRole("button", { name: "Siguiente paso" }));
    expect(text()).toContain("Fin");
  });

  it("diagrama de flujo: contar hasta 3 escribe 1 · 2 · 3", () => {
    mount("flujo-sencillo-explorador", { n: 2 });
    for (let i = 0; i < 20; i += 1) {
      const b = screen.getByRole("button", { name: "Siguiente paso" }) as HTMLButtonElement;
      if (b.disabled) break;
      fireEvent.click(b);
    }
    expect(text()).toContain("1 · 2 · 3");
  });

  it("variables: tras cuatro líneas, puntos vale 30", () => {
    mount("variables-cajas-explorador", { n: 0 });
    for (let i = 0; i < 4; i += 1) fireEvent.click(screen.getByRole("button", { name: "Ejecutar la siguiente línea" }));
    expect(screen.getByTestId("var-cajas").textContent).toContain("30");
  });

  it("condiciones: llueve manda sobre la temperatura", () => {
    mount("condiciones-explorador", { a: 30 });
    expect(text()).toContain("Ponerse camiseta");
    fireEvent.click(screen.getByRole("button", { name: "Sí" }));
    expect(text()).toContain("Coger el paraguas");
  });

  it("depurar: acierta la línea con el error y se explica", () => {
    mount("depura-programa-explorador", { n: 1 });
    fireEvent.click(screen.getByRole("button", { name: /1\. n = 1/ }));
    expect(text()).toContain("sigue buscando");
    fireEvent.click(screen.getByRole("button", { name: /2\. mientras n < 5:/ }));
    expect(text()).toContain("Has encontrado el error");
    expect(text()).toContain("n ≤ 5");
  });
});
