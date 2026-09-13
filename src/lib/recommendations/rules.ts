import {
  conceptsInCourseOrder,
  hoursSinceLastAttempt,
  masteryFor,
  MS_PER_HOUR,
  percent,
  prerequisitesMet,
  stateFor,
} from "@/lib/recommendations/snapshot-utils";
import type { RecommendationRule, StudentSnapshot } from "@/lib/recommendations/types";

/** R1 — Asignación pendiente del aula. */
export const pendingAssignmentRule: RecommendationRule = {
  id: "R1",
  evaluate(snapshot) {
    const assignment = snapshot.pendingAssignments[0];
    if (!assignment) return null;

    return {
      action: "practice",
      conceptId: assignment.conceptId ?? null,
      priority: 1,
      explanation: {
        ruleId: "R1",
        summary: `Tienes una tarea pendiente en el aula ${assignment.classroomName}: «${assignment.title}».`,
        details: {
          assignmentId: assignment.id,
          classroomName: assignment.classroomName,
          pendingAssignments: snapshot.pendingAssignments.length,
        },
      },
    };
  },
};

/** R2 — Recuperación: concepto en struggling con ejercicios y sin práctica en 24 h. */
export const recoverRule: RecommendationRule = {
  id: "R2",
  evaluate(snapshot) {
    const candidates = snapshot.concepts
      .filter((concept) => concept.exerciseCount > 0)
      .filter((concept) => stateFor(snapshot, concept.id) === "struggling")
      .filter((concept) => {
        const hours = hoursSinceLastAttempt(snapshot, concept.id);
        return hours === null || hours >= 24;
      })
      .sort(
        (a, b) =>
          (masteryFor(snapshot, a.id)?.mastery ?? 0) - (masteryFor(snapshot, b.id)?.mastery ?? 0),
      );

    const concept = candidates[0];
    if (!concept) return null;
    const entry = masteryFor(snapshot, concept.id)!;

    return {
      action: "recover",
      conceptId: concept.id,
      priority: 2,
      explanation: {
        ruleId: "R2",
        summary: `Tu dominio de «${concept.title}» es bajo (${percent(entry.mastery)} %). Practiquemos para reforzarlo.`,
        details: {
          conceptSlug: concept.slug,
          mastery: entry.mastery,
          attemptCount: entry.attemptCount,
          hoursSinceLastAttempt: hoursSinceLastAttempt(snapshot, concept.id),
        },
      },
    };
  },
};

const REINFORCE_WINDOW = 3;

/** R3 — Refuerzo: concepto en developing cuyos últimos 3 intentos tienen media < 0,5. */
export const reinforceRule: RecommendationRule = {
  id: "R3",
  evaluate(snapshot) {
    for (const concept of conceptsInCourseOrder(snapshot)) {
      if (concept.exerciseCount === 0) continue;
      if (stateFor(snapshot, concept.id) !== "developing") continue;

      const lastAttempts = snapshot.recentAttempts
        .filter((attempt) => attempt.conceptId === concept.id)
        .slice(0, REINFORCE_WINDOW);

      if (lastAttempts.length < REINFORCE_WINDOW) continue;

      const meanScore =
        lastAttempts.reduce((sum, attempt) => sum + (attempt.correct ? 1 : 0), 0) /
        lastAttempts.length;

      if (meanScore >= 0.5) continue;

      const entry = masteryFor(snapshot, concept.id)!;
      return {
        action: "reinforce",
        conceptId: concept.id,
        priority: 3,
        explanation: {
          ruleId: "R3",
          summary: `Has tenido dificultades recientes con «${concept.title}». Un poco más de práctica ayudará.`,
          details: {
            conceptSlug: concept.slug,
            mastery: entry.mastery,
            recentMeanScore: meanScore,
            recentAttempts: lastAttempts.length,
          },
        },
      };
    }
    return null;
  },
};

/** R4 — Avance: primer concepto sin empezar cuyos prerrequisitos están cumplidos. */
export const advanceRule: RecommendationRule = {
  id: "R4",
  evaluate(snapshot) {
    const concept = conceptsInCourseOrder(snapshot).find(
      (candidate) =>
        candidate.exerciseCount > 0 &&
        candidate.prerequisites.length > 0 &&
        stateFor(snapshot, candidate.id) === "not_started" &&
        prerequisitesMet(snapshot, candidate),
    );

    if (!concept) return null;

    return {
      action: "advance",
      conceptId: concept.id,
      priority: 4,
      explanation: {
        ruleId: "R4",
        summary: `Ya dominas los conceptos previos. ¡Siguiente paso: «${concept.title}»!`,
        details: {
          conceptSlug: concept.slug,
          prerequisites: concept.prerequisites.length,
        },
      },
    };
  },
};

