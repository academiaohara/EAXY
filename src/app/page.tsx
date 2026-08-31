import Link from "next/link";
import { enrichCourse, loadCurriculum } from "@/lib/curriculum-loader";
import { loadLessonIndex } from "@/lib/lesson-loader";
import { PageContainer, PageShell, SiteFooter } from "@/components/layout";
import { AppNav } from "@/components/navigation/AppNav";

export default function HomePage() {
  const curriculum = loadCurriculum();
  const lessonIndex = loadLessonIndex();

  const continueLesson = lessonIndex.lessons[0];

  return (
    <PageShell>
      <AppNav />

      <PageContainer
        width="wide"
        className="page-container--padded-y flex-1 pb-8 sm:pb-12"
      >
        <section className="mb-8 sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Aprende haciendo
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 sm:mt-3 sm:text-lg">
            Lecciones interactivas de matemáticas con manipulativos visuales,
            retos y feedback inmediato.
          </p>

          {continueLesson && (
            <Link
              href={`/leccion/${continueLesson.slug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 sm:text-base"
            >
              Continuar aprendiendo →
            </Link>
          )}
        </section>

        <section className="mb-8">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Destacado
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Empieza por aquí si es tu primera vez
          </p>

          {curriculum.courses.map((course) => {
            const enriched = enrichCourse(course);
            const firstTopic = enriched.topics.find((t) => t.lessons.length > 0);
            if (!firstTopic) return null;

            return (
              <Link
                key={course.id}
                href={`/curso/${course.id}/tema/${firstTopic.id}`}
                className="block rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 transition hover:border-indigo-300 hover:shadow-md sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Recomendado
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {firstTopic.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {firstTopic.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-indigo-600">
                  Empezar →
                </span>
              </Link>
            );
          })}
        </section>
      </PageContainer>

      <SiteFooter />
    </PageShell>
  );
}
