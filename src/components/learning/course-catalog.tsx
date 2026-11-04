import { CourseLevelCatalog } from "@/components/learning/course-level-catalog";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";
import type { SubjectKey } from "@/lib/navigation/subjects";

type CourseCatalogViewProps = {
  courses: CourseCatalogEntry[];
  subject: SubjectKey;
};

export function CourseCatalogView({
  courses,
  subject,
}: CourseCatalogViewProps) {
  return <CourseLevelCatalog courses={courses} subject={subject} />;
}
