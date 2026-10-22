import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { NUMEROS } from "@/components/lesson/slide/tools/RealesTools";

function slider(label: RegExp) {
  return screen.getByLabelText(label) as HTMLInputElement;
}

describe("raiz-aprox-explorador", () => {
  it("√2 irracional con cotas y √9 exacta", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raiz-aprox-explorador", params: { a: 2, b: 3 } }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("1,414");
    expect(screen.getByTestId("tool-raiz-tipo")).toHaveTextContent("irracional");
    fireEvent.change(slider(/Radicando/), { target: { value: "9" } });
    expect(screen.getByTestId("tool-raiz-tipo")).toHaveTextContent("Raíz exacta");
  });
  it("acota valores absurdos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raiz-aprox-explorador", params: { a: 999, b: 99 } }} />);
    expect(Number(slider(/Radicando/).value)).toBe(50);
    expect(Number(slider(/Cifras/).value)).toBe(6);
  });
});

describe("conjuntos-explorador", () => {
  it("la tabla de datos es coherente (N ⊂ Z ⊂ Q)", () => {
    for (const x of NUMEROS) {
      if (x.n) expect(x.z).toBe(true);
      if (x.z) expect(x.q).toBe(true);
    }
  });
  it("28/7 es natural y √7 solo irracional", () => {
    render(<SlideTool block={{ kind: "tool", tool: "conjuntos-explorador", params: { a: 2 } }} />);
    const chips = () => Array.from(screen.getByTestId("tool-conjuntos").children).map((c) => c.getAttribute("data-on"));
    expect(chips()).toEqual(["true", "true", "true", "false", "true"]);
    fireEvent.click(screen.getByRole("button", { name: "Número 9" }));
    expect(chips()).toEqual(["false", "false", "false", "true", "true"]);
  });
});

describe("raiz-indice-explorador", () => {
  it("³√(−8) = −2 y √(−4) no existe", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raiz-indice-explorador", params: { a: 3, b: -8 } }} />);
    expect(screen.getByTestId("tool-raiz-existe").textContent).toContain("−2".replace("−", "-"));
    fireEvent.change(slider(/Índice/), { target: { value: "2" } });
    fireEvent.change(slider(/Radicando/), { target: { value: "-4" } });
    expect(screen.getByTestId("tool-raiz-existe")).toHaveTextContent("No existe");
  });
  it("raíz inexacta y valores extremos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "raiz-indice-explorador", params: { a: 99, b: 9999 } }} />);
    expect(slider(/Índice/).value).toBe("7");
    expect(slider(/Radicando/).value).toBe("256");
  });
});

describe("radical-exponencial-explorador", () => {
  it("³√(a⁶) = a² y simplificación", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radical-exponencial-explorador", params: { a: 3, b: 6 } }} />);
    expect(screen.getByTestId("tool-readout").textContent).toContain("sin radical");
    fireEvent.change(slider(/Exponente/), { target: { value: "2" } });
    expect(screen.getByTestId("tool-readout").textContent).toContain("irreducible");
  });
});

describe("radical-simplificador", () => {
  it("√720 = 12√5", () => {
    render(<SlideTool block={{ kind: "tool", tool: "radical-simplificador", params: { a: 720, b: 2 } }} />);
    expect(screen.getByTestId("tool-radical-nota")).toHaveTextContent("Salen 12 y queda 5 dentro");
    fireEvent.change(slider(/Radicando/), { target: { value: "49" } });
    expect(screen.getByTestId("tool-radical-nota")).toHaveTextContent("raíz exacta");
    fireEvent.change(slider(/Radicando/), { target: { value: "30" } });
    expect(screen.getByTestId("tool-radical-nota")).toHaveTextContent("ningún factor");
  });
});

describe("racionalizar-explorador", () => {
  it("el valor decimal no cambia", () => {
    render(<SlideTool block={{ kind: "tool", tool: "racionalizar-explorador", params: { a: 3, b: 8 } }} />);
    const txt = screen.getByTestId("tool-racionaliza-valor").textContent ?? "";
    const [antes, despues] = txt.replace("Antes: ", "").split(" · Después: ");
    expect(antes).toBe(despues);
  });
});
