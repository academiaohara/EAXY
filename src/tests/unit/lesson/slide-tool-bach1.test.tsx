import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("entorno-explorador", () => {
  it("E(5; 2) es (3; 7) y 6 pertenece", () => {
    render(<SlideTool block={{ kind: "tool", tool: "entorno-explorador", initial: [5, 4, 12] }} />);
    expect(screen.getByTestId("tool-ent-notacion")).toHaveTextContent("(3; 7)");
    expect(screen.getByTestId("tool-ent-x")).toHaveTextContent("pertenece");
  });

  it("el extremo no pertenece (entorno abierto)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "entorno-explorador", initial: [5, 4, 14] }} />);
    expect(screen.getByTestId("tool-ent-x")).toHaveTextContent("no pertenece");
  });

  it("aguanta parámetros extremos o ausentes", () => {
    render(<SlideTool block={{ kind: "tool", tool: "entorno-explorador", initial: [99, -99, 99] }} />);
    expect(screen.getByTestId("tool-ent-notacion")).toBeInTheDocument();
    render(<SlideTool block={{ kind: "tool", tool: "entorno-explorador" }} />);
  });
});

describe("complejo-explorador", () => {
  it("3 + 4i: módulo 5, conjugado 3 − 4i", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejo-explorador", initial: [3, 4] }} />);
    expect(screen.getByTestId("tool-cx-modulo")).toHaveTextContent("5");
    expect(screen.getByTestId("tool-cx-conjugado")).toHaveTextContent("3 − 4i");
    expect(screen.getByTestId("tool-cx-argumento")).toHaveTextContent("53,1°");
  });

  it("el cero no tiene argumento", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejo-explorador", initial: [0, 0] }} />);
    expect(screen.getByTestId("tool-cx-argumento")).toHaveTextContent("no está definido");
  });

  it("−1 − i: argumento −135°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejo-explorador", initial: [-1, -1] }} />);
    expect(screen.getByTestId("tool-cx-argumento")).toHaveTextContent("−135°");
  });
});

describe("complejos-operaciones-explorador", () => {
  it("(2 − i)(1 + 2i) = 4 + 3i", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejos-operaciones-explorador", initial: [2, -1, 1, 2, 2] }} />);
    expect(screen.getByTestId("tool-co-resultado")).toHaveTextContent("z₁ · z₂ = 4 + 3i");
  });

  it("(3 + 4i) : (1 − 2i) = −1 + 2i", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejos-operaciones-explorador", initial: [3, 4, 1, -2, 3] }} />);
    expect(screen.getByTestId("tool-co-resultado")).toHaveTextContent("−1 + 2i");
  });

  it("dividir entre 0 no se puede", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejos-operaciones-explorador", initial: [1, 1, 0, 0, 3] }} />);
    expect(screen.getByTestId("tool-co-resultado")).toHaveTextContent("No se puede dividir entre 0");
    fireEvent.click(screen.getByRole("button", { name: "z₁ + z₂" }));
    expect(screen.getByTestId("tool-co-resultado")).toHaveTextContent("z₁ + z₂ = 1 + i");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "complejos-operaciones-explorador", initial: [99, -99, 9, 9, 9] }} />);
    expect(screen.getByTestId("tool-co-plano")).toBeInTheDocument();
  });
});

describe("potencia-compleja-explorador", () => {
  it("módulo 1, 30° y n = 12 vuelve a 1", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-compleja-explorador", initial: [10, 30, 12] }} />);
    expect(screen.getByTestId("tool-mv-binomica")).toHaveTextContent("zⁿ = 1");
    expect(screen.getByTestId("tool-mv-arg")).toHaveTextContent("360°");
  });

  it("el módulo de la potencia es rⁿ", () => {
    render(<SlideTool block={{ kind: "tool", tool: "potencia-compleja-explorador", initial: [10, 90, 2] }} />);
    expect(screen.getByTestId("tool-mv-binomica")).toHaveTextContent("zⁿ = −1");
    fireEvent.change(slider("Módulo r"), { target: { value: "1.5" } });
    expect(screen.getByTestId("tool-mv-modulo")).toHaveTextContent("1,5^2 = 2,25");
  });
});

describe("raices-complejas-explorador", () => {
  it("las raíces cúbicas de 8 incluyen 2 y −1 ± 1,732i", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raices-complejas-explorador", initial: [8, 0, 3] }} />);
    expect(screen.getByTestId("tool-rc-modulo")).toHaveTextContent("3 raíces de módulo 2");
    expect(screen.getByTestId("tool-rc-raices")).toHaveTextContent("2");
    expect(screen.getByTestId("tool-rc-raices")).toHaveTextContent("−1 + 1,73i");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raices-complejas-explorador", initial: [999, 999, 99] }} />);
    expect(screen.getByTestId("tool-rc-plano")).toBeInTheDocument();
  });
});

