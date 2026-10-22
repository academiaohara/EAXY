import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { RTP_ESPANA } from "@/components/lesson/slide/tools/MaterialesTools";
import { SERIE_FEM } from "@/components/lesson/slide/tools/TratamientosTools";
import { tttResult } from "@/components/lesson/anim/scenes/industrial/ttt";
import type { SlideToolId } from "@/lib/lesson/types";

const INDUSTRIAL_TOOLS: SlideToolId[] = [
  "aleacion-concentracion",
  "energia-fusion",
  "gibbs-explorador",
  "diagrama-binario",
  "diagrama-eutectico",
  "fe-c-explorador",
  "acero-clasificador",
  "resistencia-especifica",
  "pieza-peso-minimo",
  "aleaciones-filtro",
  "grieta-griffith",
  "grado-polimerizacion",
  "rtp-comunidades",
  "intersticio-red",
  "dureza-martensita",
  "ttt-explorador",
  "jominy-explorador",
  "temperaturas-tratamiento",
  "perfil-dureza",
  "pila-electroquimica",
  "nernst-explorador",
  "faraday-explorador",
  "recubrimiento-rayado",
  "pilling-bedworth",
  "conversor-industrial",
  "plano-inclinado-trabajo",
  "resorte-explorador",
  "energia-rampa",
  "momento-inercia",
  "equilibrio-termico",
  "primer-principio-explorador",
  "rendimiento-cadena",
  "potencia-vehiculo",
  "par-trabajo-explorador",
  "diagrama-pv",
  "potencia-electrica-hidraulica",
];

const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const text = () => screen.getByTestId("lesson-tool").textContent ?? "";

