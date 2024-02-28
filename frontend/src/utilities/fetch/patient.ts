import type { SupabaseClient } from "@supabase/supabase-js";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export const fetchUserInfo = async (
  supabaseUserID: string
): Promise<{
  accessToken: string;
  id: string;
  email: string;
  patientType: "STUDENT" | "EMPLOYEE";
  role: "ADMIN" | "DOCTOR" | "NURSE" | "STAFF";
}> => {
  const response = await fetch(`${backendUrl}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ supabaseUserID }),
  });

  if (!response.ok) {
    throw new Error("Error in fetching user information");
  }

  const userData = await response.json();

  return userData;
};
