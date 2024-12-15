"use client";
import { handleSignOut } from "@/actions/logout";
import { Button } from "../ui/button";

const handleLogout = async () => {
  handleSignOut();
  window.dispatchEvent(new Event("session-changed"));
};

export default function Logout() {
  return (
    <div className="flex justify-center">
      <Button
        onClick={() => handleLogout()}
        className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-11 mb-4 font-semibold"
      >
        Sign out
      </Button>
    </div>
  );
}
