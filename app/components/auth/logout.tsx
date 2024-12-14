"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

export default function Logout() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex justify-center">
      <Button onClick={handleLogout} className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-11 mb-4 font-semibold">
        Sign out
      </Button>
    </div>
  );
}
