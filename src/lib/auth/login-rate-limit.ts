/**
 * Rate limiting en memoria para intentos de login de alumnos (MVP).
 *
 * En producción con múltiples instancias de Next.js este estado no se comparte
 * entre pods. Sustituir por Redis, Upstash o una tabla `login_attempts` en
 * PostgreSQL antes de escalar horizontalmente.
 */

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type AttemptWindow = {
  count: number;
  windowStartedAt: number;
};

const failedAttemptsByUsername = new Map<string, AttemptWindow>();

function normalizeUsernameKey(username: string): string {
  return username.trim();
}

function getActiveWindow(username: string): AttemptWindow | null {
  const key = normalizeUsernameKey(username);
  const record = failedAttemptsByUsername.get(key);

  if (!record) {
    return null;
  }

  if (Date.now() - record.windowStartedAt > WINDOW_MS) {
    failedAttemptsByUsername.delete(key);
    return null;
  }

  return record;
}

export function isLoginRateLimited(username: string): boolean {
  const record = getActiveWindow(username);
  return record !== null && record.count >= MAX_FAILED_ATTEMPTS;
}

export function recordFailedLoginAttempt(username: string): void {
  const key = normalizeUsernameKey(username);
  const active = getActiveWindow(username);

  if (!active) {
    failedAttemptsByUsername.set(key, {
      count: 1,
      windowStartedAt: Date.now(),
    });
    return;
  }

  failedAttemptsByUsername.set(key, {
    count: active.count + 1,
    windowStartedAt: active.windowStartedAt,
  });
}

export function clearLoginAttempts(username: string): void {
  failedAttemptsByUsername.delete(normalizeUsernameKey(username));
}

/** Solo para tests. */
export function resetLoginRateLimitState(): void {
  failedAttemptsByUsername.clear();
}
