// actions/logout.ts
"use server";

import { signOut } from "@/auth";

export async function logout() {
  try {
    await signOut();
    window.location.reload();
    return { success: true, redirect: true };
  } catch (error) {
    return { error: "Erreur lors de la déconnexion" };
  }
}
