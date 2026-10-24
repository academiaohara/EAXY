import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);
const btn = (name: RegExp | string) => screen.getByRole("button", { name });

describe("herramientas de límites de 1.º de Bachillerato", () => {
  it("limite-tabla-explorador: x² − 3 en 2 por la derecha → 1", () => {
    show("limite-tabla-explorador", [0, 1, 2]);
    expect(screen.getByTestId("tool-lt-limite")).toHaveTextContent("x → 2+: 1");
    expect(screen.getByTestId("tool-lt-imagen")).toHaveTextContent("f(2) = 1");
    expect(screen.getByTestId("tool-lt-tabla").querySelectorAll("li")).toHaveLength(3);
  });

  it("limite-tabla-explorador: (x² − 1)/(x − 1) no tiene imagen en 1 pero tiende a 2", () => {
    show("limite-tabla-explorador", [1, 0, 3]);
    expect(screen.getByTestId("tool-lt-limite")).toHaveTextContent(": 2");
    expect(screen.getByTestId("tool-lt-imagen")).toHaveTextContent("no está definida");
  });

  it("limite-lateral-explorador: salto finito de 2", () => {
    show("limite-lateral-explorador", [1, 1]);
    expect(screen.getByTestId("tool-ll-laterales")).toHaveTextContent("= 1");
    expect(screen.getByTestId("tool-ll-laterales")).toHaveTextContent("= 3");
    expect(screen.getByTestId("tool-ll-tipo")).toHaveTextContent("salto finito");
    expect(screen.getByTestId("tool-ll-tipo")).toHaveTextContent("salto 2");
  });

  it("limite-lateral-explorador: continua, evitable, infinito y 2.ª especie", () => {
    const expected = ["Continua", "salto finito", "evitable", "evitable", "salto infinito", "2.ª especie"];
    expected.forEach((t, i) => {
      const { unmount } = show("limite-lateral-explorador", [i, 2]);
      expect(screen.getByTestId("tool-ll-tipo")).toHaveTextContent(t);
      unmount();
    });
  });

  it("limite-infinito-explorador: 1/x en 0⁺ es +∞ y en +∞ es 0", () => {
    show("limite-infinito-explorador", [0, 0]);
    expect(screen.getByTestId("tool-li-limite")).toHaveTextContent("= +∞");
    fireEvent.click(btn("x → +∞"));
    expect(screen.getByTestId("tool-li-limite")).toHaveTextContent("= 0");
    expect(screen.getByTestId("tool-li-tipo")).toHaveTextContent("finito en un punto infinito");
  });

  it("limite-infinito-explorador: ln x por la izquierda no está definida", () => {
    show("limite-infinito-explorador", [6, 1]);
    expect(screen.getByTestId("tool-li-limite")).toHaveTextContent("no definida");
  });

  it("asintotas-explorador: (x² + x + 1)/(x − 1) → x = 1 e y = x + 2", () => {
    show("asintotas-explorador", [1, 1, 1, 1]);
    expect(screen.getByTestId("tool-as-vertical")).toHaveTextContent("x = 1");
    expect(screen.getByTestId("tool-as-oblicua")).toHaveTextContent("y = x + 2");
    expect(screen.getByTestId("tool-as-horizontal")).toHaveTextContent("Sin asíntota horizontal");
  });

  it("asintotas-explorador: con a = 0 hay horizontal y = b; con hueco no hay vertical", () => {
    show("asintotas-explorador", [0, 3, 1, 2]);
    expect(screen.getByTestId("tool-as-horizontal")).toHaveTextContent("y = 3");
    expect(screen.getByTestId("tool-as-oblicua")).toHaveTextContent("Sin asíntota oblicua");
  });

  it("cero-cero-explorador: factorizar (x−1)(x−3)/((x−1)(x+1)) en 1 → −1", () => {
    show("cero-cero-explorador", [0, 1, 3, -1]);
    expect(screen.getByTestId("tool-cc-limite")).toHaveTextContent("Límite = −1");
    expect(screen.getByTestId("tool-cc-pasos")).toHaveTextContent("0/0");
  });

  it("cero-cero-explorador: conjugado (√(x+0) − 2)/(x − 4) → 1/4", () => {
    show("cero-cero-explorador", [1, 2, 0]);
    expect(screen.getByTestId("tool-cc-limite")).toHaveTextContent("Límite = 1/4");
  });

  it("limite-grados-explorador: (8x² + 3)/(x² + 5) → 8; grado mayor → ∞; menor → 0", () => {
    show("limite-grados-explorador", [2, 8, 2, 1, 0]);
    expect(screen.getByTestId("tool-lg-limite")).toHaveTextContent("Límite = 8");
    const a = show("limite-grados-explorador", [3, 3, 2, 1, 0]);
    expect(screen.getAllByTestId("tool-lg-limite")[1]).toHaveTextContent("+∞");
    a.unmount();
    show("limite-grados-explorador", [1, 3, 3, 2, 1]);
    expect(screen.getAllByTestId("tool-lg-limite").at(-1)).toHaveTextContent("Límite = 0");
  });

  it("limite-grados-explorador: signo en −∞ con diferencia de grados impar", () => {
    show("limite-grados-explorador", [3, 3, 2, 1, 1]);
    expect(screen.getByTestId("tool-lg-limite")).toHaveTextContent("−∞");
  });

  it("continuidad-k-explorador: k = a² − a hace continua la función", () => {
    show("continuidad-k-explorador", [2, 2]);
    expect(screen.getByTestId("tool-ck-estado")).toHaveTextContent("Continua");
    expect(screen.getByTestId("tool-ck-k")).toHaveTextContent("k = 2");
  });

  it("continuidad-k-explorador: con k = 0 y a = 2 hay salto de 2", () => {
    show("continuidad-k-explorador", [2, 0]);
    expect(screen.getByTestId("tool-ck-estado")).toHaveTextContent("Salto de 2");
  });

  it("aguantan parámetros fuera de rango", () => {
    for (const t of ["limite-tabla-explorador", "limite-lateral-explorador", "limite-infinito-explorador", "asintotas-explorador", "cero-cero-explorador", "limite-grados-explorador", "continuidad-k-explorador"]) {
      const { unmount } = show(t, [99, -99, 99, -99, 99]);
      expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
      unmount();
    }
  });
});

