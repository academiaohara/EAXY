function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/**
 * Usa el catálogo embebido en lugar de Supabase (p. ej. sin variables de entorno).
 * No imita sesión: los visitantes sin login guardan progreso en localStorage.
 */
export function isContentPreviewModeEnabled(): boolean {
  if (process.env.CONTENT_PREVIEW_MODE === "false") {
    return false;
  }

  if (process.env.CONTENT_PREVIEW_MODE === "true") {
    return true;
  }

  if (process.env.NODE_ENV === "test") {
    return false;
  }

  // Temporal en Vercel: catálogo abierto mientras el registro no esté listo.
  if (process.env.VERCEL === "1") {
    return true;
  }

  return !isSupabaseConfigured();
}
