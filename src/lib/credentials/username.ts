import { createAdminClient } from "@/lib/supabase/admin";

export function normalizeDisplayNameToUsernameBase(displayName: string): string {
  return displayName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "")
    .replace(/\.+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

export type UsernameAvailabilityLookup = (
  classroomId: string,
  username: string,
) => Promise<boolean>;

export async function resolveUsernameWithSuffix(
  baseUsername: string,
  isUsernameTaken: (username: string) => Promise<boolean>,
): Promise<string> {
  if (!(await isUsernameTaken(baseUsername))) {
    return baseUsername;
  }

  let suffix = 2;

  while (await isUsernameTaken(`${baseUsername}${suffix}`)) {
    suffix += 1;
  }

  return `${baseUsername}${suffix}`;
}

async function defaultUsernameAvailabilityLookup(
  classroomId: string,
  username: string,
): Promise<boolean> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("student_credentials")
    .select("student_id")
    .eq("classroom_scope_id", classroomId)
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo comprobar la disponibilidad del username: ${error.message}`);
  }

  return data !== null;
}

export async function generateUsername(
  displayName: string,
  classroomId: string,
  lookup: UsernameAvailabilityLookup = defaultUsernameAvailabilityLookup,
): Promise<string> {
  const baseUsername = normalizeDisplayNameToUsernameBase(displayName);

  if (!baseUsername) {
    throw new Error("El nombre no es válido para generar un username");
  }

  return resolveUsernameWithSuffix(baseUsername, (username) =>
    lookup(classroomId, username),
  );
}
