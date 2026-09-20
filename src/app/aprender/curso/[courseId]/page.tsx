import { notFound } from "next/navigation";
import { CourseOutlineView } from "@/components/learning/course-outline";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOutline } from "@/lib/curriculum/queries";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const studentId = await getAuthenticatedUserIdOrNull();
  const outline = await getCourseOutline(courseId, studentId);

  if (!outline) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-6 sm:p-8">
      <CourseOutlineView outline={outline} />
    </main>
  );
}
