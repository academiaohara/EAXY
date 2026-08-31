import { notFound } from "next/navigation";
import { loadLesson, getAllLessonSlugs, loadLessonIndex } from "@/lib/lesson-loader";
import { loadCurriculum } from "@/lib/curriculum-loader";
import { getNextLessonSlug } from "@/lib/course-progress";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { PageContainer, PageShell } from "@/components/layout";

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

  const index = loadLessonIndex();
  const meta = index.lessons.find((l) => l.slug === slug);
  const curriculum = loadCurriculum();
  const course = meta?.courseId
    ? curriculum.courses.find((c) => c.id === meta.courseId)
    : null;

  const nextLessonSlug = course
    ? getNextLessonSlug(slug, course.topics)
    : null;

  const backHref =
    meta?.courseId && meta?.topicId
      ? `/curso/${meta.courseId}/tema/${meta.topicId}`
      : "/rutas";

  return (
    <PageShell>
      <PageContainer
        width="lesson"
        className="page-container--padded-y flex-1 pb-4 sm:pb-6"
      >
        <LessonPlayer
          lesson={lesson}
          courseId={meta?.courseId}
          topicId={meta?.topicId}
          nextLessonSlug={nextLessonSlug}
          backHref={backHref}
        />
      </PageContainer>
    </PageShell>
  );
}
