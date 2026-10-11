import { createClient } from "@supabase/supabase-js";
import { TEAM_MEMBERS, ALUMNI_MEMBERS } from "../data/sgcData";

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  year: string;
  image: string;
  linkedin?: string;
  category: "Office Bearer" | "Lead & Handler" | "Committee Member";
}

export interface Alumni {
  name: string;
  formerRole: string;
  currentDesignation: string;
  companyOrInstitution: string;
  packageOrHonor?: string;
  image: string;
  linkedin: string;
  batch: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
// Support both VITE_SUPABASE_PUBLISHABLE_KEY and legacy VITE_SUPABASE_ANON_KEY
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabasePublishableKey &&
    !supabaseUrl.includes("your-project-id") &&
    !supabaseUrl.includes("YOUR_") &&
    supabaseUrl.startsWith("http")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

/**
 * Supabase Auth: Sign In with Email & Password
 */
export async function signInMember(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured yet. Set credentials in .env") };
  }
  return await supabase.auth.signInWithPassword({ email, password });
}

/**
 * Supabase Auth: Sign Up new Member with metadata
 */
export async function signUpMember(
  email: string,
  password: string,
  metadata?: { full_name?: string; reg_no?: string; department?: string; role?: string }
) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase is not configured yet. Set credentials in .env") };
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata || {},
    },
  });
}

/**
 * Supabase Auth: Sign Out
 */
export async function signOutMember() {
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}

/**
 * Fetch team members from Supabase if configured, otherwise returns verified dataset.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("year", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as TeamMember[];
      }
    } catch (e) {
      console.warn("Supabase team query failed, falling back to local dataset:", e);
    }
  }
  return TEAM_MEMBERS;
}

/**
 * Fetch alumni records from Supabase if configured, otherwise returns verified dataset.
 */
export async function getAlumniMembers(): Promise<Alumni[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("alumni")
        .select("*")
        .order("batch", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Alumni[];
      }
    } catch (e) {
      console.warn("Supabase alumni query failed, falling back to local dataset:", e);
    }
  }
  return ALUMNI_MEMBERS;
}
