"use client";

import { handleSignOut } from "@/actions/logout";
import { Button } from "../ui/button";

const handleLougout = async () => {
  await handleSignOut();
  window.dispatchEvent(new Event("session-changed"));
};

export default function Logout() {
  return (
    <div className="flex justify-center">
      <Button
        onClick={() => handleLougout()}
        className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-11 mb-4 font-semibold"
      >
        Sign out
      </Button>
    </div>
  );
}
