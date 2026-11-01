// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MathRenderer } from "@/components/lesson/MathRenderer";

afterEach(cleanup);

describe("MathRenderer · puntuación pegada a la fórmula", () => {
  it("el punto o la coma que siguen a una fórmula van dentro del mismo bloque sin salto", () => {
    const { container } = render(<MathRenderer text="Une $A'$, luego $B'$. Fin" />);
    const bloques = container.querySelectorAll('span[style*="nowrap"]');
    expect(bloques).toHaveLength(2);
    expect(bloques[0]!.textContent).toContain(",");
    expect(bloques[1]!.textContent).toContain(".");
  });

  it("una fórmula sin puntuación detrás no se envuelve", () => {
    const { container } = render(<MathRenderer text="Une $A'$ con $B'$" />);
    expect(container.querySelectorAll('span[style*="nowrap"]')).toHaveLength(0);
    expect(container.querySelectorAll(".katex")).toHaveLength(2);
  });

  it("funciona dentro de un término en negrita", () => {
    const { container } = render(<MathRenderer text="**el punto $P$.** Sigue" emphasis="mark-alternate" />);
    expect(container.querySelector("mark")).toBeTruthy();
    expect(container.querySelector('mark span[style*="nowrap"]')).toBeTruthy();
  });
});
