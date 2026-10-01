import { notFound } from "next/navigation";
import { PracticeTopicView } from "@/components/learning/practice-topic-view";
import { getTopicPracticeViewModel } from "@/lib/learning/resolve-practice-path";

type PracticeTopicPageProps = {
  params: Promise<{ moduleId: string }>;
};

export default async function PracticeTopicPage({ params }: PracticeTopicPageProps) {
  const { moduleId } = await params;
  const viewModel = getTopicPracticeViewModel(moduleId);

  if (!viewModel) {
    notFound();
  }

  return (
    <PracticeTopicView
      courseTitle={viewModel.courseTitle}
      moduleTitle={viewModel.moduleTitle}
      exercises={viewModel.exercises}
    />
  );
}
