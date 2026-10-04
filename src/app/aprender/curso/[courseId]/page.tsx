import { notFound, permanentRedirect } from "next/navigation";
import { CourseOutlineView } from "@/components/learning/course-outline";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOutline } from "@/lib/curriculum/queries";
import { resolveCourseRef } from "@/lib/curriculum/resolve-ref";
import { courseHref } from "@/lib/navigation/learning-trail";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId: courseParam } = await params;
  const resolved = resolveCourseRef(courseParam);
  if (!resolved) {
    notFound();
  }

  const studentId = await getAuthenticatedUserIdOrNull();
  const outline = await getCourseOutline(resolved.slug, studentId);

  if (!outline) {
    notFound();
  }

  if (courseParam !== resolved.slug) {
    permanentRedirect(courseHref(resolved.slug));
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
      <CourseOutlineView outline={outline} mergeLocalProgress={!studentId} />
    </div>
  );
}
