import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PELIGROS, RESIDUOS, estadoPlastico, puntuaciones } from "@/components/lesson/slide/tools/TecEso1MaterialesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "ensayo-material-explorador",
  "materiales-propiedades-explorador",
  "madera-derivados-explorador",
  "metales-prueba-explorador",
  "plastico-calor-explorador",
  "seleccion-material-eso-explorador",
  "taller-peligros-explorador",
  "contenedores-reciclaje-explorador",
];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 3: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 3", () => {
  it("funciones: estado de los plásticos y ranking de materiales", () => {
    expect(estadoPlastico(0, 20).estado).toBe("Rígido");
    expect(estadoPlastico(0, 120).moldeable).toBe(true);
    expect(estadoPlastico(0, 200).estado).toBe("Fundido");
    expect(estadoPlastico(1, 250).estado).toContain("carboniza");
    expect(estadoPlastico(2, 50).estado).toContain("Elástico");
    expect(puntuaciones([5, 0, 0, 0])[0]!.n).toBe("Acero");
    expect(puntuaciones([0, 5, 0, 0])[0]!.n).toMatch(/Plástico/);
    expect(PELIGROS).toHaveLength(6);
    expect(RESIDUOS.length).toBeGreaterThanOrEqual(10);
  });

  it("ensayo: el imán atrae el acero y cuenta las pruebas", () => {
    mount("ensayo-material-explorador", { n: 1 });
    fireEvent.click(screen.getByRole("button", { name: "Imán" }));
    expect(screen.getByTestId("ensayo-resultado").textContent).toContain("lo atrae");
    expect(text()).toContain("1 de 5");
  });

  it("metales: el imán atrae el acero y no el cobre; el hierro se oxida más que el aluminio", () => {
    mount("metales-prueba-explorador", { n: 1, a: 100 });
    fireEvent.click(screen.getByRole("button", { name: "Acercar el imán" }));
    expect(text()).toContain("Lo atrae");
    expect(text()).toContain("80 %");
    fireEvent.click(screen.getByRole("button", { name: "Cobre" }));
    expect(text()).toContain("No lo atrae");
  });

  it("plástico: el termoplástico a 120 °C es moldeable; el termoestable no", () => {
    mount("plastico-calor-explorador", { n: 0, a: 120 });
    expect(text()).toContain("moldear");
    fireEvent.click(screen.getByRole("button", { name: "Termoestable" }));
    expect(text()).toContain("No");
  });

  it("selección: con la resistencia como criterio gana el acero", () => {
    mount("seleccion-material-eso-explorador", { n: 3 });
    expect(screen.getByTestId("seleccion-ranking").textContent).toContain("1. Acero");
  });

  it("taller: se localizan los peligros al pulsarlos", () => {
    mount("taller-peligros-explorador");
    expect(text()).toContain("0 de 6");
    fireEvent.click(screen.getByRole("button", { name: /Peligro 1/ }));
    expect(text()).toContain("1 de 6");
    expect(screen.getByTestId("peligro-detalle").textContent).toContain("Pelo largo");
  });

  it("contenedores: un acierto y un fallo", () => {
    mount("contenedores-reciclaje-explorador");
    expect(screen.getByTestId("residuo-actual").textContent).toContain("Botella de agua");
    fireEvent.click(screen.getByRole("button", { name: "Amarillo" }));
    expect(text()).toContain("Correcto");
    fireEvent.click(screen.getByRole("button", { name: "Verde" }));
    expect(text()).toContain("Lata de refresco");
    expect(text()).toContain("No:");
  });

  it("propiedades: el acero tiene 7 850 kg/m³", () => {
    mount("materiales-propiedades-explorador", { a: 0, b: 3 });
    expect(text()).toContain("7 850");
  });

  it("tableros: el contrachapado tiene las fibras cruzadas", () => {
    mount("madera-derivados-explorador", { n: 1 });
    expect(text()).toContain("fibras cruzadas");
  });
});
