import { ConceptMap } from "@/components/learning/concept-map";
import { ProgressStats } from "@/components/learning/progress-stats";
import { getCourseOverview } from "@/lib/learning/queries";
import { formatMasteryPercent } from "@/lib/mastery/states";

export default async function ProgresoPage() {
  const overview = await getCourseOverview();

  const averageMastery =
    overview.concepts.length > 0
      ? overview.concepts.reduce((sum, concept) => sum + concept.mastery, 0) /
        overview.concepts.length
      : 0;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Progreso</h1>
        <p className="text-ink-muted">
          Mapa de conceptos de {overview.courseTitle}. Cada color refleja tu dominio actual.
        </p>
      </header>

      <div className="grid gap-4 rounded-xl border border-border bg-paper-raised p-6 sm:grid-cols-3">
        <div>
          <p className="text-sm text-ink-muted">Dominio medio</p>
          <p className="font-display text-3xl font-semibold text-ink">
            {formatMasteryPercent(averageMastery)}
          </p>
        </div>
        <div>
          <p className="text-sm text-ink-muted">Conceptos practicados</p>
          <p className="font-display text-3xl font-semibold text-ink">
            {overview.practicedCount}/{overview.concepts.length}
          </p>
        </div>
        <div>
          <p className="text-sm text-ink-muted">Conceptos dominados</p>
          <p className="font-display text-3xl font-semibold text-ink">{overview.masteredCount}</p>
        </div>
      </div>

      <ProgressStats concepts={overview.concepts} />

      <ConceptMap concepts={overview.concepts} />
    </div>
  );
}
