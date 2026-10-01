import { notFound } from "next/navigation";
import { CourseTopicView } from "@/components/learning/course-topic-view";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOutline } from "@/lib/curriculum/queries";

type CourseTopicPageProps = {
  params: Promise<{ courseId: string; moduleId: string }>;
};

export default async function CourseTopicPage({ params }: CourseTopicPageProps) {
  const { courseId, moduleId } = await params;
  const studentId = await getAuthenticatedUserIdOrNull();
  const outline = await getCourseOutline(courseId, studentId);

  if (!outline) {
    notFound();
  }

  const sortedModules = [...outline.modules].sort((a, b) => a.orderIndex - b.orderIndex);
  const moduleIndex = sortedModules.findIndex((courseModule) => courseModule.id === moduleId);
  if (moduleIndex < 0) {
    notFound();
  }

  const courseModule = sortedModules[moduleIndex];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
      <CourseTopicView
        outline={outline}
        courseModule={courseModule}
        moduleNumber={moduleIndex + 1}
      />
    </div>
  );
}
