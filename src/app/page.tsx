import Link from "next/link";
import { loadLessonIndex } from "@/lib/lesson-loader";

export default function HomePage() {
  const index = loadLessonIndex();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              E
            </span>
            <span className="text-xl font-bold text-slate-900">Eaxy</span>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Matemáticas
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Aprende haciendo
          </h1>
          <p className="mt-2 text-slate-600">
            Lecciones interactivas de matemáticas con manipulativos visuales,
            retos y feedback inmediato.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Lecciones disponibles
          </h2>
          <div className="space-y-3">
            {index.lessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/leccion/${lesson.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
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
      </main>

      <footer className="mt-auto border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        Eaxy — Plataforma de aprendizaje interactivo
      </footer>
    </div>
  );
}
