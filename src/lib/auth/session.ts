import { redirect } from "next/navigation";
import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { mockGetSessionUserId } from "@/lib/classrooms/e2e-mock-practice";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function getAuthenticatedUserId(): Promise<string | null> {
  if (isE2EMockClassroomEnabled()) {
    const userId = await mockGetSessionUserId();
    return userId;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

export async function requireAuthenticatedUserOrRedirect(
  redirectPath = "/entrar",
): Promise<string> {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect(redirectPath);
  }

  return userId;
}
