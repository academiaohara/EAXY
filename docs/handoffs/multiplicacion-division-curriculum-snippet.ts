/** Extracto de src/content/curriculum.ts — solo contexto de esta lección. */
export const lessonCatalogEntry = {
  course: { slug: "matematicas-1-eso", title: "Matemáticas 1º ESO" },
  module: { slug: "numeros-naturales", title: "Los números naturales" },
  lesson: {
    id: "lesson-104", // lessonId(104) en el repo real
    title: "4. Multiplicación y división",
    summary:
      "Suma repetida, propiedades, reparto en partes iguales y divisiones exactas y enteras.",
    orderIndex: 4,
    kind: "interactive" as const,
    interactiveSlug: "multiplicacion-division-naturales",
  },
};
