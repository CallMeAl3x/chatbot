"use client";

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <form action={handleLogout}>
      <div className="flex justify-center">
        <Button type="submit" className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-11 mb-4 font-semibold">
          Sign out
        </Button>
      </div>
    </form>
  );
}
