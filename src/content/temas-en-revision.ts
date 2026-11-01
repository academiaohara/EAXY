import type { Curriculum } from "@/content/types";

/**
 * Ocultación TEMPORAL de Dibujo Técnico mientras se revisa la migración a la «mesa de dibujo».
 *
 * Los temas y cursos de esta lista no salen en la web (catálogo, aprender, curso, tema). Las lecciones
 * siguen existiendo en `src/data/lessons` y `fullCurriculum` conserva el catálogo completo (lo usan los tests).
 * Para volver a mostrar un tema, quita su slug de la lista; para mostrarlo todo, deja las dos listas vacías.
 */
export const CURSOS_OCULTOS: string[] = ["dibujo-tecnico-2-bachillerato"];

export const MODULOS_OCULTOS: Record<string, string[]> = {
  "dibujo-tecnico-1-bachillerato": [
    "escalas",
    "sistemas-de-representacion",
    "sistema-diedrico",
    "sistema-planos-acotados",
    "sistema-axonometrico",
    "sistema-perspectiva-caballera",
    "normalizacion-principios-generales",
    "normalizacion-acotacion",
    "historia-fundamentos-geometricos",
    "sistema-conico",
    "sistemas-cad",
  ],
};

export function ocultarTemasEnRevision(source: Curriculum): Curriculum {
  return {
    ...source,
    courses: source.courses
      .filter((course) => !CURSOS_OCULTOS.includes(course.slug))
      .map((course) => {
        const ocultos = MODULOS_OCULTOS[course.slug];
        if (!ocultos) return course;
        return { ...course, modules: course.modules.filter((m) => !ocultos.includes(m.slug)) };
      }),
  };
}
