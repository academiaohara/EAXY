import { describe, expect, it } from "vitest";
import {
  findConceptForTerm,
  findConcepts,
  LESSON_CONCEPTS,
  normalizeConceptText,
} from "@/lib/lesson/concept-glossary";
import { interactiveLessons } from "@/data/lessons";

function ids(text: string): string[] {
  return findConcepts(text).map((concept) => concept.id);
}

describe("normalizeConceptText", () => {
  it("quita tildes, mayúsculas y marcas de formato", () => {
    expect(normalizeConceptText("La **Solución** de $x$")).toBe("la solucion de x");
  });
});

describe("findConcepts", () => {
  it("devuelve los conceptos en el orden en que aparecen", () => {
    expect(ids("Despeja la incógnita y comprueba la solución")).toEqual([
      "despejar",
      "incognita",
      "comprobar",
      "solucion",
    ]);
  });

  it("prefiere el término más largo cuando se solapan", () => {
    expect(ids("Tiene **infinitas soluciones**")).toEqual(["infinitas-soluciones"]);
    expect(ids("¿Qué es un sistema no lineal?")).toEqual(["sistema", "no-lineal"]);
  });

  it("no confunde palabras que sólo contienen el término", () => {
    expect(ids("Las rectas se cortan")).not.toContain("recta");
    expect(ids("La suma de dos números es 14")).not.toContain("reduccion");
  });

  it("no repite un concepto que sale varias veces", () => {
    expect(ids("Son paralelas: sistema incompatible, ninguna solución")).toEqual([
      "incompatible",
      "sistema",
    ]);
  });
});

describe("findConceptForTerm", () => {
  it("encuentra el concepto de un término resaltado", () => {
    expect(findConceptForTerm("Compatible determinado")?.id).toBe("compatible-determinado");
    expect(findConceptForTerm("Sustitución")?.id).toBe("sustitucion");
  });

  it("no inventa conceptos para etiquetas de botones", () => {
    expect(findConceptForTerm("Ver siguiente paso")).toBeUndefined();
  });
});

describe("glosario", () => {
  it("guarda los alias ya normalizados para poder encontrarlos", () => {
    for (const concept of LESSON_CONCEPTS) {
      for (const alias of concept.aliases) {
        expect(normalizeConceptText(alias)).toBe(alias);
      }
    }
  });

  it("explica casi todos los términos resaltados de las lecciones", () => {
    const terms = Object.values(interactiveLessons).flatMap((lesson) =>
      lesson.steps.flatMap((step) =>
        [...(step.content ?? []), step.warning ?? ""].flatMap((text) =>
          [...text.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1]),
        ),
      ),
    );
    const unexplained = terms.filter((term) => !findConceptForTerm(term));
    expect(unexplained).toEqual(["Ver siguiente paso"]);
  });
});
