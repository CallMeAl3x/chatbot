"use server";

import { signOut } from "@/auth";

export async function logout() {
  try {
    await signOut();

    // Utilisation de setTimeout pour ajouter un délai
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Redirection côté client
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  } catch (error) {
    return { error: "Erreur lors de la déconnexion" };
  }
}
