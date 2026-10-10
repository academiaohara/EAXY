import { describe, expect, it } from "vitest";
import {
  buildLearningTrail,
  courseHref,
  courseShortTitle,
  interactiveLessonHref,
  stripLessonNumber,
  topicHref,
} from "@/lib/navigation/learning-trail";
import { getActiveSection } from "@/lib/navigation/sections";

describe("getActiveSection", () => {
  it("marca la sección por prefijo de ruta", () => {
    expect(getActiveSection("/aprender")).toBe("aprender");
    expect(getActiveSection("/aprender/curso/abc/tema/def")).toBe("aprender");
    expect(getActiveSection("/practicar/ecuaciones")).toBe("practicar");
    expect(getActiveSection("/progreso")).toBe("progreso");
  });

  it("no confunde prefijos parciales ni rutas ajenas", () => {
    expect(getActiveSection("/aprenderlo")).toBeNull();
    expect(getActiveSection("/")).toBeNull();
    expect(getActiveSection(null)).toBeNull();
  });
});

describe("learning-trail", () => {
  it("construye las rutas de curso y tema", () => {
    expect(courseHref("c1")).toBe("/aprender/curso/c1");
    expect(topicHref("c1", "m2")).toBe("/aprender/curso/c1/tema/m2");
    expect(interactiveLessonHref("c1", "m2", "suma")).toBe(
      "/aprender/curso/c1/tema/m2/leccion/suma",
    );
  });

  it("acorta títulos de curso y lección", () => {
    expect(courseShortTitle("Matemáticas 4º ESO")).toBe("4º ESO");
    expect(courseShortTitle("Álgebra")).toBe("Álgebra");
    expect(stripLessonNumber("3. Sistemas no lineales")).toBe("Sistemas no lineales");
  });

  it("marca el curso como página actual cuando es el último nivel", () => {
    expect(buildLearningTrail({ course: { slug: "matematicas-1-eso", title: "Matemáticas 1º ESO" } })).toEqual([
      { label: "Aprender", href: "/aprender" },
      { label: "1º ESO" },
    ]);
  });

  it("enlaza curso y tema y deja la hoja como página actual", () => {
    expect(
      buildLearningTrail({
        course: { slug: "matematicas-1-eso", title: "Matemáticas 1º ESO" },
        topic: { slug: "fracciones", title: "Fracciones", number: 4 },
        leaves: ["Fracciones equivalentes"],
      }),
    ).toEqual([
      { label: "Aprender", href: "/aprender" },
      { label: "1º ESO", href: "/aprender/curso/matematicas-1-eso" },
      { label: "Tema 4: Fracciones", href: "/aprender/curso/matematicas-1-eso/tema/fracciones" },
      { label: "Fracciones equivalentes" },
    ]);
  });

  it("deja el tema sin enlace cuando es la página actual", () => {
    const trail = buildLearningTrail({
      course: { slug: "matematicas-1-eso", title: "Matemáticas 1º ESO" },
      topic: { slug: "fracciones", title: "Fracciones" },
    });
    expect(trail.at(-1)).toEqual({ label: "Fracciones" });
  });
});
