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
  const overview = studentId
    ? await getCourseOverview()
    : getGuestCourseOverview();

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
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-10 lg:px-10 lg:py-14">
      <header className="relative flex flex-col gap-5 overflow-hidden rounded-[2.25rem] bg-ink p-8 text-white shadow-[0_30px_80px_-48px_rgb(25_58_50/0.8)] sm:flex-row sm:items-center sm:p-10">
        <span
          className="absolute -right-14 -top-20 size-64 rounded-full bg-sun"
          aria-hidden
        />
        <span
          className="absolute -bottom-24 right-44 size-44 rotate-12 rounded-[2.5rem] bg-coral/85"
          aria-hidden
        />
        <span
          className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-display text-xl font-bold text-white ring-1 ring-white/20"
          aria-hidden
        >
          {user ? (
            initials(user.displayName)
          ) : (
            <UserRoundIcon className="size-7" />
          )}
        </span>
        <div className="relative min-w-0 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sun">
            Mi progreso
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">
            {user ? user.displayName : "Invitado"}
          </h1>
          <p className="text-white/70">
            Tu progreso en {overview.courseTitle}. Cada color refleja tu dominio
            actual.
          </p>
          {!studentId ? (
            <p
              className="text-sm text-white/70"
              data-testid="progreso-guest-notice"
            >
              Sin cuenta, el dominio detallado no se sincroniza entre
              dispositivos.{" "}
              <Link
                href="/registro"
                className="font-semibold text-sun underline-offset-4 hover:underline"
              >
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
              className="flex items-center gap-4 rounded-[1.5rem] border border-border bg-paper-raised p-5 shadow-[0_14px_38px_-32px_rgb(25_58_50/0.45)]"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.accent}`}
                aria-hidden
              >
                <Icon className="size-5" />
              </span>
              <div>
                <dt className="text-sm text-ink-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums text-ink">
                  {stat.value}
                </dd>
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
