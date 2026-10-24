import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockOutlineView } from "@/components/learning/block-outline";
import { getBlock } from "@/content/blocks";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { buildBlockOutline } from "@/lib/curriculum/blocks";
import { getSubjectOutlines } from "@/lib/curriculum/block-queries";
import { getSubject } from "@/lib/navigation/subjects";

type BlockPageProps = {
  params: Promise<{ subject: string; block: string }>;
};

export async function generateMetadata({ params }: BlockPageProps): Promise<Metadata> {
  const { subject: subjectKey, block: blockSlug } = await params;
  const subject = getSubject(subjectKey);
  const block = subject ? getBlock(subject.key, blockSlug) : undefined;
  return { title: block ? `${block.title} · ${subject?.label}` : "Contenido" };
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { subject: subjectKey, block: blockSlug } = await params;
  const subject = getSubject(subjectKey);
  const block = subject ? getBlock(subject.key, blockSlug) : undefined;
  if (!subject || !block) {
    notFound();
  }

  const studentId = await getAuthenticatedUserIdOrNull();
  const outlines = await getSubjectOutlines(subject.key, studentId);
  const outline = buildBlockOutline(block, outlines);
  if (outline.sections.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
      <BlockOutlineView subject={subject} outline={outline} mergeLocalProgress={!studentId} />
    </div>
  );
}
