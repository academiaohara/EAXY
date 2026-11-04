import Link from "next/link";
import { redirect } from "next/navigation";
import { DumbbellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOverview } from "@/lib/learning/queries";
import {
  resolveDefaultPracticePath,
  resolveRecommendedPracticePath,
} from "@/lib/learning/resolve-practice-path";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function PracticarIndexPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (studentId) {
    const [overview, recommendation] = await Promise.all([
      getCourseOverview(),
      getStudentRecommendation(studentId),
    ]);

    const recommendedPath = resolveRecommendedPracticePath(
      recommendation?.conceptId,
    );
    if (recommendedPath) {
      redirect(recommendedPath);
    }

    const path = resolveDefaultPracticePath(overview.concepts);
    if (path) {
      redirect(path);
    }
  } else {
    const path = resolveDefaultPracticePath();
    if (path) {
      redirect(path);
    }
  }

  const fallbackPath = resolveDefaultPracticePath();
  if (fallbackPath) {
    redirect(fallbackPath);
  }

  return (
    <div
      className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 py-12 lg:px-10"
      data-testid="practice-session"
    >
      <section className="relative w-full overflow-hidden rounded-[2.25rem] bg-ink p-10 text-white shadow-[0_30px_80px_-48px_rgb(25_58_50/0.8)]">
        <span
          className="absolute -right-16 -top-20 size-64 rounded-full bg-sun"
          aria-hidden
        />
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
          <DumbbellIcon className="size-5 text-sun" aria-hidden />
        </span>
        <div className="relative mt-8 max-w-2xl space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sun">
            Práctica libre
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tu próxima práctica se está preparando
          </h1>
          <p className="max-w-xl leading-relaxed text-white/70">
            Entra en una asignatura y completa una lección. En cuanto haya
            ejercicios adecuados, aparecerán aquí como tu siguiente sesión.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            className="mt-2 rounded-full bg-sun text-ink hover:bg-sun/90"
            render={<Link href="/aprender" />}
          >
            Elegir una asignatura
          </Button>
        </div>
      </section>
    </div>
  );
}
