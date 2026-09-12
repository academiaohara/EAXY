import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con secret key. Usar SOLO en Server Actions / Route Handlers
 * para operaciones que no puede hacer la publishable key (p. ej. provisionar alumnos,
 * descifrar password_encrypted en migraciones futuras).
 *
 * Nunca importar desde componentes cliente.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SECRET_KEY",
    );
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
