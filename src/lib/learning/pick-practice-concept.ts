import type { ConceptProgress } from "@/lib/learning/queries";
import { getMasteryState } from "@/lib/mastery/states";

/**
 * Elige el concepto más útil para practicar ahora:
 * recuperación → sin empezar → menor dominio.
 */
export function pickPracticeConceptSlug(concepts: ConceptProgress[]): string | null {
  if (concepts.length === 0) {
    return null;
  }

  const struggling = concepts.find(
    (concept) =>
      getMasteryState(concept.mastery, concept.attemptCount) === "struggling",
  );
  if (struggling) {
    return struggling.conceptSlug;
  }

  const notStarted = concepts.find((concept) => concept.attemptCount === 0);
  if (notStarted) {
    return notStarted.conceptSlug;
  }

  const weakest = [...concepts].sort((a, b) => a.mastery - b.mastery)[0];
  return weakest?.conceptSlug ?? concepts[0].conceptSlug;
}
