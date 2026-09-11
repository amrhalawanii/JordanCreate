import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Server-only Supabase client for programme reads (speakers / agenda).
 *
 * Priority:
 * 1. SUPABASE_SERVICE_ROLE_KEY — bypasses RLS for trusted server SELECT only
 *    (never expose this to the browser; never prefix with NEXT_PUBLIC_)
 * 2. NEXT_PUBLIC_SUPABASE_ANON_KEY — works once public SELECT RLS policies exist
 *
 * Prefer applying `docs/sql/programme-public-read.sql` in production so the
 * marketing site can run on the anon key alone.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) return false;
  return Boolean(
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

let cached: SupabaseClient<Database> | null = null;

export function getSupabaseServerClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is required for Supabase programme access.");
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const key = serviceKey || anonKey;

  if (!key) {
    throw new Error(
      "Set SUPABASE_SERVICE_ROLE_KEY (server-only) or NEXT_PUBLIC_SUPABASE_ANON_KEY for programme reads.",
    );
  }

  if (!cached) {
    cached = createClient<Database>(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          "X-Client-Info": "jordan-create-website-server",
        },
      },
    });
  }

  return cached;
}

export function getSupabaseAuthMode(): "service-role" | "anon" {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ? "service-role" : "anon";
}
