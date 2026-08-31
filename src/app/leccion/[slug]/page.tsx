import Link from "next/link";
import { notFound } from "next/navigation";
import { loadLesson, getAllLessonSlugs } from "@/lib/lesson-loader";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { PageContainer, PageShell, SiteHeader } from "@/components/layout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;

  let lesson;
  try {
    lesson = loadLesson(slug);
  } catch {
    notFound();
  }

  return (
    <PageShell>
      <SiteHeader
        width="lesson"
        leading={
          <Link
            href="/"
            className="touch-target flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            aria-label="Volver al inicio"
          >
            ←
          </Link>
        }
        title={lesson.title}
        subtitle={lesson.topic}
      />

      <PageContainer
        width="lesson"
        className="page-container--padded-y flex-1 pb-4 sm:pb-6"
      >
        <LessonPlayer lesson={lesson} />
      </PageContainer>
    </PageShell>
  );
}
