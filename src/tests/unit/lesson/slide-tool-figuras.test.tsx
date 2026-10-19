import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const slider = (label: RegExp) => screen.getByLabelText(label) as HTMLInputElement;
const readout = () => screen.getByTestId("tool-readout");
const change = (label: RegExp, value: number) => fireEvent.change(slider(label), { target: { value: String(value) } });
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));

describe("herramientas de figuras: valores extremos", () => {
  const tools: SlideToolId[] = [
    "triangulo-clasificador",
    "triangulo-centros",
    "paralelogramo-explorador",
    "poligono-regular-explorador",
    "circ-recta-explorador",
    "circ-circ-explorador",
    "poliedro-explorador",
    "rectangulo-explorador",
    "paralelogramo-area",
    "trapecio-area",
    "triangulo-area",
    "poligono-regular-area",
    "circulo-explorador",
    "plano-explorador",
    "datos-explorador",
    "sectores-explorador",
    "dado-simulador",
    "laplace-explorador",
  ];

  it.each(tools)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() =>
      render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />),
    ).not.toThrow();
    expect(screen.getByTestId("lesson-tool")).toBeInTheDocument();
  });

  it.each(tools)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("triangulo-clasificador", () => {
  it("reconoce el equilátero, el isósceles rectángulo y el obtusángulo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-clasificador", params: { a: 3, b: 4 } }} />);
    expect(readout()).toHaveTextContent("isósceles");
    expect(readout()).toHaveTextContent("acutángulo");
    press("Equilátero");
    expect(readout()).toHaveTextContent("equilátero");
    press("Rectángulo");
    expect(readout()).toHaveTextContent("rectángulo");
    press("Obtusángulo");
    expect(readout()).toHaveTextContent("obtusángulo");
  });

  it("con C encima de la mediatriz y altura 3 es isósceles rectángulo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-clasificador", params: { a: 3, b: 3 } }} />);
    expect(readout()).toHaveTextContent("isósceles");
    expect(readout()).toHaveTextContent("rectángulo");
  });
});

describe("triangulo-centros", () => {
  it("el ortocentro queda dentro, en el vértice o fuera según el triángulo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-centros", params: { a: 2, b: 4 } }} />);
    expect(readout()).toHaveTextContent("Baricentro");
    press("Alturas y ortocentro");
    expect(readout()).toHaveTextContent("acutángulo: H queda dentro");
    change(/Posición horizontal/, 0);
    expect(readout()).toHaveTextContent("vértice del ángulo recto");
    change(/Posición horizontal/, 3);
    change(/Altura de C/, 1.5);
    expect(readout()).toHaveTextContent("obtusángulo: H queda fuera");
  });
});

describe("paralelogramo-explorador", () => {
  it("nombra romboide, rombo, rectángulo y cuadrado", () => {
    render(<SlideTool block={{ kind: "tool", tool: "paralelogramo-explorador", params: { a: 5, b: 3, c: 70 } }} />);
    expect(readout()).toHaveTextContent("romboide");
    press("Rombo");
    expect(readout()).toHaveTextContent("rombo");
    press("Rectángulo");
    expect(readout()).toHaveTextContent("rectángulo");
    press("Cuadrado");
    expect(readout()).toHaveTextContent("cuadrado");
    expect(readout()).toHaveTextContent("90° y 90°");
  });
});

describe("poligono-regular-explorador", () => {
  it("en el hexágono el lado coincide con el radio", () => {
    render(<SlideTool block={{ kind: "tool", tool: "poligono-regular-explorador", params: { n: 6, a: 6 } }} />);
    expect(readout()).toHaveTextContent("l ≈ 6 cm");
    expect(readout()).toHaveTextContent("a ≈ 5,2 cm");
    change(/Número de lados/, 4);
    expect(readout()).toHaveTextContent("l ≈ 8,5 cm");
  });
});

describe("circ-recta-explorador", () => {
  it("compara la distancia con el radio", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circ-recta-explorador", params: { a: 6, b: 3 } }} />);
    expect(readout()).toHaveTextContent("exteriores");
    change(/Distancia d/, 3);
    expect(readout()).toHaveTextContent("tangentes");
    expect(readout()).toHaveTextContent("1 punto común");
    change(/Distancia d/, 1.5);
    expect(readout()).toHaveTextContent("secantes");
    expect(readout()).toHaveTextContent("2 puntos comunes");
  });
});

