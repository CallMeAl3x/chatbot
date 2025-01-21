import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExtendedUser } from "@/next-auth";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-sm">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Nom</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rouded-md">{user?.name}</p>
        </div>

        <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rouded-md">{user?.email}</p>
        </div>

        {/* <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rouded-md">{user?.role}</p>
        </div> */}

        {!user?.isOAuth && (
          <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium">Authentification à deux facteurs</p>
            <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button asChild className="w-fit">
            <Link href="/settings">Changer mes informations</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
