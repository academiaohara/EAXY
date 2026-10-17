import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCatalogView } from "@/components/learning/course-catalog";
import { SubjectHero } from "@/components/learning/subject-hero";
import { getCourseCatalog } from "@/lib/curriculum/queries";
import { SUBJECTS, getSubject, subjectOfCourse } from "@/lib/navigation/subjects";

type SubjectPageProps = {
  params: Promise<{ subject: string }>;
};

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ subject: subject.key }));
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subject = getSubject((await params).subject);
  return { title: subject?.label ?? "Materia" };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const subject = getSubject((await params).subject);
  if (!subject) {
    notFound();
  }

  const catalog = await getCourseCatalog();
  const courses = catalog.filter((course) => subjectOfCourse(course) === subject.key);
  const available = courses.filter((course) => course.lessonCount > 0);
  const lessonCount = available.reduce((sum, course) => sum + course.lessonCount, 0);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <SubjectHero subject={subject} courseCount={available.length} lessonCount={lessonCount} />
      <CourseCatalogView courses={courses} subject={subject.key} />
    </div>
  );
}
