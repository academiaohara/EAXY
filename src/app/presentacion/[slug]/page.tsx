import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPresentationSlugs,
  loadPresentation,
} from "@/lib/presentation-loader";
import { loadLessonIndex } from "@/lib/lesson-loader";
import { loadCurriculum } from "@/lib/curriculum-loader";
import { IspringPresentationViewer } from "@/components/presentation/IspringPresentationViewer";
import { PageContainer, PageShell } from "@/components/layout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPresentationSlugs().map((slug) => ({ slug }));
}

export default async function PresentationPage({ params }: PageProps) {
  const { slug } = await params;

  let presentation;
  try {
    presentation = loadPresentation(slug);
  } catch {
    notFound();
  }

  const lessonIndex = loadLessonIndex();
  const meta = lessonIndex.lessons.find((lesson) => lesson.slug === slug);

  const backHref =
    meta?.courseId && meta?.topicId
      ? `/curso/${meta.courseId}/tema/${meta.topicId}`
      : "/rutas";

  return (
    <PageShell>
      <PageContainer
        width="wide"
        className="page-container--padded-y flex min-h-0 flex-1 flex-col pb-4 sm:pb-6"
      >
        <IspringPresentationViewer
          presentation={presentation}
          backHref={backHref}
        />

        {meta && (
          <div className="mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 sm:p-5">
            <p className="text-sm text-indigo-900">
              ¿Quieres practicar con actividades interactivas?
            </p>
            <Link
              href={`/leccion/${slug}`}
              className="mt-2 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Ir a la lección interactiva →
            </Link>
          </div>
        )}
      </PageContainer>
    </PageShell>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  try {
    const presentation = loadPresentation(slug);
    return {
      title: `${presentation.title} | Eaxy`,
      description: presentation.description,
    };
  } catch {
    return { title: "Presentación | Eaxy" };
  }
}
