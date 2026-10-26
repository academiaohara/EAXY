import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { SET_SITUACIONES, buscar, combinaciones, licenciaCC, legible, ocupadoMB, segundosDescarga, sobrevive, tiempoAtaque } from "@/components/lesson/slide/tools/TecEso1DigitalTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dispositivo-componentes-explorador", "diagnostico-tecnico-explorador", "capacidad-almacenamiento-explorador", "copia-seguridad-explorador", "tiempo-descarga-explorador", "busqueda-operadores-explorador", "contrasena-fortaleza-explorador", "situaciones-digitales-explorador", "licencias-cc-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 9: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 9", () => {
  it("funciones: almacenamiento, descarga, copias, contraseñas, búsqueda y licencias", () => {
    expect(ocupadoMB(500, 200, 20, 30)).toBe(11000);
    expect(segundosDescarga(100, 80)).toBe(10);
    expect(legible(0.2)).toBe("menos de 1 segundo");
    expect(legible(90)).toBe("1,5 min");
    expect(sobrevive([0])).toEqual([false, false, false, false, false]);
    expect(sobrevive([0, 1, 2, 3]).every(Boolean)).toBe(true);
    expect(sobrevive([0, 2])).toEqual([true, true, true, false, false]);
    expect(combinaciones(26, 4)).toBe(456976);
    expect(tiempoAtaque(456976)).toBe("al instante");
    expect(tiempoAtaque(combinaciones(94, 16))).toBe("miles de millones de años");
    expect(buscar({ texto: "energía solar", exacta: false, excluir: "", sitio: "cualquiera", tipo: "cualquiera" }).length).toBeGreaterThan(2);
    expect(buscar({ texto: "energía solar", exacta: false, excluir: "comprar", sitio: "gob", tipo: "pdf" })).toHaveLength(2);
    expect(licenciaCC(true, "si").codigo).toBe("CC BY");
    expect(licenciaCC(false, "igual").codigo).toBe("CC BY-NC-SA");
    expect(licenciaCC(false, "no").codigo).toBe("CC BY-NC-ND");
    expect(SET_SITUACIONES).toHaveLength(3);
  });

  it("componentes: la RAM es hardware y el sistema operativo, software", () => {
    mount("dispositivo-componentes-explorador", { n: 0 });
    fireEvent.click(screen.getByRole("button", { name: "Memoria RAM" }));
    expect(screen.getByTestId("pieza-detalle").textContent).toContain("Hardware");
    fireEvent.click(screen.getByRole("button", { name: "Sistema operativo" }));
    expect(screen.getByTestId("pieza-detalle").textContent).toContain("Software");
  });

  it("diagnóstico: comprobar hasta encontrar la causa", () => {
    mount("diagnostico-tecnico-explorador", { n: 0 });
    const b = () => screen.getAllByRole("button", { name: "Comprobar" });
    fireEvent.click(b()[0]!);
    expect(text()).toContain("Aún sin localizar");
    fireEvent.click(b()[0]!);
    fireEvent.click(b()[0]!);
    expect(text()).toContain("Encontrada");
    expect(text()).toContain("fuente de alimentación");
  });

  it("almacenamiento: 11 GB caben en un móvil de 128 GB", () => {
    mount("capacidad-almacenamiento-explorador", { n: 1 });
    expect(text()).toContain("11 GB");
    expect(text()).toContain("Caben");
  });

  it("copias: sin copias nada sobrevive; con la copia fuera de casa se salvan todos", () => {
    mount("copia-seguridad-explorador");
    expect(text()).toContain("0 de 5");
    fireEvent.click(screen.getByRole("button", { name: /disco en casa de un familiar/ }));
    expect(text()).toContain("5 de 5");
  });

  it("descarga: 500 MB a 100 Mb/s son 40 s", () => {
    mount("tiempo-descarga-explorador", { n: 3, a: 500 });
    expect(text()).toContain("40 s");
  });

  it("búsqueda: los filtros reducen los resultados", () => {
    mount("busqueda-operadores-explorador");
    const antes = screen.getByTestId("resultados-busqueda").children.length;
    fireEvent.click(screen.getByRole("button", { name: /Institucional/ }));
    expect(screen.getByTestId("resultados-busqueda").children.length).toBeLessThan(antes);
  });

  it("contraseña: 6 minúsculas se adivinan al instante y 16 caracteres variados son fuertes", () => {
    mount("contrasena-fortaleza-explorador", { a: 6 });
    expect(text()).toContain("Débil");
    fireEvent.click(screen.getByRole("button", { name: /MAYÚSCULAS/ }));
    fireEvent.click(screen.getByRole("button", { name: /números/ }));
    fireEvent.click(screen.getByRole("button", { name: /símbolos/ }));
    fireEvent.change(screen.getByRole("slider"), { target: { value: "16" } });
    expect(text()).toContain("Fuerte");
  });

  it("situaciones: acierta el phishing y la explicación aparece", () => {
    mount("situaciones-digitales-explorador", { n: 0 });
    fireEvent.click(screen.getByRole("button", { name: "Parece un fraude" }));
    expect(text()).toContain("¡Correcto!");
  });

  it("licencias: cambia el código según lo que se permita", () => {
    mount("licencias-cc-explorador");
    expect(screen.getByTestId("licencia").textContent).toContain("CC BY");
    fireEvent.click(screen.getAllByRole("button", { name: "No" })[0]!);
    expect(screen.getByTestId("licencia").textContent).toContain("CC BY-NC");
  });
});
