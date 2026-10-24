import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockCatalogView } from "@/components/learning/block-catalog";
import { SubjectHero } from "@/components/learning/subject-hero";
import { SubjectViewTabs } from "@/components/learning/subject-view-tabs";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { summarizeBlocks } from "@/lib/curriculum/blocks";
import { getSubjectOutlines } from "@/lib/curriculum/block-queries";
import { SUBJECTS, getSubject } from "@/lib/navigation/subjects";

type SubjectBlocksPageProps = {
  params: Promise<{ subject: string }>;
};

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ subject: subject.key }));
}

export async function generateMetadata({ params }: SubjectBlocksPageProps): Promise<Metadata> {
  const subject = getSubject((await params).subject);
  return { title: subject ? `${subject.label} por contenido` : "Materia" };
}

export default async function SubjectBlocksPage({ params }: SubjectBlocksPageProps) {
  const subject = getSubject((await params).subject);
  if (!subject) {
    notFound();
  }

  const studentId = await getAuthenticatedUserIdOrNull();
  const outlines = await getSubjectOutlines(subject.key, studentId);
  const blocks = summarizeBlocks(subject.key, outlines);
  const lessonCount = outlines.reduce(
    (sum, outline) =>
      sum + outline.modules.reduce((moduleSum, courseModule) => moduleSum + courseModule.lessons.length, 0),
    0,
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <SubjectHero subject={subject} courseCount={outlines.length} lessonCount={lessonCount} />
      <SubjectViewTabs subject={subject} active="contenido" />
      <BlockCatalogView subject={subject.key} blocks={blocks} mergeLocalProgress={!studentId} />
    </div>
  );
}
