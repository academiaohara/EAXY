import { beforeEach, describe, expect, it, vi } from "vitest";
import { rollbackPartialStudentProvisioning } from "@/lib/classrooms/provisioning-rollback";

const mockDeleteUser = vi.fn();
const mockClassroomMembersSecondEq = vi.fn().mockResolvedValue({ error: null });
const mockStudentCredentialsEq = vi.fn().mockResolvedValue({ error: null });
const mockProfilesEq = vi.fn().mockResolvedValue({ error: null });

const mockAdmin = {
  from: vi.fn((table: string) => {
    if (table === "classroom_members") {
      return {
        delete: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: mockClassroomMembersSecondEq,
          })),
        })),
      };
    }
    if (table === "student_credentials") {
      return {
        delete: vi.fn(() => ({
          eq: mockStudentCredentialsEq,
        })),
      };
    }
    if (table === "profiles") {
      return {
        delete: vi.fn(() => ({
          eq: mockProfilesEq,
        })),
      };
    }
    throw new Error(`Tabla inesperada: ${table}`);
  }),
  auth: {
    admin: {
      deleteUser: mockDeleteUser,
    },
  },
};

describe("rollbackPartialStudentProvisioning", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDeleteUser.mockResolvedValue({ error: null });
    mockClassroomMembersSecondEq.mockResolvedValue({ error: null });
    mockStudentCredentialsEq.mockResolvedValue({ error: null });
    mockProfilesEq.mockResolvedValue({ error: null });
  });

  it("borra classroom_members, student_credentials, profiles y auth.users", async () => {
    await rollbackPartialStudentProvisioning(
      mockAdmin as never,
      "student-1",
      "classroom-1",
    );

    expect(mockAdmin.from).toHaveBeenCalledWith("classroom_members");
    expect(mockAdmin.from).toHaveBeenCalledWith("student_credentials");
    expect(mockAdmin.from).toHaveBeenCalledWith("profiles");
    expect(mockClassroomMembersSecondEq).toHaveBeenCalledWith("profile_id", "student-1");
    expect(mockStudentCredentialsEq).toHaveBeenCalledWith("student_id", "student-1");
    expect(mockProfilesEq).toHaveBeenCalledWith("id", "student-1");
    expect(mockDeleteUser).toHaveBeenCalledWith("student-1");
  });
});
