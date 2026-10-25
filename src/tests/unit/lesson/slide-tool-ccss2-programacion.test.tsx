import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PL_PROBLEMAS, vertices } from "@/components/lesson/slide/tools/CcssProgramacionTools";

const show = (initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: "programacion-lineal-explorador", initial }} />);

describe("programación lineal (CCSS II)", () => {
  it("vértices de los siete problemas", () => {
    const n = PL_PROBLEMAS.map((p) => vertices(p).length);
    expect(n).toEqual([4, 3, 4, 2, 0, 5, 6]);
  });

  it("producción: máximo 140 en (2, 4)", () => {
    const a = show([0, 140]);
    expect(screen.getByTestId("tool-pl-optimo")).toHaveTextContent("Z = 140 en (2, 4)");
    expect(screen.getByTestId("tool-pl-toca")).toHaveTextContent("corta la región");
    expect(screen.getByTestId("tool-pl-vertices")).toHaveTextContent("Z = 120");
    a.unmount();
    show([0, 150]);
    expect(screen.getByTestId("tool-pl-toca")).toHaveTextContent("no toca la región");
  });

  it("dieta, múltiple, no acotada, vacía, transporte y mezcla", () => {
    const casos: [number[], string][] = [
      [[1, 14], "Z = 14 en (2, 4)"],
      [[2, 8], "Z = 8 en todo el segmento (2, 4)–(4, 0)"],
      [[3, 8], "no acotada: sin máximo"],
      [[4, 5], "región vacía"],
      [[5, 195], "Z = 195 en (30, 5)"],
      [[6, 21], "Z = 21 en (3, 1,5)"],
    ];
    for (const [ini, texto] of casos) {
      const a = show(ini);
      expect(screen.getByTestId("tool-pl-optimo")).toHaveTextContent(texto);
      a.unmount();
    }
  });

  it("valores extremos y ausentes", () => {
    show([Number.NaN, 9999]);
    show([99, -5]);
    show();
  });
});