describe("circ-circ-explorador", () => {
  it("recorre las seis posiciones relativas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circ-circ-explorador", params: { a: 4, b: 2, c: 5 } }} />);
    expect(readout()).toHaveTextContent("secantes");
    change(/Distancia d entre centros/, 8);
    expect(readout()).toHaveTextContent("exteriores");
    change(/Distancia d entre centros/, 6);
    expect(readout()).toHaveTextContent("tangentes exteriores");
    change(/Distancia d entre centros/, 2);
    expect(readout()).toHaveTextContent("tangentes interiores");
    change(/Distancia d entre centros/, 1);
    expect(readout()).toHaveTextContent("interiores");
    change(/Distancia d entre centros/, 0);
    expect(readout()).toHaveTextContent("concéntricas");
  });

  it("dos circunferencias iguales con el mismo centro coinciden", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circ-circ-explorador", params: { a: 3, b: 3, c: 0 } }} />);
    expect(readout()).toHaveTextContent("coincidentes");
  });

  it("al bajar R el radio r se ajusta para no superarlo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circ-circ-explorador", params: { a: 5, b: 5, c: 1 } }} />);
    change(/Radio R/, 2);
    expect(Number(slider(/Radio r/).value)).toBeLessThanOrEqual(2);
  });
});

describe("poliedro-explorador", () => {
  it("cuenta caras, vértices y aristas y cumple Euler", () => {
    render(<SlideTool block={{ kind: "tool", tool: "poliedro-explorador", params: { n: 5, a: 0 } }} />);
    expect(readout()).toHaveTextContent("Caras: 7");
    expect(readout()).toHaveTextContent("Vértices: 10");
    expect(readout()).toHaveTextContent("Aristas: 15");
    press("Pirámide");
    expect(readout()).toHaveTextContent("Pirámide pentagonal");
    expect(readout()).toHaveTextContent("Caras: 6");
    expect(readout()).toHaveTextContent("Aristas: 10");
    change(/Lados de la base/, 8);
    expect(readout()).toHaveTextContent("Vértices: 9");
    expect(screen.getByText(/9 \+ 9 = 18 y A \+ 2 = 16 \+ 2 = 18/)).toBeInTheDocument();
  });
});

describe("herramientas de áreas", () => {
  it("rectángulo: área y perímetro, y con perímetro fijo gana el cuadrado", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectangulo-explorador", params: { a: 6, b: 4 } }} />);
    expect(readout()).toHaveTextContent("A = 6 · 4 = 24 cm²");
    expect(readout()).toHaveTextContent("P = 2·6 + 2·4 = 20 cm");
    press(/Perímetro fijo/);
    expect(readout()).toHaveTextContent("A = 6 · 6 = 36 cm²");
    change(/Base a/, 2);
    expect(readout()).toHaveTextContent("A = 2 · 10 = 20 cm²");
    expect(readout()).toHaveTextContent("= 24 cm");
  });

  it("paralelogramo: la inclinación no cambia el área", () => {
    render(<SlideTool block={{ kind: "tool", tool: "paralelogramo-area", params: { a: 6, b: 4, c: 0 } }} />);
    expect(readout()).toHaveTextContent("A = 6 · 4 = 24 cm²");
    expect(readout()).toHaveTextContent("P = 2·6 + 2·4 = 20 cm");
    change(/Desplazamiento/, 3);
    expect(readout()).toHaveTextContent("A = 6 · 4 = 24 cm²");
    expect(readout()).toHaveTextContent("P = 2·6 + 2·5 = 22 cm");
  });

  it("trapecio: media suma de bases por altura; la base menor no supera a la mayor", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trapecio-area", params: { a: 8, b: 4, c: 4 } }} />);
    expect(readout()).toHaveTextContent("A = (8 + 4) · 4 / 2 = 24 cm²");
    change(/Base mayor/, 3);
    expect(Number(slider(/Base menor/).value)).toBeLessThanOrEqual(3);
  });

  it("triángulo: el vértice no cambia el área; la altura sí", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-area", params: { a: 6, b: 4, c: 2 } }} />);
    expect(readout()).toHaveTextContent("A = 6 · 4 / 2 = 12 cm²");
    change(/Posición del vértice/, 8);
    expect(readout()).toHaveTextContent("= 12 cm²");
    change(/Altura/, 6);
    expect(readout()).toHaveTextContent("A = 6 · 6 / 2 = 18 cm²");
  });

  it("polígono regular: hexágono de lado 4 ≈ 41,6 cm²", () => {
    render(<SlideTool block={{ kind: "tool", tool: "poligono-regular-area", params: { n: 6, a: 4 } }} />);
    expect(readout()).toHaveTextContent("P = 6·4 = 24 cm");
    expect(readout()).toHaveTextContent("a ≈ 3,46 cm");
    expect(readout()).toHaveTextContent("≈ 41,6 cm²");
  });

  it("círculo: duplicar el radio duplica la longitud y cuadruplica el área", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circulo-explorador", params: { a: 4 } }} />);
    expect(readout()).toHaveTextContent("25,12 cm");
    expect(readout()).toHaveTextContent("50,24 cm²");
    change(/Radio r/, 8);
    expect(readout()).toHaveTextContent("50,24 cm");
    expect(readout()).toHaveTextContent("200,96 cm²");
  });
});

