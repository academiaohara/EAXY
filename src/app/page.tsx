import Link from "next/link";
import { enrichCourse, loadCurriculum } from "@/lib/curriculum-loader";
import { loadLessonIndex } from "@/lib/lesson-loader";
import {
  PageContainer,
  PageShell,
  SiteFooter,
  SiteHeader,
} from "@/components/layout";

export default function HomePage() {
  const curriculum = loadCurriculum();
  const lessonIndex = loadLessonIndex();

  return (
    <PageShell>
      <SiteHeader
        width="wide"
        trailing={
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Matemáticas
          </span>
        }
      />

      <PageContainer
        width="wide"
        className="page-container--padded-y flex-1 pb-8 sm:pb-12"
      >
        <section className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Aprende haciendo
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 sm:mt-3 sm:text-lg">
            Lecciones interactivas de matemáticas con manipulativos visuales,
            retos y feedback inmediato.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Cursos
          </h2>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            {curriculum.courses.map((course) => {
              const enriched = enrichCourse(course);
              return (
                <Link
                  key={course.id}
                  href={`/curso/${course.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {course.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-indigo-600">→</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {enriched.totalTopics} temas
                    </span>
                    {enriched.availableLessonCount > 0 && (
                      <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                        {enriched.availableLessonCount} lección
                        {enriched.availableLessonCount === 1 ? "" : "es"}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {lessonIndex.lessons.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Acceso rápido
            </h2>
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
              {lessonIndex.lessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/leccion/${lesson.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {lesson.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {lesson.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      ~{lesson.estimatedMinutes} min
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {lesson.topic}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </PageContainer>

      <SiteFooter />
    </PageShell>
  );
}
