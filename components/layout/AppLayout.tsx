"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

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
      <main className="w-full lg:h-screen lg:max-h-screen lg:overflow-hidden bg-gray-50">{children}</main>
    </SidebarProvider>
  );
}
