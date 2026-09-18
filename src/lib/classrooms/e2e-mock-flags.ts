/** Constantes y flags del mock E2E sin dependencias de runtime (seguro en proxy/edge). */

export const MOCK_TEACHER_ID = "e2e-teacher-id";
export const E2E_STUDENT_SESSION_COOKIE = "e2e_student_session";

/**
 * El mock solo puede activarse fuera de producción, aunque E2E_MOCK_CLASSROOM esté definida.
 * En Vercel (NODE_ENV=production) siempre se usa Supabase real.
 */
export function isE2EMockClassroomEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.E2E_MOCK_CLASSROOM === "true"
  );
}
