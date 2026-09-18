/** ID estable para progreso en memoria durante la previsualización local. */
export const PREVIEW_GUEST_ID = "preview-guest";

/**
 * Modo de previsualización del catálogo sin Supabase ni login.
 * Activo cuando `CONTENT_PREVIEW_MODE=true` (local, Vercel, etc.).
 * Desactivar antes del lanzamiento público con registro real.
 */
export function isContentPreviewModeEnabled(): boolean {
  return process.env.CONTENT_PREVIEW_MODE === "true";
}
