import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DUMMY_STUDENT_AUTH_EMAIL,
  GENERIC_STUDENT_LOGIN_ERROR,
} from "@/lib/auth/constants";
import { resetLoginRateLimitState } from "@/lib/auth/login-rate-limit";

const mockSignInWithPassword = vi.fn();
const mockMaybeSingle = vi.fn();
const mockRedirect = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    mockRedirect(path);
    throw new Error(`REDIRECT:${path}`);
  },
}));

vi.mock("@/lib/classrooms/e2e-mock", () => ({
  isE2EMockClassroomEnabled: () => false,
  mockSignInStudent: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: mockMaybeSingle,
        }),
      }),
    }),
  }),
}));

vi.mock("@/lib/supabase", () => ({
  createServerSupabaseClient: vi.fn(async () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  })),
}));

import { signInStudent } from "@/lib/auth/actions";

describe("signInStudent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetLoginRateLimitState();
  });

  afterEach(() => {
    resetLoginRateLimitState();
  });

  it("devuelve error genérico si el username no existe", async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: null });
    mockSignInWithPassword.mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    const result = await signInStudent("XY999999", "cualquier-password");

    expect(result).toEqual({ error: GENERIC_STUDENT_LOGIN_ERROR });
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: DUMMY_STUDENT_AUTH_EMAIL,
      password: "cualquier-password",
    });
  });

  it("devuelve el mismo error genérico si la contraseña es incorrecta", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: { auth_email_internal: "alumno@students.internal.eaxy" },
      error: null,
    });
    mockSignInWithPassword.mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    const result = await signInStudent("XY000001", "password-incorrecta");

    expect(result).toEqual({ error: GENERIC_STUDENT_LOGIN_ERROR });
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "alumno@students.internal.eaxy",
      password: "password-incorrecta",
    });
  });

  it("inicia sesión con el email interno correcto y redirige a /aprender", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: { auth_email_internal: "alumno@students.internal.eaxy" },
      error: null,
    });
    mockSignInWithPassword.mockResolvedValue({ error: null });

    await expect(signInStudent("XY000001", "password-correcta")).rejects.toThrow(
      "REDIRECT:/aprender",
    );

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "alumno@students.internal.eaxy",
      password: "password-correcta",
    });
    expect(mockRedirect).toHaveBeenCalledWith("/aprender");
  });
});
