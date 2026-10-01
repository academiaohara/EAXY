import { notFound } from "next/navigation";
import { ExercisePractice } from "@/components/learning/exercise-practice";
import { getExerciseForPractice } from "@/lib/curriculum/queries";
import type { ExerciseType } from "@/lib/exercise-engine/types";

type ExercisePageProps = {
  params: Promise<{ exerciseId: string }>;
};

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { exerciseId } = await params;
  const exercise = await getExerciseForPractice(exerciseId);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-6 sm:p-8">
      <ExercisePractice
        exerciseId={exercise.id}
        type={exercise.type as ExerciseType}
        content={exercise.content}
        lessonId={exercise.lessonId}
        lessonTitle={exercise.lessonTitle}
      />
    </div>
  );
}
