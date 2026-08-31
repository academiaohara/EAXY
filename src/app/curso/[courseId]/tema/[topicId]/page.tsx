import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTopicParams,
  getTopicFromCourse,
} from "@/lib/curriculum-loader";
import { PageContainer, PageShell, SiteFooter } from "@/components/layout";
import { AppNav } from "@/components/navigation/AppNav";
import { CourseInfoCard } from "@/components/curriculum/CourseInfoCard";
import { TopicPath } from "@/components/curriculum/TopicPath";

interface TopicPageProps {
  params: Promise<{ courseId: string; topicId: string }>;
}

export function generateStaticParams() {
  return getAllTopicParams();
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { courseId, topicId } = await params;
  const result = getTopicFromCourse(courseId, topicId);

  if (!result) {
    notFound();
  }

  const { course, topic, topicIndex } = result;

  return (
    <PageShell>
      <AppNav />

      <PageContainer
        width="wide"
        className="page-container--padded-y flex-1 pb-8 sm:pb-12"
      >
        <nav className="mb-6">
          <Link
            href="/rutas"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Rutas de aprendizaje
          </Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,26rem)_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CourseInfoCard topic={topic} courseTitle={course.title} />
          </div>

          <div>
            <TopicPath
              topic={topic}
              topicIndex={topicIndex}
              topics={course.topics}
            />
          </div>
        </div>
      </PageContainer>

      <SiteFooter />
    </PageShell>
  );
}
