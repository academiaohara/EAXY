import { redirect } from "next/navigation";
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
    redirect("/rutas");
  }

  const enriched = enrichCourse(course);
  const firstTopicWithLessons = enriched.topics.find((t) => t.lessons.length > 0);
  const firstTopic = firstTopicWithLessons ?? enriched.topics[0];

  redirect(`/curso/${courseId}/tema/${firstTopic.id}`);
}
