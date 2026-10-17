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
    expect(
      fourthYear?.modules[0]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "ecuaciones-lineales-dos-incognitas",
      "sistemas-lineales-grafica",
      "resolucion-sistemas-lineales",
      "sistemas-no-lineales",
      "problemas-con-sistemas",
    ]);
  });

  it("expone solo los temas 1, 2 y 3 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules).toHaveLength(3);
    expect(firstYear?.modules.map((m) => m.slug)).toEqual([
      "numeros-naturales",
      "potencias-y-raices",
      "divisibilidad",
    ]);
  });

  it("tiene las dos lecciones de la unidad 2 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    const unit2 = firstYear?.modules.find((m) => m.title.includes("Potencias"));
    expect(unit2?.lessons).toHaveLength(2);
    expect(unit2?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "potencias-base-exponente",
      "raiz-cuadrada-naturales",
    ]);
  });

  it("tiene las cuatro lecciones de la unidad 1 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[0]?.title).toBe("Los números naturales");
    expect(firstYear?.modules[0]?.lessons).toHaveLength(4);
    expect(
      firstYear?.modules[0]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "sistemas-numeracion-naturales",
      "suma-resta-naturales",
      "multiplicacion-division-naturales",
      "division-orden-operaciones-naturales",
    ]);
    expect(firstYear?.modules[0]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las dos lecciones de la unidad 2 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[1]?.title).toBe("Potencias y raíces");
    expect(firstYear?.modules[1]?.lessons).toHaveLength(2);
    expect(firstYear?.modules[1]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cinco lecciones de la unidad 3 (divisibilidad) en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[2]?.title).toBe("Divisibilidad");
    expect(firstYear?.modules[2]?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "divisibilidad",
      "criterios-divisibilidad",
      "factores-primos",
      "minimo-comun-multiplo",
      "maximo-comun-divisor",
    ]);
  });
});
