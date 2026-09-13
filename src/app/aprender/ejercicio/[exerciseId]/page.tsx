import { notFound } from "next/navigation";
import { ExercisePractice } from "@/components/learning/exercise-practice";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getExerciseForPractice } from "@/lib/curriculum/queries";
import type { ExerciseType } from "@/lib/exercise-engine/types";

type ExercisePageProps = {
  params: Promise<{ exerciseId: string }>;
};

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { exerciseId } = await params;
  const studentId = await getAuthenticatedUserIdOrNull();
  const exercise = await getExerciseForPractice(exerciseId, studentId);

  if (!exercise) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col p-6 md:p-10">
      <ExercisePractice
        exerciseId={exercise.id}
        type={exercise.type as ExerciseType}
        content={exercise.content}
        lessonId={exercise.lessonId}
        lessonTitle={exercise.lessonTitle}
      />
    </main>
  );
}
