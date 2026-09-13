import {
  isE2EMockClassroomEnabled,
  mockGetAuthenticatedUserId,
} from "@/lib/classrooms/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function getAuthenticatedUserId(): Promise<string | null> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetAuthenticatedUserId();
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}
