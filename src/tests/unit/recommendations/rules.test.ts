import { describe, expect, it } from "vitest";
import { getPrimaryRecommendation } from "@/lib/recommendations/engine";
import {
  CONCEPT_ADVANCED,
  CONCEPT_BASIC,
  createRecommendationContext,
} from "@/tests/unit/recommendations/fixtures";

describe("recommendation rules", () => {
  it("R1 — prioriza asignación pendiente del aula", () => {
    const context = createRecommendationContext({
      pendingAssignments: [
        {
          id: "assignment-1",
          classroomName: "3º A",
          conceptId: CONCEPT_BASIC.id,
          exerciseId: "ex-1",
        },
      ],
    });

    const recommendation = getPrimaryRecommendation(context);

    expect(recommendation?.explanation.ruleId).toBe("R1");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
    expect(recommendation?.exerciseId).toBe("ex-1");
  });

  it("R2 — recupera el concepto con mastery más bajo sin práctica reciente", () => {
    const context = createRecommendationContext({
      masteryByConcept: new Map([
        [
          CONCEPT_BASIC.id,
          {
            conceptId: CONCEPT_BASIC.id,
            mastery: 0.2,
            lastAttemptAt: new Date("2026-09-10T12:00:00.000Z"),
          },
        ],
        [
          CONCEPT_ADVANCED.id,
          {
            conceptId: CONCEPT_ADVANCED.id,
            mastery: 0.35,
            lastAttemptAt: new Date("2026-09-10T12:00:00.000Z"),
          },
        ],
      ]),
      attempts: [
        {
          exerciseId: "ex-1",
          conceptId: CONCEPT_BASIC.id,
          correct: false,
          createdAt: new Date("2026-09-10T12:00:00.000Z"),
        },
        {
          exerciseId: "ex-3",
          conceptId: CONCEPT_ADVANCED.id,
          correct: false,
          createdAt: new Date("2026-09-10T12:00:00.000Z"),
        },
      ],
    });

    const recommendation = getPrimaryRecommendation(context);

    expect(recommendation?.explanation.ruleId).toBe("R2");
    expect(recommendation?.conceptId).toBe(CONCEPT_BASIC.id);
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("R3 — refuerza concepto en developing con errores recientes", () => {
    const now = new Date("2026-09-13T12:00:00.000Z");
    const context = createRecommendationContext({
      now,
      masteryByConcept: new Map([
        [
          CONCEPT_BASIC.id,
          {
            conceptId: CONCEPT_BASIC.id,
            mastery: 0.55,
            lastAttemptAt: now,
          },
        ],
      ]),
      attempts: [
        {
          exerciseId: "ex-1",
          conceptId: CONCEPT_BASIC.id,
          correct: false,
          createdAt: new Date("2026-09-13T11:50:00.000Z"),
        },
        {
          exerciseId: "ex-1",
          conceptId: CONCEPT_BASIC.id,
          correct: false,
          createdAt: new Date("2026-09-13T11:40:00.000Z"),
        },
        {
          exerciseId: "ex-2",
          conceptId: CONCEPT_BASIC.id,
          correct: true,
          createdAt: new Date("2026-09-13T11:30:00.000Z"),
        },
      ],
    });

    const recommendation = getPrimaryRecommendation(context);

    expect(recommendation?.explanation.ruleId).toBe("R3");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("R4 — avanza cuando los prerrequisitos están cumplidos", () => {
    const context = createRecommendationContext({
      masteryByConcept: new Map([
        [
          CONCEPT_BASIC.id,
          {
            conceptId: CONCEPT_BASIC.id,
            mastery: 0.5,
            lastAttemptAt: new Date("2026-09-12T12:00:00.000Z"),
          },
        ],
        [
          CONCEPT_ADVANCED.id,
          {
            conceptId: CONCEPT_ADVANCED.id,
            mastery: 0,
            lastAttemptAt: null,
          },
        ],
      ]),
    });

    const recommendation = getPrimaryRecommendation(context);

    expect(recommendation?.explanation.ruleId).toBe("R4");
    expect(recommendation?.conceptId).toBe(CONCEPT_ADVANCED.id);
    expect(recommendation?.lessonId).toBe("lesson-2");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("R5 — sugiere repaso espaciado en conceptos proficient", () => {
    const now = new Date("2026-09-13T12:00:00.000Z");
    const context = createRecommendationContext({
      now,
      concepts: [CONCEPT_BASIC],
      prerequisites: [],
      lessons: [
        {
          id: "lesson-1",
          title: "Lección 1",
          moduleOrderIndex: 0,
          orderIndex: 0,
          conceptIds: [CONCEPT_BASIC.id],
          progressStatus: "completed",
        },
      ],
      masteryByConcept: new Map([
        [
          CONCEPT_BASIC.id,
          {
            conceptId: CONCEPT_BASIC.id,
            mastery: 0.75,
            lastAttemptAt: new Date("2026-09-01T12:00:00.000Z"),
          },
        ],
      ]),
      attempts: [
        {
          exerciseId: "ex-1",
          conceptId: CONCEPT_BASIC.id,
          correct: true,
          createdAt: new Date("2026-09-01T12:00:00.000Z"),
        },
      ],
    });

    const recommendation = getPrimaryRecommendation(context);

    expect(recommendation?.explanation.ruleId).toBe("R5");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("R6 — recomienda descanso tras 5 ejercicios en la última hora", () => {
    const now = new Date("2026-09-13T12:00:00.000Z");
    const context = createRecommendationContext({
      now,
      attempts: Array.from({ length: 5 }, (_, index) => ({
        exerciseId: `ex-${index}`,
        conceptId: CONCEPT_BASIC.id,
        correct: true,
        createdAt: new Date(now.getTime() - index * 5 * 60 * 1000),
      })),
    });

    const recommendation = getPrimaryRecommendation(context);

    expect(recommendation?.explanation.ruleId).toBe("R6");
    expect(recommendation?.action).toBe("rest");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });

  it("R7 — continúa con la siguiente lección lineal del curso", () => {
    const recommendation = getPrimaryRecommendation(createRecommendationContext());

    expect(recommendation?.explanation.ruleId).toBe("R7");
    expect(recommendation?.lessonId).toBe("lesson-1");
    expect(recommendation?.explanation.summary).toMatchSnapshot();
  });
});