describe("operaciones con límites y resta de fracciones", () => {
  it("operaciones-limite-explorador: x² − x → +∞ pero x − x → 0, ambas ∞ − ∞", () => {
    show("operaciones-limite-explorador", [1, 0, 1, 0]);
    expect(screen.getByTestId("tool-ol-forma")).toHaveTextContent("∞ − ∞: indeterminación");
    expect(screen.getByTestId("tool-ol-resultado")).toHaveTextContent("= +∞");
    fireEvent.click(screen.getAllByRole("button", { name: "x" })[0]!);
    expect(screen.getByTestId("tool-ol-resultado")).toHaveTextContent("= 0");
  });

  it("operaciones-limite-explorador: 0 · ∞ con x y 1/x en 0⁺ da 1", () => {
    show("operaciones-limite-explorador", [0, 3, 2, 1]);
    expect(screen.getByTestId("tool-ol-forma")).toHaveTextContent("0 · ∞");
    expect(screen.getByTestId("tool-ol-resultado")).toHaveTextContent("= 1");
  });

  it("resta-fracciones-explorador: k = 2r da 1/(2r) y otro k no tiene límite", () => {
    show("resta-fracciones-explorador", [2, 1]);
    expect(screen.getByTestId("tool-rf-limite")).toHaveTextContent("Límite = 0,5");
    const b = show("resta-fracciones-explorador", [1, 2]);
    expect(screen.getAllByTestId("tool-rf-limite").at(-1)).toHaveTextContent("no existe");
    b.unmount();
  });

  it("aguantan parámetros fuera de rango", () => {
    for (const t of ["operaciones-limite-explorador", "resta-fracciones-explorador"]) {
      const { unmount } = show(t, [99, -99, 99, -99]);
      expect(screen.getByTestId("tool-readout")).toBeInTheDocument();
      unmount();
    }
  });
});
