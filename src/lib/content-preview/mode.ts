/** ID estable para progreso en memoria durante la previsualización local. */
export const PREVIEW_GUEST_ID = "preview-guest";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/**
 * Modo de previsualización del catálogo sin Supabase ni login.
 *
 * Se activa con `CONTENT_PREVIEW_MODE=true` o automáticamente cuando
 * Supabase no está configurado (p. ej. Vercel sin variables de entorno).
 * Desactivar con `CONTENT_PREVIEW_MODE=false` antes del lanzamiento real.
 */
export function isContentPreviewModeEnabled(): boolean {
  if (process.env.CONTENT_PREVIEW_MODE === "false") {
    return false;
  }

  if (process.env.CONTENT_PREVIEW_MODE === "true") {
    return true;
  }

  // Vercel sin Supabase configurado: abrir el catálogo para revisar contenido.
  if (process.env.VERCEL === "1" && !isSupabaseConfigured()) {
    return true;
  }

  return false;
}
