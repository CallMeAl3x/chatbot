"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");
  const isPublicHome = pathname === "/" && !session;
  const shouldShowSidebar = !isAuthPage && !isPublicHome && session;

  useEffect(() => {
    const handleSessionChange = () => {
      console.log("'session-changed' capturé");
      window.location.reload();
    };

    window.addEventListener("session-changed", handleSessionChange);
    return () => {
      window.removeEventListener("session-changed", handleSessionChange);
    };
  }, []);

  // Décidez quoi afficher dans le JSX, mais appelez toujours les hooks
  return shouldShowSidebar ? (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen max-h-screen overflow-hidden bg-gray-50">{children}</main>
    </SidebarProvider>
  ) : (
    <>{children}</>
  );
}
