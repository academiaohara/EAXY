import { AuthorizationError, NotFoundError } from "@/lib/classrooms/errors";
import {
  formatSequentialUsername,
  parseSequentialUsername,
} from "@/lib/credentials/username";
import { checkAnswer } from "@/lib/exercise-engine/check-answer";
import { parseExerciseAnswer, parseExerciseContent } from "@/lib/exercise-engine/schemas";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { calculateMastery, roundMastery } from "@/lib/mastery/calculator";
import type {
  ClassroomStudent,
  ProvisionedStudent,
  ProvisionStudentsResult,
} from "@/lib/classrooms/types";

const MOCK_TEACHER_ID = "e2e-teacher-id";

let mockCurrentStudentId: string | null = null;

type MockExercise = {
  id: string;
  conceptId: string;
  conceptTitle: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
};

type MockAttempt = {
  studentId: string;
  exerciseId: string;
  correct: boolean;
  createdAt: Date;
};

const mockExercises: MockExercise[] = [
  {
    id: "c1000000-0000-4000-8000-000000000001",
    conceptId: "b1000000-0000-4000-8000-000000000001",
    conceptTitle: "Ecuaciones lineales básicas",
    type: "multiple_choice",
    difficulty: 1,
    content: {
      question: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
      options: [
        { id: "a", text: "x = 2" },
        { id: "b", text: "x = 3" },
        { id: "c", text: "x = 4" },
        { id: "d", text: "x = 6" },
      ],
      correctOptionId: "b",
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000002",
    conceptId: "b1000000-0000-4000-8000-000000000001",
    conceptTitle: "Ecuaciones lineales básicas",
    type: "numeric",
    difficulty: 2,
    content: {
      question: "Resuelve: 3x - 5 = 10. ¿Cuánto vale x?",
      correctAnswer: 5,
    },
  },
];

const mockAttempts: MockAttempt[] = [];
const mockMasteryByStudentConcept = new Map<string, number>();

/**
 * Aulas en las que el profesor mock tiene permiso (simula is_classroom_teacher = true).
 * Los tests E2E usan "e2e-classroom"; cualquier otro ID debe fallar con AuthorizationError.
 */
const authorizedClassroomIds = new Set<string>(["e2e-classroom"]);

const mockStudentsByClassroom = new Map<string, ClassroomStudent[]>();

type MockStudentCredential = {
  username: string;
  password: string;
  authEmailInternal: string;
  studentId: string;
};

const mockCredentialsByUsername = new Map<string, MockStudentCredential>();

/**
 * El mock solo puede activarse fuera de producción, aunque E2E_MOCK_CLASSROOM esté definida.
 * En Vercel (NODE_ENV=production) siempre se usa Supabase real.
 */
export function isE2EMockClassroomEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.E2E_MOCK_CLASSROOM === "true"
  );
}

export function mockGetAuthenticatedUserId(): string | null {
  return mockCurrentStudentId ?? MOCK_TEACHER_ID;
}

/** Simula auth.getUser() → alumno en sesión o profesor E2E por defecto. */
export function mockRequireAuthenticatedUserId(): string {
  return mockGetAuthenticatedUserId() ?? MOCK_TEACHER_ID;
}

export function mockSetCurrentStudentId(studentId: string): void {
  mockCurrentStudentId = studentId;
}

export function mockClearCurrentStudentId(): void {
  mockCurrentStudentId = null;
}

export function mockGetPracticeExerciseCatalog() {
  return mockExercises.map((exercise) => ({
    id: exercise.id,
    conceptId: exercise.conceptId,
    type: exercise.type,
    difficulty: exercise.difficulty,
  }));
}

export function mockGetPracticeExercise(exerciseId: string) {
  const exercise = mockExercises.find((item) => item.id === exerciseId);
  if (!exercise) {
    return null;
  }

  return {
    id: exercise.id,
    conceptId: exercise.conceptId,
    conceptTitle: exercise.conceptTitle,
    type: exercise.type,
    difficulty: exercise.difficulty,
    content: exercise.content,
  };
}

export function mockGetAttemptedExerciseIds(studentId: string): Set<string> {
  const attempted = mockAttempts
    .filter((attempt) => attempt.studentId === studentId)
    .map((attempt) => attempt.exerciseId);
  return new Set(attempted);
}

