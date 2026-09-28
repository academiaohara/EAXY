import { describe, expect, it } from "vitest";
import { curriculum, getAllCourses, validateCurriculum } from "@/content";

describe("validateCurriculum", () => {
  it("valida el catálogo principal sin errores", () => {
    expect(validateCurriculum(curriculum)).toEqual([]);
  });

  it("incluye los seis niveles de ESO y Bachillerato", () => {
    expect(getAllCourses(curriculum)).toHaveLength(6);
  });

  it("tiene las cinco lecciones interactivas del tema 7 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    expect(fourthYear?.modules[0]?.lessons).toHaveLength(5);
    expect(fourthYear?.modules[0]?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "ecuaciones-lineales-dos-incognitas",
      "sistemas-lineales-grafica",
      "resolucion-sistemas-lineales",
      "sistemas-no-lineales",
      "problemas-con-sistemas",
    ]);
  });

  it("tiene las cinco lecciones de la unidad 1 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[0]?.title).toBe("Los números naturales");
    expect(firstYear?.modules[0]?.lessons).toHaveLength(5);
    expect(firstYear?.modules[0]?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "sistemas-numeracion-naturales",
      "aproximacion-redondeo-naturales",
      "suma-resta-naturales",
      "multiplicacion-naturales",
      "division-orden-operaciones-naturales",
    ]);
  });
});
