import type { createAdminClient } from "@/lib/supabase/admin";

type AdminClient = ReturnType<typeof createAdminClient>;

/**
 * Deshace todos los pasos de provisionado parcial de un alumno.
 * Se ejecuta en orden inverso a las FKs; los DELETE son idempotentes
 * si alguna fila aún no existía.
 */
export async function rollbackPartialStudentProvisioning(
  admin: AdminClient,
  userId: string,
  classroomId: string,
): Promise<void> {
  await admin
    .from("classroom_members")
    .delete()
    .eq("classroom_id", classroomId)
    .eq("profile_id", userId);

  await admin.from("student_credentials").delete().eq("student_id", userId);

  await admin.from("profiles").delete().eq("id", userId);

  await admin.auth.admin.deleteUser(userId);
}
