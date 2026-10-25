import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de probabilidad de 1.º de Bachillerato", () => {
  it("sucesos-venn-explorador: par ∪ múltiplo de 3 = {2, 3, 4, 6}", () => {
    show("sucesos-venn-explorador", [0, 2, 0]);
    expect(screen.getByTestId("tool-sv-resultado")).toHaveTextContent("A ∪ B = {2, 3, 4, 6}");
    expect(screen.getByTestId("tool-sv-resultado")).toHaveTextContent("P = 2/3");
    expect(screen.getByTestId("tool-sv-compat")).toHaveTextContent("compatibles: A ∩ B = {6}");
  });

  it("sucesos-venn-explorador: intersección, diferencia, contrario y De Morgan", () => {
    const exp: [number[], string][] = [
      [[0, 2, 1], "A ∩ B = {6}"],
      [[0, 2, 2], "A − B = {2, 4}"],
      [[0, 2, 3], "Aᶜ = {1, 3, 5}"],
      [[0, 2, 4], "(A ∪ B)ᶜ = {1, 5}"],
      [[0, 2, 5], "Aᶜ ∩ Bᶜ = {1, 5}"],
    ];
    for (const [ini, t] of exp) {
      const { unmount } = show("sucesos-venn-explorador", ini);
      expect(screen.getByTestId("tool-sv-resultado")).toHaveTextContent(t);
      unmount();
    }
  });

  it("sucesos-venn-explorador: menor que 3 y múltiplo de 3 son incompatibles", () => {
    show("sucesos-venn-explorador", [3, 2, 1]);
    expect(screen.getByTestId("tool-sv-compat")).toHaveTextContent("incompatibles");
    expect(screen.getByTestId("tool-sv-resultado")).toHaveTextContent("∅");
  });

  it("prob-union-explorador: P(A) = 40 %, P(B) = 25 %, P(A ∩ B) = 10 % → P(A ∪ B) = 55 %", () => {
    show("prob-union-explorador", [40, 25, 10]);
    expect(screen.getByTestId("tool-pu-union")).toHaveTextContent("55 %");
    expect(screen.getByTestId("tool-pu-condicionadas")).toHaveTextContent("P(A | B) = 40 %");
    expect(screen.getByTestId("tool-pu-tipo")).toHaveTextContent("Independientes");
  });

  it("prob-union-explorador: incompatibles y dependientes", () => {
    show("prob-union-explorador", [30, 20, 0]);
    expect(screen.getByTestId("tool-pu-tipo")).toHaveTextContent("Incompatibles");
    const b = show("prob-union-explorador", [50, 50, 40]);
    expect(screen.getAllByTestId("tool-pu-tipo").at(-1)).toHaveTextContent("Dependientes");
    b.unmount();
  });

  it("prob-union-explorador: acota P(A ∩ B) a su rango válido", () => {
    show("prob-union-explorador", [90, 90, 5]);
    expect(screen.getByTestId("tool-pu-union")).toHaveTextContent("100 %");
  });

  it("tabla-contingencia-explorador: estudio del hígado", () => {
    show("tabla-contingencia-explorador", [0]);
    expect(screen.getByTestId("tool-tc-marginales")).toHaveTextContent("P(A) = 237/250 = 0,948");
    expect(screen.getByTestId("tool-tc-marginales")).toHaveTextContent("P(B) = 109/250 = 0,436");
    expect(screen.getByTestId("tool-tc-arbol-b")).toHaveTextContent("P(A | B) = 103/109");
    expect(screen.getByTestId("tool-tc-indep")).toHaveTextContent("Casi independientes");
  });

  it("tabla-contingencia-explorador: medicamento y datos propios", () => {
    show("tabla-contingencia-explorador", [1]);
    expect(screen.getByTestId("tool-tc-arbol-a")).toHaveTextContent("P(B | A) = 5/6");
    const b = show("tabla-contingencia-explorador", [2, 4, 2, 2, 1]);
    expect(screen.getAllByTestId("tool-tc-indep").at(-1)).toHaveTextContent("independientes");
    b.unmount();
  });

  it("tabla-contingencia-explorador: sin datos no hay probabilidades", () => {
    show("tabla-contingencia-explorador", [2, 0, 0, 0, 0]);
    expect(screen.getByTestId("tool-tc-marginales")).toHaveTextContent("Introduce algún dato");
  });

  it("arbol-tabla-explorador: P(A) = 30 %, P(B|A) = 50 %, P(B|Ā) = 80 %", () => {
    show("arbol-tabla-explorador", [30, 50, 80]);
    expect(screen.getByTestId("tool-at-productos")).toHaveTextContent("= 0,15");
    expect(screen.getByTestId("tool-at-tabla")).toHaveTextContent("0,71");
    expect(screen.getByTestId("tool-at-inverso")).toHaveTextContent("P(A | B) = 0,2113");
  });

  it("prob-total-explorador: dos urnas, P(negra) = 0,4 y P(urna B | negra) = 75 %", () => {
    show("prob-total-explorador", [0, 0]);
    expect(screen.getByTestId("tool-pt-total")).toHaveTextContent("P(Negra) = 0,4");
    expect(screen.getByTestId("tool-pt-bayes")).toHaveTextContent("P(Urna B | Negra) = 0,3 / 0,4 = 75 %");
  });

  it("prob-total-explorador: móviles, P(correcto | marcado) ≈ 35,25 % y el suceso contrario", () => {
    show("prob-total-explorador", [2, 0, 2]);
    expect(screen.getByTestId("tool-pt-bayes")).toHaveTextContent("35,25 %");
    fireEvent.click(screen.getByRole("button", { name: "El detector lo marca correcto" }));
    expect(screen.getByTestId("tool-pt-bayes")).toHaveTextContent("0,21 %");
  });

  it("prob-total-explorador: tres cajas y el control de prevalencia", () => {
    show("prob-total-explorador", [1, 0]);
    expect(screen.getByTestId("tool-pt-total")).toHaveTextContent("0,31389");
    const b = show("prob-total-explorador", [2, 0, 20]);
    expect(screen.getAllByTestId("tool-pt-total").at(-1)).toHaveTextContent("0,188");
    b.unmount();
  });

  it("azar-famoso-explorador: cumpleaños con 23 personas ≈ 50,73 %", () => {
    show("azar-famoso-explorador", [0, 23]);
    expect(screen.getByTestId("tool-af-valor")).toHaveTextContent("50,73 %");
    expect(screen.getByTestId("tool-af-nota")).toHaveTextContent("más probable que sí");
  });

  it("azar-famoso-explorador: Caballero de la Meré y Galileo", () => {
    show("azar-famoso-explorador", [1, 4, 0]);
    expect(screen.getByTestId("tool-af-valor")).toHaveTextContent("51,77 %");
    const b = show("azar-famoso-explorador", [1, 24, 1]);
    expect(screen.getAllByTestId("tool-af-valor").at(-1)).toHaveTextContent("49,14 %");
    b.unmount();
    const c = show("azar-famoso-explorador", [2, 0, 0, 10]);
    expect(screen.getAllByTestId("tool-af-valor").at(-1)).toHaveTextContent("27 casos de 216");
    c.unmount();
    show("azar-famoso-explorador", [2, 0, 0, 9]);
    expect(screen.getAllByTestId("tool-af-valor").at(-1)).toHaveTextContent("25 casos de 216");
  });

  it("aguantan parámetros fuera de rango", () => {
    for (const t of ["sucesos-venn-explorador", "prob-union-explorador", "tabla-contingencia-explorador", "arbol-tabla-explorador", "prob-total-explorador", "azar-famoso-explorador"]) {
      const { unmount } = show(t, [99, -99, 99, -99, 99]);
      expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
      unmount();
    }
  });
});
