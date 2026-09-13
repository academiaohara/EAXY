import { notFound } from "next/navigation";
import { PracticeSession } from "@/components/learning/practice-session";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { getCourseOverview, getPracticeConceptData } from "@/lib/learning/queries";

type PracticarPageProps = {
  params: Promise<{ conceptSlug: string }>;
};

export default async function PracticarConceptPage({ params }: PracticarPageProps) {
  const { conceptSlug } = await params;
  const [practiceData, overview] = await Promise.all([
    getPracticeConceptData(conceptSlug),
    getCourseOverview(),
  ]);

  if (!practiceData) {
    notFound();
  }

  const conceptProgress = overview.concepts.find(
    (concept) => concept.conceptSlug === conceptSlug,
  );

  return (
    <PracticeSession
      conceptSlug={practiceData.conceptSlug}
      conceptTitle={practiceData.conceptTitle}
      conceptDescription={practiceData.conceptDescription}
      lessonSummary={practiceData.lessonSummary}
      moduleTitle={practiceData.moduleTitle}
      lessonTitle={practiceData.lessonTitle}
      exercises={practiceData.exercises.map((exercise) => ({
        ...exercise,
        type: exercise.type as ExerciseType,
      }))}
      initialMastery={conceptProgress?.mastery ?? 0}
      initialAttemptCount={conceptProgress?.attemptCount ?? 0}
    />
  );
}
