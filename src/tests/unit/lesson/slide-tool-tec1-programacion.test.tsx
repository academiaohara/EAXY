import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PROGRAMAS, EJERCICIOS_TEST, bytesAudio, bytesImagen, codificarTexto, fmtBytes, permisosOctal, usoRecursos } from "@/components/lesson/slide/tools/Tec1ProgramacionTools";
import { callPython, pyRepr, runPython } from "@/lib/lesson/mini-python";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "ordenador-componentes-explorador",
  "procesos-memoria-explorador",
  "permisos-archivos-explorador",
  "texto-binario-explorador",
  "tamano-archivo-explorador",
  "diagrama-flujo-explorador",
  "python-traza-explorador",
  "tests-automaticos-explorador",
];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const press = (name: string | RegExp, i = 0) => fireEvent.click(screen.getAllByRole("button", { name })[i]!);

describe("herramientas de Tecnología e Ingeniería I, tema 5: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
  it.each([0, 1, 2, 3])("el diagrama de flujo %i se monta", (n) => {
    expect(() => mount("diagrama-flujo-explorador", { n })).not.toThrow();
  });
});

describe("funciones de cálculo del tema 5", () => {
  it("tamaños de imagen y audio", () => {
    expect(bytesImagen(1920, 1080, 24, 1)).toBe(6220800);
    expect(bytesAudio(44100, 16, 2, 180, 1)).toBe(31752000);
    expect(fmtBytes(6220800)).toBe("5,9 MB");
    expect(fmtBytes(512)).toBe("512 B");
  });
  it("permisos en octal", () => {
    expect(permisosOctal([true, true, true, true, false, true, true, false, true])).toBe("755");
    expect(permisosOctal([true, true, false, true, false, false, false, false, false])).toBe("640");
  });
  it("UTF-8: 'a' ocupa 1 byte y 'ñ' 2", () => {
    expect(codificarTexto("añ").map((c) => c.bytes.length)).toEqual([1, 2]);
  });
  it("uso de recursos: sistema + navegador con 4 pestañas + editor", () => {
    const r = usoRecursos(["nav", "ide"], 4);
    expect(r.ram).toBeCloseTo(3.5, 6);
    expect(r.cpu).toBe(20);
  });
  it("todos los programas de ejemplo se ejecutan, salvo el de error de sintaxis a propósito", () => {
    for (const p of PROGRAMAS) {
      const r = runPython(p.code);
      if (p.titulo.includes("sintaxis")) expect(r.error?.kind).toBe("SyntaxError");
      else if (p.titulo.includes("Tipos")) expect(r.error).toBeUndefined();
      else expect(r.error, p.titulo).toBeUndefined();
    }
    expect(runPython(PROGRAMAS[0]!.code).output).toEqual(["Área: 78.53975", "Perímetro: 31.42"]);
    expect(runPython(PROGRAMAS[5]!.code).output).toEqual(["Media: 5.6"]);
    expect(runPython(PROGRAMAS[4]!.code).output).toEqual(["22"]);
  });
  it("ejercicios de pruebas: el código inicial falla donde debe", () => {
    const pasan = (i: number) => EJERCICIOS_TEST[i]!.tests.filter((t) => pyRepr(callPython(EJERCICIOS_TEST[i]!.code, EJERCICIOS_TEST[i]!.fn, t.args).value ?? null) === t.esperado).length;
    expect(pasan(0)).toBe(3);
    expect(pasan(1)).toBe(0);
    expect(pasan(2)).toBe(3);
    expect(pasan(3)).toBe(4);
  });
});

