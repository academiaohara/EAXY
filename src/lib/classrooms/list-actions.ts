"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertClassroomTeacher, requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import {
  getE2EMockClassroomName,
  isE2EMockClassroomEnabled,
  MOCK_TEACHER_ID,
  mockAuthorizeClassroom,
} from "@/lib/classrooms/e2e-mock";
import { AuthorizationError } from "@/lib/classrooms/errors";
import { createServerSupabaseClient } from "@/lib/supabase";
import { createAdminClient } from "@/lib/supabase/admin";

export type ClassroomSummary = {
  id: string;
  name: string;
  studentCount: number;
  role: "teacher" | "student";
};

export type ClassroomDashboardStudent = {
  studentId: string;
  displayName: string;
  username: string;
  concepts: {
    conceptSlug: string;
    conceptTitle: string;
    mastery: number;
    attemptCount: number;
  }[];
};

const mockClassrooms = new Map<string, { id: string; name: string; teacherId: string }>([
  ["e2e-classroom", { id: "e2e-classroom", name: "Aula de prueba E2E", teacherId: MOCK_TEACHER_ID }],
]);

export async function listMyClassrooms(): Promise<ClassroomSummary[]> {
  const userId = await requireAuthenticatedUserId();

  if (isE2EMockClassroomEnabled()) {
    if (userId === MOCK_TEACHER_ID) {
      return [...mockClassrooms.values()].map((classroom) => ({
        id: classroom.id,
        name: classroom.name,
        studentCount: 0,
        role: "teacher" as const,
      }));
    }

    return [];
  }

  const supabase = await createServerSupabaseClient();

  const { data: teaching, error: teachingError } = await supabase
    .from("classrooms")
    .select("id, name")
    .eq("teacher_id", userId);

  if (teachingError) {
    throw new Error(`No se pudieron cargar tus aulas: ${teachingError.message}`);
  }

  const { data: memberships, error: membershipError } = await supabase
    .from("classroom_members")
    .select("classroom_id, role, classrooms(id, name)")
    .eq("profile_id", userId);

  if (membershipError) {
    throw new Error(`No se pudieron cargar tus aulas: ${membershipError.message}`);
  }

  const summaries = new Map<string, ClassroomSummary>();

  for (const classroom of teaching ?? []) {
    summaries.set(classroom.id, {
      id: classroom.id,
      name: classroom.name,
      studentCount: 0,
      role: "teacher",
    });
  }

  for (const membership of memberships ?? []) {
    const classroom = Array.isArray(membership.classrooms)
      ? membership.classrooms[0]
      : membership.classrooms;
    if (!classroom) continue;

    if (!summaries.has(classroom.id)) {
      summaries.set(classroom.id, {
        id: classroom.id,
        name: classroom.name,
        studentCount: 0,
        role: membership.role as "teacher" | "student",
      });
    }
  }

  return [...summaries.values()];
}

export async function createClassroom(name: string): Promise<{ error?: string } | void> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { error: "El nombre del aula no puede estar vacío." };
  }

  const teacherId = await requireAuthenticatedUserId();

  if (isE2EMockClassroomEnabled()) {
    const id = `mock-classroom-${Date.now()}`;
    mockAuthorizeClassroom(id);
    mockClassrooms.set(id, { id, name: trimmedName, teacherId });
    redirect(`/aulas/${id}/alumnos`);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("classrooms")
    .insert({ name: trimmedName, teacher_id: teacherId })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "No se pudo crear el aula. Inténtalo de nuevo." };
  }

  revalidatePath("/aulas");
  redirect(`/aulas/${data.id}/alumnos`);
}

export async function getClassroomDashboard(classroomId: string) {
  await assertClassroomTeacher(classroomId);

  if (isE2EMockClassroomEnabled()) {
    const { getE2EMockStudents } = await import("@/lib/classrooms/e2e-mock");
    const { getOrderedConcepts } = await import("@/content");
    const { mockGetStudentMastery } = await import("@/lib/learning/e2e-mock");

    const students = getE2EMockStudents(classroomId);
    const concepts = getOrderedConcepts();

    return {
      classroomName: getE2EMockClassroomName(),
      students: students.map((student) => ({
        studentId: student.studentId,
        displayName: student.displayName,
        username: student.username,
        concepts: concepts.map((concept) => {
          const masteryEntry = mockGetStudentMastery(student.studentId).find(
            (entry) => entry.conceptSlug === concept.slug,
          );
          return {
            conceptSlug: concept.slug,
            conceptTitle: concept.title,
            mastery: masteryEntry?.mastery ?? 0,
            attemptCount: masteryEntry?.attemptCount ?? 0,
          };
        }),
      })) satisfies ClassroomDashboardStudent[],
    };
  }

  const admin = createAdminClient();
  const supabase = await createServerSupabaseClient();

  const { data: classroom, error: classroomError } = await supabase
    .from("classrooms")
    .select("name")
    .eq("id", classroomId)
    .maybeSingle();

  if (classroomError || !classroom) {
    throw new AuthorizationError("No se encontró el aula");
  }

  const { data: credentials, error: credentialsError } = await admin
    .from("student_credentials")
    .select("student_id, username, profiles!inner(display_name)")
    .eq("classroom_scope_id", classroomId);

  if (credentialsError) {
    throw new Error(`No se pudieron cargar los alumnos: ${credentialsError.message}`);
  }

  const { data: conceptRows } = await supabase.from("concepts").select("id, slug, title");
  const concepts = conceptRows ?? [];

  const students: ClassroomDashboardStudent[] = [];

  for (const row of credentials ?? []) {
    const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
    const { data: masteryRows } = await admin
      .from("student_concept_mastery")
      .select("concept_id, mastery")
      .eq("student_id", row.student_id);

    const { count: attemptCount } = await admin
      .from("exercise_attempts")
      .select("id", { count: "exact", head: true })
      .eq("student_id", row.student_id);

    students.push({
      studentId: row.student_id,
      displayName: profile?.display_name ?? "Sin nombre",
      username: row.username,
      concepts: concepts.map((concept) => {
        const masteryEntry = (masteryRows ?? []).find((entry) => entry.concept_id === concept.id);
        return {
          conceptSlug: concept.slug,
          conceptTitle: concept.title,
          mastery: masteryEntry?.mastery ?? 0,
          attemptCount: attemptCount ?? 0,
        };
      }),
    });
  }

  return {
    classroomName: classroom.name,
    students,
  };
}

