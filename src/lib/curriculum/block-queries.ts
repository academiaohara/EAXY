import { getCourseCatalog, getCourseOutline } from "@/lib/curriculum/queries";
import type { CourseOutline } from "@/lib/curriculum/types";
import { subjectOfCourse, type SubjectKey } from "@/lib/navigation/subjects";

/** Esquemas de todos los cursos con contenido de una asignatura, de menor a mayor curso. */
export async function getSubjectOutlines(
  subject: SubjectKey,
  studentId: string | null,
): Promise<CourseOutline[]> {
  const catalog = await getCourseCatalog();
  const courses = catalog.filter(
    (course) => subjectOfCourse(course) === subject && course.lessonCount > 0,
  );
  const outlines = await Promise.all(
    courses.map((course) => getCourseOutline(course.slug, studentId)),
  );
  return outlines.filter((outline): outline is CourseOutline => outline !== null);
}