const SPACED_REVIEW_DAYS = 7;

/** R5 — Repaso espaciado: concepto proficient sin práctica en más de 7 días. */
export const spacedReviewRule: RecommendationRule = {
  id: "R5",
  evaluate(snapshot) {
    const candidates = snapshot.concepts
      .filter((concept) => concept.exerciseCount > 0)
      .filter((concept) => stateFor(snapshot, concept.id) === "proficient")
      .map((concept) => ({ concept, hours: hoursSinceLastAttempt(snapshot, concept.id) }))
      .filter(({ hours }) => hours !== null && hours > SPACED_REVIEW_DAYS * 24)
      .sort((a, b) => (b.hours ?? 0) - (a.hours ?? 0));

    const candidate = candidates[0];
    if (!candidate) return null;

    const days = Math.floor((candidate.hours ?? 0) / 24);

    return {
      action: "practice",
      conceptId: candidate.concept.id,
      priority: 5,
      explanation: {
        ruleId: "R5",
        summary: `Hace ${days} días que no practicas «${candidate.concept.title}». Un repaso rápido lo mantendrá fresco.`,
        details: {
          conceptSlug: candidate.concept.slug,
          daysSinceLastAttempt: days,
          mastery: masteryFor(snapshot, candidate.concept.id)?.mastery ?? null,
        },
      },
    };
  },
};

const REST_ATTEMPTS_PER_HOUR = 5;

/** R6 — Descanso: ≥ 5 ejercicios en la última hora. */
export const restRule: RecommendationRule = {
  id: "R6",
  evaluate(snapshot) {
    const oneHourAgo = snapshot.now.getTime() - MS_PER_HOUR;
    const attemptsLastHour = snapshot.recentAttempts.filter(
      (attempt) => attempt.createdAt.getTime() >= oneHourAgo,
    ).length;

    if (attemptsLastHour < REST_ATTEMPTS_PER_HOUR) return null;

    return {
      action: "rest",
      conceptId: null,
      priority: 6,
      explanation: {
        ruleId: "R6",
        summary: "¡Buen trabajo! Tómate un descanso o repasa lo aprendido mañana.",
        details: { attemptsLastHour },
      },
    };
  },
};

/** R7 — Por defecto: continuar con el siguiente concepto no dominado del curso. */
export const continueCourseRule: RecommendationRule = {
  id: "R7",
  evaluate(snapshot) {
    const ordered = conceptsInCourseOrder(snapshot).filter((concept) => concept.exerciseCount > 0);
    if (ordered.length === 0) return null;

    const next =
      ordered.find((concept) => stateFor(snapshot, concept.id) !== "mastered") ??
      [...ordered].sort((a, b) => {
        const aTime = masteryFor(snapshot, a.id)?.lastAttemptAt?.getTime() ?? 0;
        const bTime = masteryFor(snapshot, b.id)?.lastAttemptAt?.getTime() ?? 0;
        return aTime - bTime;
      })[0];

    const state = stateFor(snapshot, next.id);
    const allMastered = ordered.every((concept) => stateFor(snapshot, concept.id) === "mastered");

    return {
      action: "practice",
      conceptId: next.id,
      priority: 7,
      explanation: {
        ruleId: "R7",
        summary: allMastered
          ? `Dominas todo el curso. Repasa «${next.title}» para mantenerlo fresco.`
          : state === "not_started"
            ? `Continúa con la siguiente lección del curso: «${next.title}».`
            : `Sigue practicando «${next.title}» hasta dominarlo.`,
        details: {
          conceptSlug: next.slug,
          state,
          allMastered,
        },
      },
    };
  },
};

export const DEFAULT_RULES: RecommendationRule[] = [
  pendingAssignmentRule,
  recoverRule,
  reinforceRule,
  advanceRule,
  spacedReviewRule,
  restRule,
  continueCourseRule,
];

export type { StudentSnapshot };
