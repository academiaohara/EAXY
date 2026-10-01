import { cache } from "react";
import {
  isE2EMockClassroomEnabled,
  MOCK_TEACHER_ID,
  mockGetSessionUserId,
} from "@/lib/classrooms/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

export type SessionUser = {
  id: string;
  displayName: string;
  accountOrigin: "self_registered" | "teacher_provisioned";
  isTeacher: boolean;
};

export const getSessionUser = cache(async function getSessionUser(): Promise<SessionUser | null> {
  if (isE2EMockClassroomEnabled()) {
    const userId = await mockGetSessionUserId();
    if (!userId) {
      return null;
    }
    const isTeacher = userId === MOCK_TEACHER_ID;

    return {
      id: userId,
      displayName: isTeacher ? "Profesor E2E" : "Alumno E2E",
      accountOrigin: isTeacher ? "self_registered" : "teacher_provisioned",
      isTeacher,
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, account_origin")
    .eq("id", user.id)
    .maybeSingle();

  const { data: teacherClassrooms } = await supabase
    .from("classrooms")
    .select("id")
    .eq("teacher_id", user.id)
    .limit(1);

  const { data: coTeacherMembership } = await supabase
    .from("classroom_members")
    .select("classroom_id")
    .eq("profile_id", user.id)
    .eq("role", "teacher")
    .limit(1);

  return {
    id: user.id,
    displayName: profile?.display_name ?? user.email?.split("@")[0] ?? "Usuario",
    accountOrigin: profile?.account_origin ?? "self_registered",
    isTeacher: (teacherClassrooms?.length ?? 0) > 0 || (coTeacherMembership?.length ?? 0) > 0,
  };
});

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  return user;
}
