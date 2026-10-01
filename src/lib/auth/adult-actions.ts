"use server";

import { redirect } from "next/navigation";
import { clearMockStudentSession, isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

export type AuthFormResult = {
  error?: string;
};

export async function signUpAdult(
  displayName: string,
  email: string,
  password: string,
): Promise<AuthFormResult | void> {
  const name = displayName.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!name || !normalizedEmail || !password) {
    return { error: "Completa todos los campos." };
  }

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  if (isE2EMockClassroomEnabled()) {
    redirect("/aprender");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        display_name: name,
        account_origin: "self_registered",
      },
    },
  });

  if (error) {
    return { error: "No se pudo crear la cuenta. Comprueba el email e inténtalo de nuevo." };
  }

  redirect("/aprender");
}

export async function signInAdult(email: string, password: string): Promise<AuthFormResult | void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return { error: "Introduce email y contraseña." };
  }

  if (isE2EMockClassroomEnabled()) {
    redirect("/aprender");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    return { error: "Email o contraseña incorrectos." };
  }

  redirect("/aprender");
}

export async function signInWithGoogle(): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    redirect("/aprender");
  }

  const supabase = await createServerSupabaseClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect("/login?error=oauth");
  }

  redirect(data.url);
}

export async function signOut(): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    await clearMockStudentSession();
    redirect("/");
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
