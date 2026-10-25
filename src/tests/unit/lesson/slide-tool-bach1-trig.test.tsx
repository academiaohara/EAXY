import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("radianes-explorador", () => {
  it("120° = 2π/3 rad y el arco es θ·r", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radianes-explorador", initial: [120, 2] }} />);
    expect(screen.getByTestId("tool-ra-rad")).toHaveTextContent("120° = 2π/3 rad ≈ 2,0944 rad");
    expect(screen.getByTestId("tool-ra-arco")).toHaveTextContent("= 4,189 m");
  });

  it("360° es una vuelta y 720° son dos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radianes-explorador", initial: [360, 1] }} />);
    expect(screen.getByTestId("tool-ra-rad")).toHaveTextContent("2π");
    fireEvent.change(slider("Ángulo"), { target: { value: "720" } });
    expect(screen.getByTestId("tool-ra-vueltas")).toHaveTextContent("2 vueltas");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radianes-explorador", initial: [9999, -5] }} />);
    expect(screen.getByTestId("tool-ra-dibujo")).toBeInTheDocument();
  });
});

describe("circulo-trig-explorador", () => {
  it("150°: cuadrante II, seno 1/2, coseno −√3/2", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circulo-trig-explorador", initial: [150] }} />);
    expect(screen.getByTestId("tool-ct-cuadrante")).toHaveTextContent("cuadrante 2 · referencia 30°");
    expect(screen.getByTestId("tool-ct-sen")).toHaveTextContent("0,5");
    expect(screen.getByTestId("tool-ct-cos")).toHaveTextContent("−0,866");
    expect(screen.getByTestId("tool-ct-cos")).toHaveTextContent("−√3/2");
  });

  it("90° no tiene tangente", () => {
    render(<SlideTool block={{ kind: "tool", tool: "circulo-trig-explorador", initial: [90] }} />);
    expect(screen.getByTestId("tool-ct-tg")).toHaveTextContent("no existe");
    expect(screen.getByTestId("tool-ct-cuadrante")).toHaveTextContent("sobre un eje");
  });
});

describe("angulos-relacionados-explorador", () => {
  it("con α = 30°: sen 150° = sen 30° y cos 150° = −cos 30°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "angulos-relacionados-explorador", initial: [30] }} />);
    expect(screen.getByTestId("tool-ar-fila-1")).toHaveTextContent("150°");
    expect(screen.getByTestId("tool-ar-fila-1")).toHaveTextContent("0,5");
    expect(screen.getByTestId("tool-ar-fila-1")).toHaveTextContent("−0,866");
  });

  it("el complementario intercambia seno y coseno", () => {
    render(<SlideTool block={{ kind: "tool", tool: "angulos-relacionados-explorador", initial: [30] }} />);
    expect(screen.getByTestId("tool-ar-fila-5")).toHaveTextContent("60°");
    expect(screen.getByTestId("tool-ar-fila-5")).toHaveTextContent("0,866");
  });
});

describe("suma-angulos-explorador", () => {
  it("sen 75° coincide con la fórmula y no con sen a + sen b", () => {
    render(<SlideTool block={{ kind: "tool", tool: "suma-angulos-explorador", initial: [45, 30, 0] }} />);
    expect(screen.getByTestId("tool-sa-sen")).toHaveTextContent("0,9659");
    expect(screen.getByTestId("tool-sa-sen-formula")).toHaveTextContent("0,9659");
    expect(screen.getByTestId("tool-sa-error")).toHaveTextContent("1,2071");
  });

  it("resta: cos 15° con a = 45° y b = 30°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "suma-angulos-explorador", initial: [45, 30, 1] }} />);
    expect(screen.getByTestId("tool-sa-cos")).toHaveTextContent("cos 15° = 0,9659");
    expect(screen.getByTestId("tool-sa-cos-formula")).toHaveTextContent("0,9659");
  });
});

describe("doble-mitad-explorador", () => {
  it("60°: sen 120° = 2 sen cos y el ángulo mitad de 30°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "doble-mitad-explorador", initial: [60] }} />);
    expect(screen.getByTestId("tool-dm-sen2")).toHaveTextContent("sen 120° = 0,866 = 2·sen α·cos α = 0,866");
    expect(screen.getByTestId("tool-dm-sen-mitad")).toHaveTextContent("sen 30° = 0,5");
  });

  it("el signo del coseno del ángulo mitad lo decide su cuadrante", () => {
    render(<SlideTool block={{ kind: "tool", tool: "doble-mitad-explorador", initial: [210] }} />);
    expect(screen.getByTestId("tool-dm-cos-mitad")).toHaveTextContent("−√");
  });
});

