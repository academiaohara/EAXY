import { AuthorizationError } from "@/lib/classrooms/errors";
import {
  isE2EMockClassroomEnabled,
  mockAssertClassroomTeacher,
  mockGetSessionUserId,
  mockRequireAuthenticatedUserId,
} from "@/lib/classrooms/e2e-mock";
import {
  isContentPreviewModeEnabled,
  PREVIEW_GUEST_ID,
} from "@/lib/content-preview/mode";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function getAuthenticatedUserIdOrNull(): Promise<string | null> {
  if (isContentPreviewModeEnabled()) {
    return PREVIEW_GUEST_ID;
  }

  if (isE2EMockClassroomEnabled()) {
    return mockGetSessionUserId();
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

export async function requireAuthenticatedUserId(): Promise<string> {
  if (isContentPreviewModeEnabled()) {
    return PREVIEW_GUEST_ID;
  }

  if (isE2EMockClassroomEnabled()) {
    return mockRequireAuthenticatedUserId();
  }

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
  if (isE2EMockClassroomEnabled()) {
    return mockAssertClassroomTeacher(classroomId);
  }

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
