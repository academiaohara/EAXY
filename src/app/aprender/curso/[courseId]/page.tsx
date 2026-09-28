import { notFound, redirect } from "next/navigation";
import { CourseOutlineView } from "@/components/learning/course-outline";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { findDefaultModuleId, isModuleAccessible } from "@/lib/curriculum/course-navigation";
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

  const defaultModuleId = findDefaultModuleId(outline.modules);
  if (defaultModuleId) {
    const defaultModule = outline.modules.find((courseModule) => courseModule.id === defaultModuleId);
    if (defaultModule && isModuleAccessible(defaultModule)) {
      redirect(`/aprender/curso/${courseId}/tema/${defaultModuleId}`);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
      <CourseOutlineView outline={outline} />
    </main>
  );
}
