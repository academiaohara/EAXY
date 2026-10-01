import Link from "next/link";
import { GaugeIcon, TargetIcon, TrophyIcon } from "lucide-react";
import { ConceptMap } from "@/components/learning/concept-map";
import { ProgressStats } from "@/components/learning/progress-stats";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getGuestCourseOverview } from "@/lib/learning/guest-overview";
import { getCourseOverview } from "@/lib/learning/queries";
import { formatMasteryPercent } from "@/lib/mastery/states";

export default async function ProgresoPage() {
  const studentId = await getAuthenticatedUserIdOrNull();
  const overview = studentId ? await getCourseOverview() : getGuestCourseOverview();

  const averageMastery =
    overview.concepts.length > 0
      ? overview.concepts.reduce((sum, concept) => sum + concept.mastery, 0) /
        overview.concepts.length
      : 0;

  const stats = [
    {
      label: "Dominio medio",
      value: formatMasteryPercent(averageMastery),
      icon: GaugeIcon,
      accent: "bg-cobalt-tint text-cobalt",
    },
    {
      label: "Conceptos practicados",
      value: `${overview.practicedCount}/${overview.concepts.length}`,
      icon: TargetIcon,
      accent: "bg-violet-50 text-violet-600",
    },
    {
      label: "Conceptos dominados",
      value: String(overview.masteredCount),
      icon: TrophyIcon,
      accent: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Progreso
        </h1>
        <p className="text-ink-muted">
          Mapa de conceptos de {overview.courseTitle}. Cada color refleja tu dominio actual.
        </p>
        {!studentId ? (
          <p className="text-sm text-amber-900/80" data-testid="progreso-guest-notice">
            Sin cuenta, el dominio detallado no se sincroniza entre dispositivos.{" "}
            <Link href="/registro" className="font-medium text-cobalt underline-offset-4 hover:underline">
              Regístrate
            </Link>{" "}
            para guardar tu progreso.
          </p>
        ) : null}
      </header>

      <dl className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-paper-raised p-5 shadow-xs"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.accent}`}
                aria-hidden
              >
                <Icon className="size-5" />
              </span>
              <div>
                <dt className="text-sm text-ink-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums text-ink">{stat.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>

      <ProgressStats concepts={overview.concepts} />

      <ConceptMap concepts={overview.concepts} />
    </div>
  );
}
