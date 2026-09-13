import { describe, expect, it } from "vitest";
import { formatRecommendationDetails } from "@/lib/recommendations/format-details";

describe("formatRecommendationDetails", () => {
  it("traduce claves conocidas al español", () => {
    const rows = formatRecommendationDetails({
      conceptTitle: "Ecuaciones",
      mastery: 0.42,
      status: "pending",
    });

    expect(rows).toEqual([
      { label: "Concepto", value: "Ecuaciones" },
      { label: "Dominio", value: "42%" },
      { label: "Estado", value: "Pendiente" },
    ]);
  });

  it("formatea números decimales y booleanos", () => {
    const rows = formatRecommendationDetails({
      recentAverageScore: 0.75,
      attemptsLastHour: 3,
      active: true,
    });

    expect(rows).toEqual([
      { label: "Media reciente", value: "0.75" },
      { label: "Intentos en la última hora", value: "3" },
      { label: "active", value: "Sí" },
    ]);
  });
});
