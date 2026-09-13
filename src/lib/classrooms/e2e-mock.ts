import { AuthorizationError, NotFoundError } from "@/lib/classrooms/errors";
import {
  formatSequentialUsername,
  parseSequentialUsername,
} from "@/lib/credentials/username";
import type {
  ClassroomStudent,
  ProvisionedStudent,
  ProvisionStudentsResult,
} from "@/lib/classrooms/types";

const MOCK_TEACHER_ID = "e2e-teacher-id";

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

/** Simula auth.getUser() → usuario autenticado como profesor E2E. */
export function mockRequireAuthenticatedUserId(): string {
  return MOCK_TEACHER_ID;
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
  return credentials !== undefined && credentials.password === password;
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