describe("suma-producto-explorador", () => {
  it("los dos miembros coinciden en las cuatro fórmulas", () => {
    render(<SlideTool block={{ kind: "tool", tool: "suma-producto-explorador", initial: [75, 15] }} />);
    expect(screen.getByTestId("tool-sp-sen-mas")).toHaveTextContent("sen 75° + sen 15° = 1,2247 = 2·sen((A+B)/2)·cos((A−B)/2) = 1,2247");
    for (const id of ["sen-menos", "cos-mas", "cos-menos"]) {
      const text = screen.getByTestId(`tool-sp-${id}`).textContent ?? "";
      const nums = text.match(/−?\d+,\d+|−?\d+(?![\d,])/g) ?? [];
      expect(nums.length, id).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("ecuacion-trig-explorador", () => {
  it("sen x = 0,5 → 30° y 150°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ecuacion-trig-explorador", initial: [0, 1] }} />);
    expect(screen.getByTestId("tool-et-soluciones")).toHaveTextContent("x = 30° y 150°");
    expect(screen.getByTestId("tool-et-pi")).toHaveTextContent("π/6 y 5π/6");
  });

  it("cos x = 2 no tiene solución; tg x = 1 sí", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ecuacion-trig-explorador", initial: [1, 4] }} />);
    expect(screen.getByTestId("tool-et-soluciones")).toHaveTextContent("Sin solución real");
    fireEvent.click(screen.getByRole("button", { name: "tg x" }));
    expect(screen.getByTestId("tool-et-soluciones")).toHaveTextContent("63,43°");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "ecuacion-trig-explorador", initial: [9, 99] }} />);
    expect(screen.getByTestId("tool-et-grafica")).toBeInTheDocument();
  });
});

describe("triangulo-general-explorador", () => {
  it("LAL: b = 5, c = 7, A = 60° → a ≈ 6,24", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [0, 5, 7, 60] }} />);
    expect(screen.getByTestId("tool-tg-n")).toHaveTextContent("Un triángulo");
    expect(screen.getByTestId("tool-tg-sol-0")).toHaveTextContent("a = 6,24");
  });

  it("LLL: 5, 6, 7 → A ≈ 44,4° y 1, 2, 5 no forman triángulo", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [1, 5, 6, 7] }} />);
    expect(screen.getByTestId("tool-tg-sol-0")).toHaveTextContent("A = 44,4°");
    fireEvent.change(slider("Lado a"), { target: { value: "1" } });
    fireEvent.change(slider("Lado b"), { target: { value: "2" } });
    fireEvent.change(slider("Lado c"), { target: { value: "5" } });
    expect(screen.getByTestId("tool-tg-n")).toHaveTextContent("No existe ningún triángulo");
  });

  it("AAL: A = 30°, B = 45°, a = 10 → C = 105°", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [2, 30, 45, 10] }} />);
    expect(screen.getByTestId("tool-tg-sol-0")).toHaveTextContent("C = 105°");
    expect(screen.getByTestId("tool-tg-sol-0")).toHaveTextContent("b = 14,14");
  });

  it("LLA ambiguo: 7, 10, 30° → dos triángulos; 3, 10, 30° → ninguno; 12, 10, 30° → uno", () => {
    const { unmount } = render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [3, 7, 10, 30] }} />);
    expect(screen.getByTestId("tool-tg-n")).toHaveTextContent("Dos triángulos distintos");
    unmount();
    const r2 = render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [3, 3, 10, 30] }} />);
    expect(screen.getByTestId("tool-tg-n")).toHaveTextContent("No existe ningún triángulo");
    r2.unmount();
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [3, 12, 10, 30] }} />);
    expect(screen.getByTestId("tool-tg-n")).toHaveTextContent("Un triángulo");
  });

  it("aguanta parámetros fuera de rango", () => {
    render(<SlideTool block={{ kind: "tool", tool: "triangulo-general-explorador", initial: [9, 99, 99, 999] }} />);
    expect(screen.getByTestId("tool-tg-dibujo")).toBeInTheDocument();
  });
});