describe("herramientas de estadística y probabilidad", () => {
  it("plano: cuadrante, ejes e intercambio de coordenadas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "plano-explorador", params: { a: 3, b: 5 } }} />);
    expect(readout()).toHaveTextContent("P(3, 5)");
    expect(readout()).toHaveTextContent("cuadrante I");
    press("Intercambiar x e y");
    expect(readout()).toHaveTextContent("P(5, 3)");
    press("Intercambiar x e y");
    change(/Abscisa/, -2);
    expect(readout()).toHaveTextContent("cuadrante II");
    change(/Ordenada/, 0);
    expect(readout()).toHaveTextContent("eje X");
    change(/Abscisa/, 0);
    expect(readout()).toHaveTextContent("origen");
  });

  it("datos: media, mediana y moda de los nueve amigos y con un dato extremo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "datos-explorador" }} />);
    expect(readout()).toHaveTextContent("Media = 2");
    expect(readout()).toHaveTextContent("Mediana = 2");
    expect(readout()).toHaveTextContent("Moda = 2");
    press("Quitar un dato");
    expect(screen.getAllByRole("button", { name: /Subir dato/ })).toHaveLength(8);
    expect(readout()).toHaveTextContent("Mediana = 2");
    expect(readout()).toHaveTextContent("Moda = 1 y 2 y 3");
  });

  it("sectores: 40 personas son 9° cada una y los grados suman 360°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sectores-explorador" }} />);
    expect(readout()).toHaveTextContent("N = 40");
    expect(readout()).toHaveTextContent("9° por persona");
    expect(screen.getByText(/Fútbol: 20 → 180°/)).toBeInTheDocument();
    change(/Fútbol/, 0);
    expect(readout()).toHaveTextContent("N = 20");
    expect(readout()).toHaveTextContent("18° por persona");
  });

  it("simulador: los lanzamientos suman n y es determinista", () => {
    render(<SlideTool block={{ kind: "tool", tool: "dado-simulador", params: { a: 6 } }} />);
    expect(readout()).toHaveTextContent("n = 0");
    press("Lanzar ×100");
    expect(readout()).toHaveTextContent("n = 100");
    const total = screen
      .getAllByText(/f = \d+/)
      .map((n) => Number(/f = (\d+)/.exec(n.textContent ?? "")?.[1]))
      .reduce((a, b) => a + b, 0);
    expect(total).toBe(100);
    press("Lanzar ×1000");
    expect(readout()).toHaveTextContent("n = 1100");
    press(/Reiniciar/);
    expect(readout()).toHaveTextContent("n = 0");
  });

  it("laplace: dado y bolsa", () => {
    render(<SlideTool block={{ kind: "tool", tool: "laplace-explorador", params: { a: 0, b: 2, c: 3 } }} />);
    expect(readout()).toHaveTextContent("3/6 = 1/2");
    press("Cara 2");
    expect(readout()).toHaveTextContent("2/6 = 1/3");
    for (const f of [4, 6]) {
      press(`Cara ${f}`);
    }
    expect(readout()).toHaveTextContent("0/6");
    expect(readout()).toHaveTextContent("imposible");
    for (const f of [1, 2, 3, 4, 5, 6]) {
      press(`Cara ${f}`);
    }
    expect(readout()).toHaveTextContent("seguro");
    press("Cambiar a bolsa de bolas");
    expect(readout()).toHaveTextContent("2/5");
    change(/Bolas verdes/, 0);
    expect(readout()).toHaveTextContent("seguro");
  });
});
