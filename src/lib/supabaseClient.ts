import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * `true` cuando las variables de entorno de Supabase están configuradas.
 * Mientras sea `false`, el sitio público usa el contenido estático de respaldo
 * y el panel /admin muestra un aviso de configuración pendiente.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/** Bucket público de Storage para imágenes (galería, eventos). */
export const MEDIA_BUCKET = "media";
