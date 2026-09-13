import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthorizationError } from "@/lib/classrooms/errors";
import {
  isE2EMockClassroomEnabled,
  mockAssertClassroomTeacher,
  mockGetStudentPassword,
  mockIsClassroomTeacher,
  mockProvisionStudents,
  mockSignInStudent,
  mockSubmitExerciseAttempt,
} from "@/lib/classrooms/e2e-mock";

describe("isE2EMockClassroomEnabled", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllEnvs();
  });

  it("se activa solo con E2E_MOCK_CLASSROOM=true y NODE_ENV distinto de production", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("E2E_MOCK_CLASSROOM", "true");
    expect(isE2EMockClassroomEnabled()).toBe(true);
  });

  it("no se activa en production aunque E2E_MOCK_CLASSROOM=true", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("E2E_MOCK_CLASSROOM", "true");
    expect(isE2EMockClassroomEnabled()).toBe(false);
  });

  it("no se activa sin E2E_MOCK_CLASSROOM", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("E2E_MOCK_CLASSROOM", "");
    expect(isE2EMockClassroomEnabled()).toBe(false);
  });
});

describe("mock authorization", () => {
  it("permite e2e-classroom y rechaza aulas no autorizadas", () => {
    expect(mockIsClassroomTeacher("e2e-classroom")).toBe(true);
    expect(mockIsClassroomTeacher("otra-aula")).toBe(false);
    expect(() => mockAssertClassroomTeacher("otra-aula")).toThrow(AuthorizationError);
  });

  it("getStudentPassword mock exige alumno existente y aula autorizada", () => {
    mockProvisionStudents("e2e-classroom", ["Ana Test"]);
    const password = mockGetStudentPassword("e2e-student-xy000001");
    expect(password).toBe("mock-password-e2e-student-xy000001");
    expect(() => mockGetStudentPassword("desconocido")).toThrow(
      "No se encontraron credenciales para este alumno",
    );
  });

  it("mockSignInStudent establece sesión de alumno y permite enviar intentos", () => {
    const result = mockProvisionStudents("e2e-classroom", ["Luis Práctica"]);
    const username = result.succeeded[0]?.username;
    const password = result.succeeded[0]?.password;

    expect(username).toBeDefined();
    expect(mockSignInStudent(username!, password!)).toBe(true);

    const studentId = `e2e-student-${username!.toLowerCase()}`;
    const attempt = mockSubmitExerciseAttempt(
      studentId,
      "c1000000-0000-4000-8000-000000000001",
      { selectedOptionId: "b" },
      1000,
    );

    expect(attempt.correct).toBe(true);
  });
});
