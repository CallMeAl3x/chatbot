"use server";

import { signOut } from "@/auth";

export const handleSignOut = async () => {
  try {
    await signOut({ redirectTo: "/", redirect: true });
    window.dispatchEvent(new Event("session-changed"));
  } catch (error) {
    throw error;
  }
};
