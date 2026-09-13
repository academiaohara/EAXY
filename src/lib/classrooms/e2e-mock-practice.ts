import { cookies } from "next/headers";
import { checkAnswer } from "@/lib/exercise-engine/check-answer";
import { parseExerciseAnswer, parseExerciseContent } from "@/lib/exercise-engine/schemas";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import {
  getPracticeExerciseFixtureById,
  PRACTICE_EXERCISE_FIXTURES,
} from "@/lib/practice/fixtures";
import { selectNextPracticeExercise } from "@/lib/practice/select-next-exercise";
import type {
  ConceptMasterySummary,
  PracticeAttemptSummary,
  PracticeExercise,
} from "@/lib/practice/types";
import { calculateMastery, roundMastery } from "@/lib/mastery/calculator";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";

const MOCK_SESSION_COOKIE = "e2e_mock_session_user_id";

type MockAttemptRecord = PracticeAttemptSummary & {
  studentId: string;
  conceptId: string;
  createdAt: Date;
};

const mockAttempts: MockAttemptRecord[] = [];
let inMemorySessionUserId: string | null = null;

export async function mockGetSessionUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(MOCK_SESSION_COOKIE)?.value ?? inMemorySessionUserId;
  } catch {
    return inMemorySessionUserId;
  }
}

export async function mockSetSessionUserId(userId: string): Promise<void> {
  inMemorySessionUserId = userId;

  try {
    const cookieStore = await cookies();
    cookieStore.set(MOCK_SESSION_COOKIE, userId, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
  } catch {
    // En tests unitarios no hay request scope de Next.js.
  }
}

export function mockResetPracticeState(): void {
  mockAttempts.length = 0;
  inMemorySessionUserId = null;
}

function getStudentAttempts(studentId: string): MockAttemptRecord[] {
  return mockAttempts.filter((attempt) => attempt.studentId === studentId);
}

function getMasteryByConcept(studentId: string): Record<string, number> {
  const conceptIds = [...new Set(PRACTICE_EXERCISE_FIXTURES.map((exercise) => exercise.conceptId))];
  const masteryByConcept: Record<string, number> = {};

  for (const conceptId of conceptIds) {
    const exerciseIds = PRACTICE_EXERCISE_FIXTURES.filter(
      (exercise) => exercise.conceptId === conceptId,
    ).map((exercise) => exercise.id);

    const attempts = mockAttempts
      .filter(
        (attempt) => attempt.studentId === studentId && exerciseIds.includes(attempt.exerciseId),
      )
      .map((attempt) => ({
        correct: attempt.correct,
        createdAt: attempt.createdAt,
      }));

    masteryByConcept[conceptId] = roundMastery(calculateMastery(attempts));
  }

  return masteryByConcept;
}

export function mockGetPracticeExercise(
  studentId: string,
  preferredExerciseId?: string | null,
): PracticeExercise | null {
  const exerciseId = selectNextPracticeExercise(
    PRACTICE_EXERCISE_FIXTURES.map((exercise) => ({
      id: exercise.id,
      conceptId: exercise.conceptId,
      difficulty: exercise.difficulty,
    })),
    getStudentAttempts(studentId),
    getMasteryByConcept(studentId),
    preferredExerciseId,
  );

  if (!exerciseId) {
    return null;
  }

  const fixture = getPracticeExerciseFixtureById(exerciseId);
  if (!fixture) {
    return null;
  }

  return {
    id: fixture.id,
    conceptId: fixture.conceptId,
    conceptTitle: fixture.conceptTitle,
    type: fixture.type,
    difficulty: fixture.difficulty,
    content: fixture.content,
  };
}

export function mockGetConceptMasterySummaries(studentId: string): ConceptMasterySummary[] {
  const masteryByConcept = getMasteryByConcept(studentId);
  const summaries = new Map<string, ConceptMasterySummary>();

  for (const exercise of PRACTICE_EXERCISE_FIXTURES) {
    if (!summaries.has(exercise.conceptId)) {
      summaries.set(exercise.conceptId, {
        conceptId: exercise.conceptId,
        conceptTitle: exercise.conceptTitle,
        mastery: masteryByConcept[exercise.conceptId] ?? 0,
      });
    }
  }

  return [...summaries.values()].sort((left, right) =>
    left.conceptTitle.localeCompare(right.conceptTitle),
  );
}

export function mockSubmitExerciseAttempt(
  studentId: string,
  exerciseId: string,
  answer: unknown,
  timeSpentMs: number,
): SubmitExerciseAttemptResult {
  const fixture = getPracticeExerciseFixtureById(exerciseId);
  if (!fixture) {
    throw new Error("Ejercicio no encontrado");
  }

  const content = parseExerciseContent(fixture.type, fixture.content);
  const parsedAnswer = parseExerciseAnswer(fixture.type as ExerciseType, answer);
  const result = checkAnswer(fixture.type, content, parsedAnswer);

  mockAttempts.push({
    studentId,
    exerciseId,
    conceptId: fixture.conceptId,
    correct: result.correct,
    createdAt: new Date(),
  });

  void timeSpentMs;

  const mastery = getMasteryByConcept(studentId)[fixture.conceptId] ?? 0;

  return {
    correct: result.correct,
    correctAnswer: result.correctAnswer,
    conceptId: fixture.conceptId,
    conceptTitle: fixture.conceptTitle,
    mastery,
  };
}
