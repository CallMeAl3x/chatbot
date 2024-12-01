"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppSidebar } from "@/app/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !["/login", "/register"].includes(pathname);
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer position="top-left" />
        <SidebarProvider>
          {showSidebar && <AppSidebar />}
          <main className="w-screen">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