describe("herramientas de Tecnología Industrial II: valores extremos", () => {
  it.each(INDUSTRIAL_TOOLS)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
    expect(screen.getByTestId("lesson-tool")).toBeInTheDocument();
  });

  it.each(INDUSTRIAL_TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });

  it.each(INDUSTRIAL_TOOLS)("%s se monta con parámetros negativos o cero", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del libro", () => {
  it("Cu-Ni: el punto B da C_L = 32 %, C_α = 43 % y W_L = 0,73", () => {
    render(<SlideTool block={{ kind: "tool", tool: "diagrama-binario", params: { a: 35, b: 1250 } }} />);
    expect(text()).toContain("C(L) = 32 %");
    expect(text()).toContain("C(α) = 43 %");
    expect(text()).toContain("W(L) = 0,73");
  });

  it("Fe-C: un acero de 0,5 % de C a temperatura ambiente tiene un 56 % de perlita", () => {
    render(<SlideTool block={{ kind: "tool", tool: "fe-c-explorador", params: { a: 0.5, b: 600 } }} />);
    expect(text()).toContain("Perlita 56 %");
  });

  it("concentración: 85 kg de Co en 1 tm da el 7,8 %", () => {
    render(<SlideTool block={{ kind: "tool", tool: "aleacion-concentracion", params: { a: 85, b: 1000 } }} />);
    expect(text()).toContain("7,83 %");
  });

  it("pieza de peso mínimo: el aluminio gana con 50 kN y 300 mm", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pieza-peso-minimo", params: { a: 50, b: 300 } }} />);
    expect(text()).toContain("Aluminio · 147 g");
  });

  it("Griffith: con 2 mm y r = 10⁻⁴ mm el factor es 283", () => {
    render(<SlideTool block={{ kind: "tool", tool: "grieta-griffith", params: { a: 2, b: 4 } }} />);
    expect(text()).toContain("= 283");
  });

  it("grado de polimerización: polietileno con n = 5 350 da 149 800", () => {
    render(<SlideTool block={{ kind: "tool", tool: "grado-polimerizacion", params: { a: 0, b: 5350 } }} />);
    expect(text()).toMatch(/149.800/);
  });

  it("RTP: la tabla del libro suma 1 807 573 t/año a escala nacional", () => {
    const total = RTP_ESPANA.reduce((a, c) => a + c.v.reduce((x, y) => x + y, 0), 0);
    expect(total).toBe(1_807_573);
    render(<SlideTool block={{ kind: "tool", tool: "rtp-comunidades", params: { a: 8 } }} />);
    press("Total nacional");
    expect(text()).toMatch(/1.807.573 t\/año/);
  });

  it("Pilling-Bedworth: R = 1,28 para el aluminio", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pilling-bedworth", params: { a: 1 } }} />);
    expect(text()).toContain("1,28");
    expect(text()).toContain("Capa protectora");
    press(/Fe → Fe₂O₃/);
    expect(text()).toContain("Se agrieta y se desprende");
    press(/Mg → MgO/);
    expect(text()).toContain("Capa porosa");
  });

  it("pila hierro-cobre: ΔU = 0,78 V y el hierro es el ánodo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pila-electroquimica", params: { a: 4, b: 8 } }} />);
    expect(text()).toContain("ΔU = 0,78 V");
    expect(text()).toContain("Hierro");
  });

  it("serie fem: ordenada de menor a mayor potencial", () => {
    const us = SERIE_FEM.map((m) => m.u);
    expect([...us].sort((a, b) => a - b)).toEqual(us);
  });

  it("Nernst: Sn 0,5 M / Pb 0,001 M invierte el sentido (ΔU ≈ −0,07 V)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "nernst-explorador", params: { a: 6, b: 7, c: 0 } }} />);
    press(/Sn 0,5 M/);
    expect(text()).toContain("-0,07");
    expect(text()).toContain("se invierte");
  });

  it("Faraday: 10 A durante 1 h depositan 12,2 g de Zn", () => {
    render(<SlideTool block={{ kind: "tool", tool: "faraday-explorador", params: { a: 0, b: 10, c: 60 } }} />);
    expect(text()).toContain("12,2 g");
  });

  it("recubrimiento rayado: el cinc protege al acero y el estaño no", () => {
    render(<SlideTool block={{ kind: "tool", tool: "recubrimiento-rayado", params: { a: 2 } }} />);
    expect(text()).toContain("el acero queda protegido");
    press("Sn");
    expect(text()).toContain("El acero (a través de la rayadura)");
  });

  it("plano inclinado: W = 941 J para 120 kg a 0,8 m, con cualquier rampa", () => {
    render(<SlideTool block={{ kind: "tool", tool: "plano-inclinado-trabajo", params: { a: 120, b: 0.8, c: 6 } }} />);
    expect(text()).toContain("W = 941 J");
    fireEvent.change(screen.getByLabelText(/Longitud horizontal/), { target: { value: "3" } });
    expect(text()).toContain("W = 941 J");
  });

  it("resorte: W = ½ k x² = 1 J con k = 200 y x = 0,1", () => {
    render(<SlideTool block={{ kind: "tool", tool: "resorte-explorador", params: { a: 200, b: 0.1 } }} />);
    expect(text()).toContain("W = ½·k·x² = 1 J");
  });

  it("diagrama p–V: la isoterma de 4 bar·L al doble de volumen da 277 J", () => {
    render(<SlideTool block={{ kind: "tool", tool: "diagrama-pv", params: { a: 4, b: 1, c: 2 } }} />);
    expect(text()).toContain("W = 277 J");
  });

  it("rendimiento en serie: 30·95·90·80·96 % = 19,7 %", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rendimiento-cadena", params: { a: 10 } }} />);
    expect(text()).toContain("η = 19,7 %");
  });

  it("presa de 80 m con 1 m³/s: 784 kW", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-electrica-hidraulica", params: { c: 1 } }} />);
    expect(text()).toMatch(/P = p·Q = 784 kW/);
  });

  it("par en la rueda: 500 N·m, 0,5 m y 1 000 m dan 4 000 rad", () => {
    render(<SlideTool block={{ kind: "tool", tool: "par-trabajo-explorador", params: { a: 500, b: 0.5, c: 1000 } }} />);
    expect(text()).toMatch(/θ = 4.000 rad/);
  });

  it("conversor: 6 kp/cm² son 588 000 Pa", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conversor-industrial", params: { a: 0 } }} />);
    expect(text()).toMatch(/588.000/);
  });

  it("momento de inercia: disco de 2 kg y 0,2 m → 0,04 kg·m²", () => {
    render(<SlideTool block={{ kind: "tool", tool: "momento-inercia", params: { a: 1, b: 2, c: 0.2 } }} />);
    press(/Cilindro o disco/);
    expect(text()).toContain("I = 0,04 kg·m²");
  });

  it("equilibrio térmico: acero de 23 kg a 817 °C en 400 kg de agua a 25 °C da 30 °C (el agua sube 5 °C)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "equilibrio-termico", params: { a: 0, b: 23, c: 817 } }} />);
    expect(text()).toContain("Temperatura final de equilibrio30 °C");
  });
});

describe("curvas TTT", () => {
  it("el enfriamiento lento da perlita gruesa; el medio, perlita fina y bainita; el rápido, martensita", () => {
    expect(tttResult(21.4).name).toBe("Perlita gruesa");
    expect(tttResult(155).name).toBe("Perlita fina + bainita");
    expect(tttResult(500).name).toBe("Martensita (100 %)");
  });

  it("el explorador muestra el resultado de cada atajo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ttt-explorador", params: { a: 50 } }} />);
    press("Temple en agua");
    expect(text()).toContain("Martensita (100 %)");
    press(/Recocido/);
    expect(text()).toContain("Perlita gruesa");
  });
});
