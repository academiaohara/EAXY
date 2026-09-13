"use server";

import { randomUUID } from "node:crypto";
import { assertClassroomTeacher, requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import { AuthorizationError, NotFoundError } from "@/lib/classrooms/errors";
import { rollbackPartialStudentProvisioning } from "@/lib/classrooms/provisioning-rollback";
import { decryptPassword, encryptPassword, generateStudentPassword } from "@/lib/credentials/encryption";
import { generateUsername } from "@/lib/credentials/username";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const INTERNAL_STUDENT_EMAIL_DOMAIN = "students.internal.eaxy";

export type ProvisionedStudent = {
  displayName: string;
  username: string;
  password: string;
};

export type ProvisionFailure = {
  displayName: string;
  reason: string;
};

export type ProvisionStudentsResult = {
  succeeded: ProvisionedStudent[];
  failed: ProvisionFailure[];
};

function buildInternalStudentEmail(userId: string): string {
  return `${userId}@${INTERNAL_STUDENT_EMAIL_DOMAIN}`;
}

async function provisionSingleStudent(
  classroomId: string,
  displayName: string,
  teacherId: string,
): Promise<ProvisionedStudent> {
  const admin = createAdminClient();
  const username = await generateUsername(displayName, classroomId);
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

export async function provisionStudents(
  classroomId: string,
  studentNames: string[],
): Promise<ProvisionStudentsResult> {
  const teacherId = await assertClassroomTeacher(classroomId);
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

export async function getStudentPassword(studentId: string): Promise<string> {
  await requireAuthenticatedUserId();

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
