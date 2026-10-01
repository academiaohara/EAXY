import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { isContentPreviewModeEnabled } from "@/lib/content-preview/mode";

/** Catálogo embebido en la app (sin progreso en servidor) para visitantes sin sesión. */
export function shouldUseLocalCatalog(studentId: string | null): boolean {
  if (isE2EMockClassroomEnabled()) {
    return false;
  }
  if (isContentPreviewModeEnabled()) {
    return true;
  }
  return studentId === null;
}
