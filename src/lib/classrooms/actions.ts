"use server";

import { randomUUID } from "node:crypto";
import { assertClassroomTeacher, requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import { AuthorizationError, NotFoundError } from "@/lib/classrooms/errors";
import {
  getE2EMockClassroomName,
  getE2EMockStudents,
  isE2EMockClassroomEnabled,
  mockGetStudentPassword,
  mockProvisionStudents,
  mockRegenerateStudentPassword,
} from "@/lib/classrooms/e2e-mock";
import { rollbackPartialStudentProvisioning } from "@/lib/classrooms/provisioning-rollback";
import type {
  ClassroomStudent,
  ProvisionFailure,
  ProvisionedStudent,
  ProvisionStudentsResult,
} from "@/lib/classrooms/types";
import { decryptPassword, encryptPassword, generateStudentPassword } from "@/lib/credentials/encryption";
import { generateUsername } from "@/lib/credentials/username";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase";

export type {
  ClassroomStudent,
  ProvisionedStudent,
  ProvisionFailure,
  ProvisionStudentsResult,
} from "@/lib/classrooms/types";

const INTERNAL_STUDENT_EMAIL_DOMAIN = "students.internal.eaxy";

function buildInternalStudentEmail(userId: string): string {
  return `${userId}@${INTERNAL_STUDENT_EMAIL_DOMAIN}`;
}

async function provisionSingleStudent(
  classroomId: string,
  displayName: string,
  teacherId: string,
): Promise<ProvisionedStudent> {
  const admin = createAdminClient();
  const username = await generateUsername();
  const password = generateStudentPassword();
  const userId = randomUUID();
  const authEmailInternal = buildInternalStudentEmail(userId);

  const { error: createUserError } = await admin.auth.admin.createUser({
    id: userId,
    email: authEmailInternal,
    password,
    email_confirm: true,
    user_metadata: {
      account_origin: "teacher_provisioned",
      display_name: displayName,
    },
  });

  if (createUserError) {
    throw new Error(createUserError.message);
  }

  try {
    const { error: profileError } = await admin.from("profiles").insert({
      id: userId,
      display_name: displayName,
      account_origin: "teacher_provisioned",
      is_minor: true,
      created_by: teacherId,
    });

    if (profileError) {
      throw new Error(profileError.message);
    }

    const { error: credentialsError } = await admin.from("student_credentials").insert({
      student_id: userId,
      username,
      classroom_scope_id: classroomId,
      password_encrypted: encryptPassword(password),
      password_encrypted_version: 1,
      auth_email_internal: authEmailInternal,
    });

    if (credentialsError) {
      throw new Error(credentialsError.message);
    }

    const { error: membershipError } = await admin.from("classroom_members").insert({
      classroom_id: classroomId,
      profile_id: userId,
      role: "student",
      added_by: teacherId,
    });

    if (membershipError) {
      throw new Error(membershipError.message);
    }
  } catch (error) {
    await rollbackPartialStudentProvisioning(admin, userId, classroomId);
    throw error;
  }

  return {
    displayName,
    username,
    password,
  };
}

export async function getClassroomStudents(
  classroomId: string,
): Promise<ClassroomStudent[]> {
  await assertClassroomTeacher(classroomId);

  if (isE2EMockClassroomEnabled()) {
    return getE2EMockStudents(classroomId);
  }

  const admin = createAdminClient();

  const { data, error } = await admin
    .from("student_credentials")
    .select("student_id, username, profiles!inner(display_name)")
    .eq("classroom_scope_id", classroomId);

  if (error) {
    throw new Error(`No se pudo cargar el listado de alumnos: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;

    return {
      studentId: row.student_id,
      displayName: profile?.display_name ?? "Sin nombre",
      username: row.username,
    };
  });
}

export async function getClassroomName(classroomId: string): Promise<string> {
  await assertClassroomTeacher(classroomId);

  if (isE2EMockClassroomEnabled()) {
    return getE2EMockClassroomName();
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("classrooms")
    .select("name")
    .eq("id", classroomId)
    .maybeSingle();

  if (error || !data) {
    throw new NotFoundError("No se encontró el aula");
  }

  return data.name;
}

export async function provisionStudents(
  classroomId: string,
  studentNames: string[],
): Promise<ProvisionStudentsResult> {
  const teacherId = await assertClassroomTeacher(classroomId);

  if (isE2EMockClassroomEnabled()) {
    return mockProvisionStudents(classroomId, studentNames);
  }
  const succeeded: ProvisionedStudent[] = [];
  const failed: ProvisionFailure[] = [];

  for (const rawName of studentNames) {
    const displayName = rawName.trim();

    if (!displayName) {
      failed.push({
        displayName: rawName,
        reason: "El nombre está vacío",
      });
      continue;
    }

    try {
      const provisionedStudent = await provisionSingleStudent(
        classroomId,
        displayName,
        teacherId,
      );
      succeeded.push(provisionedStudent);
    } catch (error) {
      failed.push({
        displayName,
        reason:
          error instanceof Error ? error.message : "Error desconocido al provisionar alumno",
      });
    }
  }

  return { succeeded, failed };
}

export async function regenerateStudentPassword(studentId: string): Promise<string> {
  if (isE2EMockClassroomEnabled()) {
    await requireAuthenticatedUserId();
    return mockRegenerateStudentPassword(studentId);
  }

  const teacherId = await requireAuthenticatedUserId();
  const admin = createAdminClient();

  const { data: credentials, error } = await admin
    .from("student_credentials")
    .select("classroom_scope_id")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudieron leer las credenciales del alumno: ${error.message}`);
  }

  if (!credentials) {
    throw new NotFoundError("No se encontraron credenciales para este alumno");
  }

  await assertClassroomTeacher(credentials.classroom_scope_id);

  const password = generateStudentPassword();
  const { error: authUpdateError } = await admin.auth.admin.updateUserById(studentId, {
    password,
  });

  if (authUpdateError) {
    throw new Error(`No se pudo actualizar la contraseña en Auth: ${authUpdateError.message}`);
  }

  const { error: credentialsUpdateError } = await admin
    .from("student_credentials")
    .update({
      password_encrypted: encryptPassword(password),
      last_password_reset_by: teacherId,
      last_password_reset_at: new Date().toISOString(),
    })
    .eq("student_id", studentId);

  if (credentialsUpdateError) {
    throw new Error(
      `No se pudo actualizar la contraseña cifrada: ${credentialsUpdateError.message}`,
    );
  }

  return password;
}

export async function getStudentPassword(studentId: string): Promise<string> {
  await requireAuthenticatedUserId();

  if (isE2EMockClassroomEnabled()) {
    return mockGetStudentPassword(studentId);
  }

  const admin = createAdminClient();
  const { data: credentials, error } = await admin
    .from("student_credentials")
    .select("classroom_scope_id, password_encrypted")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudieron leer las credenciales del alumno: ${error.message}`);
  }

  if (!credentials) {
    throw new NotFoundError("No se encontraron credenciales para este alumno");
  }

  const supabase = await createServerSupabaseClient();
  const { data: isTeacher, error: teacherCheckError } = await supabase.rpc(
    "is_classroom_teacher",
    {
      target_classroom_id: credentials.classroom_scope_id,
    },
  );

  if (teacherCheckError) {
    throw new AuthorizationError("No se pudo verificar el permiso de profesor");
  }

  if (!isTeacher) {
    throw new AuthorizationError("No tienes permiso para ver la contraseña de este alumno");
  }

  return decryptPassword(credentials.password_encrypted);
}
