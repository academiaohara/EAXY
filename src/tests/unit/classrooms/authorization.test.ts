import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetUser = vi.fn();
const mockRpc = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
    },
    rpc: mockRpc,
  })),
}));

import {
  assertClassroomTeacher,
  requireAuthenticatedUserId,
} from "@/lib/classrooms/authorization";
import { AuthorizationError } from "@/lib/classrooms/errors";

describe("requireAuthenticatedUserId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lanza AuthorizationError cuando no hay usuario autenticado", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    await expect(requireAuthenticatedUserId()).rejects.toBeInstanceOf(
      AuthorizationError,
    );
    await expect(requireAuthenticatedUserId()).rejects.toThrow(
      "Debes iniciar sesión para realizar esta acción",
    );
  });

  it("devuelve el id del usuario autenticado", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    await expect(requireAuthenticatedUserId()).resolves.toBe("user-123");
  });
});

describe("assertClassroomTeacher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({
      data: { user: { id: "teacher-1" } },
      error: null,
    });
  });

  it("permite continuar cuando is_classroom_teacher devuelve true", async () => {
    mockRpc.mockResolvedValue({ data: true, error: null });

    await expect(assertClassroomTeacher("classroom-1")).resolves.toBe("teacher-1");
    expect(mockRpc).toHaveBeenCalledWith("is_classroom_teacher", {
      target_classroom_id: "classroom-1",
    });
  });

  it("lanza AuthorizationError cuando is_classroom_teacher devuelve false", async () => {
    mockRpc.mockResolvedValue({ data: false, error: null });

    await expect(assertClassroomTeacher("classroom-1")).rejects.toBeInstanceOf(
      AuthorizationError,
    );
    await expect(assertClassroomTeacher("classroom-1")).rejects.toThrow(
      "No tienes permiso para gestionar esta aula",
    );
  });

  it("lanza AuthorizationError cuando no hay usuario autenticado", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    await expect(assertClassroomTeacher("classroom-1")).rejects.toBeInstanceOf(
      AuthorizationError,
    );
    await expect(assertClassroomTeacher("classroom-1")).rejects.toThrow(
      "Debes iniciar sesión para realizar esta acción",
    );
    expect(mockRpc).not.toHaveBeenCalled();
  });
});