describe("resultados de las herramientas del tema 5", () => {
  it("ordenador: detalle de la RAM y recorrido de un dato", () => {
    const { unmount } = mount("ordenador-componentes-explorador");
    press("Memoria RAM");
    expect(screen.getByTestId("pieza-detalle").textContent).toContain("volátil");
    unmount();
    mount("ordenador-componentes-explorador", { n: 1 });
    expect(text()).toContain("1 de 7");
    press("Paso siguiente");
    expect(text()).toContain("2 de 7");
  });

  it("procesos: 3,5 GB y 20 % con la configuración inicial y memoria virtual al abrir el juego en 4 GB", () => {
    const { unmount } = mount("procesos-memoria-explorador");
    expect(text()).toContain("3,5 / 8 GB");
    expect(text()).toContain("20 %");
    unmount();
    mount("procesos-memoria-explorador", { a: 4 });
    press("Abierto", 3);
    expect(text()).toContain("memoria virtual");
  });

  it("permisos: 640 de partida y 644 al dar lectura a otros", () => {
    mount("permisos-archivos-explorador");
    expect(text()).toContain("chmod 640 archivo");
    expect(text()).toContain("-rw-r-----");
    fireEvent.click(screen.getByLabelText("otros leer"));
    expect(text()).toContain("chmod 644 archivo");
  });

  it("texto: «Hola» son 4 bytes y «ñ» 2", () => {
    mount("texto-binario-explorador");
    expect(text()).toContain("4 bytes = 32 bits");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ñ" } });
    expect(text()).toContain("2 bytes = 16 bits");
  });

  it("tamaño: Full HD a 24 bits son 5,9 MB y 3 min de audio estéreo 30,3 MB", () => {
    const { unmount } = mount("tamano-archivo-explorador");
    expect(text()).toContain("5,9 MB");
    expect(text()).toContain("6 220 800");
    unmount();
    mount("tamano-archivo-explorador", { n: 1 });
    expect(text()).toContain("30,3 MB");
  });

  it("diagramas de flujo: aprobado, suma de 1 a N y mayor de tres", () => {
    const a = mount("diagrama-flujo-explorador", { n: 0 });
    press("Ejecutar hasta el final");
    expect(text()).toContain("Aprobado");
    fireEvent.change(screen.getByRole("slider"), { target: { value: "3" } });
    press("Ejecutar hasta el final");
    expect(text()).toContain("Suspenso");
    a.unmount();
    const b = mount("diagrama-flujo-explorador", { n: 1 });
    press("Ejecutar hasta el final");
    expect(text()).toContain("suma = 10");
    b.unmount();
    mount("diagrama-flujo-explorador", { n: 2 });
    press("Ejecutar hasta el final");
    expect(text()).toContain("el mayor es 12");
  });

  it("Python: ejecución paso a paso del programa de la media", () => {
    mount("python-traza-explorador", { n: 5 });
    press("Ejecutar paso a paso");
    expect(text()).toContain("Paso1 de 14");
    for (let k = 0; k < 40; k += 1) {
      const next = screen.getByRole("button", { name: "Paso siguiente" }) as HTMLButtonElement;
      if (next.disabled) break;
      fireEvent.click(next);
    }
    expect(screen.getByTestId("python-salida").textContent).toContain("Media: 5.6");
  });

  it("Python: el error de sintaxis se muestra con su línea", () => {
    mount("python-traza-explorador", { n: 6 });
    press("Ejecutar paso a paso");
    expect(screen.getByTestId("python-error").textContent).toContain("SyntaxError");
    expect(screen.getByTestId("python-error").textContent).toContain("línea 2");
  });

  it("Python: los puntos de interrupción saltan a la línea marcada", () => {
    mount("python-traza-explorador", { n: 2 });
    press("Ejecutar paso a paso");
    press(/Punto de interrupción en la línea 5/);
    press("Continuar hasta el punto de interrupción");
    expect(screen.getByTestId("python-lineas").querySelector('[data-activa="si"]')?.textContent).toContain("print");
  });

  it("pruebas automáticas: 3 de 4, 0 de 4, y corregir el código da 4 de 4", () => {
    const a = mount("tests-automaticos-explorador", { n: 0 });
    press("Ejecutar pruebas");
    expect(text()).toContain("3 de 4");
    a.unmount();
    mount("tests-automaticos-explorador", { n: 1 });
    press("Ejecutar pruebas");
    expect(text()).toContain("0 de 4");
    fireEvent.change(screen.getByLabelText("Código de la función"), { target: { value: "def es_par(n):\n    return n % 2 == 0\n" } });
    press("Ejecutar pruebas");
    expect(text()).toContain("4 de 4");
  });
});
