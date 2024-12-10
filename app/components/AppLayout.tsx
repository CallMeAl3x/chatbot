// components/layout/AuthLayout.tsx
"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./ui/app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");
  const isPublicHome = pathname === "/" && !session;
  const shouldShowSidebar = !isAuthPage && !isPublicHome && session;

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen max-h-screen overflow-hidden bg-gray-50">{children}</main>
    </SidebarProvider>
  );
}
