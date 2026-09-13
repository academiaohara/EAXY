import { createAdminClient } from "@/lib/supabase/admin";

export const USERNAME_PREFIX = "XY";
export const USERNAME_SEQUENCE_LENGTH = 6;
const USERNAME_PATTERN = /^XY(\d{6})$/;

export function formatSequentialUsername(sequence: number): string {
  return `${USERNAME_PREFIX}${sequence.toString().padStart(USERNAME_SEQUENCE_LENGTH, "0")}`;
}

export function parseSequentialUsername(username: string): number | null {
  const match = username.match(USERNAME_PATTERN);
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

export type UsernameAvailabilityLookup = (username: string) => Promise<boolean>;

export type NextUsernameSequenceLookup = () => Promise<number>;

async function defaultUsernameAvailabilityLookup(username: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("student_credentials")
    .select("student_id")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo comprobar la disponibilidad del username: ${error.message}`);
  }

  return data !== null;
}

async function defaultNextUsernameSequenceLookup(): Promise<number> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("student_credentials")
    .select("username")
    .like("username", `${USERNAME_PREFIX}%`)
    .order("username", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`No se pudo obtener el siguiente username secuencial: ${error.message}`);
  }

  if (!data?.length) {
    return 1;
  }

  const lastSequence = parseSequentialUsername(data[0].username);
  return lastSequence === null ? 1 : lastSequence + 1;
}

export async function generateUsername(
  getNextSequence: NextUsernameSequenceLookup = defaultNextUsernameSequenceLookup,
  isUsernameTaken: UsernameAvailabilityLookup = defaultUsernameAvailabilityLookup,
): Promise<string> {
  let sequence = await getNextSequence();
  let candidate = formatSequentialUsername(sequence);

  while (await isUsernameTaken(candidate)) {
    sequence += 1;
    candidate = formatSequentialUsername(sequence);
  }

  return candidate;
}
