"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  const shouldShowSidebar = status === "authenticated";

  useEffect(() => {
    const handleSessionChange = async () => {
      await getSession(); // Recheck la session manuellement
    };

    window.addEventListener("session-changed", handleSessionChange);
    return () => {
      window.removeEventListener("session-changed", handleSessionChange);
    };
  }, []);

  return (
    <SidebarProvider>
      {shouldShowSidebar && <AppSidebar />}
      <main className="w-full h-screen max-h-screen overflow-hidden bg-gray-50">{children}</main>
    </SidebarProvider>
  );
}
