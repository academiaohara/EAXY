import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { TopicExerciseSummary } from "@/lib/curriculum/types";

vi.mock("next/font/google", () => ({
  Caveat: () => ({ className: "" }),
}));

import { TopicExercisesSection } from "@/components/learning/topic-exercises-section";

const exercise: TopicExerciseSummary = {
  id: "media-test",
  title: "Calcula la distancia",
  statement: "Una ruta mide $12$ km.",
  solutionImageUrl: "https://images.example.com/resolucion.png",
  solutionVideoUrl: "https://www.youtube.com/watch?v=abc123XYZ09",
};

describe("TopicExercisesSection", () => {
  it("muestra imagen y vídeo solo cuando el ejercicio los proporciona", () => {
    render(
      <TopicExercisesSection moduleTitle="Medida" exercises={[exercise]} />,
    );

    fireEvent.click(screen.getByTestId("topic-exercise-media-test"));

    expect(
      screen.getByTestId("topic-exercise-solution-image"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Resolución de Calcula la distancia" }),
    ).toHaveAttribute("src", exercise.solutionImageUrl);
    expect(screen.getByTestId("topic-exercise-view-video")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("topic-exercise-view-video"));
    expect(screen.getByTestId("topic-exercise-video")).toBeInTheDocument();
    expect(
      screen.getByTitle("Resolución: Calcula la distancia"),
    ).toHaveAttribute("src", "https://www.youtube.com/embed/abc123XYZ09");
  });

  it("no muestra controles de medios para enlaces ausentes o inseguros", () => {
    render(
      <TopicExercisesSection
        moduleTitle="Medida"
        exercises={[
          {
            id: "without-media",
            title: "Sin recursos",
            statement: "Resuelve el problema.",
            solutionImageUrl: "javascript:alert(1)",
            solutionVideoUrl: "https://example.com/video",
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByTestId("topic-exercise-without-media"));

    expect(
      screen.queryByTestId("topic-exercise-solution-image"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("topic-exercise-view-video"),
    ).not.toBeInTheDocument();
  });
});
