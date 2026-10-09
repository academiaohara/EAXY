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

  it("tiene las cinco lecciones de la unidad 4 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    const unit4 = firstYear?.modules.find((m) => m.title.includes("enteros"));
    expect(unit4?.lessons).toHaveLength(5);
    expect(unit4?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "enteros-positivos-negativos",
      "enteros-z-recta-valor-absoluto",
      "suma-resta-enteros",
      "parentesis-enteros",
      "multiplicacion-division-enteros",
    ]);
  });

  it("tiene las cinco lecciones de la unidad 3 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    const unit3 = firstYear?.modules.find((m) =>
      m.title.includes("Divisibilidad"),
    );
    expect(unit3?.lessons).toHaveLength(5);
    expect(unit3?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "relacion-divisibilidad",
      "multiplos-divisores-naturales",
      "criterios-divisibilidad",
      "primos-compuestos",
      "mcm-mcd-naturales",
    ]);
  });

  it("tiene las cuatro lecciones de la unidad 2 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    const unit2 = firstYear?.modules.find((m) => m.title.includes("Potencias"));
    expect(unit2?.lessons).toHaveLength(4);
    expect(unit2?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "potencias-base-exponente",
      "potencias-base-10",
      "numeros-grandes-abreviados",
      "raiz-cuadrada-naturales",
    ]);
  });

  it("tiene las cinco lecciones de la unidad 1 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[0]?.title).toBe("Los números naturales");
    expect(firstYear?.modules[0]?.lessons).toHaveLength(5);
    expect(
      firstYear?.modules[0]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "sistemas-numeracion-naturales",
      "aproximacion-redondeo-naturales",
      "suma-resta-naturales",
      "multiplicacion-division-naturales",
      "division-orden-operaciones-naturales",
    ]);
    expect(firstYear?.modules[0]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cuatro lecciones de la unidad 2 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[1]?.title).toBe("Potencias y raíces");
    expect(firstYear?.modules[1]?.lessons).toHaveLength(4);
    expect(firstYear?.modules[1]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cinco lecciones de la unidad 3 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[2]?.title).toBe("Divisibilidad");
    expect(firstYear?.modules[2]?.lessons).toHaveLength(5);
    expect(firstYear?.modules[2]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cinco lecciones de la unidad 4 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[3]?.title).toBe("Los números enteros");
    expect(firstYear?.modules[3]?.lessons).toHaveLength(5);
    expect(firstYear?.modules[3]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las tres lecciones de la unidad 5 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[4]?.title).toBe("Los números decimales");
    expect(firstYear?.modules[4]?.lessons).toHaveLength(3);
    expect(
      firstYear?.modules[4]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "ordenes-unidades-decimales",
      "operaciones-numeros-decimales",
      "division-numeros-decimales",
    ]);
    expect(firstYear?.modules[4]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cinco lecciones de la unidad 6 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[5]?.title).toBe("El sistema métrico decimal");
    expect(firstYear?.modules[5]?.lessons).toHaveLength(5);
    expect(
      firstYear?.modules[5]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "sistema-metrico-magnitudes",
      "sistema-metrico-longitud",
      "sistema-metrico-capacidad",
      "sistema-metrico-peso",
      "sistema-metrico-superficie",
    ]);
    expect(firstYear?.modules[5]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cinco lecciones de la unidad 7 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[6]?.title).toBe("Las fracciones");
    expect(firstYear?.modules[6]?.lessons).toHaveLength(5);
    expect(
      firstYear?.modules[6]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "fracciones-parte-unidad",
      "fracciones-operador",
      "fracciones-decimales",
      "fracciones-equivalentes",
      "fracciones-problemas",
    ]);
    expect(firstYear?.modules[6]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cuatro lecciones de la unidad 8 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[7]?.title).toBe("Operaciones con fracciones");
    expect(firstYear?.modules[7]?.lessons).toHaveLength(4);
    expect(
      firstYear?.modules[7]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "operaciones-fracciones-comun-denominador",
      "operaciones-fracciones-suma-resta",
      "operaciones-fracciones-multiplicacion-division",
      "operaciones-fracciones-problemas",
    ]);
    expect(firstYear?.modules[7]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cuatro lecciones de la unidad 9 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[8]?.title).toBe("Proporcionalidad y porcentajes");
    expect(firstYear?.modules[8]?.lessons).toHaveLength(4);
    expect(
      firstYear?.modules[8]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "proporcionalidad-magnitudes",
      "proporcionalidad-directa-problemas",
      "porcentajes",
      "aumentos-disminuciones-porcentuales",
    ]);
    expect(firstYear?.modules[8]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las seis lecciones de la unidad 10 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[9]?.title).toBe("Álgebra");
    expect(firstYear?.modules[9]?.lessons).toHaveLength(6);
    expect(
      firstYear?.modules[9]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "algebra-letras-numeros",
      "algebra-expresiones-monomios",
      "algebra-ecuaciones",
      "algebra-tecnicas-ecuaciones",
      "algebra-resolucion-primer-grado",
      "algebra-problemas-ecuaciones",
    ]);
    expect(firstYear?.modules[9]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cuatro lecciones de la unidad 12 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[10]?.title).toBe("Cuerpos geométricos");
    expect(firstYear?.modules[10]?.lessons).toHaveLength(4);
    expect(
      firstYear?.modules[10]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "cuerpos-geometricos-poliedros",
      "cuerpos-geometricos-prismas",
      "cuerpos-geometricos-piramides",
      "cuerpos-geometricos-redondos",
    ]);
    expect(firstYear?.modules[10]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cuatro lecciones de la unidad 13 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[11]?.title).toBe("Áreas y perímetros");
    expect(firstYear?.modules[11]?.lessons).toHaveLength(4);
    expect(
      firstYear?.modules[11]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "areas-cuadrilateros",
      "areas-triangulo",
      "areas-poligonos",
      "areas-circulo",
    ]);
    expect(firstYear?.modules[11]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las seis lecciones de la unidad 14 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[12]?.title).toBe("Tablas y gráficas");
    expect(firstYear?.modules[12]?.lessons).toHaveLength(6);
    expect(
      firstYear?.modules[12]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "tablas-graficas-coordenadas-cartesianas",
      "tablas-graficas-informacion-puntos",
      "tablas-graficas-interpretacion-graficas",
      "tablas-graficas-distribuciones-estadisticas",
      "tablas-graficas-parametros-estadisticos",
      "tablas-graficas-graficos-estadisticos",
    ]);
    expect(firstYear?.modules[12]?.topicExercises ?? []).toHaveLength(0);
  });

  it("tiene las cinco lecciones de la unidad 15 en 1.º ESO, sin ejercicios externos", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[13]?.title).toBe("Probabilidad");
    expect(firstYear?.modules[13]?.lessons).toHaveLength(5);
    expect(
      firstYear?.modules[13]?.lessons.map((l) => l.interactiveSlug),
    ).toEqual([
      "probabilidad-experimento-aleatorio-determinista",
      "probabilidad-espacio-muestral",
      "probabilidad-sucesos-seguro-imposible",
      "probabilidad-frecuencias",
      "probabilidad-laplace",
    ]);
    expect(firstYear?.modules[13]?.topicExercises ?? []).toHaveLength(0);
  });
});
