import { describe, expect, it } from "vitest";
import { curriculum, getAllCourses, validateCurriculum } from "@/content";

describe("validateCurriculum", () => {
  it("valida el catálogo principal sin errores", () => {
    expect(validateCurriculum(curriculum)).toEqual([]);
  });

  it("incluye los siete cursos de matemáticas y las materias de física y tecnología", () => {
    const titles = getAllCourses(curriculum).map((course) => course.title);
    expect(titles.filter((title) => title.startsWith("Matemáticas"))).toHaveLength(7);
    expect(titles.filter((title) => title.startsWith("Física"))).toHaveLength(5);
    expect(titles.filter((title) => title.startsWith("Tecnología"))).toHaveLength(5);
  });

  it("tiene las ocho lecciones interactivas del tema 7 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const sistemas = fourthYear?.modules.find((m) => m.slug === "sistemas-de-ecuaciones");
    expect(sistemas?.orderIndex).toBe(7);
    expect(sistemas?.lessons).toHaveLength(8);
    expect(sistemas?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "ecuaciones-lineales-dos-incognitas-4eso",
      "sistemas-lineales-grafica-4eso",
      "metodo-sustitucion-4eso",
      "metodo-igualacion-4eso",
      "metodo-reduccion-4eso",
      "sistemas-no-lineales-4eso",
      "problemas-sistemas-compras-4eso",
      "problemas-sistemas-capitales-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 1 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema1 = fourthYear?.modules.find((m) => m.slug === "numeros-enteros-y-racionales");
    expect(tema1?.orderIndex).toBe(1);
    expect(tema1?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "enteros-recta-valor-absoluto-4eso",
      "operaciones-enteros-4eso",
      "potencias-base-entera-4eso",
      "numeros-racionales-4eso",
      "simplificar-equivalentes-operador-4eso",
      "operaciones-fracciones-4eso",
      "potencias-exponente-entero-4eso",
      "problemas-fracciones-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 2 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema2 = fourthYear?.modules.find((m) => m.slug === "numeros-decimales");
    expect(tema2?.orderIndex).toBe(2);
    expect(tema2?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "fraccion-a-decimal-4eso",
      "decimal-a-fraccion-4eso",
      "periodicos-mixtos-racionales-4eso",
      "aproximaciones-cifras-significativas-4eso",
      "errores-absoluto-relativo-4eso",
      "notacion-cientifica-4eso",
      "operaciones-notacion-cientifica-4eso",
      "problemas-decimales-notacion-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 3 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema3 = fourthYear?.modules.find((m) => m.slug === "numeros-reales");
    expect(tema3?.orderIndex).toBe(3);
    expect(tema3?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "numeros-irracionales-4eso",
      "numeros-reales-recta-4eso",
      "raices-radicales-4eso",
      "forma-exponencial-radicales-4eso",
      "simplificar-extraer-factores-4eso",
      "operaciones-radicales-4eso",
      "racionalizar-4eso",
      "problemas-numeros-reales-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 4 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema4 = fourthYear?.modules.find((m) => m.slug === "problemas-aritmeticos");
    expect(tema4?.orderIndex).toBe(4);
    expect(tema4?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "proporcionalidad-simple-4eso",
      "proporcionalidad-compuesta-4eso",
      "repartos-proporcionales-4eso",
      "mezclas-promedios-4eso",
      "problemas-moviles-4eso",
      "calculos-porcentajes-4eso",
      "variaciones-porcentuales-4eso",
      "interes-bancario-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 5 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema5 = fourthYear?.modules.find((m) => m.slug === "expresiones-algebraicas");
    expect(tema5?.orderIndex).toBe(5);
    expect(tema5?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "monomios-4eso",
      "operaciones-monomios-4eso",
      "polinomios-4eso",
      "suma-resta-polinomios-4eso",
      "producto-polinomios-4eso",
      "factor-comun-4eso",
      "expresiones-primer-grado-4eso",
      "expresiones-segundo-grado-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 6 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema6 = fourthYear?.modules.find((m) => m.slug === "ecuaciones-e-inecuaciones");
    expect(tema6?.orderIndex).toBe(6);
    expect(tema6?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "ecuaciones-soluciones-4eso",
      "ecuaciones-primer-grado-4eso",
      "problemas-primer-grado-4eso",
      "ecuaciones-segundo-grado-completas-4eso",
      "ecuaciones-incompletas-producto-cero-4eso",
      "problemas-segundo-grado-4eso",
      "otras-ecuaciones-4eso",
      "inecuaciones-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 8 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema8 = fourthYear?.modules.find((m) => m.slug === "funciones-caracteristicas");
    expect(tema8?.orderIndex).toBe(8);
    expect(tema8?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "funcion-concepto-4eso",
      "funcion-formas-4eso",
      "funcion-tabla-grafica-4eso",
      "funcion-continuidad-4eso",
      "funcion-crecimiento-extremos-4eso",
      "funcion-tendencia-periodicidad-4eso",
      "funcion-interpretar-graficas-4eso",
      "funcion-repaso-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 9 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema9 = fourthYear?.modules.find((m) => m.slug === "las-funciones-lineales");
    expect(tema9?.orderIndex).toBe(9);
    expect(tema9?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "lineal-idea-4eso",
      "lineal-tipos-4eso",
      "lineal-pendiente-grafica-4eso",
      "lineal-pendiente-puntos-4eso",
      "lineal-punto-pendiente-4eso",
      "lineal-problemas-4eso",
      "lineal-trozos-4eso",
      "lineal-repaso-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 10 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema10 = fourthYear?.modules.find((m) => m.slug === "otras-funciones-elementales");
    expect(tema10?.orderIndex).toBe(10);
    expect(tema10?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "cuad-parabola-4eso",
      "cuad-general-4eso",
      "cuad-aplicaciones-4eso",
      "inversa-hiperbola-4eso",
      "inversa-aplicaciones-4eso",
      "radicales-funcion-4eso",
      "exponencial-funcion-4eso",
      "exponencial-crecimiento-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 11 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema11 = fourthYear?.modules.find((m) => m.slug === "la-semejanza-aplicaciones");
    expect(tema11?.orderIndex).toBe(11);
    expect(tema11?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "semejanza-figuras-4eso",
      "semejanza-escala-4eso",
      "semejanza-razones-4eso",
      "semejanza-tales-4eso",
      "semejanza-triangulos-4eso",
      "semejanza-rectangulos-4eso",
      "semejanza-troncos-4eso",
      "semejanza-homotecia-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 12 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema12 = fourthYear?.modules.find((m) => m.slug === "geometria-analitica");
    expect(tema12?.orderIndex).toBe(12);
    expect(tema12?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "analitica-vectores-4eso",
      "analitica-modulo-4eso",
      "analitica-operaciones-4eso",
      "analitica-punto-medio-4eso",
      "analitica-distancia-4eso",
      "analitica-recta-vector-4eso",
      "analitica-paralelas-4eso",
      "analitica-perpendiculares-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 13 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema13 = fourthYear?.modules.find((m) => m.slug === "estadistica");
    expect(tema13?.orderIndex).toBe(13);
    expect(tema13?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "estadistica-ramas-4eso",
      "estadistica-tablas-4eso",
      "estadistica-media-4eso",
      "estadistica-dispersion-4eso",
      "estadistica-cv-4eso",
      "estadistica-posicion-4eso",
      "estadistica-caja-4eso",
      "estadistica-repaso-4eso",
    ]);
  });

  it("tiene las ocho lecciones interactivas del tema 14 en 4.º ESO", () => {
    const fourthYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("4º ESO"),
    );
    const tema14 = fourthYear?.modules.find((m) => m.slug === "calculo-de-probabilidades");
    expect(tema14?.orderIndex).toBe(14);
    expect(tema14?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "prob-experiencias-4eso",
      "prob-laplace-4eso",
      "prob-dos-dados-4eso",
      "prob-compuestas-4eso",
      "prob-independientes-4eso",
      "prob-dependientes-4eso",
      "prob-arbol-4eso",
      "prob-repaso-4eso",
    ]);
  });

  it("expone los temas 1 a 15 en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules).toHaveLength(15);
    expect(firstYear?.modules.map((m) => m.slug)).toEqual([
      "numeros-naturales",
      "potencias-y-raices",
      "divisibilidad",
      "numeros-enteros",
      "numeros-decimales",
      "sistema-metrico-decimal",
      "fracciones",
      "operaciones-con-fracciones",
      "proporcionalidad-y-porcentajes",
      "algebra",
      "rectas-y-angulos",
      "figuras-geometricas",
      "areas-y-perimetros",
      "tablas-y-graficas",
      "probabilidad",
    ]);
  });

  it("tiene las cinco lecciones de la unidad 6 (sistema métrico decimal) en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    const unit6 = firstYear?.modules.find((m) => m.slug === "sistema-metrico-decimal");
    expect(unit6?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "sistema-metrico-magnitudes",
      "sistema-metrico-longitud",
      "sistema-metrico-capacidad",
      "sistema-metrico-peso",
      "sistema-metrico-superficie",
    ]);
  });

  it("tiene las tres lecciones de la unidad 5 (decimales) en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    const unit5 = firstYear?.modules.find((m) => m.slug === "numeros-decimales");
    expect(unit5?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "ordenes-unidades-decimales",
      "operaciones-numeros-decimales",
      "division-numeros-decimales",
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

  it("tiene las cuatro lecciones de la unidad 4 (números enteros) en 1.º ESO", () => {
    const firstYear = getAllCourses(curriculum).find((course) =>
      course.title.includes("1º ESO"),
    );
    expect(firstYear?.modules[3]?.title).toBe("Los números enteros");
    expect(firstYear?.modules[3]?.lessons.map((l) => l.interactiveSlug)).toEqual([
      "numeros-enteros",
      "suma-resta-enteros",
      "parentesis-enteros",
      "multiplicacion-division-enteros",
    ]);
  });
  it("4.º ESO B: once temas en el orden del Temario, con lecciones nuevas donde no coincide con 4.º A", () => {
    const b = getAllCourses(curriculum).find((course) => course.slug === "matematicas-4-eso-b");
    expect(b?.title).toBe("Matemáticas 4º ESO (B)");
    expect(b?.modules.map((m) => m.slug)).toEqual([
      "numeros-reales",
      "polinomios-y-fracciones-algebraicas",
      "ecuaciones-inecuaciones-y-sistemas",
      "funciones-caracteristicas",
      "funciones-elementales",
      "la-semejanza-aplicaciones",
      "trigonometria",
      "geometria-analitica",
      "estadistica",
      "calculo-de-probabilidades",
      "combinatoria",
    ]);
    const lessons = (slug: string) => b?.modules.find((m) => m.slug === slug)?.lessons.map((l) => l.interactiveSlug);
    expect(lessons("trigonometria")).toHaveLength(9);
    expect(lessons("combinatoria")).toHaveLength(8);
    expect(lessons("polinomios-y-fracciones-algebraicas")).toContain("regla-ruffini-4esob");
    expect(lessons("numeros-reales")).toContain("intervalos-acotados-4esob");
    // Todas las lecciones de 4.º B tienen identificador propio (no comparten slug con 4.º A).
    const a = getAllCourses(curriculum).find((course) => course.slug === "matematicas-4-eso");
    const slugsA = new Set(a?.modules.flatMap((m) => m.lessons.map((l) => l.interactiveSlug)));
    const slugsB = b?.modules.flatMap((m) => m.lessons.map((l) => l.interactiveSlug)) ?? [];
    expect(slugsB.filter((slug) => slugsA.has(slug))).toEqual([]);
  });
});
