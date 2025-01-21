"use client";
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <UserInfo user={user} label="Vos information" />
    </div>
  );
};

export default ClientPage;
