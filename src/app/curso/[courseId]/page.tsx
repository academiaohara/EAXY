import Link from "next/link";
import { notFound } from "next/navigation";
import { enrichCourse, getAllCourseIds, loadCourse } from "@/lib/curriculum-loader";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return getAllCourseIds().map((courseId) => ({ courseId }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = loadCourse(courseId);

  if (!course) {
    notFound();
  }

  const enriched = enrichCourse(course);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              E
            </span>
            <span className="text-xl font-bold text-slate-900">Eaxy</span>
          </Link>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Matemáticas
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            ← Volver a cursos
          </Link>
        </nav>

        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {enriched.title}
          </h1>
          <p className="mt-2 text-slate-600">{enriched.description}</p>
          <p className="mt-3 text-sm text-slate-500">
            {enriched.availableLessonCount > 0
              ? `${enriched.availableLessonCount} lección${enriched.availableLessonCount === 1 ? "" : "es"} disponible${enriched.availableLessonCount === 1 ? "" : "s"}`
              : "Lecciones en preparación"}{" "}
            · {enriched.totalTopics} temas
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Temas del curso
          </h2>
          <div className="space-y-3">
            {enriched.topics.map((topic) => (
              <article
                key={topic.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                    {topic.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {topic.description}
                    </p>

                    {topic.lessons.length > 0 ? (
                      <ul className="mt-4 space-y-2">
                        {topic.lessons.map((lesson) => (
                          <li key={lesson.slug}>
                            <Link
                              href={`/leccion/${lesson.slug}`}
                              className="flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 transition hover:border-indigo-300 hover:bg-indigo-50"
                            >
                              <span className="text-sm font-medium text-indigo-900">
                                {lesson.title}
                              </span>
                              <span className="shrink-0 text-xs text-indigo-600">
                                ~{lesson.estimatedMinutes} min →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                        Próximamente
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        Eaxy — Plataforma de aprendizaje interactivo
      </footer>
    </div>
  );
}
