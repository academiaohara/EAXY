import { describe, expect, it } from "vitest";
import { layoutSolution, splitSolutionLines } from "@/lib/curriculum/solution-layout";

describe("layoutSolution", () => {
  it("separa apartados escritos en una sola línea", () => {
    const layout = layoutSolution("a) Menor b) Mayor c) Igual ($1$) d) Mayor.");

    expect(layout.intro).toEqual([]);
    expect(layout.parts.map((part) => [part.label, part.intro])).toEqual([
      ["a", ["Menor"]],
      ["b", ["Mayor"]],
      ["c", ["Igual ($1$)"]],
      ["d", ["Mayor."]],
    ]);
  });

  it("conserva el texto previo al primer apartado", () => {
    const layout = layoutSolution("Total $60$ personas.\na) $P = 1/2$.\nb) $P = 1/3$.");

    expect(layout.intro).toEqual(["Total $60$ personas."]);
    expect(layout.parts.map((part) => part.label)).toEqual(["a", "b"]);
  });

  it("ignora marcadores dentro de fórmulas o fuera de orden", () => {
    const layout = layoutSolution("Sea $f(a) = 2$ y $5$ tazas ($300$ g) en total.");

    expect(layout.parts).toEqual([]);
    expect(layout.intro).toEqual(["Sea $f(a) = 2$ y $5$ tazas ($300$ g) en total."]);
  });

  it("anida apartados dentro de actividades numeradas", () => {
    const layout = layoutSolution("4) a) Suma de cifras. b) Última cifra.\n5) Primos: $23$.");

    expect(layout.parts.map((part) => part.label)).toEqual(["4", "5"]);
    expect(layout.parts[0].parts.map((part) => [part.label, part.intro])).toEqual([
      ["a", ["Suma de cifras."]],
      ["b", ["Última cifra."]],
    ]);
    expect(layout.parts[1].intro).toEqual(["Primos: $23$."]);
  });
});

describe("splitSolutionLines", () => {
  it("abre línea en cada implicación", () => {
    expect(splitSolutionLines("$2x + 4x = 120 \\Rightarrow x = 20$ vacas")).toEqual([
      "$2x + 4x = 120$",
      "$\\Rightarrow x = 20$ vacas",
    ]);
  });

  it("parte las cadenas largas de igualdades y deja enteras las cortas", () => {
    expect(splitSolutionLines("$A = \\pi r^2 = 3{,}14 \\cdot 64 = 200{,}96$.")).toEqual([
      "$A = \\pi r^2$",
      "$= 3{,}14 \\cdot 64$",
      "$= 200{,}96$.",
    ]);
    expect(splitSolutionLines("$a = 7 - 2 = 5$.")).toEqual(["$a = 7 - 2 = 5$."]);
  });

  it("no parte igualdades dentro de llaves", () => {
    expect(splitSolutionLines("$P(\\text{a = b = c}) = 1$")).toEqual(["$P(\\text{a = b = c}) = 1$"]);
  });

  it("separa frases, punto y coma y flechas", () => {
    expect(
      splitSolutionLines("Comidos: $24 : 6 = 4$; quedan $20$. Hombres: $12$ → $P = 1/5$."),
    ).toEqual(["Comidos: $24 : 6 = 4$;", "quedan $20$.", "Hombres: $12$", "→ $P = 1/5$."]);
  });

  it("corta tras un punto seguido de fórmula", () => {
    expect(splitSolutionLines("Caras: $6$. $A = 10$.")).toEqual(["Caras: $6$.", "$A = 10$."]);
  });
});
