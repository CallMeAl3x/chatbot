"use server";

import { signOut } from "@/auth";

export const handleSignOut = async () => {
  try {
    await signOut({ redirectTo: "/auth/login", redirect: true });
  } catch (error) {
    throw error;
  }
};
