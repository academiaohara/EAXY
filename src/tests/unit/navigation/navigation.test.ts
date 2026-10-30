import { describe, expect, it } from "vitest";
import {
  buildLearningTrail,
  courseCardTitle,
  courseHref,
  courseLevelLabel,
  courseRangeLabel,
  courseShortTitle,
  interactiveLessonHref,
  stripLessonNumber,
  topicHref,
} from "@/lib/navigation/learning-trail";
import { getActiveSubject, subjectOfCourse } from "@/lib/navigation/subjects";

describe("getActiveSubject", () => {
  it("marca la materia por ruta de materia o de curso", () => {
    expect(getActiveSubject("/aprender/materia/fisica")).toBe("fisica");
    expect(getActiveSubject("/aprender/curso/tecnologia-1-eso/tema/x")).toBe(
      "tecnologia",
    );
    expect(getActiveSubject("/aprender/curso/matematicas-1-eso")).toBe(
      "matematicas",
    );
  });

  it("no marca materia en rutas ajenas o desconocidas", () => {
    expect(getActiveSubject("/aprender")).toBeNull();
    expect(getActiveSubject("/perfil")).toBeNull();
    expect(getActiveSubject("/aprender/materia/historia")).toBeNull();
    expect(getActiveSubject(null)).toBeNull();
  });
});

describe("subjectOfCourse", () => {
  it("deduce la materia del slug o del título", () => {
    expect(subjectOfCourse({ slug: "fisica-4-eso" })).toBe("fisica");
    expect(subjectOfCourse({ slug: "quimica-2-bachillerato" })).toBe("fisica");
    expect(subjectOfCourse({ title: "Tecnología 2º ESO" })).toBe("tecnologia");
    expect(subjectOfCourse({ slug: "matematicas-1-eso" })).toBe("matematicas");
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
    expect(courseShortTitle("Física 4º ESO")).toBe("4º ESO");
    expect(courseShortTitle("Física y Química 2º ESO")).toBe("2º ESO");
    expect(courseShortTitle("Química 2º Bachillerato")).toBe("2º Bachillerato");
    expect(courseShortTitle("Álgebra")).toBe("Álgebra");
    expect(stripLessonNumber("3. Sistemas no lineales")).toBe(
      "Sistemas no lineales",
    );
  });

  it.each([
    ["Dibujo Técnico I 1º Bachillerato", "1º", "Dibujo Técnico I"],
    [
      "Tecnología e Ingeniería II 2º Bachillerato (ampliación)",
      "2º",
      "Tecnología e Ingeniería II (ampliación)",
    ],
    [
      "Matemáticas Aplicadas a las CCSS I (1º Bachillerato)",
      "1º",
      "Matemáticas Aplicadas a las CCSS I",
    ],
    ["Matemáticas 1º ESO", "1º", "Matemáticas 1º ESO"],
    ["Física y Química 4º ESO", "4º", "Física y Química 4º ESO"],
  ])("presenta el nivel y el título de %s", (title, level, cardTitle) => {
    expect(courseLevelLabel(title)).toBe(level);
    expect(courseCardTitle(title)).toBe(cardTitle);
  });

  it("resume los niveles de un bloque sin repetir la asignatura ni la etapa", () => {
    expect(courseRangeLabel(["Dibujo Técnico I 1º Bachillerato"])).toBe("1º");
    expect(
      courseRangeLabel([
        "Dibujo Técnico I 1º Bachillerato",
        "Dibujo Técnico II 2º Bachillerato",
      ]),
    ).toBe("1º → 2º");
    expect(courseRangeLabel(["Tecnología 2º ESO", "Tecnología 4º ESO"])).toBe(
      "2º → 4º",
    );
  });

  it("marca el curso como página actual cuando es el último nivel", () => {
    expect(
      buildLearningTrail({
        course: { slug: "matematicas-1-eso", title: "Matemáticas 1º ESO" },
      }),
    ).toEqual([
      { label: "Aprender", href: "/aprender" },
      { label: "Matemáticas", href: "/aprender/materia/matematicas" },
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
      { label: "Matemáticas", href: "/aprender/materia/matematicas" },
      { label: "1º ESO", href: "/aprender/curso/matematicas-1-eso" },
      {
        label: "Tema 4: Fracciones",
        href: "/aprender/curso/matematicas-1-eso/tema/fracciones",
      },
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
