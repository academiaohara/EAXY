/** ID estable para progreso en memoria durante la previsualización local. */
export const PREVIEW_GUEST_ID = "preview-guest";

/**
 * Modo de previsualización del catálogo sin Supabase ni login.
 * Solo activo fuera de producción (`CONTENT_PREVIEW_MODE=true`).
 */
export function isContentPreviewModeEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.CONTENT_PREVIEW_MODE === "true"
  );
}
