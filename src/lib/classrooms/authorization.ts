import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthorizationError } from "@/lib/classrooms/errors";

export async function requireAuthenticatedUserId(): Promise<string> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new AuthorizationError("Debes iniciar sesión para realizar esta acción");
  }

  return user.id;
}

export async function assertClassroomTeacher(classroomId: string): Promise<string> {
  const userId = await requireAuthenticatedUserId();
  const supabase = await createServerSupabaseClient();
  const { data: isTeacher, error } = await supabase.rpc("is_classroom_teacher", {
    target_classroom_id: classroomId,
  });

  if (error) {
    throw new AuthorizationError("No se pudo verificar el permiso de profesor");
  }

  if (!isTeacher) {
    throw new AuthorizationError("No tienes permiso para gestionar esta aula");
  }

  return userId;
}
