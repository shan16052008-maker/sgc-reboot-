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
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("YOUR_")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
