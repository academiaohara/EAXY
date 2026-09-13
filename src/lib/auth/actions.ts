"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DUMMY_STUDENT_AUTH_EMAIL,
  GENERIC_STUDENT_LOGIN_ERROR,
  STUDENT_LOGIN_REDIRECT_PATH,
} from "@/lib/auth/constants";
import {
  clearLoginAttempts,
  isLoginRateLimited,
  recordFailedLoginAttempt,
} from "@/lib/auth/login-rate-limit";
import {
  E2E_MOCK_USER_COOKIE,
  isE2EMockClassroomEnabled,
  mockGetStudentIdForUsername,
  mockSignInStudent,
} from "@/lib/classrooms/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";
import { createAdminClient } from "@/lib/supabase/admin";

export type SignInStudentResult = {
  error: string;
};

async function lookupStudentAuthEmail(username: string): Promise<string | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("student_credentials")
    .select("auth_email_internal")
    .eq("username", username)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data.auth_email_internal;
}

export async function signInStudent(
  username: string,
  password: string,
): Promise<SignInStudentResult | void> {
  const normalizedUsername = username.trim();

  if (!normalizedUsername || !password) {
    return { error: GENERIC_STUDENT_LOGIN_ERROR };
  }

  if (isLoginRateLimited(normalizedUsername)) {
    return { error: GENERIC_STUDENT_LOGIN_ERROR };
  }

  if (isE2EMockClassroomEnabled()) {
    if (!mockSignInStudent(normalizedUsername, password)) {
      recordFailedLoginAttempt(normalizedUsername);
      return { error: GENERIC_STUDENT_LOGIN_ERROR };
    }

    const studentId = mockGetStudentIdForUsername(normalizedUsername);
    if (studentId) {
      const cookieStore = await cookies();
      cookieStore.set(E2E_MOCK_USER_COOKIE, studentId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    clearLoginAttempts(normalizedUsername);
    redirect(STUDENT_LOGIN_REDIRECT_PATH);
  }

  const authEmailInternal = await lookupStudentAuthEmail(normalizedUsername);
  const emailForSignIn = authEmailInternal ?? DUMMY_STUDENT_AUTH_EMAIL;

  const supabase = await createServerSupabaseClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: emailForSignIn,
    password,
  });

  if (signInError || !authEmailInternal) {
    recordFailedLoginAttempt(normalizedUsername);
    return { error: GENERIC_STUDENT_LOGIN_ERROR };
  }

  clearLoginAttempts(normalizedUsername);
  redirect(STUDENT_LOGIN_REDIRECT_PATH);
}
