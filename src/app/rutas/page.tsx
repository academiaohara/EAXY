import { enrichCourse, loadCurriculum } from "@/lib/curriculum-loader";
import { PageContainer, PageShell, SiteFooter } from "@/components/layout";
import { AppNav } from "@/components/navigation/AppNav";
import { PathSection } from "@/components/curriculum/PathSection";

export default function RutasPage() {
  const curriculum = loadCurriculum();

  return (
    <PageShell>
      <AppNav />

      <PageContainer
        width="wide"
        className="page-container--padded-y flex-1 pb-8 sm:pb-12"
      >
        <section className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Rutas de aprendizaje
            </h1>
            <p className="mt-2 text-base text-slate-600 sm:text-lg">
              Caminos paso a paso hacia el dominio de las matemáticas.
            </p>
          </div>

          <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm sm:w-auto">
            <span className="text-slate-400" aria-hidden>
              🔍
            </span>
            <input
              type="search"
              placeholder="¿Qué quieres aprender?"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              disabled
              aria-label="Buscar temas (próximamente)"
            />
            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              Pronto
            </span>
          </div>
        </section>

        {curriculum.courses.map((course) => (
          <PathSection key={course.id} course={enrichCourse(course)} />
        ))}
      </PageContainer>

      <SiteFooter />
    </PageShell>
  );
}