export function mockSubmitExerciseAttempt(
  studentId: string,
  exerciseId: string,
  answer: unknown,
  _timeSpentMs: number,
): { correct: boolean; correctAnswer: string | number; mastery: number } {
  const exercise = mockExercises.find((item) => item.id === exerciseId);
  if (!exercise) {
    throw new Error("Ejercicio no encontrado");
  }

  const content = parseExerciseContent(exercise.type, exercise.content);
  const parsedAnswer = parseExerciseAnswer(exercise.type, answer);
  const result = checkAnswer(exercise.type, content, parsedAnswer);

  mockAttempts.push({
    studentId,
    exerciseId,
    correct: result.correct,
    createdAt: new Date(),
  });

  const conceptAttempts = mockAttempts
    .filter(
      (attempt) =>
        attempt.studentId === studentId &&
        mockExercises.find((item) => item.id === attempt.exerciseId)?.conceptId ===
          exercise.conceptId,
    )
    .map((attempt) => ({
      correct: attempt.correct,
      createdAt: attempt.createdAt,
    }));

  const mastery = roundMastery(calculateMastery(conceptAttempts));
  mockMasteryByStudentConcept.set(`${studentId}:${exercise.conceptId}`, mastery);

  return {
    correct: result.correct,
    correctAnswer: result.correctAnswer,
    mastery,
  };
}

export function mockGetStudentMastery(studentId: string, conceptId: string): number {
  return mockMasteryByStudentConcept.get(`${studentId}:${conceptId}`) ?? 0;
}

/** Simula la RPC is_classroom_teacher(classroom_id). */
export function mockIsClassroomTeacher(classroomId: string): boolean {
  return authorizedClassroomIds.has(classroomId);
}

/** Simula assertClassroomTeacher: exige sesión + is_classroom_teacher. */
export function mockAssertClassroomTeacher(classroomId: string): string {
  mockRequireAuthenticatedUserId();
  if (!mockIsClassroomTeacher(classroomId)) {
    throw new AuthorizationError("No tienes permiso para gestionar esta aula");
  }
  return MOCK_TEACHER_ID;
}

export function getE2EMockClassroomName(): string {
  return "Aula de prueba E2E";
}

export function getE2EMockStudents(classroomId: string): ClassroomStudent[] {
  return [...(mockStudentsByClassroom.get(classroomId) ?? [])];
}

export function findMockStudentClassroomId(studentId: string): string | null {
  for (const [classroomId, students] of mockStudentsByClassroom) {
    if (students.some((student) => student.studentId === studentId)) {
      return classroomId;
    }
  }
  return null;
}

function getAllMockUsernames(): Set<string> {
  return new Set(
    [...mockStudentsByClassroom.values()].flatMap((students) =>
      students.map((student) => student.username),
    ),
  );
}

function getNextMockUsernameSequence(): number {
  let maxSequence = 0;

  for (const username of getAllMockUsernames()) {
    const sequence = parseSequentialUsername(username);
    if (sequence !== null && sequence > maxSequence) {
      maxSequence = sequence;
    }
  }

  return maxSequence + 1;
}

export function mockProvisionStudents(
  classroomId: string,
  studentNames: string[],
): ProvisionStudentsResult {
  const existing = mockStudentsByClassroom.get(classroomId) ?? [];
  const takenUsernames = getAllMockUsernames();
  const succeeded: ProvisionedStudent[] = [];
  const failed: ProvisionStudentsResult["failed"] = [];
  let nextSequence = getNextMockUsernameSequence();

  for (const rawName of studentNames) {
    const displayName = rawName.trim();

    if (!displayName) {
      failed.push({ displayName: rawName, reason: "El nombre está vacío" });
      continue;
    }

    let username = formatSequentialUsername(nextSequence);
    while (takenUsernames.has(username)) {
      nextSequence += 1;
      username = formatSequentialUsername(nextSequence);
    }

    takenUsernames.add(username);
    nextSequence += 1;

    const studentId = `e2e-student-${username.toLowerCase()}`;
    const password = `E2e${username.slice(2, 6)}9x`;
    const authEmailInternal = `${studentId}@students.internal.eaxy`;

    const student: ClassroomStudent = {
      studentId,
      displayName,
      username,
    };

    mockCredentialsByUsername.set(username, {
      username,
      password,
      authEmailInternal,
      studentId,
    });

    existing.push(student);
    succeeded.push({
      displayName,
      username,
      password,
    });
  }

  mockStudentsByClassroom.set(classroomId, existing);
  return { succeeded, failed };
}

export function mockGetStudentPassword(studentId: string): string {
  const classroomId = findMockStudentClassroomId(studentId);
  if (!classroomId) {
    throw new NotFoundError("No se encontraron credenciales para este alumno");
  }
  mockAssertClassroomTeacher(classroomId);
  return `mock-password-${studentId}`;
}

export function mockSignInStudent(username: string, password: string): boolean {
  const credentials = mockCredentialsByUsername.get(username);
  if (credentials === undefined || credentials.password !== password) {
    return false;
  }

  mockSetCurrentStudentId(credentials.studentId);
  return true;
}

export function getMockStudentAuthEmail(username: string): string | null {
  return mockCredentialsByUsername.get(username)?.authEmailInternal ?? null;
}

export function mockRegenerateStudentPassword(studentId: string): string {
  const classroomId = findMockStudentClassroomId(studentId);
  if (!classroomId) {
    throw new NotFoundError("No se encontraron credenciales para este alumno");
  }
  mockAssertClassroomTeacher(classroomId);
  return `regenerated-${studentId}`;
}
