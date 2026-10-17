import Link from "next/link";
import { GaugeIcon, TargetIcon, TrophyIcon, UserRoundIcon } from "lucide-react";
import { ConceptMap } from "@/components/learning/concept-map";
import { ProgressStats } from "@/components/learning/progress-stats";
import { getSessionUser } from "@/lib/auth/session";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getGuestCourseOverview } from "@/lib/learning/guest-overview";
import { getCourseOverview } from "@/lib/learning/queries";
import { formatMasteryPercent } from "@/lib/mastery/states";

export const metadata = { title: "Perfil" };

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export default async function PerfilPage() {
  const studentId = await getAuthenticatedUserIdOrNull();
  const user = await getSessionUser();
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
      <header className="flex flex-col gap-5 rounded-3xl border border-border bg-paper-raised p-6 shadow-xs sm:flex-row sm:items-center sm:p-8">
        <span
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cobalt to-violet-500 font-display text-xl font-bold text-white shadow-sm shadow-cobalt/30"
          aria-hidden
        >
          {user ? initials(user.displayName) : <UserRoundIcon className="size-7" />}
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cobalt">Perfil</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
            {user ? user.displayName : "Invitado"}
          </h1>
          <p className="text-ink-muted">
            Tu progreso en {overview.courseTitle}. Cada color refleja tu dominio actual.
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
        </div>
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
