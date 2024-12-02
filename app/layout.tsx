"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppSidebar } from "@/app/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthService } from "@/app/services";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    authService.getUser().then(
      (res: any) => {
        setUser(res);
      },
      (err: any) => {
        console.log(err);
        setUser(null);
      }
    );
  }, []);

  const showSidebar = user && !["/login", "/register"].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer position="top-left" />
        <SidebarProvider>
          {showSidebar && <AppSidebar />}
          <main className="w-screen">
            {showSidebar && <SidebarTrigger />}
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
