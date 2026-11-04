import { describe, expect, it } from "vitest";
import {
  formatCourseLevel,
  getCourseLevel,
  getCourseVariantLabel,
  groupCoursesByLevel,
} from "@/lib/navigation/course-levels";

type CourseFixture = {
  id: string;
  title: string;
  orderIndex: number;
};

describe("course levels", () => {
  it.each([
    ["Matemáticas 1º ESO", "1 ESO"],
    ["Física y Química 4º ESO", "4 ESO"],
    ["Dibujo Técnico I 1º Bachillerato", "1 Bachillerato"],
    ["Física 2º Bachillerato", "2 Bachillerato"],
  ])("normaliza el año de %s", (title, label) => {
    expect(formatCourseLevel(title)).toBe(label);
  });

  it("ordena los seis niveles escolares", () => {
    expect(getCourseLevel("Tecnología 3º ESO")).toEqual({
      key: "3-eso",
      label: "3 ESO",
      stage: "ESO",
      order: 2,
    });
    expect(getCourseLevel("Tecnología e Ingeniería II 2º Bachillerato")).toEqual({
      key: "2-bachillerato",
      label: "2 Bachillerato",
      stage: "Bachillerato",
      order: 5,
    });
  });

  it.each([
    ["Matemáticas 4º ESO (A)", "Opción A"],
    ["Matemáticas 4º ESO (B)", "Opción B"],
    ["Matemáticas 1º Bachillerato", "Ciencias"],
    ["Matemáticas Aplicadas a las CCSS I (1º Bachillerato)", "Ciencias Sociales"],
    ["Tecnología Industrial II 2º Bachillerato", "Tecnología Industrial II"],
    [
      "Tecnología e Ingeniería II 2º Bachillerato (ampliación)",
      "Tecnología e Ingeniería II · ampliación",
    ],
  ])("describe la variante de %s", (title, label) => {
    expect(getCourseVariantLabel(title)).toBe(label);
  });

  it("agrupa cursos repetidos por año sin perder su orden", () => {
    const courses: CourseFixture[] = [
      { id: "4a", title: "Matemáticas 4º ESO (A)", orderIndex: 4 },
      { id: "4b", title: "Matemáticas 4º ESO (B)", orderIndex: 5 },
      { id: "1c", title: "Matemáticas 1º Bachillerato", orderIndex: 6 },
      {
        id: "1s",
        title: "Matemáticas Aplicadas a las CCSS I (1º Bachillerato)",
        orderIndex: 7,
      },
    ];

    const groups = groupCoursesByLevel(courses);

    expect(groups.map((group) => group.label)).toEqual(["4 ESO", "1 Bachillerato"]);
    expect(groups[0]?.courses.map((course) => course.id)).toEqual(["4a", "4b"]);
    expect(groups[1]?.courses.map((course) => course.id)).toEqual(["1c", "1s"]);
  });

  it("mantiene accesible cada curso cuyo título no reconoce", () => {
    const groups = groupCoursesByLevel([
      { id: "known", title: "Física 2º ESO", orderIndex: 1 },
      { id: "unknown", title: "Curso experimental", orderIndex: 2 },
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[1]).toMatchObject({
      key: "course:unknown",
      label: "Curso experimental",
      stage: "Otros",
    });
    expect(groups[1]?.courses[0]?.id).toBe("unknown");
  });
});
