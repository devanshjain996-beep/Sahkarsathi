import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client Configuration for SahkarSathi
 * 
 * Uses Vite environment variables:
 * - VITE_SUPABASE_URL: Your Supabase Project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase Public/Anon Key
 * 
 * SECURITY NOTE: Never expose the Supabase service-role/secret key here.
 */

// Normalize Supabase URL (strip any trailing /rest/v1 or trailing slashes)
const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("placeholder-project") &&
    !supabaseAnonKey.includes("placeholder-anon-key")
  );
};

// Log a friendly reminder in development if credentials need to be configured
if (!isSupabaseConfigured() && import.meta.env.DEV) {
  console.info(
    "%c[SahkarSathi Supabase]%c Client initialized in placeholder mode. Update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file with your actual Supabase project credentials.",
    "color: #10B981; font-weight: bold;",
    "color: inherit;"
  );
}

// Create and export the Supabase client instance
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "sahkarsathi_supabase_auth",
    },
  }
);

/**
 * Diagnostic helper to verify Supabase client initialization.
 */
export async function verifySupabaseConnection() {
  try {
    if (!supabase) {
      return { ok: false, error: "Supabase client instance is undefined" };
    }

    const configured = isSupabaseConfigured();
    return {
      ok: true,
      configured,
      url: supabaseUrl ? supabaseUrl.replace(/^(https:\/\/[^.]+).*/, "$1...") : "Not set",
      hasAnonKey: Boolean(supabaseAnonKey),
      message: configured
        ? "Supabase client initialized successfully with project credentials."
        : "Supabase client library initialized successfully. Waiting for your project URL & anon key in .env.",
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export default supabase;
