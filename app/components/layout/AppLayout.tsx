"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session, update } = useSession(); // Récupère update pour forcer la mise à jour

  const shouldShowSidebar = session;

  useEffect(() => {
    const handleSessionChange = async () => {
      await getSession(); // Recheck la session manuellement
    };

    window.addEventListener("session-changed", handleSessionChange);
    return () => {
      window.removeEventListener("session-changed", handleSessionChange);
    };
  }, [update]);

  return (
    <SidebarProvider>
      {shouldShowSidebar && <AppSidebar />}
      <main className="w-full h-screen max-h-screen overflow-hidden bg-gray-50">{children}</main>
    </SidebarProvider>
  );
}
