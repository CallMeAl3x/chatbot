"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <div className="flex justify-center">
      <Button onClick={onClick} className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-11 mb-4 font-semibold">
        Déconnexion
      </Button>
    </div>
  );
};