describe("logaritmo-explorador", () => {
  it("log₂ 8 = 3 exacto", () => {
    render(<SlideTool block={{ kind: "tool", tool: "logaritmo-explorador", initial: [2, 8] }} />);
    expect(screen.getByTestId("tool-lg-valor")).toHaveTextContent("log₂ 8 = 3");
    expect(screen.getByTestId("tool-lg-entre")).toHaveTextContent("Es exacto");
  });

  it("log₂ 13 queda entre 2³ y 2⁴", () => {
    render(<SlideTool block={{ kind: "tool", tool: "logaritmo-explorador", initial: [2, 13] }} />);
    expect(screen.getByTestId("tool-lg-valor")).toHaveTextContent("3,7004");
    expect(screen.getByTestId("tool-lg-entre")).toHaveTextContent("entre 2^3 = 8 y 2^4 = 16");
  });

  it("log 1 = 0 en cualquier base", () => {
    render(<SlideTool block={{ kind: "tool", tool: "logaritmo-explorador", initial: [7, 1] }} />);
    expect(screen.getByTestId("tool-lg-valor")).toHaveTextContent("= 0");
  });
});

describe("log-propiedades-explorador", () => {
  it("las tres propiedades dan lo mismo en los dos lados; la suma no", () => {
    render(<SlideTool block={{ kind: "tool", tool: "log-propiedades-explorador", initial: [10, 8, 5, 3] }} />);
    expect(screen.getByTestId("tool-lp-producto")).toHaveTextContent("log₁₀(8·5) = 1,6021 = log 8 + log 5 = 1,6021");
    expect(screen.getByTestId("tool-lp-cociente")).toHaveTextContent("log₁₀(8/5) = 0,2041 = log 8 − log 5 = 0,2041");
    expect(screen.getByTestId("tool-lp-potencia")).toHaveTextContent("log₁₀(8^3) = 2,7093 = 3·log 8 = 2,7093");
    expect(screen.getByTestId("tool-lp-suma")).toHaveTextContent("≠");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "log-propiedades-explorador", initial: [0, 0, 0, 99] }} />);
    expect(screen.getByTestId("tool-lp-producto")).toBeInTheDocument();
  });
});

describe("sistema-parametro-explorador", () => {
  it("m = 2, k = 3: compatible determinado con solución", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-parametro-explorador", initial: [2, 3] }} />);
    expect(screen.getByTestId("tool-sp-tipo")).toHaveTextContent("compatible determinado");
    expect(screen.getByTestId("tool-sp-solucion")).toHaveTextContent("x =");
  });

  it("m = 5 depende de k: indeterminado con k = 3 e incompatible con otro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-parametro-explorador", initial: [5, 3] }} />);
    expect(screen.getByTestId("tool-sp-tipo")).toHaveTextContent("compatible indeterminado");
    fireEvent.change(slider("Término independiente k"), { target: { value: "4" } });
    expect(screen.getByTestId("tool-sp-tipo")).toHaveTextContent("incompatible");
    expect(screen.getByTestId("tool-sp-ultima")).toHaveTextContent("0 = ");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-parametro-explorador", initial: [99, -99] }} />);
    expect(screen.getByTestId("tool-sp-tipo")).toBeInTheDocument();
  });
});

describe("inecuacion-cuadratica-explorador", () => {
  it("x² − 2x − 3 > 0 → fuera de las raíces", () => {
    render(<SlideTool block={{ kind: "tool", tool: "inecuacion-cuadratica-explorador", initial: [1, -2, -3, 2] }} />);
    expect(screen.getByTestId("tool-iq-sol")).toHaveTextContent("(−∞, −1) ∪ (3, +∞)");
  });

  it("x² − 5x + 6 ≤ 0 → [2, 3]", () => {
    render(<SlideTool block={{ kind: "tool", tool: "inecuacion-cuadratica-explorador", initial: [1, -5, 6, 1] }} />);
    expect(screen.getByTestId("tool-iq-sol")).toHaveTextContent("[2, 3]");
  });

  it("sin raíces reales: ℝ o ∅ según la relación", () => {
    render(<SlideTool block={{ kind: "tool", tool: "inecuacion-cuadratica-explorador", initial: [1, 0, 1, 0] }} />);
    expect(screen.getByTestId("tool-iq-sol")).toHaveTextContent("∅");
    fireEvent.click(screen.getByRole("button", { name: "P(x) > 0" }));
    expect(screen.getByTestId("tool-iq-sol")).toHaveTextContent("ℝ");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "inecuacion-cuadratica-explorador", initial: [-5, 99, -99, 9] }} />);
    expect(screen.getByTestId("tool-iq-grafica")).toBeInTheDocument();
  });
});

describe("region-inecuaciones-explorador", () => {
  it("x + y ≤ 4 y x − y ≥ 1: hay región y vértice (2,5; 1,5)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "region-inecuaciones-explorador", initial: [1, 1, 4, 0, 1, -1, 1, 1] }} />);
    expect(screen.getByTestId("tool-ri-estado")).toHaveTextContent("Hay región solución");
    expect(screen.getByTestId("tool-ri-corte")).toHaveTextContent("(2,5, 1,5)");
  });

  it("x + y ≤ 1 y x + y ≥ 3: sin solución y rectas paralelas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "region-inecuaciones-explorador", initial: [1, 1, 1, 0, 1, 1, 3, 1] }} />);
    expect(screen.getByTestId("tool-ri-estado")).toHaveTextContent("Sin solución");
    expect(screen.getByTestId("tool-ri-corte")).toHaveTextContent("paralelas");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "region-inecuaciones-explorador", initial: [99, 99, 99, 9, 0, 0, 0, 9] }} />);
    expect(screen.getByTestId("tool-ri-plano")).toBeInTheDocument();
  });
});
