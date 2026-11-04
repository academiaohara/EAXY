import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseLevelCatalog } from "@/components/learning/course-level-catalog";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";

function course(
  id: string,
  title: string,
  orderIndex: number,
  lessonCount = 4,
): CourseCatalogEntry {
  return {
    id,
    slug: id,
    title,
    description: `${title}, descripción`,
    orderIndex,
    moduleCount: lessonCount > 0 ? 2 : 0,
    lessonCount,
  };
}

describe("CourseLevelCatalog", () => {
  it("enlaza directamente un año con un solo curso disponible", () => {
    render(
      <CourseLevelCatalog
        subject="fisica"
        courses={[course("fisica-2-eso", "Física y Química 2º ESO", 1)]}
      />,
    );

    expect(screen.getByRole("link", { name: /2 ESO/ })).toHaveAttribute(
      "href",
      "/aprender/curso/fisica-2-eso",
    );
  });

  it("muestra una sola entrada de año y revela sus variantes reales", () => {
    render(
      <CourseLevelCatalog
        subject="matematicas"
        courses={[
          course("matematicas-4-eso", "Matemáticas 4º ESO (A)", 1),
          course("matematicas-4-eso-b", "Matemáticas 4º ESO (B)", 2),
        ]}
      />,
    );

    expect(screen.getAllByText("4 ESO")).toHaveLength(1);
    fireEvent.click(screen.getByText("4 ESO"));
    const group = screen.getByTestId("course-level-4-eso");
    expect(
      within(group).getByRole("link", { name: /Opción A/ }),
    ).toHaveAttribute("href", "/aprender/curso/matematicas-4-eso");
    expect(
      within(group).getByRole("link", { name: /Opción B/ }),
    ).toHaveAttribute("href", "/aprender/curso/matematicas-4-eso-b");
  });

  it("mantiene visible un año sin lecciones y no lo hace accionable", () => {
    render(
      <CourseLevelCatalog
        subject="tecnologia"
        courses={[course("tecnologia-3-eso", "Tecnología 3º ESO", 1, 0)]}
      />,
    );

    const group = screen.getByTestId("course-level-3-eso");
    expect(within(group).getByText("Próximamente")).toBeVisible();
    expect(within(group).queryByRole("link")).toBeNull();
  });
});
