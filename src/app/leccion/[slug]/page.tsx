import Link from "next/link";
import { notFound } from "next/navigation";
import { loadLesson, getAllLessonSlugs } from "@/lib/lesson-loader";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

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
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            aria-label="Volver al inicio"
          >
            ←
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900">
              {lesson.title}
            </h1>
            <p className="truncate text-xs text-slate-500">{lesson.topic}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <LessonPlayer lesson={lesson} />
      </main>
    </div>
  );
}
