// actions/logout.ts
"use server";

import { signOut } from "@/auth";

export async function logout() {
  try {
    await signOut({ redirect: false });
    return (window.location.href = "/");
  } catch (error) {
    return { error: "Erreur lors de la déconnexion" };
  }
}
